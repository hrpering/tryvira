// Public-docs contract checks only; never claims a live Vira tenant, provider or release.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = p => readFile(new URL("../" + p, import.meta.url), "utf8");
const versions = JSON.parse(await read("package-versions.json"));
const [mcp, inventory, guide, skill, operator, mcpClient, mcpExample, jsManifest, jsReadme, pyRequirements, pyFastapi, pyReadme, pyRunner] = await Promise.all([
  "docs/reference/mcp.md", "docs/reference/sdk-method-inventory.md",
  "docs/agent-first-operation-flow.md", "skills/vira-mcp/SKILL.md",
  "skills/vira-operator/SKILL.md", "examples/frameworks/mcp-client/client.mjs",
  "examples/agent-first/README.md", "examples/javascript/package.json",
  "examples/javascript/README.md", "examples/python/requirements.txt",
  "examples/frameworks/python_fastapi/requirements.txt",
  "examples/python/README.md", "examples/python/taskrun_modes.py",
].map(read));

const sdkVersion = versions.npm["@tryvira/sdk"];
const mcpVersion = versions.npm["@tryvira/mcp"];
const pythonVersion = versions.pypi["tryvira-sdk"];
assert.equal(JSON.parse(jsManifest).dependencies["@tryvira/sdk"], sdkVersion);
assert.match(jsReadme, new RegExp(sdkVersion.replaceAll(".", "\\.")));
assert.match(pyRequirements, new RegExp("tryvira-sdk==" + pythonVersion.replaceAll(".", "\\.")));
assert.match(pyFastapi, new RegExp("tryvira-sdk==" + pythonVersion.replaceAll(".", "\\.")));
assert.match(pyReadme, new RegExp(pythonVersion.replaceAll(".", "\\.")));
assert.match(pyRunner, new RegExp(pythonVersion.replaceAll(".", "\\.")));
for (const doc of [mcp, mcpClient]) assert.ok(doc.includes(mcpVersion), "MCP pin not aligned");
for (const name of ["start_task_run", "get_task_run", "list_task_run_events", "import_pack", "evaluate_pack", "approve_pack", "release_pack", "create_teach_analysis"]) {
  assert.ok(mcp.includes(name) || inventory.includes(name), "operation missing from public guide: " + name);
  assert.ok(guide.includes(name), "missing from shared workflow: " + name);
}
assert.doesNotMatch(mcp, /does not expose Teach proposal transitions|does not expose.*Pack operations/i);
assert.doesNotMatch(inventory, /No Pack tools listed|No TaskRun tools listed/);
assert.match(mcpClient, /Explicit operator approval required/);
assert.match(mcpClient, /inspectedReadOnly/);
assert.match(mcpExample, /MCP.*JavaScript.*Python/s);
assert.match(operator, /do not retry a denial/);
assert.match(skill, /never.*retry.*denial|never.*authorization denial/i);
console.log("AGENT_FIRST_PUBLIC_CONTRACT_PASS (static docs/examples/version consistency; no live Vira API)");
