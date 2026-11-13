# MCP example

Run the published Vira MCP launcher:

```bash
npx -y @tryvira/mcp@0.1.44
```

After initialization call `tools/list`. Start with read-only tools such as `list_capabilities`, `list_semantic_tasks`, `list_behavior_points`, `list_behavior_programs`, `list_behavior_strategies`, and `resolve_semantic`.

The published package exposes 11 tools. Runtime resolution and authoring/evidence mutations remain authority-gated. Pack lifecycle, Strategy activation/execution, Behavior Evaluation, and Teach proposal transitions are not exposed by this release.

See [MCP reference](../../docs/reference/mcp.md), [published tool catalog](../../docs/reference/mcp-tools.md), and [Capability map](../../docs/capability-map.md). Discover the live tool list with `tools/list`; the server response is authoritative.

## Prompt for a coding agent

```text
Configure @tryvira/mcp@0.1.44 for this MCP-compatible client.

Use stdio unless an authenticated reverse proxy is already configured. Set
VIRA_API_URL, VIRA_API_KEY, and the organization/project/environment scope. The
published CLI defaults `VIRA_MCP_AUTHORITY_URL` to `${VIRA_API_URL}/v1/mcp/authorize`;
set the override only when your deployment uses a different authority endpoint.
Initialize, call tools/list, and select tools by the live name and schema.

Start with read-only discovery. Before runtime resolution or any authoring/evidence
mutation, show the requested scope and wait for explicit approval. Test missing-key,
out-of-scope, deny, and successful read-only paths. Never hard-code a tool count,
invent arguments, print secrets, or use a local effectful bypass in production.
Return the client configuration, discovered tool names, test commands, and observed
error codes.
```
