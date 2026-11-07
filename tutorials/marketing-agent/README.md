# Marketing Agent: end-to-end Vira tutorial

This tutorial uses the published `@tryvira/sdk` `0.1.43` package. Vira is under active development; product access is not open yet.

## Safe setup

Run write-capable steps only against an isolated non-production deployment and
synthetic scope. Verify the URL and scope yourself; these flags are operator
assertions, not endpoint checks. Every write-capable step fails closed unless both
are set:

```bash
export VIRA_TUTORIAL_NON_PRODUCTION=true
export VIRA_TUTORIAL_ALLOW_MUTATIONS=true
export VIRA_API_URL=https://your-non-production-api.example
export VIRA_API_KEY=<sandbox-key>
export VIRA_ORGANIZATION_ID=<sandbox-organization>
export VIRA_PROJECT_ID=<sandbox-project>
export VIRA_ENVIRONMENT_ID=<sandbox-environment>
```

Use a unique, repeatable `VIRA_TUTORIAL_RUN_ID` (4–40 lowercase letters, digits,
or hyphens) for Pack retries. Do not use production credentials or customer data.

## Flow

```text
1. connectOnce and verify the connection
2. observe a sanitized baseline
3. resolve the Semantic Task
4. author the Behavior Point and related governed objects
5. optionally import and materialize a Pack
6. evaluate the persisted candidate
7. review evidence, then explicitly approve and release in a separate step
8. resolve eligible behavior through runtime
9. generate candidate response(s)
10. optionally run Response Quality & Decision
11. observe the result/outcome
12. admit new synthetic evidence and create a Teach proposal
13. inspect the exact proposal, then explicitly review, evaluate, and promote it
14. re-evaluate and release revised behavior as separate authorized steps
```

`01-connect.mjs` uses `connectOnce` and `testConnection`.

Observations/feedback are evidence; they do not activate behavior. Semantic resolution is also candidate/evidence selection, not authorization.

`08-teach-proposal.mjs` submits admitted synthetic evidence and creates a proposal. It requires `VIRA_CONTROL_POINT_ID` for the persisted Behavior Point (read it from the authorized `listBehaviorPoints()` result for this run) and stops before review. Inspect the proposal, then set `VIRA_TUTORIAL_TEACH_PROPOSAL_ID` and `VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL=true` before running `10-review-teach-proposal.mjs`; that separate command performs explicit review, provider-backed evaluation, and promotion. Promotion is not Strategy activation, Pack approval, production release, or runtime authority.

The separately recorded feedback in `03-feedback.mjs` is an observation event. It is not by itself admitted Teach evidence or a Teach proposal.

`05-pack-lifecycle.mjs` demonstrates import, conflict review, materialization,
and digest-bound evaluation. It prints the import result and stops before
installation unless `VIRA_TUTORIAL_CONFIRM_PACK_INSTALL=true` is explicitly set.
It does not approve or release the candidate.

`09-release-pack.mjs` is a separate approval/release step. Inspect the exact Pack
digest and persisted evaluation from step 05, then pass the returned IDs and digest
and set `VIRA_TUTORIAL_APPROVE_RELEASE=true`:

```bash
export VIRA_TUTORIAL_PACK_ID=<reviewed-pack-id>
export VIRA_TUTORIAL_EVALUATION_ID=<persisted-evaluation-id>
export VIRA_TUTORIAL_APPROVED_PACK_DIGEST=<reviewed-pack-digest>
node 09-release-pack.mjs
```

The release script reads the Pack and evaluation again and stops if the digest
changed or the evaluation is not PASSED and bound to that exact Pack digest.
Approval and release still require the authenticated authority to allow them.

Teach proposal creation and its review/evaluation/promotion are also separate
commands; the creation step never approves its own proposal.

The guided Pack flow is:

```text
import
→ inspect validation / inventory / conflicts
→ configure
→ install / materialize draft
→ evaluate
→ approve
→ release
```

The Pack step waits for the materialization receipt when installation returns HTTP 202, then creates a provider-backed evaluation bound to the Pack digest. The evaluator generates an answer from the supplied input and criteria; this is not proof that the installed behavior executed at runtime. Inspect runtime/candidate execution receipts separately. The script fails closed if materialization is not visible, the evaluation is unavailable, or the result does not pass. Never fabricate a production pass.

`06-runtime-resolve.mjs` resolves eligible released behavior through the runtime authority boundary.

`07-quality-decision.mjs` demonstrates the separate Response Quality & Decision layer:

```text
bounded response candidates
→ quality checks
→ selected candidate OR abstention
```

Response Quality does not release behavior or bypass policy.

For the full public contract and Point-to-Pack walkthrough, see the [Developer guide](../../docs/developer-guide.md).

## Prompt for a coding agent

```text
Follow this tutorial to integrate Vira into a marketing agent, but adapt it to the
existing application's conventions instead of copying files blindly.

Run the flow in order: connect, observe sanitized evidence, resolve the Semantic Task,
inspect the Pack candidate, materialize it, run a provider-backed Pack-bound evaluation,
inspect the receipt, and stop before approval/release unless I explicitly authorize it.
Treat that evaluation as criteria-based evidence, not as proof of runtime execution.
Verify that runtime resolution uses the released immutable identity and that a denied
or abstained request cannot reach a model/tool fallback.

For every step report the request ID, safe status, scope, and next transition. Add
tests for missing credentials, semantic no-match, evaluation failure, and runtime deny.
Never fabricate a quality score, evaluation receipt, approval, release, or customer data.
```
