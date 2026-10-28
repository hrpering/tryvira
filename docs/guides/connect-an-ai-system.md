# Connect an AI system

The normal application path is **connect once, verify the connection, then begin sending useful evidence**.

```bash
npm install @tryvira/sdk
```

```ts
import { ViraClient } from "@tryvira/sdk";
const vira=new ViraClient({baseUrl:process.env.VIRA_API_URL!,apiKey:process.env.VIRA_API_KEY});
const connected=await vira.connectOnce({name:"support-agent",systemType:"custom-agent",organizationId:process.env.VIRA_ORGANIZATION_ID!,projectId:process.env.VIRA_PROJECT_ID!,environmentId:process.env.VIRA_ENVIRONMENT_ID!,adapterType:"custom-node",adapterVersion:"1",capabilities:["chat"],idempotencyKey:"connect:support-agent:v1"});
if(!connected)throw new Error("Vira connection failed");
const systemId=String(connected.body.system.id); const connectionId=String(connected.body.connection.id);
await vira.connectionHealth(connectionId);
await vira.testConnection(connectionId);
await vira.inventory(systemId);
```

`connectOnce` composes system registration + adapter connection and returns `system`, `connection`, and `handshake`.

Python uses `connect_once` from `tryvira-sdk`.

Direct HTTP has no single `connectOnce` route; use the underlying system + connection routes.

MCP has no `connectOnce` tool; it is oriented around governed discoverable tools rather than duplicating every SDK helper.
