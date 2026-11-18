import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { parseMcpTools } from "./mcp-catalog.mjs";

const root = process.cwd();
const requestHeaders = {
  accept: "application/json",
  "user-agent": "tryvira-public-docs-registry-sync",
};

async function getJson(url, label) {
  const response = await fetch(url, { headers: requestHeaders });
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

function version(value, label) {
  if (typeof value !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(value)) {
    throw new Error(`${label}: invalid latest version ${String(value)}`);
  }
  return value;
}


const [sdkMeta, mcpMeta, pythonMeta] = await Promise.all([
  getJson("https://registry.npmjs.org/%40tryvira%2Fsdk", "@tryvira/sdk"),
  getJson("https://registry.npmjs.org/%40tryvira%2Fmcp", "@tryvira/mcp"),
  getJson("https://pypi.org/pypi/tryvira-sdk/json", "tryvira-sdk"),
]);
const latest = {
  npm: {
    "@tryvira/sdk": version(sdkMeta["dist-tags"]?.latest, "@tryvira/sdk latest"),
    "@tryvira/mcp": version(mcpMeta["dist-tags"]?.latest, "@tryvira/mcp latest"),
  },
  pypi: {
    "tryvira-sdk": version(pythonMeta.info?.version, "tryvira-sdk latest"),
  },
};

const temp = await mkdtemp(join(tmpdir(), "tryvira-registry-sync-"));
try {
  const packOutput = run("npm", ["pack", "--json", "--silent", `@tryvira/mcp@${latest.npm["@tryvira/mcp"]}`, "--pack-destination", temp]);
  const packInfo = JSON.parse(packOutput);
  const tarball = join(temp, packInfo[0].filename);
  const mcpPackage = JSON.parse(run("tar", ["-xOf", tarball, "package/package.json"]));
  if (mcpPackage.version !== latest.npm["@tryvira/mcp"] || !mcpPackage.bin?.["vira-mcp"]) {
    throw new Error("Downloaded MCP package metadata does not match npm latest");
  }
  const cli = run("tar", ["-xOf", tarball, `package/${mcpPackage.bin["vira-mcp"]}`]);
  const tools = parseMcpTools(cli);
  const snapshot = {
    package: "@tryvira/mcp",
    version: latest.npm["@tryvira/mcp"],
    tools: tools.map(({name,effectful})=>({name,effectful:Boolean(effectful)}))
      .sort((a,b)=>a.name.localeCompare(b.name)),
  };
  await writeFile(join(root,"docs/reference/mcp-published-tools.json"),
    JSON.stringify(snapshot,null,2)+"\n");



  const versionsPath = join(root, "package-versions.json");
  const oldVersions = JSON.parse(await readFile(versionsPath, "utf8"));
  await writeFile(versionsPath, `${JSON.stringify(latest, null, 2)}\n`);

  // Limit automatic version replacement to human-readable latest-install references.
  // Never rewrite hashed lockfiles or package manifests without regenerating
  // their dependency graphs using the project package manager.
  const SAFE_VERSION_SYNC_PATHS = [
    "README.md", "README.tr.md", "docs/published-packages.md",
    "docs/reference/javascript-sdk.md", "docs/reference/python-sdk.md",
    "docs/reference/mcp.md", "docs/ai-prompts/setup-javascript-sdk.md",
    "docs/ai-prompts/setup-python-sdk.md", "docs/ai-prompts/setup-mcp.md",
    "examples/README.md", "examples/mcp/README.md",
    "examples/javascript/README.md", "examples/python/README.md",
    "examples/semantic-runtime/README.md",
    "examples/agent-first/README.md", "examples/frameworks/mcp-client/README.md",
    "docs/agent-first-operation-flow.md", "docs/agent-skills/e2e-completion-plan.md"
  ];
  for (const relativePath of SAFE_VERSION_SYNC_PATHS) {
    const path = join(root, relativePath);
    const original = await readFile(path, "utf8");
    let updated = original;
    const updates = [
      ["@tryvira/sdk", oldVersions.npm?.["@tryvira/sdk"], latest.npm["@tryvira/sdk"]],
      ["@tryvira/mcp", oldVersions.npm?.["@tryvira/mcp"], latest.npm["@tryvira/mcp"]],
      ["tryvira-sdk", oldVersions.pypi?.["tryvira-sdk"], latest.pypi["tryvira-sdk"]]
    ];
    for (const [name, previous, current] of updates) {
      if (!previous || previous === current) continue;
      updated = updated.split("\n").map(line =>
        line.includes(name) ? line.replaceAll(previous, current) : line
      ).join("\n");
    }
    if (updated !== original) await writeFile(path, updated);
  }
  // The curated MCP operation/Skill map must not be overwritten with a shorter
  // generated summary during registry sync. Real installed tools/list remains
  // the authority, not a stale count in generated prose.
  if (!Array.isArray(tools) || tools.length === 0) {
    throw new Error("MCP_PUBLISHED_TOOL_CATALOG_EMPTY");
  }

  console.log(`REGISTRY_SYNC_PASS sdk=${latest.npm["@tryvira/sdk"]} mcp=${latest.npm["@tryvira/mcp"]} (${tools.length} tools) python=${latest.pypi["tryvira-sdk"]}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
