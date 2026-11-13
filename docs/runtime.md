# Runtime: the canonical AUTO TaskRun path

The supported **application-level integration** is [AUTO TaskRun](canonical-taskrun.md):

```text
AUTO TaskRun → semantic resolve → eligible mode dispatch
→ real child executor → runtime behavior enforcement
→ provider/chatbot → post-model verification → persisted receipt
```

The server owns semantic registry decisions, eligible modes, scope and execution authority. The host retains control of model/tool execution and cannot treat a TaskRun route as authority for arbitrary actions.

## Application integration

Start with `@tryvira/sdk` `startTaskRun({requestedMode:"AUTO", ...})`, or `tryvira-sdk` `start_task_run` with an equivalent request mapping. Read the persisted state with `getTaskRun` / `get_task_run` and events with `listTaskRunEvents` / `list_task_run_events`.

An `ADMITTED` or `RUNNING` result is not a finished answer. A `COMPLETED` status and child receipts prove only the recorded TaskRun/child operations; the application must also confirm **real provider output and a post-model verification receipt** before displaying a verified answer. The public TaskRun readback does not automatically expose that full final-answer contract today.

[Concrete SDK usage](canonical-taskrun.md) · [TaskRun modes](execution-modes.md) · [Application sample](../examples/frameworks/node-next/README.md)

## Diagnostic and low-level SDK APIs only

`resolveRuntime`, `executeRuntime`, `serveBehaviorProjection` and `POST /v1/runtime/behavior-projection` are advanced integration/diagnostic surfaces. They can explain a particular artifact's projection, decision or receipt, but should **not** be the normal chatbot, Pack demo or customer quickstart path.

Do not use a projection string as an alternate authority route and do not pass it directly to a provider while claiming the TaskRun's child execution and post-model checks ran.

## Failure and evidence

Never auto-resolve a missing task to an invented Behavior Point. Preserve the server-selected immutable identity, correct scope, child receipts and status; do not fabricate output or verification. `WAITING_USER`, `WAITING_HOST`, `WAITING_APPROVAL`, `PARTIAL`, `BLOCKED` and `FAILED` are meaningful states. Effectful actions require host authorization.

[Security](security-model.md) · [Verification status](example-verification.md) · [Troubleshooting](troubleshooting/README.md)
