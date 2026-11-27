import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = file => readFile(file, "utf8");
const handler = await read("examples/frameworks/node-next/src/support-handler.mjs");
assert.match(handler, /\.startTaskRun\s*\(/, "Canonical ON must admit a TaskRun");
assert.match(handler, /aiSystemId:\s*config\.aiSystemId/, "Canonical ON must bind the configured AI System");
assert.match(handler, /requestedMode:\s*"AUTO"/, "Canonical ON must request AUTO mode");
assert.doesNotMatch(handler, /\.resolveRuntime\s*\(/, "Direct runtime resolve forbidden in primary chatbot");
assert.doesNotMatch(handler, /\.serveBehaviorProjection\s*\(/, "Direct projection forbidden in primary chatbot");
assert.doesNotMatch(handler, /behaviorProjection\b|projectionMode\b|projectionDigest\b/,
  "Direct projection data must not be the primary chatbot contract");
assert.match(handler, /TASKRUN_ACCEPTED_PENDING_VERIFIED_CHAT_RESPONSE/,
  "Do not invent a verified final answer without the public provider/verifier contract");

const reference = await read("docs/canonical-taskrun.md");
for (const stage of [
  "AUTO TaskRun", "Semantic resolve", "Mode dispatch", "Real child executor",
  "Runtime behavior enforcement", "Provider / chatbot", "Post-model verification",
]) {
  assert.ok(reference.toLowerCase().includes(stage.toLowerCase()), "Missing canonical stage " + stage);
}
for (const file of ["README.md", "docs/start-here.md", "docs/developer-guide.md", "docs/runtime.md"]) {
  const body = await read(file);
  assert.match(body, /AUTO TaskRun/, file + ": normal user flow must mention AUTO");
  assert.ok(body.includes("canonical-taskrun.md"), file + ": missing canonical-guide link");
}
const catalog = JSON.parse(await read("docs/reference/mcp-published-tools.json"));
for (const name of ["resolve_task_run","start_task_run","get_task_run","get_task_run_evidence","list_task_run_events"]) {
  assert.ok(catalog.tools.some(tool => tool.name === name), "Missing published TaskRun tool: " + name);
}
const modesGuide = await read("docs/execution-modes.md");
assert.doesNotMatch(modesGuide, /MCP catalog has no TaskRun tools/i);
for (const file of ["examples/javascript/taskrun-modes.mjs","examples/python/taskrun_modes.py","tutorials/marketing-agent/11-auto-taskrun.mjs"]) {
  const body = await read(file);
  assert.ok(body.includes("VIRA_AI_SYSTEM_ID") && body.includes("aiSystemId"), file + ": admission must bind a real AI System");
}
const frameworks = await read("examples/frameworks/README.md");
assert.match(frameworks, /diagnostic/i, "Low-level projection examples must be labeled diagnostic");
console.log("CANONICAL_TASKRUN_BOUNDARY_PASS (static docs and app-boundary gate, not live acceptance)");
