import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const skipped = new Set(["node_modules", ".venv", ".next", ".git", "dist", "__pycache__"]);
const candidates = [];
async function visit(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (skipped.has(entry.name)) continue;
    const next = join(path, entry.name);
    if (entry.isDirectory()) await visit(next);
    else if (entry.isFile() && /\.(?:mjs|js|cjs)$/.test(entry.name))
      candidates.push(next);
  }
}

for (const folder of ["examples", "tutorials"]) {
  await visit(join(root, folder));
}
for (const path of candidates) {
  const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
  if (result.status !== 0) {
    console.error("EXAMPLE_SYNTAX_FAIL", relative(root, path), result.stderr);
    process.exitCode = 1;
  }
}
if (process.exitCode) process.exit(process.exitCode);

const python = spawnSync("python3", ["-m", "compileall", "-q", "examples", "tutorials"], {
  cwd: root, encoding: "utf8",
});
if (python.status !== 0) {
  console.error("EXAMPLE_PYTHON_SYNTAX_FAIL", python.stderr);
  process.exit(python.status || 1);
}
console.log("EXAMPLES_SYNTAX_PASS", candidates.length, "JavaScript files plus Python compileall");
