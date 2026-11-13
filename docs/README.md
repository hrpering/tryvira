# Vira documentation

**Choose a task, not a directory.** This is the public documentation and examples repository for Vira. Client packages are published; hosted product access is still under development and is not generally open.

[Start here](start-here.md) · [What Vira is](what-is-vira.md) · [Developer guide](developer-guide.md) · [For teams](for-teams.md)

## I want to…

| Goal | Start with | Then go to |
| --- | --- | --- |
| Author a high-quality Pack | [Pack Academy](pack-authoring-guide.md) | [Three complete examples](../examples/packs/README.md) |
| Integrate the canonical AUTO TaskRun path | [Canonical runtime](canonical-taskrun.md) | [Next.js admission demo](../examples/frameworks/node-next/README.md) |
| Explore everyday-to-enterprise examples | [12 scenario prompts](use-cases.md) · [24 copyable variants](../examples/scenarios/README.md) | [Modes](execution-modes.md) · [Category comparison](approach-comparison.md) |
| Compare Skills, agents and platform types | [Brand-neutral comparison](approach-comparison.md) | [Team evaluation](for-teams.md) |
| Understand why Vira exists | [What is Vira?](what-is-vira.md) | [Product overview](product-positioning.md) · [FAQ](faq.md) |
| Try the product concept without Vira access | [Start here](start-here.md) | [Local OFF/ON chatbot](../examples/frameworks/node-next/README.md) |
| Choose SINGLE, AUTO, STRATEGY or COMPOUND | [Execution modes](execution-modes.md) | [TaskRun SDK example](../examples/javascript/taskrun-modes.mjs) |
| Connect an existing agent | [Developer guide](developer-guide.md) | [Connection guide](guides/connect-an-ai-system.md) · [JavaScript example](../examples/javascript/README.md) |
| Use Python or a framework | [Framework examples](../examples/frameworks/README.md) | [Python SDK](reference/python-sdk.md) |
| Use MCP | [MCP setup](reference/mcp.md) | [Live tool discovery](reference/mcp-tools.md) |
| Define repeatable behavior | [Core concepts](core-concepts.md) | [Authoring](canonical-authoring.md) · [Packs](packs.md) |
| Review a behavior change | [Evaluations](evaluation-and-approval.md) | [Release](release.md) · [Runtime](runtime.md) |
| Understand how suggestions improve behavior | [Teach AI](teach.md) | [Signals](signals.md) · [Traces](traces.md) |
| Evaluate Vira for a team | [Team guide](for-teams.md) | [Capabilities](capability-map.md) · [Security model](security-model.md) |
| Debug an integration | [Troubleshooting center](troubleshooting/README.md) | [SDK](reference/javascript-sdk.md) · [HTTP](reference/api.md) |

## Learn the architecture

Vira's product concepts are designed to separate *what a task is*, *where behavior applies*, *which revision is eligible*, and *what happened*.

- [Canonical AUTO TaskRun](canonical-taskrun.md), [brand story](brand-positioning.md), and [Pack authoring guide](pack-authoring-guide.md).
- [Execution modes](execution-modes.md) for SINGLE, STRATEGY, COMPOUND, HYBRID and AUTO.
- [Examples by level](use-cases.md) and [brand-neutral approach comparison](approach-comparison.md).
- [Core concepts](core-concepts.md) for Semantic Tasks, Behavior Points, Programs, Strategies, release and traces.
- [Architecture overview](architecture.md) and [How Vira works](how-vira-works.md) for conceptual paths.
- [Behavior Programs](behavior-programs.md), [Strategies](strategies.md), and [Semantic routing](semantic-routing.md) for advanced authoring.
- [Auth and scope](auth-and-scope.md) and [Runtime](runtime.md) for authority boundaries.

## Developer references

- [Pack academy](../examples/packs/README.md) · [Canonical AUTO TaskRun](canonical-taskrun.md)
- [Developer release and contract checklist](developer-checklist.md)
- [Per-example verification status: automated tests versus live acceptance](example-verification.md)
- [JavaScript / TypeScript](reference/javascript-sdk.md)
- [Python](reference/python-sdk.md)
- [MCP](reference/mcp.md)
- [HTTP API](reference/api.md)
- [Published package versions](published-packages.md)
- [Capability discovery](capability-discovery.md)
- [Full example index](../examples/README.md) and [Marketing Agent tutorial](../tutorials/marketing-agent/README.md)
- [Agent Skills](../skills/README.md) and [AI coding prompts](ai-prompts/README.md)

**Use the installed package as the source of truth for method shapes.** The SDKs, MCP server, HTTP API and Studio do not necessarily support the same operations. Semantic resolution is not authorization; evidence, review, evaluation and release are separate transitions.

## Contribute or get help

[Contributing](../CONTRIBUTING.md) · [Support](../SUPPORT.md) · [Security](../SECURITY.md) · [Writing standards](writing-guidelines.md) · [Repository/license scope](repository-scope.md)

For product availability and actual tenant operations, do not infer live access from these documents. No shared credentials or mock production service are supplied.
