/**
 * Scoped Connect -> Observe example using the published @tryvira/sdk.
 * A successful observation is evidence ingestion only, not Teach or verifier PASS.
 * Explicit opt-in is required for writes; no Vira credentials are logged.
 */
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { ViraClient, buildObservationRequest } from "@tryvira/sdk";

const required = (env, key) => {
  const value = env[key]?.trim();
  if (!value) throw new Error(key + " is required");
  return value;
};

export function buildScopedEvent(scope, ids) {
  const event = {
    organizationId: scope.organizationId,
    projectId: scope.projectId,
    environmentId: scope.environmentId,
    eventId: ids.eventId,
    eventType: "model.response",
    aiSystemId: ids.aiSystemId,
    connectionId: ids.connectionId,
    payload: {status: "completed", synthetic: true, source: "public-connect-observe"},
  };
  // Use the installed SDK contract, not a duplicated guessed schema.
  buildObservationRequest(event);
  return event;
}

export async function runConnectObserve(client, env, makeId = randomUUID) {
  if (env.VIRA_ALLOW_OBSERVE !== "yes")
    throw new Error("VIRA_ALLOW_OBSERVE=yes required before creating connection/evidence");
  const scope = {
    organizationId: required(env, "VIRA_ORGANIZATION_ID"),
    projectId: required(env, "VIRA_PROJECT_ID"),
    environmentId: required(env, "VIRA_ENVIRONMENT_ID"),
  };
  const connected = await client.connectOnce({
    ...scope,
    name: env.VIRA_CONNECTION_NAME?.trim() || "public-example-agent",
    systemType: "custom-agent",
    adapterType: "custom-node",
    adapterVersion: "1",
    idempotencyKey: env.VIRA_CONNECT_IDEMPOTENCY_KEY?.trim() || "public:connect:" + makeId(),
  });
  const aiSystemId = connected?.body?.system?.id;
  const connectionId = connected?.body?.connection?.id;
  if (!aiSystemId || !connectionId)
    throw new Error("CONNECTION_READBACK_MISSING");

  const event = buildScopedEvent(scope, {
    aiSystemId: String(aiSystemId),
    connectionId: String(connectionId),
    eventId: env.VIRA_EVENT_ID?.trim() || makeId(),
  });
  const observed = await client.observe(event, {idempotencyKey: event.eventId});
  if (!observed || ![200, 201, 202].includes(observed.status))
    throw new Error("OBSERVATION_NOT_ADMITTED");
  return {
    stage: "connect_observe",
    observedHttpStatus: observed.status,
    requestId: observed.requestId ?? null,
    eventId: event.eventId,
    verifiedOutput: false,
    note: "Observation admission is not Teach, release or post-model verification.",
  };
}

async function main() {
  const env = process.env;
  const apiRoot = required(env, "VIRA_API_URL");
  if (apiRoot.includes("example.invalid") || apiRoot.replace(/\/$/, "").endsWith("/v1"))
    throw new Error("VIRA_API_URL must be the real API deployment root without /v1");
  const client = new ViraClient({
    baseUrl: apiRoot,
    apiKey: required(env, "VIRA_API_KEY"),
    failureMode: "throw",
    retries: 0,
  });
  console.log(JSON.stringify(await runConnectObserve(client, env), null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(JSON.stringify({
      error: error?.name ?? "ERROR",
      status: error?.status ?? null,
      requestId: error?.requestId ?? null,
      code: String(error?.code ?? "CONNECT_OBSERVE_FAILED"),
    }));
    process.exitCode = 1;
  });
}
