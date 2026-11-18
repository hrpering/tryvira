# MCP client: discover and call a real Vira server

Requires Node.js 20+. Uses the published `@tryvira/mcp@0.1.59` stdio server with `@modelcontextprotocol/client`. Run this from `examples/frameworks/mcp-client` after configuring an authorized, isolated development tenant. Secrets belong in the host environment, not the repository.

```bash
npm ci
# Configure VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
# VIRA_PROJECT_ID and VIRA_ENVIRONMENT_ID through your host's secret store.
npm start
```

Without `VIRA_MCP_TOOL`, the script initializes the server and prints its **actual** `tools/list` names. It does not perform an effectful operation or invent a server receipt.

For an inspection tool, explicitly choose a discovered name and supply arguments that match its live schema:

```bash
VIRA_MCP_TOOL=list_capabilities VIRA_MCP_ARGUMENTS='{}' npm start
```

The example allows only a narrow, explicitly named set of read-only inspections without extra operator approval. All other tools need `VIRA_MCP_APPROVED=yes` **after real authorization by the user/operator**. This flag is only an extra host safeguard, never a replacement for the Vira server's scope/role/release authorization. MCP servers that omit effect annotations are treated conservatively.

By default the example prints only tool name, error status and content types, not raw customer data. To inspect full results in a **trusted local terminal only**, explicitly set `VIRA_MCP_SHOW_RESULT=yes`; avoid screenshots and logging secrets.

If you must use an alternate reviewed server package/command, set `VIRA_MCP_COMMAND` and `VIRA_MCP_ARGS_JSON` (JSON array of arguments), instead of relying on naïve whitespace splitting. Tool argument schemas must be read from `tools/list` and must never be invented from SDK signatures.

A tool failure, wrong scope, missing approval, or policy denial is a terminal denial for that action, **not** an invitation to retry through JavaScript/Python. Only a missing tool may be routed to the version-matched documented SDK method.

[Common agent-first workflow](../../../docs/agent-first-operation-flow.md) · [MCP tool/Skill map](../../../docs/reference/mcp-tools.md) · [Python/JS examples](../../agent-first/README.md).

## Published MCP 0.1.59 coverage

The current published package has a [registry-generated 91-tool inventory](../../../docs/reference/mcp-published-tools.json), including Inbox, Conflict Inspector and Optimization tools. The example remains conservative: discover with `tools/list`, make read-only calls first, and require explicit human approval for any effectful call. The MCP host flag never substitutes for Vira's server-side authorization.
