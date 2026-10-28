# HTTP API reference

This is the canonical public HTTP route map for the integration surfaces documented by this repository.

Authentication:

```http
Authorization: Bearer <api-key>
```

Use idempotency keys for retryable mutations when supported. Keep returned request IDs for debugging.

## AI systems and connections

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/ai-systems` | List AI systems. |
| POST | `/v1/ai-systems` | Create/connect an AI system. |
| GET | `/v1/ai-systems/{systemId}` | Read one AI system. |
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

## Discovery and semantic resolution

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/discovery/candidates` | List discovery candidates. |
| POST | `/v1/discovery/candidates/{kind}/{key}/review` | Review a candidate. |
| POST | `/v1/discovery/candidates/{kind}/{key}/publish` | Publish an approved candidate where supported. |
| POST | `/v1/semantic/resolve` | Resolve/abstain on a semantic task. |

## Signals

Current SDKs use governed Signal proposal/mapping routes for discovery proposal creation/review/materialization and mapping creation/read/review.

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
| POST | `/v1/behavior-strategies/{strategyId}/variants` | Create a variant. |
| POST | `/v1/behavior-strategies/{strategyId}/validate` | Validate. |
| POST | `/v1/behavior-strategies/{strategyId}/simulate` | Structural simulation. |

## Strategy execution

| Method | Path | Purpose |
| --- | --- | --- |
| GET/POST | `/v1/runtime/strategy-executions` | List/start Strategy executions as supported by current contract. |
| GET | `/v1/runtime/strategy-executions/{executionId}` | Read execution. |
| GET | `/v1/runtime/strategy-executions/{executionId}/trace` | Read trace. |
| POST | `/v1/runtime/strategy-executions/{executionId}/continue` | Continue waiting execution. |
| POST | `/v1/runtime/strategy-executions/{executionId}/cancel` | Cancel non-terminal execution. |

## Runtime

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/runtime/resolve` | Resolve released behavior from governed context. |
| POST | `/v1/runtime/execute` | Execute through runtime boundary. |
| POST | `/v1/runtime/behavior-capsule` | Compile bounded behavior capsule. |
| POST | `/v1/runtime/behavior-projection` | Serve behavior projection. |
| POST | `/v1/runtime/capabilities/attest` | Attest capabilities. |
| POST | `/v1/runtime/capabilities/resolve` | Resolve capability eligibility/selection. |
| POST | `/v1/runtime/capabilities/traces` | Record capability trace. |

## Model serving

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/model-serving/resolve` | Resolve model-serving selection. |
| POST | `/v1/model-serving/traces` | Record model-serving trace. |

## Teach AI

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/teach/evidence` | Submit Teach evidence. |

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
| POST | `/v1/releases` | Create governed release. |

## Packs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/packs` | List Packs. |
| POST | `/v1/packs/import` | Import candidate. |
| POST | `/v1/packs/{packId}/install` | Install/materialize draft. |
| POST | `/v1/packs/{packId}/evaluate` | Evaluate. |
| POST | `/v1/packs/{packId}/approve` | Approve. |
| POST | `/v1/packs/{packId}/release` | Release. |

## Deployment evidence

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/deployments/{deploymentId}/comparisons` | Record comparison evidence. |
| POST | `/v1/deployments/{deploymentId}/authoritative-health` | Record authoritative health evidence. |

See [Capability map](../capability-map.md) for SDK/MCP differences.
