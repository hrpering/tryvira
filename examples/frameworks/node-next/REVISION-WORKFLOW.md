# Approved Teach proposal to Pack Revision

This example uses the published JavaScript SDK to continue an already approved Teach proposal through persisted candidate evaluation and a governed Pack Revision. It does not create or approve the Teach proposal. It checks each returned persisted state and uses distinct flags for candidate acceptance, Pack approval, and release.

It requires a Vira environment with the candidate-evaluation provider and Pack Revision endpoints enabled, plus an API key authorized for each requested transition. Use a disposable non-production scope and synthetic evaluation cases. Do not pass secrets on the command line.

Set these environment variables before running:

```sh
VIRA_BASE_URL=https://api.example.invalid \
VIRA_API_KEY=... \
VIRA_ORGANIZATION_ID=... \
VIRA_PROJECT_ID=... \
VIRA_ENVIRONMENT_ID=... \
VIRA_CANDIDATE_ID=... \
VIRA_APPROVED_TEACH_PROPOSAL_ID=... \
VIRA_PARENT_REVISION_ID=... \
VIRA_PARENT_REVISION_DIGEST=... \
VIRA_PACK_REVISION_ID=... \
VIRA_PACK_KEY=... \
VIRA_PACK_VERSION=... \
VIRA_MATERIALIZED_PACK_ID=... \
VIRA_CANDIDATE_DATASET_JSON='[{"id":"case-1","input":"How do I update my account?"}]' \
VIRA_PROGRAM_ID=... \
VIRA_PROGRAM_SEMANTIC_KEY=support.account_update \
VIRA_PROGRAM_VERIFIER_KEY=support.account_update.policy-check \
node approved-teach-to-pack-revision.mjs
```

The script verifies the persisted evaluation is bound to the exact candidate ID and digest. It stops if the Pack Revision diff is inconsistent, weakens a policy, or changes authority. It pauses at each authority boundary and prints the persisted IDs, result, or Pack Revision diff for review. Type the exact requested action (`accept-candidate`, `approve-pack-revision`, or `release-pack-revision`) only when the authorized reviewer approves that transition. Any other answer stops the workflow at that state. When no interactive terminal is attached, it stops without sending the gated transition. These confirmations send real state transitions; they are not dry-run switches.

Run the loopback contract tests with `npm test -- approved-teach-to-pack-revision.test.mjs`. They verify the current SDK paths, request bodies, returned-state gates, and default stop before candidate acceptance. They do not prove live API authorization, provider behavior, or a tenant release.
