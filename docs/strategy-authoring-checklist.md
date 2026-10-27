# Strategy authoring checklist

Use this checklist before evaluating or releasing a Strategy.

## 1. Is a Strategy actually needed?

Use a Strategy only when there is a real orchestration boundary such as:

- multiple meaningful state transitions;
- tool use;
- branching;
- bounded recovery;
- staged verification;
- final composition;
- generation of a compact behavior plan for a downstream model.

If one model call plus Behavior Program verification is sufficient, prefer the simpler design.

## 2. Who owns the final answer?

Choose before building the graph:

- `response`: Vira Strategy owns final output;
- `behavior_plan`: downstream chatbot/provider owns final prose.

Do not let both layers independently draft the same answer.

## 3. Are preferences user-owned?

Do not hard-code user preferences such as audience, budget, geography, channel mix, tone, or KPI into the Strategy unless they are truly policy constants.

Use explicit/confirmed preference state and support update/removal semantics.

## 4. Are steps justified?

Every step should create a meaningful:

- state boundary;
- verification boundary;
- decision boundary;
- tool boundary;
- composition boundary.

Delete decorative steps.

## 5. Are state contracts explicit?

For every step, check:

- `requires`;
- `produces`;
- state slot schema;
- privacy;
- size bound.

## 6. Is verification placed correctly?

For `response`, verify the candidate before final composition where required.

For `behavior_plan`, verify the plan itself and ensure it does not contain a hidden full answer.

## 7. Are tools and recovery bounded?

Check:

- allowed tools;
- effectful tools;
- max attempts;
- total recoveries;
- model/tool/decision call budgets;
- serialized-state budget.

## 8. Does simulation mean what you think it means?

Simulation is a structural dry run. It does not prove that real external providers or tools executed.

## 9. Is the Strategy release-safe?

A Strategy must not bypass:

- scope;
- policy;
- evaluation;
- approval;
- release.

## 10. Can another engineer explain it?

If the graph cannot be explained in a short paragraph, either the task is genuinely complex or the Strategy is over-engineered. Determine which before release.