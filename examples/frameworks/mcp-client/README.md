# MCP client: discover and call a real Vira server

Requires Node.js 20+. Uses the published `@tryvira/mcp@0.1.90` stdio server with `@modelcontextprotocol/client`. Run this from `examples/frameworks/mcp-client` after configuring an authorized, isolated development tenant. Secrets belong in the host environment, not the repository.

```bash
npm ci
# Configure VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
# VIRA_PROJECT_ID and VIRA_ENVIRONMENT_ID through your host's secret store.
npm start
```

Without `VIRA_MCP_TOOL`, the script initializes the server and prints its **actual** `tools/list` names. It does not perform an effectful operation or invent a server receipt.

For an inspection tool, explicitly choose a discovered name and supply arguments that match its live schema. The example fills declared scope fields from the configured environment, rejects mismatches, and refuses missing required arguments:

```bash
VIRA_MCP_TOOL=list_capabilities VIRA_MCP_ARGUMENTS='{}' npm start
```

The example is intentionally read-only. It allows a narrow set of known inspection tools and refuses any other tool, including an effectful or ambiguously classified one. Use the documented server-owned one-shot approval flow in a separate integration for writes; a local environment flag is not approval. Only explicitly selected Vira configuration variables are passed to the subprocess, not the full parent environment.

By default the example prints only tool name, error status and content types, not raw customer data. To inspect full results in a **trusted local terminal only**, explicitly set `VIRA_MCP_SHOW_RESULT=yes`; avoid screenshots and logging secrets.

If you must use an alternate reviewed server package/command, set `VIRA_MCP_COMMAND` and `VIRA_MCP_ARGS_JSON` (JSON array of arguments), instead of relying on naïve whitespace splitting. Tool argument schemas must be read from `tools/list` and must never be invented from SDK signatures.

A tool failure, wrong scope, missing approval, or policy denial is a terminal denial for that action, **not** an invitation to retry through JavaScript/Python. Only a missing tool may be routed to the version-matched documented SDK method.

[Common agent-first workflow](../../../docs/agent-first-operation-flow.md) · [MCP tool/Skill map](../../../docs/reference/mcp-tools.md) · [Python/JS examples](../../agent-first/README.md).

## Published MCP 0.1.90 coverage

The current published package has a [registry-generated versioned-tool inventory](../../../docs/reference/mcp-published-tools.json), including Inbox and Conflict Inspector tools and registered Control API access. Dedicated optimization tools are not first-class entries in that snapshot. Discover with `tools/list`; use only a documented registered operation and server-side authorization for writes. This example deliberately does not perform them.
