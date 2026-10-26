# How Vira works

```mermaid
flowchart TD
    A[Connect AI system] --> B[Observe evidence]
    B --> C[Resolve task]
    C --> D[Behavior Point]
    D --> E[Behavior / Strategy]
    B --> F[Teach proposal]
    F --> G[Review]
    G --> H[Evaluate]
    H --> I[Approve]
    I --> J[Release]
    J --> K[Runtime]
    K --> L[Simple trace]
    L --> B
```

## Connect

Use the SDK or another supported integration boundary.

## Observe

Send supported model responses, user feedback, and business outcomes.

Observation is evidence. It is not authority.

## Resolve

Semantic resolution identifies an eligible task. A resolver may select, abstain, or return no match.

## Attach behavior

A Behavior Point connects a task to governed behavior.

## Teach

Evidence may produce a proposal.

A proposal is not automatically active.

## Evaluate

Test the candidate.

## Approve

Human or explicit product approval remains a separate gate where required.

## Release

A released artifact becomes eligible for runtime.

## Runtime

The runtime resolves behavior through the governed boundary.

## Trace

A developer sees a compact explanation of what was applied.
