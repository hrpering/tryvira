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
  assert.deepEqual(await response.json(), { status: "NO_ACTIVE_PROJECTION", modelInvoked: false });
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
  assert.equal(response.headers.get("x-vira-projection-digest"), "digest-1");
  assert.equal(response.headers.get("x-vira-request-id"), "request-1");
});
