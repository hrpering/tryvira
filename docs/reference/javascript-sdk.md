# JavaScript / TypeScript SDK reference

Published package: `@tryvira/sdk` (`0.1.14`). Runtime: Node.js 20+.

```bash
npm install @tryvira/sdk
```

```ts
import { ViraClient, ViraApiError } from "@tryvira/sdk";
```

The package is MIT-licensed. The Vira service/backend are governed separately.

## Client configuration

```ts
const vira = new ViraClient({
  baseUrl: process.env.VIRA_CONTROL_URL ?? process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
  timeoutMs: 15_000,
  retries: 2,
  failureMode: "throw",
});
```

Use placeholders in checked-in examples. Never commit a real API key, MCP token, tenant identifier, production trace, or private endpoint.

The SDK is a thin authority-aware HTTP client. It does not execute tools locally for Vira, release behavior locally, or create a second telemetry/authority store.

## Recommended lifecycle

```text
connectOnce
→ observe / trace / feedback / outcome
→ discover capabilities
→ resolveSemantic
→ author or select governed behavior
→ evaluate / approve / release where required
→ resolveRuntime or executeRuntime
→ receipt / trace / outcome
→ Teach / re-evaluate
```

Semantic resolution is candidate/evidence selection. It is not authorization. Runtime and effectful mutations remain governed by server-side scope, role, policy, release state and idempotency contracts.

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
deleteAISystem
```

`connectOnce` composes the normal system + adapter connection flow and returns system, connection and handshake state.

```ts
const connected = await vira.connectOnce({
  name: "my-agent",
  systemType: "custom-agent",
  organizationId: process.env.VIRA_ORGANIZATION_ID!,
  projectId: process.env.VIRA_PROJECT_ID!,
  environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:my-agent:v1",
});
```

## Scoped capability discovery

```ts
const capabilities = await vira.listCapabilities({ surface: "sdk" });
```

Do not assume every credential/deployment exposes every operation. Capability discovery describes the scoped product surface and is separate from runtime capability attestation/resolution.

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

Observations are evidence. They do not activate or publish behavior.

```ts
await vira.observe({
  eventId: "event-001",
  eventType: "model.response",
  aiSystemId,
  connectionId,
  payload: { message: "A model response was produced." },
}, { idempotencyKey: "event-001" });
```

## Canonical authoring

Semantic Tasks:

```text
listSemanticTasks
createSemanticTask
deleteSemanticTask
```

Behavior Points:

```text
listBehaviorPoints
createBehaviorPoint
deleteBehaviorPoint
```

```ts
const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  examples: ["Build a launch plan for a membership product"],
  negativeExamples: ["Write a single ad headline"],
});

const taskId = String(task?.body.task?.id ?? "");

const point = await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId,
  constraints: [
    "cover the required funnel stages",
    "include a measurement approach"
  ],
});
```

See [Canonical authoring](../canonical-authoring.md) and [Authoring quality](../authoring-quality.md).

## Explicit deletion

Deletion is opt-in and confirmed. The current SDK exposes:

```text
deleteAISystem
deleteSemanticTask
deleteBehaviorPoint
deleteBehaviorStrategy
```

Each method requires the resource ID and sends `confirm: true` only when the caller explicitly opts in. Use stable idempotency keys for retries. Deletion remains server-authorized and can be rejected for active/in-use/ineligible resources.

```ts
await vira.deleteSemanticTask(taskId, {
  confirm: true,
  idempotencyKey: `delete:semantic-task:${taskId}`,
});
```

Do not use deletion as a substitute for rollback, release history, or deactivation semantics.

## Signals

```text
createSignalDiscoveryProposal
reviewSignalDiscoveryProposal
materializeSignalDiscovery
createSignalMapping
getSignalMapping
reviewSignalMapping
```

## Semantic and runtime resolution

```text
resolveSemantic
resolveRuntime
resolveBoundary
resolveSemanticRuntime
executeRuntime
```

```ts
const semantic = await vira.resolveSemantic({
  input: "answer a customer billing question",
  profile: { domain: "support" },
});

const runtime = await vira.resolveRuntime({
  behaviorPoint: "support.answer",
  executionBoundary: {
    organizationId: process.env.VIRA_ORGANIZATION_ID!,
    projectId: process.env.VIRA_PROJECT_ID!,
    environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  },
  idempotencyKey: "runtime:billing:001",
});
```

Do not treat `semantic` as an authorization token. Runtime may abstain, deny, require a released revision, or return governed projection/receipt data.

## Behavior Programs

```text
listBehaviorPrograms
getBehaviorProgram
createBehaviorProgram
```

Programs hold bounded behavior logic such as guard, judgment, transform, verification and escalation. Use canonical server-side identities instead of inventing a parallel local behavior store.

## Behavior Strategies

Definition/lifecycle:

```text
listBehaviorStrategies
getBehaviorStrategy
createBehaviorStrategy
createBehaviorStrategyVariant
validateBehaviorStrategy
simulateBehaviorStrategy
activateBehaviorStrategy
deleteBehaviorStrategy
```

Execution:

```text
startStrategyExecution
getStrategyExecution
getStrategyExecutionTrace
continueStrategyExecution
cancelStrategyExecution
```

Activation is an explicit server-side state transition. Strategy execution should start from an eligible immutable artifact. If execution reaches a waiting state, continue the same execution with its authority digest plus `state`/`references`; do not create a new execution merely to bypass the wait state.

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

The governed lifecycle is:

```text
import
→ parse / validate / inventory conflicts
→ configure
→ install/materialize draft
→ evaluate
→ approve
→ release
```

Import never activates behavior. Installation materializes canonical objects; evaluation/approval/release remain separate authority steps. See [Packs](../packs.md).

## Teach AI

```text
submitTeachEvidence
createTeachProposal
transitionTeachProposal
```

Proposal transitions include `review`, `evaluate`, and `promote`. Promotion still does not silently grant runtime release authority.

## Behavior Evaluation

```text
startEvaluation
getEvaluation
```

## Response Quality & Decision

```text
evaluateQuality
```

This evaluates bounded response candidates. It is not Behavior Evaluation and it does not grant release authority.

## Release

```text
createRelease
```

Release activates the exact approved governed identity. Preserve returned request/receipt/trace identifiers for audit and support.

## Advanced runtime surfaces

Runtime capability negotiation:

```text
attestCapabilities
resolveCapabilities
recordCapabilityTrace
```

Model serving:

```text
resolveModelServing
recordModelServingTrace
```

Behavior capsule/projection:

```text
compileBehaviorCapsule
serveBehaviorProjection
```

Deployment evidence:

```text
recordDeploymentComparison
recordDeploymentHealth
```

## Errors, retries and failure modes

Responses expose `status`, `body`, and `requestId`. The default failure mode raises `ViraApiError` for failed requests.

GET requests are safely retryable. Mutations should be retried only with an idempotency key. Observation-only telemetry may intentionally use an open failure mode; enforcing runtime/effectful calls should remain fail-closed.

```ts
try {
  await vira.resolveRuntime(input);
} catch (error) {
  if (error instanceof ViraApiError) {
    console.error(error.status, error.requestId, error.body);
  }
  throw error;
}
```

## End-to-end example

See [Developer guide](../developer-guide.md) and [`examples/javascript/end-to-end-lifecycle.mjs`](../../examples/javascript/end-to-end-lifecycle.mjs).
