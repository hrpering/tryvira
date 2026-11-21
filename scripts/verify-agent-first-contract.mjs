// Public-docs contract checks only; never claims a live Vira tenant, provider or release.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = p => readFile(new URL("../" + p, import.meta.url), "utf8");
const versions = JSON.parse(await read("package-versions.json"));
const [mcp, inventory, guide, skill, operator, mcpClient, mcpExample, jsManifest, jsReadme, pyRequirements, pyFastapi, pyLock, pyReadme, pyRunner] = await Promise.all([
  "docs/reference/mcp.md", "docs/reference/sdk-method-inventory.md",
  "docs/agent-first-operation-flow.md", "skills/vira-mcp/SKILL.md",
  "skills/vira-operator/SKILL.md", "examples/frameworks/mcp-client/client.mjs",
  "examples/agent-first/README.md", "examples/javascript/package.json",
  "examples/javascript/README.md", "examples/python/requirements.txt",
  "examples/frameworks/python_fastapi/requirements.txt",
  "examples/frameworks/python_fastapi/requirements.lock",
  "examples/python/README.md", "examples/python/taskrun_modes.py",
].map(read));

const sdkVersion = versions.npm["@tryvira/sdk"];
const mcpVersion = versions.npm["@tryvira/mcp"];
const pythonVersion = versions.pypi["tryvira-sdk"];
assert.equal(JSON.parse(jsManifest).dependencies["@tryvira/sdk"], sdkVersion);
assert.match(jsReadme, new RegExp(sdkVersion.replaceAll(".", "\\.")));
assert.match(pyRequirements, new RegExp("tryvira-sdk==" + pythonVersion.replaceAll(".", "\\.")));
// Framework samples are regenerated and locked against current published SDK versions.
const pyFastapiPin = pyFastapi.match(/^tryvira-sdk==([^\s]+)$/m)?.[1];
assert.ok(pyFastapiPin, "Missing FastAPI pinned SDK version");
assert.ok(pyLock.includes("tryvira-sdk==" + pyFastapiPin + " \\"), "FastAPI lock does not match requirements.txt");
assert.match(pyReadme, new RegExp(pythonVersion.replaceAll(".", "\\.")));
assert.match(pyRunner, new RegExp(pythonVersion.replaceAll(".", "\\.")));
assert.ok(mcpClient.includes(mcpVersion), "MCP client example pin not aligned");
assert.ok(mcp.includes("tools/list"), "MCP guide must describe live discovery");
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

// Cross-check public entrypoints that previously drifted from canonical versions.
const publicPaths = [
  "examples/README.md", "examples/mcp/README.md",
  "examples/mcp/client-config.example.json",
  "docs/agent-skills/gap-analysis.md",
  "docs/agent-skills/capability-coverage.md",
  "docs/ai-prompts/setup-python-sdk.md",
  "examples/semantic-runtime/README.md",
  "examples/semantic-runtime/package.json",
];
const entrypoints = await Promise.all(publicPaths.map(read));
for (let i = 0; i < publicPaths.length; i++) {
  const content = entrypoints[i];
  const path = publicPaths[i];
  assert.doesNotMatch(content, /27 (?:Vira Agent Skills|task-specific Vira Skills)|84 scenarios|published package exposes 11 tools/i,
    path + ": stale public capability claim");
  assert.doesNotMatch(content, /(?:@tryvira\/(?:mcp|sdk)@0\.1\.44|tryvira-sdk==0\.1\.44)/,
    path + ": stale recommended version");
}
assert.ok(entrypoints[0].includes(sdkVersion) && entrypoints[0].includes(pythonVersion)
  && entrypoints[0].includes(mcpVersion), "public examples index versions drifted");
assert.ok(entrypoints[2].includes(`@tryvira/mcp@${mcpVersion}`));
assert.match(entrypoints[4], /28 task-specific Vira Skills/);

const jsObserve = await read("examples/javascript/connect-observe.mjs");
const pyObserve = await read("examples/python/connect_observe.py");
const quality = await read(".github/workflows/quality.yml");
for (const field of ["organizationId","projectId","environmentId","eventId","connectionId","aiSystemId"]) {
  assert.ok(jsObserve.includes(field) && pyObserve.includes(field),
    "missing scoped Observe field " + field);
}
assert.match(jsObserve, /buildObservationRequest/);
assert.match(jsObserve, /VIRA_ALLOW_OBSERVE/);
assert.match(pyObserve, /client\.observe\(event/);
assert.match(pyObserve, /VIRA_ALLOW_OBSERVE/);
assert.match(quality, /npm test --prefix examples\/javascript/);
assert.match(quality, /unittest discover -s examples\/python/);

const compatibility = await read("docs/example-package-compatibility.md");
assert.match(compatibility, /lockfile|hash-verified/i);
for (const base of ["examples/frameworks/node-next","tutorials/marketing-agent"]) {
  const manifest = JSON.parse(await read(base+"/package.json"));
  const lock = JSON.parse(await read(base+"/package-lock.json"));
  assert.equal(manifest.dependencies["@tryvira/sdk"], sdkVersion, base + ": stale current SDK pin");
  assert.equal(lock.packages[""].dependencies["@tryvira/sdk"],
    manifest.dependencies["@tryvira/sdk"], base + ": manifest/lock drift");
  assert.equal(lock.packages["node_modules/@tryvira/sdk"]?.version, sdkVersion,
    base + ": stale resolved SDK");
}
for (const base of ["examples/frameworks/python_fastapi","examples/frameworks/langgraph"]) {
  const requirements = await read(base+"/requirements.txt");
  const lock = await read(base+"/requirements.lock");
  const version = requirements.match(/^tryvira-sdk==([^\s]+)$/m)?.[1];
  assert.ok(version === pythonVersion && lock.includes("tryvira-sdk=="+version+" \\"),
    base+": PyPI lock mismatch");
}
const syncSource = await read("scripts/sync-published-packages.mjs");
assert.match(syncSource, /SAFE_VERSION_SYNC_PATHS/);
assert.doesNotMatch(syncSource, /await writeFile\(join\(root, "docs\/reference\/mcp-tools.md"\), catalog\)/);

console.log("AGENT_FIRST_PUBLIC_CONTRACT_PASS (static docs/examples/version consistency; no live Vira API)");
