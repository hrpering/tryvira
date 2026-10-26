# AI prompts: Semantic routing and Behavior Points

## Semantic resolver returns no selection / uncertain

```text
Debug this Vira semantic routing result without forcing a match.

Input: <SANITIZED_USER_OR_TASK_INPUT>
Expected task: <TASK_KEY_OR_UNKNOWN>
Actual semantic result: <SELECT | UNCERTAIN | NO_MATCH | OTHER>
Candidate/task definitions available: <SANITIZED_SUMMARY>

Treat uncertainty/no-match as a valid outcome, not automatically a bug.

Check in this order:
1. Is the expected Semantic Task present and eligible in the current scope?
2. Do aliases/examples actually describe this input?
3. Are negative examples missing for nearby tasks?
4. Are two tasks semantically overlapping?
5. Is the input too short/ambiguous to justify selection?

Do not lower confidence/abstention safeguards blindly.

Return:
- why the current outcome is reasonable or incorrect;
- the smallest definition/example change;
- one positive example, one negative example, and one ambiguous regression case;
- a verification matrix showing expected semantic outcomes.
```

## Wrong semantic task selected

```text
Analyze this Vira semantic misroute as a classification/regression problem.

Input: <INPUT>
Selected task: <SELECTED>
Expected task: <EXPECTED>
Relevant task aliases/examples/negative examples: <PASTE SANITIZED DEFINITIONS>

Compare the selected and expected tasks. Identify the specific lexical/semantic overlap that likely caused the wrong selection. Prefer improving task descriptions, examples, aliases, or negative examples over adding ad-hoc special cases.

Return:
1. overlap causing the confusion
2. minimal definition changes for both tasks
3. 5 regression prompts: 2 expected-task positives, 2 selected-task negatives, 1 intentionally ambiguous case
4. expected select/uncertain/no-match result for each
5. what not to change
```

## `SDK_SEMANTIC_INPUT_REQUIRED`

```text
Fix `SDK_SEMANTIC_INPUT_REQUIRED` in this Vira integration.

Inspect the call site and trace where semantic input is built. Find why the input becomes empty before `resolveSemantic` is called. Check trimming, optional fields, request parsing, message extraction, and upstream null/undefined handling.

Do not replace empty input with a fake fallback string.

Return the exact source of the empty value, smallest code fix, and one unit/integration test proving an empty request is handled before the Vira call while a real task reaches `resolveSemantic`.
```

## `SDK_BEHAVIOR_POINT_REQUIRED`

```text
Fix `SDK_BEHAVIOR_POINT_REQUIRED` without inventing a Behavior Point key.

Trace where the runtime Behavior Point should come from:
- explicit application configuration;
- semantic selection mapping;
- installed Pack/Behavior Point definition.

Confirm the key exists in the same scope before changing runtime code. Do not hard-code an arbitrary key just to make the error disappear.

Return the expected source of the Behavior Point key, smallest fix, and a read/resolve verification in the same organization/project/environment.
```

## Semantic selection succeeds but runtime does not apply behavior

```text
Debug this Vira flow by separating semantic selection from runtime eligibility.

Known facts:
Semantic task selected: <TASK>
Behavior Point expected: <BP>
Runtime result/error: <RESULT>
Scope: <SANITIZED>

Check these stages independently:
1. semantic result is correct;
2. task maps to the intended Behavior Point;
3. Behavior Point exists in the same scope;
4. related Pack/program/Strategy is in the expected lifecycle state;
5. required evaluation/approval/release has completed;
6. application actually uses the runtime result in the model/agent flow.

Find the first failed stage. Do not modify semantic routing if stages 1–2 are already correct.

Return a stage-by-stage PASS/FAIL table, the first failing stage, smallest fix, and one verification for that stage only.
```
