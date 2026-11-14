---
name: vira-observe
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Instrument a connected AI system with Vira Observe, including scoped events, batch ingestion, permitted feedback and evidence correlation. Does not approve Signals or change runtime behavior."
---

# Instrument AI behavior with Observe

Use this Skill for **real event instrumentation** independently of the Teach improvement loop. It supports *collect evidence first, govern later*. An accepted Observe event is **not** a verified answer, an approved Signal or a release.

## Activate this skill when
A developer wants to instrument AI requests, model/tool/action events, errors, feedback, cost or latency in an existing agent, or investigate whether observations were admitted. Use `vira-observe-teach` for a subsequent Teach analysis and `vira-traces` for execution-receipt diagnosis.

## Inputs and preconditions
Inspect the existing host adapter, scope, actual AI System and Connection IDs, privacy policy, consent, supported event types and trace/correlation IDs. Keep API keys server-side and retain stable idempotency keys. The event's content must be permitted, minimized and never a credential dump.

## Workflow
1. Locate the actual model/tool/action call sites; do not invent automatic instrumentation capabilities that the host does not emit.
2. Connect once using the installed JS/Python SDK and real scoped IDs. Check connectivity before observation.
3. Choose one of the documented event families: `conversation.input/output`, `model.request/response`, `retrieval.*`, `tool.*`, `action.*`, `execution.*`, `feedback.user/operator`, `business.outcome`, `error`, `latency`, `cost`.
4. For **both JavaScript and Python**, include `organizationId`, `projectId`, `environmentId`, `eventId`, `eventType`, `aiSystemId` and `connectionId` in the Observe event. For JS use `vira.observe({...scope,eventId,eventType,aiSystemId,connectionId,payload:{status:"completed"}},{idempotencyKey:eventId})` with a server-only client. Missing any required scope field fails with `SDK_OBSERVATION_SCOPE_REQUIRED`. Use server IDs, not placeholder values, when actually calling.
5. Preserve real response status/event digest/trace if supplied. HTTP 202 means **ingestion accepted**, not that discovery, Signal creation, Teach or post-model verification succeeded.
6. Test a retry with the same event ID, a forbidden credential field, missing connection, wrong scope and consent denied. Redact before writing logs. Readback if the configured surface supports it.
7. Route new typed context needs to `vira-signals`; recurring permitted corrections to `vira-observe-teach`; runtime PASS claims to `vira-runtime-verification`.

## Example and edge cases
Executable local files: `examples/observe-once.mjs`, `examples/observe_once.py`, with pure envelope builder `examples/event-contract.mjs` and negative tests `examples/observe-contract.test.mjs`. The source [JavaScript connect/observe example](https://github.com/hrpering/tryvira/blob/main/examples/javascript/connect-observe.mjs) uses actual SDK calls. Instrument a synthetic customer-support request with `model.response` metadata, then attach a separately approved user correction. **Never** mark a business outcome successful just because the model said it completed the task. `outcome()` is an observation helper and real attribution needs a supported evidence/linkage contract.

## Deliverable and failure handling
Return files and instrumentation call sites, the declared event schema, real received IDs/status (if run), consent/privacy choices and missing event families. On missing scope, unsupported event, auth failure or absent permission, stop; never send an event under an invented account or report ingest as verification.

## References
- [Observe guide](https://github.com/hrpering/tryvira/blob/main/docs/observe.md)
- [Signal governance](https://github.com/hrpering/tryvira/blob/main/docs/signals.md)
- [Teach lifecycle](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [JavaScript SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [Python SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
