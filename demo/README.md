# Vira demo

This example uses a fictional marketing assistant to show the Vira lifecycle.

## Baseline

User:

> Create a go-to-market plan for a new subscription product.

The first response focuses on acquisition and misses retention and measurement.

## Correction

User:

> For launch plans, cover the full funnel, include retention, and define how each stage will be measured.

## Lifecycle

```text
Observation
→ Semantic Task
→ Behavior Point
→ Teach proposal
→ Evaluation
→ Approval
→ Release
→ Runtime
→ Trace
```

## Proposed behavior

```text
For launch-plan tasks, structure the plan across awareness, consideration,
conversion, and retention. Include an objective and measurement approach
for each stage.
```

The proposal is reviewed and evaluated before release.

## Example checks

- full-funnel coverage;
- measurement included;
- requested format preserved;
- no invented performance results.

## Trace

```text
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Behavior         full_funnel_launch_planning
Applied          yes
Result           completed
```

Use fictional or publishable data in public demos.
