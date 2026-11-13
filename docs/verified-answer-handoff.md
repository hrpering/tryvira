# Required contract: verified chatbot response from canonical TaskRun

**Status: proposed integration requirement, not a published API schema.** These are the minimum evidence requirements for the provider, backend and public SDK before a customer chatbot may display an ON answer as *verified by Vira*. No new endpoint or payload fields are claimed to exist.

For the actual verifier stages, supported check formats, extension requirements and failure policies, see [Runtime verification](runtime-verification.md). For evidence intake, see [Observe](observe.md) and [Signals](signals.md).

## Admission is not a verified answer

The public SDK can admit and inspect an AUTO TaskRun. The server can persist task/mode and child receipts. A `COMPLETED` TaskRun on its own does **not** demonstrate a real provider-generated final answer or a post-model verification of that exact answer against the released behavior.

The [Next.js sample](../examples/frameworks/node-next/README.md) deliberately returns HTTP 202 with real TaskRun state until the full handoff is exposed. It does not send a raw projection directly to the model.

## Evidence that must be bound together

| Evidence | Required properties |
| --- | --- |
| TaskRun identity | Same scoped organization, project, environment, TaskRun ID, request ID and plan digest |
| Behavior selection | Server-selected tasks, mode and eligible released Program/Strategy/artifact identity |
| Child execution | Real child statuses, authorization, dependency outcomes and persisted receipts |
| Provider invocation | Actual provider/model, request ID, response ID and source content or permitted output reference |
| Final answer | Digest of the exact user-visible output, not merely an intermediate child result |
| Verification | PASS/FAIL/NOT_RUN/UNAVAILABLE, verifier identity, behavior revision and exact checked output digest |
| Recovery | Bounded repair/rerank/check outcomes, not infinite retry or silent bypass |
| Persisted receipt | Linked TaskRun, artifact, provider output, verifier result and scope |
| Privacy | Authenticated, scope-checked response retrieval and appropriate content retention |

## Intended final-answer gating

```text
AUTO admitted → routed → child(s) executed → runtime enforcement
             → provider-generated response → post-model verifier
             → VERIFIED: matching output + evidence + receipt
             or FAILED / BLOCKED / WAITING: state only, not an invented answer
```

Only a verified output with matching source identity should be shown as a governed, verified ON answer. Any optional draft/unverified display must be visibly labeled and must never masquerade as a verified response.

## Acceptance cases before claiming end-to-end operation

1. **Success:** actual released Pack, AUTO TaskRun, provider output, post-model PASS and persisted matching receipt.
2. **No release:** reject before unauthorized model/tool activity.
3. **Wrong scope:** block another tenant's TaskRun, output and receipt.
4. **Verifier unavailable:** no fake `verified: true`.
5. **Changed output:** digest mismatch invalidates receipt.
6. **Strategy waiting:** unfinished child cannot yield final verified parent reply.
7. **Compound partial:** failed required child is visible, not silently ignored.
8. **Provider failure:** no generated answer when provider times out or refuses.
9. **Retry:** preserve idempotency and immutable authority/release identity.
10. **Client parity:** published JavaScript and Python contracts expose identical proven evidence where supported, or an explicit unsupported state.

## Ownership of the missing interface

The **backend** must persist and bind provider and verification evidence; the **SDK** must expose a documented versioned read surface; the **host application** must gate final answers and enforce tool permissions. No YAML or README can substitute for those implementations.

Only after the real interface exists and has been tested against a provisioned eligible tenant should the sample's `TASKRUN_ACCEPTED_PENDING_VERIFIED_CHAT_RESPONSE` become a verified ON answer.

[Canonical AUTO TaskRun](canonical-taskrun.md) · [Runtime](runtime.md) · [Verification matrix](example-verification.md)
