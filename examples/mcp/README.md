# Vira MCP: published host configuration

Use the [MCP client example](../frameworks/mcp-client/README.md) for a runnable stdio host, or copy [the generic host configuration](client-config.example.json) into the format supported by your MCP client.

```bash
npx -y @tryvira/mcp@0.1.55
```

The configuration is an **illustrative template** with placeholders only. Supply the actual `VIRA_API_URL`, `VIRA_API_KEY` and scoped identifiers through the host's trusted secret mechanism. The API URL is a deployment root, not a Studio URL. Keep real credentials out of source control.

After `initialize`, call **live** `tools/list`. The installed MCP version exposes tool families for AI Systems/Connections, Tasks, Programs, Strategies, Pack import/install/evaluate/approval/release, Teach, Signals, evaluations, TaskRuns, traces and host authorization. The precise list, tool schemas and permission availability must be discovered at runtime; no stale count or other surface's method signature is authoritative.

Start with a supported read-only inspection such as `list_capabilities`. Before any effectful action, obtain the user's explicit approval for the exact scope and operation and obey the MCP server's separate authority decision. A denial must **not** be retried via JS/Python. An absent MCP tool may be routed to a documented, installed SDK method.

## Copyable agent instruction

```text
Inspect this project's existing MCP host and its secure environment configuration.
Use the published @tryvira/mcp server, initialize it and read live tools/list.
First call a discovered read-only inspection tool. Identify the scoped operation
and real tool input schema; do not invent names, IDs, roles or results.
For writes, show the exact requested action/scope and obtain my explicit approval.
Read back persisted IDs, evaluation status, approvals, release digest and TaskRun
events; a 202/ROUTED/COMPLETED state alone is not a verified model answer.
Use installed JS/Python SDK only if a tool is absent, never to bypass denial.
Do not print credentials, prompts or sensitive tool responses.
Report actual tool names, statuses and missing capabilities.
```

[Full agent-first operation flow](../../docs/agent-first-operation-flow.md) · [Tool catalog](../../docs/reference/mcp-tools.md) · [Runnable MCP client](../frameworks/mcp-client/README.md) · [Skills](../../skills/README.md).
