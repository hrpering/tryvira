# Run a Pack-bound Behavior Evaluation

This example uses the published JavaScript SDK to start a provider-backed Behavior Evaluation and read the persisted result back. It requires an already materialized Pack and checks that the server-reported Pack digest matches before and after evaluation. It stops before approval, release, or runtime claims.

## Configure

Install the current published package in the application that will run the example:

```bash
npm install @tryvira/sdk
```

Set these values in the local secret manager or shell, never in a committed file. `VIRA_API_URL` is the API deployment root supplied by the Vira account/operator; it is not the Studio URL and should not include `/v1`.

```bash
export VIRA_API_URL="https://your-non-production-api.example"
export VIRA_API_KEY="<isolated-sandbox-key>"
export VIRA_PACK_ID="<materialized-pack-id>"
export VIRA_PACK_DIGEST="<server-returned-pack-digest>"
export VIRA_EVALUATION_RUN_ID="launch-plan-check-001"
export VIRA_TUTORIAL_NON_PRODUCTION="true"
export VIRA_TUTORIAL_ALLOW_MUTATIONS="true"
```

The two `VIRA_TUTORIAL_*` flags are operator assertions. Independently verify the URL, credential scope, and Pack before setting them. Use synthetic test content. Never run this example with production credentials or customer data.

## Run

From a checkout of this repository:

```bash
node skills/vira-evaluate/examples/run-pack-evaluation.mjs
```

The script reads the Pack, verifies its materialization and digest, creates one evaluation with a stable idempotency key, then reads the server record back. It prints only the evaluation ID, state, and request ID. A `FAILED` evaluation exits nonzero and remains failed; it is not approval.

## Limitations

This sample demonstrates the documented Pack evaluation shape. For a Strategy, revision candidate, or another artifact, use the exact identity and request schema for that artifact. Response Quality & Decision (`evaluateQuality`) is a different operation. A passed evaluation does not approve, release, or prove that the Pack was invoked at runtime.
