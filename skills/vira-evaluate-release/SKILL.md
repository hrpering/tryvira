---
name: vira-evaluate-release
license: "Proprietary; see LICENSE"
description: "Evaluate Vira behavior and perform separate approval/release steps using documented contracts."
---

# Evaluate Release

Use the Behavior Evaluation contract and bind evaluation to the exact candidate/artifact. Review dataset, criteria, threshold, status, scope, and artifact digest before proceeding. Quality & Decision is a different response-time operation and does not grant release authority. Approval and release are distinct explicit authorized transitions; do not infer a pass or deploy after evaluation automatically.

## Activate this skill when
A user asks to interpret a Vira evaluation and determine what must happen before a candidate can be approved/released. Do not use it as permission to perform the release.

## Inputs and preconditions
Require candidate ID/digest, evaluation ID/status, scope, criteria/threshold, regression results, release eligibility, and an authorized reviewer/operator decision.

## Workflow
1. Read persisted evaluation state from the exact supported surface and verify candidate ID/digest binding.
2. Compare results with declared criteria; check failed cases, regressions, dataset provenance, and scope.
3. Distinguish Behavior Evaluation from Response Quality & Decision and runtime receipts.
4. For a revision path, create/read an improvement proposal, review it, create a new immutable Behavior Revision Candidate, and evaluate that candidate against a non-empty dataset. Do not mutate the parent revision.
5. If accepted and the workflow requires a Pack, create a Pack Revision, inspect its diff, validate/request approval/approve/release as separately authorized, and materialize only the approved exact revision.
6. Prepare a concise approval packet with evidence, risks, exact digest and rollback target; request explicit authorization before an effectful approval/release call.
7. After separately authorized transitions, verify server-returned approval/release identity and runtime eligibility.

## Production-aligned implementation playbook

1. Verify persisted evaluation and *exact* immutable candidate ID/digest plus negative/regression results; fail if changed since evaluation.
2. Prepare human review with scope, effects, required Signal mappings, verifier capabilities, impact, rollback target and any missing permissions.
3. Approval and release are separate authorized calls; Teach promotion, Strategy activation, Pack installation and a quality score are not production grants.
4. Post-release, exercise an authorized synthetic user request via **AUTO TaskRun**; inspect selected task/mode, real child execution, Program checks, verified provider answer identity and final receipt. If the last handoff is missing, report **unverified**, not PASS.
5. Negative: stale digest, unauthorized reviewer, wrong tenant, unavailable judge and missing host attestation block release or verified response.
[Release guide](https://github.com/hrpering/tryvira/blob/main/docs/release.md) · [Verified output](https://github.com/hrpering/tryvira/blob/main/docs/verified-answer-handoff.md).

## Deliverable and failure handling
Return PASS/FAIL/INCOMPLETE with cited evidence, exact identity, and next authorized action. Stop on missing/failed/stale evaluation, digest mismatch, failed threshold, or absent approval. Never create a client-side pass or automatic release.

## References

- [evaluation-and-approval](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [decision-and-quality](https://github.com/hrpering/tryvira/blob/main/docs/decision-and-quality.md)
- [release](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
- [api](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
