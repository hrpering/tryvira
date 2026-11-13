# Vira examples

| Example | What it demonstrates |
| --- | --- |
| [TaskRun modes: JS](javascript/taskrun-modes.mjs) | route-only by default for SINGLE, STRATEGY, COMPOUND, HYBRID and AUTO; optional gated live admission, never fake success |
| [TaskRun modes: Python](python/taskrun_modes.py) | same five choices with Python's published client; route-only by default |
| [Structured dual-prompt scenario fixtures](scenarios/README.md) | 12 synthetic tasks, 24 copyable prompts, behavior checks and negative cases; schema tested offline |
| [Use-case prompts by complexity](../docs/use-cases.md) | 12 beginner-to-advanced scenarios and negative cases; these are not runnable integrations |
| [JavaScript lifecycle walkthrough](javascript/end-to-end-lifecycle.mjs) | connect, capability discovery, evidence, Task/Point authoring, and semantic/runtime separation; the optional Pack section is a partial lifecycle skeleton |
| [JavaScript](javascript/) | `@tryvira/sdk` (latest `0.1.44`) connect/observe, capability discovery, canonical authoring, runtime and response quality |
| [Python](python/) | `tryvira-sdk` `0.1.44` integration + response quality |
| [Semantic + runtime](semantic-runtime/) | semantic selection followed by governed runtime resolution |
| [MCP](mcp/) | `@tryvira/mcp` `0.1.44` host configuration, live tool discovery, semantic/runtime resolution, basic authoring, and Teach evidence/proposal creation |
| [Marketing Pack](packs/marketing-starter/) | current manifest variables plus governed Pack materialization/evaluation/release concepts |
| [Strategy integration](strategy/) | references to the published SDK/API contracts |

See also the [Observe → Signal → Teach → runtime verification walkthrough](observe-signal-verify/README.md). This is a documented learning scenario, not a fake live execution result.

## JavaScript starting points

```text
javascript/connect-observe.mjs
javascript/taskrun-modes.mjs
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

The [execution modes guide](../docs/execution-modes.md) distinguishes a single task from a multi-step Strategy, multiple Compound tasks, Hybrid child modes and AUTO selection. Admission requires real registered and released resources, role/scope and host eligibility; a route proposal or local build is not a live success.

**Verification scope:** the Next.js pinned npm client has [offline TaskRun request contract tests](frameworks/node-next/test/taskrun-sdk.test.mjs). The Python version has an [offline exported-method check](../scripts/check-published-python-sdk.py). Neither establishes hosted tenant acceptance.

For the lifecycle walkthrough see the [Developer guide](../docs/developer-guide.md). For the public surface see [Capability map](../docs/capability-map.md). For direct Task/Point authoring see [Canonical authoring](../docs/canonical-authoring.md). For Pack validation/materialization/verification see [Packs](../docs/packs.md).

Every example directory includes a copy/paste English prompt for a coding agent. The
prompts require contract discovery, scoped credentials, real receipts, negative-path
tests, and explicit approval before release; they are not instructions to fabricate
success or bypass Vira authority.
