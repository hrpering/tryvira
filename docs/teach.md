# Teach

Teach turns evidence into a reviewable behavior proposal.

It does not silently rewrite production behavior.

## Lifecycle

```text
evidence
→ proposal
→ review
→ evaluation
→ promotion
→ governed release path
```

## Evidence

Evidence may come from:

- supported runtime observations;
- user feedback;
- business outcomes;
- admitted conversations;
- approved integration sources.

## Submit evidence

Public API:

```text
POST /v1/teach/evidence
```

Example:

```json
{
  "id": "evidence-marketing-001",
  "source": "runtime",
  "content": "The user corrected the launch plan because retention and measurement were missing.",
  "privacy": "CONSENTED_TENANT",
  "consent": true
}
```

Consent and privacy are part of the evidence boundary.

## Conversation evidence

The Teach API also supports normalized conversation evidence.

Do not send entire conversations by default.

Send only data required for the approved learning workflow.

## Create a proposal

Conceptual proposal input:

```json
{
  "evidenceId": "evidence-marketing-001",
  "controlPointId": "<behavior-point-id>",
  "summary": "Launch plans should cover the full funnel and measurement.",
  "evidenceIds": [
    "evidence-marketing-001"
  ]
}
```

## Review

A proposal should be explicitly approved or rejected.

## Evaluate

Evaluation attaches a score and evaluation identity to the proposal.

## Promote

Promotion moves a sufficiently evaluated proposal forward.

Promotion still does not skip evaluation, approval, or release checks.

## Data handling

Teach evidence should contain only the information required for the approved workflow.
Use synthetic or publishable data in examples, demos, and public issue reports.
