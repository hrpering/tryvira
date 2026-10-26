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

| Area | Guide | AI prompt |
| --- | --- | --- |
| HTTP status, retries, `ViraApiError` | [API errors](api-errors.md) | [API/auth/SDK prompts](../ai-prompts/errors-api-auth-sdk.md) |
| API keys, roles, organization/project/environment | [Authentication and scope](authentication-and-scope.md) | [API/auth/SDK prompts](../ai-prompts/errors-api-auth-sdk.md) |
| JavaScript / Python client validation | [SDK errors](sdk-errors.md) | [API/auth/SDK prompts](../ai-prompts/errors-api-auth-sdk.md) |
| MCP startup, scope and tool authorization | [MCP errors](mcp-errors.md) | [MCP setup prompts](../ai-prompts/setup-mcp.md) |
| `select`, uncertain/no-match, runtime after semantic routing | [Semantic routing](semantic-routing.md) | [Semantic prompts](../ai-prompts/errors-semantic-behavior.md) |
| Missing/invalid Behavior Point | [Behavior Points](behavior-points.md) | [Semantic + Behavior Point prompts](../ai-prompts/errors-semantic-behavior.md) |
| Signal proposal, review, materialization and mapping | [Signals](signals.md) | [Signal prompts](../ai-prompts/errors-signals.md) |
| Pack import → install → evaluate → approve → release | [Packs](packs.md) | [Pack prompts](../ai-prompts/errors-packs.md) |
| Strategy validation, simulation and execution | [Strategies](strategies.md) | [Strategy prompts](../ai-prompts/errors-strategies.md) |
| Evidence, consent, Teach review and evaluation | [Teach and evaluation](teach-and-evaluation.md) | [Teach/evaluation prompts](../ai-prompts/errors-teach-evaluation.md) |
| Runtime resolve and release eligibility | [Runtime and release](runtime-and-release.md) | [Runtime/release prompts](../ai-prompts/errors-runtime-release.md) |

If you do not know which layer is failing, start with the [Master Vira integration debugger prompt](../ai-prompts/master-debugger.md).

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

The AI prompt library extends that flow with ranked root-cause hypotheses, exact files/commands to change, a single verification step, and a next diagnostic branch if the verification fails.

## Before opening an issue

Include:

- SDK/MCP package and version;
- HTTP status;
- public error code/message;
- `requestId` when available;
- the operation you were performing;
- a minimized request with credentials and confidential data removed.

Do not post API keys, tokens, personal data, customer data, or production conversation content in a public issue.
