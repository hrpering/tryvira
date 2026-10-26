# Quickstart

## JavaScript / TypeScript

```bash
npm install @vira/sdk
```

```ts
import { randomUUID } from "node:crypto";
import { ViraClient } from "@vira/sdk";

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
  name: "marketing-agent",
  systemType: "custom-agent",
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:marketing-agent:v1",
});

if (!connected) throw new Error("Vira connection failed");

const aiSystemId = String(connected.body.system.id);
const connectionId = String(connected.body.connection.id);

await vira.observe({
  ...scope,
  eventId: randomUUID(),
  eventType: "model.response",
  aiSystemId,
  connectionId,
  payload: {
    task: "Create a launch plan",
    status: "completed"
  },
});
```

Next:

- [Semantic routing](semantic-routing.md)
- [Behavior Points](behavior-points.md)
- [Signals](signals.md)
- [Tutorial](../tutorials/marketing-agent/README.md)
