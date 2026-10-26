# Behavior Strategies

A Behavior Strategy defines a bounded multi-step execution approach for a Behavior Point.

It answers:

> How should this governed task proceed?

It does not replace hard policy authority.

## Execution modes

- `INLINE`
- `STAGED`
- `AGENTIC`

## Step types

Supported strategy concepts include:

- `model`
- `tool`
- `branch`
- `verify`
- `compose`
- `ask_user`
- `decision`
- `transform`

## Example shape

```json
{
  "schemaVersion": 1,
  "strategyKey": "marketing.launch_plan.default",
  "behaviorPointKey": "marketing.launch_plan",
  "executionMode": "STAGED",
  "goal": {
    "type": "produce",
    "artifact": "launch-plan",
    "successCriteria": [
      "Cover the full funnel",
      "Include measurement for every stage"
    ]
  },
  "entryStepKey": "draft",
  "steps": [
    {
      "stableKey": "draft",
      "type": "model",
      "purpose": "Draft the launch plan",
      "requires": ["context:request"],
      "produces": ["state:draft"]
    },
    {
      "stableKey": "verify",
      "type": "verify",
      "purpose": "Verify full-funnel coverage",
      "requires": ["state:draft"],
      "produces": ["state:verified"],
      "verifierKeys": ["marketing.full_funnel"]
    },
    {
      "stableKey": "compose",
      "type": "compose",
      "purpose": "Return the verified plan",
      "requires": ["state:verified"],
      "produces": ["state:final"],
      "verifierKeys": ["marketing.full_funnel"]
    }
  ],
  "edges": [
    {
      "stableKey": "draft-to-verify",
      "from": "draft",
      "to": "verify"
    },
    {
      "stableKey": "verify-to-compose",
      "from": "verify",
      "to": "compose"
    }
  ],
  "stateSlots": [
    {
      "key": "state:draft",
      "schemaRef": "schema:launch-plan",
      "privacy": "tenant",
      "source": "model",
      "maxBytes": 100000
    },
    {
      "key": "state:verified",
      "schemaRef": "schema:launch-plan",
      "privacy": "tenant",
      "source": "derived",
      "maxBytes": 100000
    },
    {
      "key": "state:final",
      "schemaRef": "schema:launch-plan",
      "privacy": "public",
      "source": "derived",
      "maxBytes": 100000
    }
  ],
  "contextPolicy": {
    "allowedRefs": ["context:request"],
    "maxBytes": 100000
  },
  "evidencePolicy": {
    "requiredRefs": [],
    "allowMissing": true
  },
  "toolPolicy": {
    "allowedToolKeys": [],
    "effectfulToolKeys": []
  },
  "generationPolicy": {
    "structuredOnly": true
  },
  "verificationPolicy": {
    "requiredVerifierKeys": ["marketing.full_funnel"],
    "requireFinalComposeVerification": true
  },
  "recoveryPolicy": {
    "maxTotalRecoveries": 1,
    "defaultAction": "block"
  },
  "budgets": {
    "maxStepExecutions": 8,
    "maxModelCalls": 1,
    "maxToolCalls": 0,
    "maxDecisionCalls": 0,
    "maxRepairAttempts": 1,
    "maxSerializedStateBytes": 500000
  }
}
```

The server adds and validates immutable identity, program binding, provenance, and digests.


## Recommended authoring path

For a new Behavior Point, prefer Pack authoring.

When a Strategy definition is supplied as part of the SDK Pack `objects` payload, Vira binds it to the materialized Behavior Program and adds the governed program binding and Pack provenance. This avoids asking the application developer to manufacture server-owned digests.

See:

```text
examples/strategy/marketing-launch.strategy.json
tutorials/marketing-agent/05-pack-lifecycle.mjs
```

For direct `POST /v1/behavior-strategies`, the request uses the server-versioned complete Strategy definition, including its valid program binding. Use direct authoring only when those identifiers come from Vira rather than being invented by the client.

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

Use runtime execution for real calls.

## Tool safety

A strategy can reference only tools allowed by its tool policy.

Hard authority should stay outside strategy heuristics.
