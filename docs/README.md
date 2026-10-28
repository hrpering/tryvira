# Vira documentation

Use this page as the map for the current public product, authoring, runtime, and integration surfaces.

## Start here by goal

| Goal | Start here |
| --- | --- |
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
| Understand Strategy output ownership | [Strategy result modes](strategy-result-modes.md) |
| Understand accelerator/GPU direction | [GPU acceleration vision](gpu-acceleration-vision.md) |
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
→ Strategy activation and/or governed release
→ Runtime
→ optional Response Quality & Decision
→ Trace / Outcome
→ re-evaluate / Teach again
```

![Vira behavior-control lifecycle](../assets/vira-overview.svg)

## Author and govern behavior

| Topic | Purpose |
| --- | --- |
| [Canonical authoring](canonical-authoring.md) | direct Task/Point authoring + Strategy activation |
| [Semantic routing](semantic-routing.md) | select / uncertain / no-match |
| [Behavior Points](behavior-points.md) | stable governed attachment points |
| [Signals](signals.md) | typed evidence + discovery/mapping |
| [Behavior Programs](behavior-programs.md) | guard/judge/transform/verify/escalate |
| [Strategies](strategies.md) | bounded multi-step behavior, variants, validation, activation |
| [Strategy result modes](strategy-result-modes.md) | `response` vs `behavior_plan` |
| [Authoring quality](authoring-quality.md) | weak vs production-quality authoring |
| [Packs](packs.md) | governed bundled authoring lifecycle |
| [Teach AI](teach.md) | evidence → proposal → review → evaluate → promote → release |
| [Evaluation & approval](evaluation-and-approval.md) | behavior/artifact evaluation |
| [Decision & response quality](decision-and-quality.md) | bounded candidate quality + select/abstain |
| [Release](release.md) | explicit runtime eligibility |
| [Runtime](runtime.md) | resolve/execute released behavior |
| [Traces](traces.md) | developer-facing result/trace concepts |

## Integrate

| Surface | Current package / reference |
| --- | --- |
| JavaScript / TypeScript | `@tryvira/sdk` `0.1.6` · [reference](reference/javascript-sdk.md) |
| Python | `tryvira-sdk` `0.1.6` · [reference](reference/python-sdk.md) |
| MCP | `@tryvira/mcp` `0.1.6` · [setup](reference/mcp.md) · [41-tool catalog](reference/mcp-tools.md) |
| Direct HTTP | [canonical API reference](reference/api.md) |

Before hard-coding assumptions about a surface, use [Capability discovery](capability-discovery.md).

## Runtime and serving surfaces

The current SDK/API surface also includes Strategy execution, runtime capability attestation/resolution, model-serving decisions/traces, behavior capsule/projection, and deployment evidence. These stay outside the smallest quickstart because most integrations do not need them on day one.

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
