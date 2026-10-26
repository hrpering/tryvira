# MCP example

Run the Vira MCP launcher:

```bash
npx -y @vira/mcp
```

Use `client-config.example.json` as the generic shape for an MCP host.

Required production values:

```text
VIRA_API_URL
VIRA_API_KEY
VIRA_MCP_AUTH_TOKEN
VIRA_MCP_AUTHORITY_URL
VIRA_ORGANIZATION_ID
VIRA_PROJECT_ID
VIRA_ENVIRONMENT_ID
```

After the host initializes the server, use MCP tool discovery to see the catalog supported by your package version.

Start with read-only tools:

```text
resolve_semantic
list_ai_systems
list_behavior_programs
list_behavior_strategies
list_discovery_candidates
list_packs
```

Effectful tools such as runtime resolution, Signal review/materialization, Pack lifecycle, and evaluation require authorization.

See:

- [MCP reference](../../docs/reference/mcp.md)
- [MCP tool catalog](../../docs/reference/mcp-tools.md)
