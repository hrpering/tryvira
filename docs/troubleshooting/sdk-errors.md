# SDK errors

These errors are raised by the public JavaScript/Python client before or around an API request. Fix them in application code first; retrying the same invalid input will not help.

## Client construction

### `SDK_BASE_URL_REQUIRED`

**Meaning:** no Vira API base URL was provided.

**Fix:** configure `VIRA_API_URL` and pass it to the client.

**Verify:** construct the client and run a read-only request.

### `SDK_FAILURE_MODE_INVALID` (Python)

**Meaning:** `failure_mode` is not supported.

**Fix:** use `"throw"` or `"open"`.

**Verify:** recreate the client. Enforcing runtime calls still fail closed.

---

## Connections and observations

### `SDK_SYSTEM_ID_REQUIRED`

**Meaning:** a connection/inventory operation is missing the AI system ID.

**Fix:** use the ID returned by system creation / `connectOnce`.

**Verify:** call `inventory(systemId)`.

### `SDK_CONNECTION_ID_REQUIRED`

**Meaning:** connection health/test is missing a connection ID.

**Fix:** use the connection ID returned by `connectOnce` or adapter creation.

**Verify:** call `connectionHealth(connectionId)` before `testConnection`.

### `SDK_OBSERVATION_FIELD_REQUIRED`

**Meaning:** the observation is missing required identity such as event/system/connection information.

**Fix:** provide the required event identity fields.

```ts
await vira.observe({
  eventId: crypto.randomUUID(),
  eventType: "model.response",
  aiSystemId,
  connectionId,
  payload: { status: "completed" },
});
```

**Verify:** confirm the observation request succeeds once, then reuse the same event ID only when retrying the same logical event.

### `SDK_OBSERVATION_BATCH_INVALID`

**Meaning:** the batch is empty or larger than the supported bound.

**Fix:** send 1–100 events per batch.

**Verify:** start with one event, then increase the batch size.

---

## Semantic and runtime

### `SDK_SEMANTIC_INPUT_REQUIRED`

**Meaning:** semantic resolve received empty input.

**Fix:** send a non-empty user/task input string.

**Verify:** run `resolveSemantic` with a known task example.

### `SDK_BEHAVIOR_POINT_REQUIRED`

**Meaning:** runtime resolution does not know which Behavior Point to resolve.

**Fix:** provide a stable Behavior Point key returned/configured by your Vira setup.

```ts
await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: { organizationId, projectId, environmentId },
});
```

**Verify:** read/resolve the same Behavior Point in the same scope.

---

## Signals

### `SDK_SIGNAL_PROPOSAL_ID_REQUIRED`

**Meaning:** review/materialization was called without a Signal discovery proposal ID.

**Fix:** use the ID returned by `createSignalDiscoveryProposal`.

**Verify:** review the same proposal once, then materialize only after approval.

### `SDK_SIGNAL_MAPPING_ID_REQUIRED`

**Meaning:** a Signal mapping read/review is missing its mapping ID.

**Fix:** use the ID returned by mapping creation/materialization.

**Verify:** call `getSignalMapping(mappingId)` before review.

---

## Packs

### `SDK_PACK_MANIFEST_OR_ARCHIVE_REQUIRED`

**Meaning:** Pack import has neither a manifest payload nor an archive.

**Fix:** provide a manifest + objects, or an archive payload.

### `SDK_PACK_FILE_NAME_REQUIRED`

**Meaning:** an archive was supplied without a filename.

**Fix:** send the archive filename together with `archiveBase64`.

### `SDK_PACK_ID_REQUIRED`

**Meaning:** install/evaluate/approve/release/upgrade preview is missing the Pack ID.

**Fix:** use the Pack ID returned by import/list.

**Verify:** call `listPacks()` and confirm the ID before continuing the lifecycle.

---

## Programs, Strategies and Evaluation

### `SDK_PROGRAM_ID_REQUIRED`

**Meaning:** a Behavior Program lookup/runtime operation is missing the program ID.

**Fix:** use an existing program ID from the same scope.

### `SDK_STRATEGY_ID_REQUIRED`

**Meaning:** get/validate/simulate/variant operations are missing the Strategy ID.

**Fix:** use a persisted Strategy ID returned by creation/listing.

### `SDK_STRATEGY_DEFINITION_REQUIRED`

**Meaning:** Strategy creation received no definition.

**Fix:** provide the complete versioned Strategy definition or author it through a Pack.

### `SDK_EVALUATION_ID_REQUIRED`

**Meaning:** evaluation lookup is missing its ID.

**Fix:** use the ID returned when the evaluation was started.

---

## The SDK says the request is valid, but the API still rejects it

SDK validation only checks client-side requirements. The server can still reject a validly shaped request because of:

- scope;
- authorization;
- lifecycle state;
- missing referenced resource;
- release/runtime eligibility.

Continue with [API errors](api-errors.md) and the relevant lifecycle guide.
