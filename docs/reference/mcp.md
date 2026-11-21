# MCP integration

Client: [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp), Node.js 20+. The checked npm `0.1.78` artifact advertises **47 tools**, as recorded in the [versioned tool snapshot](mcp-published-tools.json). The maintained source `0.1.79` declares **61** via a shared hosted/npm catalog, but source declaration is not proof of publication or live deployment. See the [source-versus-npm comparison](../mcp-surface-parity.md). Check installed version and `tools/list` before use.

```bash
npx -y @tryvira/mcp
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

Find the exact tool and its schema in **your installed server's** `tools/list`. The 0.1.78 public catalog promotes scoped connections, semantic resolution, TaskRun lifecycle, Pack evaluation/approval/release, Teach proposals, review/conflict actions, and a pair of generic registered Control API tools. **Not every internal SDK/API operation is a separately advertised MCP tool.** Availability can be further constrained by role, scope, release eligibility or policy.

Prefer current canonical tool names such as `connect_ai_system`, `record_user_feedback` and `record_business_outcome` when they appear in live discovery; older compatibility aliases such as `connect_once`, `feedback` and `outcome` need not be advertised in `tools/list`. The installed catalog and schema win.

A useful read-only first call is `list_capabilities`; inspect the installed catalog for follow-up system/Pack listing tools or a documented registered Control API read. Do not assume that `list_ai_systems` or `list_packs` is directly promoted. A real application run normally uses AUTO TaskRun. `resolve_task_run` provides a proposal; `start_task_run` requests admission, then `get_task_run` and `list_task_run_events` read persisted state. Do not treat ROUTED, 202 or COMPLETED as a verified end-user answer.

For writes, obtain explicit user/operator authorization; then obey Vira's role, scope, policy, evaluation and release checks. The MCP client cannot grant itself a role. Do not retry a denial through a different surface. The host must retain callback ownership for external tool execution. If an installed release exposes an `authorize_host_tool` operation, it authorizes a proposal rather than executing the tool itself; do not invent it when absent.

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

[Published npm versioned-tool inventory](mcp-published-tools.json) · [Source/npm parity](../mcp-surface-parity.md) · [Published package versions](../published-packages.md) · [JavaScript SDK](javascript-sdk.md) · [Python SDK](python-sdk.md) · [Operation reference](sdk-method-inventory.md).
