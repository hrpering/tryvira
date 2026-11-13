---
name: vira-release
license: "Proprietary; see LICENSE"
description: "Prepare a separately authorized Vira behavior approval, release, deployment check, or rollback."
---

# Release

Verify the exact canonical identity and digest, current scope, evaluation result, approval evidence, and release eligibility. Present the planned transition and its likely effect for explicit user/operator authorization. Call only the documented surface operation after authorization; keep approval and release separate. Afterward verify server-returned release identity, runtime eligibility, traces/receipts, and deployment health. Rollback must use a documented prior eligible revision, never deletion or client-invented state.

## Activate this skill when
Preparing or carrying out a separately authorized approval, release, deployment check, or rollback of Vira behavior. Do not use it to author behavior or treat evaluation as authorization.

## Inputs and preconditions
Require exact canonical resource/revision identity and digest, target scope/environment, persisted evaluation, approval evidence, operation support, impact, and explicit authorization for the requested mutation.

## Workflow
1. Read current candidate/release state and verify the digest, evaluation binding, scope, and eligibility.
2. Present the exact planned transition and expected effect; stop for explicit user/operator authorization.
3. Invoke only the documented approval/release operation on a supported surface. The published client has no generic `rollback` method; restore a previously eligible canonical identity through the release contract.
4. Read back the resulting release/deployment identity and status; do not infer success from an HTTP response alone.
5. Record comparison and authoritative health evidence where supported; these records do not deploy or promote by themselves.
6. Verify runtime eligibility and trace/receipt; for rollback, confirm the returned state resolves to the known prior revision.

## Production-aligned implementation playbook

1. Review evaluated immutable artifact, target tenant/environment, authority digests and prior eligible revision before any mutation. Present explicit approval and release scope for a separate operator decision.
2. Apply only documented authorize/approve/release operations; preserve server-returned IDs and confirm the deployment postcondition. There is no generic SDK `rollback()` method; restoring previous identity must use a supported release contract and explicit authorization.
3. After a real release, submit a non-production **AUTO TaskRun** and verify release eligibility and child executor. Post-model verification is a separate check; the task's COMPLETED state alone is not a verified chatbot answer.
4. When available, inspect shadow/canary and rollback signals with actual operator readback. Missing host capabilities or Signal mappings may make the release ineligible at runtime.
5. Negative: evaluation PASS without approval, missing verifier or stale authority must not become auto-activation.
[Release](https://github.com/hrpering/tryvira/blob/main/docs/release.md).

## Deliverable and failure handling
Report the before/after state, exact IDs/digest, evidence, and residual risk. Stop on missing approval, stale artifact, scope mismatch, unsupported operation, or uncertain prior revision; never delete active behavior as rollback.

## References

- [evaluation-and-approval.md](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [release.md](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
- [runtime.md](https://github.com/hrpering/tryvira/blob/main/docs/runtime.md)
- [traces.md](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
- [security-model.md](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
