# Approved Teach proposal to Pack Revision

This example uses the published JavaScript SDK to continue an already approved Teach proposal through persisted candidate evaluation and a governed Pack Revision. It does not create or approve the Teach proposal. It checks each returned persisted state and uses distinct flags for candidate acceptance, Pack approval, and release.

It requires a Vira environment with candidate-evaluation and Pack Revision operations enabled, plus an API key authorized for each requested transition. Use a disposable non-production scope and synthetic evaluation cases. The script refuses to run unless `VIRA_TUTORIAL_NON_PRODUCTION=true` and `VIRA_TUTORIAL_ALLOW_MUTATIONS=true`; these are operator assertions, not automatic environment detection. Store credentials in a secret manager or an untracked local environment file; do not put them in shell history or source control. Candidate creation and evaluation are real writes, while acceptance, Pack approval, and release each pause for separate interactive confirmation.

Configure these values through your deployment secret manager or an untracked local environment file. Do not put credentials in shell history or source control. Use the exact IDs/digests returned by your authorized Vira workspace; do not invent or copy IDs from another tenant. Required values are `VIRA_API_URL`, `VIRA_API_KEY`, organization/project/environment IDs, unique candidate and Pack Revision IDs, the reviewed Teach proposal ID, the parent revision ID/digest, materialized Pack ID, and program/verifier keys. `VIRA_CANDIDATE_DATASET_JSON` must contain a non-empty synthetic input-only dataset. Set `VIRA_TUTORIAL_NON_PRODUCTION=true` and `VIRA_TUTORIAL_ALLOW_MUTATIONS=true` only after verifying the endpoint/scope and authorizing candidate creation/evaluation.

Run the live workflow from this directory:

```sh
node approved-teach-to-pack-revision.mjs
```

The script verifies the persisted evaluation is bound to the exact candidate ID and digest. It stops if the Pack Revision diff is inconsistent, weakens a policy, or changes authority. It pauses at each authority boundary and prints the persisted IDs, result, or Pack Revision diff for review. Type the exact requested action (`accept-candidate`, `approve-pack-revision`, or `release-pack-revision`) only when the authorized reviewer approves that transition. Any other answer stops the workflow at that state. When no interactive terminal is attached, it stops without sending the gated transition. These confirmations send real state transitions; they are not dry-run switches.

This is a live customer workflow, not a dry run: it sends requests to the configured Vira API and evaluation provider. The repository does not run it in CI because it creates real candidate/revision state and requires an isolated tenant plus authorized operator decisions. We have not run it against a live Vira environment; successful execution must be verified in the customer-provided non-production scope.
