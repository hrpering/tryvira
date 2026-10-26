# MCP setup prompts

Use these prompts to configure `@vira/mcp` in an MCP-compatible host.

## Standard stdio setup

```text
Configure Vira MCP in this existing MCP host using `npx -y @vira/mcp`.

Inspect the host configuration first and preserve its existing schema and other MCP servers.

Required environment variable names:
- VIRA_API_URL
- VIRA_API_KEY
- VIRA_MCP_AUTH_TOKEN
- VIRA_MCP_AUTHORITY_URL
- VIRA_ORGANIZATION_ID
- VIRA_PROJECT_ID
- VIRA_ENVIRONMENT_ID

Rules:
- Never hard-code or print real secret values.
- Use the MCP host's own environment/config mechanism.
- Keep one consistent organization/project/environment scope.
- Start with stdio unless the existing architecture explicitly requires HTTP.
- Do not enable a bypass or weaken authorization to make an effectful tool work.
- After configuration, restart the MCP host/process and perform fresh tool discovery.
- Verify a read-only tool before an effectful tool.
- Do not assume a tool exists until it appears in the fresh tools/list result.

Before editing, report the host/config file you found and the exact minimal change required.

After editing, return:
A. config changed
B. environment variable names required
C. restart command/step
D. tool-discovery verification
E. first read-only test
F. effectful-tool authorization test only if needed
G. rollback
```

## HTTP transport setup

```text
Review whether this deployment actually needs Vira MCP HTTP transport instead of stdio.

Do not switch transports merely because stdio troubleshooting is inconvenient.

If HTTP is required:
1. confirm the MCP host/network architecture requires a network endpoint;
2. configure `npx -y @vira/mcp --http` using the supported public settings;
3. keep authentication enabled;
4. do not expose the service publicly without the deployment's normal network/auth controls;
5. preserve organization/project/environment scope;
6. verify initialize/tools/list before calling tools;
7. test a read-only tool first.

Return the reason HTTP is required, exact minimal config, security assumptions, verification steps, and rollback to stdio.
```

## Existing MCP configuration is broken

```text
Debug this Vira MCP configuration without recreating all MCP settings.

Inspect in order:
1. MCP host config syntax
2. command and args (`npx`, `-y`, `@vira/mcp`)
3. whether the host process receives the required environment variable names, without printing values
4. API URL reachability
5. package/process version and stale process possibility
6. fresh MCP initialize + tools/list
7. organization/project/environment consistency
8. read-only tool call
9. effectful authorization only after read-only success

Map known errors as follows:
- VIRA_API_KEY_REQUIRED_IN_PRODUCTION → API credential is absent from the MCP process
- MCP_AUTHORITY_REQUIRED → effectful authorization path is not configured/available
- MCP_SCOPE_MISMATCH → tool-call scope differs from server scope
- RUNTIME_STRATEGY_SELECTION_REQUIRED → runtime has no eligible Strategy for the requested path
- STRATEGY_VERIFIER_UNAVAILABLE:<key> → referenced verifier is unavailable in the target runtime

Do not solve any of these by disabling auth/scope checks.

Return observed facts, ranked cause, minimum config/code fix, restart step, verification call and expected result.
```
