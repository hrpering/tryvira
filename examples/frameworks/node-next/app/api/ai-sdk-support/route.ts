import "server-only";
import { ViraClient } from "@tryvira/sdk";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createVercelAiHandler } from "../../../src/vercel-ai-handler.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const required = ["VIRA_API_URL", "VIRA_API_KEY", "VIRA_ORGANIZATION_ID", "VIRA_PROJECT_ID", "VIRA_ENVIRONMENT_ID", "OPENAI_API_KEY"] as const;
  if (required.some((name) => !process.env[name])) return Response.json({ error: "Server configuration is incomplete" }, { status: 503 });
  const vira = new ViraClient({ baseUrl: process.env.VIRA_API_URL!, apiKey: process.env.VIRA_API_KEY! });
  return createVercelAiHandler({
    vira,
    scope: { organizationId: process.env.VIRA_ORGANIZATION_ID!, projectId: process.env.VIRA_PROJECT_ID!, environmentId: process.env.VIRA_ENVIRONMENT_ID! },
    stream: streamText,
    selectModel: (name: Parameters<typeof openai>[0]) => openai(name),
  })(request);
}
