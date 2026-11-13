import { createHash } from "node:crypto";
import { Agent, run } from "@openai/agents";

const BASE_INSTRUCTIONS =
  "You are a customer support assistant. Give concise, accurate advice and do not claim you performed an external action.";

function parseMessages(value) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 20) return null;
  const messages = [];
  for (const item of value) {
    if (!item || !["user", "assistant"].includes(item.role) ||
        typeof item.content !== "string" || !item.content.trim() || item.content.length > 4000) return null;
    messages.push({ role: item.role, content: item.content.trim() });
  }
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}
function makePrompt(messages) {
  return messages.map(({ role, content }) => `${role === "user" ? "User" : "Assistant"}: ${content}`).join("\n\n");
}
function identity(key, scope, prompt) {
  return createHash("sha256")
    .update(JSON.stringify({key, scope, prompt}))
    .digest("hex").slice(0, 32);
}
const modes = new Set(["SINGLE", "STRATEGY", "COMPOUND", "HYBRID"]);

export function createSupportHandler({
  createVira,
  getViraConfig,
  AgentClass = Agent,
  runAgent = run,
}) {
  return async function handle(request) {
    let body;
    try { body = await request.json(); }
    catch { return Response.json({ error: "EXPECTED_JSON" }, { status: 400 }); }

    const mode = body?.viraMode;
    if (mode !== "on" && mode !== "off")
      return Response.json({ error: "VIRA_MODE_MUST_BE_ON_OR_OFF" }, { status: 400 });
    if (typeof body.observe !== "boolean" || typeof body.showRuntimeCheck !== "boolean")
      return Response.json({ error: "INVALID_OPTIONS" }, { status: 400 });
    const messages = parseMessages(body.messages);
    if (!messages) return Response.json({ error: "INVALID_MESSAGES" }, { status: 400 });
    const idempotencyKey = request.headers.get("Idempotency-Key")?.trim();
    if (!idempotencyKey || idempotencyKey.length > 128 || !/^[a-zA-Z0-9:._-]+$/.test(idempotencyKey))
      return Response.json({ error: "VALID_IDEMPOTENCY_KEY_REQUIRED" }, { status: 400 });

    const isOn = mode === "on";
    // Only OFF uses a direct provider call. ON must not bypass TaskRun.
    if (!isOn && !process.env.OPENAI_API_KEY)
      return Response.json({ error: "MODEL_NOT_CONFIGURED" }, { status: 503 });

    const config = (isOn || body.observe) ? getViraConfig?.() : null;
    if (isOn && (!config?.baseUrl || !config?.apiKey || !config?.scope))
      return Response.json({ error: "VIRA_TASKRUN_CONFIGURATION_INCOMPLETE", modelInvoked: false }, { status: 503 });

    let vira = null;
    if (config?.baseUrl && config?.apiKey) {
      if (/\/v1\/?$/i.test(config.baseUrl))
        return Response.json({ error: "VIRA_API_URL_MUST_BE_DEPLOYMENT_ROOT" }, { status: 503 });
      try { vira = createVira(config); }
      catch { return Response.json({ error: "VIRA_CLIENT_CONFIGURATION_FAILED" }, { status: 503 }); }
    }

    if (isOn) {
      // The server selects the actual mode. Never declare an unsupported
      // client-side host capability, task, selected Program or release.
      const prompt = makePrompt(messages);
      const digest = identity(idempotencyKey, config.scope, prompt);
      const taskRunId = "chat-taskrun-" + digest;
      const requestId = "chat-request-" + digest;
      try {
        const admitted = await vira.startTaskRun({
          taskRunId, requestId, input: prompt, requestedMode: "AUTO",
          ...(config.connectionId ? { connectionId: config.connectionId } : {}),
          budget: { maxChildren: 4, maxCalls: 8 },
        }, { idempotencyKey: "chat:taskrun:" + digest });
        const serverRun = admitted?.body?.taskRun;
        if (admitted?.status !== 201 || admitted?.body?.proposalOnly === true ||
            serverRun?.taskRunId !== taskRunId || !modes.has(serverRun.mode) ||
            !["PLANNED", "ADMITTED", "RUNNING", "WAITING_USER", "WAITING_HOST", "WAITING_APPROVAL", "PARTIAL", "COMPLETED", "FAILED", "BLOCKED", "CANCELLED"].includes(serverRun.status)) {
          return Response.json({
            status: "TASKRUN_NOT_ADMITTED",
            reason: admitted?.body?.reason ?? "No durable eligible task admission was confirmed.",
            modelInvoked: false,
          }, { status: 409 });
        }

        // TaskRun is asynchronous. The current published API provides
        // execution status/child receipts but not a verified provider
        // final-answer handoff. Do NOT run the model from this route
        // and bypass canonical post-model verification.
        let persistedRun = serverRun;
        try {
          const read = await vira.getTaskRun(taskRunId);
          if (read?.body?.taskRun?.taskRunId === taskRunId) persistedRun = read.body.taskRun;
        } catch { /* readback can be unavailable; do not invent completion */ }
        const status = persistedRun.status;
        const runtimeCheck = body.showRuntimeCheck ? {
          state: "taskrun_admission_recorded",
          taskRunId,
          requestId: admitted?.requestId ?? null,
          mode: persistedRun.mode,
          status,
          verification: "not_available_from_public_taskrun_response",
        } : null;
        return Response.json({
          status: "TASKRUN_ACCEPTED_PENDING_VERIFIED_CHAT_RESPONSE",
          viraMode: "on",
          modelInvoked: false,
          taskRun: { id: taskRunId, status, selectedMode: persistedRun.mode },
          runtimeCheck,
          observation: { state: "server_owned_taskrun" },
          note: "No verified provider/chatbot output is available from the public TaskRun contract. This sample does not bypass the canonical verification boundary.",
        }, { status: 202 });
      } catch {
        return Response.json({ error: "VIRA_TASKRUN_ADMISSION_FAILED", modelInvoked: false }, { status: 502 });
      }
    }

    // OFF is a true baseline: model call without Vira behavior.
    let answer;
    try {
      const agent = new AgentClass({
        name: "Support assistant",
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: BASE_INSTRUCTIONS,
      });
      const result = await runAgent(agent, makePrompt(messages));
      if (typeof result?.finalOutput !== "string" || !result.finalOutput.trim())
        return Response.json({ error: "MODEL_RETURNED_NO_TEXT" }, { status: 502 });
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
            ...config.scope, eventId: `chat:${idempotencyKey}:response`,
            eventType: "model.response", aiSystemId: config.aiSystemId,
            connectionId: config.connectionId,
          }, { idempotencyKey: `chat:${idempotencyKey}:observation` });
          observation = { state: "submitted", status: observed?.status ?? null, requestId: observed?.requestId ?? null };
        } catch { observation = { state: "failed" }; }
      }
    }
    return Response.json({ answer, viraMode: "off", modelInvoked: true, observation, runtimeCheck: null });
  };
}
