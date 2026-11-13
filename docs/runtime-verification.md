# Runtime verification: does the output match the released behavior?

**Runtime verification checks an actual execution/output against explicit requirements.** It is **not** the same as checking that a Pack was installed, a TaskRun completed, a model called a tool, or an evaluation candidate passed last week.

The goal: a customer should be able to ask **"What did Vira enforce, what did it check, which checks passed or failed, and which answer was actually delivered?"**

## Four different verification boundaries

| Gate | When | What it proves | What it does not prove |
| --- | --- | --- | --- |
| **Pack/Program/artifact validation** | Import, compile, materialize, or promote | Identity, schema, scope, immutable digest, and eligible artifact binding | The generated answer followed the behavior |
| **Behavior Evaluation** | Before human approval/release | The *exact candidate* passed the selected dataset, checks and criteria | Every future request will pass |
| **Runtime enforcement and verification** | Pre-model, pre-tool, post-model, pre-action as supported by adapter | An applicable released Program's checks were executed at an integrated boundary and outcomes recorded | Events occurring outside that boundary are controlled |
| **Final-answer handoff** | Before the host claims a verified ON reply | Same TaskRun, released artifact, provider output digest, actual post-model PASS, and persisted verification receipt | Guaranteed correctness outside the tested requirements |

**Response Quality & Decision** is another distinct, bounded candidate-selection mechanism. It can select/abstain or request repair/rerank when supported. A higher quality score is not an approval, release or universal runtime-verification receipt.

## The canonical request order

```text
AUTO TaskRun → semantic selection / abstention → eligible mode dispatch
→ real SINGLE / STRATEGY / COMPOUND / HYBRID child executor
→ scope / release / artifact integrity / budget / host capability checks
→ pre_model / pre_tool / pre_action enforcement where supported
→ actual provider / model / host execution
→ post_model verification (same output and released Program)
→ bounded repair / rerank / escalate / block as defined
→ persisted child + runtime verification receipts
→ final answer only if the supported provider/verification handoff proves it
```

The codebase contains canonical module execution at stages `pre_model`, `pre_tool`, `post_model` and `pre_action`. **Which stage can actually block or modify behavior depends on the connected host's attested capabilities.** Caller-supplied host capability arrays cannot grant enforcement authority.

## A verification Program is not just English prose

The baseline deterministic verifier in the backend recognizes concrete requirement formats:

| Requirement | Example | Verifier behavior |
| --- | --- | --- |
| Non-empty output | `verifier:output.non_empty` | Pass only if output contains non-whitespace text |
| Required text | `required: measurement assumptions` | Pass if the phrase appears in the output |
| Forbidden text | `forbidden: guaranteed profit` | Fail if the literal phrase appears |
| Required JSON keys | `json: {"required":["decision","evidence"]}` | Parse JSON and require listed top-level keys |

For more sophisticated checks, the verifier has extension mechanisms such as `policy: ...`, `rubric: ...` and `judge: ...`, **but those need a genuinely configured verifier implementation**. They must fail closed when the extension is missing. Natural-language requirement strings like "Ensure the answer is accurate" are **not** automatically checked by the default deterministic verifier. A well-written Pack is not a validated program until actual verifier support and the execution boundary have been proven.

The literal-text checks are intentionally simple and can over-block or miss semantically equivalent errors. For example, checking `forbidden: onion` on a whole recipe will also reject a harmless explanation saying "without onion". Use a structured ingredient-list verifier when that distinction matters.

## Example: post-model check with explicit failure policy

The following is a **Program module definition**, not a pretend live evaluation result:

```json
{
  "kind": "verification",
  "stableKey": "marketing.roas_claims.evidence_check",
  "stage": "post_model",
  "checks": [
    {
      "stableKey": "marketing.roas_claims.non_empty",
      "requirement": "verifier:output.non_empty"
    },
    {
      "stableKey": "marketing.roas_claims.no_guarantee",
      "requirement": "forbidden: guaranteed profit"
    }
  ],
  "onFailure": "block"
}
```

This is suitable for a **specific text-level regression** but does not establish that the whole ROAS interpretation is valid. A strict measurement comparison needs a configured domain verifier / schema, authoritative source data, or appropriately evaluated external judge. If `onFailure` requests repair/rerank, retries must be bounded; unsupported recovery must not be labeled as a pass.

## What a runtime verification receipt should include

The backend module implementation exposes fields such as `boundary`, `moduleStableKeys`, `executedModuleStableKeys`, `notApplicableModuleStableKeys`, `failedChecks`, `verificationStatus`, `verificationOnFailure`, `reasonCode` and `receiptDigest`. Where a real execution returns this information, show **applied, skipped, failed and not-applicable** separately.

For a customer-facing *verified answer*, this receipt also needs to be linked to TaskRun identity, the specific released artifact/revision, the actual provider output and the same output digest. A TaskRun `COMPLETED` status alone cannot stand in for these links. **That exact public verified-answer retrieval contract remains an integration gap**, documented in [verified answer handoff](verified-answer-handoff.md). Do not invent a public API method to retrieve it.

## Checks before describing a runtime as verified

1. The selected task is registered in the same customer scope and the Program is explicitly released.
2. The resolved Program/Strategy/behavior revision and immutable artifact digests match the admitted authority.
3. A capability-attested host is able to intercept the needed model/tool/action boundary.
4. The verifier implementation actually supports each declared check (including required policy/rubric/judge extension).
5. The real child executor executes the correct mode and any dependencies; no proposal-only result masquerades as an execution.
6. Runtime checks have real pass/fail results, with bounded recovery and no silent fallback.
7. The final provider output digest matches the post-model result; any absent or failed verifier state remains visible.
8. Receipts and traces are persisted, scoped and read back through a supported interface.
9. Wrong-scope, missing-release, verifier-unavailable, tampered-output, exhausted-repair and host-unsupported negatives fail closed.
10. The application reports incomplete/pending state rather than claiming "Vira verified" if any essential proof is missing.

## Product language

**For customers:** "Vira can verify that configured requirements were checked during an eligible run and show evidence of what passed or failed." Avoid "Vira guarantees the correct answer."

**For developers:** "Bind each post-model check, output digest, released artifact and TaskRun to one persistent receipt. Do not confuse structural artifact verification, offline evaluation and runtime response verification."

[Canonical AUTO TaskRun](canonical-taskrun.md) · [Program modules](behavior-programs.md) · [Evaluation](evaluation-and-approval.md) · [Response Quality](decision-and-quality.md) · [Signals](signals.md) · [Receipts](traces.md)
