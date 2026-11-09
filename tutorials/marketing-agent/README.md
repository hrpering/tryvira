# Marketing Agent: end-to-end Vira tutorial

This tutorial uses the published `@tryvira/sdk` `0.1.43` package. Vira is under active development; product access is not open yet.

## Safe setup

Run write-capable steps only against an isolated non-production deployment and
synthetic scope. Verify the URL and scope yourself; these flags are operator
assertions, not endpoint checks. Every write-capable step fails closed unless both
are set:

```bash
export VIRA_TUTORIAL_NON_PRODUCTION=true # only after verifying the endpoint/scope
export VIRA_TUTORIAL_ALLOW_MUTATIONS=true # explicit opt-in to this tutorial's writes
export VIRA_API_URL="https://your-non-production-api.example"
export VIRA_API_KEY="replace-with-sandbox-key"
export VIRA_ORGANIZATION_ID="replace-with-sandbox-organization-id"
export VIRA_PROJECT_ID="replace-with-sandbox-project-id"
export VIRA_ENVIRONMENT_ID="replace-with-sandbox-environment-id"
export OPENAI_API_KEY="replace-with-provider-key"
# Optional; defaults to gpt-4.1-mini
export OPENAI_MODEL="gpt-4.1-mini"
```

Use a unique, repeatable `VIRA_TUTORIAL_RUN_ID` (4–40 lowercase letters, digits,
or hyphens) for Pack retries. Do not use production credentials or customer data.

## Flow

```text
1. connectOnce and verify the connection
2. observe a sanitized baseline
3. record prior synthetic feedback, when applicable
4. author the Semantic Task, Behavior Point, and related governed objects
5. optionally import and materialize a Pack
6. evaluate the persisted candidate
7. review evidence, then explicitly approve and release in a separate step
8. resolve the now-registered Semantic Task
9. resolve eligible behavior through runtime
10. generate candidate responses with the configured provider
11. optionally run Response Quality & Decision on those actual responses
12. admit new synthetic evidence and create a Teach proposal
13. inspect the exact proposal, then explicitly review, evaluate, and promote it
14. re-evaluate and release revised behavior as separate authorized steps
```

`01-connect.mjs` uses `connectOnce` and `testConnection`.

Observations/feedback are evidence; they do not activate behavior. Semantic resolution is also candidate/evidence selection, not authorization.

`08-teach-proposal.mjs` submits admitted synthetic evidence and creates a proposal. It requires `VIRA_CONTROL_POINT_ID` for the persisted Behavior Point (read it from the authorized `listBehaviorPoints()` result for this run) and stops before review. Inspect the proposal, then set `VIRA_TUTORIAL_TEACH_PROPOSAL_ID` and `VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL=true` before running `10-review-teach-proposal.mjs review-evaluate`. This step reviews and evaluates the proposal, then stops in `EVALUATED` state. Only after reviewing that result and making a separate promotion decision, set `VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL=true` and run `10-review-teach-proposal.mjs promote`. Promotion is not Strategy activation, Pack approval, production release, or runtime authority.

The public reference does not specify the `listBehaviorPoints()` response envelope, so the tutorial prints the Pack/import/materialization response for operator inspection but does not guess a JSON path for `VIRA_CONTROL_POINT_ID`. If the returned Pack data does not expose the persisted point ID, obtain it through the authorized read surface before running the Teach step.

The separately recorded feedback in `03-feedback.mjs` is an observation event. It is not by itself admitted Teach evidence or a Teach proposal.

`05-pack-lifecycle.mjs` demonstrates import, conflict review, materialization,
and digest-bound evaluation. Pack object keys include the run ID so a separate demo
run does not collide with the prior run. It prints the import result and stops before
installation unless `VIRA_TUTORIAL_CONFIRM_PACK_INSTALL=true` is explicitly set.
It does not approve or release the candidate.

`09-release-pack.mjs` is a separate approval/release step. Inspect the exact Pack
digest and persisted evaluation from step 05, then pass the returned IDs and digest
and set `VIRA_TUTORIAL_APPROVE_RELEASE=true`:

```bash
export VIRA_TUTORIAL_PACK_ID="replace-with-reviewed-pack-id"
export VIRA_TUTORIAL_EVALUATION_ID="replace-with-persisted-evaluation-id"
export VIRA_TUTORIAL_APPROVED_PACK_DIGEST="replace-with-reviewed-pack-digest"
export VIRA_TUTORIAL_APPROVE_RELEASE=true
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

## Run the real customer workflow

This tutorial sends requests to the configured Vira API and, for evaluation/model steps, the configured provider. It does not start a fake Vira server. Vira product access is still under active development and is not open yet; run this only when the account/operator has supplied an isolated non-production API deployment and scoped credentials. We have not run this flow against a live tenant.

From the repository root, install the tutorial's pinned packages with `npm ci --prefix tutorials/marketing-agent`, then run its numbered scripts from `tutorials/marketing-agent/`. Configure the real non-production endpoint and scope as shown above, and set `OPENAI_API_KEY` for the provider-backed runtime and quality steps. `06-runtime-resolve.mjs` invokes OpenAI only if Vira returns an active, non-empty projection; it stores the synthetic response in a mode-0600 temporary file. `07-quality-decision.mjs` compares that real response with a second real Responses API result whose prompt deliberately requests an incomplete candidate. Provider usage may incur charges. The `VIRA_TUTORIAL_*` variables are explicit operator authorizations; they do not detect whether a URL is production. Never use production credentials or real customer data.

Run the numbered steps in order. Each response contains the IDs to carry into later steps; copy those returned IDs into the named environment variables rather than guessing them. The read-only semantic lookup needs no mutation flags.

```bash
cd tutorials/marketing-agent
npm ci
node 01-connect.mjs
# Copy returned systemId and connectionId into VIRA_AI_SYSTEM_ID and VIRA_CONNECTION_ID.
node 02-observe-baseline.mjs
node 03-feedback.mjs
# First run imports a Pack and prints its persisted inventory/conflicts. Review it.
export VIRA_TUTORIAL_RUN_ID="marketing-demo-unique-001"
node 05-pack-lifecycle.mjs
# After reviewing the exact candidate and resolving conflicts, explicitly authorize installation.
export VIRA_TUTORIAL_CONFIRM_PACK_INSTALL=true
node 05-pack-lifecycle.mjs
# Copy the returned packId, packDigest, and evaluationId. Review those exact persisted
# records and authorize release before setting these values and running the script.
export VIRA_TUTORIAL_PACK_ID="replace-with-returned-pack-id"
export VIRA_TUTORIAL_EVALUATION_ID="replace-with-returned-evaluation-id"
export VIRA_TUTORIAL_APPROVED_PACK_DIGEST="replace-with-returned-pack-digest"
export VIRA_TUTORIAL_APPROVE_RELEASE=true
node 09-release-pack.mjs

# Resolve only after the Pack has registered the task and its release is eligible.
node 04-semantic-resolve.mjs
node 06-runtime-resolve.mjs
# Continue only if step 06 reports modelInvoked=true and writes its temporary result.
node 07-quality-decision.mjs

# Use the persisted Behavior Point ID in VIRA_CONTROL_POINT_ID. This admits only the
# synthetic public example evidence and creates a proposal; it does not review it.
node 08-teach-proposal.mjs
# Set the exact returned proposal ID, inspect it, and authorize review/evaluation.
export VIRA_TUTORIAL_TEACH_PROPOSAL_ID="replace-with-returned-proposal-id"
export VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL=true
node 10-review-teach-proposal.mjs review-evaluate
# Inspect the persisted EVALUATED result and make a separate promotion decision.
export VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL=true
node 10-review-teach-proposal.mjs promote
```

The Pack release command must be run with `VIRA_TUTORIAL_APPROVE_RELEASE=true` only after the reviewer checks the exact Pack digest and evaluation status. The Teach review command requires `VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL=true`; promotion separately requires `VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL=true`. Promotion is not release.

This public contract does not currently specify the event-specific payload for the SDK `outcome` helper, so the tutorial does not invent an outcome-attribution call. The Teach example uses an explicitly synthetic correction as admitted evidence. Treat real business-outcome capture as an integration gap until the selected published contract documents its fields.

To continue from a promoted Teach proposal into a new immutable behavior revision, run the separate [approved Teach-to-Pack Revision workflow](../../examples/frameworks/node-next/REVISION-WORKFLOW.md). That workflow creates and evaluates a new candidate, inspects the Pack Revision diff, and prompts independently before candidate acceptance, Pack approval, and release. Supply the real IDs/digests returned by your Vira environment.

The checks run in CI validate repository structure, public SDK package versions, JavaScript builds, and Python syntax. They do not simulate Vira API responses and do not claim a live integration passed. The tutorial safety check only verifies that mutation flags are required. Actual API/provider verification requires running the numbered steps against a real isolated non-production deployment.

`06-runtime-resolve.mjs` checks runtime eligibility after release. A semantic match is not authorization, and an evaluation result is not proof that runtime executed the behavior. The quality example is a separate response-time decision; it does not release behavior.

For the complete public contract and Point-to-Pack walkthrough, see the [Developer guide](../../docs/developer-guide.md).

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
