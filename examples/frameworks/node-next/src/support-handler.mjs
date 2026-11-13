import { Agent, run } from "@openai/agents";

const BASE_INSTRUCTIONS =
  "You are a customer support assistant. Give a concise, accurate reply. Do not claim that you performed an external action.";

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

function parseMessages(value) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 20) return null;
  const messages = [];
  for (const item of value) {
    if (
      !item || !["user", "assistant"].includes(item.role) ||
      typeof item.content !== "string" || !item.content.trim() || item.content.length > 4000
    ) return null;
    messages.push({ role: item.role, content: item.content.trim() });
  }
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

function makePrompt(messages) {
  return messages.map(({ role, content }) => `${role === "user" ? "User" : "Assistant"}: ${content}`).join("\n\n");
}

export function createSupportHandler({
  createVira,
  getViraConfig,
  AgentClass = Agent,
  runAgent = run,
}) {
  return async function handle(request) {
    let body;
    try { body = await request.json(); } catch { return Response.json({ error: "EXPECTED_JSON" }, { status: 400 }); }

    const mode = body?.viraMode;
    if (mode !== "on" && mode !== "off") return Response.json({ error: "VIRA_MODE_MUST_BE_ON_OR_OFF" }, { status: 400 });
    if (typeof body?.observe !== "boolean" || typeof body?.showRuntimeCheck !== "boolean") {
      return Response.json({ error: "INVALID_OPTIONS" }, { status: 400 });
    }
    const messages = parseMessages(body?.messages);
    if (!messages) return Response.json({ error: "INVALID_MESSAGES" }, { status: 400 });
    const idempotencyKey = request.headers.get("Idempotency-Key")?.trim();
    if (!idempotencyKey) return Response.json({ error: "IDEMPOTENCY_KEY_REQUIRED" }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return Response.json({ error: "MODEL_NOT_CONFIGURED" }, { status: 503 });

    const needsViraRuntime = mode === "on";
    const config = (needsViraRuntime || body.observe) ? getViraConfig?.() : null;
    if (needsViraRuntime && (!config?.baseUrl || !config?.apiKey || !config?.scope || !config?.behaviorPoint)) {
      return Response.json({ error: "VIRA_RUNTIME_CONFIGURATION_INCOMPLETE" }, { status: 503 });
    }

    let vira = null;
    if (config?.baseUrl && config?.apiKey) {
      if (/\/v1\/?$/i.test(config.baseUrl)) {
        return Response.json({ error: "VIRA_API_URL_MUST_BE_DEPLOYMENT_ROOT" }, { status: 503 });
      }
      try { vira = createVira(config); } catch { return Response.json({ error: "VIRA_CLIENT_CONFIGURATION_FAILED" }, { status: 503 }); }
    }

    let projection = null;
    if (needsViraRuntime) {
      try {
        const resolution = await vira.resolveRuntime({
          behaviorPoint: config.behaviorPoint,
          executionBoundary: config.scope,
          idempotencyKey: `chat:${idempotencyKey}:runtime`,
        });
        projection = activeProjection(resolution);
        if (!projection) {
          return Response.json({
            status: "NO_ACTIVE_PROJECTION",
            modelInvoked: false,
            requestId: resolution?.requestId ?? null,
          }, { status: 409 });
        }
      } catch {
        return Response.json({ error: "VIRA_RUNTIME_RESOLUTION_FAILED", modelInvoked: false }, { status: 502 });
      }
    }

    const instructions = projection
      ? `${BASE_INSTRUCTIONS}\n\nFollow this Vira behavior projection as guidance for this reply. It does not authorize tools or external side effects.\n\n${projection.rendered}`
      : BASE_INSTRUCTIONS;
    let answer;
    try {
      const agent = new AgentClass({
        name: "Support assistant",
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions,
      });
      const result = await runAgent(agent, makePrompt(messages));
      if (typeof result?.finalOutput !== "string" || !result.finalOutput.trim()) {
        return Response.json({ error: "MODEL_RETURNED_NO_TEXT" }, { status: 502 });
      }
      answer = result.finalOutput;
    } catch {
      return Response.json({ error: "MODEL_REQUEST_FAILED" }, { status: 502 });
    }

    let observation = { state: "not_requested" };
    if (body.observe) {
      if (!vira || !config?.scope || !config.aiSystemId || !config.connectionId) {
        observation = { state: "skipped_missing_vira_observation_configuration" };
      } else {
        try {
          const observed = await vira.observe({
            ...config.scope,
            eventId: `chat:${idempotencyKey}:response`,
            eventType: "model.response",
            aiSystemId: config.aiSystemId,
            connectionId: config.connectionId,
          }, { idempotencyKey: `chat:${idempotencyKey}:observation` });
          observation = { state: "submitted", status: observed?.status ?? null, requestId: observed?.requestId ?? null };
        } catch {
          observation = { state: "failed" };
        }
      }
    }

    const runtimeCheck = body.showRuntimeCheck && projection
      ? { state: "active_projection_received", requestId: projection.requestId, projectionDigest: projection.projectionDigest }
      : null;
    return Response.json({ answer, viraMode: mode, modelInvoked: true, observation, runtimeCheck });
  };
}
