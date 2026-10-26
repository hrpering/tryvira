# AI setup and troubleshooting prompts

This library contains copy-paste prompts for using an AI coding assistant while integrating or troubleshooting Vira.

The prompts are designed for tools that can inspect your project, such as ChatGPT, Codex, Claude Code, Cursor, or another repository-aware assistant. They also work in normal chat when you paste the requested logs and snippets manually.

## Safety rules for every prompt

Before pasting anything into an AI assistant:

- replace API keys and tokens with `<redacted>`;
- remove personal, customer, and production conversation data;
- do not paste credentials from `.env` files;
- keep `requestId`, HTTP status, public error code, package version, command, and sanitized payload shape;
- do not ask the AI to bypass authentication, scope, evaluation, approval, or release gates;
- prefer the smallest reversible change;
- verify every change with a read-only or bounded test before continuing.

## Prompt map

| Goal | Prompt guide |
| --- | --- |
| Let an AI inspect a failing Vira integration end to end | [Master debugger](master-debugger.md) |
| Install/configure JavaScript / TypeScript SDK | [JavaScript SDK setup](setup-javascript-sdk.md) |
| Install/configure Python SDK | [Python SDK setup](setup-python-sdk.md) |
| Install/configure MCP | [MCP setup](setup-mcp.md) |
| Configure the first Semantic Task / Behavior Point / Signal / Strategy / Teach flow | [Behavior lifecycle setup](setup-behavior-lifecycle.md) |
| Debug HTTP, auth, scope, and SDK validation errors | [API, auth, and SDK errors](errors-api-auth-sdk.md) |
| Debug semantic routing and Behavior Points | [Semantic + Behavior Point errors](errors-semantic-behavior.md) |
| Debug Signal proposal/materialization/mapping | [Signal errors](errors-signals.md) |
| Debug Pack lifecycle | [Pack errors](errors-packs.md) |
| Debug Strategy validation/simulation/execution | [Strategy errors](errors-strategies.md) |
| Debug Teach and evaluation | [Teach + evaluation errors](errors-teach-evaluation.md) |
| Debug runtime and release | [Runtime + release errors](errors-runtime-release.md) |

## Prompt contract

Every prompt asks the AI to return the same structure:

```text
1. Observed facts
2. Most likely cause, ranked
3. Smallest safe fix
4. Exact files/commands to change
5. Verification steps and expected result
6. If verification fails, the next diagnostic branch
7. Anything that must not be changed
```

That structure matters. A useful troubleshooting assistant should narrow the problem instead of suggesting ten unrelated changes at once.

## What to provide to the AI

Use this sanitized evidence block with any prompt:

```text
Vira surface: <JavaScript SDK | Python SDK | MCP | HTTP API>
Package/version: <version>
Runtime: <Node/Python/MCP host version>
Operation: <connect | observe | resolveSemantic | resolveRuntime | Pack release | etc.>
HTTP status: <if available>
Error code: <if available>
requestId: <if available>
Scope: organization=<redacted-id>, project=<redacted-id>, environment=<redacted-id>
Command or method: <sanitized command/method>
Expected result: <what should happen>
Actual result: <what happened>
Relevant sanitized logs:
<paste here>
```

Use the domain-specific prompt after this block for the fastest diagnosis.
