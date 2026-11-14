---
name: vira-debug
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Diagnose Vira SDK, API, MCP, authentication, scope, runtime, Pack, and lifecycle errors."
---

# Troubleshoot a Vira integration

Collect sanitized error code, request ID, selected surface, package version, and relevant non-secret request shape. Never ask for or print credentials. Consult the matching troubleshooting guide and surface contract. Distinguish auth, authorization/scope, capability absence, validation, idempotency, async job completion, and runtime abstention. Do not retry non-idempotent mutations blindly.

## Activate this skill when
A Vira integration or operation fails, returns an unexpected state, or appears not to apply behavior. Do not use it for greenfield integration design.

## Inputs and preconditions
Collect sanitized error code/message, request ID, operation, surface/package version, scope labels (not secret values), expected/actual status, and minimal request shape. Never ask for tokens or full production traces.

## Workflow
1. Inspect the exact sanitized failure from the real configured surface. Reproduce only in an authorized isolated non-production scope; do not invent or simulate a Vira response.
2. Walk the earliest relevant boundary: config/auth → scope/capability → validation → async/materialized state → approval/release → runtime → trace/outcome.
3. Compare request shape and installed version with the selected surface's current contract.
4. Propose the smallest fix and a single verification at the failed boundary; preserve idempotency for a safe retry.
5. Only then inspect downstream behavior; retain request/receipt correlation and redact sensitive data.

## Implementation details

1. **Admission:** inspect actual TaskRun route, server-derived tenant scope, task registration, connection and immutable plan digest. `NEEDS_CLARIFICATION`, `ABSTAIN`, `DENIED` and `UNSUPPORTED_HOST` are distinct, not 500s.
2. **Execution:** check chosen SINGLE/STRATEGY/COMPOUND/HYBRID, materialized Strategy eligibility, child task keys, server-attested host capabilities and real child receipts. `WAITING_USER`/`WAITING_HOST`/`WAITING_APPROVAL` require correct state-version continuation.
3. **Verification:** compare exact released Program/artifact digest, supported verifier checks, output digest and actual provider response. `VERIFIER_REQUIRED`, unsupported judge extension, missing final-answer readback or tampering means no verified output.
4. **Evidence:** trace observation/eventId through approved Signal mapping, Teach analysis/consent, evaluation and release. Do not conflate each stage's success.
5. Negative: don't “fix” a failed ON execution by calling `behavior-projection` and prompting the model directly.
[Fault taxonomy](https://github.com/hrpering/tryvira/blob/main/docs/troubleshooting/README.md) · [Runtime checks](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md).

## Deliverable and failure handling
Return PASS/FAIL evidence by stage, earliest failure, minimal code/config change, and one verification. Stop when evidence is insufficient; never probe another tenant, dump secrets, or claim a fix without rerunning the check.

## References

- [troubleshooting](https://github.com/hrpering/tryvira/blob/main/docs/reference/troubleshooting.md)
- [README](https://github.com/hrpering/tryvira/blob/main/docs/troubleshooting/README.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [capability-discovery](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
