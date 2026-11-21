# Discover which Vira MCP tools are actually available

## User prompts to test the Skill

**Short:** > Set up @tryvira/mcp and check whether we can start AUTO TaskRuns and import Packs via MCP.

**Detailed:** > Inspect installed MCP version/config and secret-backed host environment. Initialize the server and call `tools/list`; match only advertised names/schemas.

## How to carry out the task

Use [the runnable MCP client example](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/mcp-client/README.md). For TaskRun or Pack lifecycle, use the advertised MCP tools when present and authorized; otherwise choose a separate documented JS/Python SDK application path.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

MCP initialize and tools/list result, installed version and explicitly unsupported requested tool operations.

## Required negative test

Never invent a tool or schema. The current catalog includes `start_task_run`, `import_pack` and `release_pack`, but each effectful call still requires the server authority decision and the customer's scope/policy.

## Review, conflict and optimization examples

Inspect **live** `tools/list` and the installed package version before selecting an operation. In the registry-verified MCP 0.1.78 catalog, `get_scope`, `list_inbox`, `get_conflict_inspection` and `resolve_conflict` are promoted tools. Dedicated optimization tools such as `get_optimization_run` were visible in the older 0.1.60 snapshot, but are **not advertised by 0.1.78**. Only use `read_control_api` or `write_control_api` for an optimization route when that route is documented, registered and authorized by the same Vira service. Never fabricate a route or use a generic write to bypass an explicit denial.

Marking notifications read, creating inspections, deciding conflicts and starting or cancelling optimization are effectful operations requiring the corresponding server permission. The [published npm tool inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-published-tools.json) lists names and effect classifications, not live permissions or schemas.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-mcp/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
