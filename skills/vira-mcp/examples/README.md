# Discover which Vira MCP tools are actually available

## User prompts to test the Skill

**Short:** > Set up @tryvira/mcp and check whether we can start AUTO TaskRuns and import Packs via MCP.

**Detailed:** > Inspect installed MCP version/config and secret-backed host environment. Initialize the server and call `tools/list`; match only advertised names/schemas.

## How to carry out the task

Use [the runnable MCP client example](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/mcp-client/README.md). For TaskRun or Pack lifecycle absent from the published MCP tools, choose a separate documented JS/Python SDK application path.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

MCP initialize and tools/list result, installed version and explicitly unsupported requested tool operations.

## Required negative test

Never invent `start_task_run`, `import_pack` or `release_pack` as MCP tools, or let read-only tool discovery grant external-action permission.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-mcp/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
