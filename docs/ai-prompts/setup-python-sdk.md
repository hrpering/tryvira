# Python SDK setup prompts

Use these prompts to install `vira-sdk` into an existing Python application.

## Fresh integration into an existing project

```text
Integrate Vira into this existing Python project using the public package `vira-sdk` and import `ViraClient` from `vira`.

Inspect the repository first. Preserve the existing dependency manager, virtual environment approach, application framework, settings layer, logging, tests, and module layout.

Requirements:
- Confirm the project satisfies Python >= 3.10.
- Install `vira-sdk` through the dependency manager already used by the project.
- Read VIRA_API_URL and VIRA_API_KEY from the existing configuration/environment system.
- Never hard-code or print credentials.
- Keep organization/project/environment scope in the existing settings layer.
- Prefer a reusable/context-managed client instead of constructing one for every operation.
- Add only the smallest useful example for this application: connection/observation and semantic/runtime resolution where relevant.
- Preserve idempotency for retryable mutations.
- Do not bypass authentication, scope, evaluation, approval, or release gates.
- Do not invent Python methods; verify them from the installed package/public docs.

Before editing, report:
1. Python version
2. dependency manager
3. settings/environment pattern
4. application entry point
5. best place for the Vira client wrapper

Then make the minimum patch.

Return:
A. files changed
B. install command
C. required environment variable names only
D. verification command
E. expected successful result
F. rollback instructions
```

## Existing Python integration is broken

```text
Audit this existing `vira-sdk` integration without rewriting the application.

Check:
1. installed `vira-sdk` version and Python version
2. import is `from vira import ViraClient`
3. dependency/virtual environment actually used by the running process
4. ViraClient construction and API URL
5. environment variable names and visibility without printing values
6. organization/project/environment scope
7. the first failing Vira method
8. ViraApiError status/body/request_id when available
9. mutation retry/idempotency behavior

Classify the failure as installation, import/environment, client validation, authentication, scope, lifecycle/state, or transient API/network.

Make one evidence-backed change at a time. Do not recreate the virtual environment, remove unrelated packages, disable TLS/auth, or change application architecture unless the evidence requires it.

Return observed facts, ranked cause, smallest fix, exact patch/command, verification step, expected output, and next branch if verification fails.
```

## Minimal verification prompt

```text
Verify this Vira Python SDK installation with no destructive changes.

Check dependency import, client construction, API reachability, authentication/scope, and one read-only Vira operation. Do not print secrets. If a request fails, capture status, public error code/message, and request_id. Return a PASS/FAIL table and only the next necessary fix.
```
