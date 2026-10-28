import { randomUUID } from "node:crypto";
import { ViraClient } from "@tryvira/sdk";
const required=(name)=>{const value=process.env[name];if(!value)throw new Error(`${name} is required`);return value;};
const vira=new ViraClient({baseUrl:required("VIRA_API_URL"),apiKey:process.env.VIRA_API_KEY});
const connected=await vira.connectOnce({name:"example-agent",systemType:"custom-agent",organizationId:required("VIRA_ORGANIZATION_ID"),projectId:required("VIRA_PROJECT_ID"),environmentId:required("VIRA_ENVIRONMENT_ID"),adapterType:"custom-node",adapterVersion:"1",idempotencyKey:"example-agent:connect:v1"});
if(!connected)throw new Error("Vira connection failed");
const connectionId=String(connected.body.connection.id); await vira.testConnection(connectionId);
const eventId=randomUUID(); await vira.observe({eventId,eventType:"model.response",aiSystemId:String(connected.body.system.id),connectionId,payload:{status:"completed"}},{idempotencyKey:eventId});
console.log(JSON.stringify({connected:true,observed:true},null,2));
