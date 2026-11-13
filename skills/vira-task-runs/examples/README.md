# Test AUTO selection for all four execution modes

## User prompts to test the Skill

**Short:** > With one user prompt, let Vira AUTO select SINGLE, STRATEGY, COMPOUND or HYBRID and show real child receipts.

**Detailed:** > Use real registered tasks, eligible released Programs/Strategies and a host connection with server-attested capabilities. Compare a one-task summary, a multi-step extraction, two independent tasks and a mixed multi-step+single request.

## How to carry out the task

Run [JavaScript](https://github.com/hrpering/tryvira/blob/main/examples/javascript/taskrun-modes.mjs) or [Python](https://github.com/hrpering/tryvira/blob/main/examples/python/taskrun_modes.py) in **route-only** mode first. Only start executions with the scripts' explicit non-production opt-ins.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Per case: route decision, server selected tasks/mode, TaskRun status/stateVersion and actual child receipts if available. Clarification/denial is a valid result.

## Required negative test

Missing second task, materialized Strategy or host attestation must deny/abstain rather than construct child receipts. COMPLETED does not equal post-model verified chatbot answer.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-task-runs/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
