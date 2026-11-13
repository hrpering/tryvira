# Walkthrough: Observe → Signal → Teach → Runtime Verification

This is a **synthetic learning and architecture exercise**, not a statement that all steps happen automatically on every hosted Vira account. It uses a retail-media scenario and keeps the source-data, evidence, approval and runtime decisions distinct.

## User request

> “Channel A ROAS is 3.2 on a 7-day-click window. Channel B ROAS is 2.8 using 30-day click plus view. Which campaign should receive more budget?”

A strong baseline model may already notice the metric mismatch. Vira's additional job is to make that requirement a **reviewed, applied and inspectable operational behavior**.

## The seven checkpoints

| Checkpoint | What genuinely happens | What must be checked |
| --- | --- | --- |
| 1. Connect & Observe | The connected application sends a permitted `model.response` event and later a correction if applicable | Real AI System/Connection IDs, consent, event ID, source trace |
| 2. Discover the issue | Repeated corrections suggest an attribution comparability problem | Source evidence references, not fabricated count or confidence |
| 3. Define a Signal | Candidate `retail.metric_definition_mismatch` (boolean) is reviewed and mapped to a trusted metric-definition producer | Producer is genuinely available; mapping, version and scope are approved |
| 4. Author and evaluate | Pack defines semantic task, Point, Program and post-model verification checks | Real grader, cases for mismatched windows and comparable windows |
| 5. Release | A human reviews evidence and separately approves/releases the immutable candidate | Artifact identity matches the approved evaluation and target scope |
| 6. Execute | Normal user request enters AUTO TaskRun; server selects task/mode and executes eligible child | No client-selected fake host capability, real child receipt, released Program |
| 7. Verify and observe again | Actual provider output is checked, with failure policy, receipt and permitted feedback | Same output digest, verifier result, release identity and TaskRun. No missing-link success |

## Source observation example

This is an **event input shape**, not an example server receipt:

```json
{
  "eventId": "<real-event-id>",
  "eventType": "model.response",
  "aiSystemId": "<real-connected-ai-system-id>",
  "connectionId": "<real-connection-id>",
  "payload": {
    "status": "completed",
    "containsMetricComparison": true
  }
}
```

The placeholder IDs must come from a real authorized connection. The application's own `containsMetricComparison` metadata is merely an attribute; **it is not a trusted Signal**. A reviewer still needs source evidence and a supported producer mapping.

The SDK's [runnable connect/observe example](../javascript/connect-observe.mjs) uses actual Vira client calls and safe synthetic payloads.

## The governed Signal reference inside a Pack

From [Retail Media Evidence Review](../packs/retail-media-review/README.md), a Pack can declare a Signal key, but it does **not** automatically create a producer mapping. Use the Signal lifecycle to validate whether the value can be produced and attested.

If the Signal is absent or stale, a hard-rule runtime cannot silently assume `false`. Document a pending/clarification/blocked outcome as appropriate to the authorization and risk.

## Real verification, not a checkmark

A Program's `post_model` check needs a supported concrete verifier. The baseline deterministic verifier can perform narrow checks such as `verifier:output.non_empty`. A semantically meaningful comparison may need an approved domain extension (for example `judge: ...`) and correctly supplied source evidence.

**Important:** an unconfigured `judge: ...` extension must fail closed; writing the string in JSON does not make a model judge available. The example Pack explicitly declares these required checks so missing dependencies are visible.

The final verified chatbot answer also requires the provider output and post-model check to be bound to the same immutable TaskRun/revision and receipt. That last-mile public readback contract is a separately documented integration requirement, **not** faked by the tutorial.

## Negative tests

| Failure injected | Correct behavior |
| --- | --- |
| Metric source unavailable | Do not invent which attribution window applies |
| Signal producer unknown | Do not treat a client-supplied Boolean as approved |
| Signal version mismatch | Reject/abstain, keep provenance and reason |
| Pack not released | No unauthorized governed execution |
| Model judge missing | Do not pass the semantic verification |
| Required Compound child failed | No fabricated full success |
| Provider reply changed after check | Output digest mismatch invalidates verification |
| Outcome was only a click, not incremental profit | Do not claim profit uplift from attribution alone |

## Compare success honestly

Run the **same prompt, actual source definitions, model/provider settings and test criteria** for OFF and ON. Compare factual support, adherence, completeness, latency/cost and the actual receipts. An appealing ON response alone is not evidence of improvement.

[Observe](../../docs/observe.md) · [Signals](../../docs/signals.md) · [Teach](../../docs/teach.md) · [Runtime verification](../../docs/runtime-verification.md) · [Full feature map](../../docs/product-feature-map.md)
