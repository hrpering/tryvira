# Vira documentation

Use this page as the documentation map for the current public product and client surfaces.

## Start here by goal

| Goal | Start here |
| --- | --- |
| Understand the full public surface | [Capability map](capability-map.md) |
| See the published client packages | [Published packages](published-packages.md) |
| Understand the product quickly | [What is Vira?](what-is-vira.md) |
| Understand architecture/lifecycle | [How Vira works](how-vira-works.md) |
| Connect an application or agent | [Connect an AI system](guides/connect-an-ai-system.md) |
| Understand Teach AI | [Teach AI](teach.md) |
| Understand Behavior Evaluation | [Evaluation and approval](evaluation-and-approval.md) |
| Understand response quality/decision | [Decision & response quality](decision-and-quality.md) |
| Learn authoring quality | [Authoring quality](authoring-quality.md) |
| Understand Strategy output ownership | [Strategy result modes](strategy-result-modes.md) |
| Understand accelerator/GPU direction | [GPU acceleration vision](gpu-acceleration-vision.md) |
| Debug an issue | [Troubleshooting](troubleshooting/README.md) |
| Use AI to author/install/debug Vira | [AI Prompt Library](ai-prompts/README.md) |
| Follow a complete example | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) |

## Current lifecycle

```text
Connect
→ Observe
→ Discover / Resolve
→ Govern behavior
→ Teach AI proposal
→ Review
→ Behavior Evaluation
→ Approve / Release
→ Runtime
→ optional Response Quality & Decision
→ Trace / Outcome
→ re-evaluate / Teach again
```

![Vira behavior-control lifecycle](../assets/vira-overview.svg)

## Build behavior

| Topic | Purpose |
| --- | --- |
| [Semantic routing](semantic-routing.md) | select / uncertain / no-match |
| [Behavior Points](behavior-points.md) | stable governed attachment points |
| [Signals](signals.md) | typed evidence + discovery/mapping |
| [Behavior Programs](behavior-programs.md) | guard/judge/transform/verify/escalate |
| [Strategies](strategies.md) | bounded multi-step behavior |
| [Strategy result modes](strategy-result-modes.md) | `response` vs `behavior_plan` |
| [Authoring quality](authoring-quality.md) | weak vs production-quality authoring |
| [Packs](packs.md) | governed bulk authoring lifecycle |
| [Teach AI](teach.md) | evidence → proposal → review → evaluation → release |
| [Evaluation & approval](evaluation-and-approval.md) | behavior/artifact evaluation |
| [Decision & response quality](decision-and-quality.md) | bounded candidate quality + select/abstain |
| [Release](release.md) | explicit runtime eligibility |
| [Runtime](runtime.md) | resolve/execute released behavior |
| [Traces](traces.md) | developer-facing result/trace concepts |

## Integrate

| Surface | Package / reference |
| --- | --- |
| JavaScript / TypeScript | `@tryvira/sdk` · [reference](reference/javascript-sdk.md) |
| Python | `tryvira-sdk` · [reference](reference/python-sdk.md) |
| MCP | `@tryvira/mcp` · [setup](reference/mcp.md) · [31-tool catalog](reference/mcp-tools.md) |
| Direct HTTP | [canonical API reference](reference/api.md) |

See [Capability map](capability-map.md) for which operations exist on each surface.

## Advanced runtime surfaces

The current SDK/API surface also includes Strategy execution, capability negotiation, model-serving resolution/traces, behavior capsule/projection, and deployment evidence. These are documented outside the basic quickstart because most integrations do not need them on day one.

## Accelerator architecture

![Vira GPU acceleration vision](../assets/vira-gpu-vision.svg)

The [GPU acceleration vision](gpu-acceleration-vision.md) describes the experimental same-device direction. CPU/conventional runtime remains first-class and public docs do not claim general GPU production availability.

## Examples

- [Authoring quality](../examples/authoring-quality/)
- [JavaScript](../examples/javascript/)
- [Python](../examples/python/)
- [MCP](../examples/mcp/)
- [Packs](../examples/packs/)
- [Semantic + runtime](../examples/semantic-runtime/)
- [Strategy](../examples/strategy/)

## Tutorial

[Marketing Agent end-to-end](../tutorials/marketing-agent/README.md)
