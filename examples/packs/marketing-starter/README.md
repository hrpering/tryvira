# Marketing Launch Decision Pack · Intermediate

This example turns a generic full-funnel launch prompt into a **testable plan tied to a real team's constraints**. It covers audience and offer hypotheses, owners, spending limits, measurement definitions, stop/continue gates and explicit separation between known facts and proposals.

The manifest has **no decorative installer variables**. Budget, team, target geography and market are supplied as task evidence, not unbound switches. Inspect the `tests/cases.json` scenarios for missing evidence, low budget, calculation and approval boundaries.

The Program's `judge: ...` checks require a configured domain verifier; source declarations are not proof of live verification. The 26 fixture cases are not passed evaluations. Use the [Pack authoring guide](../../../docs/pack-authoring-guide.md), [evaluation protocol](../../../docs/pack-evaluation.md), and [AUTO TaskRun](../../../docs/canonical-taskrun.md) for an authorized integration. The Pack never launches campaigns by itself.
