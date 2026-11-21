# MCP integration reference

**Verified npm package:** [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp) `0.1.78` (21 November 2026). The registry tarball was checked against the **47 advertised tools** in the snapshot below.

The MCP package is a separate customer-facing client with narrower coverage than the full product. The published MCP tool catalog is separate from JavaScript, Python and HTTP capabilities.

**Compatibility note:** The maintained shared MCP source catalog now declares **61 tool names for version `0.1.79`**, while this verified npm `0.1.78` snapshot contains **47**. They are distinct revisions, not interchangeable claims. See the [generated source/npm comparison](../mcp-surface-parity.md). The source list does not prove a deployed hosted endpoint.

## Discover what the installed server supports

Use the installed MCP server's `tools/list` response to see the current tool names and schemas available to the customer's configured deployment and credential scope. Package releases can change the available tools. This repository intentionally does not mirror low-level tool signatures or Teach/Pack request schemas.

A returned tool schema describes how to call that tool; it does not grant authorization. Follow the server's authority decisions and the customer's scope. Keep review, evaluation, approval, release, and runtime actions separate.

## Registry-verified published tool inventory

The [public npm MCP tool snapshot](mcp-published-tools.json) is tagged `@tryvira/mcp@0.1.78`: the synchronization workflow downloaded the npm tarball, extracted the promoted tool subset and compared the exact names and effect classifications in CI. This is a **versioned discovery reference**, not an authorization grant or substitute for live `tools/list`.

### Promoted review and control families in 0.1.78

| Goal | Tools to discover | Read/write boundary |
| --- | --- | --- |
| Inspect active scope | `get_scope` | Read configured organization/project/environment; do not infer a new permission |
| Work with review notifications | `list_inbox`, `mark_inbox_read` | Listing is read-only; marking read is a persisted write |
| Inspect and decide conflicts | `inspect_conflicts`, `get_conflict_inspection`, `resolve_conflict` | Inspection creates persisted state; resolution requires explicit approval and server authorization |
| Access other registered Control API operations | `read_control_api`, `write_control_api` | Generic access still requires a documented registered route, role, policy, effect approval and a persisted receipt |

The dedicated optimization tools from the older 0.1.60 catalog are **not first-class tools in 0.1.78**. Never guess their endpoints or use `write_control_api` to bypass a denial. Provider, actor, tenant, evaluation and release prerequisites still apply. This does **not** establish complete Studio administration or optimizer parity.

## Product-level coverage

The registry-verified 0.1.78 package offers a deliberately promoted public lifecycle surface plus generic access to documented registered Control API operations. It offers promoted AI System connections, scoped task/point/strategy reads, TaskRun resolve/start/read/events/continue/cancel/retry, observations and feedback, Teach proposals, evaluations, Pack lifecycle and revision actions, runtime projection, plus registered Control API reads/writes. **Not every wider product feature (including trace search or host authorization) has its own promoted `0.1.78` tool.** It does not provide complete parity with the JavaScript SDK or Python client, so use the installed server's live `tools/list` for exact schemas and scoped availability.

If a requested operation is absent, use another documented customer-facing surface only when that surface's current public contract is available. Use the names, schemas and authorization decisions returned by the configured server.

Canonical MCP names in the inspected source include `connect_ai_system`, `record_user_feedback` and `record_business_outcome`. Older names can remain callable as compatibility aliases without appearing in `tools/list`. Always prefer the installed server's advertised names and schemas.

## Shared operation policy

Follow the [one operation flow](../agent-first-operation-flow.md): discover live tools first, use installed SDK/PyPI only for a **missing** MCP operation, never for a denial; retain the same scope, review, digest, idempotency and server readback.

## Skill routing map

Use the Skill for the product decision and lifecycle contract, then use MCP only for the operation family actually advertised by `tools/list`:

| Skill | MCP operation family | Evidence required before handoff |
| --- | --- | --- |
| `vira-get-started`, `vira-integrate-app` | Scope (`get_scope`), AI System and connection discovery/diagnostics | server-returned system/connection identity and scope |
| `vira-author-behavior`, `vira-strategies` | Semantic Tasks, Behavior Points, Programs and Strategies | validated canonical identity, policy and authority |
| `vira-task-runs` | resolve/start/read/events/continue/cancel/retry | persisted TaskRun state and child receipts |
| `vira-packs`, `vira-evaluate`, `vira-release` | Pack import/install/evaluation/approval/revision/materialization/release | exact digest, evaluation status, approval and release readback |
| `vira-observe-teach`, `vira-signals` | observations, evidence, Teach and signal operations | admitted/consented evidence and persisted analysis/recommendation state |
| `vira-runtime`, `vira-runtime-verification`, `vira-traces` | runtime verification, host authorization and trace search | output-bound receipt, authority/revision identity and trace correlation |
| `vira-full-lifecycle`, `vira-mcp` | scoped Inbox discovery/mark-read and review notices | server-returned actor/scope and persisted notification ID |
| `vira-author-behavior`, `vira-debug` | create/read conflict inspection, approve or reject a conflict resolution | persisted inspection, human decision and exact authority |
| `vira-evaluate`, `vira-full-lifecycle` | optimization only where an installed tool or registered and authorized API operation exists | reviewed dataset/holdout policy, actual optimization run ID and status |

This is a routing aid, not an authorization grant. A Skill must stop when the installed catalog, scope or server response does not expose the required operation.

See [MCP setup](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), [HTTP integration guidance](api.md), and [Packs](../packs.md).
