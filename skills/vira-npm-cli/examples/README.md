# Upgrade the SDK without changing execution semantics

## User prompts to test the Skill

**Short:** > Our Next.js repo pins an old @tryvira/sdk. Upgrade it and make sure the production route still uses canonical AUTO TaskRun.

**Detailed:** > Check Node and lockfile, `npm view @tryvira/sdk version engines`, installed package exports/types and current `startTaskRun` signature; update dependency and lockfile with the project's package manager.

## How to carry out the task

Execute `npm ci` and `npm test` / `npm run build` in the existing app. For MCP, separately initialize the installed server and run `tools/list`.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Before/after package versions, lockfile diff, successful imports/tests, and no claims of live server execution.

## Required negative test

Do not publish a new SDK or swap `startTaskRun` for direct `serveBehaviorProjection` just because old code compiled.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-npm-cli/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
