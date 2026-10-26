import { randomUUID } from "node:crypto";
import { vira } from "./_client.mjs";
const aiSystemId=process.env.VIRA_AI_SYSTEM_ID; const connectionId=process.env.VIRA_CONNECTION_ID;
if (!aiSystemId || !connectionId) throw new Error("Set VIRA_AI_SYSTEM_ID and VIRA_CONNECTION_ID from the connect step");
const eventId=randomUUID();
await vira.observe({eventId,eventType:"model.response",aiSystemId,connectionId,payload:{request:"Create a go-to-market plan for a subscription product",summary:"The draft focused on awareness and acquisition but omitted retention and measurement"}},{idempotencyKey:eventId});
console.log(JSON.stringify({observed:true,eventId},null,2));
