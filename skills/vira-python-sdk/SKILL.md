---
name: vira-python-sdk
license: "Proprietary; see LICENSE"
description: "Implement or debug a Vira integration using the published Python SDK."
---

# Python Sdk

Use the currently published `tryvira-sdk`; discover current registry version rather than copying a stale pin. Verify method names/signatures against the Python reference and installed package. Read secrets from environment variables; use context management when appropriate; retain scope and idempotency behavior. Do not assume MCP or JS-only functionality has a Python equivalent without checking. For ordinary AI requests use AUTO TaskRun; `serve_behavior_projection` is an advanced diagnostic SDK surface only.

Set `VIRA_API_URL` to the API deployment root supplied by the account/operator (without `/v1`, and not the Studio URL); pass it as the first `ViraClient` argument. Keep `VIRA_API_KEY` in a server-side secret manager. Ask for the endpoint when absent; never infer it.

## Activate this skill when
Implementing or debugging Vira through the published `tryvira-sdk` Python package. Do not use it for Node/MCP-only changes.

## Inputs and preconditions
Inspect Python version, active virtual environment, dependency manager/lockfile, installed distribution version, `VIRA_API_URL`, and application lifecycle (sync/async, ASGI, workers). Verify exact method signatures against installed package docs/types.

## Workflow
1. Check current PyPI metadata when freshness matters; report registry failure instead of guessing latest.
2. Add the dependency using the existing environment manager and preserve its lockfile.
3. Read credentials and scope from environment/secret storage; use the package's documented client/context lifecycle.
4. Implement the minimum supported call with explicit exception handling, idempotency for writes, and no cross-surface API assumptions.
5. Build and run the example against an authorized isolated non-production scope when requested. Report actual API status/IDs; do not replace a Vira call with a fabricated client response.

## Production-aligned implementation playbook

1. Use the installed `tryvira-sdk` client with trusted server-side API root/secret. Python `resolve_task_run({"input": text,"requestedMode":"AUTO","connectionId":connection_id})` is proposal-only; `start_task_run({"taskRunId": run_id,"requestId": request_id,"input": text,"requestedMode":"AUTO","connectionId":connection_id}, idempotency_key=key)` is admission.
2. Inspect `get_task_run`, `list_task_run_events` and stateVersion before continuing/retrying/cancelling. The `start_task_run_from_prompt` convenience helper does not forward `requestedMode`.
3. Python `observe` requires `organizationId`, `projectId`, `environmentId`, `eventId`, `eventType`, `aiSystemId`, `connectionId` in the event payload.
4. Pack lifecycle uses `import_pack(manifest,objects)`, `install_pack(pack_id,variables)`, `evaluate_pack(pack_id,{"evaluationId":real_id})`. No synthetic PASS scores.
5. `serve_behavior_projection` stays **advanced diagnostic API**. Do not generate an ON provider answer from it or report verified output without a receipt.
[Python runner](https://github.com/hrpering/tryvira/blob/main/examples/python/taskrun_modes.py).

## Deliverable and failure handling
Return runnable code for the project's Python version, dependency changes, verification output, and any unresolved API boundary. Stop if scope is unknown or the installed contract contradicts a remembered signature.

## References

- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [quickstart](https://github.com/hrpering/tryvira/blob/main/docs/quickstart.md)
- [published SDK method inventory and JS/Python surface differences](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
