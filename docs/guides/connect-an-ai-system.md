# Connect an AI system

This guide shows the normal integration sequence.

## 1. Configure the process

```dotenv
VIRA_API_URL=https://api.example.com
VIRA_API_KEY=<api-key>
VIRA_ORGANIZATION_ID=<organization>
VIRA_PROJECT_ID=<project>
VIRA_ENVIRONMENT_ID=<environment>
```

Credentials and scope must agree.

## 2. Create the client

```ts
import { ViraClient } from "@vira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
  timeoutMs: 15_000,
  retries: 2,
});
```

## 3. Connect once

```ts
const connected = await vira.connectOnce({
  name: "support-agent",
  systemType: "custom-agent",
  organizationId: process.env.VIRA_ORGANIZATION_ID!,
  projectId: process.env.VIRA_PROJECT_ID!,
  environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  adapterType: "custom-node",
  adapterVersion: "1",
  capabilities: ["chat"],
  idempotencyKey: "connect:support-agent:v1",
});

if (!connected) {
  throw new Error("Vira connection failed");
}

const systemId = String(connected.body.system.id);
const connectionId = String(connected.body.connection.id);
```

`connectOnce` is a convenience flow over system creation and adapter connection.

## 4. Check health

```ts
const health = await vira.connectionHealth(connectionId);
const inventory = await vira.inventory(systemId);
```

## 5. Observe useful evidence

```ts
await vira.observe({
  eventId: crypto.randomUUID(),
  eventType: "model.response",
  aiSystemId: systemId,
  connectionId,
  payload: {
    task: "Answer a billing question",
    status: "completed",
  },
});
```

Convenience methods:

```ts
await vira.trace({...});
await vira.feedback({...});
await vira.outcome({...});
```

## 6. Resolve semantic task

```ts
const semantic = await vira.resolveSemantic({
  input: "I was charged twice. Can you help?",
  profile: { domain: "support" },
});
```

A semantic match does not activate behavior by itself.

## 7. Resolve runtime behavior

```ts
const runtime = await vira.resolveRuntime({
  behaviorPoint: "support.answer_billing",
  executionBoundary: {
    organizationId: process.env.VIRA_ORGANIZATION_ID!,
    projectId: process.env.VIRA_PROJECT_ID!,
    environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  },
  idempotencyKey: crypto.randomUUID(),
});
```

## 8. Keep the application architecture simple

```text
your application
  ├─ model / agent provider
  └─ Vira client
       ├─ observations
       ├─ semantic resolution
       └─ governed runtime resolution
```

Keep policy and behavior decisions in Vira rather than duplicating them in application code.
