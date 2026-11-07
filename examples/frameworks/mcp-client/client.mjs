import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

// Launch only a server package/version/configuration reviewed by the host operator.
// The MCP server catalog is discovered dynamically; this does not assume SDK parity.
const transport = new StdioClientTransport({
  command: process.env.VIRA_MCP_COMMAND ?? "npx",
  args: (process.env.VIRA_MCP_ARGS ?? "--yes @tryvira/mcp@0.1.44").split(" "),
  env: process.env,
});
const client = new Client({ name: "vira-mcp-host-example", version: "1.0.0" });
try {
  await client.connect(transport);
  const { tools = [] } = await client.listTools();
  console.log("Discovered tools:", tools.map(({ name }) => name).join(", "));
  const target = process.env.VIRA_MCP_TOOL;
  if (!target) {
    console.log("Set VIRA_MCP_TOOL to a discovered, read-only tool to make a call.");
    process.exitCode = 0;
  } else {
    const tool = tools.find(({ name }) => name === target);
    if (!tool) throw new Error(`Requested tool ${target} is not exposed by this server`);
    if (tool.annotations?.destructiveHint || tool.annotations?.openWorldHint) {
      if (process.env.VIRA_MCP_APPROVED !== "yes") throw new Error("Host approval required for effectful/open-world tool");
    }
    const input = JSON.parse(process.env.VIRA_MCP_ARGUMENTS ?? "{}");
    const result = await client.callTool({ name: target, arguments: input });
    console.log(JSON.stringify(result));
  }
} finally {
  await client.close();
}
