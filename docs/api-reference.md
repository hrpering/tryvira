# Public API reference

This page lists the documented public control-plane routes available in the current API contract.

Base URL:

```text
https://api.example.com
```

Authentication:

```http
Authorization: Bearer <api-key>
```

For retryable mutations, send an idempotency key when the route/SDK operation supports it.

## AI Systems and connections

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/ai-systems` | List AI systems |
| POST | `/v1/ai-systems` | Create/connect an AI system |
| GET | `/v1/ai-systems/{systemId}` | Get an AI system |
| POST | `/v1/ai-systems/{systemId}/connections` | Connect an adapter |
| GET | `/v1/ai-systems/{systemId}/inventory` | Read system inventory |
| GET | `/v1/connections/{connectionId}/health` | Read connection health |
| POST | `/v1/connections/{connectionId}/test` | Test a connection |

Prefer `connectOnce` in the SDK for the normal integration path.

## Observations

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/observations` | Submit one observation |
| POST | `/v1/observations/batch` | Submit a bounded batch |
| POST | `/v1/observations/sdk` | Submit SDK-form observation delivery |

SDK equivalents include `observe`, `trace`, `feedback`, and `outcome`.

## Discovery and semantic routing

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/discovery/candidates` | List discovery candidates |
| POST | `/v1/discovery/candidates/{kind}/{key}/review` | Review a candidate |
| POST | `/v1/discovery/candidates/{kind}/{key}/publish` | Publish an approved candidate |
| POST | `/v1/semantic/resolve` | Resolve a semantic task |

Semantic resolution is not runtime authorization.

## Behavior Programs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/behavior-programs` | List programs |
| POST | `/v1/behavior-programs` | Create a program |
| GET | `/v1/behavior-programs/{programId}` | Get a program |

## Behavior Strategies

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/behavior-strategies` | List strategies |
| POST | `/v1/behavior-strategies` | Create a strategy |
| GET | `/v1/behavior-strategies/{strategyId}` | Get a strategy |
| POST | `/v1/behavior-strategies/{strategyId}/variants` | Create a strategy variant when supported by the current server version |
| POST | `/v1/behavior-strategies/{strategyId}/validate` | Validate a strategy |
| POST | `/v1/behavior-strategies/{strategyId}/simulate` | Structural simulation |

A structural simulation is not proof of real model/tool execution.

## Runtime

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/runtime/resolve` | Resolve released behavior |
| POST | `/v1/runtime/execute` | Execute through runtime |
| GET | `/v1/runtime/strategy-executions` | List strategy executions |
| GET | `/v1/runtime/strategy-executions/{executionId}` | Get an execution |
| GET | `/v1/runtime/strategy-executions/{executionId}/trace` | Get execution trace |
| POST | `/v1/runtime/strategy-executions/{executionId}/continue` | Continue waiting execution |
| POST | `/v1/runtime/strategy-executions/{executionId}/cancel` | Cancel execution |

This repository documents only simplified developer trace output.

## Evaluation

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/evaluations` | Start an evaluation |
| GET | `/v1/evaluations/{evaluationId}` | Read an evaluation |

## Release

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/releases` | Create a governed release |

## Teach

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/v1/teach` | Submit Teach evidence through compatibility route |
| POST | `/v1/teach/evidence` | Submit Teach evidence |

The Teach product surface also supports proposal review/evaluation/promotion flows. Use the versioned product docs/SDK for those operations.

## Packs

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/packs` | List Packs |
| POST | `/v1/packs/import` | Import a Pack candidate |
| POST | `/v1/packs/{packId}/install` | Install/materialize draft |
| POST | `/v1/packs/{packId}/evaluate` | Evaluate |
| POST | `/v1/packs/{packId}/approve` | Approve after evaluation |
| POST | `/v1/packs/{packId}/release` | Release after approval |

The SDK exposes the same lifecycle with Pack helper methods.

## Signals

Signal discovery/review/materialization exists as a governed product workflow, but direct signal-authoring endpoints are not presented here as a stable general-purpose public API contract.

Use:

- observations;
- feedback;
- outcomes;
- Studio;
- supported discovery workflows.

See [signals.md](signals.md).

## Error handling

Expect structured API errors.

Keep the returned request identifier when available.

Do not paste credentials or customer payloads into public bug reports.
