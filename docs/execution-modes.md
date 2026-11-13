# TaskRun execution modes

Vira supports four execution modes: **SINGLE, STRATEGY, COMPOUND and HYBRID**. **AUTO** is a routing request that asks Vira to select an eligible mode, not a fifth way to execute.

> The hosted product is under development and access is not generally open. An SDK method existing does not prove a tenant has eligible released tasks or that the end-to-end execution succeeds.

| Mode | What runs | Example | Typical prerequisite |
| --- | --- | --- | --- |
| **SINGLE** | One registered task using eligible behavior | Answer a support request | Resolved task and released behavior |
| **STRATEGY** | One task with bounded multi-step execution | Investigate an incident and verify a report | Eligible released Strategy, capable host |
| **COMPOUND** | Several separately governed tasks | Compare sales, inventory and delivery constraints | Multiple registered, compound-eligible tasks and host capability |
| **HYBRID** | Several tasks with a mix of SINGLE and STRATEGY children | Classify a case, perform a multi-step investigation, draft a response | Eligible child plan and Strategy capability |
| **AUTO** | Requests a mode recommendation | “Prepare today's operational decision brief” | Matching task definitions; uncertainty may lead to clarification |

## How AUTO works

- You **do not** have to force a mode on every message. Request `AUTO` or omit `requestedMode` when the supported integration can determine an appropriate eligible route.
- AUTO does not create missing tasks, grant permissions, manufacture release identities or guarantee COMPOUND.
- Multiple plausible intents can require clarification. An unmatched task may abstain. A missing host capability may lead to `UNSUPPORTED_HOST`. Invalid scope or release eligibility can deny execution.
- The server's routing response is a **proposal**, not evidence that execution was admitted or completed.

## Example progression

1. SINGLE: “Summarize the three main support complaints.”
2. STRATEGY: “Investigate late deliveries, check evidence, then prepare a verified incident report.”
3. COMPOUND: “Summarize support complaints, check inventory and draft an operations plan.”
4. HYBRID: “Classify the incident, run the investigation strategy and draft a response for approval.”
5. AUTO: “Prepare whatever is needed for our operations lead to decide what to do.”

These are test prompts, not guaranteed routing outcomes. Actual selection depends on the **registered tasks**, eligible releases and capabilities. See [use cases](use-cases.md) for simpler household examples and more difficult business workflows.

## Documented SDK methods

| Action | JavaScript package | Python package |
| --- | --- | --- |
| Propose route | `resolveTaskRun` | `resolve_task_run` |
| Request admission | `startTaskRun` | `start_task_run` |
| Read persisted run | `getTaskRun` | `get_task_run` |
| Read events | `listTaskRunEvents` | `list_task_run_events` |
| Continue | `continueTaskRun` | `continue_task_run` |
| Retry | `retryTaskRun` | `retry_task_run` |
| Cancel | `cancelTaskRun` | `cancel_task_run` |

The current JavaScript client accepts `requestedMode` values `"SINGLE"`, `"STRATEGY"`, `"COMPOUND"`, `"HYBRID"` or `"AUTO"` on `resolveTaskRun` and `startTaskRun`. In Python the corresponding methods accept request mappings. **For explicitly selected modes, prefer these methods to the prompt convenience helpers**: `startTaskRunFromPrompt` and `start_task_run_from_prompt` do not forward the same mode-selection options on this client line.

The exact request shapes and method availability are determined by the installed release. Do not infer raw HTTP or MCP parity. [JavaScript SDK](reference/javascript-sdk.md) · [Python SDK](reference/python-sdk.md) · [MCP limitations](reference/mcp-tools.md)

### Route before admitting a task

```js
import { ViraClient } from "@tryvira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL,
  apiKey: process.env.VIRA_API_KEY,
});

const input = "Summarize the incident and propose next steps";
const result = await vira.resolveTaskRun({ input, requestedMode: "AUTO" });
const decision = result?.body?.route;

if (decision?.route === "ROUTED") {
  console.log("Proposed mode:", decision.mode);
  // No execution has been authorized or completed by this read.
} else {
  console.log("Route not selected:", decision?.route ?? "UNKNOWN");
}
```

For a runnable, **route-only by default** command with explicit admission gates, use [JavaScript TaskRun modes](../examples/javascript/taskrun-modes.mjs). Its request shapes are tested against the pinned published npm package by [offline SDK transport tests](../examples/frameworks/node-next/test/taskrun-sdk.test.mjs).

### Lifecycle and negative paths

```text
registered task(s) → route proposal → authorization / admission
                   → eligible released behavior or Strategy
                   → execution (may wait, fail or partially complete)
                   → persisted status, child receipts and events
```

The host owns tool execution and its authorization. Child tasks must not inherit stronger permissions from another child. An unresolved child must not be concealed by a “successful” parent. For continuation, retry and cancellation, first read the **persisted stateVersion** and pass it as `expectedVersion`; do not invent it.

`STRATEGY` is **one task with multiple steps**. `COMPOUND` is **multiple distinct governed tasks**. `HYBRID` combines SINGLE and STRATEGY children. `AUTO` is a selection request. None substitutes for the separate Pack evaluation, approval, release and runtime authority rules.

The currently published MCP catalog has no TaskRun tools. Availability in Studio and raw HTTP must be verified from the customer's public contracts. See [capability map](capability-map.md) and [developer checklist](developer-checklist.md).
