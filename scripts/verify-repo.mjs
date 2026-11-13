import { readdir, readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const root = process.cwd();
const failures = [];
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", ".venv", "dist"].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if ([".md", ".json", ".yml", ".yaml", ".mjs", ".ts", ".tsx", ".py"].includes(extname(entry.name))) files.push(path);
  }
}
await walk(root);

const versions = JSON.parse(await readFile(join(root, "package-versions.json"), "utf8"));
const publicText = await readFile(join(root, "README.md"), "utf8");
for (const name of ["@tryvira/sdk", "@tryvira/mcp", "tryvira-sdk"]) {
  if (!publicText.includes(name)) failures.push("README is missing a public package link");
}
for (const version of [...Object.values(versions.npm), ...Object.values(versions.pypi)]) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) failures.push("Package metadata has an invalid version");
}

const credentialPatterns = [
  /\b(?:sk|pk|api|secret)[-_](?:live|prod)[-_][A-Za-z0-9_-]{16,}\b/i,
  /\b(?:ghp|github_pat|npm|pypi)-[A-Za-z0-9_-]{20,}\b/i,
  /\bAKIA[0-9A-Z]{16}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
for (const path of files) {
  const content = await readFile(path, "utf8");
  for (const pattern of credentialPatterns) {
    if (pattern.test(content)) failures.push(`Potential credential found in ${path.slice(root.length + 1)}`);
  }
  if (path.endsWith(".md")) {
    const localLinks = [...content.matchAll(/\]\((?!https?:|mailto:|#)([^)#]+)(?:#[^)]*)?\)/g)];
    for (const [, target] of localLinks) {
      const decoded = decodeURIComponent(target);
      if (!await exists(resolve(join(path, ".."), decoded))) failures.push(`Broken local link in ${path.slice(root.length + 1)}`);
    }
  }
}

async function exists(path) {
  try { await readFile(path); return true; } catch {
    try { return (await readdir(path)).length >= 0; } catch { return false; }
  }
}

if (failures.length) {
  console.error("REPOSITORY_VERIFY_FAIL");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`REPOSITORY_VERIFY_PASS (${files.length} files checked)`);
