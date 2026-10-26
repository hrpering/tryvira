import { randomUUID } from "node:crypto";
import { vira, scope } from "./_client.mjs";
const result=await vira.resolveRuntime({behaviorPoint:"marketing.launch_plan",executionBoundary:scope,idempotencyKey:randomUUID()});
console.log(JSON.stringify(result?.body,null,2));
