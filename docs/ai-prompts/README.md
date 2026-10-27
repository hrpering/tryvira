# AI setup, authoring, and troubleshooting prompts

This library contains copy-paste prompts for using an AI coding assistant while authoring, integrating, or troubleshooting Vira.

The prompts are designed for tools that can inspect your project, such as ChatGPT, Codex, Claude Code, Cursor, or another repository-aware assistant. They also work in normal chat when you paste the requested sanitized context manually.

## Safety rules for every prompt

Before pasting anything into an AI assistant:

- replace API keys and tokens with `<redacted>`;
- remove personal, customer, and production conversation data;
- do not paste credentials from `.env` files;
- keep `requestId`, HTTP status, public error code, package version, command, and sanitized payload shape when debugging;
- do not ask the AI to bypass authentication, scope, evaluation, approval, or release gates;
- do not let the AI fabricate IDs, evidence, approver identity, evaluation scores, or release state;
- require the AI to inspect current Vira docs/versioned schemas before outputting authoring artifacts;
- prefer the smallest reversible change;
- verify every change before continuing.

## Authoring prompt map

| Goal | Prompt guide |
| --- | --- |
| Create a bounded Semantic Task | [Author Semantic Task](author-semantic-task.md) |
| Create a Behavior Point from a repeated correction | [Author Behavior Point](author-behavior-point.md) |
| Improve a generic or subjective Behavior Point | [Deepen Behavior Point](deepen-behavior-point.md) |
| Create a structured Behavior Program | [Author Behavior Program](author-behavior-program.md) |
| Decide whether a Strategy is needed and author it | [Author Strategy](author-strategy.md) |
| Simplify or deepen an existing Strategy | [Deepen Strategy](deepen-strategy.md) |
| Create evidence-backed Signals and evaluation cases | [Signals + evaluation](author-signal-evaluation.md) |
| Assemble Task → Point → Program/Strategy → evaluation into a Pack candidate | [Governed Pack authoring](author-governed-pack.md) |
| Strictly review existing authoring before evaluation/release | [Authoring quality reviewer](review-authoring-quality.md) |

Before using these prompts, read [Authoring quality](../authoring-quality.md) and the paired [weak vs production-quality examples](../../examples/authoring-quality/).

## Setup prompt map

| Goal | Prompt guide |
| --- | --- |
| Install/configure JavaScript / TypeScript SDK | [JavaScript SDK setup](setup-javascript-sdk.md) |
| Install/configure Python SDK | [Python SDK setup](setup-python-sdk.md) |
| Install/configure MCP | [MCP setup](setup-mcp.md) |
| Integrate the public HTTP API directly | [HTTP API setup](setup-http-api.md) |
| Configure the first Semantic Task / Behavior Point / Signal / Strategy / Teach flow | [Behavior lifecycle setup](setup-behavior-lifecycle.md) |

## Troubleshooting prompt map

| Goal | Prompt guide |
| --- | --- |
| Let an AI inspect a failing Vira integration end to end | [Master debugger](master-debugger.md) |
| Debug HTTP, auth, scope, and SDK validation errors | [API, auth, and SDK errors](errors-api-auth-sdk.md) |
| Debug semantic routing and Behavior Points | [Semantic + Behavior Point errors](errors-semantic-behavior.md) |
| Debug Signal proposal/materialization/mapping | [Signal errors](errors-signals.md) |
| Debug Pack lifecycle | [Pack errors](errors-packs.md) |
| Debug Strategy validation/simulation/execution | [Strategy errors](errors-strategies.md) |
| Debug Teach and evaluation | [Teach + evaluation errors](errors-teach-evaluation.md) |
| Debug runtime and release | [Runtime + release errors](errors-runtime-release.md) |

## Authoring prompt contract

Good authoring prompts should make the AI return more than a blob of YAML/JSON. They should explain the boundary and test it.

A strong output normally includes:

```text
1. Placement/boundary decision
2. Candidate artifact
3. Why the key is stable
4. Positive cases
5. Negative/boundary cases
6. Verification/evaluation design
7. Quality scorecard
8. Schema-dependent assumptions
9. Final candidate using only verified public fields
```

## Troubleshooting prompt contract

Every troubleshooting prompt asks the AI to return:

```text
1. Observed facts
2. Most likely cause, ranked
3. Smallest safe fix
4. Exact files/commands to change
5. Verification steps and expected result
6. If verification fails, the next diagnostic branch
7. Anything that must not be changed
```

That structure matters. A useful assistant should narrow the problem instead of suggesting ten unrelated changes at once.

## What to provide to the AI for debugging

Use this sanitized evidence block with troubleshooting prompts:

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
