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
  const rows = tools.map((tool) => {
    const purpose = tool.description.replaceAll("|", "\\|");
    return `| \`${tool.name}\` | ${tool.effectful ? "Effectful" : "Read"} | ${purpose} |`;
  }).join("\n");
  const groups = [
    ["Pack lifecycle", ["import_pack", "install_pack", "evaluate_pack", "approve_pack", "release_pack"]],
    ["Teach proposal transitions", ["transition_teach_proposal"]],
    ["Behavior Evaluation", ["start_evaluation"]],
    ["Strategy execution", ["start_strategy_execution", "continue_strategy_execution"]],
    ["Response Quality & Decision", ["evaluate_quality"]],
    ["Release creation", ["create_release"]],
  ];
  const missing = groups.filter(([, required]) => !required.every((name) => tools.some((tool) => tool.name === name)))
    .map(([label]) => `- ${label}`);
  const limits = missing.length
    ? `The current package does not include these complete tool groups:\n\n${missing.join("\n")}\n\nUse the SDK, Python SDK, or HTTP API when the required operation is absent from this catalog.`
    : "The tool catalog contains the listed operation groups. Use `tools/list` to confirm the exact schemas available in your scope.";

  return `# MCP tool catalog

This registry-synchronized catalog is generated from the latest published \`@tryvira/mcp@${mcpVersion}\` package. The installed server's \`tools/list\` response remains authoritative at runtime.

Do not infer MCP support from an SDK method or API route. Tool schemas can change between package releases.

## Published package tools

| Tool | Access | Package description |
| --- | --- | --- |
${rows}

## Surface boundaries

${limits}

The package uses the schemas shown by its live MCP server. Discover each installed tool's current schema with \`tools/list\`; do not invent fields. Effectful tools require an allow decision from the configured authority endpoint.

See [MCP integration](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), and [Packs](../packs.md).
`;
}
