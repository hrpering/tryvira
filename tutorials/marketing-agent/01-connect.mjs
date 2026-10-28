import { vira, scope } from "./_client.mjs";
const connected=await vira.connectOnce({...scope,name:"marketing-agent",systemType:"custom-agent",adapterType:"custom-node",adapterVersion:"1",idempotencyKey:"tutorial:marketing-agent:connect:v1"});
const connectionId=String(connected?.body.connection?.id??""); if(connectionId)await vira.testConnection(connectionId);
console.log(JSON.stringify({systemId:connected?.body.system?.id,connectionId,tested:Boolean(connectionId)},null,2));
