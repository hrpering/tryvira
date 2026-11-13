# Run the actual OFF answer versus ON TaskRun-status example

Use the **same synthetic support question** for both OFF and ON. The app runs with **no mock Vira server**. OFF returns a provider answer when configured; ON currently returns actual AUTO TaskRun pending/state and does not claim verified model output.

## User prompts to test the Skill

**Short:** > Show our Vira Next.js demo using the same support question in OFF and ON.

**Detailed:** > In OFF, the configured OpenAI Agent returns a baseline answer. In ON, the route calls `startTaskRun` with AUTO and displays selected mode/state without invoking the provider for ON.

## How to carry out the task

`cd examples/frameworks/node-next && npm ci && cp .env.example .env.local && npm run dev`. Add OPENAI_API_KEY locally for OFF; ON needs the user's own Vira scope and connection.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Record OFF model answer and ON server TaskRun admission/status separately. The optional Send baseline observation checkbox is for OFF metadata; Show TaskRun state is not a verifier receipt.

## Required negative test

Do not pretend the two output answers can currently be compared as fully verified ON/OFF. Missing Vira access must remain a visible ON blocker; keep the unauthenticated sample local.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-chatbot/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
