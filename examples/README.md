# Vira examples

| Example | What it demonstrates |
| --- | --- |
| [JavaScript lifecycle walkthrough](javascript/end-to-end-lifecycle.mjs) | connect, capability discovery, evidence, Task/Point authoring, and semantic/runtime separation; the optional Pack section is a partial lifecycle skeleton |
| [JavaScript](javascript/) | `@tryvira/sdk` `0.1.43` connect/observe, capability discovery, canonical authoring, runtime and response quality |
| [Python](python/) | `tryvira-sdk` `0.1.43` integration + response quality |
| [Semantic + runtime](semantic-runtime/) | semantic selection followed by governed runtime resolution |
| [MCP](mcp/) | `@tryvira/mcp` `0.1.44` host configuration, live tool discovery, semantic/runtime resolution, basic authoring, and Teach evidence/proposal creation |
| [Marketing Pack](packs/marketing-starter/) | current manifest variables plus governed Pack materialization/evaluation/release concepts |
| [Strategy integration](strategy/) | references to the published SDK/API contracts |

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

`end-to-end-lifecycle.mjs` additionally demonstrates that semantic resolution is not authority, runtime can legitimately deny before an eligible release exists, and Pack import must not be confused with production verification/release. This file is not a full production-release demo: it does not create/evaluate/release a complete Pack or complete the later Teach loop.

For the lifecycle walkthrough see the [Developer guide](../docs/developer-guide.md). For the public surface see [Capability map](../docs/capability-map.md). For direct Task/Point authoring see [Canonical authoring](../docs/canonical-authoring.md). For Pack validation/materialization/verification see [Packs](../docs/packs.md).

Every example directory includes a copy/paste English prompt for a coding agent. The
prompts require contract discovery, scoped credentials, real receipts, negative-path
tests, and explicit approval before release; they are not instructions to fabricate
success or bypass Vira authority.
