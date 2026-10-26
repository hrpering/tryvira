# Teach and evaluation

Teach turns admitted evidence into a reviewed candidate. Evaluation checks whether a candidate meets the required assertions.

## Evidence admission

### `EVIDENCE_FIELDS_REQUIRED`

**Meaning:** evidence is missing required identity, scope, or content.

**Fix:** provide an evidence ID, organization/project/environment scope, source, and non-empty content.

**Verify:** resubmit the smallest evidence item and confirm it is admitted.

### `PRIVACY_CLASS_FORBIDDEN`

**Meaning:** the evidence privacy class is unsupported.

**Fix:** use a privacy class supported by the API version.

### `CONSENT_REQUIRED`

**Meaning:** the selected evidence class requires consent but the request does not include it.

**Fix:** submit that evidence only when the required consent is present.

### `CONSENT_SCOPE_MISMATCH`

**Meaning:** consent and evidence use different organization/project/environment scope.

**Fix:** use consent information that belongs to the same scope as the evidence.

### `CONSENT_NOT_ACTIVE`

**Meaning:** the supplied consent is not currently active.

**Fix:** use an active consent record before resubmitting.

### `CONVERSATION_EVIDENCE_FIELDS_REQUIRED`

**Meaning:** conversation evidence has no conversation ID or message.

**Fix:** include both fields.

### `CONVERSATION_OUTCOME_INVALID`

**Meaning:** conversation outcome is unsupported.

**Fix:** use a documented value such as `SUCCEEDED`, `FAILED`, or `UNSPECIFIED`.

---

## Teach proposal and review

### `LESSON_PROPOSAL_INVALID`

**Meaning:** proposal creation does not have admitted evidence, a target point, or a usable summary.

**Fix:** admit evidence first, then create the proposal from that evidence.

### `LESSON_PROPOSAL_EVIDENCE_INVALID`

**Meaning:** one of the referenced evidence IDs is empty or invalid.

**Fix:** remove invalid IDs and reference admitted evidence only.

### `LESSON_REVIEW_INVALID`

**Meaning:** the proposal is not reviewable or review input is invalid.

**Common causes:** proposal is no longer `PROPOSED`, reviewer ID is missing, or the decision is not `APPROVE`/`REJECT`.

**Fix:** read the proposal state and review it once with a valid decision.

---

## Teach evaluation and promotion

### `LESSON_EVALUATION_INVALID`

**Meaning:** evaluation was attempted before review, or evaluation ID/score is invalid.

**Fix:** complete review first and use a finite score from `0` to `1` with a valid evaluation ID.

### `LESSON_PROMOTION_REJECTED`

**Meaning:** the evaluated candidate is not eligible to move forward.

**Common causes:** it has not been evaluated, its score is below the configured threshold, or promoter identity is missing.

**Fix:** inspect the evaluation result, improve the candidate if needed, and evaluate again.

---

## Evaluation request errors

### `EVALUATION_FIELDS_REQUIRED`

**Meaning:** evaluation is missing required target, dataset, or assertions.

**Fix:** provide a target artifact, a non-empty dataset, and assertions.

### `EVALUATION_SUITE_VERSION_REQUIRED`

**Meaning:** an evaluation suite was supplied without a usable ID/version.

**Fix:** version the suite explicitly.

### `EVALUATION_HOLDOUT_REQUIRED`

**Meaning:** holdout evaluation was requested but the holdout set is empty or invalid.

**Fix:** provide a non-empty holdout set or remove that option.

### `EVALUATION_STATUS_INVALID`

**Meaning:** evaluation status is not one of the supported final statuses.

### `EVALUATION_SCORE_INVALID`

**Meaning:** score or threshold is not a finite number between `0` and `1`.

**Fix:** correct the evaluator output/configuration and rerun the evaluation.

### `EVALUATION_NOT_FOUND`

**Meaning:** a later operation references an evaluation ID that cannot be found in the current scope.

**Fix:** use the ID returned by the evaluation that actually ran in this scope.

---

## Recommended sequence

```text
evidence admitted
↓
proposal created
↓
proposal reviewed
↓
evaluation started
↓
evaluation result inspected
↓
candidate advances only after the required checks pass
```

## Verify the fix

Read the resulting proposal/evaluation state and confirm it advanced exactly one expected lifecycle stage.
