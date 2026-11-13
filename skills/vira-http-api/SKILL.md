---
name: vira-http-api
license: "Proprietary; see LICENSE"
description: "Call Vira public HTTP endpoints with correct authentication, scope, and request contracts."
---

# Http Api

Use the public HTTP API reference for exact paths/methods and the API deployment base URL supplied by the user. Send the documented bearer credential and explicit scope. Use stable idempotency keys for retryable mutations. Preserve receipts/request IDs. Never infer routes from SDK method names or bypass server authorization.

## Activate this skill when
The application needs direct Vira HTTP calls or SDK support is unavailable/undesired. Do not derive route names from SDK method names.

## Inputs and preconditions
Confirm API base URL from the user's environment, auth mechanism, organization/project/environment scope, intended method/path, request schema, and whether the call mutates state. Use only public API reference/OpenAPI evidence.

## Workflow
1. Find the exact method, path, body, response, and error contract in the public API reference.
2. Validate scope and construct a server-side client with bearer credentials loaded from secret storage.
3. Set stable idempotency keys on retryable mutations; use bounded timeouts and redact sensitive request/response fields.
4. Handle asynchronous 202 jobs by polling/reading persisted status before dependent work.
5. Validate a request against the actual documented API using an authorized isolated non-production scope; preserve the real request ID and returned status. If no scope is available, stop at code/schema review and label the live step unverified.

## Deliverable and failure handling
Provide exact HTTP example, required headers/body shape, expected states, and a safe verification. Stop if a route/schema is not documented or scope is denied; never probe other tenants or fake a receipt.

## References

- [api](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [capability-discovery](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md)
