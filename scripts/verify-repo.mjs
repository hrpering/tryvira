import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "README.md",
  "LICENSE",
  "NOTICE",
  "SECURITY.md",
  "SUPPORT.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "GOVERNANCE.md",
  "CHANGELOG.md",
  "docs/api-reference.md",
  "docs/behavior-points.md",
  "docs/signals.md",
  "docs/semantic-routing.md",
  "docs/strategies.md",
  "docs/teach.md",
  "docs/evaluation-and-approval.md",
  "docs/release.md",
  "docs/runtime.md",
  "docs/traces.md",
  "tutorials/marketing-agent/README.md",
  "docs/reference/javascript-sdk.md",
  "docs/reference/python-sdk.md",
  "docs/reference/mcp.md",
  "docs/reference/mcp-tools.md",
  "docs/reference/api.md",
  "docs/reference/troubleshooting.md",
  "docs/guides/connect-an-ai-system.md"
];

for (const file of requiredFiles) {
  try {
    await readFile(join(root, file), "utf8");
  } catch {
    failures.push(`Missing required file: ${file}`);
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
const textExtensions = new Set([
  ".md", ".mjs", ".js", ".ts", ".py", ".json", ".yml", ".yaml", ".txt", ".example", ""
]);

for (const file of files) {
  const rel = relative(root, file);
  const ext = extname(file);
  if (!textExtensions.has(ext) && !rel.endsWith(".env.example")) continue;

  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    continue;
  }

  if (rel.endsWith(".json")) {
    try {
      JSON.parse(text);
    } catch (error) {
      failures.push(`Invalid JSON in ${rel}: ${error.message}`);
    }
  }

  if (rel.endsWith(".mjs")) {
    const checked = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (checked.status !== 0) {
      failures.push(`JavaScript syntax failed for ${rel}: ${checked.stderr}`);
    }
  }

  if (rel.endsWith(".py")) {
    const checked = spawnSync("python3", ["-m", "py_compile", file], { encoding: "utf8" });
    if (checked.status !== 0) {
      failures.push(`Python syntax failed for ${rel}: ${checked.stderr}`);
    }
  }
}

if (failures.length) {
  console.error("REPOSITORY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REPOSITORY_VERIFY_PASS");
console.log(`Checked ${files.length} files.`);
