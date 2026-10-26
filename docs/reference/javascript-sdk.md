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

This is an enforcing boundary.

### `executeRuntime(input)`

Executes a versioned runtime request.

Runtime execution requires server-issued identities such as revision and execution data. Do not invent revision, nonce, or server-owned authority fields in application code.

### `compileBehaviorCapsule(input)`

Compiles the supported scoped Behavior VM capsule for a persisted program.

```ts
await vira.compileBehaviorCapsule({
  programId,
  input: "Create a launch plan",
  candidates: ["marketing.launch_plan"],
});
```

### `serveBehaviorProjection(input)`

Serves a provider-specific public behavior projection through the governed runtime boundary.

```ts
await vira.serveBehaviorProjection({
  programId,
  input: "Create a launch plan",
  provider: "provider-key",
  protocol: "chat",
});
```

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

## Strategy execution methods

### `startStrategyExecution(input)`

Starts execution of a persisted immutable Strategy artifact.

The input contains server-issued runtime identities and bounded execution information, including:

- artifact digest;
- scope;
- revision ID;
- idempotency key;
- nonce + expiry;
- decision plan;
- candidates;
- policy;
- optional Behavior Point;
- optional execution boundary;
- optional trace/execution IDs;
- optional state.

This is an advanced runtime API. Prefer higher-level resolve flows unless your integration manages Strategy execution directly.

### `getStrategyExecution(executionId)`

Reads execution state.

### `getStrategyExecutionTrace(executionId)`

Reads authenticated trace evidence for the execution.

Public documentation intentionally does not reproduce internal receipt payload structures.

### `continueStrategyExecution(executionId, continuation?)`

Continues a waiting execution with pinned state/references.

### `cancelStrategyExecution(executionId)`

Cancels a non-terminal execution.

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

Submits admitted Teach evidence.

### `startEvaluation(input, options?)`

Starts evaluation.

### `getEvaluation(evaluationId)`

Reads evaluation state/result.

### `createRelease(input, options?)`

Creates a governed release using the server-versioned release contract.

Use server-generated revision/evaluation identities. Do not manufacture internal release metadata.

---

## Capability methods

### `attestCapabilities(attestation, options?)`

Records supported host/runtime capability attestation.

### `resolveCapabilities(attestationId, request, options?)`

Resolves an enforcing capability decision.

### `recordCapabilityTrace(decisionDigest, trace, options?)`

Records the supported trace result for a capability decision.

---

## Model-serving methods

### `resolveModelServing(request, options?)`

Resolves model-serving selection through the governed boundary.

### `recordModelServingTrace(trace, selection, options?)`

Records the supported serving trace.

---

## Deployment methods

### `recordDeploymentComparison(deploymentId, comparison, options?)`

Records a deployment comparison.

### `recordDeploymentHealth(deploymentId, health, options?)`

Records authoritative deployment health.

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

### Level 4: Advanced runtime

Use only when needed:

```text
Strategy execution
Capabilities
Model serving
Behavior capsule/projection
Deployment comparison/health
```
