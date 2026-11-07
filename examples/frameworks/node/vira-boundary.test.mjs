import test from "node:test";
import assert from "node:assert/strict";
import { resolveViraBoundary } from "./vira-boundary.mjs";

test("forwards the documented runtime request and preserves its result", async () => {
  const expected = { body: { runtime: { status: "ABSTAIN" } }, status: 200 };
  let received;
  const vira = { async resolveRuntime(input) { received = input; return expected; } };
  const request = {
    behaviorPoint: "support.answer",
    scope: { organizationId: "org-demo", projectId: "project-demo", environmentId: "env-demo" },
    idempotencyKey: "test:runtime:1",
  };
  assert.equal(await resolveViraBoundary(vira, request), expected);
  assert.deepEqual(received, {
    behaviorPoint: "support.answer",
    executionBoundary: request.scope,
    idempotencyKey: "test:runtime:1",
  });
});

test("rejects incomplete scope before making a request", async () => {
  let called = false;
  const vira = { async resolveRuntime() { called = true; } };
  await assert.rejects(
    resolveViraBoundary(vira, {
      behaviorPoint: "support.answer",
      scope: { organizationId: "org-demo", projectId: "project-demo" },
      idempotencyKey: "test:runtime:1",
    }),
    /complete Vira execution scope/,
  );
  assert.equal(called, false);
});
