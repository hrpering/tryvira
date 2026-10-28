# MCP errors

Vira MCP uses the published `@tryvira/mcp` package and the same scoped authority boundary.

## `VIRA_API_KEY_REQUIRED_IN_PRODUCTION`

The MCP process started without a production API credential. Configure `VIRA_API_KEY` in the MCP host env and restart the process.

```json
{"mcpServers":{"vira":{"command":"npx","args":["-y","@tryvira/mcp"],"env":{"VIRA_API_URL":"https://api.example.com","VIRA_API_KEY":"<api-key>"}}}}
```

## Authority / scope failures

Effectful tools require authorization. Tool organization/project/environment must match the configured MCP scope. Verify with a read-only tool first.

## Tool not found after `tools/list`

Restart the MCP process, refresh `tools/list`, and confirm the package version. Do not assume an SDK-only method is an MCP tool.

The current package exposes advanced Strategy execution and behavior projection tools, but it does not expose dedicated `connectOnce`, Teach evidence, or Response Quality & Decision tools.

See [MCP reference](../reference/mcp.md), [tool catalog](../reference/mcp-tools.md), and [API errors](api-errors.md).
