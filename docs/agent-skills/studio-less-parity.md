# Studio-less Vira: capability parity and API backlog

Status: 21 November 2026 (source/public-doc compatibility review; not a claim of registry or live E2E). Scope: public JavaScript/Python SDK contracts, published MCP capabilities and actual product Studio route families. A route existing in source is **not** proof of a working customer API. Do not expose the Studio's cookie/session endpoints as a shortcut. Agent Skills cannot replace missing service operations by writing instructions.

## Target architecture

Coding agent → installed Vira Skills → discovered MCP tools (or version-matched SDK/PyPI when unavailable) → published public API → canonical scope/authority/policy/release boundary → durable receipts and traces.

Studio is an **optional visualization**, not a prerequisite for authoring, approving, releasing, running, or learning behavior. The API/SDK/MCP must use the same authority and idempotency contracts. Approval of external effects must remain explicit.

[Shared MCP/JS/Python operation flow](../agent-first-operation-flow.md) · [Version and host compatibility](../integration-compatibility.md). MCP now documents more Pack, TaskRun, Teach and evaluation operations than the previous SDK-only ledger; the items marked partial below concern wider Studio administration, host capabilities and verified provider output, not the absence of these named MCP tools.

## Product parity ledger

| Studio capability family | Agent-first status | Required end state |
| --- | --- | --- |
| AI System / Connection | **SDK available**: connect, list, details, inventory, health | Complete non-UI setup, authorized provisioning and health checks |
| Semantic Task / Behavior Point / Program | **SDK available**: create, list/get where exposed | Versioned authoring, review and safe release of canonical artifacts |
| Behavior Strategies, variants and execution | **SDK available**: author, validate, simulate, activate, run/read/continue | Real step readback and verified execution |
| Packs: import, configure, evaluate, approve, release | **SDK available** | Materialization, status and conflict readback with exact identity |
| TaskRuns, AUTO, child execution, trace | **SDK available** | All eligible modes and persisted child/receipt readback |
| Model/host action authorization and capabilities | **SDK partially available** | Permission/approval UX without web pages; host attestation must remain server-owned |
| Observe, Signals, conversation archive | **SDK available** | Consent, revoke and producer mapping readback |
| Teach analyses, recommendations, proposals, revisions | **SDK available** | Review, correction, candidate re-evaluation and explicit release |
| Evaluations, comparisons, quality, candidate revisions | **SDK available** | Versioned datasets, actual evaluations and per-case evidence |
| Release / deploy health | **SDK partially available** | Deployments inventory, rollback and approval workflows need complete public read/write parity |
| Runtime traces / violations / trajectory monitoring | **Partial SDK**: trace search; others lack full public parity | Read detail, filter, annotate violations, trace cause and artifact lineage |
| Inbox, work queue, approvals, audit | **MCP partial**: `list_inbox`, `mark_inbox_read` now published; claim/review/audit parity remains partial | Complete role-scoped work queue and audit transitions with durable readback |
| Conflict Inspector | **MCP partial**: `inspect_conflicts`, `get_conflict_inspection`, `resolve_conflict` are published, authority-gated operations | Persisted inspection and approval decision; full reviewer UX, execution effects and audit parity still require testing |
| Optimization | **MCP partial**: `start_optimization`, `get_optimization_run`, `cancel_optimization_run` are published; advanced dataset/holdout/freeze/rollback still partial | Durable optimization run/receipt, independent evaluation and explicit approval to release outputs |
| AI drafts, builder plans, lesson history | **Studio-only/partial** | Public agent-readable views and safe review transitions |
| Scope composition/delegation and preferences | **Studio-only/partial** | Scoped list/compose, grant/renew/revoke and preference APIs |
| Organization, workspace, projects, environments, membership | **Studio-only/partial** | Full customer identity/resource lifecycle with admin delegation |
| Credentials, service accounts and credential profiles | **Studio-only/partial** | Safe secret creation/revocation with RBAC; never emit secret values |
| Billing, usage, invoices, entitlements | **Studio-only/partial** | Public read-only consumption/usage APIs, separate checkout authority |
| Enterprise identity, privacy, security | **Studio-only/partial** | Role-gated settings, consent, SSO/SCIM and audit APIs |
| External integrations / account connectors | **Studio-only/partial** | OAuth/consent/bootstrap status and connection management via supported interfaces |
| Model variants / serving / projections | **Partial SDK** | Immutable model release, serving health and rollback contracts |
| Support and account authentication | **Out of scope for a Skill writing raw user credentials** | Standard identity/OAuth API; do not reimplement login/session inside Skills |
| Public chatbot final verified ON answer | **Backend/SDK handoff gap** | Output-bound provider response, post-model verification and auth-scoped readback |

## Priorities for the next product changes

P0: Complete public output-bound verification and release/rollback readback; run live tenant checks on new conflict, Inbox and optimization MCP tools. P1: Finish remaining queue, approval, scope, dataset/holdout, rollback and customer integration parity in public JS/Python clients. P2: Complete organization/member administration, billing views and other account operations. P3: Continuously test the expanded MCP registry against published SDK/PyPI method availability; no fake parity and no bypass.

Every new operation needs: explicit permission class; tenant- and actor-bound scope; input validation; idempotency for mutations; effectful host approval; durable audit/receipt; typed JS+Python method; MCP tool where safe; positive/wrong-tenant/denial/replay/expired/stale tests. Product capability discovery must report per-surface support **at runtime**. Disallow local agent-written fake server receipts.

## How to measure completion

For every row, pass a real **Studio-vs-API** equivalence test with the same customer identity and prerequisites. The agent must complete the action, read back durable state, and report the exact refusal where not authorized. A Skill file existing or a method appearing in source is not proof. Keep Studio optional until every critical non-account workflow has an independently tested agent path.

[Operator Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-operator/SKILL.md) · [Public SDK guide](../reference/javascript-sdk.md).
