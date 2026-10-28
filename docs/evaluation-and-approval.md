# Evaluation and approval

Vira has two different evaluation concerns. Keeping them separate prevents a response score from accidentally becoming production authority.

## 1. Behavior Evaluation

Behavior Evaluation tests a candidate behavior/artifact before approval and release.

API:

```text
POST /v1/evaluations
GET  /v1/evaluations/{evaluationId}
```

SDK:

```text
JavaScript: startEvaluation / getEvaluation
Python:     start_evaluation / get_evaluation
MCP:        start_evaluation
```

Conceptually:

```text
candidate behavior
→ dataset + assertions
→ evaluation result
→ approval decision
→ release
```

A passing evaluation means the candidate passed configured checks. It does **not** automatically mean the candidate must become production behavior.

## 2. Response Quality Evaluation

Response Quality evaluates a bounded set of response candidates during a response/repair decision path.

```text
candidate responses
→ quality evidence
→ ordering / eligibility
→ select OR abstain
```

Current surfaces:

```text
JavaScript: evaluateQuality
Python:     evaluate_quality
HTTP:       POST /v1/quality/evaluate
MCP:        no dedicated tool
```

This layer does not grant behavior authority. See [Decision & response quality](decision-and-quality.md).

## Approval remains separate

Approval is a governed lifecycle decision. Evaluation evidence can support approval, but evaluation is not approval.

Pack lifecycle:

```text
import → install → evaluate → approve → release
```
