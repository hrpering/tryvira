# HTTP API route map

Base:

```text
<VIRA_API_URL>
```

Authentication:

```http
Authorization: Bearer <api-key>
```

For retryable mutations, use a stable idempotency key when supported.

## AI systems

```text
GET  /v1/ai-systems
POST /v1/ai-systems
GET  /v1/ai-systems/{systemId}
POST /v1/ai-systems/{systemId}/connections
GET  /v1/ai-systems/{systemId}/inventory
GET  /v1/connections/{connectionId}/health
POST /v1/connections/{connectionId}/test
```

## Observations

```text
POST /v1/observations
POST /v1/observations/batch
POST /v1/observations/sdk
```

## Discovery + Semantic

```text
GET  /v1/discovery/candidates
POST /v1/discovery/candidates/{kind}/{key}/review
POST /v1/discovery/candidates/{kind}/{key}/publish
POST /v1/semantic/resolve
```

## Signals

Signal proposal/mapping routes are exposed through the SDK and MCP integration surfaces. Use the versioned SDK when possible so the client contract stays aligned with the server.

## Behavior Programs

```text
GET  /v1/behavior-programs
POST /v1/behavior-programs
GET  /v1/behavior-programs/{programId}
```

## Behavior Strategies

```text
GET  /v1/behavior-strategies
POST /v1/behavior-strategies
GET  /v1/behavior-strategies/{strategyId}
POST /v1/behavior-strategies/{strategyId}/variants
POST /v1/behavior-strategies/{strategyId}/validate
POST /v1/behavior-strategies/{strategyId}/simulate
```

## Runtime

```text
POST /v1/runtime/resolve
POST /v1/runtime/execute
POST /v1/runtime/behavior-capsule
POST /v1/runtime/behavior-projection

GET  /v1/runtime/strategy-executions
GET  /v1/runtime/strategy-executions/{executionId}
GET  /v1/runtime/strategy-executions/{executionId}/trace
POST /v1/runtime/strategy-executions/{executionId}/continue
POST /v1/runtime/strategy-executions/{executionId}/cancel
```

## Capabilities

```text
POST /v1/runtime/capabilities/attest
POST /v1/runtime/capabilities/resolve
POST /v1/runtime/capabilities/traces
```

## Model serving

```text
POST /v1/model-serving/resolve
POST /v1/model-serving/traces
```

## Teach

```text
POST /v1/teach
POST /v1/teach/evidence
```

The complete Teach proposal/review/evaluation/promotion lifecycle is versioned by the product server.

## Evaluation

```text
POST /v1/evaluations
GET  /v1/evaluations/{evaluationId}
```

## Release

```text
POST /v1/releases
```

## Packs

```text
GET  /v1/packs
POST /v1/packs/import
POST /v1/packs/{packId}/install
POST /v1/packs/{packId}/evaluate
POST /v1/packs/{packId}/approve
POST /v1/packs/{packId}/release
```

The SDK also exposes Pack upgrade preview.

## Deployment evidence

```text
POST /v1/deployments/{deploymentId}/comparisons
POST /v1/deployments/{deploymentId}/authoritative-health
```

## Prefer the SDK for application code

Raw HTTP is useful for inspection and platform integrations.

For normal application code, `@vira/sdk` or `vira-sdk` provides request construction, bearer auth, request IDs, retry behavior, idempotency handling, and fail-open vs fail-closed distinction.
