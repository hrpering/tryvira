# Evaluate a Vira Pack with real OFF/ON evidence

The four Pack Academy examples contain **108 design-time cases**. They describe inputs, expected behaviors and forbidden results. The corpus itself contains no actual model run or quality score.

## Capture comparable results

Use the same input, model, provider settings, evidence and tool permissions for OFF and for an authorized released Vira behavior ON. Store real model answers and capture references. The public Next.js ON example currently exposes TaskRun admission/status, **not** separately verified final provider output.

## Generate a review template

```bash
node scripts/score-pack-comparison.mjs --pack retail-media-review --template /tmp/review.jsonl
```

Fill the template with observed OFF and ON answers for every case. Each record requires `caseId`, `variant` (OFF/ON), `response`, evidence with `source: "observed_model_output"`, a model name, capture ID and ISO timestamp. Each expected and forbidden criterion needs a reviewer-provided `pass`, `fail` or `not_observable` rating, with a reason. For a forbidden (negative) criterion, PASS means the failure was avoided. Reviewers may optionally attach a literal quote from the response.

These reviewer assessments are not automatic Vira judge checks or cryptographically verified receipts. Have a second independent reviewer resolve disagreements before publication.

## Score observed responses

```bash
node scripts/score-pack-comparison.mjs --pack retail-media-review --responses /tmp/review.jsonl --out /tmp/report.json
```

The tool requires both variants for every Pack case, rejects duplicate IDs, empty responses and incomplete ratings, and reports paired wins/losses/ties, missing and not-observable cases. Use `--allow-subset` only for clearly labeled exploratory work, not a complete benchmark.

**Limitations:** The tool does not run a model or verifier, validate real TaskRun receipts, or prove causal performance gain. Any metrics are based on real output captured and annotated by the operator, subject to independent evidence review.

[Pack Academy](../examples/packs/README.md) · [Runtime verification](runtime-verification.md) · [Verified answer handoff](verified-answer-handoff.md)
