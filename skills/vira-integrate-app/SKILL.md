---
name: vira-integrate-app
license: "Proprietary; see LICENSE"
description: "Integrate an application with Vira through its documented public interfaces."
---

# Integrate App

Choose an available Vira surface for an application integration. Read capability discovery and the capability matrix first; select an SDK, HTTP, or MCP path from its verified contract. Keep credentials in environment configuration. Do not claim an adapter exists unless the published package documents it.

## Activate this skill when
A user asks to add Vira to an existing application but has not chosen a surface or needs a coherent integration plan. Hand off detailed SDK/API/MCP work to its specific skill once selected.

## Inputs and preconditions
Identify framework, server-side AI invocation point, streaming/tool-call structure, environment/config convention, deployment boundary, and required Vira operation. Confirm permitted scope before any service mutation.

## Workflow
1. Read the capability matrix and trace one request from application entry to model call and response.
2. Choose the documented surface that supports the needed operation; use server-side SDK/HTTP for credentials and runtime authority.
3. Place Vira AUTO TaskRun at the actual application boundary, not direct runtime projection. Preserve deny/abstain/error states and keep the original model path explicit.
4. Add secret-safe configuration, stable idempotency for retryable writes, and request/receipt correlation without logging user content.
5. Build and run the integration against an authorized isolated non-production scope. Exercise the actual available/denied/error response states only when Vira returns them; do not fabricate service responses.

## Production-aligned implementation playbook

1. Find actual host request → provider/tool → response boundary. Connect an AI System via the selected SDK and retain server-issued IDs, scope, trace and idempotency.
2. For ON, use `startTaskRun({taskRunId,requestId,input,requestedMode:"AUTO",connectionId,budget},{idempotencyKey})`, then `getTaskRun`. Mode selection and host capability must be **server-controlled**, not an invented client grant.
3. Do not call the provider from the ON handler just because TaskRun is `COMPLETED`. Require the same released revision, actual provider output, post-model verification and receipt/output digest before labeling an answer verified.
4. Negatives: unresolved task, wrong tenant, missing release, stale capability, incomplete child or unavailable verifier must not silently fallback.
[Canonical TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) · [Current Next.js boundary](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/src/support-handler.mjs).

## Deliverable and failure handling
Show the integration boundary, files changed, configuration keys (names only), test evidence, and unsupported operations. Stop before implementation if required scope or authority is missing; do not describe a custom wrapper as an official adapter.

## References

- [capability-matrix](https://github.com/hrpering/tryvira/blob/main/references/capability-matrix.md)
- [capability-discovery](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [integration-patterns](https://github.com/hrpering/tryvira/blob/main/docs/integration-patterns.md)
