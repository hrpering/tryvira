# Production-aligned public Skill contract baseline

This guide records **public, customer-safe interface facts** checked against the current JS/Python client and runtime contracts. It is an instruction baseline, not publication of private server source or a claim that every tenant can use every operation.

## Canonical request

```text
AUTO TaskRun → semantic resolve → server-eligible mode dispatch
→ real SINGLE / STRATEGY / COMPOUND / HYBRID child executor
→ released runtime behavior enforcement → provider / chatbot / tool
→ actual post-model verification → matched persisted receipt
```

AUTO is the requested routing mode; the four named child execution modes are separate. Normal customer applications use the SDK TaskRun path. `resolveRuntime`, `executeRuntime` and `serveBehaviorProjection` are **advanced diagnostic SDK APIs**, never an ordinary alternative chatbot execution path.

## JavaScript SDK, proven method names

- `resolveTaskRun({input,requestedMode:"AUTO",connectionId})`: route/proposal only.
- `startTaskRun({taskRunId,requestId,input,requestedMode:"AUTO",connectionId,budget},{idempotencyKey})`: explicit admission, subject to real customer scope/authority.
- `getTaskRun(taskRunId)`, `listTaskRunEvents(taskRunId)`: persisted state/events.
- `continueTaskRun(taskRunId,expectedVersion,{cursor?,idempotencyKey?})`, `retryTaskRun(taskRunId,expectedVersion,opts)`, `cancelTaskRun(...)`: versioned transitions.
- `startTaskRunFromPrompt`: convenience IDs, **does not forward requestedMode**. Use explicit start for named mode.
- `observe(event,{idempotencyKey:event.eventId})`: event submission from a real AI System/Connection; 202 is not a verified provider response.
- `importPack({manifest,objects})` or documented archive, `installPack(packId,variablesMap)`, `evaluatePack(packId,{evaluationId:realId})`: separate import/materialization/evaluation. Approval/release follow their own authority.
- `createTeachAnalysis(evidenceIds,options)`, `getTeachAnalysis(analysisId)`: submitted evidence must be admitted/consented, analysis is asynchronous.

## Python SDK, proven corresponding methods

- `resolve_task_run({"input": text, "requestedMode":"AUTO", "connectionId":connection_id})`.
- `start_task_run({"taskRunId":run_id,"requestId":request_id,"input":text,"requestedMode":"AUTO","connectionId":connection_id},idempotency_key=key)`.
- `get_task_run(run_id)`, `list_task_run_events(run_id)`, `continue_task_run(run_id,expected_version,...)`, `retry_task_run`, `cancel_task_run`.
- `start_task_run_from_prompt` also **does not forward requestedMode**.
- `observe` requires organizationId, projectId, environmentId, eventId, eventType, aiSystemId and connectionId in the event. Preserve idempotency.
- `import_pack(manifest,objects,...)`, `install_pack(pack_id,variables)`, `evaluate_pack(pack_id,{"evaluationId":real_id})`.
- `create_teach_analysis(evidence_ids,...)` and `get_teach_analysis(analysis_id)`.

These method names were checked in the owner-authorized production clients. **The installed published package and live tenant capabilities remain the final authority** for external users; they can evolve independently.

## Signal and verification specifics

Signal discovery, definition approval, producer mapping and runtime attestation are separate. Supported producer families include observation attributes, tool results, application state and runtime state. Declaring a Signal key in a Pack does **not** activate a trusted producer.

The deterministic verifier recognizes narrow formats such as `verifier:output.non_empty`, `required: text`, `forbidden: text` and constrained `json: {"required":["key"]}`. `policy:`, `rubric:`, `judge:` require a registered extension, not merely a string in a Pack. Unavailable verifier must not pass. Bound repair/rerank attempts and read back actual receipt/status.

A TaskRun COMPLETED status is **not** proof that the final provider response passed post-model verification. The public Next.js ON example intentionally returns pending/stored TaskRun state, not a fabricated ON model answer.

## Surface and safety checks

- MCP: initialize and inspect `tools/list`; the published MCP catalog does not currently expose TaskRun or Pack lifecycle equivalents.
- HTTP: only documented operation paths; no invented final-answer endpoint.
- Studio/Admin: route existence does not establish authenticated availability.
- Effectful actions: host-side tool permissions, server-attested capabilities, exact scope, release identity and explicit user/operator authority remain required.
- Evidence/feedback/outcomes: consent, minimal data, stable real IDs, trace correlation and separate Teach/release decisions.

## Concrete customer-safe source examples

[JS TaskRun](https://github.com/hrpering/tryvira/blob/main/examples/javascript/taskrun-modes.mjs) · [Python TaskRun](../../examples/python/taskrun_modes.py) · [Pack Academy](../pack-authoring-guide.md) · [Signals](../signals.md) · [Observe](../observe.md) · [Runtime Verification](../runtime-verification.md) · [Verified answer limitations](../verified-answer-handoff.md).

**Testing levels:** static Skill validation / SDK serialization, focused mock-transport unit checks, actual live tenant execution and final provider-verifier answer binding are separate proof levels. Never claim the last from the first.
