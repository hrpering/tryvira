# Admit and inspect AUTO TaskRun from Python

## User prompts to test the Skill

**Short:** > Add Vira to this FastAPI app; route a task safely, then observe one model event with the proper scope.

**Detailed:** > Read installed `tryvira-sdk` signatures. Python `resolve_task_run`/ `start_task_run` accept mapping inputs; ensure `requestedMode:'AUTO'` is explicit on admission and preserve returned state/expectedVersion.

## How to carry out the task

Use `python examples/python/taskrun_modes.py --help` for usage (verify CLI arguments locally), or [the runnable Python guide](https://github.com/hrpering/tryvira/blob/main/examples/python/README.md). For Observe, include organizationId/projectId/environmentId plus eventId/eventType/aiSystemId/connectionId.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Actual Python client version, returned route/mode/status, source IDs and no secrets. A 202 Observe receipt is accepted-event evidence only.

## Required negative test

Do not use `serve_behavior_projection` to generate an ON answer, omit required scope on Python observations, or invent a real successful outcome.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-python-sdk/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
