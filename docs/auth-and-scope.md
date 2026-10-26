# Authentication and scope

Vira clients send requests to a Vira API deployment.

## Environment variables

Public examples use:

```dotenv
VIRA_API_URL=https://api.example.com
VIRA_API_KEY=<api-key>
VIRA_ORGANIZATION_ID=<organization>
VIRA_PROJECT_ID=<project>
VIRA_ENVIRONMENT_ID=<environment>
```

Never commit real values.

## API authentication

The SDK uses the API key as a bearer credential when configured.

Raw HTTP pattern:

```http
Authorization: Bearer <api-key>
Content-Type: application/json
Idempotency-Key: <stable-key-for-retryable-mutation>
```

## Scope

Vira uses:

- `organizationId`
- `projectId`
- `environmentId`

Client-supplied scope must match the scope permitted by the credential.

Do not use client-provided IDs to bypass credential scope.

## Idempotency

Mutation calls that may be retried should use an idempotency key.

Good:

```text
connect:marketing-agent:v1
observation:evt-01J...
pack:import:marketing-starter:1.0.0
```

Bad:

```text
Date.now() used for every retry
```

A retry should identify the same logical mutation, not accidentally create a second one.
