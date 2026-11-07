# Vira developer guide

This guide is the public, implementation-oriented path from installing a client to authoring a Behavior Point, evaluating/releasing governed behavior, resolving it at runtime, and moving the same concepts through a Pack.

It intentionally documents public contracts only. It does not contain production credentials, private infrastructure addresses, internal service topology, customer identifiers, or operator-only configuration.

## 1. Choose an integration

| Need | Package / surface | Install |
| --- | --- | --- |
| Node.js / TypeScript application or agent | `@tryvira/sdk` `0.1.43` | `npm install @tryvira/sdk@0.1.43` |
| Python application or agent | `tryvira-sdk` `0.1.43` | `python -m pip install tryvira-sdk==0.1.43` |
| MCP-compatible host | `@tryvira/mcp` `0.1.44` | `npx -y @tryvira/mcp@0.1.44` |
| Direct HTTP | `/v1/*` API | See [HTTP API reference](reference/api.md) |

JavaScript, Python and MCP use the scoped authority boundary, but their method and tool coverage differs. Use each surface's reference and discover MCP tools at runtime.

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
  baseUrl: process.env.VIRA_API_URL!,
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

Python uses `create_behavior_point`. The published MCP package exposes `create_behavior_point`; confirm the installed tool schema with `tools/list`. HTTP uses `POST /v1/behavior-points`.

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

See [Strategies](strategies.md) and the published SDK/API references for exact contracts.

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
const installResponse = await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"],
});
let installedPack = installResponse?.body.pack;
let materialization = installResponse?.body.materialization ?? installedPack?.objects?.materialization;

if (installResponse.status === 202) {
  // The response only confirms queueing. Confirm materialization with the
  // public listPacks readback before starting evaluation.
  const deadline = Date.now() + 30_000;
  while (!materialization && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    const listed = await vira.listPacks();
    installedPack = listed?.body.packs?.find((item) => item.id === packId);
    materialization = installedPack?.objects?.materialization;
  }
}

const packDigest = String(installedPack?.digest ?? "");
if (installedPack?.id !== packId || !packDigest || !materialization) {
  throw new Error("PACK_MATERIALIZATION_NOT_CONFIRMED");
}
```

Installation is canonical materialization. It can create the governed Task, Point, Program, Strategy/variant, policy and immutable revision records represented by the Pack. It should preserve digest-bound materialization/receipt information. If it returns HTTP 202, the job is queued and installation is not yet complete. The public SDK has no Pack-job polling method; inspect job completion through the authorized operator surface before evaluation.

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
const started = await vira.startEvaluation({
  id: "marketing-starter-evaluation-001",
  targetArtifact: {
    packId,
    packDigest,
    criteria: ["Follow the installed Pack behavior and its required constraints."],
  },
  dataset: [{
    id: "case-1",
    input: "Create a launch plan for a B2B subscription product.",
    criteria: ["Cover the requested funnel stages.", "Include measurable next steps."],
  }],
  threshold: 0.8,
});
const evaluationId = String(started?.body.evaluation?.id ?? "");
if (!evaluationId || started?.body.evaluation?.status !== "PASSED") {
  throw new Error("PACK_EVALUATION_NOT_PASSED");
}
await vira.evaluatePack(packId, { evaluationId });
// After receipt review, call approvePack(packId) and then releasePack(packId) as separate authorized actions.
```

The provider-backed evaluation produces an answer from the supplied input and criteria and persists a trusted result bound to the Pack digest. That result alone does not prove the installed behavior executed at runtime; use runtime/candidate execution receipts for that claim. A non-empty response is only an answer-presence
check; it is not proof that the task was completed correctly. Keep these dimensions
separate:

| Dimension | Question | Example failure |
| --- | --- | --- |
| Task correctness | Did the candidate solve the requested task? | a polished answer that solves a different task |
| Behavior compliance | Did it follow the Behavior Point and Program? | omitted a required funnel stage |
| Groundedness | Are claims supported by supplied evidence? | invented campaign results |
| Safety/authority | Did it respect policy and scope? | acted without required approval |
| Useful specificity | Is it actionable without fabricated detail? | generic advice with no usable next step |

Unknown or unavailable evaluators must fail closed. Never turn a client-provided
`passed`, `score`, `answer`, or fabricated output into release evidence.

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

The MCP tool catalog is refreshed from the latest published package. Do not assume an SDK method or API route has an MCP equivalent; use the current [tool catalog](reference/mcp-tools.md) and confirm the installed schema with `tools/list`.

Read-only semantic discovery and effectful runtime/authoring operations have different authority requirements. See [MCP integration](reference/mcp.md).

## 20. HTTP equivalent

The canonical public routes include the versioned `/v1` surfaces for AI systems, observations, Semantic Tasks, Behavior Points, Programs, Strategies, Packs, Teach, Evaluation, Release, semantic resolution and runtime resolution/execution.

See [HTTP API reference](reference/api.md) instead of duplicating route inventories in application code.

## 21. Delete eligible resources explicitly

Deletion is a separate effectful lifecycle, not a cleanup side effect of authoring or release.

The JavaScript SDK exposes:

```text
deleteAISystem
deleteSemanticTask
deleteBehaviorPoint
deleteBehaviorStrategy
```

Python and MCP expose the corresponding snake_case operations. Direct HTTP uses confirmed `DELETE` routes for those resources.

A JavaScript example:

```ts
await vira.deleteSemanticTask(taskId, {
  confirm: true,
  idempotencyKey: `delete:semantic-task:${taskId}`,
});
```

Rules:

- require explicit `confirm: true`;
- use a stable idempotency key for retries;
- expect the server to reject active, referenced, in-use, or otherwise ineligible resources;
- do not use deletion to imitate rollback, release history, deactivation, or tenant-scope bypass;
- preserve request IDs and any returned audit/receipt identifiers.

## 22. Error handling and retries

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

## 23. Public-repository security checklist

Before committing an example:

- replace every credential with `<...>` placeholders;
- use synthetic organization/project/environment values;
- remove private hostnames/IPs;
- remove production trace/receipt payloads that may contain customer data;
- do not copy `.env` files;
- do not copy internal-only deployment/operator instructions;
- do not imply a local development bypass is valid in production;
- do not turn semantic confidence into authority in sample code.

## 24. Copyable examples

- JavaScript full lifecycle: [`examples/javascript/end-to-end-lifecycle.mjs`](../examples/javascript/end-to-end-lifecycle.mjs)
- Canonical authoring: [`examples/javascript/canonical-authoring.mjs`](../examples/javascript/canonical-authoring.mjs)
- Pack example: [`examples/packs/marketing-starter/`](../examples/packs/marketing-starter/)
- Strategy integration guidance: [`docs/strategies.md`](strategies.md)
- MCP examples: [`examples/mcp/`](../examples/mcp/)
- Python examples: [`examples/python/`](../examples/python/)

## 25. Teach AI: improve behavior without silently shipping it

Teach AI is an evidence-to-proposal workflow. It is useful when repeated observations,
feedback, or outcomes show that an existing behavior needs improvement.

```text
admit evidence
→ summarize the observed failure
→ create a bounded proposal
→ review proposed changes
→ execute the candidate against real cases
→ evaluate regressions and required behavior
→ approve the exact candidate identity
→ release explicitly
→ verify runtime readback
```

Use a small, representative evaluation set:

```json
[
  {"id":"positive-1","input":"Create a launch plan","must":"cover all funnel stages"},
  {"id":"boundary-1","input":"Write one headline","must":"abstain from launch-plan behavior"},
  {"id":"evidence-1","input":"Use these campaign results","must":"not invent missing metrics"},
  {"id":"policy-1","input":"Publish the campaign now","must":"require explicit authority"}
]
```

The final release must reference the new immutable revision and digest. Existing
released artifacts remain unchanged. After release, perform a runtime readback and
store the evaluation, approval, release, and runtime receipts together.

## 26. Production acceptance checklist

Use this checklist as a gate, not as a claim of success:

### Before authoring

- [ ] The organization, project, environment, and API key are explicit.
- [ ] The use case has positive, negative, boundary, and failure examples.
- [ ] Evidence sources and privacy/retention requirements are known.
- [ ] A Program is sufficient, or the need for a bounded Strategy is documented.

### Before evaluation

- [ ] Pack import returned a candidate identity and digest.
- [ ] Inventory, conflicts, required variables, and schema validation were inspected.
- [ ] Installation materialized the expected canonical objects.
- [ ] Candidate execution uses the actual candidate behavior, not the original prompt.
- [ ] The evaluator has authority and all required rubric dimensions.
- [ ] Missing evaluator, empty output, policy violation, and wrong-task cases fail.

### Before release

- [ ] Evaluation is `PASSED` and receipt-bound to the exact digest.
- [ ] Required reviewer approvals are present and attributable.
- [ ] The release identity is immutable and differs from the prior revision when behavior changed.
- [ ] No production authority was mutated while a gate was failing.

### After release

- [ ] Runtime readback resolves the expected in-scope identity.
- [ ] A known allowed request succeeds through the runtime boundary.
- [ ] A denied/abstained request cannot reach a bypass path.
- [ ] Receipts/traces are stored without secrets or customer-sensitive payloads.

## 27. Prompt for a coding agent

```text
Implement Vira in this existing application using the public developer guide and the
installed SDK declarations as the source of truth.

Start by inspecting the repository, package manager, runtime version, configuration,
existing AI entry point, and test conventions. Do not invent endpoints or modify
production authority until the plan has been verified.

Deliver the smallest complete path:
1. connect the AI system with the explicit organization/project/environment scope;
2. record one sanitized observation with an idempotency key;
3. discover capabilities before using optional features;
4. author a bounded Semantic Task and Behavior Point, or explain why a Pack is better;
5. define positive, negative, boundary, missing-evidence, and policy-violation cases;
6. execute the real candidate behavior during evaluation;
7. require all configured quality dimensions and fail closed when evaluator authority
   or candidate output is missing;
8. stop before approval/release and show the exact receipt and reviewer decision needed;
9. after explicit approval, release the exact immutable identity and verify runtime
   readback.

Do not fabricate scores, receipts, outputs, approvers, release state, or customer data.
Do not use semantic confidence as authorization. Do not bypass a deny or abstain by
calling a model/tool directly. Return a file-by-file patch, commands run, test output,
performance/cost considerations, and unresolved blockers.
```

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
