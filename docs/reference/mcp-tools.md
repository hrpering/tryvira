# MCP integration reference

**Current package:** [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp) `0.1.55`

The MCP package is a separate customer-facing client with narrower coverage than the full product. The published MCP tool catalog is separate from JavaScript, Python and HTTP capabilities.

## Discover what the installed server supports

Use the installed MCP server's `tools/list` response to see the current tool names and schemas available to the customer's configured deployment and credential scope. Package releases can change the available tools. This repository intentionally does not mirror low-level tool signatures or Teach/Pack request schemas.

A returned tool schema describes how to call that tool; it does not grant authorization. Follow the server's authority decisions and the customer's scope. Keep review, evaluation, approval, release, and runtime actions separate.

## Product-level coverage

The current package exposes the public lifecycle surface through 76 scoped tools. This includes AI System/connection diagnostics; Semantic Tasks, BehaviorPoints, Programs and Strategies; TaskRun resolve/start/read/events/continue/cancel/retry; observations and signals; Teach analysis/recommendation/review; evaluations and comparative findings; Pack evaluation/approval/revisions/materialization; runtime capsule/projection verification; trace search; and host authorization. It does not provide complete parity with the JavaScript SDK or Python client, so use the installed server's live `tools/list` for exact schemas and scoped availability.

If a requested operation is absent, use another documented customer-facing surface only when that surface's current public contract is available. Use the names, schemas and authorization decisions returned by the configured server.

See [MCP setup](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), [HTTP integration guidance](api.md), and [Packs](../packs.md).
