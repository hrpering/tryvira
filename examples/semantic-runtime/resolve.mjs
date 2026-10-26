import { randomUUID } from "node:crypto";
import { ViraClient } from "@vira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL,
  apiKey: process.env.VIRA_API_KEY
});

const semantic = await vira.resolveSemantic({
  input: "Create a launch plan for a new subscription product"
});

console.log("Semantic:", JSON.stringify(semantic?.body, null, 2));

const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId: process.env.VIRA_ORGANIZATION_ID,
    projectId: process.env.VIRA_PROJECT_ID,
    environmentId: process.env.VIRA_ENVIRONMENT_ID
  },
  idempotencyKey: randomUUID()
});

console.log("Runtime:", JSON.stringify(runtime?.body, null, 2));
