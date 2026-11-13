# Safely call a documented scoped HTTP operation

## User prompts to test the Skill

**Short:** > Use the Vira API to check available capabilities and record a sanitized event in our test environment.

**Detailed:** > Read the connected customer's OpenAPI/HTTP reference and configure VIRA_API_URL as the deployment root. `GET /v1/capabilities` can inspect scoped product availability; `POST /v1/observations` requires a real authorized event payload.

## How to carry out the task

Use the customer's own auth/secret manager, bounded timeout and idempotency. Do not copy a generic curl snippet with made-up IDs into a production terminal.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Actual HTTP status, scoped request ID, errors or accepted event digest. 202 is an admission state, not Teach/Signal/verified answer.

## Required negative test

No documented endpoint for final verified TaskRun response? Do not invent `/verify-answer` or use an undocumented route inferred from SDK internals.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-http-api/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
