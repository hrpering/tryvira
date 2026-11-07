# Runtime and release

Use this guide when authoring/evaluation succeeded but runtime still cannot use the expected behavior.

## Runtime resolution fails after semantic selection

A semantic match identifies the task. Runtime still checks whether eligible behavior exists for the selected Behavior Point and scope.

### Check

- the Behavior Point key is correct;
- organization/project/environment match;
- the relevant Pack or behavior candidate was installed;
- evaluation completed;
- approval completed where required;
- release completed;
- the caller is permitted to run the operation.

### Verify

Resolve the Behavior Point directly with `resolveRuntime`. If that fails, keep troubleshooting runtime/release rather than changing semantic examples.

---

## `SDK_BEHAVIOR_POINT_REQUIRED`

**Meaning:** runtime resolve has no Behavior Point key.

**Fix:** provide a non-empty Behavior Point key.

**Verify:** read/resolve that same key in the same scope.

---

## Resource not found (`404`)

### Common causes

- wrong scope;
- stale ID/key;
- candidate exists in a different environment;
- the application kept an ID from an older version.

### Fix

List/read the current resource in the same scope, then retry with the returned/current ID.

### Verify

The read operation and runtime operation should target the same organization/project/environment.

---

## Release references an evaluation that cannot be found

### Error

`EVALUATION_NOT_FOUND`

### Fix

Use the evaluation ID produced by the evaluation run for this candidate/scope. Do not copy an ID from another environment or an earlier candidate.

### Verify

Read the evaluation successfully before retrying release.

---

## Pack release is rejected

If you are releasing through Packs, use the Pack lifecycle guide.

Common lifecycle errors:

```text
PACK_APPROVAL_REQUIRES_EVALUATION
PACK_RELEASE_REQUIRES_APPROVAL
PACK_RELEASED_IMMUTABLE
```

See [Packs](packs.md).

---

## Runtime works in one environment but not another

### Common causes

- only one environment has the released candidate;
- scope variables point to different project/environment combinations;
- MCP/SDK process still has old environment variables;
- application is resolving a key that was not released in the target environment.

### Fix

Treat each environment as its own scope. Check release state and configuration in the target environment instead of assuming another environment's state carries over.

### Verify

Run the same minimal direct `resolveRuntime` request in each environment and compare only the public result/status.

---

## Runtime returns behavior but the application appears unchanged

### Common causes

- the application resolved behavior but did not apply the returned public behavior instructions/output to the model/agent path;
- the application resolved a different Behavior Point than the task being executed;
- a cached application flow is still using an older result;
- the observed output was produced before the new release became active for that request.

### Fix

Trace the application integration in this order:

```text
user/task input
→ semantic selection (if used)
→ Behavior Point
→ runtime resolve
→ application/model call
→ observation/trace
```

### Verify

Use one deterministic test input and record the compact Vira trace:

```text
Task
Behavior Point
Behavior
Applied
Result
```

Confirm the expected Behavior Point and behavior are the ones applied to that request.

---

## `429` or transient `5xx` during runtime

### Fix

Use the SDK retry behavior and keep the same logical idempotency key for the same retryable operation.

### Verify

A retry should complete the same logical request, not create a second mutation.

See [API errors](api-errors.md).
