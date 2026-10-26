# Runtime

Runtime resolution applies released governed behavior.

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
```

## Recommended application flow

```text
user request
→ semantic resolution
→ selected Behavior Point
→ runtime resolution
→ build model / agent request
→ execute
→ observe response
→ feedback / outcome
```

## Do not confuse resolve and execute

Resolve determines the governed runtime context.

Execute runs through the enforcing runtime boundary where supported.

## Failure behavior

Do not convert a runtime or authorization failure into accidental permission for an effectful action.

Enforcing paths should remain fail-closed where required.
