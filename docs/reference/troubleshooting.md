# Troubleshooting

## `VIRA_API_401`

Check the API key, target API, and environment.

## Scope mismatch

Check all three:

```text
organizationId
projectId
environmentId
```

The request scope must match the credential/MCP configured scope.

## Semantic resolver returns no selection

This can be correct. Check that the Semantic Task exists, aliases/examples describe the request, the task is eligible in the current scope, and the resolver is allowed to abstain.

Do not turn an uncertain result into a fake confident match.

## Runtime resolution fails after semantic selection

Semantic selection is not authorization. Check the Behavior Point release state, scope, runtime identity, and policy.

## Mutation duplicated after network failure

Use a stable idempotency key. Do not generate a new logical key for every retry.

## MCP tool is denied

Check `VIRA_MCP_AUTHORITY_URL`, configured scope, required role, release state, and effectful tool authorization.

## MCP scope mismatch

The MCP server has one configured organization/project/environment scope. Tool arguments must match it.

## Strategy simulation says no providers were called

That is expected for structural simulation. Use runtime Strategy execution for real provider/tool calls.

## Strategy execution is waiting

Continue the same execution with the SDK or MCP continuation operation. Do not start a new execution just to bypass a waiting state.

## Public trace looks too small

That is intentional. Public documentation keeps the trace view simple and does not expose private receipt/digest structures.
