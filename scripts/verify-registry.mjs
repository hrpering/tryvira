import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const publishedVersions = JSON.parse(await readFile(new URL("../package-versions.json", import.meta.url), "utf8"));

async function readJson(url, label) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "tryvira-public-docs-registry-check"
    },
  });
  if (!response.ok) throw new Error(`${label}: registry returned HTTP ${response.status}`);
  return response.json();
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: "pipe",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout || `exit ${result.status}`}`);
  }
  return result.stdout.trim();
}

const sdk = await readJson("https://registry.npmjs.org/%40tryvira%2Fsdk", "@tryvira/sdk");
const mcp = await readJson("https://registry.npmjs.org/%40tryvira%2Fmcp", "@tryvira/mcp");
const python = await readJson("https://pypi.org/pypi/tryvira-sdk/json", "tryvira-sdk");
const expected = {
  sdk: sdk["dist-tags"]?.latest,
  mcp: mcp["dist-tags"]?.latest,
  python: python.info?.version,
};
const pythonWheel = python.urls?.find((file) => file.filename === `tryvira_sdk-${expected.python}-py3-none-any.whl`);

const failures = [];

if (publishedVersions.npm?.["@tryvira/sdk"] !== expected.sdk) failures.push(`package-versions.json @tryvira/sdk is stale: ${publishedVersions.npm?.["@tryvira/sdk"] ?? "missing"}, registry latest is ${expected.sdk}`);
if (publishedVersions.npm?.["@tryvira/mcp"] !== expected.mcp) failures.push(`package-versions.json @tryvira/mcp is stale: ${publishedVersions.npm?.["@tryvira/mcp"] ?? "missing"}, registry latest is ${expected.mcp}`);
if (publishedVersions.pypi?.["tryvira-sdk"] !== expected.python) failures.push(`package-versions.json tryvira-sdk is stale: ${publishedVersions.pypi?.["tryvira-sdk"] ?? "missing"}, registry latest is ${expected.python}`);

for (const [name, metadata] of [["@tryvira/sdk", sdk], ["@tryvira/mcp", mcp]]) {
  const version = name === "@tryvira/sdk" ? expected.sdk : expected.mcp;
  if (!metadata.versions?.[version]) failures.push(`${name}@${version} is not published`);
  if (metadata["dist-tags"]?.latest !== version) {
    failures.push(`${name} latest dist-tag is ${metadata["dist-tags"]?.latest ?? "missing"}, expected ${version}`);
  }
}

if (!python.releases?.[expected.python]?.length) failures.push(`tryvira-sdk==${expected.python} is not published`);
if (python.info?.version !== expected.python) failures.push(`tryvira-sdk latest is ${python.info?.version ?? "missing"}, expected ${expected.python}`);
if (!pythonWheel?.url) failures.push(`tryvira-sdk==${expected.python} has no universal Python wheel to inspect`);

if (failures.length) {
  console.error("REGISTRY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const consumer = await mkdtemp(join(tmpdir(), "tryvira-public-consumer-"));
try {
  await writeFile(join(consumer, "package.json"), JSON.stringify({
    name: "tryvira-public-docs-contract-consumer",
    private: true,
    type: "module"
  }, null, 2));

  run("npm", [
    "install", "--ignore-scripts", "--no-audit", "--no-fund",
    `@tryvira/sdk@${expected.sdk}`,
    `@tryvira/mcp@${expected.mcp}`
  ], { cwd: consumer });

  const methodInventory = await readFile(new URL("../docs/reference/sdk-method-inventory.md", import.meta.url), "utf8");
  const methodRows = methodInventory.split(/\r?\n/).filter((line) => /^\| [^|]+ \| `vira-[^|]+` \|/.test(line));
  const inventoryColumn = (index) => methodRows.flatMap((line) => {
    const cells = line.split("|");
    return [...(cells[index] ?? "").matchAll(/`([A-Za-z][A-Za-z0-9_]*)`/g)].map((match) => match[1]);
  });
  const assertInventory = (label, actual, documented) => {
    const actualSorted = [...actual].sort();
    const documentedSorted = [...documented].sort();
    const missing = actualSorted.filter((method) => !documentedSorted.includes(method));
    const stale = documentedSorted.filter((method) => !actualSorted.includes(method));
    const duplicated = documentedSorted.filter((method, index) => documentedSorted.indexOf(method) !== index);
    if (missing.length || stale.length || duplicated.length) {
      throw new Error(`${label}_METHOD_INVENTORY_MISMATCH:missing=${missing.join(",")}:stale=${stale.join(",")}:duplicate=${duplicated.join(",")}`);
    }
  };
  const jsDeclaration = await readFile(join(consumer, "node_modules", "@tryvira", "sdk", "dist", "js-client.d.ts"), "utf8");
  const jsClassStart = jsDeclaration.indexOf("export declare class ViraClient {");
  if (jsClassStart < 0) throw new Error("SDK_VIRA_CLIENT_DECLARATION_MISSING");
  const jsClassEnd = jsDeclaration.indexOf("\n}", jsClassStart);
  if (jsClassEnd < 0) throw new Error("SDK_VIRA_CLIENT_DECLARATION_UNTERMINATED");
  const jsMethods = [...jsDeclaration.slice(jsClassStart, jsClassEnd).matchAll(/^\s{4}(?!private\s|constructor\()([A-Za-z][A-Za-z0-9_]*)\(/gm)].map((match) => match[1]);
  assertInventory("JAVASCRIPT_SDK", jsMethods, inventoryColumn(3));

  const mcpRoot = join(consumer, "node_modules", "@tryvira", "mcp");
  const mcpPackage = JSON.parse(await readFile(join(mcpRoot, "package.json"), "utf8"));
  if (mcpPackage.version !== expected.mcp) throw new Error(`MCP_INSTALLED_VERSION_MISMATCH:${mcpPackage.version}`);
  if (!mcpPackage.bin?.["vira-mcp"]) throw new Error("MCP_PUBLISHED_BIN_MISSING");

  const mcpCli = await readFile(join(mcpRoot, mcpPackage.bin["vira-mcp"]), "utf8");
  const arrayStart = mcpCli.match(/\b(?:var|let|const)\s+tools\s*=\s*\[/);
  if (!arrayStart) throw new Error("MCP_TOOL_ARRAY_NOT_FOUND");
  const arrayEnd = mcpCli.indexOf("];", arrayStart.index + arrayStart[0].length);
  if (arrayEnd < 0) throw new Error("MCP_TOOL_ARRAY_UNTERMINATED");
  const toolBlock = mcpCli.slice(arrayStart.index + arrayStart[0].length, arrayEnd);
  const mcpTools = [...toolBlock.matchAll(/\{\s*name:\s*"([^"]+)"\s*,\s*description:\s*"/g)].map(match => match[1]);
  if (!mcpTools.length || new Set(mcpTools).size !== mcpTools.length) throw new Error("MCP_TOOL_SNAPSHOT_INVALID");
  const catalog = await readFile(new URL("../docs/reference/mcp-tools.md", import.meta.url), "utf8");
  const documentedTools = [...catalog.matchAll(/^\| `([^`]+)` \|/gm)].map(match => match[1]);
  if (JSON.stringify(documentedTools) !== JSON.stringify(mcpTools)) {
    throw new Error(`MCP_DOCUMENTATION_TOOL_SNAPSHOT_MISMATCH:published=${mcpTools.join(",")}:docs=${documentedTools.join(",")}`);
  }

  const pythonTarget = join(consumer, "python");
  const wheelResponse = await fetch(pythonWheel.url, {
    headers: { "user-agent": "tryvira-public-docs-registry-check" },
  });
  if (!wheelResponse.ok) throw new Error(`tryvira-sdk wheel download failed: HTTP ${wheelResponse.status}`);
  const wheelPath = join(consumer, pythonWheel.filename);
  await writeFile(wheelPath, Buffer.from(await wheelResponse.arrayBuffer()));
  run("unzip", ["-q", wheelPath, "-d", pythonTarget]);

  const pythonProbe = [
    "from vira import ViraClient",
    "client = ViraClient('https://api.example.invalid')",
    "import inspect, json",
    "exposed = sorted(name for name, value in inspect.getmembers(client, callable) if not name.startswith('_'))",
    "print('PYTHON_METHOD_INVENTORY:' + json.dumps(exposed))"
  ].join("\n");
  const pythonInventoryOutput = run("python3", ["-c", pythonProbe], {
    env: { ...process.env, PYTHONPATH: pythonTarget }
  });
  const pythonInventoryLine = pythonInventoryOutput.split(/\r?\n/).find((line) => line.startsWith("PYTHON_METHOD_INVENTORY:"));
  if (!pythonInventoryLine) throw new Error("PYTHON_SDK_METHOD_INVENTORY_MISSING");
  const pythonMethods = JSON.parse(pythonInventoryLine.slice("PYTHON_METHOD_INVENTORY:".length));
  assertInventory("PYTHON_SDK", pythonMethods, inventoryColumn(4));

  console.log("REGISTRY_VERIFY_PASS");
  const versionsMatch = methodInventory.includes(`@tryvira/sdk@${expected.sdk}`) && methodInventory.includes(`tryvira-sdk==${expected.python}`);
  if (!versionsMatch) throw new Error(`SDK_METHOD_INVENTORY_VERSION_MISMATCH:js=${expected.sdk}:python=${expected.python}`);
  console.log(`REGISTRY_METHOD_INVENTORY_PASS javascript=${jsMethods.length} python=${pythonMethods.length}`);
  console.log(`Downloaded and verified latest @tryvira/sdk@${expected.sdk}, @tryvira/mcp@${expected.mcp} (${mcpTools.length}-tool snapshot), and published tryvira-sdk==${expected.python}.`);
} finally {
  await rm(consumer, { recursive: true, force: true });
}
