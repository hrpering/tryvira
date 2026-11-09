---
name: vira-full-lifecycle
license: "Proprietary; see LICENSE"
description: "Plan and execute an evidence-backed Vira behavior lifecycle from scoped connection through evaluation, approval, runtime verification, Teach revision, and rollback readiness."
---

# Full Lifecycle

Coordinate a user's complete governed behavior task across supported Vira surfaces. Start by identifying which stages they requested and which are safe/authorized to execute. A lifecycle is a set of separate persisted transitions; semantic selection, proposal review, materialization, activation, evaluation, release, runtime use, and rollback are not interchangeable.

## Activate this skill when
The user asks for an end-to-end Vira outcome, such as connecting an app, authoring governed behavior, evaluating it, and preparing or performing a release. Route isolated SDK errors or one artifact operation to a specialist skill. Never use this skill to bypass approval or production controls.

## Inputs and preconditions
Inspect the application and gather the goal, stack, selected surface, `VIRA_API_URL` API deployment root, organization/project/environment scope, caller identity/capabilities, behavior and policy requirements, admitted evidence source, candidate/revision identity, evaluation constraints, reviewer, runtime integration point, and rollback target. The API root is not the Studio URL and must not include `/v1`; ask for it if missing. Keep `VIRA_API_KEY` in server-side secret storage. Use synthetic data and a non-production scope by default. Treat production mutations as requiring explicit authorization and the product's own permissions/approval gates.

## Workflow

### Specialist routing and handoff

Use `vira-lifecycle` for a plan-only review and this skill to coordinate execution specialists; do not ask one specialist to silently cross its authority boundary. Carry a compact handoff between stages with the selected surface, API root, scope, server-returned IDs/digests, persisted status, evidence, and the next authorized transition.

| Stage | Skill to invoke | Handoff needed to continue |
| --- | --- | --- |
| Choose integration and inspect access | `vira-get-started`, then `vira-integrate-app` | Stack, API root, scoped capability evidence, and whether access is actually open |
| Install packages or use a specific surface | `vira-npm-cli`; then one of `vira-js-sdk`, `vira-python-sdk`, `vira-http-api`, or `vira-mcp` | Registry/package version, chosen surface, method/tool contract, and safe config names |
| Implement a framework boundary | `vira-framework-integration` | Server-side call site, provider path, fail-closed behavior, and build/live verification status |
| Author behavior | `vira-author-behavior`; optionally `vira-signals` or `vira-strategies` | Reviewed task/point/program/strategy or signal IDs, schema validation, and unresolved policy questions |
| Build, import, and materialize a Pack | `vira-build-pack`, then `vira-packs` | Manifest/objects, conflict review, Pack ID/digest, variables, and persisted materialization receipt |
| Evaluate candidate or response | `vira-evaluate`; use `vira-evaluate-release` for immutable revision candidates | Persisted evaluation ID/status bound to the exact candidate and digest; keep quality decisions separate |
| Approve and release | `vira-release` | Exact reviewed identity/digest, evidence, rollback target, and explicit authorization |
| Apply and inspect behavior | `vira-runtime` | Runtime decision, request/receipt IDs, authority digest, and app-side handling of deny/abstain/error |
| Collect evidence and propose change | `vira-observe-teach` | Admitted evidence IDs, consent basis, proposal/analysis ID and persisted state; promotion is not release |
| Optional UI workflow or fault finding | `vira-studio` or `vira-debug` | Observed UI state or sanitized failing boundary; never infer Studio behavior or fabricate service output |

If the product access notice says access is closed, stop live execution at configuration/contract review. Do not use a production credential or turn build checks into a live-completion claim.

### 1. Establish scope and supported surfaces
1. Inspect the repository, runtime architecture, installed Vira client versions, and current public capability matrix.
2. Query documented capability discovery for the selected scope where available. For MCP, initialize and read `tools/list`; never infer that an SDK/API operation exists in MCP.
3. Connect/register only through the documented surface. Read back the system and scope binding. Keep credentials in server-side environment/secret management.
4. Create a checklist with each stage, operation surface, returned identity/status, evidence, required authority, and verification result.

### 2. Gather and author behavior
5. Collect only admitted, consented, minimized observations/feedback/outcomes. Retain evidence references and redact unnecessary personal or customer content.
6. Identify or create the Semantic Task and Behavior Point using the current SDK/API schema. Separate task meaning from the governed point and its policy/scope.
7. Add a Program or Strategy only when the requirement needs its documented composition/selection/execution behavior. Validate and structurally simulate separately; simulation is not provider execution, evaluation, approval, activation, or release.
8. If using a Behavior Pack, inspect its manifest, objects, conflicts, inventory, and required variables. Import the documented manifest/archive shape; install with the direct variables mapping; if accepted asynchronously, wait for canonical materialization and read back the resulting identities.

### 3. Evaluate the exact candidate
9. Build positive, negative, boundary, ambiguous, and adversarial cases from the approved policy. Use an evaluation plan when criteria must be reviewed/sealed before execution. Use synthetic test cases in an isolated non-production tenant; do not substitute fixture results for service evidence.
10. Start a persisted evaluation with a unique `id`, the exact supported `targetArtifact` identity/digest, input-only `dataset` cases, and `threshold` (or the operation-specific schema). If criteria must be sealed, create and seal an evaluation plan separately before execution. Read back the server-returned `evaluation.id`; pass that value as `evaluationId` only to a subsequent Pack evaluation. Never use a guessed `evaluationId` to start a run or substitute caller-asserted `passed`, score, or run IDs for server evaluation evidence.
11. Run only a supported evaluation surface. Inspect persisted results, regressions, failure cases, and exact digest. Separate Behavior Evaluation from Response Quality & Decision and from Strategy structural simulation.
12. If evaluation fails or the candidate changes, correct or create a new immutable candidate and re-evaluate it. Where the published surface provides improvement proposals/Behavior Revision Candidates, keep proposal review, candidate evaluation and acceptance separate; never carry a pass result across changed content/digests.

### 4. Review and release
13. Present the exact candidate identity/digest, scope, evaluation evidence, unresolved findings, and rollback target to the authorized reviewer.
14. Stop for explicit approval where the user or system requires it. A Teach recommendation, Pack install, semantic match, Strategy activation, or passing score does not grant release authority.
15. Create/release only the explicitly approved immutable identity using a documented surface and caller permission. Read back the release/deployment state; report partial or queued completion accurately.

### 5. Runtime and learning loop
16. Apply the released behavior through the documented runtime resolve/execute/projection path. Preserve semantic context, scope, digests, idempotency keys, receipts, request IDs, and traces.
17. Do not interpret a semantic candidate or a generic HTTP success as authorization. Inspect the actual public response contract and fail closed on deny, abstain, missing release, verifier, scope, projection, digest, or policy errors.
18. Verify the application uses the returned governed context. When supported, compare Vira OFF/current/candidate through server-run comparative evaluation and review its persisted comparison/finding records; never submit client-authored arm outputs. Otherwise run a clearly scoped authorized OFF/prior/new comparison. Record outcomes, latency, and token use only when measured. The published SDK inventory lists an `outcome` helper, but the public reference does not define its event-specific payload; do not invent one. If no installed/public contract documents it, report outcome attribution as a gap and continue only with documented observations/feedback.
19. Collect permitted observations/outcomes and create Teach evidence/proposals. When running Teach analysis, retain `analysisId` and read back its state until completion; queue acceptance alone is not a completed run. Review, accept, reject, or correct proposals as separate actions. A proposal is not active behavior.
20. For an accepted revision, create/evaluate/accept a new immutable candidate, then create a Pack Revision only when that packaging path is required. Inspect its diff, validate and request/record approval/release as distinct transitions, materialize the approved exact revision, and verify the release. Preserve the previous eligible identity for rollback.
21. Verify rollback readiness and, when explicitly requested and authorized, restore the previously eligible canonical identity through the documented release contract. The published SDK has no generic `rollback()` method. Inspect runtime readback and trace after restoring it.

### 6. Surface routing and stop conditions
- Use the JavaScript SDK, Python SDK, HTTP API, or MCP only for operations those public contracts document. Use Studio only when the user has access and the actual UI workflow can be verified.
- The published MCP catalog is narrower than the SDK/API: do not assume it can connect systems, complete Pack lifecycle, run evaluation, execute Strategies, create releases, or promote Teach proposals unless runtime discovery explicitly shows that operation.
- Stop at missing scope/capability, consent, unresolved materialization, unsupported operation, failed evaluation, missing reviewer approval, stale digest, or uncertain runtime response semantics. Report the remaining stages and their blockers without claiming end-to-end completion.

## Deliverable and failure handling
Return the staged checklist with surface, IDs/digests, status, persisted evidence, authorization point, verification performed, and next safe action for every stage. Identify the earliest failed boundary; preserve sanitized request IDs/errors; propose and verify the smallest correction. Mark planned, build-checked, live-verified, approved, released, and rolled-back states separately. Never fabricate metrics, receipts, approvals, provider results, or lifecycle completion.

## References

- [Developer guide](https://github.com/hrpering/tryvira/blob/main/docs/developer-guide.md)
- [Live Marketing Agent lifecycle tutorial](https://github.com/hrpering/tryvira/blob/main/tutorials/marketing-agent/README.md)
- [Capability matrix](https://github.com/hrpering/tryvira/blob/main/references/capability-matrix.md)
- [Authority and safety](https://github.com/hrpering/tryvira/blob/main/references/authority-and-safety.md)
- [Capability discovery](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md)
- [Security model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [Runtime](https://github.com/hrpering/tryvira/blob/main/docs/runtime.md)
- [Packs](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [Evaluation](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [HTTP API evaluation contract](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [Release](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
- [Teach](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [Runnable evaluation and Teach skill resources](https://github.com/hrpering/tryvira/blob/main/skills/README.md#runnable-operation-examples)
- [Published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
- [Executable approved Teach-to-Pack Revision example](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/REVISION-WORKFLOW.md)
