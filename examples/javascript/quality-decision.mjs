import { ViraClient } from "@tryvira/sdk";
const vira=new ViraClient({baseUrl:process.env.VIRA_API_URL,apiKey:process.env.VIRA_API_KEY});
const result=await vira.evaluateQuality({request:"Evaluate risks and next steps",candidates:[{id:"initial",output:"Generic response"},{id:"repair",output:"Risks and next steps with explicit assumptions"}],allowedIds:["initial","repair"],requiredTerms:["risks","next steps"],threshold:0.7});
console.log(JSON.stringify(result?.body,null,2));
