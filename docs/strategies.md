# Behavior Strategies

A Behavior Strategy defines a bounded multi-step execution approach for a Behavior Point.

It answers:

> How should this governed task proceed?

It does not replace scope, policy, evaluation, authorization, or release checks.

## Two independent design choices

### Execution mode

- `INLINE`
- `STAGED`
- `AGENTIC`

Execution mode answers **how the workflow runs**.

### Result mode

- `response`
- `behavior_plan`

Result mode answers **who owns the final user-visible answer**.

A Strategy can be `STAGED + response` or `STAGED + behavior_plan`. Do not conflate execution mode with output ownership.

See [Strategy result modes](strategy-result-modes.md).

## `response`: Vira owns the final artifact

```text
model / tool steps
→ verify
→ compose
→ final response
```

Use this when Vira is the direct task runtime and no downstream model should independently rewrite the answer.

## `behavior_plan`: downstream model owns final prose

```text
request
→ Vira Strategy
→ compact behavior plan
→ downstream chatbot/model
→ final user-visible answer
```

A behavior plan should contain only what the downstream model needs to behave correctly, such as intent, explicit constraints, confirmed user preferences, bounded assumptions, response shape, safety/policy checks, and verification criteria.

It should not contain a hidden full answer for the downstream model to repeat.

## Step types

Supported Strategy concepts include:

- `model`
- `tool`
- `branch`
- `verify`
- `compose`
- `ask_user`
- `decision`
- `transform`

## Direct Strategy lifecycle

Current public authoring supports an explicit lifecycle:

```text
create
→ optional immutable variant
→ validate
→ simulate structurally
→ activate explicitly
→ runtime/release eligibility still follows the governed target flow
```

JavaScript:

```ts
const created = await vira.createBehaviorStrategy(definition);
const strategyId = String(created?.body.strategy?.id ?? created?.body.id ?? "");

await vira.validateBehaviorStrategy(strategyId);
await vira.simulateBehaviorStrategy(strategyId, {});
await vira.activateBehaviorStrategy(strategyId);
```

Python uses:

```text
create_behavior_strategy
validate_behavior_strategy
simulate_behavior_strategy
activate_behavior_strategy
```

MCP exposes:

```text
activate_behavior_strategy
```

### Activation is explicit

Strategy activation is a server-side state transition. It is not a client-side status edit and it is not permission to skip evaluation, release, scope, or runtime authority checks.

### Variants are real revisions

`createBehaviorStrategyVariant` / the Strategy variant route compiles and persists an immutable variant artifact. Treat variants as governed revisions, not mutable runtime switches.

## Strategy execution

Authoring/activation and execution are separate concerns.

Execution surface:

```text
startStrategyExecution
getStrategyExecution
getStrategyExecutionTrace
continueStrategyExecution
cancelStrategyExecution
```

MCP exposes the corresponding Strategy execution tools as well.

A waiting execution can be continued with pinned state/references. It should not silently change the Strategy artifact it started from.

## Validation versus simulation

**Validation** checks structural validity.

**Simulation** is a structural dry run. It is not proof that real model/tool providers executed.

Use governed runtime execution for real provider/tool work.

## User-owned preferences are not Strategy constants

If behavior depends on preferences such as audience, geography, budget, channels, tone, timeframe, or success metric:

- derive them from explicit user input or previously confirmed state;
- preserve unchanged preferences where relevant;
- replace them when the user changes them;
- stop applying them when the user removes them;
- do not invent missing values;
- label proposed defaults/scenarios as hypotheses.

Hard-coding a user preference into a Strategy turns personalization into policy by accident.

## Direct authoring versus Packs

Use direct Strategy authoring for incremental UI/SDK/MCP workflows.

Use Packs when a Semantic Task, Behavior Point, Program, Strategy, Signals, and evaluation references should move together as one portable reviewed bundle.

See [Canonical authoring](canonical-authoring.md) and [Packs](packs.md).

## Public API

```text
GET  /v1/behavior-strategies
POST /v1/behavior-strategies
GET  /v1/behavior-strategies/{strategyId}
POST /v1/behavior-strategies/{strategyId}/variants
POST /v1/behavior-strategies/{strategyId}/validate
POST /v1/behavior-strategies/{strategyId}/simulate
POST /v1/behavior-strategies/{strategyId}/activate
```

## Examples

For a direct response-owned Strategy:

```text
examples/authoring-quality/marketing-launch.response.strategy.json
```

For an existing-chatbot `behavior_plan` Strategy:

```text
examples/authoring-quality/marketing-launch.behavior-plan.strategy.json
```

Before activation/release, use the [Strategy authoring checklist](strategy-authoring-checklist.md) and [Authoring quality](authoring-quality.md).
