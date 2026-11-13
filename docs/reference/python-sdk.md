# Python SDK

**Current package:** [`tryvira-sdk`](https://pypi.org/project/tryvira-sdk/) `0.1.44`

**Runtime:** Python 3.10+

**Install:** `python -m pip install tryvira-sdk==0.1.44`

The published PyPI package is the authoritative source for current method signatures and request/response types. This repository's public integration guidance intentionally avoids reproducing low-level operation schemas. Read the published package documentation for the version installed by your application.

## Configure a customer-owned Vira deployment

Set `VIRA_API_URL` to the API deployment URL supplied for the customer's Vira account. It is not the application's backend URL or the Studio URL. Keep `VIRA_API_KEY` and scope identifiers in server-side environment or secret storage. Never commit real credentials, expose keys to browser code, or print secrets in logs.

Use an isolated development scope when the customer's account provides one. Production changes require the customer's authorization and controls.

## Integration approach

1. Confirm the installed PyPI version and read its matching public documentation.
2. Configure the customer's endpoint and scoped credentials using a server-side secret mechanism.
3. Check that the operation exists in the installed package before using it.
4. Keep evidence collection, candidate review, evaluation, approval, release, and runtime use as separate governed steps.
5. Preserve returned identities and read persisted state before continuing asynchronous work.
6. Handle failures without logging credentials or private user content.

Python and JavaScript package capabilities may differ. Do not infer Python support from a JavaScript method or from MCP/HTTP naming. Consult the installed package and [capability map](../capability-map.md).

## Canonical application integration

Use [AUTO TaskRun](../canonical-taskrun.md) for the normal application path. `serve_behavior_projection` is a low-level/diagnostic API, not a canonical chatbot execution endpoint. A returned projection or even a completed child receipt does not establish a provider-generated and post-model-verified answer.

## TaskRun in the published Python client

The published Python client has `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events`, `continue_task_run`, `retry_task_run` and `cancel_task_run`. Request mappings can select `SINGLE`, `STRATEGY`, `COMPOUND`, `HYBRID` or ask for `AUTO` routing. The prompt-only convenience helper `start_task_run_from_prompt` does not forward all mode-selection options on this client line; use `start_task_run` when requesting an explicit mode.

For a real but route-only-by-default script, see [Python TaskRun modes](../../examples/python/taskrun_modes.py). The repository's [offline method-surface check](../../scripts/check-published-python-sdk.py) verifies the installed published Python package, not tenant eligibility or live runtime success.

Do not invent a `stateVersion` for continuation. A routed task is not proof of an authorized or completed run. [Execution modes](../execution-modes.md) · [Developer checklist](../developer-checklist.md)

## Related resources

- [Published package versions](../published-packages.md)
- [JavaScript SDK](javascript-sdk.md)
- [MCP catalog](mcp-tools.md)
- [HTTP integration guidance](api.md)
- [Customer-runnable Python framework examples](../../examples/frameworks/README.md)
- [Mode routing example](../../examples/python/taskrun_modes.py)
- [Offline published Python interface verification](../../scripts/check-published-python-sdk.py)
- [Agent Skills](../../skills/README.md)
