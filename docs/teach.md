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
→ promotion
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

The public proposal lifecycle is:

```text
evidence
→ proposal
→ review
→ evaluate
→ promote
→ explicit release
```

Promotion moves an eligible proposal forward. It does **not** silently create production authority or bypass release requirements.

## JavaScript

Submit evidence:

```ts
await vira.submitTeachEvidence({
  id: "evidence-marketing-001",
  source: "runtime",
  content: "The user corrected the launch plan because retention and measurement were missing.",
  privacy: "CONSENTED_TENANT",
  consent: true,
});
```

Create and transition a proposal:

```ts
const proposal = await vira.createTeachProposal({
  evidenceId: "evidence-marketing-001",
  controlPointId: "<behavior-point-id>",
  summary: "Launch plans should preserve full-funnel coverage and measurement.",
});

await vira.transitionTeachProposal(proposalId, "review", {
  decision: "APPROVE",
});

await vira.transitionTeachProposal(proposalId, "evaluate", {
  evaluationId,
  score: 0.94,
});

await vira.transitionTeachProposal(proposalId, "promote", {});
```

## Python

```python
client.submit_teach_evidence({
    "id": "evidence-marketing-001",
    "source": "runtime",
    "content": "The user corrected the launch plan because retention and measurement were missing.",
    "privacy": "CONSENTED_TENANT",
    "consent": True,
})

proposal = client.create_teach_proposal({
    "evidenceId": "evidence-marketing-001",
    "controlPointId": behavior_point_id,
    "summary": "Launch plans should preserve full-funnel coverage and measurement.",
})

client.transition_teach_proposal(proposal_id, "review", {"decision": "APPROVE"})
client.transition_teach_proposal(proposal_id, "evaluate", {"evaluationId": evaluation_id, "score": 0.94})
client.transition_teach_proposal(proposal_id, "promote", {})
```

Allowed transition names are currently:

```text
review
evaluate
promote
```

## HTTP

```text
POST /v1/teach/evidence
POST /v1/teach/proposals
POST /v1/teach/proposals/{proposalId}/review
POST /v1/teach/proposals/{proposalId}/evaluate
POST /v1/teach/proposals/{proposalId}/promote
POST /v1/releases
```

## MCP

The current `@tryvira/mcp` package exposes Teach and release lifecycle tools:

```text
submit_teach_evidence
create_teach_proposal
transition_teach_proposal
create_release
```

These are effectful and remain scope/authorization gated.

## Outcome-driven re-teaching

Later outcomes may justify a new proposal or re-evaluation. They should not mutate active behavior automatically.

```text
released behavior
→ runtime execution
→ outcome
→ new evidence
→ new Teach cycle
```
