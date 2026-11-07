import test from "node:test";
import assert from "node:assert/strict";
import { activeProjection, createSupportHandler } from "../src/support-handler.mjs";
const scope = { organizationId: "o", projectId: "p", environmentId: "e" };
const req = (key = "k1") => new Request("http://localhost/api/support", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": key }, body: JSON.stringify({ message: "Where is my order?" }) });
test("only active non-empty projections are usable", () => {
  assert.deepEqual(activeProjection({ body: { projectionMode: "active", behaviorProjection: { rendered: "Be concise", projectionDigest: "digest" } } }), { rendered: "Be concise", projectionDigest: "digest" });
  assert.equal(activeProjection({ body: { projectionMode: "unavailable", behaviorProjection: { rendered: "ignored" } } }), null);
  assert.equal(activeProjection({ body: { projectionMode: "active", behaviorProjection: { rendered: " " } } }), null);
});
test("unavailable projection stops before agent invocation", async () => {
  let invoked = false;
  const handler = createSupportHandler({ vira: { resolveRuntime: async () => ({ body: { projectionMode: "unavailable" } }) }, scope, runAgent: async () => { invoked = true; } });
  const response = await handler(req());
  assert.equal(response.status, 200); assert.equal((await response.json()).status, "NO_ACTIVE_PROJECTION"); assert.equal(invoked, false);
});
test("active projection is passed to the draft agent", async () => {
  let agent;
  const handler = createSupportHandler({ vira: { resolveRuntime: async () => ({ body: { projectionMode: "active", behaviorProjection: { rendered: "Use approved refund policy", projectionDigest: "digest-1" } }, requestId: "request-1" }) }, scope, runAgent: async (configuredAgent) => { agent = configuredAgent; return { finalOutput: "Draft" }; } });
  const response = await handler(req());
  assert.equal(response.status, 200); assert.equal((await response.json()).status, "PROJECTED"); assert.match(agent.instructions, /Use approved refund policy/);
});
