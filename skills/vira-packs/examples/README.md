# Materialize and evaluate a real Pack

## Short test prompt

> Import this retail-media Pack into an isolated tenant, inspect conflicts, then evaluate before human approval.

## Detailed test prompt

> Use current graded JSON-collection ZIP or manifest+objects; wait for persisted install. Pass install variables directly and only use an evaluationId returned for the exact materialized digest.

## Expected result

Report real Pack, materialization, evaluation, approval and release states separately; normal use later enters AUTO TaskRun.

Follow the [production-aligned Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-packs/SKILL.md) and [canonical TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md). Live execution requires customer-authorized non-production scope, real server IDs and supported installed client operations. Never fabricate an acceptance receipt.

## Negative test

No 202 as completed, fake evaluation score, release-on-import or Signal-key-to-trusted-producer shortcut.
