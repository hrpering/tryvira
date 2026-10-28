# Decision & response quality

Vira separates **response quality evidence** from **behavior authority**.

The response-quality layer evaluates a bounded candidate set against explicit constraints. A decision step can then select an eligible candidate or abstain when no candidate is acceptable.

```text
model response
→ bounded repair/candidate set
→ quality evaluation
→ policy/eligibility filter
→ selected candidate OR abstention
```

## What it is for

Use this layer when an application has a bounded set of candidate responses and needs an explicit, inspectable choice instead of “ask another model and hope.”

Typical checks can include required concepts/terms, forbidden claims, empty/generic output, excessive length, unsupported claims, and application-defined thresholds.

The quality evaluator scores evidence. It does not invent facts, release behavior, or bypass runtime authority.

## JavaScript

```ts
const result = await vira.evaluateQuality({
  request: "Evaluate the risks and next steps",
  candidates: [
    { id: "initial", output: "Short generic answer" },
    { id: "repair", output: "Evaluate risks and next steps with explicit assumptions." },
  ],
  allowedIds: ["initial", "repair"],
  requiredTerms: ["risks", "next steps"],
  threshold: 0.7,
});
```

## Python

```python
result = client.evaluate_quality({
    "request": "Evaluate the risks and next steps",
    "candidates": [
        {"id": "initial", "output": "Short generic answer"},
        {"id": "repair", "output": "Evaluate risks and next steps with explicit assumptions."},
    ],
    "allowedIds": ["initial", "repair"],
    "requiredTerms": ["risks", "next steps"],
    "threshold": 0.7,
})
```

## HTTP

```text
POST /v1/quality/evaluate
```

## MCP

There is no dedicated response-quality MCP tool in the current package. MCP clients should not assume that every SDK operation has a tool equivalent.

## Select or abstain

A healthy decision path supports abstention. If no candidate satisfies the configured quality and policy boundary, “no acceptable candidate” is a valid result.

This is different from Behavior Evaluation, which tests whether a behavior/artifact is suitable to move through approval and release. See [Evaluation and approval](evaluation-and-approval.md).
