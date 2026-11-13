# Run Vira Teach analysis

This resource executes the published JavaScript SDK's `createTeachAnalysis` call and reads its persisted status with `getTeachAnalysis`. It uses already admitted evidence IDs; it does not import conversations, invent evidence, accept recommendations, promote proposals, activate a Strategy, or release behavior.

## Configure

In the target application, install the current published SDK:

```bash
npm install @tryvira/sdk
```

`VIRA_API_URL` must be the API deployment root supplied by the account/operator (not `studio.tryvira.xyz`, and without a `/v1` suffix). Put the key in a secret manager or local environment only. The analysis uses evidence already admitted in the selected credential scope.

```bash
export VIRA_API_URL="https://your-non-production-api.example"
export VIRA_API_KEY="<isolated-sandbox-key>"
export VIRA_TEACH_EVIDENCE_IDS="<admitted-consented-evidence-id>"
export VIRA_TEACH_ANALYSIS_ID="teach-analysis-demo-001"
export VIRA_CONTROL_POINT_ID="<existing-behavior-point-id>"
export VIRA_TEACH_ANALYSIS_SUMMARY="Review selected evidence for one behavior point"
export VIRA_TUTORIAL_NON_PRODUCTION="true"
export VIRA_TUTORIAL_ALLOW_MUTATIONS="true"
```

Set the mutation flags only after verifying the API URL, credential scope, evidence permissions, and isolated non-production target. The flags are operator assertions, not environment detection. Use consented, minimized evidence. Do not paste customer conversations into this example or its logs.

## Create and read back

```bash
node skills/vira-observe-teach/examples/run-teach-analysis.mjs create
```

The script requires an HTTP `202` create response, checks the returned analysis ID, then reads it with `getTeachAnalysis`. `QUEUED` or another nonterminal state is reported as-is; it is not described as completed. Recheck the same analysis later with:

```bash
node skills/vira-observe-teach/examples/run-teach-analysis.mjs read
```

No second analysis is created by `read`. Inspect the returned `teachRunId` before using the published behavior-set or recommendation read methods. Acceptance, rejection, edits, proposal promotion, and release remain separate decisions.

## Observe, Signal and Teach must be different stages

- **Observe first:** a connected application can admit consented model/tool/feedback/outcome events, with real eventId and scope. A 202 observation means accepted for ingestion, not a discovered Signal or completed Teach run.
- **Signal when needed:** a versioned typed Signal needs approved source mapping and runtime attestation; an inferred Signal name alone cannot change behavior.
- **Teach:** this runner starts analysis on **already admitted, consented evidence IDs** and reads its persisted asynchronous state. It does not accept recommendations, approve revisions or release.
- **After review/release:** use **AUTO TaskRun** for the application request and require actual provider-output and post-model receipt evidence before claiming verified output.
- **Negative:** wrong-tenant evidence, unbound behavior target, missing consent, incomplete analysis or an absent verifier must stop. Never auto-release a proposal.

[Observe](https://github.com/hrpering/tryvira/blob/main/docs/observe.md) · [Signals](https://github.com/hrpering/tryvira/blob/main/docs/signals.md) · [Runtime verification](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md)
