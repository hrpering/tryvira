import { randomUUID } from "node:crypto";
import { required, vira, scope } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";
requireSafeTutorialScope();
const runId=required("VIRA_TUTORIAL_RUN_ID");
const result=await vira.resolveRuntime({behaviorPoint:`marketing.launch_plan.${runId}`,executionBoundary:scope,idempotencyKey:randomUUID()});
console.log(JSON.stringify(result?.body,null,2));
