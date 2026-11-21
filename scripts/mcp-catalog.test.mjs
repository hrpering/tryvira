import assert from "node:assert/strict";
import { parseMcpTools, renderMcpCatalog } from "./mcp-catalog.mjs";

const cli = String.raw`
const tools = [
  { name: "read_status", description: "Read status", inputSchema: { type: "object", properties: { scope: { type: "string" } } }, effectful: false },
  { name: "create_proposal", description: "Create proposal", inputSchema: { type: "object", properties: { evidence: { type: "array", items: { type: "string" } } } }, effectful: true },
];
`;
const tools = parseMcpTools(cli);
assert.deepEqual(tools.map(({ name, effectful }) => ({ name, effectful })), [
  { name: "read_status", effectful: false },
  { name: "create_proposal", effectful: true },
]);
const catalog = renderMcpCatalog("0.1.55", tools);
assert.match(catalog, /contains 2 tools/);
assert.match(catalog, /tools\/list/);
assert.doesNotMatch(catalog, /`create_proposal`|`read_status`/);


// Newer client bundles declare an internal full list and only expose the
// promoted subset; generic read/write Control API tools remain distinct.
// Never turn an internal tool into a model-facing tool by parsing fullTools.
const newerCli = String.raw`
var fullTools = [
  { name: "get_scope", description: "Read configured scope", inputSchema: {} },
  { name: "start_task_run", description: "Start governed work", inputSchema: {}, effectful: true },
  { name: "secret_internal_write", description: "Should never be exposed", inputSchema: {}, effectful: true },
];
var promotedNames = /* @__PURE__ */ new Set(["get_scope", "start_task_run"]);
var genericTools = [
  { name: "read_control_api", description: "Read registered API", inputSchema: {} },
  { name: "write_control_api", description: "Write registered API", inputSchema: {}, effectful: true },
];
var tools = Object.freeze([...fullTools.filter((tool) => promotedNames.has(tool.name)), ...genericTools].map((tool) => tool));
`;
const newer = parseMcpTools(newerCli);
assert.deepEqual(newer.map(({name,effectful}) => [name,effectful]), [
  ["get_scope",false],
  ["start_task_run",true],
  ["read_control_api",false],
  ["write_control_api",true],
]);
assert.ok(!newer.some(tool => tool.name === "secret_internal_write"));
assert.throws(() => parseMcpTools('var fullTools = [{name:"x"}];'),
  /registration format unknown/);


// Canonical public-tool-catalog bundles (the npm and hosted transports share
// this inventory). A private/unpromoted tool must never enter the snapshot.
const canonicalCli = String.raw`
var coreTools = Object.freeze([
  { name: "get_scope", description: "Read scope", inputSchema: {} },
  { name: "start_task_run", description: "Start work", inputSchema: {}, effectful: true },
  { name: "internal_only", description: "Private tool", inputSchema: {}, effectful: true },
]);
var MCP_PUBLIC_CORE_TOOL_NAMES = Object.freeze(["get_scope", "start_task_run"]);
var genericControlTools = Object.freeze([
  { name: "read_control_api", description: "Registered read", inputSchema: {} },
  { name: "write_control_api", description: "Registered write", inputSchema: {}, effectful: true },
]);
var MCP_PUBLIC_TOOL_CATALOG = Object.freeze([...coreTools.filter((tool) => MCP_PUBLIC_CORE_TOOL_NAMES.includes(tool.name)), ...genericControlTools].map((tool) => tool));
var tools = Object.freeze(MCP_PUBLIC_TOOL_CATALOG.map((definition) => definition));
`;
assert.deepEqual(parseMcpTools(canonicalCli).map(({name,effectful})=>[name,effectful]), [
  ["get_scope",false],
  ["start_task_run",true],
  ["read_control_api",false],
  ["write_control_api",true],
]);
assert.throws(()=>parseMcpTools(canonicalCli.replace('"start_task_run"]);','"missing_tool"]);')), /catalog is missing/);

console.log("MCP_CATALOG_TEST_PASS");
