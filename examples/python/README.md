# Python examples

These examples use `tryvira-sdk==0.1.43` and `from vira import ViraClient`.

## Install and configure

```bash
python -m pip install tryvira-sdk==0.1.43
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

## Prompt for a coding agent

```text
Integrate tryvira-sdk==0.1.43 into this existing Python application.

Inspect Python version, dependency files, configuration conventions, and the smallest
integration module first. Implement a focused example using ViraClient, connect_once,
and observe. Read VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
VIRA_PROJECT_ID, and VIRA_ENVIRONMENT_ID from the environment.

Use stable idempotency keys, sanitize payloads, preserve the existing error handling,
and add a test for missing credentials and a successful mocked response. Do not invent
methods, log secrets, create a fake evaluation receipt, or release behavior. Run the
test and report files, commands, receipts, and unresolved API-contract questions.
```
