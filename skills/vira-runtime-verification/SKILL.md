---
name: vira-runtime-verification
license: "Proprietary; see LICENSE"
description: "Diagnose and implement the Vira runtime verification boundary for released behavior Programs, including real post-model checks, bounded repair and output-bound receipts; never treat TaskRun completion as verified chatbot output."
---

# Runtime Verification and Verified Answer Handoff

Use this Skill when **the real provider output** needs to be checked against the **released Program** at an actual supported enforcement boundary. It is not a source-level Pack linter, generic quality score or Vira release tool.

## Activate this skill when
The user asks why runtime verification passed/failed, wants post-model checks, repair/rerank/block, tamper resistance, or a verified ON chatbot response. For a normal TaskRun use `vira-task-runs`; for evaluation before release use `vira-evaluate`.

## Inputs and preconditions
Need exact TaskRun/child IDs, scoped release and artifact digest, host attested capabilities, real provider response/output digest, Program verification modules and configured verifier implementation. Secure readback/retention must be supported. Never invent a verifier endpoint or claim universal interception.

## Workflow
1. Separate **artifact integrity**, **pre-release Behavior Evaluation**, **response Quality & Decision**, **execution-time verification**, and **final verified provider-answer handoff**.
2. Confirm the normal request entered **AUTO TaskRun**, selected eligible mode and executed real child(ren) under the released Program. No raw `behavior-projection` fast path for chatbot delivery.
3. Inspect the Program's `stage:"post_model"` and `checks[].requirement`. Built-in deterministic checks include `verifier:output.non_empty`, `required: phrase`, `forbidden: phrase`, and a limited `json: {"required":["key"]}`. `policy:`, `rubric:` and `judge:` require real registered extension callbacks; plain English is *not* executable by default.
4. Verify that the host genuinely supports post-model interception and answer buffering/blocking. Caller-provided `hostCapabilities` cannot self-authorize.
5. Run actual verification on the exact output. Inspect returned `executedModuleStableKeys`, `failedChecks`, `verificationStatus`, `reasonCode`, `receiptDigest`, and onFailure path. Repair/rerank must be bounded; missing verifier must fail closed.
6. Ensure the receipt binds **same TaskRun, scoped released artifact, actual provider response, final output digest and verifier PASS** before labeling the final answer “Vira verified”.
7. Test wrong tenant, stale artifact, omitted verifier, forced failed check, output tampering, exhausted repair and incomplete Compound child.

## Production-aligned example and negative case
A retail assistant saying “guaranteed profit” can fail deterministic `forbidden: guaranteed profit`. Checking whether its ROAS analysis is economically correct requires an *implemented* source-aware judge, not just the string `judge: check economics`. If that extension is missing, report **UNSUPPORTED/FAIL**, never PASS.

The public Next.js ON demo returns **TaskRun pending/status**, not a verified answer. The final output readback contract remains an integration requirement.

## Deliverable and failure handling
Return actual verified boundaries and receipts, the checked output digest and result, unavailable verifier/host conditions and safe failure policy. If provider or post-model binding is missing, mark **not verified**. Do not invent API methods, receipts or evaluation scores.

## References
- [Verification and supported checks](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md)
- [Verified answer handoff](https://github.com/hrpering/tryvira/blob/main/docs/verified-answer-handoff.md)
- [Canonical TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md)
- [Program authoring](https://github.com/hrpering/tryvira/blob/main/docs/behavior-programs.md)
