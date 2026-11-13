import test from "node:test";
import assert from "node:assert/strict";
import { createSupportHandler } from "../src/support-handler.mjs";

const scope = { organizationId: "org-test", projectId: "project-test", environmentId: "env-test" };
const config = {
  baseUrl: "https://api.example.test",
  apiKey: "test-only-placeholder",
  scope,
  behaviorPoint: "support.answer",
};

class TestAgent {
  constructor(options) { this.options = options; }
}

function request(viraMode, extra = {}) {
  return new Request("http://localhost/api/support", {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": "test-turn-1" },
    body: JSON.stringify({
      viraMode,
      observe: false,
      showRuntimeCheck: false,
      messages: [{ role: "user", content: "Where is my order?" }],
      ...extra,
    }),
  });
}

test("Vira OFF runs the configured agent without constructing or calling Vira", async () => {
  process.env.OPENAI_API_KEY = "test-only-placeholder";
  let agentCalls = 0;
  const handler = createSupportHandler({
    getViraConfig() { throw new Error("Vira config must not be read in OFF mode"); },
    createVira() { throw new Error("Vira client must not be created in OFF mode"); },
    AgentClass: TestAgent,
    async runAgent(agent, prompt) {
      agentCalls += 1;
      assert.equal(agent.options.instructions.includes("Vira behavior projection"), false);
      assert.match(prompt, /Where is my order\?/);
      return { finalOutput: "I can help check that." };
    },
  });

  const response = await handler(request("off"));
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.viraMode, "off");
  assert.equal(body.modelInvoked, true);
  assert.equal(body.answer, "I can help check that.");
  assert.equal(agentCalls, 1);
});

test("Vira ON runs the agent only after an active runtime projection", async () => {
  process.env.OPENAI_API_KEY = "test-only-placeholder";
  const order = [];
  const handler = createSupportHandler({
    getViraConfig: () => config,
    createVira: () => ({
      async resolveRuntime(input) {
        order.push("runtime");
        assert.equal(input.behaviorPoint, "support.answer");
        return {
          body: {
            projectionMode: "active",
            behaviorProjection: { rendered: "Answer politely.", projectionDigest: "digest-test" },
          },
          requestId: "request-test",
        };
      },
    }),
    AgentClass: TestAgent,
    async runAgent(agent) {
      order.push("agent");
      assert.match(agent.options.instructions, /Answer politely\./);
      return { finalOutput: "I can help." };
    },
  });

  const response = await handler(request("on", { showRuntimeCheck: true }));
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(order, ["runtime", "agent"]);
  assert.deepEqual(body.runtimeCheck, {
    state: "active_projection_received",
    requestId: "request-test",
    projectionDigest: "digest-test",
  });
});

test("Vira ON does not run the agent when there is no active projection", async () => {
  process.env.OPENAI_API_KEY = "test-only-placeholder";
  let agentCalls = 0;
  const handler = createSupportHandler({
    getViraConfig: () => config,
    createVira: () => ({
      async resolveRuntime() {
        return { body: { projectionMode: "none" }, requestId: "request-denied" };
      },
    }),
    AgentClass: TestAgent,
    async runAgent() { agentCalls += 1; return { finalOutput: "must not run" }; },
  });

  const response = await handler(request("on"));
  const body = await response.json();
  assert.equal(response.status, 409);
  assert.equal(body.status, "NO_ACTIVE_PROJECTION");
  assert.equal(body.modelInvoked, false);
  assert.equal(agentCalls, 0);
});
