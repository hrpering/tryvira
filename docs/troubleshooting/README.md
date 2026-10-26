# Troubleshooting

Use this section when an SDK, MCP, semantic, authoring, evaluation, or runtime request does not behave as expected.

The goal is simple: identify the failure, fix the smallest likely cause, and verify the fix with a second request.

## Start here

1. Keep the HTTP status, error code, and `requestId`.
2. Confirm the request is going to the intended Vira environment.
3. Confirm organization, project, and environment scope.
4. Check whether the operation is read-only or changes state.
5. Check the lifecycle stage of the resource you are changing.
6. Retry only when the error is retryable.

## Troubleshooting map

| Area | Guide |
| --- | --- |
| HTTP status, retries, `ViraApiError` | [API errors](api-errors.md) |
| API keys, roles, organization/project/environment | [Authentication and scope](authentication-and-scope.md) |
| JavaScript / Python client validation | [SDK errors](sdk-errors.md) |
| MCP startup, scope and tool authorization | [MCP errors](mcp-errors.md) |
| `select`, uncertain/no-match, runtime after semantic routing | [Semantic routing](semantic-routing.md) |
| Missing/invalid Behavior Point | [Behavior Points](behavior-points.md) |
| Signal proposal, review, materialization and mapping | [Signals](signals.md) |
| Pack import → install → evaluate → approve → release | [Packs](packs.md) |
| Strategy validation, simulation and execution | [Strategies](strategies.md) |
| Evidence, consent, Teach review and evaluation | [Teach and evaluation](teach-and-evaluation.md) |
| Runtime resolve and release eligibility | [Runtime and release](runtime-and-release.md) |

## The standard error workflow

For every failure, use the same sequence:

```text
error
↓
what it means
↓
common causes
↓
fix
↓
verify
```

## Before opening an issue

Include:

- SDK/MCP package and version;
- HTTP status;
- public error code/message;
- `requestId` when available;
- the operation you were performing;
- a minimized request with credentials and confidential data removed.

Do not post API keys, tokens, personal data, customer data, or production conversation content in a public issue.
