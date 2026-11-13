# Signals

Signal authoring is a reviewed lifecycle. A proposal is not active just because it was created.

## Discovery proposal errors

### `SIGNAL_DISCOVERY_KEY_REQUIRED`

**Meaning:** the proposal has no stable Signal key.

**Fix:** provide a stable key such as `quality.missing_measurement`.

**Verify:** create the proposal and keep the returned proposal ID.

### `SIGNAL_DISCOVERY_EVIDENCE_REQUIRED`

**Meaning:** the proposal is not backed by at least one evidence event ID.

**Fix:** submit/identify the observation or feedback event first, then reference it in `evidenceEventIds`.

**Verify:** recreate the proposal with the evidence ID.

### `SIGNAL_DISCOVERY_CONFIDENCE_INVALID`

**Meaning:** confidence is not a finite value between `0` and `1`.

**Fix:** send a valid number in that range or omit the optional value.

### `SIGNAL_DISCOVERY_PRODUCER_TYPE_INVALID`

**Meaning:** the suggested producer type is unsupported.

Supported public values include:

```text
observation_attribute
tool_result
application_state
runtime_state
```

### `SIGNAL_DISCOVERY_NOT_REVIEWABLE`

**Meaning:** the proposal is no longer in the `PROPOSED / NEEDS_REVIEW` state.

**Common cause:** the same proposal was already approved/rejected.

**Fix:** read the current proposal state. Do not review the same state transition twice.

### `SIGNAL_DISCOVERY_APPROVAL_REQUIRED`

**Meaning:** materialization was attempted before approval.

**Fix:** review the proposal with `APPROVE` first.

### `SIGNAL_DISCOVERY_PRODUCER_SUGGESTION_REQUIRED`

**Meaning:** Vira cannot materialize the Signal because the approved proposal does not identify a producer type/key.

**Fix:** provide/review a proposal with a valid producer suggestion.

---

## Mapping errors

### `SIGNAL_MAPPING_KEY_REQUIRED`

**Meaning:** mapping has no Signal stable key.

### `SIGNAL_MAPPING_VERSION_INVALID`

**Meaning:** `signalVersion` is not an integer >= 1.

### `SIGNAL_MAPPING_PRODUCER_REQUIRED`

**Meaning:** mapping does not say which producer key supplies the value.

### `SIGNAL_MAPPING_PRODUCER_TYPE_INVALID`

**Meaning:** producer type is not supported.

### `SIGNAL_MAPPING_EVIDENCE_REQUIRED`

**Meaning:** mapping proposal has no evidence event.

### `SIGNAL_MAPPING_NOT_REVIEWABLE`

**Meaning:** mapping has already left the proposed/reviewable state.

### `SIGNAL_MAPPING_NOT_ACTIVE`

**Meaning:** runtime capture was attempted before the mapping was approved and active.

### `SIGNAL_MAPPING_EVENT_TYPE_MISMATCH`

**Meaning:** the incoming observation event type does not match the mapping's configured source event type.

**Fix:** either send the expected event type or correct the mapping.

### `SIGNAL_MAPPING_SOURCE_MISSING` / `SIGNAL_MAPPING_VALUE_MISSING`

**Meaning:** the mapped payload/attribute or configured producer key is absent from the event.

**Fix:** inspect the observation shape and make `producerKey` point to a value that is actually present.

---

## Recommended debugging sequence

```text
1. observation exists
2. discovery proposal has evidence
3. proposal is approved
4. materialization returns definition + mapping
5. mapping is approved
6. incoming event type matches
7. producer key exists in the event
```

## Verify the fix

Use one known event with a known value. Confirm the Signal can be produced from that event before testing broader automatic discovery.
