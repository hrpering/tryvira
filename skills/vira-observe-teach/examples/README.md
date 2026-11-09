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
