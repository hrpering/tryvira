# Canonical runtime: AUTO TaskRun, not a direct behavior projection

Vira's **normal application integration** begins with a request to **AUTO TaskRun**. The user does not select SINGLE, STRATEGY, COMPOUND or HYBRID manually; the server attempts to select the eligible mode from registered tasks, capabilities and scope.

> Architecture rule: `/v1/runtime/behavior-projection`, `serveBehaviorProjection` and direct `resolveRuntime` are **lower-level diagnostic or SDK interfaces**. They are not the recommended front door for customer chatbots or Pack examples. Do not use a returned rendered projection as proof of an authorized, completed, verified AI response.

## One canonical story

```text
User / app request
   ↓
AUTO TaskRun admission (server-owned scope, idempotency, budget)
   ↓
Semantic resolve (registered task and program identity; abstain/clarify if ambiguous)
   ↓
Mode dispatch (SINGLE / STRATEGY / COMPOUND / HYBRID)
   ↓
Real child executor (dependency, tool/effect authorization, retries/waits)
   ↓
Runtime behavior enforcement (eligible released artifact and scoped authority)
   ↓
Provider / chatbot boundary (only when the host has the required handoff)
   ↓
Post-model verification (actual response against released behavior)
   ↓
Persisted execution + verification receipts, trace, feedback
```

This is the **targeted end-to-end contract**. The deployed TaskRun worker implements server-owned task selection, mode-specific child execution, semantic/runtime resolution and runtime execution with durable TaskRun status/child receipts on configured deployments. The **public SDK currently exposes submission and readback**, but the public TaskRun readback does not by itself establish a provider-generated **chat answer** or a **post-model verification receipt**. Do not label the last two steps complete unless the customer's connected runtime exposes and returns their actual evidence.

## Observations and Signals are related but do not replace execution

**Observe** may record permitted conversation, model/tool/action, error and cost events before or after the run. **Signals** are separate typed, source-reviewed inputs whose values must be properly mapped and attested before being trusted in hard runtime decisions. **Teach** can later use these inputs to propose changes, but cannot silently release them.

The canonical request still requires actual child execution and **runtime verification**. A returned observation ID is not a verifier result; a completed child receipt is not automatically the final provider-output receipt. [Observe](observe.md) · [Signals](signals.md) · [Verification](runtime-verification.md).

## Responsibility boundaries

| Stage | Owner | Required evidence |
| --- | --- | --- |
| Request/admission | Public SDK client → Control API | Customer-scoped authenticated admission, taskRunId, requestId |
| Semantic selection | Server canonical registry | Selected registered Task/Program; ambiguity/abstain allowed |
| Mode selection | Server router | Selected mode, eligible task/strategy/child identities |
| Child execution | Vira TaskRun worker / approved host | Persisted child status, receipt IDs, authority/artifact digests |
| Runtime enforcement | Server-owned runtime authority | Released eligible identity, enforcement decision/trace |
| Model/provider | Host's configured model adapter | Real provider/model request and output identity, not a synthetic text fixture |
| Post-model verification | Authorized verification service / host adapter | Check results bound to exact output, behavior and taskRun |
| Final delivery | Application | Verified response + verification receipt or explicit failure/wait |

A **routing proposal** is not admission. **ADMITTED** is not COMPLETED. **COMPLETED** with child digests is not automatically a verified provider response. If the handoff needed to produce a verified answer is unavailable, the application must return **pending/unsupported** instead of secretly calling the model with an ungoverned prompt.

## Correct public SDK starting point

The current public npm SDK defines `startTaskRun`, `getTaskRun` and `listTaskRunEvents`. Calling the server's TaskRun admission normally lets the backend perform semantic and mode selection. No separate direct projection call is needed in the chatbot.

```js
import { randomUUID } from "node:crypto";
import { ViraClient } from "@tryvira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL,
  apiKey: process.env.VIRA_API_KEY,
  failureMode: "throw",
});

const suffix = randomUUID();
const taskRunId = "task-run-" + suffix;
const requestId = "request-" + suffix;
const admission = await vira.startTaskRun({
  taskRunId,
  requestId,
  input: "Investigate the incident and summarize verified findings.",
  requestedMode: "AUTO",
  connectionId: process.env.VIRA_CONNECTION_ID,
  budget: { maxChildren: 4, maxCalls: 8 },
}, { idempotencyKey: "task-run:start:" + requestId });

// An accepted run is asynchronous. Read actual persisted state.
const state = await vira.getTaskRun(taskRunId);
console.log(state?.body?.taskRun?.status);
// Do not assume the server returned a chatbot answer or a post-model verifier receipt.
```

`connectionId` must identify a real scoped connection if the host requires one; **caller-declared host capability arrays do not grant authority**. The server must use verified connection/capability attestations.

For a guarded runnable route tester see [JavaScript](../examples/javascript/taskrun-modes.mjs) and [Python](../examples/python/taskrun_modes.py). For the updated **AUTO TaskRun chat-admission** example, see [Next.js](../examples/frameworks/node-next/README.md).

## What the application should do with statuses

- `ROUTED` from route-only discovery: proposal, not action.
- `ADMITTED`, `PLANNED`, `RUNNING`: show pending / status and allow later readback.
- `WAITING_USER`, `WAITING_HOST`, `WAITING_APPROVAL`: show reason without inventing a completed answer. Continue only using persisted state version and correct authority.
- `FAILED`, `BLOCKED`, `CANCELLED`, `PARTIAL`: do not present as verified success. Follow documented retry/cancel conditions.
- `COMPLETED`: inspect actual child execution receipts and *separate verified provider answer evidence*. If that evidence is not available, display execution status but **not** an invented user-facing AI answer.

## Acceptance checklist for a full chatbot demo

1. Use a released Pack with registered semantic tasks and a real customer-scoped connected host.
2. Submit a user prompt through `startTaskRun({ requestedMode: "AUTO" })`.
3. Read selected task/mode and real child state; verify the server did not use caller-invented capabilities.
4. Confirm real child execution and runtime enforcement under the released artifact/digest.
5. Confirm provider request and response ran through the authorized model/agent boundary **after** enforcement.
6. Bind the post-model verifier result to the same taskRun, output digest, behavior revision and receipt.
7. Return a chatbot answer **only** with an explicit verified success (or display a clearly labeled unverified state when the product supports that mode). Negative paths must fail closed.
8. Run SINGLE, STRATEGY, COMPOUND and HYBRID using separate eligible fixtures, and verify AUTO chooses appropriately or abstains.

The public repository's automated tests check **SDK request serialization and application stop conditions**, not a live tenant/provider chain. The missing canonical final-answer/verification retrieval contract should be implemented and tested in the backend/SDK before claiming the last stages work everywhere. [Evidence and acceptance requirements](verified-answer-handoff.md).

## Lower-level diagnostic surfaces

`resolveRuntime`, `executeRuntime` and `behavior-projection` can be useful to diagnose why a released behavior was unavailable or to test a specific SDK boundary. Keep them in an explicitly named **Diagnostic / Advanced API** section, not in the normal quickstart, Pack release guide or chatbot path. An end-user application must not use them to assemble its own unauthorized alternative to TaskRun.

[Verified answer contract requirements](verified-answer-handoff.md) · [Execution modes](execution-modes.md) · [Pack authoring](pack-authoring-guide.md) · [Developer checklist](developer-checklist.md) · [Verification matrix](example-verification.md)
