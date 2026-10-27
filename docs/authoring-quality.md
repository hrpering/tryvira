# Authoring quality guide

Vira objects are easy to make syntactically valid and still make conceptually weak.

The quality bar is not “does the field exist?” It is whether the object creates a stable, reviewable, testable boundary that another team can understand later.

This guide shows **generic / weak** examples beside **production-quality** examples.

> These examples teach authoring quality. They do not replace the versioned schema for your Vira deployment.

## Quality principles

A strong Vira object should be:

1. **Specific** — narrow enough to represent one kind of governed work.
2. **Stable** — keys describe the business/task boundary, not the current implementation.
3. **Observable** — requirements can be checked in an output, trace, signal, or evaluation.
4. **Distinct** — neighboring tasks have clear positive and negative boundaries.
5. **Reviewable** — a human can explain why the behavior exists.
6. **Testable** — success and failure can be represented as cases, not vibes.
7. **Release-safe** — authoring does not silently bypass evaluation, approval, or release.

---

## Semantic Task quality

A Semantic Task answers:

> What kind of work is the user asking the AI to do?

### Weak / generic

```yaml
- taskKey: marketing.help
  description: Help with marketing
  aliases:
    - marketing
    - campaign
    - plan
  examples:
    - Help me with marketing
    - Make a campaign
```

Why it is weak:

- `marketing.help` is too broad;
- aliases overlap with many unrelated tasks;
- examples do not define a useful boundary;
- there are no negative examples;
- the resolver has little evidence for when **not** to select it.

### Production-quality

```yaml
- taskKey: marketing.launch_plan
  description: >-
    Create a cross-funnel launch plan for a product or service, including
    stage objectives, channel roles, sequencing, and measurement.
  aliases:
    - launch strategy
    - go-to-market plan
    - gtm plan
    - product launch plan
  examples:
    - Create a launch plan for our new subscription product
    - Build a go-to-market plan for a membership service
    - Plan the launch across awareness, consideration, conversion, and retention
  negativeExamples:
    - Rewrite this ad headline
    - Analyze last month's campaign performance
    - Create five social media captions
    - Summarize this market research report
```

Why it is stronger:

- the task boundary is concrete;
- positive examples vary in wording while preserving intent;
- negative examples separate adjacent marketing tasks;
- the key can remain stable even if the implementation changes.

### Quality check

A Semantic Task is probably too generic if the same task would reasonably contain more than one independent workflow such as “plan”, “analyze”, “rewrite”, and “report”.

---

## Behavior Point quality

A Behavior Point answers:

> Where should governed behavior attach for this task?

### Weak / generic

```yaml
- key: marketing.good_answer
  taskKey: marketing.launch_plan
  requirement: Make the answer detailed and high quality
  verification: Check that the answer is good
```

Why it is weak:

- `good_answer` is not a stable business boundary;
- “detailed” and “high quality” are subjective;
- verification merely restates the requirement;
- the point does not explain what behavior must remain consistent.

### Production-quality

```yaml
- key: marketing.launch_plan
  taskKey: marketing.launch_plan
  requirement: >-
    Produce a full-funnel launch plan that covers awareness, consideration,
    conversion, and retention, and gives every stage a measurable objective.
  verification: >-
    Confirm that every required funnel stage is present and that each stage
    includes an objective plus a measurement approach. Reject invented
    performance results presented as observed facts.
```

Why it is stronger:

- the key expresses the governed task, not a quality adjective;
- the requirement is observable;
- the verification can be translated into evaluation cases;
- the point is model- and provider-independent.

### Avoid two opposite failures

**Too generic**

```text
Be helpful, accurate, and detailed.
```

**Too implementation-specific**

```text
Always call model-x with temperature 0.2, then run internal_tool_17.
```

A Behavior Point should define **governed behavior**, not freeze one implementation unless that implementation is itself the policy requirement.

---

## Behavior Program quality

A Behavior Program answers:

> Which governed checks or transformations apply, and at which stage?

### Weak / generic

```json
{
  "rubric": ["Be good", "Be complete"],
  "modules": [
    {
      "kind": "verification",
      "stableKey": "quality-check",
      "stage": "post_model",
      "requirement": "Check the answer"
    }
  ]
}
```

### Stronger

```json
{
  "rubric": [
    "Cover awareness, consideration, conversion, and retention",
    "Give each funnel stage a measurable objective",
    "Do not present invented performance numbers as observed results"
  ],
  "antiPatterns": [
    "Acquisition-only launch plan",
    "Channel list without funnel role or measurement",
    "Fabricated historic performance"
  ],
  "modules": [
    {
      "kind": "judgment",
      "stableKey": "marketing.launch.full-funnel",
      "stage": "post_model",
      "requirement": "The plan covers all required funnel stages"
    },
    {
      "kind": "verification",
      "stableKey": "marketing.launch.measurement",
      "stage": "post_model",
      "requirement": "Every required stage includes an objective and measurement approach"
    }
  ]
}
```

Quality comes from mapping each requirement to a reasoned module, not from accumulating generic rules.

---

## Strategy quality

A Strategy answers:

> How should this governed task proceed when one model call is not enough?

A Strategy is **not automatically better** because it has more steps.

### Weak / generic Strategy

```json
{
  "strategyKey": "marketing.launch_plan.generic",
  "behaviorPointKey": "marketing.launch_plan",
  "executionMode": "STAGED",
  "goal": {
    "type": "produce",
    "artifact": "answer",
    "successCriteria": ["Create a high quality answer"]
  },
  "entryStepKey": "generate",
  "steps": [
    {
      "stableKey": "generate",
      "type": "model",
      "purpose": "Generate answer",
      "requires": ["context:request"],
      "produces": ["state:draft"]
    }
  ],
  "edges": []
}
```

Why it is weak:

- it adds Strategy machinery without a real multi-step need;
- success criteria are subjective;
- there is no verification boundary;
- there is no explicit final composition step;
- failure/recovery/budget behavior is undefined in the example.

### Production-quality Strategy

See [`examples/authoring-quality/marketing-launch.production.strategy.json`](../examples/authoring-quality/marketing-launch.production.strategy.json).

The stronger version has:

- task-specific success criteria;
- draft → verify → compose separation;
- explicit state contracts;
- required verifier keys;
- bounded recovery;
- bounded model/tool/step budgets;
- final verification before composition.

### When not to use a Strategy

Do not create a Strategy merely because the task is important.

Prefer a simpler Program when:

- one model call plus post-model verification is enough;
- there is no meaningful state transition;
- there is no branching, tool boundary, recovery loop, or staged composition to govern.

---

## Signal quality

A Signal answers:

> What typed evidence should behavior logic be able to consume?

### Weak

```yaml
stableKey: bad_response
valueType: boolean
description: The response was bad
```

Problems:

- vague meaning;
- unclear producer;
- unclear evidence;
- hard to distinguish from subjective reviewer preference.

### Stronger

```yaml
stableKey: quality.missing_measurement
version: 1
valueType: boolean
description: The response omitted a required measurement approach
required: false
sensitivity: tenant
sourcePolicy: observation
```

A strong Signal has a stable meaning that future producers can emit consistently.

---

## Evaluation quality

Weak evaluation:

```text
Does the output look good?
```

Strong evaluation cases:

```text
Case A: all four funnel stages + measurement → pass
Case B: awareness + conversion only → fail
Case C: all stages but no measurement → fail
Case D: fabricated historical ROI presented as fact → fail
Case E: user asks only for headline rewrite → task should not route here
```

Include positive, negative, boundary, and adversarial cases where the risk justifies them.

---

## Cross-domain examples

### Support

**Weak task**

```text
support.help
```

**Stronger task**

```text
support.refund_explanation
```

Boundary: explain refund eligibility or policy using available information. Do not silently turn an explanation task into an effectful refund action.

### Research

**Weak Behavior Point**

```text
research.accurate
```

**Stronger Behavior Point**

```text
research.source_claim
```

Requirement: distinguish sourced claims, inference, and unresolved uncertainty.

### Operations

**Weak rule**

```text
Be careful with tools.
```

**Stronger Behavior Point**

```text
operations.irreversible_action
```

Requirement: surface approval before an irreversible or externally effectful action when policy requires it.

---

## Authoring scorecard

Before evaluation, score each candidate from 0–2 on the following dimensions:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Boundary | vague | mostly clear | narrow and distinct |
| Stable naming | implementation-specific | acceptable | business/task stable |
| Observability | subjective | partially testable | directly testable |
| Negative boundary | missing | implicit | explicit examples/cases |
| Verification | restates requirement | some checks | objective pass/fail checks |
| Runtime safety | unspecified | partly bounded | policy/release-aware and bounded |
| Maintainability | duplicated/overfit | workable | reusable and explainable |

A candidate that scores poorly should be refined before it becomes a release candidate.

---

## Ready-to-use examples

See [`examples/authoring-quality/`](../examples/authoring-quality/) for:

- weak vs strong Semantic Tasks;
- weak vs strong Behavior Points;
- generic vs production-quality Strategies;
- quality review notes.

## AI-assisted authoring

Use the [AI Prompt Library](ai-prompts/README.md) for prompts that:

- create Semantic Tasks;
- create or deepen Behavior Points;
- create Behavior Programs;
- create or deepen Strategies;
- propose Signals and evaluation cases;
- assemble a governed Pack candidate;
- review an existing authoring set against this quality bar.
