# Vira developer guide

This guide is the public, implementation-oriented path from installing a client to authoring a Behavior Point, evaluating/releasing governed behavior, resolving it at runtime, and moving the same concepts through a Pack.

It intentionally documents public contracts only. It does not contain production credentials, private infrastructure addresses, internal service topology, customer identifiers, or operator-only configuration.

## 1. Choose an integration

| Need | Package / surface | Install |
| --- | --- | --- |
| Node.js / TypeScript application or agent | `@tryvira/sdk` `0.1.14` | `npm install @tryvira/sdk` |
| Python application or agent | `tryvira-sdk` `0.1.14` | `python -m pip install tryvira-sdk` |
| MCP-compatible host | `@tryvira/mcp` `0.1.14` | `npx -y @tryvira/mcp` |
| Direct HTTP | `/v1/*` API | See [HTTP API reference](reference/api.md) |

JavaScript, Python and MCP are clients of the same scoped authority boundary. They are not independent behavior authorities.

## 2. Configure safely

Use environment variables and placeholders in checked-in examples:

```dotenv
VIRA_API_URL=https://api.example.invalid
VIRA_API_KEY=<customer-api-key>
VIRA_ORGANIZATION_ID=<organization>
VIRA_PROJECT_ID=<project>
VIRA_ENVIRONMENT_ID=<environment>
```

For MCP effectful operations, configure the MCP authority values described in [MCP integration](reference/mcp.md).

Do not commit real API keys, MCP tokens, tenant IDs, production traces, customer data, or private endpoints.

## 3. Understand the authority model first

The lifecycle is deliberately split:

```text
Connect
→ Observe
→ Discover / Semantic Resolve
→ Author Task / Point / Program / Strategy
→ Review / Evaluate
→ Activate and/or Release explicitly
→ Runtime Resolve / Execute
→ Receipt / Trace / Outcome
→ Teach / Re-evaluate
```

Important boundaries:

- semantic selection is evidence/candidate selection, not authorization;
- a Behavior Point is a governed attachment point, not a prompt string;
- Strategy activation is explicit and does not bypass release/runtime rules;
- Pack import is a draft candidate, not activation;
- Teach promotion does not silently make production behavior active;
- runtime consumes released/eligible identities through the authority boundary;
- effectful mutations should be idempotent and fail closed.

## 4. Connect an AI system once

JavaScript:

```ts
import { ViraClient } from "@tryvira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_CONTROL_URL ?? process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
});

const scope = {
  organizationId: process.env.VIRA_ORGANIZATION_ID!,
  projectId: process.env.VIRA_PROJECT_ID!,
  environmentId: process.env.VIRA_ENVIRONMENT_ID!,
};

const connected = await vira.connectOnce({
  ...scope,
  name: "example-agent",
  systemType: "custom-agent",
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:example-agent:v1",
});

const systemId = String(connected?.body.system?.id ?? "");
const connectionId = String(connected?.body.connection?.id ?? "");
```

Python equivalent: `connect_once(...)`.

HTTP equivalent: create/connect under `/v1/ai-systems` and `/v1/ai-systems/{systemId}/connections`.

## 5. Discover the scoped capability surface

Do this before assuming that a deployment/credential exposes a feature.

```ts
const capabilities = await vira.listCapabilities({ surface: "sdk" });
```

```python
capabilities = client.list_capabilities(surface="python")
```

```http
GET /v1/capabilities?surface=api
```

MCP: `list_capabilities`.

Capability discovery is not runtime capability attestation. Those are separate advanced runtime operations.

## 6. Record evidence

```ts
await vira.observe({
  eventId: "event-001",
  eventType: "model.response",
  aiSystemId: systemId,
  connectionId,
  payload: {
    message: "A model response was produced."
  }
}, { idempotencyKey: "event-001" });
```

Related helpers include `trace`, `feedback`, `outcome`, `observeBatch`, and the corresponding Python methods.

Observations are evidence. They never publish behavior by themselves.

## 7. Create a Semantic Task

A Semantic Task describes the work Vira should recognize.

```ts
const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  examples: [
    "Build a launch plan for a membership product"
  ],
  negativeExamples: [
    "Write a single ad headline"
  ],
});

const taskId = String(task?.body.task?.id ?? "");
if (!taskId) throw new Error("TASK_ID_MISSING");
```

Good Task authoring uses specific positive and negative examples. Do not create a task whose meaning is only a vague label.

## 8. Create a Behavior Point

A Behavior Point is the stable governed attachment point for behavior.

```ts
const point = await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId,
  constraints: [
    "cover the required funnel stages",
    "include a measurement approach",
    "state material assumptions"
  ],
});
```

Python uses `create_behavior_point`. MCP exposes `create_behavior_point` when advertised by the scoped server. HTTP uses `POST /v1/behavior-points`.

Do not use a Behavior Point as an unbounded prompt dump. Keep the stable requirement at the Point and move richer bounded behavior into Programs/Strategies.

See [Behavior Points](behavior-points.md) and [Authoring quality](authoring-quality.md).

## 9. Add a Behavior Program

Programs express bounded behavior such as:

```text
guard
→ judgment
→ transform
→ verification
→ escalation
```

Use the current public SDK methods:

```text
listBehaviorPrograms
getBehaviorProgram
createBehaviorProgram
```

Use the server-returned canonical IDs/digests. Do not mirror Programs into a second local authority store.

See [Behavior Programs](behavior-programs.md) for the current schema and examples.

## 10. Add and validate a Strategy

A Strategy defines a bounded multi-step approach. The exact definition should come from a reviewed Strategy artifact, not an ad-hoc runtime object.

```ts
const created = await vira.createBehaviorStrategy(definition);
const strategyId = String(created?.body.strategy?.id ?? created?.body.id ?? "");

await vira.validateBehaviorStrategy(strategyId);
await vira.simulateBehaviorStrategy(strategyId, {});
await vira.activateBehaviorStrategy(strategyId);
```

Validation checks structure. Simulation is a structural dry run and is not evidence that real providers/tools executed.

Activation is a server-side lifecycle transition. It does not give permission to skip evaluation, release, scope, policy, or runtime authority checks.

See [Strategies](strategies.md), [Strategy result modes](strategy-result-modes.md), and the concrete JSON examples under `examples/authoring-quality/`.

## 11. Resolve semantics

```ts
const semantic = await vira.resolveSemantic({
  input: "Build a full launch plan for our new subscription product",
  profile: { domain: "marketing" },
});

console.log(semantic?.body);
```

Expected outcomes can include a selected candidate, uncertainty/abstention, or no eligible match depending on the current server contract.

Never feed a semantic selection directly into an effectful action as if the classification itself granted permission.

## 12. Evaluate and release

Behavior Evaluation and release are separate authority steps.

Common public operations:

```text
startEvaluation
getEvaluation
createRelease
```

Teach proposal lifecycle is also explicit:

```text
submitTeachEvidence
createTeachProposal
transitionTeachProposal(review)
transitionTeachProposal(evaluate)
transitionTeachProposal(promote)
```

Teach promotion still does not silently grant release authority.

Preserve returned `requestId`, receipt and trace identifiers. Do not reconstruct a release identity client-side.

See [Evaluation and approval](evaluation-and-approval.md), [Teach AI](teach.md), and [Release](release.md).

## 13. Resolve at runtime

```ts
const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: scope,
  idempotencyKey: "runtime:launch-plan:001",
});

console.log(runtime?.body);
```

Runtime is the enforcing boundary. It may deny, abstain, require an eligible released revision, or return governed Strategy/projection/receipt data.

Use `executeRuntime` when the integration needs the effectful execution boundary rather than resolution only.

## 14. Continue Strategy executions correctly

Strategy executions are pinned to governed execution state.

If an execution reaches `WAITING_USER` or `WAITING_HOST`, continue that same execution using its persisted authority digest and the new state/references:

```ts
await vira.continueStrategyExecution(executionId, {
  authorityDigest,
  state: { answer: "approved" },
  references: {
    userInput: { answer: "approved" }
  }
});
```

Do not start a replacement execution merely to bypass a wait state.

## 15. Package the same authoring as a Vira Pack

Use a Pack when related Tasks, Points, Programs, Strategies, policies/signals and evaluation material should move together.

Manifest example:

```yaml
id: vira.marketing.starter
name: Marketing Starter
version: 1.1.0
requires:
  vira: ">=1.0"
variables:
  - key: brand_name
    label: Brand name
    required: true
  - key: markets
    label: Markets
    type: multi_select
```

Supported inputs include YAML/JSON manifests, ZIP archives with collection folders, JSON/YAML collections in ZIPs, and supported XLSX workbook sheets.

## 16. Import and inspect a Pack

```ts
const imported = await vira.importPack({
  manifest,
  objects,
  idempotencyKey: "pack:import:vira.marketing.starter:1.1.0",
});

const packId = String(imported?.body.pack?.id ?? "");
```

Import means parse/admit a candidate. It does not activate behavior.

Inspect the returned inventory/conflicts and satisfy required configuration before installation.

## 17. Install/materialize the Pack

```ts
await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"]
});
```

Installation is canonical materialization. It can create the governed Task, Point, Program, Strategy/variant, policy and immutable revision records represented by the Pack. It should preserve digest-bound materialization/receipt information.

It is still not release.

## 18. Verify a Pack before production

There is intentionally no client-side `verifyPack()` call that can declare a candidate production-safe.

The verification chain is:

```text
parse/import
→ validate structure
→ inspect inventory/conflicts
→ configure
→ install/materialize draft
→ evaluate
→ approve
→ release
→ runtime resolve
→ inspect receipts/traces
```

Example lifecycle:

```ts
await vira.evaluatePack(packId, {
  passed: true,
  score: 1,
  runId: "example-eval-001"
});

await vira.approvePack(packId);
await vira.releasePack(packId);
```

A failing validation/evaluation must not be bypassed by editing a local status or forging a release identity.

Before upgrading an installed Pack, use `previewPackUpgrade` / `preview_pack_upgrade` to inspect conflicts and preserve customer overrides.

See [Packs](packs.md).

## 19. MCP equivalent

Run:

```bash
npx -y @tryvira/mcp
```

Then use the discovery sequence:

```text
server/discover
→ initialize
→ tools/list
→ tools/call
```

Do not hard-code a tool count or assume a tool exists because an older package exposed it. The current scoped server is the source of truth.

Read-only semantic discovery and effectful runtime/authoring operations have different authority requirements. See [MCP integration](reference/mcp.md).

## 20. HTTP equivalent

The canonical public routes include the versioned `/v1` surfaces for AI systems, observations, Semantic Tasks, Behavior Points, Programs, Strategies, Packs, Teach, Evaluation, Release, semantic resolution and runtime resolution/execution.

See [HTTP API reference](reference/api.md) instead of duplicating route inventories in application code.

## 21. Error handling and retries

Default SDK behavior is fail-closed for failed requests.

Rules:

- keep returned `requestId` values;
- GETs may be retried safely;
- retry mutations only with an idempotency key;
- preserve receipts/digests rather than recomputing them;
- observation-only telemetry may intentionally use an open failure mode;
- enforcing runtime/effectful calls should remain fail-closed;
- an authentication success is not an authorization success.

Typical failures can represent wrong scope, missing role, unreleased behavior, invalid digest, policy denial, missing Strategy selection or unavailable verification capability.

## 22. Public-repository security checklist

Before committing an example:

- replace every credential with `<...>` placeholders;
- use synthetic organization/project/environment values;
- remove private hostnames/IPs;
- remove production trace/receipt payloads that may contain customer data;
- do not copy `.env` files;
- do not copy internal-only deployment/operator instructions;
- do not imply a local development bypass is valid in production;
- do not turn semantic confidence into authority in sample code.

## 23. Copyable examples

- JavaScript full lifecycle: [`examples/javascript/end-to-end-lifecycle.mjs`](../examples/javascript/end-to-end-lifecycle.mjs)
- Canonical authoring: [`examples/javascript/canonical-authoring.mjs`](../examples/javascript/canonical-authoring.mjs)
- Pack example: [`examples/packs/marketing-starter/`](../examples/packs/marketing-starter/)
- Strategy examples: [`examples/authoring-quality/`](../examples/authoring-quality/)
- MCP examples: [`examples/mcp/`](../examples/mcp/)
- Python examples: [`examples/python/`](../examples/python/)

## Related reference

- [JavaScript / TypeScript SDK](reference/javascript-sdk.md)
- [Python SDK](reference/python-sdk.md)
- [MCP integration](reference/mcp.md)
- [HTTP API](reference/api.md)
- [Capability discovery](capability-discovery.md)
- [Canonical authoring](canonical-authoring.md)
- [Packs](packs.md)
- [Runtime](runtime.md)
- [Security model](security-model.md)
