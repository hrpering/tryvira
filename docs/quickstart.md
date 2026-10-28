# Quickstart

```bash
npm install @tryvira/sdk
```

```ts
import { randomUUID } from "node:crypto";
import { ViraClient } from "@tryvira/sdk";

const vira = new ViraClient({baseUrl: process.env.VIRA_API_URL!, apiKey: process.env.VIRA_API_KEY});
const scope = {organizationId: process.env.VIRA_ORGANIZATION_ID!, projectId: process.env.VIRA_PROJECT_ID!, environmentId: process.env.VIRA_ENVIRONMENT_ID!};
const connected = await vira.connectOnce({...scope,name:"marketing-agent",systemType:"custom-agent",adapterType:"custom-node",adapterVersion:"1",idempotencyKey:"connect:marketing-agent:v1"});
if (!connected) throw new Error("Vira connection failed");
const systemId=String(connected.body.system.id); const connectionId=String(connected.body.connection.id);
await vira.testConnection(connectionId);
await vira.observe({eventId:randomUUID(),eventType:"model.response",aiSystemId:systemId,connectionId,payload:{task:"Create a launch plan",status:"completed"}});
```

Next: [Capabilities](capability-map.md) · [Teach AI](teach.md) · [Decision & Quality](decision-and-quality.md) · [Tutorial](../tutorials/marketing-agent/README.md)
