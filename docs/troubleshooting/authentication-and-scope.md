# Authentication and scope

Vira requests are scoped by:

```text
organizationId
projectId
environmentId
```

A correct API key with the wrong scope is still the wrong request.

## `VIRA_API_401`

### What it means

The request was not authenticated.

### Common causes

- `VIRA_API_KEY` is missing;
- the key is invalid or expired;
- the request is sent to a different environment than the key belongs to;
- the Authorization header was not forwarded by a proxy/client.

### Fix

Confirm the API origin and credential come from the same Vira environment.

```ts
const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
});
```

### Verify

Run a simple read or connection health request. Do not test authentication first with a release/mutation flow.

---

## `AUTHORIZATION_REQUIRED`

### What it means

The caller is authenticated, but the requested state-changing operation requires write authorization.

### Common causes

- credential has read-only permissions;
- operation requires a write role;
- an MCP effectful tool is being called without its authorization path.

### Fix

Use a credential/role that is allowed to perform that operation. Do not work around the error by calling a lower-level endpoint.

### Verify

Repeat the same operation with the correct authorized identity. A successful read alone does not prove mutation permission.

---

## `MCP_SCOPE_MISMATCH`

### What it means

The scope in an MCP tool call does not match the MCP server's configured scope.

### Fix

Make these values identical in the MCP environment and the tool request:

```text
VIRA_ORGANIZATION_ID
VIRA_PROJECT_ID
VIRA_ENVIRONMENT_ID
```

### Verify

Call a read-only scoped tool such as `list_packs` or `list_behavior_programs` before retrying the effectful tool.

---

## Scope mismatch outside MCP

Symptoms can include:

- `404` for an ID you know exists elsewhere;
- runtime resolution finding no eligible behavior;
- evaluation/release lookup failures;
- connection or inventory results that do not match the application you expected.

### Fix

Log the three scope values next to the request in your application development environment and compare them with the resource you are targeting.

Do not put real credentials or confidential resource payloads in those logs.

### Verify

Read the resource in the same scope, then perform the mutation.
