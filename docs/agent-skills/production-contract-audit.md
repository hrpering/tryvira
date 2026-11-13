# Agent Skills audit against Vira production contracts

**Audit baseline:** public `hrpering/tryvira` main at `419ac742e77c`; source of truth `hrpering/Vira_Behavior_Prod` main at `48d0020e5049c78341d929ab6bbd986ef42aa1c7`, accessed 13 November 2026. Reviewed **all 24 pre-existing SKILL.md**, their **24 examples/README.md**, **24 agents/openai.yaml** metadata files, and existing skill tests/corpora; checked against the actual JS/Python TaskRun, Pack, Signal, Observe and runtime source contracts. This is a focused client/integration audit, *not* a comprehensive certification of the private production backend.

## Critical architectural findings

- **P0: duplicate execution path in instructions.** `vira-runtime`, `vira-chatbot`, `vira-framework-integration`, `vira-integrate-app` and `vira-full-lifecycle` refer to direct resolve/projection behavior for normal application responses. The public sample **now** routes ON through `startTaskRun({requestedMode:"AUTO"})`, and deliberately returns **pending/no verified answer**. Agent instructions must make AUTO the *only* user-facing execution entry. `resolveRuntime` / `executeRuntime` / `serveBehaviorProjection` are low-level SDK diagnostics, never alternate customer chatbot authority.
- **P0: falsely optimistic verification.** A `post_model` module with only plain-English `requirement` does not pass the deterministic verifier. Supported basic requirements include `verifier:output.non_empty`, `required:`, `forbidden:`, limited `json:`, or an explicitly configured `policy:`/`rubric:`/`judge:` extension. A real provider output + post-model result must be bound to the same TaskRun/release/digest before claiming verified ON delivery.
- **P1: insufficient TaskRun coverage.** `vira-task-runs` calls itself JS-only and claims no runnable script even though both [JS](../../examples/javascript/taskrun-modes.mjs) and [Python](../../examples/python/taskrun_modes.py) exist. AUTO is a **requested routing choice**, not an execution mode; SINGLE/STRATEGY/COMPOUND/HYBRID are the four execution modes. Routing is proposal-only. Host capability is server-attested, not a client grant.
- **P1: obsolete example paths.** `vira-build-pack` still points to the legacy starter rather than the three quality-graded Packs and actual ZIP builder. Pack ZIP collection JSON, YAML manifest, install materialization and evaluation IDs need realistic steps and negative cases. `vira-chatbot` describes an ON provider answer where the app now only returns TaskRun admission/status.
- **P1: poor skill handoffs and unhelpful triggers.** Many `agents/openai.yaml` entries are literally “tasks and workflow guidance”; most `examples/README.md` are a generic five-sentence template. This makes auto-selection and actual coding less useful, and overlap between authoring/Pack/lifecycle/evaluation/Teach unclear.
- **P1: missing distinct workflows.** No dedicated observe-only, post-model runtime-verification or trace/receipt skill existed. `vira-observe-teach` tried to span the whole loop, masking the difference between raw observation, typed Signal, reviewable Teach proposal, and runtime receipt.
- **P2: narrow regression gate.** Existing tests check folder shape, link existence and some legacy strings, but did not fail on the direct-projection path returning as a recommended chatbot flow, on generic metadata, or on missing per-Skill negative-case examples.

## Full per-Skill findings and repair targets

| Existing Skill | Severity | Observed gap / error | Required upgrade |
| --- | --- | --- | --- |
| `vira-get-started` | P1 | Generic surface choice, no explicit AUTO/Observe-first fork | Stack detection, availability matrix, first safe real operation and intentional stop |
| `vira-npm-cli` | P2 | Installation-only; no product task or contract drift check | Registry vs pinned version, explicit import/tools/list, no publishing |
| `vira-integrate-app` | P0 | “Place Vira resolve/execute” encourages legacy route | Map host boundaries and canonical AUTO, real host attestations, no unauthorized fallback |
| `vira-js-sdk` | P1 | Pack guidance but little current TaskRun/provider handoff | Actual JS TaskRun methods, dual roles of Observe and diagnostic APIs, request identity |
| `vira-task-runs` | P1 | JS-only language, stale “no runner” example | JS/Python route/admit/state examples, AUTO vs four modes, state/version/idempotency, no fake final answer |
| `vira-python-sdk` | P0 | Mentions `serve_behavior_projection` as way to render app prompt | Route normal execution to `start_task_run`; projection only explicitly diagnostic |
| `vira-mcp` | P2 | Correct cautious scope but no canonical TaskRun separation | Tools/list, explicit no TaskRun tools in published MCP, supported SDK alternative |
| `vira-http-api` | P2 | Generic fetch advice, lacks exact documented read entry | Root URL/headers/error/202 and public routes only; no invented verified-answer endpoint |
| `vira-framework-integration` | P0 | “active non-empty projection” as application chat gate | Replace with AUTO TaskRun; streaming must wait on real verified-output handoff |
| `vira-author-behavior` | P1 | Says Program only composes points (inaccurate/incomplete); lacks verifier specifics | Task → Point → Program modules/checks, Strategy only when needed, source-bound Signals |
| `vira-signals` | P1 | Signal review covered, trust/attestation and failure examples underplayed | Producer types, mapping and version/scope proof, unknown/stale inputs, privacy |
| `vira-strategies` | P1 | Manual Strategy runtime as primary, no AUTO/real child execution distinction | Structured step graph, budgets, STRATEGY under AUTO, simulation != execution |
| `vira-build-pack` | P1 | Legacy starter as quality baseline, ambiguous import shapes | Three graded JSON collection examples, ZIP builder, checks, no fake evaluation |
| `vira-packs` | P1 | Import lifecycle but lacks Pack quality and executor/verification proof | Materialization status, exact evaluationId/digest, release and AUTO handoff |
| `vira-observe-teach` | P1 | Confuses instrumentation, Signal governance and Teach in one generic lifecycle | Consent, server-owned IDs, analysis 202/readback, separate proposal/release/outcome |
| `vira-evaluate` | P1 | Eval is pre-release, but not clearly distinct from live verifier PASS | Dataset/holdout, server-side quality, post-model checks, no caller score |
| `vira-evaluate-release` | P2 | Some correct gates, no explicit runtime acceptance | Exact immutable candidate, separate human gates, rollback and verified answer |
| `vira-release` | P2 | Operable but no canary/rollback status semantics | Signed/eligible artifact, production scope, host runtime proof, prior identity |
| `vira-runtime` | P0 | Can choose semantic/governed/projection as peer execution options | AUTO only normal entry, runtime verifier/receipt stages, diagnostic-only methods |
| `vira-chatbot` | P0 | Says ON model is invoked after projection and UI offers obsolete controls | Real OFF answer vs ON pending TaskRun, optional OFF observation, no simulated ON |
| `vira-studio` | P2 | Hardcoded unverified hostname, limited run status distinctions | Scope/capabilities, actual visible UI, no fabricated route/action |
| `vira-debug` | P1 | Generic troubleshooting misses new TaskRun/verification failures | Mode eligibility, host attestation, child state, missing final verified output |
| `vira-lifecycle` | P1 | Planning old output contract and projection path | Typed evidence → Pack/eval/release → AUTO → actual verification → outcomes |
| `vira-full-lifecycle` | P0 | Explicit “resolve/execute/projection path” on step 16; old partial-output assumptions | Replace with canonical AUTO, verified receipt gate, specialist handoffs and rollback |

## Existing code source anchors

- [JavaScript SDK](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/sdks/js-client.ts): `startTaskRun`, `resolveTaskRun`, `getTaskRun`, `continueTaskRun`, `observe`, Pack/Signal/Teach methods; `startTaskRunFromPrompt` convenience does *not* forward `requestedMode`.
- [Python SDK](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/sdks/python/vira_client.py): corresponding `start_task_run`, `resolve_task_run`, `get_task_run` and state transitions; Python `observe` requires explicit organization/project/environment in event.
- [TaskRun contract](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/taskrun/src/task-run-contract.ts): server route decisions, four execution modes, waiting/terminal states, identity/digest.
- [Pack importer](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/packs/src/pack-import.ts): YAML/JSON manifest, canonical collection files, archive.
- [Observation ingestion](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/observation/src/ingest.ts) and [Signal mapping](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/observation/src/signal-mapping.ts).
- [Behavior verifier](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/domain/src/behavior-verifier.ts) and [module runtime](https://github.com/hrpering/Vira_Behavior_Prod/blob/main/packages/runtime/src/behavior-module-runtime.ts).
- [Public ON handler](../../examples/frameworks/node-next/src/support-handler.mjs) and [canonical TaskRun guide](../canonical-taskrun.md).

## Acceptance for this library upgrade

1. **Every Skill** has a specific task procedure, production contract reference, at least one realistic example and a critical negative case; no generic “workflow guidance” descriptions.
2. **Any normal chatbot/integration Skill** routes through AUTO TaskRun, not projection. A deliberate diagnostic Skill may mention projection only as read-only/low-level.
3. **Observe/Signal/Teach/verification** stay separate. No claimed provider-output PASS from a TaskRun completion or model text.
4. **All tested Skill triggers** still include positive/negative/ambiguous cases, including newly introduced specialties.
5. **No mock backend or invented server receipt.** Static tests are labeled offline; live Vira acceptance needs real authorized customer service and provider.
6. **No tool/publish/rollback/release side effects** without explicit authority; package versions and scope are verified from installed sources.
7. Preserve all existing Skills' identities, avoid silently moving user workflows, and ensure standalone `.skill` archive packaging remains valid.

This document is an audit against exact source snapshots; it does not guarantee that every backend feature is already available to third-party customer tenants.
