import { vira } from "./_client.mjs";
const result=await vira.resolveSemantic({input:"Build a launch plan for a new membership product",profile:{domain:"marketing"}});
console.log(JSON.stringify(result?.body,null,2));
