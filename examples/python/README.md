# Python examples

These examples use `tryvira-sdk==0.1.44` and `from vira import ViraClient`.

## Install and configure

```bash
python -m pip install tryvira-sdk==0.1.44
export VIRA_API_URL="https://api.example.invalid"
export VIRA_API_KEY="<server-side-key>"
export VIRA_ORGANIZATION_ID="<organization-id>"
export VIRA_PROJECT_ID="<project-id>"
export VIRA_ENVIRONMENT_ID="<environment-id>"
python quality_decision.py
```

`quality_decision.py` demonstrates bounded response quality selection only. It does
not connect an AI system, record observations, or create release evidence. Run
`connect_observe.py` separately to exercise the connection and sanitized observation
example.

## Try TaskRun mode routing

The published Python client exposes `resolve_task_run` and `start_task_run`. A route proposal is separate from an authorized execution. The new [mode tester](taskrun_modes.py) is **route-only by default**:

```bash
python taskrun_modes.py AUTO
python taskrun_modes.py SINGLE
python taskrun_modes.py STRATEGY
python taskrun_modes.py COMPOUND
python taskrun_modes.py HYBRID
```

Configure `VIRA_API_URL` and `VIRA_API_KEY` for your own authorized tenant. An eligible registered Task and host capability are required; denied or unsupported routes are valid results. Starting a real task requires separate explicit environment assertions for authorization and non-production scope. This example never claims a fabricated completed run.

See [execution modes](../../docs/execution-modes.md) and the [published Python SDK method check](../../scripts/check-published-python-sdk.py).

## Prompt for a coding agent

```text
Integrate tryvira-sdk==0.1.44 into this existing Python application.

Inspect Python version, dependency files, configuration conventions, and the smallest
integration module first. Implement a focused example using ViraClient, connect_once,
and observe. Read VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
VIRA_PROJECT_ID, and VIRA_ENVIRONMENT_ID from the environment.

Use stable idempotency keys, sanitize payloads, preserve the existing error handling,
and verify it with an authorized non-production API call. Do not invent
methods, log secrets, create a fake evaluation receipt, or release behavior. Run the
test and report files, commands, receipts, and unresolved API-contract questions.
```
