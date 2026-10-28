# Teach AI

Teach AI turns admitted runtime evidence into **reviewable behavior proposals**.

Its purpose is to reduce repeated manual prompt/policy maintenance without allowing a model to silently rewrite production behavior.

## Full lifecycle

```text
observations / feedback / outcomes / approved context
→ evidence admission
→ related Signal + context resolution
→ proposal synthesis
→ review
→ Behavior Evaluation
→ approval / promotion
→ explicit release
→ runtime result
→ outcome attribution
→ re-evaluation / new Teach cycle
```

## Evidence first

Teach starts from evidence, not a blank “improve yourself” request. Evidence may come from model observations, user corrections, business outcomes, admitted conversations, or approved integration sources.

Every proposal should remain traceable to the admitted evidence and scope used to produce it.

## Signal intelligence

Teach may discover that useful evidence is not yet represented by a governed Signal. Missing Signals should enter the Signal discovery/review/mapping lifecycle instead of being silently promoted to production facts.

## Proposal synthesis is not authority

AI-assisted synthesis may propose a Behavior Point change, Program change, Strategy change, example/anti-pattern, Signal use, or evaluation case.

```text
AI proposal
≠ released behavior
```

The normal path remains:

```text
proposal → review → evaluate → approve → release
```

## Submit Teach evidence

JavaScript:

```ts
await vira.submitTeachEvidence({
  id: "evidence-marketing-001",
  source: "runtime",
  content: "The user corrected the launch plan because retention and measurement were missing.",
  privacy: "CONSENTED_TENANT",
  consent: true,
});
```

Python:

```python
client.submit_teach_evidence({
    "id": "evidence-marketing-001",
    "source": "runtime",
    "content": "The user corrected the launch plan because retention and measurement were missing.",
    "privacy": "CONSENTED_TENANT",
    "consent": True,
})
```

HTTP:

```text
POST /v1/teach/evidence
```

## MCP status

The current MCP package does not expose a dedicated Teach evidence tool. Teach is available through SDK/HTTP surfaces; MCP does expose observation, discovery, Signal review, evaluation, Pack, and runtime tools that participate in adjacent governed workflows.

## Outcome-driven re-teaching

Later outcomes may justify a new proposal or re-evaluation. They should not mutate active behavior automatically.

```text
released behavior
→ runtime execution
→ outcome
→ new evidence
→ new Teach cycle
```
