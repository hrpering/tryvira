# AI prompts: Signal errors

Use these prompts with the [Signal troubleshooting guide](../troubleshooting/signals.md).

## Discovery proposal errors

### `SIGNAL_DISCOVERY_KEY_REQUIRED`

```text
Fix `SIGNAL_DISCOVERY_KEY_REQUIRED` in this Vira Signal discovery flow.

Inspect the code/config that creates the discovery proposal. Determine why `signalStableKey` is empty. Propose a stable domain-oriented key that describes the evidence, not a one-off event ID or user text. Keep naming consistent with existing Signal keys.

Return: current source of the empty key, proposed stable key, exact request patch, and one verification proposal creation.
```

### `SIGNAL_DISCOVERY_EVIDENCE_REQUIRED`

```text
Fix `SIGNAL_DISCOVERY_EVIDENCE_REQUIRED` without inventing evidence IDs.

Trace whether the relevant observation/feedback event was actually submitted and persisted before proposal creation. Find the real event ID returned/known by the application, then reference it in `evidenceEventIds`.

Do not fabricate an event ID. Return the missing evidence step, smallest patch, and verification that the proposal references a real event.
```

### `SIGNAL_DISCOVERY_CONFIDENCE_INVALID`

```text
Fix `SIGNAL_DISCOVERY_CONFIDENCE_INVALID`.

Find where confidence is produced. Verify it is a finite number between 0 and 1, not a percentage, string, NaN, or unbounded score. Prefer omitting the optional field if the integration does not have a meaningful calibrated confidence value.

Return current value/source, corrected representation, and a validation test for 0, 1, and one mid-range value.
```

### `SIGNAL_DISCOVERY_PRODUCER_TYPE_INVALID`

```text
Fix `SIGNAL_DISCOVERY_PRODUCER_TYPE_INVALID`.

Inspect the actual event/data source and choose only a supported producer type: observation_attribute, tool_result, application_state, or runtime_state. Do not pick a type just to satisfy validation; explain why it matches where the value originates.

Return producer source → correct producerType → producerKey → one example event shape → verification.
```

### `SIGNAL_DISCOVERY_NOT_REVIEWABLE`

```text
Debug `SIGNAL_DISCOVERY_NOT_REVIEWABLE` as a lifecycle-state problem.

Read the proposal's current status/reviewState first. Determine whether it was already approved/rejected or whether the application is replaying the same review transition.

Do not create a duplicate proposal unless the current proposal cannot represent the intended new evidence. Return current state, attempted transition, valid next action, and verification.
```

### `SIGNAL_DISCOVERY_APPROVAL_REQUIRED`

```text
Fix `SIGNAL_DISCOVERY_APPROVAL_REQUIRED` without bypassing review.

Confirm the proposal exists, is reviewable, and has an explicit APPROVE decision from an authorized identity. Then materialize only after approval.

Return the missing lifecycle transition and the exact review → read state → materialize verification sequence.
```

### `SIGNAL_DISCOVERY_PRODUCER_SUGGESTION_REQUIRED`

```text
Fix `SIGNAL_DISCOVERY_PRODUCER_SUGGESTION_REQUIRED`.

Inspect the evidence/event shape and identify a real producer type and producer key that can supply the Signal value. Do not invent a key that is absent from events.

Return one known event example, selected producerType, selected producerKey, why they are valid, and a materialization verification.
```

## Mapping errors

### `SIGNAL_MAPPING_KEY_REQUIRED` / `SIGNAL_MAPPING_VERSION_INVALID`

```text
Fix the Vira Signal mapping identity error `<ERROR_CODE>`.

Check that the mapping uses an existing Signal stable key and an integer version >= 1 from the materialized Signal definition. Do not guess the version.

Return the definition identity, corrected mapping fields, and `getSignalMapping`/creation verification.
```

### `SIGNAL_MAPPING_PRODUCER_REQUIRED` / `SIGNAL_MAPPING_PRODUCER_TYPE_INVALID`

```text
Fix `<ERROR_CODE>` by matching the mapping to the real event/data source.

Inspect one sanitized source event. Identify where the desired value actually lives and select the supported producer type and exact producerKey. Do not restructure the whole event unless necessary.

Return source event path, producerType, producerKey, minimal mapping patch, and one capture test.
```

### `SIGNAL_MAPPING_EVIDENCE_REQUIRED`

```text
Fix `SIGNAL_MAPPING_EVIDENCE_REQUIRED` without synthetic evidence.

Find the real observation/feedback event that justified this mapping, ensure its event ID is available, and attach that ID to the proposal. If no evidence exists, stop and create/observe evidence first.

Return the missing evidence source and verification.
```

### `SIGNAL_MAPPING_NOT_REVIEWABLE` / `SIGNAL_MAPPING_NOT_ACTIVE`

```text
Debug `<ERROR_CODE>` as a Signal mapping lifecycle issue.

Read the mapping first. Report status and reviewState. Determine whether the integration is reviewing twice, capturing before approval, or using a revoked/rejected mapping.

Do not mutate persisted state directly. Return current state, valid next transition, and a verification call.
```

### `SIGNAL_MAPPING_EVENT_TYPE_MISMATCH`

```text
Fix `SIGNAL_MAPPING_EVENT_TYPE_MISMATCH` using one real sanitized observation.

Compare mapping.sourceEventType with observation.eventType. Decide whether the mapping was configured for the wrong event class or the application emits the wrong event type. Prefer correcting the side that is semantically wrong, not whichever is easier.

Return both values, root cause, minimum change, and one event-based verification.
```

### `SIGNAL_MAPPING_SOURCE_MISSING` / `SIGNAL_MAPPING_VALUE_MISSING`

```text
Fix `<ERROR_CODE>` by tracing the configured producerKey against an actual sanitized event.

Show the event's payload/attributes shape, normalize the configured path, and identify the first path segment that does not exist. Do not add fake placeholder values to events.

Return existing event shape, expected path, first mismatch, minimal producerKey or event-emission fix, and a single known-value verification.
```

## Full Signal debugger

```text
Audit this Signal flow end to end and stop at the first failing stage:
1. evidence event exists
2. discovery proposal references evidence
3. proposal is approved
4. materialization returns definition + mapping
5. mapping is approved/active
6. incoming event type matches
7. producer key exists
8. captured value equals the known test value

For each stage return PASS/FAIL + evidence. Fix only the first FAIL, then give one verification step before continuing.
```
