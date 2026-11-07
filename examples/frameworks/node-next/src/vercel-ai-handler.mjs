import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

function activeProjection(response) {
  const body = response?.body;
  const projection = body?.behaviorProjection;
  const rendered = projection?.rendered;
  const projectionDigest = projection?.projectionDigest;
  const requestId = response?.requestId;
  if (
    body?.projectionMode !== "active" ||
    typeof rendered !== "string" || !rendered.trim() ||
    typeof projectionDigest !== "string" || !projectionDigest.trim() ||
    typeof requestId !== "string" || !requestId.trim()
  ) return null;
  return { rendered, projectionDigest, requestId };
}

export function createVercelAiHandler({ vira, scope, stream = streamText, selectModel = (name) => openai(name) }) {
  return async function handle(request) {
    if (!vira || typeof vira.resolveRuntime !== "function") return Response.json({ error: "Vira client is not configured" }, { status: 503 });
    if (!scope?.organizationId || !scope?.projectId || !scope?.environmentId) return Response.json({ error: "Scope is not configured" }, { status: 503 });
    const idempotencyKey = request.headers.get("Idempotency-Key");
    if (!idempotencyKey) return Response.json({ error: "Idempotency-Key required" }, { status: 400 });
    let body;
    try { body = await request.json(); } catch { return Response.json({ error: "Expected JSON" }, { status: 400 }); }
    if (typeof body?.message !== "string" || !body.message.trim()) return Response.json({ error: "message required" }, { status: 400 });
    try {
      const resolution = await vira.resolveRuntime({
        behaviorPoint: "support.answer",
        executionBoundary: scope,
        idempotencyKey,
      });
      const projection = activeProjection(resolution);
      if (!projection) return Response.json({ status: "NO_ACTIVE_PROJECTION", modelInvoked: false, requestId: resolution?.requestId ?? null }, { status: 200 });
      const result = stream({
        model: selectModel(process.env.OPENAI_MODEL || "gpt-4.1-mini"),
        system: `Follow this Vira behavior projection as guidance when drafting a reply. It does not authorize tools or external side effects.\n\n${projection.rendered}\n\nDraft a concise reply. Do not claim it was sent.`,
        prompt: body.message,
      });
      return result.toTextStreamResponse({
        headers: {
          "x-vira-projection-digest": projection.projectionDigest,
          "x-vira-request-id": projection.requestId,
        },
      });
    } catch {
      return Response.json({ error: "Governed request failed" }, { status: 502 });
    }
  };
}
