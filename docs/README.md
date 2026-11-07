# Vira documentation

Use this page as the map for the current public product, authoring, runtime, and integration surfaces.

## Start here by goal

| Goal | Start here |
| --- | --- |
| Install a client and follow the full lifecycle | [Developer guide](developer-guide.md) |
| Understand the full public surface | [Capability map](capability-map.md) |
| Discover what a scoped credential can use | [Capability discovery](capability-discovery.md) |
| Author Semantic Tasks / Behavior Points directly | [Canonical authoring](canonical-authoring.md) |
| See published client packages | [Published packages](published-packages.md) |
| Understand the product quickly | [What is Vira?](what-is-vira.md) |
| Understand architecture/lifecycle | [How Vira works](how-vira-works.md) |
| Connect an application or agent | [Connect an AI system](guides/connect-an-ai-system.md) |
| Understand Teach AI | [Teach AI](teach.md) |
| Understand Behavior Evaluation | [Evaluation and approval](evaluation-and-approval.md) |
| Understand response quality/decision | [Decision & response quality](decision-and-quality.md) |
| Learn authoring quality | [Authoring quality](authoring-quality.md) |
| Understand Pack verification/release | [Packs](packs.md) |
| Debug an issue | [Troubleshooting](troubleshooting/README.md) |
| Use AI to author/install/debug Vira | [AI Prompt Library](ai-prompts/README.md) |
| Follow a complete example | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) |

## Current lifecycle

```text
Connect
→ Observe
→ Discover / Semantic Resolve
→ Canonical Authoring
→ Teach AI proposal
→ Review / Behavior Evaluation
→ explicit Strategy activation and/or governed release
→ Runtime Resolve / Execute
→ Receipt / Trace / Outcome
→ re-evaluate / Teach again
```

Semantic selection is evidence/candidate selection, not authorization. Pack import/install, Teach promotion, quality scoring, or Strategy activation do not silently create runtime release authority.

![Vira behavior-control lifecycle](../assets/vira-overview.svg)

## Author and govern behavior

| Topic | Purpose |
| --- | --- |
| [Canonical authoring](canonical-authoring.md) | direct Task/Point authoring + Strategy activation |
| [Semantic routing](semantic-routing.md) | select / uncertain / no-match without granting authority |
| [Behavior Points](behavior-points.md) | stable governed attachment points |
| [Signals](signals.md) | typed evidence + discovery/mapping |
| [Behavior Programs](behavior-programs.md) | guard/judge/transform/verify/escalate |
| [Strategies](strategies.md) | published Strategy methods and versioned contracts |
| [Authoring quality](authoring-quality.md) | public examples and package contract references |
| [Packs](packs.md) | import → validate/conflicts → materialize → evaluate → approve → release |
| [Teach AI](teach.md) | evidence → proposal → review → evaluate → promote → explicit release |
| [Evaluation & approval](evaluation-and-approval.md) | behavior/artifact evaluation |
| [Decision & response quality](decision-and-quality.md) | bounded candidate quality + select/abstain |
| [Release](release.md) | exact approved identity becomes runtime-eligible |
| [Runtime](runtime.md) | resolve/execute eligible released behavior |
| [Traces](traces.md) | developer-facing result/trace concepts |

## Integrate

| Surface | Current package / reference |
| --- | --- |
| JavaScript / TypeScript | `@tryvira/sdk` `0.1.43` · [reference](reference/javascript-sdk.md) |
| Python | `tryvira-sdk` `0.1.43` · [reference](reference/python-sdk.md) |
| MCP | `@tryvira/mcp` `0.1.44` · [setup](reference/mcp.md) · [tool catalog](reference/mcp-tools.md) |
| Direct HTTP | [canonical API reference](reference/api.md) |

Before hard-coding assumptions about a surface, use [Capability discovery](capability-discovery.md). MCP clients should also use `server/discover`, `initialize`, and `tools/list` because the server owns the current tool catalog.

## Runtime and serving surfaces

The current SDK/API surface includes Strategy execution, runtime capability attestation/resolution, model-serving decisions/traces, behavior capsule/projection, deployment evidence, and Pack upgrade preview. These stay outside the smallest quickstart because most integrations do not need them on day one.

## Examples

- [Full JavaScript lifecycle](../examples/javascript/end-to-end-lifecycle.mjs)
- [JavaScript](../examples/javascript/)
- [Python](../examples/python/)
- [MCP](../examples/mcp/)
- [Packs](../examples/packs/)
- [Semantic + runtime](../examples/semantic-runtime/)
- [Strategy integration](../examples/strategy/)


## Security boundary

Public examples must use placeholder credentials and synthetic identifiers. Do not publish production keys/tokens, tenant identifiers, private service URLs, customer traces, internal deployment details, or local-development bypasses presented as production mechanisms.

## Tutorial

[Marketing Agent end-to-end](../tutorials/marketing-agent/README.md)
