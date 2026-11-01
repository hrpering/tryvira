# MCP integration

Published package: `@tryvira/mcp` (`0.1.14`). Runtime: Node.js 20+.

```bash
npx -y @tryvira/mcp
```

The package is MIT-licensed. The Vira service/backend are governed separately.

`@tryvira/mcp` exposes Vira through MCP while Vira remains responsible for authentication, scope, authority, release state, policy and receipts. The MCP process does not become a second execution authority.

## Configuration

The default launcher uses MCP stdio and reads environment variables from its parent process. It does **not** automatically load a `.env` file.

Use placeholders in checked-in configuration:

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

Never commit real API keys, MCP tokens, tenant identifiers, production traces, or private service URLs.

## Protocol / discovery sequence

A client should follow the MCP discovery flow instead of hard-coding a stale tool list:

```text
server/discover
→ initialize
→ tools/list
→ tools/call
```

The installed package/server is the source of truth for the current tool catalog.

The official MCP transport is the default. `VIRA_MCP_PROTOCOL_MODE=legacy` exists only for migration compatibility testing.

## Read-only vs effectful tools

Read-only semantic/discovery operations can return candidates/evidence. Effectful operations remain authority-gated.

At minimum, the current public surface includes first-class semantic and runtime resolution:

```text
resolve_semantic
resolve_runtime
```

Canonical authoring/lifecycle tools include, where the scoped server advertises them:

```text
list_capabilities
list_semantic_tasks
create_semantic_task
list_behavior_points
create_behavior_point
list_behavior_programs
list_behavior_strategies
activate_behavior_strategy
submit_teach_evidence
create_teach_proposal
transition_teach_proposal
create_release
list_packs
```

Strategy, Pack, observation, discovery and evaluation tools are also authority-gated when they mutate state.

Authentication success is not authorization success. Wrong scope, missing role, unreleased behavior, invalid digest, policy denial, or an unavailable verifier must remain errors.

## Semantic and runtime are different

`resolve_semantic` returns semantic evidence/candidates. It does not grant runtime authority.

`resolve_runtime`, execution, Pack installation/release and other effectful calls must satisfy the configured authority path and current release/scope/policy rules.

## HTTP mode

For explicit HTTP transport:

```bash
npx -y @tryvira/mcp --http
```

The listener is loopback-bound by default. Public binding must sit behind an authenticated network boundary and requires the explicit public-bind configuration. Do not expose the raw MCP HTTP listener directly to the internet.

## Local effectful testing

The local effectful bypass is development-only and must not be treated as a production authorization mechanism. Production effectful operations must go through the authority boundary.

## Troubleshooting

Common contract errors include:

- `VIRA_API_KEY_REQUIRED_IN_PRODUCTION`: configure a customer credential.
- `MCP_AUTHORITY_REQUIRED`: configure the authority endpoint/token for effectful operations.
- `MCP_SCOPE_MISMATCH`: align requested scope with credential scope.
- `RUNTIME_STRATEGY_SELECTION_REQUIRED`: a released eligible Strategy selector is required.
- `STRATEGY_VERIFIER_UNAVAILABLE`: the required verifier is not available.

Keep MCP request IDs, authority decision digests and returned Vira receipts together when debugging.

## Next steps

See [MCP tools](mcp-tools.md), [Capability discovery](../capability-discovery.md), [Packs](../packs.md), and the [Developer guide](../developer-guide.md).
