# API errors

This page covers failures returned through the HTTP API and surfaced by the SDKs.

## JavaScript / TypeScript

```ts
import { ViraApiError } from "@tryvira/sdk";

try {
  await vira.resolveRuntime({
    behaviorPoint: "marketing.launch_plan",
    executionBoundary: { organizationId, projectId, environmentId },
    idempotencyKey: crypto.randomUUID(),
  });
} catch (error) {
  if (error instanceof ViraApiError) {
    console.error({ status: error.status, requestId: error.requestId, body: error.body });
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
| `400` | invalid request/lifecycle input | No | fix request/operation order |
| `401` | credential missing/invalid | No | fix credential/environment |
| `403` | authenticated but not allowed | No | fix scope/role/authorization |
| `404` | resource not found in scope | No | verify ID and scope |
| `409` | lifecycle/state conflict | Usually no | read current state |
| `413` | payload too large | No | reduce payload/archive |
| `422` | validation failed | No | fix fields |
| `429` | rate limit | Yes | honor retry/backoff |
| `5xx` | service failure | Yes for safe/idempotent requests | retry same logical operation |

Keep `requestId` and the public error code. Do not paste secrets or full production payloads into public issues.
