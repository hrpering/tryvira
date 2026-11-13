# Product status and proof boundaries

This page distinguishes **repository evidence**, **public client availability**, **customer tenant access** and **end-to-end application behavior**. These are different claims. It should be read alongside the [feature map](product-feature-map.md), not replaced by a single “available” badge.

## What is genuinely public?

- Public documentation, source examples, the Pack Academy and the agent Skills are in this repository.
- The JavaScript `@tryvira/sdk`, MCP `@tryvira/mcp` and Python `tryvira-sdk` distributions are documented separately with their own release licenses; **installation does not provision a Vira service account**.
- Ordinary application requests should enter via **AUTO TaskRun**. Direct behavior-projection remains a low-level diagnostic/SDK tool.
- A customer-scoped, permitted Observe event can be admitted and have its source identity preserved. That does not automatically make a Signal, run Teach or pass verification.

## Evidence levels to use when writing public claims

| Evidence level | Meaning | Safe wording |
| --- | --- | --- |
| `Concept / planned` | Product design, roadmap or code not proven at the intended boundary | “Designed to”, “under development”, not “available” |
| `Implementation / unit test` | Source and focused tests support a particular operation | “The backend includes…”, identify the exact boundary |
| `Structural SDK example` | Published-client calls, serialization, build and offline test verified | “Example compiles and checks client contract” |
| `Local integrated acceptance` | Required local dependencies, real persistence and scoped postcondition verified | “Passed this local acceptance”, not hosted availability |
| `Deployed acceptance` | Identified customer-scope request completed at a known deployment/commit | “Observed in this tested scenario and configuration” |
| `Complete provider + verification chain` | Actual provider output and post-model verifier result bound to the same released TaskRun, response digest and receipt | “Verified ON chatbot answer” only after explicit end-to-end proof |

## Targeted feature status

| Product area | Present evidence / support | Important limitation |
| --- | --- | --- |
| Connect / SDK / MCP / Python | Public packages/examples, connection and surface-discovery contracts | Versions and methods differ; no universally provisioned tenant |
| Observe / feedback / outcomes | Server observation event schema, admission/idempotency and source integrity; published SDK sample | Real consent, privacy, connection and follow-on processing are separate |
| Signals / mapping | Backend definition, discovery, review, producer mapping and evidence-attestation components | A declared Signal key does not mean mapping/attestation is active or supported by every public client |
| Semantic Tasks / discovery | Backend semantic selection and customer-scoped acceptance evidence | May abstain, ask for clarification or fail; AI classification is not release authority |
| Programs / Strategies / Packs | Pack import/materialization, Program modules, structured Strategy types and SDK lifecycle | Tests/approval/release and installed artifact identity are independent gates |
| AUTO TaskRun, child execution | Backend includes admitted task plans, mode dispatch, child executor, PostgreSQL-backed state and receipts, with documented deployed acceptance for selected cases | Not every customer, connection, mixed intent or host capability works automatically |
| Artifact verification | Program/release/immutable artifact digest checks | Checks integrity, **not** provider output correctness |
| Runtime module checks | Pre-model/tool/action and post-model module runtime, deterministic verifier and extension points | Free-text requirements are not automatically verifiable; some advanced verifiers require configured implementations |
| Provider-generated verified chatbot output | A previous isolated provider-backed probe and separately documented mode/provider comparisons exist | **No published public TaskRun contract here proves that the exact final provider output passed post-model verification and was returned with matching receipt** |
| Evaluation, quality, release | Candidate evaluations, bounded response quality, approval/release and actual scoped evidence paths | A score does not authorize a release; no universal quality improvement claim |
| Teach and optimization | Evidence/proposal/review/promote loops and separately tested optimization components | No automatic production self-rewrite; no guaranteed optimization/cost reduction |
| Traces and receipts | Scoped TaskRun/child lineage, runtime traces and authority/artifact digests | Full trace/verification output availability differs by integration and retention policy |
| Billing / enterprise / Studio / Admin | Code and operational route families are present in product repo | Do not assume open SaaS pricing, stable customer UI access, complete enterprise connectors or production SLAs |
| GPU/model serving/accelerators | Active implementation and research/benchmark surfaces | Not a publicly proven generalized throughput/latency/cost claim; hardware/runtime support must be evidenced per deployment |

## Specific current caveat on published ON/OFF evidence

A dated **13 November 2026** backend acceptance record reports deployed TaskRuns for AUTO/SINGLE/STRATEGY/COMPOUND/HYBRID and a separate OFF/ON provider comparison. **The ON provider test assembled a released projection into the provider prompt**; it did not prove the one canonical public TaskRun-to-provider-to-post-model-verification response contract demanded by the new integration design. These are useful pieces of evidence, but **combining them into a claim of a complete unified verified chatbot path would be inaccurate**.

The public Next.js example therefore submits AUTO TaskRun and shows actual admitted/persisted status instead of silently bypassing the canonical provider/verifier handoff to display an answer.

## What needs proof before calling a feature production-ready?

For each enabled customer and public surface: accepted request schema, server-derived scope/actor, runtime host capability attestation, data consent and retention, idempotency, actual module/verifier execution, required negative paths, real provider/host behavior, persisted receipts and output digest correlation, versioned rollout/rollback, and required operational monitoring.

**Special caution for billing and hardware:** source code, a local feature flag or a partial operator route is not a commercial pricing guarantee or a hardware benchmark. Use separately published service terms and deployment-specific performance evidence before making such claims.

## How this map stays current

The backend has a larger capability inventory with **hundreds of items** across sixteen domains. Much of that plan contains partial/needs-audit results; copying those rows into the public product brochure as “available” would mislead customers. This guide explicitly inventories the **product families**, while the [capability discovery API](capability-discovery.md) and installed SDK documentation remain the authoritative surface for a specific authenticated tenant.

For every new public claim, demand a documented operation and at least the matching proof level. Use the [runtime verification guide](runtime-verification.md) to establish what was actually checked.

[Feature map](product-feature-map.md) · [Observe](observe.md) · [Signals](signals.md) · [Canonical TaskRun](canonical-taskrun.md) · [Verification handoff](verified-answer-handoff.md)
