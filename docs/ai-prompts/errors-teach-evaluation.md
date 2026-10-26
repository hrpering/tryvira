# AI prompts: Teach and evaluation errors

Teach is a reviewed lifecycle. The prompts below must not bypass consent, review, evaluation, or promotion requirements.

## `EVIDENCE_FIELDS_REQUIRED`

```text
Fix `EVIDENCE_FIELDS_REQUIRED` in this Vira Teach evidence request.

Inspect the request construction and identify which required field is missing: evidence ID, scope, source, or non-empty content. Preserve the original evidence meaning and do not fill missing fields with dummy values.

Return missing field(s), where each should originate, smallest request patch, and one admitted-evidence verification.
```

## `PRIVACY_CLASS_FORBIDDEN`

```text
Fix `PRIVACY_CLASS_FORBIDDEN` without weakening privacy handling.

Inspect the evidence classification and the public API version. Determine which supported privacy class correctly describes the evidence. Do not relabel sensitive evidence as public just to pass validation.

Return current class, supported appropriate class, any consent implication, corrected request, and verification.
```

## `CONSENT_REQUIRED` / `CONSENT_SCOPE_MISMATCH` / `CONSENT_NOT_ACTIVE`

```text
Debug `<ERROR_CODE>` as a consent prerequisite problem.

Do not fabricate consent, switch evidence to a weaker privacy class, or reuse consent from another scope.

Check:
1. does this evidence class require consent?
2. is consent actually present?
3. does consent belong to the same organization/project/environment?
4. is it active for the current operation/time?

Return which prerequisite failed, the legitimate remediation needed before submission, and a verification that evidence is admitted only after valid consent is present.
```

## `CONVERSATION_EVIDENCE_FIELDS_REQUIRED`

```text
Fix `CONVERSATION_EVIDENCE_FIELDS_REQUIRED` by tracing how conversationId and message are extracted from the source application.

Do not create placeholder conversation IDs/messages. Identify whether the source event is malformed, the adapter mapping is wrong, or trimming/null handling removes the value.

Return the first missing source value, minimal mapping/code fix, and a test with one sanitized conversation event.
```

## `CONVERSATION_OUTCOME_INVALID`

```text
Fix `CONVERSATION_OUTCOME_INVALID`.

Trace the application outcome vocabulary and map it deliberately to the supported Vira outcome values such as SUCCEEDED, FAILED, or UNSPECIFIED. Do not map unknown outcomes to success by default.

Return source outcome values, explicit mapping table, fallback behavior, code patch, and tests for success/failure/unknown.
```

## `LESSON_PROPOSAL_INVALID` / `LESSON_PROPOSAL_EVIDENCE_INVALID`

```text
Debug `<ERROR_CODE>` in the Teach proposal stage.

Check that evidence was admitted first, referenced evidence IDs are real/non-empty, the target Behavior Point/control target is present, and summary is meaningful.

Do not fabricate evidence IDs or advance unadmitted evidence.

Return the missing prerequisite, corrected proposal input, and verification that proposal state becomes PROPOSED exactly once.
```

## `LESSON_REVIEW_INVALID`

```text
Debug `LESSON_REVIEW_INVALID` as a review-state/input problem.

Read the proposal first. Check current status, reviewer identity presence, and decision value. Determine whether this is a duplicate review or invalid decision.

Do not rewrite proposal state directly.

Return current state, valid next transition, corrected review call, and read-back verification.
```

## `LESSON_EVALUATION_INVALID`

```text
Fix `LESSON_EVALUATION_INVALID`.

Verify the proposal is REVIEWED, evaluation ID is real, and score is finite between 0 and 1. Trace the score/evaluation ID back to the evaluation that actually ran.

Do not invent a score or evaluation ID.

Return the failed prerequisite, corrected evaluation linkage, and verification that the proposal reaches EVALUATED.
```

## `LESSON_PROMOTION_REJECTED`

```text
Analyze `LESSON_PROMOTION_REJECTED` without lowering thresholds merely to make promotion pass.

Check proposal state, evaluation score, required threshold, and promoter identity. If score is below threshold, identify which failed assertions/evidence explain the result and propose how to improve the candidate before re-evaluation.

Return cause, failed criteria, candidate improvement plan, re-evaluation verification, and promotion retry only after eligibility is proven.
```

## `EVALUATION_FIELDS_REQUIRED`

```text
Fix `EVALUATION_FIELDS_REQUIRED`.

Inspect the evaluation request and identify missing target artifact, non-empty dataset, or assertions. Keep the dataset/assertions relevant to the behavior being evaluated; do not add meaningless passing assertions.

Return missing inputs, smallest valid evaluation request, and verification that evaluation starts/returns an ID.
```

## `EVALUATION_SUITE_VERSION_REQUIRED` / `EVALUATION_HOLDOUT_REQUIRED`

```text
Fix `<ERROR_CODE>` while preserving evaluation quality.

For suite-version errors, use a stable suite ID and explicit version from the project's evaluation configuration.
For holdout errors, provide a real non-empty holdout set or remove holdout mode if it was enabled accidentally.

Do not duplicate training/test examples just to populate holdout.

Return root cause, corrected configuration, and verification of the evaluation request.
```

## `EVALUATION_STATUS_INVALID` / `EVALUATION_SCORE_INVALID`

```text
Debug `<ERROR_CODE>` at the evaluator-output boundary.

Trace the evaluator result before it is submitted to Vira. Validate final status vocabulary, score/threshold numeric type, finite range 0..1, and failed assertion indices if present.

Do not clamp a fundamentally wrong score silently.

Return raw sanitized evaluator result, invalid field, correct normalization/validation logic, unit tests, and one successful evaluation submission.
```

## `EVALUATION_NOT_FOUND`

```text
Fix `EVALUATION_NOT_FOUND` without starting a duplicate evaluation first.

Trace where the evaluation ID came from, confirm it was produced in the same scope/environment, and use a read/get operation to prove existence. Look for stale IDs from another run/environment.

Return ID source, existence check, scope mismatch/stale reference if found, minimal fix, and verification.
```

## Full Teach/evaluation debugger

```text
Audit this Teach/evaluation flow and stop at the first failing stage:
1. evidence is valid for privacy/consent
2. evidence is admitted
3. proposal references admitted evidence
4. proposal is reviewed once
5. evaluation has real dataset/assertions and completes
6. proposal links to the real evaluation result
7. candidate meets the required threshold/criteria
8. next lifecycle action is eligible

Return PASS/FAIL + evidence for each stage. Fix only the first FAIL.
```
