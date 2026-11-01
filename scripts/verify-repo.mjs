import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "README.md","LICENSE","NOTICE","SECURITY.md","SUPPORT.md","CONTRIBUTING.md","CODE_OF_CONDUCT.md","GOVERNANCE.md","CHANGELOG.md",
  "docs/README.md","docs/developer-guide.md","docs/capability-map.md","docs/capability-discovery.md","docs/canonical-authoring.md","docs/published-packages.md","docs/decision-and-quality.md",
  "docs/api-reference.md","docs/behavior-points.md","docs/signals.md","docs/semantic-routing.md","docs/behavior-programs.md","docs/strategies.md","docs/authoring-quality.md",
  "docs/gpu-acceleration-vision.md","docs/teach.md","docs/evaluation-and-approval.md","docs/release.md","docs/runtime.md","docs/traces.md","docs/quickstart.md","docs/packs.md",
  "docs/reference/javascript-sdk.md","docs/reference/python-sdk.md","docs/reference/mcp.md","docs/reference/mcp-tools.md","docs/reference/api.md",
  "docs/guides/connect-an-ai-system.md","docs/troubleshooting/README.md","docs/ai-prompts/README.md","docs/ai-prompts/design-response-quality-decision.md",
  "examples/javascript/connect-observe.mjs","examples/javascript/canonical-authoring.mjs","examples/javascript/end-to-end-lifecycle.mjs","examples/javascript/quality-decision.mjs","examples/javascript/package.json",
  "examples/python/quality_decision.py","examples/python/requirements.txt","examples/mcp/README.md","examples/mcp/client-config.example.json",
  "tutorials/marketing-agent/README.md","tutorials/marketing-agent/01-connect.mjs","tutorials/marketing-agent/07-quality-decision.mjs","tutorials/marketing-agent/_client.mjs","tutorials/marketing-agent/package.json",
  "docs/github-repository-metadata.md","assets/vira-overview.svg","assets/vira-request-path.svg","assets/vira-integrations.svg","assets/vira-use-cases.svg","assets/vira-gpu-vision.svg","assets/social-preview.png"
];

for (const file of requiredFiles) {
  try { await readFile(join(root, file)); }
  catch { failures.push(`Missing required file: ${file}`); }
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
const textExtensions = new Set([".md",".mjs",".js",".ts",".py",".json",".yml",".yaml",".txt",".example",".svg",""]);
const stalePackagePatterns = [
  [new RegExp("@" + "vira/sdk", "g"), "stale legacy JS package"],
  [new RegExp("@" + "vira/mcp", "g"), "stale legacy MCP package"],
  [new RegExp("pip install " + "vira-sdk", "g"), "stale legacy Python package"]
];

for (const file of files) {
  const rel = relative(root, file);
  const ext = extname(file);
  if (!textExtensions.has(ext) && !rel.endsWith(".env.example")) continue;
  let text;
  try { text = await readFile(file, "utf8"); } catch { continue; }

  if (rel.endsWith(".json")) {
    try { JSON.parse(text); }
    catch (error) { failures.push(`Invalid JSON in ${rel}: ${error.message}`); }
  }
  if (rel.endsWith(".mjs")) {
    const checked = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (checked.status !== 0) failures.push(`JavaScript syntax failed for ${rel}: ${checked.stderr}`);
  }
  if (rel.endsWith(".py")) {
    const checked = spawnSync("python3", ["-m", "py_compile", file], { encoding: "utf8" });
    if (checked.status !== 0) failures.push(`Python syntax failed for ${rel}: ${checked.stderr}`);
  }
  if (rel.endsWith(".svg") && !text.includes("<svg")) failures.push(`Invalid SVG in ${rel}: missing <svg root>`);

  for (const [pattern, label] of stalePackagePatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) failures.push(`${label} in ${rel}`);
  }
}

const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (packageJson.version !== "0.10.0") failures.push("package.json version must be 0.10.0");
if (packageJson.license !== "UNLICENSED") failures.push("documentation package license must be UNLICENSED");

const lockJson = JSON.parse(await readFile(join(root, "package-lock.json"), "utf8"));
if (lockJson.version !== "0.10.0" || lockJson.packages?.[""]?.version !== "0.10.0") failures.push("package-lock.json version must be 0.10.0");

const readme = await readFile(join(root, "README.md"), "utf8");
for (const marker of [
  "@tryvira/sdk","@tryvira/mcp","tryvira-sdk","0.1.14","connectOnce","Teach AI","Response Quality",
  "Capability discovery","Canonical authoring","createSemanticTask","activateBehaviorStrategy","Developer guide"
]) {
  if (!readme.includes(marker)) failures.push(`README missing marker: ${marker}`);
}
if (readme.includes("Apache--2.0") || readme.includes("licensed under the [Apache License")) failures.push("README still claims Apache documentation licensing");
if (readme.includes("0.1.6")) failures.push("README still contains stale public client version 0.1.6");

const jsRef = await readFile(join(root, "docs/reference/javascript-sdk.md"), "utf8");
for (const marker of ["0.1.14","listCapabilities","listSemanticTasks","createSemanticTask","listBehaviorPoints","createBehaviorPoint","activateBehaviorStrategy","createTeachProposal","transitionTeachProposal","previewPackUpgrade"]) {
  if (!jsRef.includes(marker)) failures.push(`JavaScript SDK reference missing: ${marker}`);
}

const pyRef = await readFile(join(root, "docs/reference/python-sdk.md"), "utf8");
for (const marker of ["0.1.14","list_capabilities","list_semantic_tasks","create_semantic_task","list_behavior_points","create_behavior_point","activate_behavior_strategy","create_teach_proposal","transition_teach_proposal","preview_pack_upgrade"]) {
  if (!pyRef.includes(marker)) failures.push(`Python SDK reference missing: ${marker}`);
}

const mcpTools = await readFile(join(root, "docs/reference/mcp-tools.md"), "utf8");
for (const tool of [
  "list_capabilities","list_semantic_tasks","create_semantic_task","list_behavior_points","create_behavior_point","activate_behavior_strategy",
  "submit_teach_evidence","create_teach_proposal","transition_teach_proposal","create_release",
  "start_strategy_execution","continue_strategy_execution","compile_behavior_capsule","serve_behavior_projection","preview_pack_upgrade"
]) {
  if (!mcpTools.includes(tool)) failures.push(`MCP catalog missing tool: ${tool}`);
}
if (!mcpTools.includes("0.1.14")) failures.push("MCP catalog must document the 0.1.14 package line");
if (!mcpTools.includes("tools/list")) failures.push("MCP catalog must direct integrations to runtime tool discovery");

const apiRef = await readFile(join(root, "docs/reference/api.md"), "utf8");
for (const route of ["/v1/capabilities","/v1/semantic-tasks","/v1/behavior-points","/activate","/v1/teach/proposals","/upgrade-preview"]) {
  if (!apiRef.includes(route)) failures.push(`HTTP reference missing route marker: ${route}`);
}

const published = await readFile(join(root, "docs/published-packages.md"), "utf8");
for (const marker of ["@tryvira/sdk","@tryvira/mcp","tryvira-sdk","0.1.14"]) {
  if (!published.includes(marker)) failures.push(`Published packages missing marker: ${marker}`);
}

const developerGuide = await readFile(join(root, "docs/developer-guide.md"), "utf8");
for (const marker of ["createSemanticTask","createBehaviorPoint","resolveSemantic","resolveRuntime","importPack","installPack","evaluatePack","approvePack","releasePack","verifyPack()"] ) {
  if (!developerGuide.includes(marker)) failures.push(`Developer guide missing lifecycle marker: ${marker}`);
}

if (failures.length) {
  console.error("REPOSITORY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REPOSITORY_VERIFY_PASS");
console.log(`Checked ${files.length} files.`);
