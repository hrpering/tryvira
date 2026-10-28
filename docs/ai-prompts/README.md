# AI setup, authoring, and troubleshooting prompts

Copy-paste prompts for repository-aware assistants such as ChatGPT, Codex, Claude Code, or Cursor.

## Safety rules

- redact API keys/tokens;
- remove personal/customer/production conversation data;
- never bypass authentication, scope, evaluation, approval, or release;
- never fabricate IDs, evidence, evaluation scores, approvers, or release state;
- inspect current public docs/schema before generating Vira artifacts;
- prefer the smallest reversible change;
- verify each change before expanding it.

## Setup

| Goal | Prompt |
| --- | --- |
| JavaScript / TypeScript `@tryvira/sdk` | [JS setup](setup-javascript-sdk.md) |
| Python `tryvira-sdk` | [Python setup](setup-python-sdk.md) |
| MCP `@tryvira/mcp` | [MCP setup](setup-mcp.md) |
| Direct HTTP | [HTTP API setup](setup-http-api.md) |
| First governed behavior lifecycle | [Behavior lifecycle setup](setup-behavior-lifecycle.md) |

## Authoring

| Goal | Prompt |
| --- | --- |
| Create bounded Semantic Task | [Author Semantic Task](author-semantic-task.md) |
| Create Behavior Point | [Author Behavior Point](author-behavior-point.md) |
| Improve generic Behavior Point | [Deepen Behavior Point](deepen-behavior-point.md) |
| Create Behavior Program | [Author Behavior Program](author-behavior-program.md) |
| Create Strategy | [Author Strategy](author-strategy.md) |
| Simplify/deepen Strategy | [Deepen Strategy](deepen-strategy.md) |
| Signals + evaluation cases | [Signals + evaluation](author-signal-evaluation.md) |
| Full Pack candidate | [Governed Pack](author-governed-pack.md) |
| Review authoring quality | [Quality reviewer](review-authoring-quality.md) |
| Design bounded response selection | [Response Quality & Decision](design-response-quality-decision.md) |

## Troubleshooting

| Goal | Prompt |
| --- | --- |
| Diagnose integration end-to-end | [Master debugger](master-debugger.md) |
| HTTP/auth/scope/SDK | [API/auth/SDK errors](errors-api-auth-sdk.md) |
| Semantic + Behavior Point | [Semantic errors](errors-semantic-behavior.md) |
| Signals | [Signal errors](errors-signals.md) |
| Packs | [Pack errors](errors-packs.md) |
| Strategies | [Strategy errors](errors-strategies.md) |
| Teach + Behavior Evaluation | [Teach/evaluation errors](errors-teach-evaluation.md) |
| Runtime + release | [Runtime/release errors](errors-runtime-release.md) |
