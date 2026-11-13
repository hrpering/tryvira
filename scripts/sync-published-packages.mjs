import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { parseMcpTools, renderMcpCatalog } from "./mcp-catalog.mjs";

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

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
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
  const catalog = renderMcpCatalog(latest.npm["@tryvira/mcp"], tools);

  const versionsPath = join(root, "package-versions.json");
  const oldVersions = JSON.parse(await readFile(versionsPath, "utf8"));
  await writeFile(versionsPath, `${JSON.stringify(latest, null, 2)}\n`);

  const candidates = await walk(root);
  const versionPattern = /\b\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?\b/g;
  const textExtensions = new Set([".md", ".mjs", ".js", ".ts", ".py", ".json", ".txt", ".yml", ".yaml"]);
  for (const path of candidates) {
    const rel = relative(root, path);
    if (rel === "package-versions.json" || rel === "docs/reference/mcp-tools.md" || rel === "CHANGELOG.md") continue;
    const extension = path.slice(path.lastIndexOf("."));
    if (!textExtensions.has(extension)) continue;
    const original = await readFile(path, "utf8");
    const updated = original.split(/(?<=\n)/).map((line) => {
      let updatedLine = line;
      for (const [packageName, next] of [
        ["@tryvira/sdk", latest.npm["@tryvira/sdk"]],
        ["@tryvira/mcp", latest.npm["@tryvira/mcp"]],
        ["tryvira-sdk", latest.pypi["tryvira-sdk"]],
      ]) {
        if (!updatedLine.includes(packageName)) continue;
        const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const packageVersion = new RegExp(`(${escapedName}[^\\d\\n]{0,30}?)(\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?)`, "g");
        updatedLine = updatedLine.replace(packageVersion, `$1${next}`);
      }
      return updatedLine;
    }).join("");
    if (updated !== original) await writeFile(path, updated);
  }
  await writeFile(join(root, "docs/reference/mcp-tools.md"), catalog);

  console.log(`REGISTRY_SYNC_PASS sdk=${latest.npm["@tryvira/sdk"]} mcp=${latest.npm["@tryvira/mcp"]} (${tools.length} tools) python=${latest.pypi["tryvira-sdk"]}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
