# JavaScript / TypeScript SDK reference

Published package: `@tryvira/sdk` (`0.1.6`). Runtime: Node.js 20+.

```bash
npm install @tryvira/sdk
```

```ts
import { ViraClient, ViraApiError } from "@tryvira/sdk";
```

The package is MIT-licensed. The Vira service/backend are governed separately.

## Client options

```ts
const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
  timeoutMs: 15_000,
  retries: 2,
  failureMode: "throw",
});
```

## Connected systems

```text
listAISystems
getAISystem
connectSystem
connectAdapter
connectOnce
connectionHealth
testConnection
inventory
```

`connectOnce` is the recommended convenience flow for normal application integration:

```text
connectSystem → connectAdapter → system + connection + handshake
```

## Scoped capability discovery

```text
listCapabilities
```

```ts
const capabilities = await vira.listCapabilities({ surface: "sdk" });
```

This describes the current scoped product capability surface. It is separate from runtime capability attestation/resolution.

See [Capability discovery](../capability-discovery.md).

## Observations and evidence

```text
observe
trace
feedback
outcome
observeBatch
observeSdk
discover
```

Observations are evidence; they do not publish behavior.

## Canonical authoring

Semantic Tasks:

```text
listSemanticTasks
createSemanticTask
```

Behavior Points:

```text
listBehaviorPoints
createBehaviorPoint
```

Example:

```ts
const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  examples: ["Build a launch plan for a membership product"],
  negativeExamples: ["Write a single ad headline"],
});

const taskId = String(task?.body.task?.id ?? "");

await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId,
  constraints: ["cover required funnel stages", "include measurement"],
});
```

See [Canonical authoring](../canonical-authoring.md).

## Signals

```text
createSignalDiscoveryProposal
reviewSignalDiscoveryProposal
materializeSignalDiscovery
createSignalMapping
getSignalMapping
reviewSignalMapping
```

## Semantic + runtime

```text
resolveSemantic
resolveRuntime
resolveBoundary
resolveSemanticRuntime
executeRuntime
```

Semantic results are not authorization. `resolveBoundary` is the boundary-first runtime helper for integrations that already have governed execution context.

## Behavior Programs

```text
listBehaviorPrograms
getBehaviorProgram
createBehaviorProgram
```

## Behavior Strategies

Definitions and lifecycle:

```text
listBehaviorStrategies
getBehaviorStrategy
createBehaviorStrategy
createBehaviorStrategyVariant
validateBehaviorStrategy
simulateBehaviorStrategy
activateBehaviorStrategy
```

Activation is an explicit server-side state transition. It is not a client-side status edit and does not bypass the relevant evaluation/release/runtime rules.

Execution:

```text
startStrategyExecution
getStrategyExecution
getStrategyExecutionTrace
continueStrategyExecution
cancelStrategyExecution
```

## Packs

```text
listPacks
importPack
installPack
evaluatePack
approvePack
releasePack
previewPackUpgrade
```

Lifecycle: `import → install → evaluate → approve → release`.

## Teach AI

```text
submitTeachEvidence
createTeachProposal
transitionTeachProposal
```

Proposal transitions are:

```text
review
evaluate
promote
```

Example:

```ts
const proposal = await vira.createTeachProposal({
  evidenceId,
  controlPointId,
  summary: "Launch plans should preserve full-funnel coverage and measurement.",
});

await vira.transitionTeachProposal(proposalId, "review", { decision: "APPROVE" });
await vira.transitionTeachProposal(proposalId, "evaluate", { score: 0.94, evaluationId });
await vira.transitionTeachProposal(proposalId, "promote", {});
```

Promotion still does not silently grant release authority. See [Teach AI](../teach.md).

## Behavior Evaluation

```text
startEvaluation
getEvaluation
```

## Response Quality & Decision

```text
evaluateQuality
```

```ts
const result = await vira.evaluateQuality({
  request: "Evaluate risks and next steps",
  candidates: [
    { id: "initial", output: "Generic response" },
    { id: "repair", output: "Risks and next steps with explicit assumptions" },
  ],
  allowedIds: ["initial", "repair"],
  requiredTerms: ["risks", "next steps"],
  threshold: 0.7,
});
```

This evaluates bounded response candidates; it does not grant release authority.

## Release

```text
createRelease
```

## Runtime capability negotiation

```text
attestCapabilities
resolveCapabilities
recordCapabilityTrace
```

Do not confuse these methods with `listCapabilities`, which discovers the scoped product surface.

## Model serving

```text
resolveModelServing
recordModelServingTrace
```

## Behavior capsule / projection

```text
compileBehaviorCapsule
serveBehaviorProjection
```

## Deployment evidence

```text
recordDeploymentComparison
recordDeploymentHealth
```

## Errors and retries

Responses expose `status`, `body`, and `requestId`. Non-2xx responses raise `ViraApiError` in default failure mode. GETs are retryable; mutations should only be retried with an idempotency key.

## Recommended adoption path

```text
1. connectOnce + testConnection
2. listCapabilities
3. observe / feedback / outcome
4. author or resolve Semantic Tasks / Behavior Points
5. Programs / Strategies / Signals
6. Teach AI + Behavior Evaluation + explicit activation/release
7. optional Response Quality & Decision
8. advanced Strategy execution / serving / projection / deployment evidence
```
