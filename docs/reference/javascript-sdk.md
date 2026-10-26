# JavaScript / TypeScript SDK reference

Package:

```text
@vira/sdk
```

Runtime requirement:

```text
Node.js >= 20
```

## Install

```bash
npm install @vira/sdk
```

## Client

```ts
import { ViraClient, ViraApiError } from "@vira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
  timeoutMs: 15_000,
  retries: 2,
  failureMode: "throw",
  defaultHeaders: {
    "x-app-name": "my-agent",
  },
});
```

### `ViraClient` options

| Option | Type | Notes |
| --- | --- | --- |
| `baseUrl` | `string` | required Vira API origin |
| `apiKey` | `string?` | bearer credential |
| `fetcher` | `typeof fetch?` | custom transport/testing |
| `timeoutMs` | `number?` | bounded to 1s–120s |
| `retries` | `number?` | bounded to 0–5 |
| `failureMode` | `"throw" \| "open"` | enforcing requests remain fail-closed |
| `defaultHeaders` | `Record<string,string>?` | extra request headers |

## Response shape

```ts
interface ViraResponse<T = unknown> {
  status: number;
  body: T;
  requestId: string;
}
```

Keep `requestId` when reporting an integration problem.

## Errors

Non-2xx responses raise `ViraApiError` in the default failure mode.

```ts
try {
  await vira.resolveRuntime({...});
} catch (error) {
  if (error instanceof ViraApiError) {
    console.error(error.status, error.requestId, error.body);
  }
}
```

## Retry and idempotency behavior

GET requests are retryable.

Mutation requests are retryable only when an idempotency key is available. This avoids duplicating persisted changes after an ambiguous network failure.

The client uses bounded exponential retry behavior for retryable 5xx/429 responses.

---

## Connection methods

### `connectSystem(input)`

Creates/connects an AI system.

Required fields:

```ts
{
  name: string;
  systemType: string;
  organizationId: string;
  projectId: string;
  environmentId: string;
  idempotencyKey?: string;
}
```

### `connectAdapter(systemId, input)`

Connects an adapter to an existing AI system.

```ts
await vira.connectAdapter(systemId, {
  adapterType: "custom-node",
  adapterVersion: "1",
  capabilities: ["chat"],
  idempotencyKey: "adapter:my-agent:v1",
});
```

### `connectOnce(input)`

Convenience flow:

```text
connectSystem
→ connectAdapter
→ return system + connection + handshake
```

### `connectionHealth(connectionId)`

Reads connection health.

### `testConnection(connectionId)`

Runs the supported connection test.

### `inventory(systemId)`

Reads the connected system inventory.

---

## Observation methods

### `observe(event, options?)`

Required identity:

```ts
{
  eventId: string;
  eventType: string;
  aiSystemId: string;
  connectionId: string;
}
```

### `trace(event, options?)`

Convenience wrapper that emits `model.response`.

### `feedback(event, options?)`

Convenience wrapper that emits `feedback.user`.

### `outcome(event, options?)`

Convenience wrapper that emits `business.outcome`.

### `observeBatch(events, options?)`

Submits 1–100 observations in a bounded batch.

### `observeSdk(delivery, options?)`

Submits an SDK-form observation delivery.

### `discover(reviewState?)`

Lists evidence-backed discovery candidates.

---

## Signal methods

The SDK exposes the governed Signal lifecycle.

### `createSignalDiscoveryProposal(input, options?)`

Example:

```ts
const proposal = await vira.createSignalDiscoveryProposal({
  signalStableKey: "quality.missing_measurement",
  evidenceEventIds: ["evt-001", "evt-002"],
  suggestedProducerType: "observation_attribute",
  suggestedProducerKey: "quality.missing_measurement",
  confidence: 0.91,
});
```

### `reviewSignalDiscoveryProposal(proposalId, decision, options?)`

```ts
await vira.reviewSignalDiscoveryProposal(
  proposalId,
  "APPROVE",
);
```

### `materializeSignalDiscovery(proposalId, input?, options?)`

```ts
await vira.materializeSignalDiscovery(proposalId, {
  valueType: "boolean",
  description: "The response omitted a required measurement approach",
});
```

### `createSignalMapping(input, options?)`

```ts
const mapping = await vira.createSignalMapping({
  signalStableKey: "quality.missing_measurement",
  signalVersion: 1,
  producerType: "observation_attribute",
  producerKey: "quality.missing_measurement",
  sourceEventType: "model.response",
  evidenceEventIds: ["evt-001"],
});
```

### `getSignalMapping(mappingId)`

Reads one mapping.

### `reviewSignalMapping(mappingId, input?, options?)`

Approves or rejects a mapping proposal.

Signal authoring is review-based. A model suggestion is not immediately active.

---

## Semantic resolution

### `resolveSemantic(input)`

```ts
const semantic = await vira.resolveSemantic({
  input: "Create a launch plan for a membership service",
  profile: { domain: "marketing" },
  sessionId: "session-123",
  candidates: ["marketing.launch_plan"],
  timeoutMs: 3000,
});
```

Supported inputs include:

```ts
{
  input: string;
  profile?: Record<string, unknown>;
  sessionId?: string;
  selection?: Record<string, unknown>;
  candidates?: readonly string[];
  timeoutMs?: number;
  requestId?: string;
  idempotencyKey?: string;
}
```

The resolver can select or abstain. Treat the result as semantic evidence, not permission.

### `resolveSemanticRuntime(input)`

Convenience helper:

```text
resolveSemantic
→ if selected, determine Behavior Point
→ resolveRuntime
```

Use it when you want the two-stage flow without reimplementing the plumbing.

---

## Runtime methods

### `resolveRuntime(input)`

```ts
await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId,
    projectId,
    environmentId,
  },
  idempotencyKey: crypto.randomUUID(),
});
```

Runtime resolution applies the configured release and policy checks.

### `executeRuntime(input)`

Executes a versioned runtime request.

Runtime execution uses revision and execution values returned by Vira. Reuse those values rather than constructing them in application code.

For most application integrations, start with `resolveRuntime`.
Use `executeRuntime` only when your workflow already receives the required execution values from Vira.

---

## Behavior Program methods

### `listBehaviorPrograms()`

Lists scoped programs.

### `getBehaviorProgram(programId)`

Reads one program.

### `createBehaviorProgram(program, options?)`

Creates a program using the server-versioned schema.

For most new public authoring flows, Packs are easier because task, Behavior Point, program, strategy, policy, evaluation, approval, and release stay together.

---

## Behavior Strategy methods

### `listBehaviorStrategies()`

Lists Strategy definitions/revisions in scope.

### `getBehaviorStrategy(strategyId)`

Reads one Strategy.

### `createBehaviorStrategy(definition, id?)`

Creates a Strategy definition.

### `createBehaviorStrategyVariant(strategyId, variant, options?)`

Creates a variant when supported by the server version.

### `validateBehaviorStrategy(strategyId)`

Performs structural validation.

### `simulateBehaviorStrategy(strategyId, initialState?)`

Performs the explicit structural dry run.

Simulation does not mean real model/tool providers executed.

---

## Strategy execution

For normal integrations, create and validate Strategies, release them through the standard lifecycle, and resolve them through runtime.

---

## Pack methods

### `listPacks()`

Lists scoped Packs.

### `importPack(input)`

Supports:

- manifest + object payload;
- archive upload as base64 + filename.

Import creates a candidate. It does not activate behavior.

### `installPack(packId, variables?)`

Materializes the Pack draft.

### `evaluatePack(packId, input)`

```ts
await vira.evaluatePack(packId, {
  passed: true,
  score: 0.97,
  runId: "eval-001",
});
```

### `approvePack(packId)`

Explicit approval gate.

### `releasePack(packId)`

Releases an approved Pack.

### `previewPackUpgrade(packId, incoming)`

Previews an upgrade before applying it.

Normal lifecycle:

```text
import → install → evaluate → approve → release
```

---

## Teach and evaluation methods

### `submitTeachEvidence(evidence, options?)`

Submits Teach evidence.

### `startEvaluation(input, options?)`

Starts evaluation.

### `getEvaluation(evaluationId)`

Reads evaluation state/result.

### `createRelease(input, options?)`

Creates a governed release using the server-versioned release contract.

Use revision and evaluation values returned by Vira when creating a release.

---

## Recommended integration levels

### Level 1: Observe

Use:

```text
connectOnce
observe / feedback / outcome
```

### Level 2: Resolve

Add:

```text
resolveSemantic
resolveRuntime
```

### Level 3: Author behavior

Add:

```text
Signals
Packs
Programs
Strategies
Teach
Evaluation
Release
```
