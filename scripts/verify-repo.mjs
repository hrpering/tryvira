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
  "docs/behavior-programs.md",
  "docs/strategies.md",
  "docs/authoring-quality.md",
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
  "docs/guides/connect-an-ai-system.md",
  "docs/troubleshooting/README.md",
  "docs/troubleshooting/api-errors.md",
  "docs/troubleshooting/authentication-and-scope.md",
  "docs/troubleshooting/sdk-errors.md",
  "docs/troubleshooting/mcp-errors.md",
  "docs/troubleshooting/semantic-routing.md",
  "docs/troubleshooting/behavior-points.md",
  "docs/troubleshooting/signals.md",
  "docs/troubleshooting/packs.md",
  "docs/troubleshooting/strategies.md",
  "docs/troubleshooting/teach-and-evaluation.md",
  "docs/troubleshooting/runtime-and-release.md",
  "docs/ai-prompts/README.md",
  "docs/ai-prompts/master-debugger.md",
  "docs/ai-prompts/setup-javascript-sdk.md",
  "docs/ai-prompts/setup-python-sdk.md",
  "docs/ai-prompts/setup-mcp.md",
  "docs/ai-prompts/setup-http-api.md",
  "docs/ai-prompts/setup-behavior-lifecycle.md",
  "docs/ai-prompts/errors-api-auth-sdk.md",
  "docs/ai-prompts/errors-semantic-behavior.md",
  "docs/ai-prompts/errors-signals.md",
  "docs/ai-prompts/errors-packs.md",
  "docs/ai-prompts/errors-strategies.md",
  "docs/ai-prompts/errors-teach-evaluation.md",
  "docs/ai-prompts/errors-runtime-release.md",
  "docs/ai-prompts/author-semantic-task.md",
  "docs/ai-prompts/author-behavior-point.md",
  "docs/ai-prompts/deepen-behavior-point.md",
  "docs/ai-prompts/author-behavior-program.md",
  "docs/ai-prompts/author-strategy.md",
  "docs/ai-prompts/deepen-strategy.md",
  "docs/ai-prompts/author-signal-evaluation.md",
  "docs/ai-prompts/author-governed-pack.md",
  "docs/ai-prompts/review-authoring-quality.md",
  "examples/authoring-quality/README.md",
  "examples/authoring-quality/semantic-tasks.yaml",
  "examples/authoring-quality/behavior-points.yaml",
  "examples/authoring-quality/marketing-launch.generic.strategy.json",
  "examples/authoring-quality/marketing-launch.production.strategy.json",
  "examples/authoring-quality/quality-review.md",
  "docs/github-repository-metadata.md",
  "assets/vira-overview.svg",
  "assets/vira-request-path.svg",
  "assets/vira-integrations.svg",
  "assets/vira-use-cases.svg",
  "assets/social-preview.png"
];

for (const file of requiredFiles) {
  try {
    await readFile(join(root, file));
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
  ".md", ".mjs", ".js", ".ts", ".py", ".json", ".yml", ".yaml", ".txt", ".example", ".svg", ""
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

  if (rel.endsWith(".svg") && !text.includes("<svg")) {
    failures.push(`Invalid SVG in ${rel}: missing <svg root>`);
  }
}

if (failures.length) {
  console.error("REPOSITORY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REPOSITORY_VERIFY_PASS");
console.log(`Checked ${files.length} files.`);
