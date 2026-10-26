import { randomUUID } from "node:crypto";
import { vira } from "./_client.mjs";
const aiSystemId=process.env.VIRA_AI_SYSTEM_ID; const connectionId=process.env.VIRA_CONNECTION_ID;
if (!aiSystemId || !connectionId) throw new Error("Set VIRA_AI_SYSTEM_ID and VIRA_CONNECTION_ID");
const eventId=randomUUID();
await vira.feedback({eventId,aiSystemId,connectionId,feedback:{type:"correction",text:"For launch plans, cover the full funnel and define how each stage will be measured."}});
console.log(JSON.stringify({feedbackRecorded:true,eventId},null,2));
