# Vira documentation

Use this page as the documentation map.

## Get started

| Guide | Purpose |
| --- | --- |
| [What is Vira?](what-is-vira.md) | Product model in plain language |
| [Core concepts](core-concepts.md) | Semantic Task, Behavior Point, Signal, Program, Strategy, Teach |
| [How Vira works](how-vira-works.md) | End-to-end lifecycle |
| [Authentication and scope](auth-and-scope.md) | Credentials, organization/project/environment, idempotency |
| [Quickstart](quickstart.md) | Smallest SDK integration |
| [Connect an AI system](guides/connect-an-ai-system.md) | Production-style connection flow |

## Build behavior

| Topic | Purpose |
| --- | --- |
| [Behavior Points](behavior-points.md) | Stable governed attachment points |
| [Signals](signals.md) | Typed evidence + discovery/mapping lifecycle |
| [Semantic routing](semantic-routing.md) | select / uncertain / no-match |
| [Behavior Programs](behavior-programs.md) | guards, judgments, transforms, verification, escalation |
| [Strategies](strategies.md) | bounded multi-step execution |
| [Packs](packs.md) | bulk authoring lifecycle |
| [Teach](teach.md) | evidence → proposal → review → evaluation |
| [Evaluation and approval](evaluation-and-approval.md) | candidate gates |
| [Release](release.md) | explicit production eligibility |
| [Runtime](runtime.md) | resolve and execute |
| [Simple traces](traces.md) | developer-facing result view |

## Reference

| Reference | What is inside |
| --- | --- |
| [JavaScript / TypeScript SDK](reference/javascript-sdk.md) | complete method groups, options, errors, retry/idempotency |
| [Python SDK](reference/python-sdk.md) | client construction and method groups |
| [MCP](reference/mcp.md) | install, auth, scope, transport, config |
| [MCP tool catalog](reference/mcp-tools.md) | tool-by-tool read/effectful reference |
| [API routes](reference/api.md) | public HTTP route map |
| [Existing API reference](api-reference.md) | compact route list |

## Troubleshooting

Start with the [Troubleshooting center](troubleshooting/README.md).

It includes error → cause → fix → verify guides for:

- API/HTTP and retry behavior;
- authentication and scope;
- JavaScript/Python SDK validation;
- MCP startup and tool authorization;
- Semantic routing and Behavior Points;
- Signals;
- Packs;
- Strategies;
- Teach and evaluation;
- Runtime and release.

## AI setup & fix prompts

Use the [AI Prompt Library](ai-prompts/README.md) when you want a repository-aware assistant to help install, configure, or debug Vira.

It contains guarded copy-paste prompts for:

- JavaScript / TypeScript SDK setup;
- Python SDK setup;
- MCP setup;
- direct HTTP API integration;
- first Behavior Point / Pack / Signal / Strategy / Teach configuration;
- HTTP/auth/scope/SDK errors;
- Semantic routing and Behavior Points;
- Signals;
- Packs;
- Strategies;
- Teach and evaluation;
- Runtime and release;
- full end-to-end diagnosis.

The prompts explicitly avoid asking for credentials and instruct the AI to make the smallest reversible change, verify it, and stop at the first failing lifecycle stage.

## Examples

- [JavaScript](../examples/javascript/)
- [Python](../examples/python/)
- [MCP](../examples/mcp/)
- [Packs](../examples/packs/)
- [Semantic + runtime](../examples/semantic-runtime/)
- [Strategy](../examples/strategy/)

## Tutorial

[Marketing Agent end-to-end](../tutorials/marketing-agent/README.md)
