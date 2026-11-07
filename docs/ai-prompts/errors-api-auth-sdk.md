# AI prompts: API, authentication, scope, and SDK errors

Use the matching prompt with sanitized evidence. Replace placeholders; never paste secret values.

## HTTP `400`, `422`, or client validation failure

```text
Debug this Vira request as a request-shape/client-validation problem first.

Error/status: <ERROR_CODE_OR_STATUS>
Operation: <METHOD/SDK_METHOD>
Sanitized request shape: <PASTE>

Check the public SDK/API contract for the operation. Identify the first missing, empty, invalid, or unsupported field. Do not change authentication, scope, lifecycle state, or server configuration unless the error evidence points there.

If the error is one of these SDK codes, apply its specific rule:
- SDK_BASE_URL_REQUIRED → Vira API base URL missing
- SDK_FAILURE_MODE_INVALID → Python failure_mode must use a supported value
- SDK_SYSTEM_ID_REQUIRED → use the system ID returned by connect/create flow
- SDK_CONNECTION_ID_REQUIRED → use the connection ID returned by connection flow
- SDK_OBSERVATION_FIELD_REQUIRED → required event/system/connection identity missing
- SDK_OBSERVATION_BATCH_INVALID → batch must be within the supported bound
- SDK_SEMANTIC_INPUT_REQUIRED → semantic input is empty
- SDK_BEHAVIOR_POINT_REQUIRED → runtime Behavior Point key is missing
- SDK_SIGNAL_PROPOSAL_ID_REQUIRED → Signal proposal ID missing
- SDK_SIGNAL_MAPPING_ID_REQUIRED → Signal mapping ID missing
- SDK_PACK_MANIFEST_OR_ARCHIVE_REQUIRED → Pack import has no source
- SDK_PACK_FILE_NAME_REQUIRED → archive import lacks filename
- SDK_PACK_ID_REQUIRED → Pack lifecycle call lacks Pack ID
- SDK_PROGRAM_ID_REQUIRED → Behavior Program ID missing
- SDK_STRATEGY_ID_REQUIRED → Strategy ID missing
- SDK_STRATEGY_DEFINITION_REQUIRED → Strategy definition missing
- SDK_EVALUATION_ID_REQUIRED → Evaluation ID missing

Return:
1. exact invalid/missing field
2. where the correct value should come from
3. smallest corrected request/code snippet
4. one verification call
5. expected success state
```

## HTTP `401`

```text
Diagnose this Vira 401 without asking for or printing credentials.

Evidence:
API origin: <SANITIZED_ORIGIN>
SDK/MCP/HTTP surface: <SURFACE>
Package version: <VERSION>
requestId: <REQUEST_ID>

Check only:
1. whether the running process receives the expected credential variable/header at all;
2. whether the credential is being sent to the intended Vira API origin;
3. whether an MCP host/child process failed to inherit environment variables;
4. whether the configuration was changed without restarting the process.

Never ask me to paste the credential value. Do not recommend disabling auth.

Return a safe way to prove presence/absence without displaying the secret, the smallest fix, restart step if needed, and a read-only verification request.
```

## HTTP `403` or authorization failure

```text
Diagnose this Vira authorization failure without weakening authorization.

Operation: <OPERATION>
HTTP/error: <STATUS_OR_CODE>
Scope labels: organization=<redacted>, project=<redacted>, environment=<redacted>
requestId: <REQUEST_ID>

Determine whether the failure is caused by:
- wrong organization/project/environment scope;
- missing role/permission for a state-changing action;
- MCP effectful authorization not configured;
- lifecycle state not eligible for the requested action.

Do not suggest bypass flags, alternate credentials from another environment, or direct data edits.

Return the first failed authorization assumption, the exact configuration/resource state to correct, and a read-only verification before retrying the mutation.
```

## HTTP `404`

```text
Treat this Vira 404 as either a missing resource or wrong scope until proven otherwise.

Resource type: <Pack | Strategy | Behavior Program | evaluation | connection | other>
Resource ID/key: <SANITIZED>
Scope: <SANITIZED>
requestId: <REQUEST_ID>

Check:
1. whether the ID/key came from a successful create/list response;
2. whether it belongs to the same organization/project/environment;
3. whether the application is pointing at the intended Vira environment;
4. whether a stale ID from another install/release is being reused.

Return the smallest read/list call that can prove resource existence, then the correction. Do not recreate the resource until absence is confirmed.
```

## HTTP `409`

```text
Diagnose this Vira 409 as a state/lifecycle conflict.

Operation: <OPERATION>
Resource: <TYPE/ID>
Error code/message: <PUBLIC_ERROR>
requestId: <REQUEST_ID>

Read the resource's current state first. Determine the required predecessor state for this operation. Identify whether the request is duplicated, out of order, or trying to mutate an immutable/released resource.

Do not retry blindly and do not force-overwrite state.

Return current state → required state → missing transition → exact next call → verification.
```

## HTTP `429` or retryable `5xx`

```text
Design a safe retry for this Vira request.

Status: <429_OR_5XX>
Operation: <OPERATION>
Is it GET/read-only?: <YES/NO>
Idempotency key present?: <YES/NO>
requestId: <REQUEST_ID>

Determine whether retry is safe. For a mutation, require a stable logical idempotency key before retrying. Preserve the same logical key across retries. Respect Retry-After when present and use bounded backoff.

Do not create a new idempotency key for each retry of the same mutation.

Return retryable/not-retryable, exact retry condition, bounded retry pseudocode/config, and how to verify no duplicate state was created.
```
