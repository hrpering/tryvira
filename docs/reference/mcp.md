# MCP integration

Published package: `@tryvira/mcp` (`0.1.44`). Runtime: Node.js 20+.

```bash
npx -y @tryvira/mcp@0.1.44
```

The package is MIT-licensed. The Vira service/backend are governed separately.

`@tryvira/mcp` exposes Vira through MCP while Vira remains responsible for authentication, scope, authority, release state, policy and receipts. The MCP process does not become a second execution authority.

## Configuration

The default launcher uses MCP stdio and reads environment variables from its parent process. It does **not** automatically load a `.env` file. Vira is under active development and product access is not open yet.

Use placeholders in checked-in configuration:

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@tryvira/mcp@0.1.44"],
      "env": {
        "VIRA_API_URL": "https://api.example.invalid",
        "VIRA_API_KEY": "<customer-api-key>",
        "VIRA_MCP_AUTHORITY_URL": "https://api.example.invalid/v1/mcp/authorize",
        "VIRA_ORGANIZATION_ID": "<organization>",
        "VIRA_PROJECT_ID": "<project>",
        "VIRA_ENVIRONMENT_ID": "<environment>"
      }
    }
  }
}
```

The published CLI requires `VIRA_API_URL`, `VIRA_API_KEY`, and the organization/project/environment scope. It sends effectful-tool authorization requests to `VIRA_MCP_AUTHORITY_URL`, which defaults to `${VIRA_API_URL}/v1/mcp/authorize`; the override is optional.

Never commit real API keys, tenant identifiers, production traces, or private service URLs.

## Protocol / discovery sequence

A client should follow the MCP discovery flow instead of hard-coding a stale tool list:

```text
server/discover
→ initialize
→ tools/list
→ tools/call
```

The published package's current tools and descriptions are listed in the
[registry-synchronized MCP catalog](mcp-tools.md). The installed package's
`tools/list` response is the source of truth for the schemas available at runtime.

## Read-only vs effectful tools

Read-only semantic/discovery operations can return candidates/evidence. Effectful operations remain authority-gated.

The published package includes semantic and runtime resolution:

```text
resolve_semantic
resolve_runtime
```

The package also includes these read and authoring tools:

```text
list_capabilities
list_semantic_tasks
create_semantic_task
list_behavior_points
create_behavior_point
list_behavior_programs
list_behavior_strategies
submit_teach_evidence
create_teach_proposal
```

The package does not expose Teach proposal transitions, Strategy activation or
execution, Pack operations, Behavior Evaluation, or release tools. Those operations
remain available only on the SDK/API surfaces that document them.

Authentication success is not authorization success. Wrong scope, missing role, unreleased behavior, invalid digest, policy denial, or an unavailable verifier must remain errors.

## Semantic and runtime are different

`resolve_semantic` returns semantic evidence/candidates. It does not grant runtime authority.

`resolve_runtime` and authoring/evidence mutations in this package must satisfy the
configured authority path and current release/scope/policy rules.

## Local effectful testing

The local effectful bypass is development-only and must not be treated as a production authorization mechanism. Production effectful operations must go through the authority boundary.

## Troubleshooting

Common contract errors include:

- `VIRA_API_KEY_REQUIRED`: configure a customer credential in the host environment.
- `MCP_AUTHORITY_DENIED`: the authority endpoint did not allow the effectful call. Check actor roles, scope, policy and release eligibility.
- `MCP_SCOPE_MISMATCH`: align requested scope with credential scope.
- `RUNTIME_STRATEGY_SELECTION_REQUIRED`: a released eligible Strategy selector is required.
- `STRATEGY_VERIFIER_UNAVAILABLE`: the required verifier is not available.

Keep MCP request IDs, authority decision digests and returned Vira receipts together when debugging.

## Next steps

See [MCP tools](mcp-tools.md), [Capability discovery](../capability-discovery.md), [Packs](../packs.md), and the [Developer guide](../developer-guide.md).
