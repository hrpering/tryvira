# Authoring quality examples

These examples show the difference between **generic-but-plausible** Vira authoring and **production-quality** authoring.

They are intentionally paired so you can compare task boundaries, requirements, verification, execution design, final-output ownership, and preference handling.

## Files

| File | Purpose |
| --- | --- |
| `semantic-tasks.yaml` | weak and strong Semantic Task examples |
| `behavior-points.yaml` | weak and strong Behavior Point examples |
| `marketing-launch.generic.strategy.json` | structurally plausible but conceptually weak Strategy |
| `marketing-launch.production.strategy.json` | production response-owned Strategy, kept as the general production example |
| `marketing-launch.response.strategy.json` | explicit `resultMode: response` example |
| `marketing-launch.behavior-plan.strategy.json` | explicit `resultMode: behavior_plan` example for an existing downstream chatbot/model |
| `quality-review.md` | why the stronger versions are better |

## Strategy ownership matters

A production Strategy is not defined only by having more steps.

Choose the final-answer owner first:

```text
response
Vira Strategy → verified final answer
```

```text
behavior_plan
Vira Strategy → compact verified plan → downstream chatbot/model → final answer
```

The `behavior_plan` example intentionally does **not** contain a compose/final-answer step.

## Preference ownership matters

User preferences should not silently become Strategy constants.

If a use case depends on audience, geography, budget, channel mix, tone, timeframe, KPI, or similar values:

- use explicit or confirmed values;
- preserve unchanged values;
- replace changed values;
- stop using removed values;
- do not invent missing preferences.

## Important

The weak examples are educational. Do not copy them into production merely because they are syntactically plausible.

Use the versioned public schema for your Vira deployment when materializing these concepts.

## Quality loop

```text
use case
→ define task boundary
→ define Behavior Point
→ decide Program vs Strategy
→ decide final-answer owner
→ define observable verification
→ add positive/negative/boundary cases
→ review
→ evaluate
→ approve
→ release
```

For the full rubric, read [`docs/authoring-quality.md`](../../docs/authoring-quality.md) and [`docs/strategy-result-modes.md`](../../docs/strategy-result-modes.md).
