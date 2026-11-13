import test from "node:test";
import assert from "node:assert/strict";
import { createSupportHandler } from "../src/support-handler.mjs";

const scope = { organizationId: "org-test", projectId: "project-test", environmentId: "env-test" };
const config = { baseUrl: "https://api.example.test", apiKey: "test-only-placeholder", scope, connectionId: "test-connection" };

class TestAgent { constructor(options) { this.options = options; } }
function request(viraMode, extra = {}) {
  return new Request("http://localhost/api/support", {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": "test-turn-1" },
    body: JSON.stringify({
      viraMode, observe: false, showRuntimeCheck: false,
      messages: [{ role: "user", content: "Where is my order?" }], ...extra,
    }),
  });
}

test("OFF calls provider without accessing Vira", async () => {
  process.env.OPENAI_API_KEY = "test-only-placeholder";
  let calls = 0;
  const handle = createSupportHandler({
    getViraConfig() { throw Error("OFF should not read Vira"); },
    createVira() { throw Error("OFF should not make Vira"); },
    AgentClass: TestAgent,
    async runAgent(agent, prompt) {
      calls++;
      assert.doesNotMatch(agent.options.instructions, /projection/i);
      assert.match(prompt, /Where is my order/);
      return { finalOutput: "Ask for the order number." };
    },
  });
  const response = await handle(request("off"));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).answer, "Ask for the order number.");
  assert.equal(calls, 1);
});

test("ON admits AUTO TaskRun; no raw projection and no unverified provider call", async () => {
  delete process.env.OPENAI_API_KEY; // ON requires Vira admission, not direct provider key.
  let calls = 0;
  const handle = createSupportHandler({
    getViraConfig: () => config,
    createVira: () => ({
      async resolveRuntime() { throw Error("canonical path must not call resolveRuntime"); },
      async serveBehaviorProjection() { throw Error("canonical path must not call projection"); },
      async startTaskRun(input, options) {
        calls++;
        assert.equal(input.requestedMode, "AUTO");
        assert.equal(input.connectionId, "test-connection");
        assert.ok(options.idempotencyKey);
        return { status: 201, requestId: "server-request", body: {taskRun:{
          taskRunId: input.taskRunId, mode: "SINGLE", status: "ADMITTED",
        }}};
      },
      async getTaskRun(id) {
        return {status: 200, body:{taskRun:{taskRunId:id,mode:"SINGLE",status:"RUNNING"}}};
      },
    }),
    AgentClass: TestAgent,
    async runAgent() { throw Error("No provider until verifiable handoff"); },
  });
  const result = await handle(request("on", { showRuntimeCheck: true }));
  const body = await result.json();
  assert.equal(result.status, 202);
  assert.equal(body.taskRun.status, "RUNNING");
  assert.equal(body.taskRun.selectedMode, "SINGLE");
  assert.equal(body.modelInvoked, false);
  assert.equal(body.runtimeCheck.verification, "not_available_from_public_taskrun_response");
  assert.equal(body.answer, undefined);
  assert.equal(calls, 1);
});

test("ON fails closed on denied admission", async () => {
  const handle = createSupportHandler({
    getViraConfig: () => config,
    createVira: () => ({
      async startTaskRun() { return {status: 200, body:{proposalOnly:true,route:"ABSTAIN"}}; },
    }),
    async runAgent() { throw Error("provider must not run"); },
  });
  const result = await handle(request("on"));
  assert.equal(result.status, 409);
  assert.equal((await result.json()).modelInvoked, false);
});

test("ON fails closed without Vira configuration", async () => {
  const handle = createSupportHandler({
    getViraConfig: () => null,
    createVira() { throw Error("should not be constructed"); },
    async runAgent() { throw Error("provider must not run"); },
  });
  const result = await handle(request("on"));
  assert.equal(result.status, 503);
  assert.equal((await result.json()).error, "VIRA_TASKRUN_CONFIGURATION_INCOMPLETE");
});
