# Canonical authoring

Vira exposes direct authoring for core governed objects in addition to Pack-based authoring.

Use direct authoring when an application, Studio workflow, SDK integration, or MCP host needs to create one object at a time. Use Packs when several related objects should move together as a portable reviewed unit.

## 1. Semantic Tasks

JavaScript:

```ts
const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  aliases: ["go-to-market launch plan"],
  examples: ["Build a launch plan for a membership product"],
  negativeExamples: ["Write a single ad headline"],
});
```

Python:

```python
task = client.create_semantic_task({
    "taskKey": "marketing.launch_plan",
    "description": "Create a measurable launch plan",
    "examples": ["Build a launch plan for a membership product"],
    "negativeExamples": ["Write a single ad headline"],
})
```

MCP:

```text
list_semantic_tasks
create_semantic_task
```

HTTP:

```text
GET  /v1/semantic-tasks
POST /v1/semantic-tasks
GET  /v1/semantic-tasks/{taskId}
```

## 2. Behavior Points

A Behavior Point must bind to at least one Semantic Task.

```ts
const point = await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId: "<task-id>",
  constraints: [
    "cover the required funnel stages",
    "include a measurement approach"
  ],
});
```

MCP:

```text
list_behavior_points
create_behavior_point
```

HTTP:

```text
GET  /v1/behavior-points
POST /v1/behavior-points
GET  /v1/behavior-points/{behaviorPointId}
```

## 3. Behavior Strategies

A Strategy remains a bounded immutable definition/artifact rather than an arbitrary mutable workflow.

Typical direct lifecycle:

```text
create
→ optional variant
→ validate
→ simulate structurally
→ activate explicitly
→ runtime eligibility still follows the relevant governed release/runtime rules
```

JavaScript:

```ts
const created = await vira.createBehaviorStrategy(definition);
const strategyId = String(created?.body.strategy?.id ?? created?.body.id ?? "");

await vira.validateBehaviorStrategy(strategyId);
await vira.simulateBehaviorStrategy(strategyId, {});
await vira.activateBehaviorStrategy(strategyId);
```

Python uses the equivalent `create_behavior_strategy`, `validate_behavior_strategy`, `simulate_behavior_strategy`, and `activate_behavior_strategy` methods.

MCP exposes:

```text
activate_behavior_strategy
```

HTTP:

```text
POST /v1/behavior-strategies/{strategyId}/variants
POST /v1/behavior-strategies/{strategyId}/validate
POST /v1/behavior-strategies/{strategyId}/simulate
POST /v1/behavior-strategies/{strategyId}/activate
```

### Variants

Current Strategy variant creation compiles and persists a variant artifact rather than acting as a placeholder. Treat variants as governed immutable revisions, not as mutable runtime switches.

## 4. Teach proposals

Canonical authoring and Teach AI complement each other:

```text
manual/direct authoring
→ explicit object creation
```

```text
evidence-driven Teach
→ proposal
→ review/evaluate/promote
→ explicit release
```

Teach proposal methods are documented in [Teach AI](teach.md).

## 5. Direct authoring versus Packs

Use **direct authoring** when:

- a UI edits one Task or Point at a time;
- a developer tool needs immediate scoped authoring;
- an MCP client is authoring interactively;
- the lifecycle should stay explicit per object.

Use **Packs** when:

- Task + Point + Program + Strategy + evaluation references belong together;
- changes should be portable and versioned as a bundle;
- installation/evaluation/approval/release should happen as one governed package lifecycle.

Neither path is a shortcut around evaluation, approval, release, scope, or authorization.

## Quality bar

Direct API availability does not make generic authoring good authoring. Before activation/release, use [Authoring quality](authoring-quality.md) and the [weak vs production-quality examples](../examples/authoring-quality/).
