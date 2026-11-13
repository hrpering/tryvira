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
MCP:        no dedicated tool in the published package
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

Configure the SDK with `VIRA_API_URL` set to the Vira API deployment root supplied by the account/operator (no `/v1` suffix and not the Studio URL). Keep `VIRA_API_KEY` server-side. The [runnable Pack-bound evaluation resource](../skills/vira-evaluate/examples/README.md) demonstrates checking materialization and digest, creating a persisted evaluation, reading it back, and stopping before approval/release.

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

## Verification has a separate runtime lifecycle

1. **Artifact integrity:** confirm version, scope, Program and immutable digest.
2. **Behavior Evaluation:** test the candidate on selected positive/negative cases *before release*.
3. **Response Quality & Decision:** rank or reject bounded response candidates if the runtime uses this feature.
4. **Post-model Runtime Verification:** execute actual supported checks on the final provider output under the released artifact, with a real receipt and bounded repair/escalate/block policy.

The last stage cannot be inferred from the first three. A natural-language check is not automatically executable without a registered verifier. [Verification guide](runtime-verification.md) · [Verified answer handoff](verified-answer-handoff.md).

## Approval remains separate

Approval is a governed lifecycle decision. Evaluation evidence can support approval, but evaluation is not approval.

Pack lifecycle:

```text
import → install → evaluate → approve → release
```
