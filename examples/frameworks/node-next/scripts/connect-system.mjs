import { ViraClient } from "@tryvira/sdk";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Set ${name} in the server environment`);
  return value;
}

if (process.env.VIRA_TUTORIAL_NON_PRODUCTION !== "true") {
  throw new Error("Set VIRA_TUTORIAL_NON_PRODUCTION=true only after confirming this is an isolated non-production Vira deployment");
}
if (process.env.VIRA_ALLOW_CONNECT !== "true") {
  throw new Error("Set VIRA_ALLOW_CONNECT=true only when you authorize creating or reusing this Vira connection");
}

const baseUrl = required("VIRA_API_URL").replace(/\/$/, "");
if (/\/v1\/?$/i.test(baseUrl)) throw new Error("VIRA_API_URL must be the API deployment root without a /v1 suffix");

const vira = new ViraClient({ baseUrl, apiKey: required("VIRA_API_KEY"), failureMode: "throw" });
const connected = await vira.connectOnce({
  name: process.env.VIRA_SYSTEM_NAME?.trim() || "support-chatbot-example",
  systemType: "custom-agent",
  organizationId: required("VIRA_ORGANIZATION_ID"),
  projectId: required("VIRA_PROJECT_ID"),
  environmentId: required("VIRA_ENVIRONMENT_ID"),
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: required("VIRA_CONNECT_IDEMPOTENCY_KEY"),
});

const aiSystemId = connected?.body?.system?.id;
const connectionId = connected?.body?.connection?.id;
if (typeof aiSystemId !== "string" || !aiSystemId || typeof connectionId !== "string" || !connectionId) {
  throw new Error("VIRA_CONNECTION_READBACK_MISSING_IDS");
}

console.log(JSON.stringify({ aiSystemId, connectionId, requestId: connected.requestId }, null, 2));
