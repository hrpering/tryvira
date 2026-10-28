# MCP integration

Published package: `@tryvira/mcp` (`0.1.6`).

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

After initialization use `tools/list`. The installed package is the runtime source of truth for the tool list. The current `0.1.6` line exposes **41 tools**.

Effectful tools remain authority-gated and can be denied by scope, role, release state, or policy.

## Start with discovery

Use:

```text
list_capabilities
```

to discover what the current scoped credential can use on the MCP surface.

Then use read-only discovery such as:

```text
list_semantic_tasks
list_behavior_points
list_ai_systems
list_behavior_programs
list_behavior_strategies
list_packs
```

before effectful changes.

## Authoring and Teach through MCP

The current package exposes canonical authoring and Teach lifecycle tools, including:

```text
create_semantic_task
create_behavior_point
activate_behavior_strategy
submit_teach_evidence
create_teach_proposal
transition_teach_proposal
create_release
```

These tools do not bypass scope, authorization, evaluation, activation, or release boundaries.

## Surface differences

MCP intentionally does not mirror every SDK convenience method.

Current examples of operations that remain SDK/Python/HTTP-oriented:

- `connectOnce` / adapter connection helpers;
- Response Quality & Decision (`evaluateQuality` / `evaluate_quality`);
- runtime capability attestation/resolution;
- model-serving selection/traces;
- deployment comparison/health recording.

Advanced Strategy execution and behavior capsule/projection **are** exposed through MCP.

See [MCP tools](mcp-tools.md), [Capability discovery](../capability-discovery.md), and [Capability map](../capability-map.md).
