# Behavior Points

A **Behavior Point** is a named location where governed behavior can attach to an AI workflow.

Examples:

```text
marketing.launch_plan
support.refund_request
research.source_claim
operations.irreversible_action
```

## Behavior Point versus Semantic Task

A Semantic Task classifies the kind of work:

```text
marketing.launch_plan
```

A Behavior Point binds that task to governed behavior.

In simple cases they can use the same readable key.

## Naming

Recommended style:

```text
domain.action_or_task
```

Good:

```text
marketing.launch_plan
support.answer_billing
research.write_summary
```

Avoid:

```text
bp1
thing
final_behavior_v7
```

Keys should remain stable even when the implementation evolves.

## Supported public authoring: Packs

The public programmatic authoring path is a Vira Pack.

A Pack can contain:

- semantic tasks;
- Behavior Points;
- behavior programs;
- strategies;
- policies;
- signal keys;
- Teach patterns;
- evaluation references.

Importing the Pack creates a candidate.

Installing it materializes the scoped governed objects.

Evaluation and approval still happen before release.

### Minimal Pack structure

```text
marketing-starter/
├── pack.yaml
├── semantic-tasks/
│   └── items.yaml
├── behavior-points/
│   └── items.yaml
└── behavior-programs/
    └── items.yaml
```

### `pack.yaml`

```yaml
id: vira.marketing.starter
name: Marketing Starter
version: 1.0.0
```

### `semantic-tasks/items.yaml`

```yaml
- taskKey: marketing.launch_plan
  description: Build a launch plan for a product or service
  aliases:
    - go to market plan
    - launch strategy
  examples:
    - Create a launch plan for a new subscription product
    - Build a go-to-market plan for a membership service
  negativeExamples:
    - Rewrite this headline
```

### `behavior-points/items.yaml`

```yaml
- key: marketing.launch_plan
  taskKey: marketing.launch_plan
  requirement: Cover the full funnel and include measurement
  verification: Confirm that each stage has an objective and measurement approach
```

### What installation does

A supported Pack install materializes the canonical task and Behavior Point and creates the associated behavior program, strategy, policy, and immutable revision required by the product lifecycle.

It does not mean the behavior is released.

## Studio authoring

When using Studio, the conceptual workflow is:

```text
Behavior Points
→ New
→ stable key
→ semantic task binding
→ requirement
→ verification
→ save draft
→ evaluate
→ approve
→ release
```

Exact labels can evolve by product version. The stable concepts are key, task binding, behavior content, evaluation, and release.

## Do not use undocumented endpoints

This repository does not publish an invented standalone Behavior Point CRUD endpoint.

Use documented public Pack, Studio, SDK, or API surfaces supported by your Vira version.
