# One Vira operation flow: MCP, JavaScript and Python

Vira is operated from a coding agent without requiring Studio. **Skills decide the workflow; an installed MCP tool or SDK method executes the operation; the Vira service decides authority and stores evidence.** These are not interchangeable roles.

## Surface selection (one task, one authority)

1. Inspect the user's project, installed Vira Skills, model host and server-side secret configuration. Never infer an API URL, organization ID, project ID, environment ID or API key.
2. If an MCP server is already connected, initialize it, inspect **live** `tools/list`, and prefer the advertised tool that implements the requested stage. The installed schema, not this document, determines its arguments.
3. If the operation is **absent** from the MCP catalog, use a documented version-matched JavaScript `@tryvira/sdk` or Python `tryvira-sdk` method in the application's existing runtime. `vira-operator` can run an allowlisted JS method from an agent when MCP is missing. Do not start a second model agent or secretly call Studio.
4. **Never fallback to another surface to bypass** a denied permission, wrong scope, unreleased artifact, failed evaluation, expired session or missing approval. A fallback is only for a missing/unsupported surface and must retain the exact operation identity and approvals.
5. Use the same organization/project/environment and server-returned IDs across surfaces. Each write must have its own stable idempotency key, and retrying the same operation reuses that key. Do not reuse one key for distinct writes.
6. After a write, read the persisted record, job status, receipt and artifact digest. A 202 response, `ROUTED` proposal or Skill instruction is not completion. If an SDK or MCP call returns an error, report it without inventing success.

## Operation matrix

The MCP names below reflect the **registry-verified 0.1.78 advertised catalog**, with older 0.1.60-only operations identified where useful. They are **discovery hints**, not a promise of permission or equivalent SDK signatures.

| Goal | MCP tools to discover | JavaScript SDK | Python SDK | Required evidence |
| --- | --- | --- | --- | --- |
| Inspect signed-in scope | `get_scope` | Check installed SDK scope access | Check installed SDK scope access | Configured scope and actor-matched response; no guessed tenant |
| Review Inbox | `list_inbox`, `mark_inbox_read` | Use MCP where available; do not invent JS methods | Use MCP where available; do not invent Python methods | Real notification identity, user intent and write authorization |
| Resolve conflicts | `inspect_conflicts`, `get_conflict_inspection`, `resolve_conflict` | Use MCP when exposed, verify installed alternatives individually | Use MCP when exposed, verify installed alternatives individually | Persisted inspection ID, exact decision, reviewer authority and readback |
| Optimize candidates | The 0.1.60 `start_optimization` / `get_optimization_run` / `cancel_optimization_run` tools are **not promoted in 0.1.78**. Use only a documented registered Control API route via `read_control_api` / `write_control_api` when authorized | Check installed SDK; no assumed JS/Python parity | Check installed SDK; no assumed JS/Python parity | Approved dataset/holdout, scoped run ID, actual status, no silent release |
| Discover scope and AI System | `list_capabilities`, `list_ai_systems`, `list_system_connections`, `connection_health` | `listCapabilities`, `listAISystems`, `listSystemConnections`, `connectionHealth` | `list_capabilities`, `list_ai_systems`, `list_system_connections`, `connection_health` | Actual scoped IDs and capability state |
| Connect an agent | `connect_ai_system` (older alias: `connect_once`), `get_connection` | `connectAiSystem` (older alias: `connectOnce`), `getConnection` | `connect_once`, `get_connection` | Returned AI System and Connection IDs |
| Observe and Teach | `observe`, `submit_teach_evidence`, `create_teach_analysis`, `get_teach_analysis` | `observe`, `submitTeachEvidence`, `createTeachAnalysis`, `getTeachAnalysis` | `observe`, `submit_teach_evidence`, `create_teach_analysis`, `get_teach_analysis` | Consent, accepted evidence and analysis status |
| Author and build | `create_semantic_task`, `create_behavior_point`, `create_behavior_program`, `import_pack` | `createSemanticTask`, `createBehaviorPoint`, `createBehaviorProgram`, `importPack` | `create_semantic_task`, `create_behavior_point`, `create_behavior_program`, `import_pack` | Canonical IDs and immutable candidate digest |
| Materialize/evaluate | `install_pack`, `get_job`, `evaluate_pack`, `get_evaluation` | `installPack`, `evaluatePack`, `getEvaluation` | `install_pack`, `evaluate_pack`, `get_evaluation` | Completed materialization and actual evaluation tied to digest |
| Approve/release | `approve_pack`, `release_pack`, `create_release` | `approvePack`, `releasePack`, `createRelease` | `approve_pack`, `release_pack` | Reviewer authority and persisted released revision |
| Operate a TaskRun | `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events` | `resolveTaskRun`, `startTaskRun`, `getTaskRun`, `listTaskRunEvents` | `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events` | Actual admission, child states and receipts |
| Recover or improve | `continue_task_run`, `retry_task_run`, `get_teach_run_recommendation`, `create_behavior_revision_candidate` | `continueTaskRun`, `retryTaskRun`, `getTeachRunRecommendation`, `createBehaviorRevisionCandidate` | Check installed Python methods individually | Fresh stateVersion, consent, reviewed new candidate |
| Verify a response | `search_runtime_traces`; inspect available runtime receipts | `searchRuntimeTraces` and provider-specific verification integration | Check installed Python trace methods | Exact provider output digest and matching post-model PASS receipt |

Some rows have different signatures across SDKs. Do **not** transform MCP arguments mechanically into JS/Python arguments. Read the installed types or Python function signature. Async work must be polled through the supported readback method, and explicit review/release gates must remain separate.

## Evidence checkpoints

1. Connection: scoped system/connection ID; no guessed host identity.
2. Candidate: validated Task/Point/Program/Strategy materialization; a draft is not released.
3. Evaluation: persisted case results and candidate/digest match; no client-calculated PASS.
4. Approval: a human-authorized transition where required; agent text is not approval.
5. Runtime: AUTO TaskRun may select SINGLE, STRATEGY, COMPOUND or HYBRID according to eligibility and host capabilities. Admission, completion and verification are different outcomes.
6. Learning: feedback or Teach recommendation produces a **new** candidate; changing the active release requires a separate evaluation and approval.
7. Verification: an actual provider answer with an identical output digest and a post-model verification result. A TaskRun COMPLETED state or behavior projection alone is not proof.

## Availability boundaries

MCP, SDKs, PyPI and Studio are not guaranteed to share all operations. The source catalog is wider than some deployed tenant permissions. Inbox list/read, conflict inspect/resolve and optimization start/read/cancel now have published MCP tools, but complete work queues, dataset lifecycle, membership, billing and credential management may still require separately documented public operations; do not drive private Studio cookie routes. OpenCode and other hosts may be unable to intercept a streamed answer before display: report that capability as unsupported rather than claiming pre-display enforcement.

## Try it without a Studio login

- [MCP client](../examples/frameworks/mcp-client/README.md): initialize, list tools, make an explicitly approved call.
- [JavaScript TaskRun](../examples/javascript/taskrun-modes.mjs): route-only by default and optional authorized admission.
- [Python TaskRun](../examples/python/taskrun_modes.py): matching route-only behavior.
- [Cross-surface workflow example](../examples/agent-first/README.md): step-by-step evidence handoff.
- [Studio-less parity ledger](agent-skills/studio-less-parity.md) and [test trust matrix](agent-skills/test-trust-matrix.md) for unsupported operations and the meaning of a passing test.
