# HTTP API setup prompts

Use this when integrating Vira directly through the public HTTP API instead of an SDK.

## Add Vira HTTP API to an existing application

```text
Integrate the public Vira HTTP API into this existing application without adding an unnecessary SDK abstraction.

Inspect the repository first. Reuse its existing HTTP client, configuration layer, retry policy, logging, tracing, and test framework.

Requirements:
- Read the Vira API origin and credential from the existing configuration/environment system.
- Never hard-code or log the credential.
- Use `Authorization: Bearer <credential>` through the existing secret/config mechanism.
- Keep organizationId, projectId, and environmentId consistent across requests.
- Preserve public `requestId` values from error responses/logs for troubleshooting.
- Use stable idempotency keys for retryable mutations when the endpoint supports them.
- Do not retry non-retryable 4xx errors blindly.
- Start with the smallest read-only request appropriate to the integration before state-changing operations.
- Do not invent endpoints; confirm routes from the repository's public API reference.

Before editing, report:
1. existing HTTP client/library
2. configuration mechanism
3. retry/interceptor middleware
4. best place for a reusable Vira API client
5. first public route that should be used for this use case

Then make the smallest patch.

Return:
A. files changed
B. required environment variable names only
C. request helper/client implementation
D. error normalization including status + requestId
E. retry/idempotency behavior
F. first read-only verification
G. rollback
```

## Existing raw HTTP integration is broken

```text
Audit this direct Vira HTTP integration.

Check in order:
1. API origin/path construction
2. HTTP method and public route
3. Authorization header presence without printing its value
4. JSON/body/content-type shape
5. organization/project/environment scope
6. idempotency behavior for mutations
7. status + public error code + requestId
8. retry policy

Classify the problem as route/method, request shape, authentication, scope/authorization, resource/lifecycle, rate limit, or transient server/network.

Do not switch to an SDK merely to hide the underlying error. Return the exact failing assumption, minimum request/client patch, and one verification request with expected status/state.
```

## HTTP client acceptance prompt

```text
Verify this Vira HTTP API integration without changing behavior configuration.

Return PASS/FAIL for:
- API URL construction
- credential header injection without logging the secret
- JSON serialization
- scope injection
- requestId capture
- 4xx non-retry behavior
- 429/5xx bounded retry behavior
- mutation idempotency handling
- one read-only public Vira request

If one check fails, stop and provide only the smallest fix plus a verification.
```
