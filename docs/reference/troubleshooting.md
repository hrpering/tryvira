# Troubleshooting

## `VIRA_API_401`

Check:

- API key exists;
- key is sent to the expected Vira API;
- key belongs to the intended environment.

## Scope mismatch

Check all three:

```text
organizationId
projectId
environmentId
```

The request scope must match the credential/MCP configured scope.

## Semantic resolver returns no selection

This can be correct.

Check:

- the Semantic Task exists;
- aliases/examples describe the request;
- the task is eligible in the current scope;
- the resolver is allowed to abstain.

Do not turn an uncertain result into a fake confident match.

## Runtime resolution fails after semantic selection

A semantic match does not activate behavior by itself.

Check:

- Behavior Point is released/eligible;
- scope is correct;
- required runtime values are present;
- policy allows the operation.

## Mutation duplicated after network failure

Use a stable idempotency key.

Do not generate a new logical key for every retry.

## MCP tool is denied

Check:

- `VIRA_MCP_AUTHORITY_URL`;
- configured scope;
- required role;
- release state;
- tool authorization.

## MCP scope mismatch

The MCP server has one configured organization/project/environment scope.

Tool arguments must match it.

## Strategy simulation says no providers were called

That is expected for structural simulation.

Use runtime execution when you need real provider or tool calls.

## Trace looks too small

Documentation examples use the compact trace format described in `docs/traces.md`.
