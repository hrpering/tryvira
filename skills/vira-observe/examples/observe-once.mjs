/**
 * Live, explicitly authorized Observe-only example.
 * Run in an application with @tryvira/sdk installed:
 * VIRA_API_URL=... VIRA_API_KEY=... VIRA_ORGANIZATION_ID=...
 * VIRA_PROJECT_ID=... VIRA_ENVIRONMENT_ID=...
 * VIRA_AI_SYSTEM_ID=... VIRA_CONNECTION_ID=... VIRA_EVENT_ID=...
 * VIRA_ALLOW_OBSERVE=yes node observe-once.mjs
 *
 * Does not train, release, modify an agent or claim verifier PASS.
 */
import {ViraClient} from "@tryvira/sdk";
import {makeObservationEvent} from "./event-contract.mjs";
function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(name + " is required");
  return value;
}
if (process.env.VIRA_ALLOW_OBSERVE !== "yes") throw new Error("VIRA_ALLOW_OBSERVE=yes required for actual event ingestion");
const baseUrl = required("VIRA_API_URL");
if (baseUrl.endsWith("/v1") || baseUrl.includes("example.invalid")) throw new Error("VIRA_API_URL must be a real deployment root without /v1");
const event = makeObservationEvent({
  organizationId: required("VIRA_ORGANIZATION_ID"),
  projectId: required("VIRA_PROJECT_ID"),
  environmentId: required("VIRA_ENVIRONMENT_ID"),
  eventId: required("VIRA_EVENT_ID"),
  eventType: "model.response",
  aiSystemId: required("VIRA_AI_SYSTEM_ID"),
  connectionId: required("VIRA_CONNECTION_ID"),
  payload: {status: "completed", source: "vira-observe-skill-demo", synthetic: true}
});
const vira = new ViraClient({baseUrl, apiKey: required("VIRA_API_KEY"), failureMode: "throw"});
const response = await vira.observe(event, {idempotencyKey: event.eventId});
console.log(JSON.stringify({
  stage: "observation_admission",
  httpStatus: response?.status ?? null,
  requestId: response?.requestId ?? null,
  eventId: event.eventId,
  verifiedOutput: false,
  note: "Observe admission is not Signal approval, Teach completion, or runtime verifier PASS."
}, null, 2));
if (!response || ![200,201,202].includes(response.status)) process.exitCode = 2;
