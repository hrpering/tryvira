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

Observations are evidence; they do not publish behavior.

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

Current SDKs use governed Signal proposal/mapping routes for discovery proposal creation/review/materialization and mapping creation/read/review. Use the SDK/MCP capability surface for the exact current contract instead of inventing stable Signal routes in an integration.

## Behavior Programs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/behavior-programs` | List Programs. |
| POST | `/v1/behavior-programs` | Create a Program. |
| GET | `/v1/behavior-programs/{programId}` | Read a Program. |

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

## Behavior Evaluation

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/evaluations` | Start Behavior Evaluation. |
| GET | `/v1/evaluations/{evaluationId}` | Read evaluation. |

## Response Quality & Decision

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/quality/evaluate` | Evaluate bounded response candidates and return quality/selection evidence. |

This is separate from Behavior Evaluation and does not grant release authority.

## Release

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/releases` | Release the exact eligible approved/evaluated governed identity. |

Release should remain bound to canonical identity/digest and the applicable approval/evaluation evidence. Runtime consumes the released identity rather than a client-invented status.

## Packs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/packs` | List Packs. |
| POST | `/v1/packs/import` | Import/parse a candidate; never activates behavior. |
| POST | `/v1/packs/{packId}/install` | Configure and install/materialize canonical draft objects. |
| POST | `/v1/packs/{packId}/evaluate` | Evaluate materialized Pack candidate. |
| POST | `/v1/packs/{packId}/approve` | Explicitly approve an eligible Pack. |
| POST | `/v1/packs/{packId}/release` | Release the exact approved Pack identity. |
| POST | `/v1/packs/{packId}/upgrade-preview` | Preview an incoming upgrade, preserved overrides and conflicts before applying it. |

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
