/** Parse the public MCP package's tools array without truncating nested schemas. */
export function parseMcpTools(cliSource) {
  const arrayStart = cliSource.match(/\b(?:var|let|const)\s+tools\s*=\s*\[/);
  if (!arrayStart) throw new Error("MCP package tool array was not found; refusing to rewrite the catalog");
  const start = arrayStart.index + arrayStart[0].length;
  const end = cliSource.indexOf("];", start);
  if (end < 0) throw new Error("MCP package tool array did not terminate; refusing to rewrite the catalog");
  const block = cliSource.slice(start, end);
  const entries = [...block.matchAll(/\{\s*name:\s*"([^"]+)"\s*,\s*description:\s*"((?:\\.|[^"])*)"\s*,/g)];
  const tools = entries.map((match, index) => {
    const nextStart = entries[index + 1]?.index ?? block.length;
    const entry = block.slice(match.index, nextStart);
    return {
      name: match[1],
      description: match[2].replaceAll("\\\"", '"').replaceAll("\\n", " "),
      effectful: /\beffectful\s*:\s*true\b/.test(entry),
    };
  });
  if (!tools.length || new Set(tools.map((tool) => tool.name)).size !== tools.length) {
    throw new Error("MCP package tool definitions were not parsed uniquely; refusing to rewrite the catalog");
  }
  return tools;
}

export function renderMcpCatalog(mcpVersion, tools) {
  if (!Array.isArray(tools) || tools.length === 0) throw new Error("MCP catalog is empty");
  return `# MCP integration reference

**Current package:** [\`@tryvira/mcp\`](https://www.npmjs.com/package/@tryvira/mcp) \`${mcpVersion}\`

The published package currently contains ${tools.length} tools. This repository intentionally does not reproduce low-level tool names, schemas, or Teach/Pack request contracts. The installed server's \`tools/list\` response is authoritative for the current customer scope.

## Product-level coverage

The MCP server is a separate customer-facing surface and does not have identical coverage to the SDKs, HTTP API, or Studio. Check the installed package documentation and live \`tools/list\` response before attempting an operation. Package releases can add or remove capabilities.

A tool schema does not grant authorization. Follow the customer's scope and the server's authority decisions; keep review, evaluation, approval, release, and runtime actions separate. Never infer a tool name or payload from another surface.

See [MCP setup](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), [HTTP integration guidance](api.md), and [Packs](../packs.md).
`;
}
