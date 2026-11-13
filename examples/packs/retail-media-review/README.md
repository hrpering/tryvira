# Retail Media Evidence Review · Intermediate

A business Pack designed to survive a strong baseline model. Its value is a **declared and evaluable measurement contract**, not the claim that every ordinary model will confuse ROAS.

The core problem: comparing metrics built from *different measurement rules* and presenting a confident spend recommendation.

## How to adapt

1. This example deliberately omits installer variables. Add business-unit or market configuration only after your actual materializer and runtime show that those fields bind to the Program, not merely to Pack metadata.
2. Keep `semantic-tasks/items.json` focused on comparisons and advice rather than generic “marketing”.
3. Keep the Point as a **task outcome contract** and Program modules as the **actual checks**.
4. Extend `tests/cases.json` with deliberately comparable data, incompatible attribution, different sales scope and an unauthorized action attempt.
5. Add a strategy only if this truly needs multiple governed execution stages. Longer prose alone does not justify STRATEGY.

Files: `pack.yaml`, `semantic-tasks/items.json`, `behavior-points/items.json`, `behavior-programs/items.json`, `signals/items.json`, `evaluations/items.json`, and `tests/cases.json`.

**Release:** import → inspect conflicts → install → server-side evaluation → human approval → explicit release. The source evaluation IDs do not constitute a passed evaluation.

[Authoring guide](../../../docs/pack-authoring-guide.md) · [AUTO TaskRun](../../../docs/canonical-taskrun.md).
