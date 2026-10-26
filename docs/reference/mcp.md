# MCP reference

Package:

```text
@vira/mcp
```

Runtime:

```text
Node.js >= 20
```

Vira MCP is an npx-ready Model Context Protocol server for Vira's scoped integration APIs.

## Run

```bash
npx -y @vira/mcp
```

The default launcher uses the official MCP transport and stdio.

## Required production configuration

| Variable | Purpose |
| --- | --- |
| `VIRA_API_URL` | Vira API origin |
| `VIRA_API_KEY` | Vira API credential |
| `VIRA_ORGANIZATION_ID` | configured organization scope |
| `VIRA_PROJECT_ID` | configured project scope |
| `VIRA_ENVIRONMENT_ID` | configured environment scope |
| `VIRA_MCP_AUTH_TOKEN` | auth token for the MCP HTTP surface when used |
| `VIRA_MCP_AUTHORITY_URL` | authorization endpoint used for effectful MCP tools |

Optional:

| Variable | Purpose |
| --- | --- |
| `VIRA_MCP_SERVER_NAME` | custom MCP server name |

## Generic client configuration

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@vira/mcp"],
      "env": {
        "VIRA_API_URL": "https://api.example.com",
        "VIRA_API_KEY": "<api-key>",
        "VIRA_MCP_AUTH_TOKEN": "<mcp-auth-token>",
        "VIRA_MCP_AUTHORITY_URL": "https://api.example.com/v1/mcp/authorize",
        "VIRA_ORGANIZATION_ID": "<organization>",
        "VIRA_PROJECT_ID": "<project>",
        "VIRA_ENVIRONMENT_ID": "<environment>"
      }
    }
  }
}
```

The launcher reads environment variables from the parent MCP host process. Do not commit real values.

## MCP discovery flow

A compatible client discovers the server and tools through the MCP protocol:

```text
discover / initialize
→ tools/list
→ tools/call
```

The exact negotiation is handled by the MCP client/server implementation.

## Scope enforcement

Every tool request is scoped.

A tool call carrying a different organization, project, or environment than the configured MCP server scope is rejected.

Authentication success is not authorization success.

## Read-only vs effectful

Read-only examples:

```text
resolve_semantic
list_ai_systems
list_behavior_programs
list_behavior_strategies
get_behavior_strategy
list_discovery_candidates
list_packs
```

Effectful examples:

```text
resolve_runtime
create_observation
Signal proposal/review/materialization
review_discovery_candidate
start_evaluation
Pack import/install/evaluate/approve/release
```

Effectful tools require authorization and can be denied by scope, role, policy, release state, or runtime requirements.

## HTTP transport

The optional HTTP mode is explicit:

```bash
npx -y @vira/mcp --http
```

Use it only behind the authentication/network controls appropriate for your deployment.

## Tool catalog

See [MCP tool catalog](mcp-tools.md).

## Trace view

For documentation and demos, use the compact developer trace view:

```text
Task             support.answer_billing
Behavior Point   support.answer_billing
Behavior         billing_answer_policy
Applied          yes
Result           completed
```

Never include credentials, personal data, or confidential application data in traces shared publicly.

## Troubleshooting

See [Troubleshooting](troubleshooting.md).
