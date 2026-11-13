# AI setup prompt — Python SDK

```text
You are integrating the published Vira Python package tryvira-sdk (import: from vira import ViraClient).
Inspect Python version (>=3.10), dependency manager, env/config conventions, best integration module, and any existing Vira integration.
Use current public docs; do not invent methods.
Implement: add tryvira-sdk, create ViraClient, use connect_once, retain system/connection IDs, verify connection health/test, add one sanitized observation.
Never expose credentials.
Return files inspected, dependency change, minimal patch, required env/config, verification command, expected result.
```

## Copy/paste setup prompt

```text
Set up Vira in this existing Python application.

Goal: connect the application and record one sanitized observation. Do not create,
approve, or release behavior without an explicit follow-up request.

Requirements:
1. Inspect Python version (3.10+), pyproject.toml/requirements files, and the
   existing configuration pattern.
2. Install tryvira-sdk==0.1.44 using the project's package manager.
3. Read VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
   VIRA_PROJECT_ID, and VIRA_ENVIRONMENT_ID from the environment.
4. Use ViraClient, connect_once, and observe with stable idempotency keys.
5. Keep credentials out of logs, source files, traces, and examples.
6. Do not invent methods or treat semantic selection as runtime authorization.
7. Preserve the application's existing error handling and add a focused integration test.

Return the files inspected, exact patch, required environment, run command, expected
responses, and any unsupported step. Do not claim success without running the test.
```
