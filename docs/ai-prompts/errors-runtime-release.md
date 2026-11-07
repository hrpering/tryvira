# AI prompts: Runtime and release errors

Use these prompts when semantic routing works but runtime/release behavior does not.

## Runtime resolve returns `404`

```text
Debug this Vira runtime 404 without recreating behavior immediately.

Behavior Point: <SANITIZED_KEY>
Scope: <SANITIZED>
requestId: <REQUEST_ID>

Check:
1. the Behavior Point key is correct;
2. it exists in the same organization/project/environment;
3. the application points at the intended Vira environment;
4. related Pack/program/Strategy was installed/released in this scope;
5. the application is not using a stale key from another version.

Return the smallest read/list/resolve check proving existence, the first mismatch, minimal fix, and runtime verification.
```

## Runtime resolve returns `403`

```text
Diagnose this Vira runtime authorization failure without weakening authorization.

Operation: resolveRuntime / runtime operation
Behavior Point: <SANITIZED>
Scope: <SANITIZED>
requestId: <REQUEST_ID>

Check credential/environment scope, role/authorization, and whether the requested behavior is eligible/released for this runtime path.

Do not suggest bypassing scope, release, or policy checks.

Return failed prerequisite, smallest legitimate correction, read-only/state verification, then one retry.
```

## Semantic task selected but runtime has no behavior

```text
Debug this Vira request by walking the public lifecycle, not by changing semantic routing first.

Semantic task: <TASK>
Expected Behavior Point: <BP>
Runtime result: <RESULT>

Return PASS/FAIL for:
1. semantic selection is correct
2. expected Behavior Point mapping/key is correct
3. Behavior Point exists in same scope
4. related Pack/Program/Strategy is installed
5. evaluation completed where required
6. approval completed where required
7. release completed
8. runtime resolve returns behavior
9. application actually applies the runtime result before/around the model/agent call
10. observation/trace reflects the new result

Stop at the first FAIL. Give one fix and one verification only.
```

## Runtime result exists but application behavior does not change

```text
Trace how this application uses the successful Vira runtime result.

Do not change Vira configuration until you prove the runtime result is wrong.

Inspect:
1. where resolveRuntime is called;
2. whether its returned behavior/config is actually passed into the model/agent/tool flow;
3. whether a later prompt/config layer overwrites it;
4. whether async ordering causes the model call to happen before Vira resolve finishes;
5. whether cached application state ignores a newer result;
6. whether the post-call observation records the intended behavior/result.

Return a data-flow diagram from request → Vira resolve → model/agent call → result → observation, mark the first disconnect, propose the smallest patch, and add a regression test.
```

## Release fails because evaluation is missing

```text
Debug this Vira release request as a missing prerequisite problem.

Release target: <SANITIZED_RESOURCE>
Evaluation ID: <SANITIZED_OR_MISSING>
Scope: <SANITIZED>
Error: <PUBLIC_ERROR>

Confirm the referenced evaluation exists in the same scope and represents the candidate being released. Do not start a new evaluation unless the existing ID is absent/invalid. Do not fabricate a passing result.

Return current candidate state, evaluation existence/result, missing transition, exact next action, and verification before retrying release.
```

## Release after Pack lifecycle errors

```text
Audit this release starting from the Pack lifecycle.

Return PASS/FAIL for:
import → install → evaluate → approve → release.

If a Pack is already released, preserve it unchanged and create/use the next candidate/version for modifications. Do not mutate the released record or skip approval.

Return the first failed state transition and one exact corrective action.
```

## `429` / retryable `5xx` during runtime

```text
Design a safe retry for this Vira runtime request.

Status: <STATUS>
Operation: <OPERATION>
Idempotency key: <present/absent>
Retry-After: <if present>

Decide whether the operation is safe to retry. For state-changing calls, require the same stable logical idempotency key across retries. Use bounded backoff and preserve requestId/error context.

Return retry decision, retry policy, exact maximum attempts/backoff behavior, and a verification that no duplicate state/execution was created.
```

## End-to-end runtime acceptance prompt

```text
Perform a minimal acceptance test of this Vira integration without changing unrelated configuration.

Use one known test request and verify:
1. expected semantic result
2. expected Behavior Point
3. runtime resolve success
4. expected behavior/strategy is applied by the application
5. model/agent result reflects the intended requirement
6. one observation/trace is recorded

Return a compact table with Stage, Expected, Actual, PASS/FAIL, Evidence. If a stage fails, stop and diagnose only that stage.
```
