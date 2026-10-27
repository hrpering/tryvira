# Vira examples

Small, focused examples live here.

| Example | What it demonstrates |
| --- | --- |
| [Authoring quality](authoring-quality/) | weak vs production-quality Tasks, Points, response Strategies, and behavior-plan Strategies |
| [JavaScript](javascript/) | connect + observe using `@vira/sdk` |
| [Python](python/) | connect using `vira-sdk` |
| [Semantic + runtime](semantic-runtime/) | semantic selection followed by governed runtime resolution |
| [MCP](mcp/) | generic MCP host configuration |
| [Marketing Pack](packs/marketing-starter/) | Semantic Task + Behavior Point + Program + Signal keys + evaluation reference |
| [Strategy](strategy/marketing-launch.strategy.json) | compact `behavior_plan` Strategy for a downstream chatbot/model |

## Strategy examples

If Vira owns the final artifact, start with:

```text
authoring-quality/marketing-launch.response.strategy.json
```

If an existing chatbot/model owns final prose, start with:

```text
authoring-quality/marketing-launch.behavior-plan.strategy.json
```

Read [Strategy result modes](../docs/strategy-result-modes.md) before copying a Strategy into a real integration.

For a complete multi-step walkthrough, use the [Marketing Agent tutorial](../tutorials/marketing-agent/README.md).
