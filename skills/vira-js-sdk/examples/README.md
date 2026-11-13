# Route AUTO with the real published JavaScript client

## User prompts to test the Skill

**Short:** > Route this support request and show the server-selected mode; do not run actions or claim a model answer.

**Detailed:** > Use the published `ViraClient`; `resolveTaskRun({input,requestedMode:'AUTO',connectionId})` is proposal-only. For authorized admission pass explicit `taskRunId`, `requestId`, `input`, `requestedMode:'AUTO'`, connectionId and bounded budget to `startTaskRun`.

## How to carry out the task

From a configured `examples/javascript` directory: `node taskrun-modes.mjs --help`, then `VIRA_TASKRUN_INPUT='Summarize this incident' node taskrun-modes.mjs AUTO`. Admission is separately gated and non-production.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Actual route/status and IDs from server; no fabricated provider answer. For observations use [connect-observe.mjs](https://github.com/hrpering/tryvira/blob/main/examples/javascript/connect-observe.mjs).

## Required negative test

`startTaskRunFromPrompt` cannot forward requestedMode. A route proposal, COMPLETED run or direct projection is not proof of verified output.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-js-sdk/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
