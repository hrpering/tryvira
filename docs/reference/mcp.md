# MCP integration

Published package: `@tryvira/mcp` (`0.1.5`).

```bash
npx -y @tryvira/mcp
```

The package is MIT-licensed. The Vira service/backend are governed separately.

The default launcher uses MCP stdio and reads environment variables from its parent process.

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@tryvira/mcp"],
      "env": {
        "VIRA_API_URL": "https://api.example.invalid",
        "VIRA_API_KEY": "<customer-api-key>",
        "VIRA_MCP_AUTH_TOKEN": "<mcp-auth-token>",
        "VIRA_MCP_AUTHORITY_URL": "https://api.example.invalid/v1/mcp/authorize",
        "VIRA_ORGANIZATION_ID": "<organization>",
        "VIRA_PROJECT_ID": "<project>",
        "VIRA_ENVIRONMENT_ID": "<environment>"
      }
    }
  }
}
```

After initialization use `tools/list`. The installed package is the runtime source of truth for the tool list.

Effectful tools remain authority-gated and can be denied by scope, role, release state, or policy.

## Surface differences

MCP intentionally does not mirror every SDK convenience method.

- no `connectOnce` MCP tool;
- no dedicated Teach evidence tool;
- no dedicated response-quality decision tool;
- advanced Strategy execution and behavior projection **are** exposed.

See [MCP tools](mcp-tools.md) and [Capability map](../capability-map.md).
