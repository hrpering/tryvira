# Separate evidence, approval and release

## Short test prompt

> Our Pack evaluation passed. Can it be released right now?

## Detailed test prompt

> Inspect persisted evaluation, exact artifact digest, regressions, authorized reviewer, scope and rollback target. Obtain distinct explicit approvals before effectful transitions.

## Expected result

Report pre-release checks and planned post-release AUTO TaskRun + output-bound verification acceptance.

Follow the [production-aligned Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-evaluate-release/SKILL.md) and [canonical TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md). Live execution requires customer-authorized non-production scope, real server IDs and supported installed client operations. Never fabricate an acceptance receipt.

## Negative test

A quality score or syntax test never self-authorizes release.
