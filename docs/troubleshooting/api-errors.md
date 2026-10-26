# API errors

This page covers failures returned through the HTTP API and surfaced by the SDKs.

## JavaScript / TypeScript

```ts
import { ViraApiError } from "@vira/sdk";

try {
  await vira.resolveRuntime({
    behaviorPoint: "marketing.launch_plan",
    executionBoundary: { organizationId, projectId, environmentId },
    idempotencyKey: crypto.randomUUID(),
  });
} catch (error) {
  if (error instanceof ViraApiError) {
    console.error({
      status: error.status,
      requestId: error.requestId,
      body: error.body,
    });
  }
}
```

## Python

```python
from vira import ViraApiError

try:
    client.resolve_runtime(request)
except ViraApiError as error:
    print(error.status, error.request_id, error.body)
```

## Status guide

| Status | Usually means | Retry? | First fix |
| ---: | --- | --- | --- |
| `400` | invalid request or lifecycle input | No | fix the request body or operation order |
| `401` | credential missing/invalid | No | fix API key / target environment |
| `403` | authenticated but operation not allowed | No | fix scope, role, or authorization |
| `404` | requested resource not found in scope | No | verify ID and scope |
| `409` | state/lifecycle conflict | Usually no | read current state, then continue from the valid stage |
| `413` | payload too large | No | reduce request/archive size |
| `422` | request shape/validation failed | No | fix missing or invalid fields |
| `429` | request rate limited | Yes | respect `Retry-After` and back off |
| `5xx` | service-side failure | Yes for safe/idempotent requests | retry with the same logical idempotency key |

## `VIRA_API_<status>`

The JavaScript client raises `ViraApiError` for non-success responses. Its message uses the status, for example:

```text
VIRA_API_401
VIRA_API_409
VIRA_API_500
```

The response body may contain a more specific public error code. Prefer that code when troubleshooting.

## Safe retry rules

GET requests can be retried.

A mutation should be retried only when the logical operation has a stable idempotency key. Reusing the same key lets the server distinguish a retry from a new mutation.

Good:

```ts
const key = "pack:approve:marketing-starter:v1";
await vira.approvePack(packId); // SDK supplies a stable operation key for Pack lifecycle methods
```

For your own mutation calls, keep the same logical key across retries.

Bad:

```text
network timeout
→ generate a brand-new idempotency key
→ send the same mutation again
```

That can turn one intended action into two different actions.

## `requestId`

Keep `requestId` from failed requests. It is the safest identifier to include in a support report without copying the entire request/response payload.

## Verify the fix

After changing the request:

1. send the smallest valid request again;
2. confirm the status is successful;
3. confirm the returned resource/state is the one you expected;
4. only then resume the larger workflow.
