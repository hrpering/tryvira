# MCP

Package:

```text
@vira/mcp
```

## Run

```bash
npx -y @vira/mcp
```

The default transport is stdio.

## Configuration

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@vira/mcp"],
      "env": {
        "VIRA_API_URL": "https://api.example.com",
        "VIRA_API_KEY": "<api-key>",
        "VIRA_MCP_AUTH_TOKEN": "<mcp-token>",
        "VIRA_ORGANIZATION_ID": "<organization>",
        "VIRA_PROJECT_ID": "<project>",
        "VIRA_ENVIRONMENT_ID": "<environment>"
      }
    }
  }
}
```

## Optional HTTP transport

```bash
npx -y @vira/mcp --http
```

Do not expose an unauthenticated public bind.

## Effectful tools

Effectful operations remain authority-gated.

MCP is an integration surface, not a second authority path.
