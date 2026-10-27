# Behavior Strategies

A Behavior Strategy defines a bounded multi-step execution approach for a Behavior Point.

It answers:

> How should this governed task proceed?

It does not replace policy, scope, evaluation, approval, or release checks.

## Two independent choices

A Strategy has two different design dimensions:

### Execution mode

- `INLINE`
- `STAGED`
- `AGENTIC`

Execution mode answers **how the workflow runs**.

### Result mode

- `response`
- `behavior_plan`

Result mode answers **who owns the final user-visible answer**.

Do not conflate the two.

A Strategy can be `STAGED + response` or `STAGED + behavior_plan` depending on the integration.

See [Strategy result modes](strategy-result-modes.md).

## `response`: Vira owns the final answer

Use `response` when the Strategy is expected to return the final artifact.

```text
model / tool steps
→ verify
→ compose
→ final response
```

This is appropriate when Vira is the direct task runtime and there is no downstream chatbot that should independently rewrite the answer.

## `behavior_plan`: downstream model owns final prose

Use `behavior_plan` when Vira is inserted as a behavior layer in front of an existing chatbot or model provider.

```text
request
→ Vira Strategy
→ compact behavior plan
→ downstream chatbot / model
→ final user-visible answer
```

A behavior plan should contain only what the downstream model needs to behave correctly, such as:

- intent;
- explicit constraints;
- confirmed user preferences;
- a small number of labeled assumptions;
- response shape;
- safety or policy checks;
- verification checklist.

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

## Example: behavior-plan Strategy

```json
{
  "schemaVersion": 1,
  "strategyKey": "marketing.launch_plan.behavior_plan",
  "behaviorPointKey": "marketing.launch_plan",
  "executionMode": "STAGED",
  "resultMode": "behavior_plan",
  "goal": {
    "type": "produce",
    "artifact": "behavior-plan",
    "successCriteria": [
      "Preserve explicit launch constraints",
      "Require full-funnel coverage and measurement",
      "Do not draft the final user-visible answer"
    ]
  },
  "entryStepKey": "plan",
  "steps": [
    {
      "stableKey": "plan",
      "type": "model",
      "purpose": "Create a compact behavior plan for the downstream chatbot",
      "requires": ["context:request"],
      "produces": ["state:behaviorPlan"],
      "outputSchemaRef": "schema:behavior-plan"
    },
    {
      "stableKey": "verify",
      "type": "verify",
      "purpose": "Verify the plan is bounded, request-specific, and does not contain a full answer",
      "requires": ["state:behaviorPlan"],
      "produces": ["state:verified"],
      "verifierKeys": ["marketing.full_funnel"]
    }
  ],
  "edges": [
    {"stableKey": "plan-to-verify", "from": "plan", "to": "verify"}
  ],
  "stateSlots": [
    {
      "key": "state:behaviorPlan",
      "schemaRef": "schema:behavior-plan",
      "privacy": "tenant",
      "source": "model",
      "maxBytes": 12000
    },
    {
      "key": "state:verified",
      "schemaRef": "schema:boolean",
      "privacy": "tenant",
      "source": "derived",
      "maxBytes": 100
    }
  ],
  "contextPolicy": {"allowedRefs": ["context:request"], "maxBytes": 100000},
  "evidencePolicy": {"requiredRefs": [], "allowMissing": true},
  "toolPolicy": {"allowedToolKeys": [], "effectfulToolKeys": []},
  "generationPolicy": {"structuredOnly": true},
  "verificationPolicy": {
    "requiredVerifierKeys": ["marketing.full_funnel"],
    "requireFinalComposeVerification": false
  },
  "recoveryPolicy": {"maxTotalRecoveries": 1, "defaultAction": "block"},
  "budgets": {
    "maxStepExecutions": 5,
    "maxModelCalls": 1,
    "maxToolCalls": 0,
    "maxDecisionCalls": 0,
    "maxRepairAttempts": 1,
    "maxSerializedStateBytes": 50000
  }
}
```

For a direct response-owned example, see:

```text
examples/authoring-quality/marketing-launch.response.strategy.json
```

For a downstream-chatbot example, see:

```text
examples/authoring-quality/marketing-launch.behavior-plan.strategy.json
```

## User-owned preferences are not Strategy constants

If behavior depends on preferences such as audience, geography, budget, channels, tone, timeframe, or success metric:

- derive them from explicit user input or previously confirmed state;
- preserve unchanged preferences where relevant;
- replace them when the user changes them;
- stop applying them when the user removes them;
- do not invent missing values;
- label proposed defaults or scenarios as hypotheses.

Hard-coding a user preference into a Strategy turns personalization into policy by accident.

## Recommended authoring path

For a new Behavior Point, prefer Pack authoring.

When a Strategy is supplied as part of a Pack, Vira binds it to the relevant governed behavior lifecycle as part of installation.

Use the versioned Strategy schema supported by your Vira release. Do not invent result-mode or edge fields that are not present in the current schema.

## Public API

```text
GET  /v1/behavior-strategies
POST /v1/behavior-strategies
GET  /v1/behavior-strategies/{strategyId}
POST /v1/behavior-strategies/{strategyId}/validate
POST /v1/behavior-strategies/{strategyId}/simulate
```

## Validation versus simulation

Validation checks structural validity.

Simulation is a structural dry run. It should not be presented as proof that real model or tool providers executed.

Use runtime execution for real provider/tool calls.

## Tool safety

A Strategy can reference only tools allowed by its tool policy.

Effectful tools remain subject to authorization and policy. Strategy logic does not replace those boundaries.

## Authoring checklist

Before release, use the [Strategy authoring checklist](strategy-authoring-checklist.md).
