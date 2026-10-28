# Vira examples

| Example | What it demonstrates |
| --- | --- |
| [Authoring quality](authoring-quality/) | weak vs production-quality authoring |
| [JavaScript](javascript/) | `@tryvira/sdk` connect/observe, capability discovery, canonical authoring, and response quality |
| [Python](python/) | `tryvira-sdk` integration + response quality |
| [Semantic + runtime](semantic-runtime/) | semantic selection followed by runtime resolution |
| [MCP](mcp/) | `@tryvira/mcp` host configuration, capability/tool discovery, authoring, and governed actions |
| [Marketing Pack](packs/marketing-starter/) | governed Pack lifecycle |
| [Strategy](strategy/marketing-launch.strategy.json) | compact `behavior_plan` Strategy |

## JavaScript starting points

```text
javascript/connect-observe.mjs
javascript/canonical-authoring.mjs
javascript/quality-decision.mjs
```

`canonical-authoring.mjs` demonstrates:

```text
listCapabilities
→ createSemanticTask
→ createBehaviorPoint
```

For the full surface see [Capability map](../docs/capability-map.md). For direct Task/Point authoring see [Canonical authoring](../docs/canonical-authoring.md). For an end-to-end walkthrough see the [Marketing Agent tutorial](../tutorials/marketing-agent/README.md).
