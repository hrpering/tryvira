# Multi-skill customer journey review

## Review method

This is a manual instruction-following trace through the public skill files and runnable public examples. It follows one representative customer request from intake through runtime and Teach. It is **not** a model-trigger benchmark, live customer execution, or Vira API test. No mock Vira service, credential, tenant scope, or customer record was used.

## Customer request followed

> I have a FastAPI support assistant. Connect it to Vira, govern a support behavior from an approved policy, prepare a Pack, evaluate it, prepare a release for my approval, verify runtime use, then use permitted corrections to create a Teach proposal and prepare a revision.

## Ordered skill trace

| Order | Skill(s) followed | Public evidence inspected | Trace result / stop condition |
| --- | --- | --- | --- |
| 1. Intake and orchestration | `vira-full-lifecycle`, `vira-get-started` | [Full lifecycle skill](../../skills/vira-full-lifecycle/SKILL.md), [capability matrix](../../references/capability-matrix.md) | Orchestrator selects a Python/FastAPI integration and collects scope, policy, evidence, review, and rollback requirements. Access is closed, so the instruction requires stopping before live service operations. |
| 2. Choose the integration boundary | `vira-integrate-app`, `vira-framework-integration` | [FastAPI example](../../examples/frameworks/python_fastapi/README.md), `vira_app.py`, `vira_boundary.py` | The example calls the published Python SDK at a server boundary before provider execution. It does not claim a dedicated FastAPI adapter. Build/syntax checks do not establish a live Vira result. |
| 3. Configure and connect | `vira-python-sdk` | [Python SDK reference](../reference/python-sdk.md), [auth and scope](../auth-and-scope.md) | Uses the operator-supplied API root, server-side credential, and verified scope. Missing scope/endpoint blocks connection; no identifiers are invented. |
| 4. Author the governed behavior | `vira-author-behavior`, optionally `vira-signals` or `vira-strategies` | [Canonical authoring](../canonical-authoring.md), [authoring quality](../authoring-quality.md), [Signals](../signals.md) | The policy must come from the customer. A Task/Point is authored and tested separately from optional Program/Strategy composition. No customer policy is fabricated in this review. |
| 5. Build, import, and materialize a Pack | `vira-build-pack`, `vira-packs` | [Pack reference](../packs.md), Python Pack example, [Pack skill](../../skills/vira-packs/SKILL.md) | The published Python guide documents the real client path, conflict inspection, direct variables mapping, 202 readback, and materialization. It stops before approval/release. No Pack was sent to a service here. |
| 6. Evaluate the exact candidate | `vira-evaluate` | [Evaluation reference](../evaluation-and-approval.md), Python Pack example | Requires persisted evaluation bound to the exact Pack ID/digest. A criteria pass is not proof that runtime executed the Pack. No evaluation was run here. |
| 7. Prepare approval and release | `vira-evaluate-release`, `vira-release` | [Release reference](../release.md), [gated Marketing Agent release step](../../tutorials/marketing-agent/09-release-pack.mjs) | The tutorial re-reads Pack and evaluation, verifies digest binding, then requires a distinct explicit approval flag. These are instructions/code checks, not an issued approval or release. |
| 8. Apply behavior at runtime | `vira-runtime`, `vira-framework-integration` | [FastAPI example](../../examples/frameworks/python_fastapi/README.md), [runtime skill](../../skills/vira-runtime/SKILL.md) | The FastAPI example uses the Python `serve_behavior_projection` response shape. SDK source confirms the common observation envelope and that `outcome()` stamps `business.outcome`; event-specific payload fields remain undefined, so no outcome write was attempted. No runtime request was made. The public contract documents no `outcome` payload schema. |
| 9. Submit evidence, run analysis, inspect recommendations, and create Teach work | `vira-observe-teach` | [Teach guide](../teach.md), [Teach runner](../../skills/vira-observe-teach/examples/run-teach-analysis.mjs), [tutorial Teach step](../../tutorials/marketing-agent/08-teach-proposal.mjs) | The skill now triggers for analysis/readback, recommendation decisions, and proposal workflows. It keeps recommendation decisions separate from proposal review and routes through the selected interface's published method inventory. Customer evidence still requires applicable consent; the documented synthetic tutorial remains a separate case. |
| 10. Review, revise, re-evaluate, and release again | `vira-observe-teach`, `vira-evaluate-release`, `vira-packs`, `vira-release` | [Teach reference](../teach.md), [approved Teach-to-Pack revision workflow](../../examples/frameworks/node-next/REVISION-WORKFLOW.md) | Review/evaluate/promotion/candidate acceptance/Pack approval/release remain separate. The JS revision workflow is executable against configured services but not run here; no automatic promotion or release is claimed. |
| 11. Diagnose a failed boundary | `vira-debug` | [Troubleshooting](../reference/troubleshooting.md), [debug skill](../../skills/vira-debug/SKILL.md) | Collect sanitized error/request ID/package version, identify the earliest failed boundary, and verify one correction. Never dump credentials/traces or retry writes blindly. |

## Changes found by following the journey

1. The Teach skill said all evidence must be consented, while its public synthetic tutorial uses `privacy: "PUBLIC"` and `consent: false`. The skill now requires consent where applicable for customer/tenant evidence and permits synthetic public evidence only under the documented contract.
2. Production SDK declarations confirm the common observation envelope and the `business.outcome` event type. The SDK still leaves event-specific business-result fields open-ended, so the runtime skill records that exact contract boundary without inventing a payload.
3. Production JS/Python SDK declarations expose `listBehaviorPoints()` only through a generic response body. Teach must stop without a visibly verified persisted ID; no list JSON path is guessed.
4. The original trigger corpus tested proposal creation but not a direct request to run Teach analysis or inspect a recommendation. Positive trigger cases and a multi-skill Teach governance scenario now cover those user intents; no model execution is claimed.

The cross-skill prompt is recorded in [`workflow-scenarios.jsonl`](../../skills/evals/workflow-scenarios.jsonl). It is a synthetic regression input only; the repository test checks its required handoffs and safety boundaries, but does not claim that a model executed it successfully.

## Verification boundary

Static validation and contract tests can verify these written handoffs and fail-safe rules. Product access is not open, so this review cannot prove connection, Pack materialization, evaluation, release, runtime receipts, Teach synthesis, Studio behavior, or model-trigger selection. Finish those checks only with an authorized isolated non-production Vira environment and the public schemas needed for the two Teach gaps.
