# Place AUTO TaskRun in a framework without inventing an adapter

## User prompts to test the Skill

**Short:** > Add Vira to a LangGraph or Vercel AI SDK route while preserving the host's actual streaming and tool permissions.

**Detailed:** > Check framework/package versions, actual tool hooks and provider call site. No official adapter without package evidence; wrap the published JS/Python SDK at the server boundary.

## How to carry out the task

Use [framework examples](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/README.md). The canonical ON path submits AUTO and returns status until a real verified provider-output handoff exists; do not feed direct projection to streamText.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Build and focused tests of no-bypass on denied/unsupported states, actual live acceptance only if authorized and executed.

## Required negative test

No released task or post-model checker? Do not stream an unverified model response under a Vira ON label.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-framework-integration/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
