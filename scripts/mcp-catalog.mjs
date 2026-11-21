/** Parse advertised public MCP tools from the actual published CLI bundle.
 * Older bundles export a flat tools array; newer bundles register the
 * promotedNames subset of fullTools plus genericTools. The wider fullTools
 * list must NEVER be mistaken for the advertised tools/list surface.
 * Unknown bundle formats fail closed instead of publishing an invented catalog.
 */
function extractArray(source, declaration) {
  const pattern = new RegExp('\\b(?:var|const|let)\\s+' + declaration + '\\s*=\\s*\\[');
  const match = source.match(pattern);
  if (!match) throw new Error('MCP bundle missing the ' + declaration + ' tool array');
  const start = match.index + match[0].length;
  const end = source.indexOf('];', start);
  if (end < 0) throw new Error('MCP bundle ' + declaration + ' array is unterminated');
  return source.slice(start, end);
}

function parseEntries(block) {
  const entries = [...block.matchAll(/\{\s*name:\s*"([a-z][a-z0-9_]*)"\s*,\s*description:\s*"((?:\\.|[^"])*)"\s*,/g)];
  return entries.map((match, index) => {
    const nextStart = entries[index + 1]?.index ?? block.length;
    const entry = block.slice(match.index, nextStart);
    return {
      name: match[1],
      description: match[2].replaceAll('\\"', '"').replaceAll('\\n', ' '),
      effectful: /\beffectful\s*:\s*true\b/.test(entry),
    };
  });
}

function validateTools(tools) {
  if (!tools.length || new Set(tools.map(tool => tool.name)).size !== tools.length) {
    throw new Error('MCP bundle tool names were missing or not unique');
  }
  return tools;
}

export function parseMcpTools(cliSource) {
  if (/\b(?:var|let|const)\s+tools\s*=\s*\[/.test(cliSource)) {
    return validateTools(parseEntries(extractArray(cliSource, 'tools')));
  }

  // This matches the registered public subset, never the complete internal list.
  const match = cliSource.match(/\b(?:var|const|let)\s+promotedNames\s*=\s*(?:\/\*[\s\S]*?\*\/\s*)?new Set\(\s*\[/);
  if (!match || !/\btools\s*=\s*Object\.freeze\(\[\.\.\.fullTools\.filter\(/.test(cliSource)) {
    throw new Error('MCP bundle registration format unknown; refusing catalog rewrite');
  }
  const start = match.index + match[0].length;
  const end = cliSource.indexOf(']);', start);
  if (end < 0) throw new Error('MCP bundle promoted allowlist unterminated');
  const promoted = [...cliSource.slice(start, end).matchAll(/"([a-z][a-z0-9_]*)"/g)].map(x => x[1]);
  if (!promoted.length || new Set(promoted).size !== promoted.length) {
    throw new Error('MCP bundle promoted names missing or duplicated');
  }

  const fullTools = parseEntries(extractArray(cliSource, 'fullTools'));
  const genericTools = parseEntries(extractArray(cliSource, 'genericTools'));
  const allowed = new Set(promoted);
  const visible = fullTools.filter(tool => allowed.has(tool.name));
  if (!visible.length || !genericTools.some(tool => tool.name === 'read_control_api') ||
      !genericTools.some(tool => tool.name === 'write_control_api')) {
    throw new Error('MCP bundle promoted or generic definitions missing');
  }
  return validateTools([...visible, ...genericTools]);
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
