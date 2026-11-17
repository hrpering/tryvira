import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

// Launch only a server package/version/configuration reviewed by the host operator.
// The MCP server catalog is discovered dynamically; this does not assume SDK parity.
const transport = new StdioClientTransport({
  command: process.env.VIRA_MCP_COMMAND ?? "npx",
  args: (() => {
    const provided = process.env.VIRA_MCP_ARGS_JSON;
    if (!provided) return ["-y", "@tryvira/mcp@0.1.55"];
    const parsed = JSON.parse(provided);
    if (!Array.isArray(parsed) || parsed.some(item => typeof item !== "string")) {
      throw new Error("VIRA_MCP_ARGS_JSON must be an array of CLI arguments");
    }
    return parsed;
  })(),
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
    // This older MCP client may not receive tool annotations. Do not assume
    // that a tool is safe just because destructiveHint/openWorldHint is absent.
    const inspectedReadOnly = new Set([
      "list_capabilities", "list_semantic_tasks", "list_behavior_points",
      "list_behavior_programs", "list_behavior_strategies", "list_packs",
    ]);
    const needsApproval = !inspectedReadOnly.has(target)
      || tool.annotations?.destructiveHint === true
      || tool.annotations?.openWorldHint === true;
    if (needsApproval && process.env.VIRA_MCP_APPROVED !== "yes") {
      throw new Error("Explicit operator approval required; do not bypass Vira server authority");
    }
    const input = JSON.parse(process.env.VIRA_MCP_ARGUMENTS ?? "{}");
    const result = await client.callTool({ name: target, arguments: input });
    // Default to a safe summary. Full content may contain customer data.
    console.log(JSON.stringify({
      tool: target,
      isError: result.isError === true,
      contentTypes: Array.isArray(result.content)
        ? result.content.map(item => item.type ?? "unknown")
        : [],
    }));
    if (process.env.VIRA_MCP_SHOW_RESULT === "yes") console.log(JSON.stringify(result));
    if (result.isError) process.exitCode = 1;
  }
} finally {
  await client.close();
}
