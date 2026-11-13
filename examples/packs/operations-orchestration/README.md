# Governed Operations Pack · Advanced

Three separate semantic tasks: two **read-only COMPOUND candidates** and one **bounded STRATEGY-eligible incident task**. This Pack is built to explain eligible AUTO routing, not to assert that every mixed prompt will be automatically matched.

## Runtime verification dependencies

The Program uses `judge: ...` extensions to check evidence support for claims, inventory and root cause. These are explicitly declared external-verifier dependencies, **not** built-in automatic natural-language checks. Missing verifier/host support must fail closed. The Strategy's step-level verifier IDs also require a real registered executor and should be tested with an authorized tenant; a source graph is not an execution receipt. [Verification guide](../../../docs/runtime-verification.md).

## Why this Pack is harder

- `semantic-tasks/items.json` defines discrete task identities, positive/negative matching examples, and `compoundEligible` on the read-only tasks.
- Each task has an explicit Point and a distinct Program, so its evidence and authority boundaries remain separate.
- `behavior-strategies/items.json` contains a **real structured Strategy definition** for the incident task, with steps, edges, state slots, policies and budgets. Pack materialization binds this to the immutable Program identity. This is not a loose prose "strategy".
- `tests/cases.json` covers both single-task and multi-task prompts, missing child data and unverified hypotheses.
- The host must have the relevant **server-attested capabilities** and released artifacts for AUTO to dispatch to COMPOUND, STRATEGY or HYBRID.

## Read this in order

1. Start with `semantic-tasks/items.json`: why a request should resolve to each task.
2. Check `behavior-points/items.json`: the contract each task must preserve.
3. Examine `behavior-programs/items.json`: what is checked before/after generation, including failure handling.
4. Inspect `behavior-strategies/items.json`: entry step, stage dependencies, verifier and strict budgets.
5. Read `tests/cases.json`: what easy, ambiguous and negative requests should exercise.
6. Verify complete scoped materialization, evaluation evidence, approval and release **before** AUTO TaskRun.

**Do not claim** that an author-supplied `strategyEligible` field alone proves the strategy can execute. Eligibility must come from actual materialization and runtime authority.

[Pack field guide](../../../docs/pack-authoring-guide.md) · [Canonical request path](../../../docs/canonical-taskrun.md) · [TaskRun modes](../../../docs/execution-modes.md).
