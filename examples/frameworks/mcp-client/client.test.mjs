import test from "node:test";
import assert from "node:assert/strict";
import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { Server } from "@modelcontextprotocol/server";
test("MCP client initializes and dynamically discovers server tools", async () => {
  const server = new Server({ name: "fixture", version: "1.0.0" }, { capabilities: { tools: {} } });
  server.fallbackRequestHandler = async (request) => {
    if (request.method === "tools/list") return { tools: [{ name: "safe_read", description: "read", inputSchema: { type: "object", properties: {} } }] };
    return {};
  };
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  const client = new Client({ name: "test-host", version: "1.0.0" });
  await client.connect(clientTransport);
  const { tools } = await client.listTools();
  assert.equal(tools[0].name, "safe_read");
  await client.close(); await serverTransport.close();
});
