# Vira examples

| Example | What it demonstrates |
| --- | --- |
| [Full JavaScript lifecycle](javascript/end-to-end-lifecycle.mjs) | connect, capability discovery, evidence, Task/Point authoring, semantic/runtime separation, and governed Pack lifecycle skeleton |
| [Authoring quality](authoring-quality/) | weak vs production-quality authoring |
| [JavaScript](javascript/) | `@tryvira/sdk` `0.1.14` connect/observe, capability discovery, canonical authoring, runtime and response quality |
| [Python](python/) | `tryvira-sdk` `0.1.14` integration + response quality |
| [Semantic + runtime](semantic-runtime/) | semantic selection followed by governed runtime resolution |
| [MCP](mcp/) | `@tryvira/mcp` `0.1.14` host configuration, live tool discovery, authoring, and governed actions |
| [Marketing Pack](packs/marketing-starter/) | current manifest variables plus governed Pack materialization/evaluation/release concepts |
| [Strategy](strategy/marketing-launch.strategy.json) | compact `behavior_plan` Strategy |

## JavaScript starting points

```text
javascript/connect-observe.mjs
javascript/canonical-authoring.mjs
javascript/end-to-end-lifecycle.mjs
javascript/quality-decision.mjs
```

`canonical-authoring.mjs` demonstrates:

```text
listCapabilities
→ createSemanticTask
→ createBehaviorPoint
```

`end-to-end-lifecycle.mjs` additionally demonstrates that semantic resolution is not authority, runtime can legitimately deny before an eligible release exists, and Pack import must not be confused with production verification/release.

For the full lifecycle see the [Developer guide](../docs/developer-guide.md). For the public surface see [Capability map](../docs/capability-map.md). For direct Task/Point authoring see [Canonical authoring](../docs/canonical-authoring.md). For Pack validation/materialization/verification see [Packs](../docs/packs.md).
