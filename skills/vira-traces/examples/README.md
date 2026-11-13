# Example: inspect a partial multi-task run

**Prompt:** “My AUTO TaskRun selected COMPOUND but the summary child is waiting. Show what actually ran and whether the answer passed verification.”

**Inputs:** authorized TaskRun ID and scope, real JS/Python SDK connection.

**Read:** `getTaskRun` / `get_task_run` → `listTaskRunEvents` / `list_task_run_events` → real child statuses, authority digest and receipts if available. Record request and trace IDs in a redacted timeline.

**Expected:** Report the observed child `WAITING_HOST`/partial state and the exact next safe read; do **not** restart the whole operation merely to bypass the wait.

**Negative:** If the public contract does not expose final provider output verification, write “final answer not verified”, even when parent TaskRun says COMPLETED.

[Trace guide](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
