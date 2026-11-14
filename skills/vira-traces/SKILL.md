---
name: vira-traces
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Analyze Vira receipts, traces and lineage across TaskRuns, releases, provider execution and Observe/Teach outcomes, keeping authority evidence distinct from final-answer verification."
---

# Inspect traces and receipts

Use this Skill to reconstruct **what ran**, not to hallucinate what should have run. A trace is a high-level path; a receipt is persisted evidence of a specific boundary's real recorded outcome.

## Activate this skill when
The user needs to understand a Vira TaskRun, child status, runtime decision, Signal mapping, post-model check, provider output or outcome attribution by inspecting receipts and traces. Use `vira-debug` for broader auth/config faults.

## Inputs and preconditions
Collect only server-issued taskRunId/requestId/traceId, scope and redacted error/status, released artifact/authority digests and an authorized read interface. Never ask for secrets, customer prompt dumps or another tenant's receipt.

## Workflow
1. Start with the actual TaskRun ID. Read via JS `getTaskRun`/`listTaskRunEvents` or Python `get_task_run`/`list_task_run_events`. Confirm server scope and `stateVersion`.
2. Record selected Semantic Task(s), SINGLE/STRATEGY/COMPOUND/HYBRID mode and real children, noting `COMPLETED`, `PARTIAL`, `WAITING_*`, `BLOCKED`, `FAILED` distinctly.
3. Correlate release/Program/Strategy identity and artifact/authority digest. A route proposal or raw projection is not an execution receipt.
4. Separate pre-model/tool/action decisions from **post-model verification**, including executed/skipped/not-applicable modules and actual `failedChecks`.
5. If checking a verified chatbot answer, demand same real provider response/output digest and verifier/receipt. Without that link, label result “execution evidence only”.
6. Optionally relate permitted Observe event IDs, reviewed Signals and Teach/outcome references using their actual schema and consent/scope. Do not infer economic or customer outcomes from an unrelated trace.
7. Produce a timeline with every observed state, source type, evidence ID/digest and explicit unknowns; flag the **earliest broken evidence link**.

## Example and edge cases
A COMPOUND support request includes issue extraction and summary. One child is `COMPLETED`, the other `WAITING_HOST`. A correct inspection reports the second child incomplete, **not** overall verified success. A later provider reply needs its own post-model PASS and output-bound receipt.

## Deliverable and failure handling
Return a redacted run story and precise next diagnostic read. Stop on scope mismatch, missing ID or unsupported receipt readback; do not synthesize authority digests, child receipts or model output.

## References
- [Receipts and traces](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
- [Runtime verification](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md)
- [TaskRun mode guide](https://github.com/hrpering/tryvira/blob/main/docs/execution-modes.md)
- [Observe guide](https://github.com/hrpering/tryvira/blob/main/docs/observe.md)
