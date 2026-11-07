# Runtime

Runtime resolution applies eligible released governed behavior through the enforcing authority boundary.

## Resolve a Behavior Point

```ts
const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId,
    projectId,
    environmentId
  },
  idempotencyKey: crypto.randomUUID()
});
```

## Raw API

```text
POST /v1/runtime/resolve
POST /v1/runtime/execute
POST /v1/runtime/behavior-capsule
POST /v1/runtime/behavior-projection
```

## Recommended application flow

```text
user request
→ semantic resolution
→ selected Semantic Task / Behavior Point + governed semantic context
→ runtime resolution
→ eligible released Program / Strategy / projection
→ build model / agent request
→ execute
→ receipt / trace
→ observe response
→ feedback / outcome
```

Semantic resolution is evidence/candidate selection. Runtime resolution is the authority boundary.

## Semantic context remains binding context

When semantic resolution identifies a governed Program/context, runtime Strategy/projection selection must remain compatible with that semantic Program identity. Runtime should not silently switch to an unrelated Strategy merely because it shares a Behavior Point key.

Applications should therefore pass the server-returned semantic context forward rather than rebuilding or weakening it client-side. If a capsule/projection carries Program identity, preserve that identity through the runtime request/continuation path.

## Do not confuse resolve and execute

**Resolve** determines the governed eligible runtime context and can deny/abstain when no valid released identity exists.

**Execute** runs through the enforcing runtime boundary where supported.

A successful semantic classification, Strategy activation, Pack installation, Teach promotion, or quality score is not equivalent to runtime authorization.

## Strategy continuation

If a Strategy execution reaches `WAITING_USER` or `WAITING_HOST`, continue the same execution with its persisted authority digest plus the new state/references. Do not start a replacement execution merely to bypass the wait state.

## Projection and receipts

Behavior capsule/projection responses should remain bound to the governed released identity and semantic context selected for the request. Preserve returned authority digests, request IDs, receipts and trace identifiers rather than recomputing them in the client. The published JavaScript SDK `RuntimeResolution` type can expose `projectionMode` (`active`, `unavailable`, or `not-applicable`) and an optional `behaviorProjection.rendered` string with a `projectionDigest`. The Python SDK instead exposes `serve_behavior_projection`, whose response body contains a `projection` object; do not assume the JS resolution fields on a Python response. Framework integrations may pass a non-empty rendered projection as model guidance and retain its digest, after checking the exact operation's response contract. This does not authorize the host application to call tools, send messages, or perform external side effects; apply a separate application permission check for those actions.

## Failure behavior

Do not convert a runtime, verifier, scope, digest, release, or authorization failure into accidental permission for an effectful action.

Enforcing paths should remain fail-closed where required. Observation-only telemetry may use a different failure policy when explicitly configured.

See [Semantic routing](semantic-routing.md), [Release](release.md), [Strategies](strategies.md), and the [Developer guide](developer-guide.md).
