# MCP integration reference

**Current package:** [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp) `0.1.46`

The MCP package is a separate customer-facing client with narrower coverage than the full product. The published MCP tool catalog is separate from JavaScript, Python and HTTP capabilities.

## Discover what the installed server supports

Use the installed MCP server's `tools/list` response to see the current tool names and schemas available to the customer's configured deployment and credential scope. Package releases can change the available tools. This repository intentionally does not mirror low-level tool signatures or Teach/Pack request schemas.

A returned tool schema describes how to call that tool; it does not grant authorization. Follow the server's authority decisions and the customer's scope. Keep review, evaluation, approval, release, and runtime actions separate.

## Product-level coverage

The current package supports a selection of scoped reads, semantic/runtime behavior operations, and limited behavior authoring and Teach workflows. It does not provide complete parity with the JavaScript SDK or Python client. Pack lifecycle, full evaluation and release workflows, and TaskRun operations should be treated as unsupported unless they appear in the installed server's live `tools/list` and public package documentation.

If a requested operation is absent, use another documented customer-facing surface only when that surface's current public contract is available. Use the names, schemas and authorization decisions returned by the configured server.

See [MCP setup](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), [HTTP integration guidance](api.md), and [Packs](../packs.md).
