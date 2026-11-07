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
const catalog = renderMcpCatalog("0.1.44", tools);
assert.match(catalog, /`create_proposal` \| Effectful/);
assert.match(catalog, /`read_status` \| Read/);
console.log("MCP_CATALOG_TEST_PASS");
