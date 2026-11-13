# AI prompts: Strategy errors

Use these prompts with persisted Behavior Strategies. Keep validation, simulation, and runtime execution separate.

## `SDK_STRATEGY_ID_REQUIRED`

```text
Fix `SDK_STRATEGY_ID_REQUIRED` without inventing a Strategy ID.

Trace the Strategy from creation/list/Pack materialization to the failing get/validate/simulate call. Find the persisted Strategy ID in the same scope and fix how it is passed through the application.

Return the Strategy ID source, minimal code/config change, and verification with a read/get call before validation or simulation.
```

## `SDK_STRATEGY_DEFINITION_REQUIRED`

```text
Fix `SDK_STRATEGY_DEFINITION_REQUIRED`.

Inspect how Strategy creation is invoked. Determine whether this application should create a Strategy directly or author it through a Pack. If direct creation is intentional, identify the missing definition source and verify required graph/state/policy fields against the public Strategy docs.

Do not synthesize undocumented server-owned fields.

Return intended authoring path, missing definition source, smallest corrected input, and structural validation step.
```

## Strategy validation fails

```text
Debug this Vira Strategy as a graph/state contract before changing runtime providers.

Strategy: <SANITIZED_DEFINITION_OR_RELEVANT_SECTION>
Validation output: <ERRORS>

Check in order:
1. entry step exists
2. every referenced step exists
3. all required steps are reachable
4. at least one valid terminal path exists
5. edges/branches point to valid steps
6. requires/produces state slots line up across steps
7. verifier/tool references are declared/allowed for the target integration
8. budgets and recovery transitions are bounded

Do not add random edges or remove verification merely to make validation pass.

Return the first structural inconsistency, minimal graph/state change, why it preserves intent, and re-validation steps.
```

## Simulation succeeds but no model/tool was called

```text
Explain this Vira Strategy simulation result and determine whether there is actually a problem.

Remember: structural simulation is not a real provider/tool execution.

Check whether the user's goal was:
A. validate graph/state/recovery shape, or
B. execute real model/tool steps.

If A, report whether simulation proves the expected structure.
If B, identify the supported runtime Strategy execution path and prerequisites without pretending simulation performed external calls.

Return the correct test type, next command/method, and expected evidence of a real execution.
```

## `STRATEGY_VERIFIER_UNAVAILABLE:<key>`

```text
Fix `STRATEGY_VERIFIER_UNAVAILABLE:<key>` without removing verification blindly.

Identify:
- the verifier key referenced by the Strategy;
- the target runtime/integration expected to provide it;
- whether the key is misspelled, stale, or unsupported in that runtime.

Prefer selecting/registering the correct supported verifier. Only change the Strategy verifier reference if the Strategy definition is wrong.

Return referenced key, available supported key(s), root cause, minimum fix, re-validation/simulation step, and runtime verification.
```

## `RUNTIME_STRATEGY_SELECTION_REQUIRED`

```text
Debug `RUNTIME_STRATEGY_SELECTION_REQUIRED` as an eligibility/selection issue, not as a graph-validation error unless evidence says so.

Check:
1. intended Behavior Point
2. Strategy exists in same organization/project/environment
3. Strategy validates
4. required evaluation/release lifecycle completed
5. runtime request is eligible for that Strategy

Return a PASS/FAIL table and stop at the first failure. Do not force a Strategy ID into runtime if the selection/eligibility relationship is not valid.
```

## `STRATEGY_ARTIFACT_NOT_FOUND`

```text
Fix `STRATEGY_ARTIFACT_NOT_FOUND` by tracing the persisted Strategy artifact reference.

Determine whether the runtime request uses a stale/nonexistent Strategy reference, points at the wrong scope/environment, or references an artifact that was never persisted/released.

Do not recreate artifacts until absence is proven.

Return the read/list check that proves artifact existence, the stale/wrong reference if found, minimum fix, and a retry using the verified artifact reference.
```

## Full Strategy debugger

```text
Audit this Strategy flow and stop at the first failing boundary:
1. Strategy ID/definition exists
2. scope matches
3. structural validation passes
4. simulation exercises the intended graph path
5. required verifier/tool capabilities are available
6. evaluation/release prerequisites are satisfied
7. runtime selects the intended Strategy
8. real execution reaches the expected terminal/waiting state

Return PASS/FAIL with evidence for each completed check. Fix only the first FAIL and provide a verification before continuing.
```
