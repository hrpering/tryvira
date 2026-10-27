# Authoring quality examples

These examples show the difference between **generic-but-plausible** Vira authoring and **production-quality** authoring.

They are intentionally paired so you can compare the boundary, requirement, verification, and execution design.

## Files

| File | Purpose |
| --- | --- |
| `semantic-tasks.yaml` | weak and strong Semantic Task examples |
| `behavior-points.yaml` | weak and strong Behavior Point examples |
| `marketing-launch.generic.strategy.json` | structurally simple but conceptually weak Strategy |
| `marketing-launch.production.strategy.json` | deeper, bounded Strategy example |
| `quality-review.md` | why the stronger versions are better |

## Important

The weak examples are educational. Do not copy them into production merely because they look syntactically plausible.

Use the versioned public schema for your Vira deployment when materializing these concepts.

## Quality loop

```text
use case
→ define task boundary
→ define Behavior Point
→ decide Program vs Strategy
→ define observable verification
→ add positive/negative evaluation cases
→ review
→ evaluate
→ approve
→ release
```

For the full quality rubric, read [`docs/authoring-quality.md`](../../docs/authoring-quality.md).
