# Public Vira demo

Use a fictional marketing assistant.

## Baseline

User:

> Create a go-to-market plan for a new subscription product.

Assistant produces an acquisition-heavy plan.

## Correction

User:

> For launch plans, cover the full funnel, include retention, and define how each stage will be measured.

## Vira flow

```text
Observation
→ Semantic Task
→ Behavior Point
→ Teach proposal
→ Evaluation
→ Approval
→ Release
→ Runtime
→ Simple trace
```

## Proposed behavior

```text
For launch-plan tasks, structure the plan across awareness, consideration,
conversion, and retention. Include an objective and measurement approach
for each stage.
```

State:

```text
PROPOSED
```

not:

```text
ACTIVE
```

## Evaluation

Public-safe checks:

- full funnel covered;
- measurement included;
- user format preserved;
- no invented performance results.

## Release

After evaluation and approval, release the behavior.

## New request

> Plan the launch of a new meal-delivery membership.

The user should not repeat the old correction.

## Trace

```text
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Behavior         full_funnel_launch_planning
Applied          yes
Result           completed
```

That is enough for a public demo.

Do not show raw internal receipts, digests, private prompts, credentials, or customer identifiers.
