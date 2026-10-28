# JavaScript / TypeScript SDK reference

Published package: `@tryvira/sdk` (`0.1.5`). Runtime: Node.js 20+.

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

## Connection

```text
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

Definitions:

```text
listBehaviorStrategies
getBehaviorStrategy
createBehaviorStrategy
createBehaviorStrategyVariant
validateBehaviorStrategy
simulateBehaviorStrategy
```

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
```

Evidence enters a proposal/review/evaluation/release cycle. Evidence submission is not an authority change.

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

## Capability negotiation

```text
attestCapabilities
resolveCapabilities
recordCapabilityTrace
```

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
2. observe / feedback / outcome
3. resolveSemantic + resolveRuntime
4. Signals / Points / Programs / Strategies
5. Teach AI + Behavior Evaluation + Release
6. optional Response Quality & Decision
7. advanced Strategy execution / serving / projection / deployment evidence
```
