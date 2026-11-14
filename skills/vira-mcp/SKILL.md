---
name: vira-mcp
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Configure or use Vira through its published Model Context Protocol server."
---

# Vira MCP integration

Install the currently published `@tryvira/mcp` package without relying on a stale version pin. Initialize the configured MCP client and call `tools/list`; runtime schemas and scoped availability are authoritative. Never infer MCP support from SDK/API methods. Treat effectful tools as mutations subject to configured authority; do not fabricate missing Pack, release, evaluation, or connection tools.

Configure `VIRA_API_URL` as the API deployment root supplied by the operator (no `/v1` suffix; not the Studio URL) and `VIRA_API_KEY` through the MCP host's secret-backed environment. The published CLI derives its authority endpoint from this API URL unless the documented optional override is set. Ask for a missing API URL; never guess it.

## Activate this skill when
Configuring a Vira MCP client/host or deciding whether a task is available as an MCP tool. Do not use it to imply MCP can perform all SDK/API operations.

## Inputs and preconditions
Inspect the user's MCP host, config format, process launch mechanism, secret store, `VIRA_API_URL`, installed `@tryvira/mcp` version, and requested tool. Keep all credentials in host-managed environment configuration.

## Workflow
1. Inspect the published MCP package version and runtime/host compatibility.
2. Add the server entry using placeholders and the host's documented config schema; never place literal credentials in JSON committed to Git.
3. Start/initialize the server and call `tools/list`. Treat returned names, schemas, and scoped availability as authoritative.
4. For each requested action, match it to an advertised tool and inspect whether it is read-only or effectful before invocation.
5. Route absent operations to a documented SDK, Python, or HTTP contract; test config parsing separately from any live tool call.

## Implementation details

1. Read the installed MCP server's package version and real config, then run `initialize` and `tools/list`. Do not hard-code the number or signatures of tools.
2. The published MCP catalog **does not provide TaskRun or Pack lifecycle tools** even though JS/Python SDKs do. For normal AUTO TaskRun or Pack operations, use a separately documented server-side SDK integration; do not create a fake `start_task_run` MCP tool.
3. Keep all credentials in host-managed environment and check scope and effectful-tool permissions before a call. A registered tool name is not authorization for external actions.
4. Negative: an MCP host with no configured API key or missing tool must stop with a surface limitation, not fabricate a success or substitute projection.
[MCP catalog](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md) · [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md).

## Deliverable and failure handling
Report package/server version, advertised tool evidence, host config location, and operations unavailable through MCP. Stop on initialization/auth/scope failure; never invent tools from SDK methods or claim an uncalled mutation succeeded.

## References

- [mcp](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp.md)
- [mcp-tools](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
