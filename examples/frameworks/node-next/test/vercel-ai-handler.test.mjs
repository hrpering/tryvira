import test from "node:test";
import assert from "node:assert/strict";
import { createVercelAiHandler } from "../src/vercel-ai-handler.mjs";

const scope = { organizationId: "org-test", projectId: "project-test", environmentId: "env-test" };
const request = () => new Request("http://localhost/api/ai-sdk-support", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Idempotency-Key": "support:req-1" },
  body: JSON.stringify({ message: "Where is my order?" }),
});

test("unavailable Vira projection prevents Vercel AI model invocation", async () => {
  let modelCalled = false;
  const handler = createVercelAiHandler({
    vira: { resolveRuntime: async () => ({ body: { projectionMode: "unavailable" } }) },
    scope,
    stream: () => { modelCalled = true; throw new Error("must not run"); },
  });
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "NO_ACTIVE_PROJECTION", modelInvoked: false, requestId: null });
  assert.equal(modelCalled, false);
});

test("active projection is passed to Vercel AI SDK and its digest is preserved", async () => {
  let options;
  const handler = createVercelAiHandler({
    vira: { resolveRuntime: async () => ({ body: { projectionMode: "active", behaviorProjection: { rendered: "Use the approved return policy", projectionDigest: "digest-1" } }, requestId: "request-1" }) },
    scope,
    selectModel: (name) => `model:${name}`,
    stream: (input) => { options = input; return { toTextStreamResponse: ({ headers }) => new Response("draft", { headers }) }; },
  });
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "draft");
  assert.equal(options.model, "model:gpt-4.1-mini");
  assert.equal(options.prompt, "Where is my order?");
  assert.match(options.system, /Use the approved return policy/);
  assert.match(options.system, /does not authorize tools or external side effects/);
  assert.equal(response.headers.get("x-vira-projection-digest"), "digest-1");
  assert.equal(response.headers.get("x-vira-request-id"), "request-1");
});

test("request message and idempotency key are required before Vira or model calls", async () => {
  let viraCalled = false;
  let modelCalled = false;
  const handler = createVercelAiHandler({
    vira: { resolveRuntime: async () => { viraCalled = true; return null; } },
    scope,
    stream: () => { modelCalled = true; throw new Error("must not run"); },
  });
  const missingMessage = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": "key-1" },
    body: JSON.stringify({ message: " " }),
  });
  const noMessageResponse = await handler(missingMessage);
  assert.equal(noMessageResponse.status, 400);
  assert.equal(viraCalled, false);
  const noKeyResponse = await handler(new Request("http://localhost/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: "Hi" }),
  }));
  assert.equal(noKeyResponse.status, 400);
  assert.equal(viraCalled, false);
  assert.equal(modelCalled, false);
});

test("malformed active projection stops before model invocation", async () => {
  for (const { body, requestId } of [
    { body: { projectionMode: "active", behaviorProjection: { rendered: " ", projectionDigest: "digest" } }, requestId: "request-malformed" },
    { body: { projectionMode: "active", behaviorProjection: { rendered: "Policy", projectionDigest: " " } }, requestId: "request-malformed" },
    { body: { projectionMode: "active", behaviorProjection: { rendered: "Policy", projectionDigest: "digest" } }, requestId: " " },
  ]) {
    let modelCalled = false;
    const handler = createVercelAiHandler({
      vira: { resolveRuntime: async () => ({ body, requestId }) },
      scope,
      stream: () => { modelCalled = true; throw new Error("must not run"); },
    });
    const response = await handler(request());
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, "NO_ACTIVE_PROJECTION");
    assert.equal(modelCalled, false);
  }
});

test("Vira resolution failures stop before model invocation", async () => {
  let modelCalled = false;
  const handler = createVercelAiHandler({
    vira: { resolveRuntime: async () => { throw new Error("stubbed failure"); } },
    scope,
    stream: () => { modelCalled = true; throw new Error("must not run"); },
  });
  const response = await handler(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "Governed request failed" });
  assert.equal(modelCalled, false);
});

test("idempotency key is forwarded to resolveRuntime", async () => {
  let input;
  const handler = createVercelAiHandler({
    vira: { resolveRuntime: async (value) => { input = value; return { body: { projectionMode: "unavailable" } }; } },
    scope,
    stream: () => { throw new Error("must not run"); },
  });
  await handler(request());
  assert.equal(input.idempotencyKey, "support:req-1");
  assert.deepEqual(input.executionBoundary, scope);
});
