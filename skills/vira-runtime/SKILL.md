---
name: vira-runtime
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Resolve or execute governed Vira behavior and interpret runtime receipts safely."
---

# Run governed behavior

Use the documented runtime operation and scoped boundary. Preserve authority digests, receipts, abstain/deny results, traces and idempotency. Semantic candidate selection is not authorization. Do not reconstruct runtime authority client-side or bypass released/eligible revision checks.

## Activate this skill when
Resolving/applying governed behavior at runtime or tracing a decision/receipt. Do not use semantic matching alone as permission to act.

## Inputs and preconditions
Identify the application request boundary, task/context, permitted scope, selected released behavior identity, operation type, and request/trace correlation approach. Ensure credentials remain server-side.

## Workflow
1. Start normal application execution with AUTO TaskRun; inspect direct runtime projection only as advanced diagnostics.
2. Call the documented runtime operation with explicit context and preserve the returned decision, authority digest, receipt, and request ID.
3. For runtime capability negotiation, model serving, behavior capsules, or projections, use that operation's own request/response contract; product capability discovery is not runtime capability attestation.
4. Interpret only fields and projection semantics defined by the installed public SDK/API contract for this operation. Do not assume one generic ALLOW/DENY response field; do not rebuild policy locally or skip post-model verification where required.
5. Emit minimized feedback linked to the real request/receipt only when its documented contract and consent rules permit it. The JS/Python `outcome` helper sets `eventType: "business.outcome"` and uses the common observation envelope, but the public contract does not define event-specific business-result fields. Do not call `outcome()` to attribute a business result until its event-specific payload schema is published; do not invent fields or claim attribution.
6. Verify actual allow/deny/abstain/error outcomes only when returned by the authorized non-production service; inspect the real trace correlation and never synthesize receipts.

## Implementation details

1. The **only normal user-facing ON route** is `AUTO TaskRun → semantic resolve → mode dispatch → real child executor → runtime enforcement → provider/chatbot → post-model verification → receipt`.
2. JS `startTaskRun` / Python `start_task_run` with `requestedMode:"AUTO"` starts it; `getTaskRun`/`get_task_run` reads persisted state. The server chooses SINGLE/STRATEGY/COMPOUND/HYBRID.
3. `resolveRuntime`, `executeRuntime` and `serveBehaviorProjection` remain low-level diagnostic SDK APIs, **never a parallel chatbot runtime**.
4. Correctly attested Signals, released identity, scope, host capability and effect authorization must be checked at the actual boundaries. Distinguish child COMPLETED, verifier `verificationStatus:passed` and *the final provider output bound to the same verified receipt/digest*.
5. Negatives: wrong scope, stale release, unavailable verifier, failed child, denied tool or altered provider answer must block or show pending; no silent OFF fallback.
[Runtime verification](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md).

## Deliverable and failure handling
Show the code boundary, result mapping, actual verification evidence or the explicit live-test blocker, and trace fields to inspect. On abstain/deny/error, follow the host's explicit safe failure policy; never convert it into allow or bypass Vira.

## References

- [runtime](https://github.com/hrpering/tryvira/blob/main/docs/runtime.md)
- [traces](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [api](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
