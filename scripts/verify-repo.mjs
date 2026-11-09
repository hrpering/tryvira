import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "README.md","LICENSE","NOTICE","SECURITY.md","SUPPORT.md","CONTRIBUTING.md","CODE_OF_CONDUCT.md","GOVERNANCE.md","CHANGELOG.md",
  "docs/README.md","docs/developer-guide.md","docs/capability-map.md","docs/capability-discovery.md","docs/canonical-authoring.md","docs/published-packages.md","docs/decision-and-quality.md",
  "docs/api-reference.md","docs/behavior-points.md","docs/signals.md","docs/semantic-routing.md","docs/behavior-programs.md","docs/strategies.md","docs/authoring-quality.md",
  "docs/teach.md","docs/evaluation-and-approval.md","docs/release.md","docs/runtime.md","docs/traces.md","docs/quickstart.md","docs/packs.md",
  "docs/reference/javascript-sdk.md","docs/reference/python-sdk.md","docs/reference/mcp.md","docs/reference/mcp-tools.md","docs/reference/api.md",
  "docs/guides/connect-an-ai-system.md","docs/troubleshooting/README.md","docs/ai-prompts/README.md","docs/ai-prompts/design-response-quality-decision.md",
  "examples/javascript/connect-observe.mjs","examples/javascript/canonical-authoring.mjs","examples/javascript/end-to-end-lifecycle.mjs","examples/javascript/quality-decision.mjs","examples/javascript/package.json",
  "examples/python/quality_decision.py","examples/python/requirements.txt","examples/mcp/README.md","examples/mcp/client-config.example.json",
  "tutorials/marketing-agent/README.md","tutorials/marketing-agent/01-connect.mjs","tutorials/marketing-agent/07-quality-decision.mjs","tutorials/marketing-agent/09-release-pack.mjs","tutorials/marketing-agent/10-review-teach-proposal.mjs","tutorials/marketing-agent/guard.mjs","tutorials/marketing-agent/safety.test.mjs","tutorials/marketing-agent/_client.mjs","tutorials/marketing-agent/package.json",
  "scripts/verify-repo.mjs","scripts/verify-registry.mjs","scripts/sync-published-packages.mjs","package-versions.json",".github/workflows/sync-published-packages.yml",
  "AGENTS.md","skills/README.md","skills/VERSION","skills/CHANGELOG.md","skills/evals/trigger-scenarios.jsonl","skills/evals/workflow-scenarios.jsonl","skills/evals/test_skill_library.py","skills/evals/test_public_contracts.py",
  "scripts/validate_agent_skills.py","scripts/package_agent_skills.py","scripts/export_skill_trigger_eval.py","references/capability-matrix.md","references/authority-and-safety.md","references/creator-systems.md","docs/agent-skills/capability-coverage.md","docs/agent-skills/gap-analysis.md","docs/agent-skills/creator-workflow.md","docs/agent-skills/installation.md","docs/agent-skills/maintenance.md","docs/agent-skills/validation-status.md",
  "examples/frameworks/README.md","examples/frameworks/node-next/package.json","examples/frameworks/python_fastapi/vira_app.py","examples/frameworks/langgraph/graph.py","examples/frameworks/mcp-client/client.mjs",
  "docs/github-repository-metadata.md","assets/vira-overview.svg","assets/vira-request-path.svg","assets/vira-integrations.svg","assets/vira-use-cases.svg","assets/social-preview.png"
];

for (const file of requiredFiles) {
  try { await readFile(join(root, file)); }
  catch { failures.push(`Missing required file: ${file}`); }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", ".venv", "__pycache__", ".next", ".pytest_cache"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
const textExtensions = new Set([".md",".mjs",".js",".ts",".py",".json",".jsonl",".yml",".yaml",".txt",".example",".svg",""]);
const stalePackagePatterns = [
  [new RegExp("@" + "vira/sdk", "g"), "stale legacy JS package"],
  [new RegExp("@" + "vira/mcp", "g"), "stale legacy MCP package"],
  [new RegExp("pip install " + "vira-sdk", "g"), "stale legacy Python package"]
];
const secretPatterns = [
  [/-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g, "private key material"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, "GitHub token-like value"],
  [/\bgithub_pat_[A-Za-z0-9_]{20,}\b/g, "GitHub fine-grained token-like value"],
  [/\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g, "OpenAI key-like value"],
  [new RegExp("\\b" + ["AK", "IA"].join("") + "[0-9A-Z]{16}\\b", "g"), "AWS access-key-like value"],
  [new RegExp("\\b" + ["AS", "IA"].join("") + "[0-9A-Z]{16}\\b", "g"), "AWS temporary access-key-like value"],
  [/\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g, "payment-provider secret-key-like value"],
  [/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g, "Slack token-like value"],
  [/\bSG\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\b/g, "email-provider token-like value"],
  [/\bAIza[0-9A-Za-z_-]{30,}\b/g, "Google API key-like value"],
  [/\bBearer\s+[A-Za-z0-9._~+/-]{32,}={0,2}/g, "hard-coded bearer token"],
  [/\bvira_(?:live|test)_[A-Za-z0-9_-]{24,}\b/g, "Vira API key-like value"],
  [/\bevren_llm_[A-Za-z0-9_-]{20,}\b/g, "Evren service key-like value"],
  [/\bpypi-[A-Za-z0-9_-]{20,}\b/g, "PyPI token-like value"],
  [/\bnpm_[A-Za-z0-9]{20,}\b/g, "npm token-like value"]
];
const secretPatternSentinels = [
  [["vira", "live"].join("_") + "_" + "A".repeat(24), "Vira API key"],
  [["evren", "llm"].join("_") + "_" + "A".repeat(20), "Evren service key"],
  [["AK", "IA"].join("") + "A".repeat(16), "AWS access key"],
  ["Bearer " + "A".repeat(32), "Bearer token"],
];
for (const [sample, label] of secretPatternSentinels) {
  const detected = secretPatterns.some(([pattern]) => {
    pattern.lastIndex = 0;
    return pattern.test(sample);
  });
  if (!detected) failures.push(`Secret scanner regression: ${label} sentinel was not detected`);
}
const restrictedComputeTerms = new RegExp(`\\b(?:${["G", "PU"].join("")}|${["CU", "DA"].join("")})\\b`, "i");
for (const sample of [["G", "PU"].join(""), ["CU", "DA"].join("")]) {
  restrictedComputeTerms.lastIndex = 0;
  if (!restrictedComputeTerms.test(sample)) failures.push("Public compute disclosure guard regression");
}

function localTarget(raw) {
  let target = raw.trim();
  if (!target || target.startsWith("#")) return null;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(target)) return null;
  if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
  const titleIndex = target.search(/\s+["']/);
  if (titleIndex >= 0) target = target.slice(0, titleIndex);
  target = target.split("#", 1)[0].split("?", 1)[0];
  if (!target) return null;
  try { return decodeURIComponent(target); }
  catch { return target; }
}

async function checkLocalLink(sourceFile, rawTarget) {
  const target = localTarget(rawTarget);
  if (!target) return;
  const sourceDir = dirname(sourceFile);
  const absolute = target.startsWith("/")
    ? resolve(root, `.${target}`)
    : resolve(sourceDir, target);
  const rootPrefix = root.endsWith(sep) ? root : `${root}${sep}`;
  if (absolute !== root && !absolute.startsWith(rootPrefix)) {
    failures.push(`Local link escapes repository in ${relative(root, sourceFile)}: ${rawTarget}`);
    return;
  }
  try { await stat(absolute); }
  catch { failures.push(`Broken local link in ${relative(root, sourceFile)}: ${rawTarget}`); }
}

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
  if (rel.endsWith(".jsonl")) {
    for (const [index, line] of text.split(/\r?\n/).entries()) {
      if (!line.trim()) continue;
      try { JSON.parse(line); }
      catch (error) { failures.push(`Invalid JSONL in ${rel}:${index + 1}: ${error.message}`); }
    }
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
  for (const [pattern, label] of secretPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) failures.push(`${label} in ${rel}`);
  }
  restrictedComputeTerms.lastIndex = 0;
  if (restrictedComputeTerms.test(text)) failures.push(`Restricted compute implementation disclosure is not permitted in public materials: ${rel}`);

  if (rel.endsWith(".md")) {
    for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) await checkLocalLink(file, match[1]);
    for (const match of text.matchAll(/<(?:a|img)\b[^>]*(?:href|src)=["']([^"']+)["'][^>]*>/gi)) await checkLocalLink(file, match[1]);
  }
}

const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (packageJson.version !== "0.10.1") failures.push("package.json version must be 0.10.1");
if (packageJson.license !== "UNLICENSED") failures.push("documentation package license must be UNLICENSED");
if (packageJson.scripts?.["verify:registry"] !== "node scripts/verify-registry.mjs") failures.push("package.json must expose verify:registry");
if (packageJson.scripts?.["sync:registry"] !== "node scripts/sync-published-packages.mjs") failures.push("package.json must expose sync:registry");

const packageVersions = JSON.parse(await readFile(join(root, "package-versions.json"), "utf8"));
const expectedPackageLines = [
  ["@tryvira/sdk", packageVersions.npm["@tryvira/sdk"]],
  ["@tryvira/mcp", packageVersions.npm["@tryvira/mcp"]],
  ["tryvira-sdk", packageVersions.pypi["tryvira-sdk"]],
];
for (const file of files) {
  const rel = relative(root, file);
  if (rel === "CHANGELOG.md" || rel === "package-versions.json") continue;
  if (!textExtensions.has(extname(file))) continue;
  let content;
  try { content = await readFile(file, "utf8"); } catch { continue; }
  for (const line of content.split(/\r?\n/)) {
    for (const [name, expected] of expectedPackageLines) {
      if (!line.includes(name)) continue;
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const references = [...line.matchAll(new RegExp(`${escapedName}[^\\d\\n]{0,30}?(\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?)`, "g"))];
      for (const match of references) {
        if (match[1] !== expected) failures.push(`Stale ${name} version in ${rel}: ${match[1]}, expected ${expected}`);
      }
    }
  }
}

const lockJson = JSON.parse(await readFile(join(root, "package-lock.json"), "utf8"));
if (lockJson.version !== "0.10.1" || lockJson.packages?.[""]?.version !== "0.10.1") failures.push("package-lock.json version must be 0.10.1");

const readme = await readFile(join(root, "README.md"), "utf8");
for (const marker of [
  "@tryvira/sdk","@tryvira/mcp","tryvira-sdk",packageVersions.npm["@tryvira/sdk"],packageVersions.npm["@tryvira/mcp"],packageVersions.pypi["tryvira-sdk"],"connectOnce","Teach AI","Response Quality",
  "Capability discovery","Canonical authoring","createSemanticTask","activateBehaviorStrategy","Developer guide",
  'os.environ["VIRA_API_URL"]'
]) {
  if (!readme.includes(marker)) failures.push(`README missing marker: ${marker}`);
}
if (readme.includes("Apache--2.0") || readme.includes("licensed under the [Apache License")) failures.push("README still claims Apache documentation licensing");
if (readme.includes("0.1.6")) failures.push("README still contains stale public client version 0.1.6");
if (/importPack\(\{\s*pack\s*[,}]/.test(readme)) failures.push("README Pack import must pass manifest and objects or an archive");
if (/installPack\([^,]+,\s*\{\s*variables\s*:/.test(readme)) failures.push("README Pack install must pass the variables object directly");
if (/evaluatePack\([^,]+,\s*\{\s*(?:rubric|passed|score|runId)\s*:/.test(readme)) failures.push("README Pack evaluation must pass a persisted evaluationId");
if (!readme.includes("installResponse.status === 202") || !readme.includes("vira.listPacks()")) failures.push("README Pack install must verify queued materialization before evaluation");


const jsRef = await readFile(join(root, "docs/reference/javascript-sdk.md"), "utf8");
for (const marker of [
  packageVersions.npm["@tryvira/sdk"],"listCapabilities","listSemanticTasks","createSemanticTask","listBehaviorPoints","createBehaviorPoint",
  "activateBehaviorStrategy","createTeachProposal","transitionTeachProposal","previewPackUpgrade",
  "deleteAISystem","deleteSemanticTask","deleteBehaviorPoint","deleteBehaviorStrategy"
]) {
  if (!jsRef.includes(marker)) failures.push(`JavaScript SDK reference missing: ${marker}`);
}

const pyRef = await readFile(join(root, "docs/reference/python-sdk.md"), "utf8");
for (const marker of [
  packageVersions.pypi["tryvira-sdk"],"list_capabilities","list_semantic_tasks","create_semantic_task","list_behavior_points","create_behavior_point",
  "activate_behavior_strategy","create_teach_proposal","transition_teach_proposal","preview_pack_upgrade",
  "delete_ai_system","delete_semantic_task","delete_behavior_point","delete_behavior_strategy"
]) {
  if (!pyRef.includes(marker)) failures.push(`Python SDK reference missing: ${marker}`);
}

const mcpTools = await readFile(join(root, "docs/reference/mcp-tools.md"), "utf8");
for (const tool of [
  "list_capabilities","list_semantic_tasks","list_behavior_points","list_behavior_programs",
  "list_behavior_strategies","resolve_semantic","resolve_runtime","create_semantic_task",
  "create_behavior_point","submit_teach_evidence","create_teach_proposal"
]) {
  if (!mcpTools.includes(tool)) failures.push(`MCP catalog missing tool: ${tool}`);
}
if (!mcpTools.includes(packageVersions.npm["@tryvira/mcp"])) failures.push("MCP catalog must document the current published package version");
if (!mcpTools.includes("registry-synchronized") && !mcpTools.includes("refreshed from the latest published MCP package")) failures.push("MCP catalog must disclose registry synchronization");
if (!mcpTools.includes("tools/list")) failures.push("MCP catalog must direct integrations to runtime tool discovery");


const apiRef = await readFile(join(root, "docs/reference/api.md"), "utf8");
for (const route of [
  "/v1/capabilities","/v1/semantic-tasks","/v1/behavior-points","/activate","/v1/teach/proposals","/upgrade-preview",
  "/v1/ai-systems/{systemId}","/v1/semantic-tasks/{taskId}","/v1/behavior-points/{behaviorPointId}","/v1/behavior-strategies/{strategyId}"
]) {
  if (!apiRef.includes(route)) failures.push(`HTTP reference missing route marker: ${route}`);
}
if (!apiRef.includes("| DELETE |")) failures.push("HTTP reference must document confirmed DELETE operations");

const published = await readFile(join(root, "docs/published-packages.md"), "utf8");
for (const marker of ["@tryvira/sdk","@tryvira/mcp","tryvira-sdk",packageVersions.npm["@tryvira/sdk"],packageVersions.npm["@tryvira/mcp"],packageVersions.pypi["tryvira-sdk"]]) {
  if (!published.includes(marker)) failures.push(`Published packages missing marker: ${marker}`);
}

const developerGuide = await readFile(join(root, "docs/developer-guide.md"), "utf8");
for (const marker of [
  "createSemanticTask","createBehaviorPoint","resolveSemantic","resolveRuntime","importPack","installPack","evaluatePack","approvePack","releasePack","verifyPack()","deleteSemanticTask"
]) {
  if (!developerGuide.includes(marker)) failures.push(`Developer guide missing lifecycle marker: ${marker}`);
}

const frameworkExamplePackage = JSON.parse(await readFile(join(root, "examples/frameworks/node-next/package.json"), "utf8"));
if (!new RegExp(`^\\^?${packageVersions.npm["@tryvira/sdk"].replaceAll(".", "\\.")}$`).test(frameworkExamplePackage.dependencies?.["@tryvira/sdk"] || "")) failures.push("Framework example must pin @tryvira/sdk to the current published line");

const jsExamplePackage = JSON.parse(await readFile(join(root, "examples/javascript/package.json"), "utf8"));
if (jsExamplePackage.dependencies?.["@tryvira/sdk"] !== `^${packageVersions.npm["@tryvira/sdk"]}`) failures.push("JavaScript examples must pin @tryvira/sdk to the current published line");
const semanticExamplePackage = JSON.parse(await readFile(join(root, "examples/semantic-runtime/package.json"), "utf8"));
if (semanticExamplePackage.dependencies?.["@tryvira/sdk"] !== `^${packageVersions.npm["@tryvira/sdk"]}`) failures.push("Semantic runtime example must pin @tryvira/sdk to the current published line");
const tutorialPackage = JSON.parse(await readFile(join(root, "tutorials/marketing-agent/package.json"), "utf8"));
if (tutorialPackage.dependencies?.["@tryvira/sdk"] !== `^${packageVersions.npm["@tryvira/sdk"]}`) failures.push("Marketing tutorial must pin @tryvira/sdk to the current published line");
const pythonRequirements = await readFile(join(root, "examples/frameworks/python_fastapi/requirements.txt"), "utf8");
if (!new RegExp(`^tryvira-sdk(?:==|>=)${packageVersions.pypi["tryvira-sdk"].replaceAll(".", "\\.")}\\s*$`, "m").test(pythonRequirements)) failures.push("Python examples must require the current published tryvira-sdk line");

const skillValidator = spawnSync("python3", ["scripts/validate_agent_skills.py"], { encoding: "utf8" });
if (skillValidator.status !== 0) failures.push(`Agent Skills structural validation failed: ${skillValidator.stderr || skillValidator.stdout}`);
const skillScenarios = spawnSync("python3", ["-m", "unittest", "discover", "-s", "skills/evals", "-v"], { encoding: "utf8" });
if (skillScenarios.status !== 0) failures.push(`Agent Skills regression scenarios failed: ${skillScenarios.stderr || skillScenarios.stdout}`);

if (failures.length) {
  console.error("REPOSITORY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REPOSITORY_VERIFY_PASS");
console.log(`Checked ${files.length} files, local links, secret patterns, deletion contracts, MCP snapshot, and package-version contracts.`);
