# Connect a Next.js app at the real provider boundary

## User prompts to test the Skill

**Short:** > Add Vira ON/OFF to our existing web agent without duplicating the agent or inventing a new tool gateway.

**Detailed:** > Inspect the server route and separate OFF provider call from ON `startTaskRun({requestedMode:'AUTO'})`. Use real connectionId and host attestation, then read back state with `getTaskRun`.

## How to carry out the task

Follow [Next.js canonical integration](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/README.md). Its ON mode returns pending/state, not a final answer, until a verified output contract is supported.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

OFF baseline response (if model key configured); ON actual TaskRun selected mode/status and absent final provider output stated explicitly.

## Required negative test

Missing released behavior, wrong scope, unavailable verifier or denied external action: stop without OFF fallback or invented verified answer.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-integrate-app/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
