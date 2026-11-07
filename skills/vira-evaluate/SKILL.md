---
name: vira-evaluate
license: "Proprietary; see LICENSE"
description: "Prepare and review Vira Behavior Evaluation or response quality checks without fabricating results."
---

# Evaluate

First distinguish Behavior Evaluation (candidate/artifact test) from Response Quality & Decision (bounded response candidate selection). Build synthetic positive, negative, boundary and adversarial cases with explicit criteria and thresholds. Bind evaluations to exact artifact identity/digest and use persisted server-returned IDs. Inspect actual returned state and receipts; do not declare a pass based on local assertions or a supplied score. Evaluation does not approve or release.

## Activate this skill when
Building evaluation datasets, running/reviewing Behavior Evaluation, comparing behavior candidates, or assessing Response Quality & Decision. Use `vira-evaluate-release` for authority/release transitions.

## Inputs and preconditions
Specify evaluation type, candidate identity/digest, objective, dataset source/consent, positive/negative/boundary/adversarial cases, criteria, threshold, provider availability, and isolation level.

## Workflow
1. Separate candidate Behavior Evaluation from response-time Quality & Decision; identify supported SDK/API calls for the chosen operation.
2. Build a small synthetic dataset with expected/forbidden behavior and measurable criteria; include baseline/ON/OFF only when the runtime supports a meaningful comparison.
3. Bind execution to the exact candidate/digest and let the server return persisted evaluation identity/status.
4. Run through the authorized isolated provider/environment; collect actual outputs, errors, latency/token fields only if returned.
5. Analyze failures and regressions against criteria; report observed numbers with sample size and provenance, or label unrun metrics unavailable.

## Deliverable and failure handling
Provide dataset, criteria, candidate binding, raw status/receipt references, and evidence-based findings. Stop if evaluation is unsupported, provider did not execute, or results are incomplete; local assertions do not equal a passed Vira evaluation or approval.

## References

- [evaluation-and-approval.md](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [decision-and-quality.md](https://github.com/hrpering/tryvira/blob/main/docs/decision-and-quality.md)
- [packs.md](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [api.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
