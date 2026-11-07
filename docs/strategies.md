# Behavior Strategies

The JavaScript and Python SDKs expose methods for creating, validating, simulating,
activating, and executing Behavior Strategies. Their exact request and response
contracts are documented in the [JavaScript SDK reference](reference/javascript-sdk.md),
[Python SDK reference](reference/python-sdk.md), and [HTTP API reference](reference/api.md).

MCP support is narrower and may change by package version. Check the generated
[MCP tool catalog](reference/mcp-tools.md) and discover the installed server's tools
at runtime. Do not assume that an SDK method is available through MCP.

A Strategy is an optional way to configure how an application handles a task. Choose
it only when the use case requires more than the simpler authoring options. Keep the
intended behavior clear, use synthetic examples in public materials, and test the
integration against the published package before relying on it.

Activation, evaluation, release, and runtime access are separate operations. Follow
the relevant public API contract and the permissions configured for your account.

For basic Task and Behavior Point authoring, see [Canonical authoring](canonical-authoring.md).
