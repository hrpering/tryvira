# Example: a real verifier is more than a text requirement

**Prompt:** “Our released retail-media Program says not to guarantee profit. Verify the actual response and show the real receipt.”

**Check input:** a real released Program with `stage:"post_model"` and `checks:[{"stableKey":"retail.no_guarantee","requirement":"forbidden: guaranteed profit"}]`, an authorized TaskRun and the actual provider output. Do **not** supply a fictional receipt.

**Procedure:** Confirm TaskRun child status → Program/release digest → actual post-model verifier execution → output digest and receipt match → show pass/fail result if returned. For a domain `judge:` requirement, confirm a configured extension first.

**Negative cases:** Missing verifier → unsupported/blocked; provider answer changed after PASS → receipt invalid; child completed but no provider/verifier handoff → **pending**, not verified ON.

[Full guide](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md) · [Acceptance requirements](https://github.com/hrpering/tryvira/blob/main/docs/verified-answer-handoff.md)
