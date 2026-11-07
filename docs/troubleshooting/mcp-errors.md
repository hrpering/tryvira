# MCP errors

Vira MCP uses the published `@tryvira/mcp` package and the same scoped authority boundary.

## `VIRA_API_KEY_REQUIRED`

The MCP process started without a production API credential. Configure `VIRA_API_KEY` in the MCP host env and restart the process.

```json
{"mcpServers":{"vira":{"command":"npx","args":["-y","@tryvira/mcp@0.1.44"],"env":{"VIRA_API_URL":"https://api.example.invalid","VIRA_API_KEY":"<api-key>","VIRA_ORGANIZATION_ID":"<organization>","VIRA_PROJECT_ID":"<project>","VIRA_ENVIRONMENT_ID":"<environment>"}}}}
```

## Authority / scope failures

Effectful tools require authorization. Tool organization/project/environment must match the configured MCP scope. Verify with a read-only tool first.

## Tool not found after `tools/list`

Restart the MCP process, refresh `tools/list`, and confirm the package version. Do not assume an SDK-only method is an MCP tool.

The published package exposes Teach evidence submission and proposal creation, but not Teach proposal transitions, Pack operations, Behavior Evaluation, Strategy activation/execution, behavior projection, `connectOnce`, or Response Quality & Decision.

See [MCP reference](../reference/mcp.md), [tool catalog](../reference/mcp-tools.md), and [API errors](api-errors.md).
