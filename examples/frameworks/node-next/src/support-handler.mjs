import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

export function activeProjection(response) {
  const result = response?.body;
  const rendered = result?.behaviorProjection?.rendered;
  if (result?.projectionMode !== "active" || typeof rendered !== "string" || !rendered.trim()) return null;
  return { rendered, projectionDigest: result.behaviorProjection.projectionDigest };
}

export function createSupportHandler({ vira, scope, runAgent = run }) {
  return async function handle(request) {
    if (!vira || typeof vira.resolveRuntime !== "function") return Response.json({ error: "Vira client is not configured" }, { status: 503 });
    if (!scope || !scope.organizationId || !scope.projectId || !scope.environmentId) return Response.json({ error: "Scope is not configured" }, { status: 503 });
    const key = request.headers.get("Idempotency-Key");
    if (!key) return Response.json({ error: "Idempotency-Key required" }, { status: 400 });
    let body;
    try { body = await request.json(); } catch { return Response.json({ error: "Expected JSON" }, { status: 400 }); }
    if (typeof body?.message !== "string" || !body.message.trim()) return Response.json({ error: "message required" }, { status: 400 });
    try {
      const response = await vira.resolveRuntime({ behaviorPoint: "support.answer", executionBoundary: scope, idempotencyKey: key });
      const projection = activeProjection(response);
      if (!projection) return Response.json({ status: "NO_ACTIVE_PROJECTION", agentInvoked: false, requestId: response?.requestId }, { status: 200 });
      const saveDraft = tool({
        name: "save_support_draft",
        description: "Create a support reply draft; never send it.",
        parameters: z.object({ text: z.string().min(1) }),
        execute: async ({ text }) => ({ saved: true, sent: false, text }),
      });
      const agent = new Agent({
        name: "Support draft assistant",
        instructions: `Follow this Vira behavior projection when drafting a reply. It does not authorize external side effects.\n\n${projection.rendered}\n\nDraft a concise reply. Never claim it was sent.`,
        tools: [saveDraft],
      });
      const result = await runAgent(agent, body.message);
      return Response.json({ status: "PROJECTED", agentInvoked: true, output: result.finalOutput, projectionDigest: projection.projectionDigest, requestId: response.requestId }, { status: 200 });
    } catch {
      return Response.json({ error: "Governed request failed" }, { status: 502 });
    }
  };
}
