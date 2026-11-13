# Choose the first real Vira integration for a FastAPI support agent

## User prompts to test the Skill

**Short:** > I have a FastAPI support bot. I want to see repeated mistakes first and then keep an approved refund policy consistent.

**Detailed:** > Inspect the application's ASGI entry point, provider call, tool permissions, Python SDK dependency, and scope/config. Compare Observe-only with AUTO TaskRun as two separately authorized deployment phases.

## How to carry out the task

Start with the existing Python [connect/observe example](https://github.com/hrpering/tryvira/blob/main/examples/python/README.md); once eligible behavior exists, use the [Python TaskRun runner](https://github.com/hrpering/tryvira/blob/main/examples/python/taskrun_modes.py).

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Repository language, selected surface, actual installed SDK version, scope readiness, Observe event ID or TaskRun status only if live tested.

## Required negative test

No API endpoint/role? Stop before mutation. Do not invent a Vira project ID, promise a public Studio account or claim ON response verification.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-get-started/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
