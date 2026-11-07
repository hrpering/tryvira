# HTTP API reference

This is the canonical public HTTP route map for the integration surfaces documented by this repository.

Authentication:

```http
Authorization: Bearer <api-key>
```

Use idempotency keys for retryable mutations when supported. Keep returned request IDs, authority digests and receipts for debugging/audit. Authentication success is not authorization success: scope, role, policy, release state and artifact identity still apply.

## Scoped product capability discovery

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/capabilities` | List capabilities available to the current scoped credential. |
| GET | `/v1/capabilities?surface={surface}` | Filter capability discovery to `studio`, `sdk`, `python`, `mcp`, or `api`. |

This is separate from runtime capability attestation/resolution.

## AI systems and connections

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/ai-systems` | List AI systems. |
| POST | `/v1/ai-systems` | Create/connect an AI system. |
| GET | `/v1/ai-systems/{systemId}` | Read one AI system. |
| DELETE | `/v1/ai-systems/{systemId}` | Delete an eligible unused AI system after explicit confirmation. |
| DELETE | `/v1/ai-systems/{systemId}/cleanup` | Explicitly confirmed cascade cleanup; observation deletion is separately opted in. |
| POST | `/v1/ai-systems/{systemId}/connections` | Connect an adapter. |
| GET | `/v1/ai-systems/{systemId}/inventory` | Read system inventory. |
| GET | `/v1/connections/{connectionId}/health` | Read connection health. |
| POST | `/v1/connections/{connectionId}/test` | Test a connection. |

SDK convenience: `connectOnce` / `connect_once` composes the normal system + adapter flow.

## Observations

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/observations` | Submit one observation. |
| POST | `/v1/observations/batch` | Submit a bounded batch. |
| POST | `/v1/observations/sdk` | Submit SDK-form observation delivery. |
| GET | `/v1/runtime/traces/search` | Search runtime traces using supported query filters. |

SDK `trace`, `outcome`, and `feedback` helpers submit typed events through `/v1/observations`. Observations are evidence; they do not publish behavior.

## Canonical Semantic Tasks and Behavior Points

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/semantic-tasks` | List scoped Semantic Tasks. |
| POST | `/v1/semantic-tasks` | Create a Semantic Task. |
| GET | `/v1/semantic-tasks/{taskId}` | Read one Semantic Task. |
| DELETE | `/v1/semantic-tasks/{taskId}` | Delete an eligible unused Task after explicit confirmation. |
| GET | `/v1/behavior-points` | List scoped Behavior Points. |
| POST | `/v1/behavior-points` | Create a Behavior Point bound to one or more Tasks. |
| GET | `/v1/behavior-points/{behaviorPointId}` | Read one Behavior Point. |
| DELETE | `/v1/behavior-points/{behaviorPointId}` | Delete an eligible unused Behavior Point after explicit confirmation. |

Confirmed deletes are effectful, idempotency-aware operations. `confirm: true` is required by the client/tool contract, and the server can still reject active/in-use/ineligible resources. Deletion is not rollback.

See [Canonical authoring](../canonical-authoring.md).

## Discovery and semantic resolution

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/discovery/candidates` | List discovery candidates. |
| POST | `/v1/discovery/candidates/{kind}/{key}/review` | Review a candidate. |
| POST | `/v1/discovery/candidates/{kind}/{key}/publish` | Publish an approved candidate where supported. |
| POST | `/v1/semantic/resolve` | Resolve/select/abstain on a semantic task candidate. |

A semantic result is evidence/candidate selection. It is not runtime authorization.

## Signals

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/discovery/candidates` | Read discovery candidates; review state is an optional query filter. |
| POST | `/v1/signals/discovery-proposals` | Create a reviewable Signal discovery proposal. |
| POST | `/v1/signals/discovery-proposals/{proposalId}/review` | Record a proposal decision. |
| POST | `/v1/signals/discovery-proposals/{proposalId}/materialize` | Materialize an approved proposal. |
| POST | `/v1/signals/mappings` | Create a Signal mapping candidate. |
| GET | `/v1/signals/mappings/{mappingId}` | Read a Signal mapping. |
| POST | `/v1/signals/mappings/{mappingId}/review` | Review the mapping. |

Check scoped capabilities before using these routes; a discovery result or proposal is not automatically approved or materialized.

## Behavior Programs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/behavior-programs` | List Programs. |
| POST | `/v1/behavior-programs` | Create a Program. |
| GET | `/v1/behavior-programs/{programId}` | Read a Program. |
| DELETE | `/v1/behavior-programs/{programId}` | Delete an eligible unused Program after explicit confirmation. |
| DELETE | `/v1/behavior-programs/{programId}/cascade` | Confirmed Program cascade cleanup; runtime purge requires explicit opt-in. |

## Behavior Strategies

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/behavior-strategies` | List Strategies. |
| POST | `/v1/behavior-strategies` | Create a Strategy. |
| GET | `/v1/behavior-strategies/{strategyId}` | Read a Strategy. |
| DELETE | `/v1/behavior-strategies/{strategyId}` | Delete an eligible non-active unused Strategy after explicit confirmation. |
| POST | `/v1/behavior-strategies/{strategyId}/variants` | Compile/persist an immutable Strategy variant. |
| POST | `/v1/behavior-strategies/{strategyId}/validate` | Validate. |
| POST | `/v1/behavior-strategies/{strategyId}/simulate` | Structural simulation. |
| POST | `/v1/behavior-strategies/{strategyId}/activate` | Explicitly activate a validated scoped Strategy revision. |

Activation is a server-side lifecycle transition. It does not bypass evaluation/release/runtime rules that apply to the target flow. Deletion is separately confirmed and does not replace deactivation/rollback semantics.

## Strategy execution

| Method | Path | Purpose |
| --- | --- | --- |
| GET/POST | `/v1/runtime/strategy-executions` | List/start Strategy executions as supported by current contract. |
| GET | `/v1/runtime/strategy-executions/{executionId}` | Read execution. |
| GET | `/v1/runtime/strategy-executions/{executionId}/trace` | Read trace. |
| POST | `/v1/runtime/strategy-executions/{executionId}/continue` | Continue a waiting execution using its pinned authority digest/state/references. |
| POST | `/v1/runtime/strategy-executions/{executionId}/cancel` | Cancel non-terminal execution. |

Do not create a replacement execution to bypass a waiting execution state.

## Runtime

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/runtime/resolve` | Resolve eligible released behavior from governed context. |
| POST | `/v1/runtime/execute` | Execute through the enforcing runtime boundary. |
| POST | `/v1/runtime/behavior-capsule` | Compile bounded behavior capsule. |
| POST | `/v1/runtime/behavior-projection` | Serve a behavior projection bound to the governed runtime identity. |
| GET | `/v1/runtime/traces/search` | Search runtime traces with supported filters. |
| POST | `/v1/runtime/capabilities/attest` | Attest runtime capabilities. |
| POST | `/v1/runtime/capabilities/resolve` | Resolve runtime capability eligibility/selection. |
| POST | `/v1/runtime/capabilities/traces` | Record runtime capability trace. |

Runtime is an authority boundary. Preserve returned receipts/digests and do not reconstruct authority state client-side.

## Model serving

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/model-serving/resolve` | Resolve model-serving selection. |
| POST | `/v1/model-serving/traces` | Record model-serving trace. |

## Teach AI

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/teach/evidence` | Submit Teach evidence. |
| POST | `/v1/teach/proposals` | Create a Teach proposal from admitted evidence. |
| POST | `/v1/teach/proposals/{proposalId}/review` | Review a Teach proposal. |
| POST | `/v1/teach/proposals/{proposalId}/evaluate` | Attach/advance Teach evaluation. |
| POST | `/v1/teach/proposals/{proposalId}/promote` | Promote an eligible Teach proposal. |

Promotion does not silently grant release authority.

## Conversation archive and Teach analysis

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/teach/conversations` | Read the scoped conversation evidence archive. |
| POST | `/v1/teach/conversations/import` | Import a bounded archive of conversations. |
| POST | `/v1/teach/conversations/{evidenceId}/revoke` | Revoke imported evidence with a reason. |
| POST | `/v1/teach/analyses` | Create analysis from selected evidence IDs. |
| GET | `/v1/teach/analyses/{analysisId}` | Read an analysis. |
| POST | `/v1/teach/cross-conversation-analyses` | Analyze at least two selected conversation references. |
| GET | `/v1/teach/runs` | List scoped Teach runs. |
| GET | `/v1/teach/runs/{teachRunId}/behavior-set` | Read the generated behavior set. |
| GET | `/v1/teach/runs/{teachRunId}/recommendation` | Read a recommendation. |
| POST | `/v1/teach/runs/{teachRunId}/recommendation/accept` | Accept with an attributable actor ID. |
| POST | `/v1/teach/runs/{teachRunId}/recommendation/reject` | Reject with a reason. |
| POST | `/v1/teach/runs/{teachRunId}/recommendation/edit` | Submit a separately identified revision edit. |

Treat imported conversations as user data: minimize fields, honor retention/consent, and use revocation where required. A recommendation or proposal promotion does not itself release behavior.

## Behavior Evaluation

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/evaluations` | Start Behavior Evaluation. |
| GET | `/v1/evaluations/{evaluationId}` | Read evaluation. |
| GET | `/v1/evaluations/{evaluationId}/comparison` | Read server-run comparative evaluation output. |
| POST | `/v1/evaluations/{evaluationId}/comparison/findings/{findingId}/review` | Review a persisted comparison finding. |
| POST | `/v1/evaluation-plans` | Create an evaluation plan. |
| GET | `/v1/evaluation-plans/{planId}` | Read a plan. |
| POST | `/v1/evaluation-plans/{planId}/seal` | Seal a plan after review. |

Comparative starts use `POST /v1/evaluations` with a `comparisonPlan`. The server executes comparison arms and owns their receipts; clients cannot submit arm outputs. Sealing a plan is separate from evaluation, approval, and release.

## Improvement proposals and behavior revisions

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/evaluations/{evaluationId}/improvement-proposal` | Create an improvement proposal from a persisted evaluation. |
| GET | `/v1/behavior-improvement-proposals/{proposalId}` | Read proposal state. |
| POST | `/v1/behavior-improvement-proposals/{proposalId}` | Request review, approve/reject, or submit an edit-as-new action supported by the SDK. |
| POST | `/v1/behavior-revision-candidates` | Create an immutable candidate from reviewed changes. |
| POST | `/v1/behavior-revision-candidates/{candidateId}/evaluate` | Run server-backed evaluation against a non-empty dataset. |
| POST | `/v1/behavior-revision-candidates/{candidateId}/{transition}` | Apply a supported candidate transition (`evaluate`, `accept`, `reject`, or `pack`). |

Use the SDK method signatures and server-returned records for request bodies. Never treat a client-supplied `passed`, `score`, or invented digest as authoritative evaluation evidence.

## Response Quality & Decision

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/quality/evaluate` | Evaluate bounded response candidates and return quality/selection evidence. |

This is separate from Behavior Evaluation and does not grant release authority.

## Release

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/releases` | Release the exact eligible approved/evaluated governed identity. |
| POST | `/v1/releases/manual-program` | Request a manual Program release with a reason. |

Release should remain bound to canonical identity/digest and the applicable approval/evaluation evidence. Runtime consumes the released identity rather than a client-invented status. The published SDK has no `rollback` method; restore a previously known eligible canonical identity through the documented release workflow and verify runtime readback.

## Packs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/packs` | List Packs. |
| DELETE | `/v1/packs/{packId}` | Delete an eligible unused Pack after explicit confirmation. |
| POST | `/v1/packs/import` | Import/parse a candidate; never activates behavior. |
| POST | `/v1/packs/{packId}/install` | Configure and install/materialize canonical draft objects. |
| POST | `/v1/packs/{packId}/evaluate` | Evaluate materialized Pack candidate. |
| POST | `/v1/packs/{packId}/approve` | Explicitly approve an eligible Pack. |
| POST | `/v1/packs/{packId}/release` | Release the exact approved Pack identity. |
| POST | `/v1/packs/{packId}/upgrade-preview` | Preview an incoming upgrade, preserved overrides and conflicts before applying it. |
| POST | `/v1/pack-revisions` | Create a draft Pack Revision from an accepted behavior candidate. |
| GET | `/v1/pack-revisions/{revisionId}` | Read a Pack Revision. |
| GET | `/v1/pack-revisions/{revisionId}/diff` | Read its lineage and change summary. |
| POST | `/v1/pack-revisions/{revisionId}/{transition}` | Apply a supported validation/approval/release transition. |
| POST | `/v1/pack-revisions/{revisionId}/materialize` | Materialize an approved revision into canonical state. |

There is no client-side verification shortcut that can replace validation, conflict inspection, evaluation, approval and release. See [Packs](../packs.md).

### Pack request contracts

- `POST /v1/packs/import` accepts `{ "manifest": { ... }, "objects": { ... } }` or a supported archive. It returns the persisted Pack candidate and inventory/conflict data.
- `POST /v1/packs/{packId}/install` accepts `{ "variables": { ... } }`. It can return HTTP `202` with a queued job. A `202` is not completed materialization; read `GET /v1/packs` until the Pack's persisted `objects.materialization` is available before evaluating.
- Create a provider-backed evaluation with `POST /v1/evaluations`, passing a unique `id`, `targetArtifact` containing the exact `packId` and materialized `packDigest`, input-only dataset cases with criteria, and a threshold. The API returns the persisted `evaluation.id` and target binding.
- `POST /v1/packs/{packId}/evaluate` accepts `{ "evaluationId": "<persisted-id>" }`. The server checks status, trusted grader, scope, Pack ID, and Pack digest. Do not submit a client-authored pass or score.

The generic provider-backed evaluation creates and scores a response against supplied criteria; it is not proof that runtime executed the materialized behavior. Inspect runtime/candidate execution receipts for that claim. Approval and release remain separate authorized requests after evaluation review. The published MCP package does not expose Pack operations; use the SDK, Python SDK, or HTTP API for Pack evaluation.

## Deployment evidence

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/deployments/{deploymentId}/comparisons` | Record comparison evidence. |
| POST | `/v1/deployments/{deploymentId}/authoritative-health` | Record authoritative health evidence. |

See [Capability map](../capability-map.md) for SDK/MCP differences and [Developer guide](../developer-guide.md) for an end-to-end flow.
