# Observe: make AI activity usable as evidence

**Observe tells you what actually happened at an integrated boundary.** It is not the model, not semantic routing, not a decision to publish behavior, and not a post-model PASS receipt.

Use it before and after you introduce governed behavior. Operators can compare the **same task** across runs, recover repeated failure patterns, correlate later outcomes, and decide whether evidence justifies a Teach proposal or a new evaluation.

## What can be observed?

The server's observation ingestion contract recognizes the following event families:

| Event family | Examples | Business/developer question |
| --- | --- | --- |
| Conversation | `conversation.input`, `conversation.output` | What did a user ask and what was sent back, where collection is permitted? |
| Model | `model.request`, `model.response` | Which model call boundary was used, and did it finish? |
| Execution | `execution.started`, `execution.completed`, `execution.failed` | Did the execution actually run or fail? |
| Retrieval | `retrieval.request`, `retrieval.response` | What supporting data retrieval was attempted? |
| Tool selection/use | `tool.selected`, `tool.started`, `tool.called`, `tool.completed`, `tool.result`, `tool.failed` | What tool was considered, invoked or failed? |
| External actions | `action.proposed`, `action.approved`, `action.executed`, `action.failed` | Was an external change merely suggested, approved or completed? |
| Feedback | `feedback.user`, `feedback.operator` | What did a person correct or flag? |
| Business outcomes | `business.outcome` | Was there an externally verified application outcome linked to the run? |
| Operational | `error`, `latency`, `cost` | What failed and what resource impact was recorded? |

This list describes **event types accepted by the backend**, not an assertion that every third-party framework automatically emits them. A connection must send the relevant events through its supported adapter.

## First observation using the published JavaScript SDK

The repository's existing runnable example is [connect + observe](../examples/javascript/connect-observe.mjs). This is the minimal shape after your connection has been authenticated and created:

```js
import { randomUUID } from "node:crypto";

// vira: authenticated @tryvira/sdk client
// aiSystemId and connectionId: real IDs returned by the connection flow
const eventId = randomUUID();

const result = await vira.observe({
  eventId,
  eventType: "model.response",
  aiSystemId,
  connectionId,
  // Only approved, non-sensitive, task-relevant metadata
  payload: { status: "completed" },
}, { idempotencyKey: eventId });
```

The connection and customer scope must already exist. Do not invent the AI System ID or connection ID. The server binds the authorized organization/project/environment and checks the connection. The standard observation handler accepts a single event or a batch (defaults: up to 100 events, payload size 256 KiB, configurable by the deployment).

**HTTP 202 means accepted for ingestion, not “Teach finished”, “Signal discovered” or “verified output”.** The server may enqueue a separate discovery job; later processing needs its own persisted evidence.

## Observation versus five neighboring features

| Capability | What it does | What it **does not** prove |
| --- | --- | --- |
| Observe | Admits a permitted event from the connected AI system | Model compliance or correctness |
| Feedback | Adds a user/operator correction or judgement | A policy was changed |
| Signal | Gives a governed typed meaning to selected mapped evidence | An arbitrary event attribute now has decision authority |
| Trace/receipt | Links a specific governed execution to its runtime decision and identity | Automatically that a user outcome was successful |
| Outcome | Attributes a business/application result to a known run where the real contract supports it | Causal incrementality or correctness without independent evidence |
| Teach | Turns selected evidence into a reviewable change proposal | Approval or release |

## The whole observe-to-improvement cycle

```text
Connected AI system and real adapter
    → permitted observation (eventId / scoped AI System / connection)
    → admitted event with source integrity and possible trace correlation
    → Signal discovery / mapping where appropriate
    → Teach evidence selection, analysis and proposal
    → human review / evaluation / release
    → AUTO TaskRun execution under eligible released behavior
    → actual runtime / verification receipts
    → new permitted observation + outcome attribution
    → next explicit improvement cycle, not self-modifying production
```

You can use Observe **without** enabling behavior enforcement first. This is an adoption strategy: instrument the existing agent, understand its real failure cases, and only then author a strong Pack.

## Integrity, privacy and correlation

- Generate stable event IDs and retain idempotency keys on retries. A changed replay payload can be rejected rather than silently rewritten.
- Use the actual AI System/connection scope, traceId/spanId where supported, and stable `conversationId` or `episodeId` if the host emits and needs them. These are host-generated identifiers, not things Vira expects users to guess.
- Record only consented, minimized data. Connection privacy policy controls conversation text and tool-argument collection. Server normalization strips sensitive credential-like keys; **do not rely on it as your only data-loss prevention**.
- Batch ingestion, retention, quotas, disabled discovery, late events and signal mapping can vary by installation. Read actual status instead of inventing a complete trace.
- “Observability”, “runtime verification” and “business outcome” are separate evidence layers. A logged user-facing answer may still fail verification.

## What the public example proves

The JavaScript code shows the accepted SDK integration shape and the public repository checks serialization/syntax. A real admitted event requires a provisioned customer scope, a connected system and a live backend. No demo in this repository is evidence that every agent or tool has been instrumented.

[Signals](signals.md) · [Runtime verification](runtime-verification.md) · [Teach AI](teach.md) · [Traces and receipts](traces.md) · [Developer guide](developer-guide.md)
