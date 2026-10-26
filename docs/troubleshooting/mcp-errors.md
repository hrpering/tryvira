# MCP errors

Vira MCP uses the same scoped Vira APIs through MCP tool discovery/calls. Most MCP failures come from configuration, scope, or authorization rather than the transport itself.

## `VIRA_API_KEY_REQUIRED_IN_PRODUCTION`

### What it means

The MCP process started without a production API credential.

### Common causes

- `VIRA_API_KEY` is not passed by the MCP host;
- the host configuration was edited but the MCP process was not restarted;
- the variable was configured in a shell that is not the parent process of the MCP server.

### Fix

Configure the credential in the MCP host's `env` block.

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@vira/mcp"],
      "env": {
        "VIRA_API_URL": "https://api.example.com",
        "VIRA_API_KEY": "<api-key>"
      }
    }
  }
}
```

### Verify

Restart the MCP host, initialize the server, then call a read-only tool.

---

## `MCP_AUTHORITY_REQUIRED`

### What it means

An effectful MCP tool needs the configured authorization path.

### Common causes

- `VIRA_MCP_AUTHORITY_URL` is not configured;
- the authority service is unavailable;
- the MCP host is trying to perform a state-changing action with a read-only setup.

### Fix

Configure the supported authorization endpoint and MCP auth token for the environment.

### Verify

First call a read-only tool. Then retry the intended effectful tool and confirm it is explicitly allowed or denied for a clear policy reason.

---

## `MCP_SCOPE_MISMATCH`

### What it means

Tool arguments use a different organization/project/environment than the MCP server configuration.

### Fix

Match:

```text
VIRA_ORGANIZATION_ID
VIRA_PROJECT_ID
VIRA_ENVIRONMENT_ID
```

with the scope fields in every tool call.

### Verify

Call `list_packs` or `list_behavior_programs` with the same scope.

---

## Tool not found after `tools/list`

### What it means

The installed `@vira/mcp` version does not expose the tool name your client is trying to call.

### Common causes

- stale MCP process;
- client cached an older tool list;
- package version differs from the documentation you are reading.

### Fix

Restart the MCP process and run MCP initialization/tool discovery again.

### Verify

Confirm the tool is present in the fresh `tools/list` response before calling it.

---

## `RUNTIME_STRATEGY_SELECTION_REQUIRED`

### What it means

The requested runtime path needs an eligible Strategy selection, but none can be used for the request.

### Common causes

- Strategy has not been released/linked for the Behavior Point;
- request is in a different scope;
- the selected Strategy is not eligible for the current runtime request.

### Fix

Confirm the Behavior Point and Strategy exist in the same scope, validate the Strategy, and complete the relevant evaluation/release flow.

### Verify

Read the Strategy and resolve the Behavior Point before retrying execution.

---

## `STRATEGY_VERIFIER_UNAVAILABLE:<key>`

### What it means

A Strategy references a verifier that is not available to the runtime executing it.

### Fix

Use a verifier supported by the target runtime or update the Strategy definition to reference the correct verifier key. Revalidate the Strategy after the change.

### Verify

Run structural Strategy validation/simulation first, then retry the runtime operation.

---

## MCP call returns `401`, `403`, `404`, `409`, `429` or `5xx`

The MCP transport succeeded; the Vira API rejected or could not complete the underlying operation.

Continue with [API errors](api-errors.md) and the domain-specific guide for the tool you called.
