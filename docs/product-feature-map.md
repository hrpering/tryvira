# Vira's complete product map: from first observation to verified runtime evidence

This is the **public navigation and claim-control inventory**, not a declaration that every subsystem is generally available. It maps the product **families** visible in the backend to their user outcome, current public documentation, and the evidence needed to call them production-ready.

**Status language:** `Documented` means a product contract/example is described, **not** that a customer can already use it. `Implemented boundary` means code or focused acceptance exists in the backend, **not** feature parity across SDK, Studio, API and MCP. `Needs live verification` means end-to-end customer acceptance remains necessary. `Operator/internal` means the feature must not be marketed as an open customer API. `Research/experimental` means no production-performance claim.

The backend maintains a much larger capacity inventory; its older capability matrices include **candidate, partial, local-pass and requires-audit** items. A design matrix, route name or source file alone does not prove a finished public feature. The purpose of this map is to prevent **omission and overclaiming at the same time**.

## The two connected loops

```text
OPERATE
Connect AI System / host
 → AUTO TaskRun / semantic Task selection
 → eligible SINGLE / STRATEGY / COMPOUND / HYBRID mode
 → released Program / Strategy / policy authority
 → real child executor + runtime enforcement
 → provider / tool / chatbot
 → actual post-model verification → receipt / trace → response

LEARN
Observe permitted requests, model/tool/actions/errors/cost
 → typed Signal discovery + reviewed source mapping
 → Feedback, outcome attribution, drift / incident evidence
 → Teach / discovery recommendation or candidate revision
 → evaluation + holdout / regression tests
 → human review / promotion / explicit release
 → new eligible artifact → monitor and observe again
```

**No direct behavior-projection alternate chatbot path.** The low-level SDK projection APIs stay in advanced diagnostics. See [canonical TaskRun](canonical-taskrun.md) and [runtime verification](runtime-verification.md).

## Every major product family

| Family | What to tell customers/developers | Status boundary | Public guide |
| --- | --- | --- | --- |
| **1. Identity, organizations and tenancy** | Accounts, projects, environments, memberships, roles, service accounts, API keys, session expiry, MFA/step-up, suspension/offboarding, delegated authority | Security/operational controls; actual provisioned tenant and role required. Some enterprise identity integrations require separate proof | [Auth and scope](auth-and-scope.md), [Security](security-model.md) |
| **2. Connect AI Systems and integrations** | Connection registry, health checks, SDK, Python, MCP, HTTP, framework adapters, provider BYOK, host capability handshake and compatibility | Method availability varies; a published package or sample is not a deployed provider connector | [Integration patterns](integration-patterns.md), [Capability discovery](capability-discovery.md), [Framework examples](../examples/frameworks/README.md) |
| **3. Observe and collect evidence** | Conversation, model, retrieval, tool, action, errors, latency, cost, feedback, business outcomes, batches, idempotency, privacy and retention | Observation admission can be real without automatic discovery, Signal or verified success | [Observe](observe.md), [Traces](traces.md) |
| **4. Discover tasks, context and risks** | Semantic Task discovery, components, tools/actions, execution boundaries, recommendations, confidence/provenance, ambiguity/abstain, merge/split/review and drift | AI suggestions are not canonical authority; some review surfaces may need pilot verification | [Semantic routing](semantic-routing.md), [Teach](teach.md) |
| **5. Signals and context intelligence** | Typed versioned Signals; discovery, definition, producer mapping, evidence admission and runtime attestation | Signal names alone do not produce trusted values or enforce decisions | [Signals](signals.md), [Observe](observe.md) |
| **6. Author behavior and Packs** | Semantic Tasks, Behavior Points, Programs, modules, guards, judgments, transforms, verification, escalation, preferences, policies, reusable Packs | Imported/installed is not released; exact module behavior and stable keys need validation | [Pack Academy](pack-authoring-guide.md), [Programs](behavior-programs.md), [Behavior Points](behavior-points.md) |
| **7. Strategy and multi-task execution** | Structured Strategy steps, state, transitions, budgets, tool policy, variants, SINGLE/STRATEGY/COMPOUND/HYBRID under AUTO | Actual server-selected mode depends on registry, release and server-attested host capabilities | [Execution modes](execution-modes.md), [Canonical TaskRun](canonical-taskrun.md) |
| **8. Runtime authority and enforcement** | Scope composition, policies, temporal contracts, pre-model/tool/action checks, idempotency, effect authorization, conflicts and immutable artifacts | Supported host boundary only; unauthorised or missing authority must not become permissive fallback | [Runtime](runtime.md), [Security](security-model.md) |
| **9. Runtime verification and decision quality** | Artifact integrity, output verifiers, repair/rerank/escalate/block, response quality scoring, bounded decisions, final verified answer | Backend verifier primitives exist; a public verified provider-output/readback handoff is **not yet demonstrated** | [Runtime verification](runtime-verification.md), [Decision quality](decision-and-quality.md), [Verified answer handoff](verified-answer-handoff.md) |
| **10. Evaluate, govern release and rollback** | Candidate datasets, deterministic/model/human graders, holdouts, regression gates, approvals, immutable release, shadow/canary, rollback, audit | Testing is not release and activation is not customer-wide eligibility; production proof varies | [Evaluation](evaluation-and-approval.md), [Release](release.md) |
| **11. Teach and continuous improvement** | Consented evidence selection, analysis, behavior-set/proposals, review/correct/reject, evaluated promotion, explicit release, later outcome and re-evaluation | Teach proposes; no automatic self-authorized production rewrite | [Teach AI](teach.md), [Observe](observe.md), [Signals](signals.md) |
| **12. Optimization and model/variant selection** | Bounded candidate selection, Jev decision classes, model/routing variants, optimizer artifacts, DSPy/GEPA-style experiments, provenance | Research/backend surfaces and conditional implementations; do not promise per-model savings, production optimizer, universal fine-tuning replacement | [Decision quality](decision-and-quality.md), [Product status](product-status.md) |
| **13. Traces, receipts and telemetry** | Task/child/authority/verification receipts, outcome correlation, distributed traces, metrics, errors, monitoring and cost/token visibility | Observe events are not a passed verifier; telemetry pipeline availability depends on deployment | [Traces](traces.md), [Observe](observe.md), [Runtime verification](runtime-verification.md) |
| **14. Data, privacy and knowledge** | Tenant isolation, consent, retention, encryption/secrets, export/delete, memory and preference objects, knowledge provenance, authorized connector sources | A memory/knowledge object is not automatically an approved behavior. Data connectors/residency may be deployment-specific | [Security](security-model.md), [Teach](teach.md), [Product status](product-status.md) |
| **15. Reliability, billing and operations** | Durable queues, worker leases/retry/DLQ, timeouts, notifications, rate limits, quotas, usage attribution, entitlements, budgets, provider health | Operational functionality, not universal SDK access or an announced commercial pricing plan | [Product status](product-status.md), [Capability map](capability-map.md) |
| **16. Studio, Admin, developer platform and delivery** | Studio authoring/review/test/release, Admin security/audit/jobs/deployments, API/JS/Python/MCP, CLI, templates, docs, examples, CI/supply chain | Parts are internal/pilot; do not infer feature parity, stable public routes or general service access | [Capability map](capability-map.md), [SDK guides](reference/javascript-sdk.md), [Status](example-verification.md) |

## Advanced runtime and infrastructure work

Additional engineering components exist around **model serving, GPU/accelerator compatibility, CPU/GPU parity, caching and optimization, multi-tenant deployment, recovery, evidence provenance, agent-native host capability negotiation, and action governance**. These are **architectural and experimental/infrastructure** areas, not automatic customer features or verified performance claims. They should be described only with a concrete versioned benchmark, host compatibility evidence, cost data and deployment acceptance. No source file proves a commercial GPU acceleration benefit on its own.

## Three pieces of evidence a technical buyer should request

**1. The behavior contract:** task, Behavior Point, Program/Strategy, stable key, active scope, exact revision and policy, including required Signals.

**2. The decision history:** input/observation evidence, candidate and evaluation IDs, errors, human review, approval, release and rollback identity.

**3. The real execution:** AUTO selected mode, child work actually executed, real provider/tool response, pre/post enforcement, output-bound verification checks and receipts. If the last segment is missing, call the result **TaskRun execution evidence**, not a verified end-user answer.

## Practical developer journeys

| Job | Smallest honest starting path |
| --- | --- |
| Instrument existing AI without changing its responses | [Connect and Observe](observe.md) |
| Detect a recurring complaint or KPI mismatch | [Observe](observe.md) → [Signal](signals.md) |
| Enforce a repeatable expectation | [Pack authoring](pack-authoring-guide.md) → [Evaluate](evaluation-and-approval.md) → [Release](release.md) |
| Handle one or several tasks | [AUTO TaskRun](canonical-taskrun.md) |
| Ensure a response was checked before delivery | [Runtime verification](runtime-verification.md) → [Verified answer contract](verified-answer-handoff.md) |
| Improve from user corrections and actual outcomes | [Teach AI](teach.md) with the authorization and consent gates intact |
| Assess operational risk and procurement readiness | [Product status and unverified boundaries](product-status.md) → [Security](security-model.md) |

## Public claims are versioned, not universal

Do not claim **every** feature above is released or identical on JS/Python/MCP/Studio. Some features have code; some have focused tests; some have live task-specific acceptance; others still require integration or productization. [Product-status matrix](product-status.md) distinguishes these. A local-pass or partial capability in an older backend plan is **not** a public SLA.

[How Vira works](how-vira-works.md) · [Brand positioning](brand-positioning.md) · [Buyer evaluation](for-teams.md)
