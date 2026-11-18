import test from "node:test";
import assert from "node:assert/strict";
import { ViraClient, buildObservationRequest } from "@tryvira/sdk";
import { runConnectObserve, buildScopedEvent } from "./connect-observe.mjs";

const env = Object.freeze({
  VIRA_ALLOW_OBSERVE: "yes",
  VIRA_ORGANIZATION_ID: "org-offline",
  VIRA_PROJECT_ID: "project-offline",
  VIRA_ENVIRONMENT_ID: "sandbox",
  VIRA_CONNECT_IDEMPOTENCY_KEY: "connect-offline-1",
  VIRA_EVENT_ID: "event-offline-1",
});
const scope = {
  organizationId: env.VIRA_ORGANIZATION_ID,
  projectId: env.VIRA_PROJECT_ID,
  environmentId: env.VIRA_ENVIRONMENT_ID,
};

test("published SDK validates the full event and rejects missing scope before transport", () => {
  const event = buildScopedEvent(scope, {eventId:"event-1", aiSystemId:"system-1", connectionId:"connection-1"});
  assert.equal(buildObservationRequest(event).path, "/v1/observations");
  for (const key of ["organizationId", "projectId", "environmentId"]) {
    const incomplete = {...event};
    delete incomplete[key];
    assert.throws(() => buildObservationRequest(incomplete), /SDK_OBSERVATION_SCOPE_REQUIRED/);
  }
});

test("Connect then Observe carries exact scope and request identity", async () => {
  const calls = [];
  const sdk = new ViraClient({
    baseUrl: "https://api.example.invalid", apiKey: "offline-only", retries: 0,
    fetcher: async (url, init) => {
      const path = new URL(String(url)).pathname;
      const body = init.body ? JSON.parse(init.body) : null;
      calls.push({path, method:init.method, body, headers:init.headers});
      const result = path === "/v1/ai-systems"
        ? {system:{id:"system-1"}}
        : path === "/v1/ai-systems/system-1/connections"
        ? {connection:{id:"connection-1"}, handshake:{}}
        : {accepted:true};
      return new Response(JSON.stringify(result), {
        status: path === "/v1/observations" ? 202 : 200,
        headers: {"content-type": "application/json", "x-request-id":"offline-request-1"},
      });
    },
  });
  const summary = await runConnectObserve(sdk, env);
  assert.equal(summary.observedHttpStatus, 202);
  assert.equal(summary.verifiedOutput, false);
  assert.equal(calls.length, 3);
  const observation = calls.at(-1);
  assert.equal(observation.path, "/v1/observations");
  for (const key of ["organizationId","projectId","environmentId"])
    assert.equal(observation.body[key], scope[key]);
  assert.equal(observation.body.aiSystemId, "system-1");
  assert.equal(observation.body.connectionId, "connection-1");
  assert.equal(observation.headers["idempotency-key"], "event-offline-1");
  assert.ok(!JSON.stringify(summary).includes("offline-only"));
});

test("denied opt-in and missing scope never call the server", async () => {
  let calls = 0;
  const fake = {connectOnce:async()=>{calls++;return null;}};
  await assert.rejects(runConnectObserve(fake, {...env, VIRA_ALLOW_OBSERVE:"no"}), /VIRA_ALLOW_OBSERVE/);
  await assert.rejects(runConnectObserve(fake, {...env, VIRA_PROJECT_ID:""}), /VIRA_PROJECT_ID/);
  assert.equal(calls, 0);
});

test("malformed connection and rejected Observe do not print fake success", async () => {
  const fake = {connectOnce:async()=>({body:{system:{id:"system-1"}}}),observe:async()=>({status:202})};
  await assert.rejects(runConnectObserve(fake, env), /CONNECTION_READBACK_MISSING/);
  const fakeDenied={connectOnce:async()=>({body:{system:{id:"system-1"},connection:{id:"connection-1"}}}), observe:async()=>({status:403})};
  await assert.rejects(runConnectObserve(fakeDenied, env), /OBSERVATION_NOT_ADMITTED/);
});
