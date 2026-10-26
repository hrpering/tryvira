# JavaScript / TypeScript SDK

Package:

```text
@vira/sdk
```

## Install

```bash
npm install @vira/sdk
```

## Client

```ts
import { ViraClient } from "@vira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
  timeoutMs: 15000,
  retries: 2,
});
```

The client sends requests to Vira. It does not execute tools or recreate a second behavior authority inside the application.

## Connect

```ts
const connected = await vira.connectOnce({
  name: "marketing-agent",
  systemType: "custom-agent",
  organizationId,
  projectId,
  environmentId,
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:marketing-agent:v1",
});
```

## Observe

```ts
await vira.observe({
  eventId: crypto.randomUUID(),
  eventType: "model.response",
  aiSystemId,
  connectionId,
  payload: {
    messageType: "assistant",
    completed: true
  },
});
```

## Feedback

```ts
await vira.feedback({
  eventId: crypto.randomUUID(),
  aiSystemId,
  connectionId,
  feedback: {
    type: "correction",
    text: "Include retention and measurement."
  }
});
```

## Outcome

```ts
await vira.outcome({
  eventId: crypto.randomUUID(),
  aiSystemId,
  connectionId,
  outcome: {
    status: "completed",
    label: "accepted-with-edits"
  }
});
```

## Semantic resolution

```ts
const semantic = await vira.resolveSemantic({
  input: "Build a launch plan for a membership product",
  profile: {
    domain: "marketing"
  }
});
```

Do not treat the semantic result as authorization.

## Runtime resolution

```ts
const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId,
    projectId,
    environmentId
  },
  idempotencyKey: crypto.randomUUID()
});
```

Runtime resolution requires a governed released target.

## Combined semantic + runtime flow

When your SDK version exposes `resolveSemanticRuntime`, use it only as a convenience around the same two boundaries. Semantic selection does not grant runtime authority.

## Packs

Typical lifecycle:

```ts
await vira.importPack({...});
await vira.installPack(packId, variables);
await vira.evaluatePack(packId, { passed: true, score: 1 });
await vira.approvePack(packId);
await vira.releasePack(packId);
```

Import does not activate behavior.

Release requires the lifecycle gates configured by the server.

## Strategy execution

The SDK also supports strategy execution and continuation for released immutable strategy artifacts.

Continuation is for an existing waiting execution. Do not create a new execution to work around a waiting state.

## Failure modes

Observation-only paths may be configured differently from enforcing runtime paths.

Effectful runtime behavior should remain fail-closed when required.

## Keep request IDs

When an API error exposes a request ID, keep it for debugging.

Do not publish raw production traces or credentials in public issues.
