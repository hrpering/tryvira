# Vira documentation

Use this page as the documentation map.

## Start here by goal

| Goal | Start here |
| --- | --- |
| Understand the product quickly | [What is Vira?](what-is-vira.md) |
| Understand the architecture and lifecycle | [How Vira works](how-vira-works.md) |
| Learn what high-quality authoring looks like | [Authoring quality guide](authoring-quality.md) |
| Connect an application or agent | [Connect an AI system](guides/connect-an-ai-system.md) |
| Debug an issue | [Troubleshooting center](troubleshooting/README.md) |
| Use AI to author, install, or debug Vira | [AI Prompt Library](ai-prompts/README.md) |
| Walk through a complete example | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) |

---

## Visual map

![Vira behavior-control lifecycle](../assets/vira-overview.svg)

![Vira request path](../assets/vira-request-path.svg)

---

## Get started

| Guide | Purpose |
| --- | --- |
| [What is Vira?](what-is-vira.md) | Product model in plain language |
| [Core concepts](core-concepts.md) | Semantic Task, Behavior Point, Signal, Program, Strategy, Teach |
| [How Vira works](how-vira-works.md) | End-to-end lifecycle |
| [Authoring quality](authoring-quality.md) | weak vs production-quality Task, Point, Program, Strategy, Signal, and evaluation examples |
| [Authentication and scope](auth-and-scope.md) | Credentials, organization/project/environment, idempotency |
| [Quickstart](quickstart.md) | Smallest SDK integration |
| [Connect an AI system](guides/connect-an-ai-system.md) | Production-style connection flow |

## Build behavior

| Topic | Purpose |
| --- | --- |
| [Semantic routing](semantic-routing.md) | select / uncertain / no-match |
| [Behavior Points](behavior-points.md) | Stable governed attachment points |
| [Behavior Programs](behavior-programs.md) | guards, judgments, transforms, verification, escalation |
| [Strategies](strategies.md) | bounded multi-step execution |
| [Signals](signals.md) | Typed evidence + discovery/mapping lifecycle |
| [Packs](packs.md) | bulk authoring lifecycle |
| [Teach](teach.md) | evidence → proposal → review → evaluation |
| [Evaluation and approval](evaluation-and-approval.md) | candidate gates |
| [Release](release.md) | explicit production eligibility |
| [Runtime](runtime.md) | resolve and execute |
| [Simple traces](traces.md) | developer-facing result view |

### Learn by contrast

Use the [authoring-quality examples](../examples/authoring-quality/) to compare:

- broad vs bounded Semantic Tasks;
- subjective vs observable Behavior Points;
- generic vs justified Strategy complexity;
- weak vs testable verification;
- vague Signals vs stable typed evidence.

## Integrate

| Integration | Start here |
| --- | --- |
| JavaScript / TypeScript SDK | [Reference](reference/javascript-sdk.md) · [AI setup prompt](ai-prompts/setup-javascript-sdk.md) |
| Python SDK | [Reference](reference/python-sdk.md) · [AI setup prompt](ai-prompts/setup-python-sdk.md) |
| MCP | [Reference](reference/mcp.md) · [Tool catalog](reference/mcp-tools.md) · [AI setup prompt](ai-prompts/setup-mcp.md) |
| Direct HTTP API | [Reference](reference/api.md) · [AI setup prompt](ai-prompts/setup-http-api.md) |

## AI-assisted authoring

The [AI Prompt Library](ai-prompts/README.md) now includes dedicated authoring prompts for:

- Semantic Tasks;
- Behavior Points;
- deepening generic Behavior Points;
- Behavior Programs;
- Strategies;
- simplifying or deepening existing Strategies;
- Signals + evaluation cases;
- complete governed Pack candidates;
- strict authoring-quality review.

Every authoring prompt tells the AI to inspect the current public docs/versioned schema first and not invent Vira fields or lifecycle shortcuts.

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

## Repository presentation

Maintainers: keep the GitHub About description, topics, and social preview aligned with [GitHub repository metadata](github-repository-metadata.md).

## Examples

- [Authoring quality: weak vs production-quality](../examples/authoring-quality/)
- [JavaScript](../examples/javascript/)
- [Python](../examples/python/)
- [MCP](../examples/mcp/)
- [Packs](../examples/packs/)
- [Semantic + runtime](../examples/semantic-runtime/)
- [Strategy](../examples/strategy/)

## Tutorial

[Marketing Agent end-to-end](../tutorials/marketing-agent/README.md)
