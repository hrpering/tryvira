---
name: vira-mcp
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Configure or use Vira through its published Model Context Protocol server."
---

# Vira MCP integration

Install the currently published `@tryvira/mcp` package without relying on a stale version pin. Initialize the configured MCP client and call `tools/list`; runtime schemas and scoped availability are authoritative. Never infer MCP support from SDK/API methods. The current public package additionally includes scoped Inbox notifications, conflict inspection/resolution and optimization run lifecycle. Use the [registry-generated tool list](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-published-tools.json) as a versioned reference; live `tools/list` remains authoritative for schemas and permissions.

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

## Shared handoff to other Vira Skills

`vira-mcp` handles tool discovery, schema matching and tool execution. Use `vira-full-lifecycle` for stage ordering, `vira-packs` for candidate quality, `vira-task-runs` for AUTO execution and `vira-observe-teach` for the feedback loop. Preserve the same scope, artifact IDs, evaluation evidence and release state between stages. Follow the [common operation flow](https://github.com/hrpering/tryvira/blob/main/docs/agent-first-operation-flow.md). If a tool is absent, route to the documented installed SDK/PyPI method; **never** retry an authorization denial through another surface.

## Implementation details

1. Read the installed MCP server's package version and real config, then run `initialize` and `tools/list`. Do not hard-code the number or signatures of tools.
2. The published MCP catalog provides `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events`, `continue_task_run`, `cancel_task_run`, `retry_task_run`, and Pack lifecycle tools including `import_pack`, `install_pack`, `evaluate_pack`, `approve_pack`, and `release_pack`. Confirm exact schemas with `tools/list` before calling them. It does not provide complete parity with every SDK/API operation; do not fabricate missing pack tools.
3. For the 0.1.60 MCP family, inspect `get_scope`, `list_inbox`, `mark_inbox_read`, `inspect_conflicts`, `get_conflict_inspection`, `resolve_conflict`, `start_optimization`, `get_optimization_run`, and `cancel_optimization_run` in live `tools/list`. Mark-read, conflict creation/decision and optimization start/cancel are effectful. Never invent a JS or Python counterpart, and never interpret an optimization job as an approved release.
4. Keep all credentials in host-managed environment and check scope and effectful-tool permissions before a call. A registered tool name is not authorization for external actions.
4. Negative: an MCP host with no configured API key or missing tool must stop with a surface limitation, not fabricate a success or substitute projection.
[MCP catalog](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md) · [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md).

## Deliverable and failure handling
Report package/server version, advertised tool evidence, host config location, and operations unavailable through MCP. Stop on initialization/auth/scope failure; never invent tools from SDK methods or claim an uncalled mutation succeeded.

## References

- [mcp](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp.md)
- [mcp-tools](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
