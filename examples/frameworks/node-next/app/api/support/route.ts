import "server-only";
import { ViraClient } from "@tryvira/sdk";
import { createSupportHandler } from "../../../src/support-handler.mjs";

export const runtime = "nodejs";

const handler = createSupportHandler({
  createVira: (config: { baseUrl: string; apiKey: string }) => new ViraClient({
    baseUrl: config.baseUrl,
    apiKey: config.apiKey,
    failureMode: "throw",
  }),
  getViraConfig: () => {
    const baseUrl = process.env.VIRA_API_URL?.trim().replace(/\/$/, "");
    const apiKey = process.env.VIRA_API_KEY?.trim();
    const organizationId = process.env.VIRA_ORGANIZATION_ID?.trim();
    const projectId = process.env.VIRA_PROJECT_ID?.trim();
    const environmentId = process.env.VIRA_ENVIRONMENT_ID?.trim();
    if (!baseUrl || !apiKey || !organizationId || !projectId || !environmentId) return null;
    return {
      baseUrl,
      apiKey,
      scope: { organizationId, projectId, environmentId },
      behaviorPoint: process.env.VIRA_BEHAVIOR_POINT?.trim(),
      aiSystemId: process.env.VIRA_AI_SYSTEM_ID?.trim(),
      connectionId: process.env.VIRA_CONNECTION_ID?.trim(),
    };
  },
});

export async function POST(request: Request) {
  return handler(request);
}
