# MCP integration

Published client: [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp) (documented version **0.1.59**), Node.js 20+.

```bash
npx -y @tryvira/mcp@0.1.59
```

This is a stdio client of the Vira Control API, **not** another Vira runtime or authority. The installed package's `tools/list` and the customer's server-side permissions are authoritative. It does not automatically read a `.env` file.

## Configuration

Configure an MCP-compatible host with the following environment fields in **host-managed secret configuration**, not committed project files:

```text
VIRA_API_URL=<your-Vira-API-root>
VIRA_API_KEY=<server-held-customer-key>
VIRA_ORGANIZATION_ID=<organization>
VIRA_PROJECT_ID=<project>
VIRA_ENVIRONMENT_ID=<environment>
```

Use the root API URL, not the Studio URL and not a `/v1`-suffixed path. The optional `VIRA_MCP_AUTHORITY_URL` defaults to `<VIRA_API_URL>/v1/mcp/authorize`. Effectful calls require an allow decision at this authority boundary. The scope bound to the key must match the requested scope.

## Discover and operate

The supported discovery flow is:

```text
server/discover → initialize → tools/list → tools/call
```

Find the exact tool and its schema in **your installed server's** `tools/list`. Version 0.1.59 contains tools for Connections and AI Systems, TaskRun resolve/start/read/events/continue/cancel/retry, Pack import/install/evaluate/approve/release, Teach analysis/recommendation/review, Strategy/Program authoring, observation and signals, evaluations, job readback, trace search and host authorization. Availability can be further constrained by role, scope, release eligibility or policy.

A useful read-only first call is `list_capabilities`; move to `list_ai_systems` or `list_packs` only once the host confirms the tool and scope. A real application run normally uses AUTO TaskRun. `resolve_task_run` provides a proposal; `start_task_run` requests admission, then `get_task_run` and `list_task_run_events` read persisted state. Do not treat ROUTED, 202 or COMPLETED as a verified end-user answer.

For writes, obtain explicit user/operator authorization; then obey Vira's role, scope, policy, evaluation and release checks. The MCP client cannot grant itself a role. Do not retry a denial through a different surface. The host must retain callback ownership for external tool execution: `authorize_host_tool` authorizes a proposal, it does not run the tool itself.

## A single agent-first workflow

The canonical sequence is **discover → connect → observe → Teach/author → materialize → evaluate → approve/release → AUTO TaskRun → readback → proposed improvement**. Each stage has its own server-returned identity, persisted state and approval requirements. Skills describe this process and call MCP first when available; an installed SDK is a documented fallback for an **absent** operation, not a way around Vira's denial.

See [one operation flow](../agent-first-operation-flow.md), [tool/Skill map](mcp-tools.md), and the [runnable MCP client](../../examples/frameworks/mcp-client/README.md).

## Problems and boundaries

- `MCP_SCOPE_MISMATCH`: scope in request differs from credential scope.
- `MCP_AUTHORITY_DENIED` or role-required errors: check the granted role; never bypass.
- Missing tool: inspect package version and `tools/list`; switch to a documented SDK method only for absence.
- Inbox, conflict and optimization writes: verify actual actor scope, approval and effect permission; never treat an inspection as a decision or a queued optimization as an approved release.
- Pending async work: inspect the returned job/task ID and readback before claiming completion.
- Provider-output verification is distinct from TaskRun completion; a successful MCP tool call is not a post-model PASS.
- Missing host interception/pre-display capability means that enforcement level is unavailable.

[Registry-generated 91-tool inventory](mcp-published-tools.json) · [Published package versions](../published-packages.md) · [JavaScript SDK](javascript-sdk.md) · [Python SDK](python-sdk.md) · [Operation reference](sdk-method-inventory.md).
