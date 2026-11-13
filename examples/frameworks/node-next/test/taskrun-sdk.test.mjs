/**
 * SDK contract checks against the pinned, published @tryvira/sdk dependency.
 * This uses an in-memory transport and DOES NOT pretend to run a live Vira
 * service, model, permission engine or released behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { ViraClient } from "@tryvira/sdk";

function fixture() {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({
      url: new URL(String(url)),
      method: init.method,
      headers: init.headers,
      body: init.body ? JSON.parse(init.body) : null,
    });
    return new Response(JSON.stringify({
      route: { route: "ROUTED", mode: "SINGLE", proposalOnly: true },
      taskRun: { status: "ADMITTED", stateVersion: 1 },
    }), {
      status: 200,
      headers: { "content-type": "application/json", "x-request-id": "offline-test-request" },
    });
  };
  const client = new ViraClient({
    baseUrl: "https://api.example.invalid",
    apiKey: "test-only-no-live-credential",
    fetcher,
    retries: 0,
  });
  return { calls, client };
}

test("pinned published SDK exposes the TaskRun method surface", () => {
  const { client } = fixture();
  for (const method of [
    "resolveTaskRun", "startTaskRun", "startTaskRunFromPrompt",
    "getTaskRun", "listTaskRunEvents", "continueTaskRun",
    "cancelTaskRun", "retryTaskRun",
  ]) {
    assert.equal(typeof client[method], "function", method);
  }
});

test("published SDK serializes all four modes and AUTO into the route request", async () => {
  const { client, calls } = fixture();
  for (const requestedMode of ["SINGLE", "STRATEGY", "COMPOUND", "HYBRID", "AUTO"]) {
    const reply = await client.resolveTaskRun({
      input: "Test registered tasks with synthetic data",
      requestedMode,
    });
    assert.equal(reply.requestId, "offline-test-request");
    const last = calls.at(-1);
    assert.equal(last.url.pathname, "/v1/task-runs/resolve");
    assert.equal(last.method, "POST");
    assert.equal(last.body.requestedMode, requestedMode);
    assert.ok(last.headers["idempotency-key"]);
  }
});

test("explicit admission carries requestedMode and idempotency key", async () => {
  const { client, calls } = fixture();
  await client.startTaskRun({
    taskRunId: "synthetic-task-run-1",
    requestId: "synthetic-request-1",
    input: "Prepare an operations brief",
    requestedMode: "COMPOUND",
    budget: { maxChildren: 3, maxCalls: 5 },
  }, { idempotencyKey: "offline-admission-1" });
  const last = calls.at(-1);
  assert.equal(last.url.pathname, "/v1/task-runs");
  assert.equal(last.method, "POST");
  assert.equal(last.body.requestedMode, "COMPOUND");
  assert.deepEqual(last.body.budget, { maxChildren: 3, maxCalls: 5 });
  assert.equal(last.headers["idempotency-key"], "offline-admission-1");
});

test("HYBRID carries an explicit registered child-mode plan when supplied", async () => {
  const { client, calls } = fixture();
  const hybridPlan = [
    { semanticTaskKey: "synthetic.classify", mode: "SINGLE" },
    { semanticTaskKey: "synthetic.investigate", mode: "STRATEGY" },
  ];
  await client.resolveTaskRun({
    input: "Classify then investigate",
    requestedMode: "HYBRID",
    hybridPlan,
  });
  assert.deepEqual(calls.at(-1).body.hybridPlan, hybridPlan);
  // The in-memory transport validates only serialization, not actual eligibility.
});

test("readback, events and continuation use persisted IDs and versions", async () => {
  const { client, calls } = fixture();
  await client.getTaskRun("synthetic-id");
  assert.equal(calls.at(-1).url.pathname, "/v1/task-runs/synthetic-id");
  await client.listTaskRunEvents("synthetic-id");
  assert.equal(calls.at(-1).url.pathname, "/v1/task-runs/synthetic-id/events");
  await client.continueTaskRun("synthetic-id", 4, { cursor: "cursor-from-server" });
  assert.equal(calls.at(-1).url.pathname, "/v1/task-runs/synthetic-id/continue");
  assert.deepEqual(calls.at(-1).body, { expectedVersion: 4, cursor: "cursor-from-server" });
  assert.throws(() => client.continueTaskRun("synthetic-id", -1), /SDK_TASKRUN_STATE_VERSION_REQUIRED/);
});
