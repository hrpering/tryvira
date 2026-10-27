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
8. **Ownership-aware** — the object makes clear which layer owns state, planning, and final output.

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

Problems:

- too broad;
- aliases overlap with unrelated tasks;
- no useful negative boundary;
- resolver gets little evidence for when **not** to select it.

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

- concrete task boundary;
- positive examples vary wording while preserving intent;
- negative examples separate adjacent tasks;
- key can stay stable while implementation changes.

A Semantic Task is probably too generic if it would reasonably contain multiple independent workflows such as plan, analyze, rewrite, and report.

---

## Behavior Point quality

A Behavior Point answers:

> Where should governed behavior attach for this task?

### Weak

```yaml
- key: marketing.good_answer
  taskKey: marketing.launch_plan
  requirement: Make the answer detailed and high quality
  verification: Check that the answer is good
```

### Stronger

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

A Behavior Point should define governed behavior, not freeze a model/provider/tool implementation unless that implementation is itself a policy requirement.

---

## User-owned preferences are state, not policy constants

A common authoring mistake is hard-coding user preferences into a Strategy or Behavior Point.

For example, this is weak when those values actually belong to the user:

```text
Always target Germany.
Always use Meta + Google.
Always optimize for ROAS.
Use a 60/40 budget split.
```

If geography, channels, KPI, budget, tone, audience, timeframe, or similar values are user-owned preferences, the governed behavior should instead require that the system:

- derive them only from explicit user input or previously confirmed state;
- preserve unchanged preferences when relevant;
- replace a preference when the user changes it;
- stop applying a preference when the user removes it;
- never invent a missing preference;
- ask only when a missing value materially changes the result;
- label a proposed default or scenario as a hypothesis.

Good evaluation cases include:

```text
User previously prefers channel A, says nothing new → preserve A
User changes A to B → use B, not stale A
User removes budget preference → do not keep using old budget
No KPI supplied → do not invent one as a user preference
Suggested KPI scenario → label as recommendation/hypothesis
```

This keeps personalization user-owned rather than accidentally turning it into product policy.

---

## Behavior Program quality

A Behavior Program answers:

> Which governed checks or transformations apply, and at which stage?

### Weak

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

Quality comes from mapping requirements to justified modules, not from accumulating generic rules.

---

## Strategy quality

A Strategy answers:

> How should this governed task proceed when one model call is not enough?

A Strategy is **not automatically better** because it has more steps.

### First decision: who owns final output?

Before drawing the graph, choose the result contract:

```text
response      → Vira owns final answer
behavior_plan → downstream chatbot/model owns final prose
```

See [Strategy result modes](strategy-result-modes.md).

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

- adds Strategy machinery without a real orchestration need;
- vague success criteria;
- no clear output owner;
- no verification boundary;
- no bounded recovery/budget story.

### Production-quality response Strategy

Use when Vira owns the final artifact:

```text
draft → verify → compose → final response
```

See [`marketing-launch.response.strategy.json`](../examples/authoring-quality/marketing-launch.response.strategy.json).

### Production-quality behavior-plan Strategy

Use when Vira controls behavior for a downstream chatbot:

```text
plan → verify → downstream model → final response
```

See [`marketing-launch.behavior-plan.strategy.json`](../examples/authoring-quality/marketing-launch.behavior-plan.strategy.json).

A strong behavior plan contains only bounded intent, constraints, confirmed preferences, assumptions, response shape, safety checks, and verification requirements. It does **not** contain a second full answer.

### When not to use a Strategy

Prefer a simpler Program when:

- one model call plus post-model verification is enough;
- there is no meaningful state transition;
- there is no branching, tool boundary, recovery loop, staged composition, or behavior-plan handoff to govern.

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

A strong Signal has a stable meaning that future approved producers can emit consistently.

---

## Evaluation quality

Weak evaluation:

```text
Does the output look good?
```

Strong cases:

```text
Case A: all required funnel stages + measurement → pass
Case B: awareness + conversion only → fail
Case C: all stages but no measurement → fail
Case D: fabricated historical ROI presented as fact → fail
Case E: user asks only for headline rewrite → task should not route here
Case F: confirmed user preference changes → new value must replace old value
Case G: removed user preference → old value must not persist
Case H: behavior_plan contains a full drafted answer → fail
```

Include positive, negative, boundary, and adversarial cases where the risk justifies them.

---

## Cross-domain examples

### Support

Weak task: `support.help`

Stronger task: `support.refund_explanation`

Boundary: explain refund eligibility using available information. Do not silently turn an explanation task into an effectful refund action.

### Research

Weak Point: `research.accurate`

Stronger Point: `research.source_claim`

Requirement: distinguish sourced claims, inference, and unresolved uncertainty.

### Operations

Weak rule: `Be careful with tools.`

Stronger Point: `operations.irreversible_action`

Requirement: surface approval before an irreversible or externally effectful action when policy requires it.

---

## Authoring scorecard

Score each candidate from 0–2:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Boundary | vague | mostly clear | narrow and distinct |
| Stable naming | implementation-specific | acceptable | business/task stable |
| Observability | subjective | partially testable | directly testable |
| Negative boundary | missing | implicit | explicit examples/cases |
| Verification | restates requirement | some checks | objective pass/fail checks |
| Output ownership | unclear | implied | explicit `response` / `behavior_plan` contract |
| Preference ownership | hard-coded/stale | partial | explicit, updateable, removable |
| Runtime safety | unspecified | partly bounded | release/policy-aware and bounded |
| Maintainability | duplicated/overfit | workable | reusable and explainable |

A candidate that scores poorly should be refined before it becomes a release candidate.

---

## Ready-to-use examples

See [`examples/authoring-quality/`](../examples/authoring-quality/) for:

- weak vs strong Semantic Tasks;
- weak vs strong Behavior Points;
- generic Strategy;
- production response Strategy;
- production behavior-plan Strategy;
- quality review notes.

## AI-assisted authoring

Use the [AI Prompt Library](ai-prompts/README.md) for prompts that create or review Tasks, Points, Programs, Strategies, Signals, evaluations, and governed Pack candidates.
