---
name: vira-evaluate
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Prepare and review Vira Behavior Evaluation or response quality checks without fabricating results."
---

# Evaluate behavior

First distinguish Behavior Evaluation (candidate/artifact test) from Response Quality & Decision (bounded response candidate selection). Build synthetic positive, negative, boundary and adversarial cases with explicit criteria and thresholds. Bind evaluations to exact artifact identity/digest and use persisted server-returned IDs. Inspect actual returned state and receipts; do not declare a pass based on local assertions or a supplied score. Evaluation does not approve or release.

For JavaScript, configure `VIRA_API_URL` as the API deployment root supplied by the Vira account/operator (no `/v1` suffix and not the Studio URL) and keep `VIRA_API_KEY` in the server-side environment. Construct `ViraClient` with `baseUrl: process.env.VIRA_API_URL`. Ask for the URL if it is missing; never guess it. The bundled [`examples/README.md`](examples/README.md) contains a runnable Pack-bound evaluation against the configured Vira API.

## Activate this skill when
Building evaluation datasets, running/reviewing Behavior Evaluation, comparing behavior candidates, or assessing Response Quality & Decision. Use `vira-evaluate-release` for authority/release transitions.

## Inputs and preconditions
Specify API deployment URL, credential scope, evaluation type, candidate identity/digest, objective, dataset source/consent, positive/negative/boundary/adversarial cases, criteria, threshold, provider availability, and isolation level.

## Workflow
1. Verify the API URL, package version, credential scope, and supported operation. Never infer the API host from the Studio hostname.
2. Separate candidate Behavior Evaluation from response-time Quality & Decision; identify supported SDK/API calls for the chosen operation.
3. Build a small synthetic dataset with expected/forbidden behavior and measurable criteria. Use an evaluation plan when reviewable criteria need sealing before a run.
4. When comparing OFF/current/candidate behavior, use `startComparativeEvaluation` with the documented `comparisonPlan`, read the server-owned comparison, and review persisted findings. Never submit arm outputs from the client.
5. Bind execution to the exact candidate/digest and let the server return persisted evaluation identity/status.
6. Run through the authorized isolated provider/environment; collect actual outputs, errors, latency/token fields only if returned.
7. Analyze failures and regressions against criteria; report observed numbers with sample size and provenance, or label unrun metrics unavailable.

## Implementation details

1. Build representative positive, negative, boundary, adversarial and regression cases with explicit assertions and provenance; distinguish source data from model guesses.
2. For pre-release Behavior Evaluation use JS `startEvaluation`/`getEvaluation` or Python `start_evaluation`/`get_evaluation`. Only a real server-persisted `evaluationId` matching exact artifact/digest may be passed to Pack evaluation.
3. `evaluateQuality`/`evaluate_quality` selects/abstains over bounded response candidates; it is **not** approval, release or post-model runtime PASS.
4. Actual runtime verification needs an applied Program module at `pre_model`, `pre_tool`, `post_model` or `pre_action`, a supported deterministic or explicitly configured `judge:` verifier, and a receipt bound to the *same* provider output digest.
5. Use a fair OFF vs ON baseline with same inputs/model/config; report sample sizes and real outcomes/cost/latency, not claims fabricated from source fixtures.
6. Negative: natural-language requirement-only modules, unsupported judge, incomplete worker or a different digest cannot become evaluated/verified success.
[Eval](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md) · [Runtime checks](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md).

## Deliverable and failure handling
Provide dataset, criteria, candidate binding, raw status/receipt references, and evidence-based findings. Stop if evaluation is unsupported, provider did not execute, or results are incomplete; local assertions do not equal a passed Vira evaluation or approval.

## References

- [evaluation-and-approval.md](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [decision-and-quality.md](https://github.com/hrpering/tryvira/blob/main/docs/decision-and-quality.md)
- [packs.md](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [api.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
- [Runnable Pack evaluation](https://github.com/hrpering/tryvira/blob/main/skills/vira-evaluate/examples/README.md)
