import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { test } from "node:test";

const tutorialDir = new URL(".", import.meta.url).pathname;
const runId = "mock-run-01";
const packId = `vira.marketing.starter.${runId}`;
const packDigest = `digest-${runId}`;
const evaluationId = `tutorial:pack:evaluate:${runId}`;
const proposalId = `proposal-${runId}`;
const pack = { id: packId, digest: packDigest, objects: { materialization: { status: "COMPLETE", digest: packDigest } } };
const requests = [];
let evaluation;
let nextPackReadDigest;
let approvalApplied = false;
let releaseApplied = false;
let teachProposalStatus = "CREATED";

function reply(response, status, body) {
  response.writeHead(status, { "content-type": "application/json", "x-request-id": `mock-request-${requests.length}` });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString("utf8");
  let body;
  try { body = rawBody ? JSON.parse(rawBody) : undefined; } catch { body = rawBody; }
  const path = new URL(request.url, "http://127.0.0.1").pathname;
  requests.push({ method: request.method, path, body, idempotencyKey: request.headers["idempotency-key"], authorization: request.headers.authorization });

  if (request.method === "POST" && path === "/v1/ai-systems") {
    return reply(response, 201, { system: { id: "system-mock" } });
  }
  if (request.method === "POST" && path === "/v1/ai-systems/system-mock/connections") {
    return reply(response, 201, { connection: { id: "connection-mock" }, handshake: { status: "CONNECTED" } });
  }
  if (request.method === "POST" && path === "/v1/connections/connection-mock/test") {
    return reply(response, 200, { status: "CONNECTED" });
  }
  if (request.method === "POST" && path === "/v1/observations") {
    return reply(response, 201, { observation: { id: body?.eventId } });
  }
  if (request.method === "POST" && path === "/v1/semantic/resolve") {
    return reply(response, 200, { receipt: { outcome: "select", taskKey: "marketing.launch_plan" }, capsules: [] });
  }
  if (request.method === "POST" && path === "/v1/packs/import") {
    return reply(response, 201, { pack, conflicts: [], validation: { valid: true }, inventory: { count: 5 } });
  }
  if (request.method === "POST" && path === `/v1/packs/${packId}/install`) {
    return reply(response, 202, { job: { status: "QUEUED" }, pack: { id: packId } });
  }
  if (request.method === "GET" && path === "/v1/packs") {
    const digest = nextPackReadDigest ?? packDigest;
    nextPackReadDigest = undefined;
    return reply(response, 200, { packs: [{ ...pack, digest, objects: { materialization: { status: "COMPLETE", digest } } }] });
  }
  if (request.method === "POST" && path === "/v1/evaluations") {
    evaluation = {
      id: body.id,
      status: "PASSED",
      score: 0.95,
      targetArtifact: body.targetArtifact,
    };
    return reply(response, 201, { evaluation });
  }
  if (request.method === "POST" && path === `/v1/packs/${packId}/evaluate`) {
    return reply(response, 200, { evaluation: { id: body.evaluationId, status: "EVALUATED" } });
  }
  if (request.method === "GET" && path.startsWith("/v1/evaluations/")) {
    return reply(response, 200, { evaluation });
  }
  if (request.method === "POST" && path === "/v1/runtime/resolve") {
    return reply(response, 200, { behaviorPoint: body.behaviorPoint, projectionMode: "active" });
  }
  if (request.method === "POST" && path === "/v1/quality/evaluate") {
    return reply(response, 200, { decision: "SELECT", selectedId: "repair" });
  }
  if (request.method === "POST" && path === "/v1/teach/evidence") {
    return reply(response, 201, { evidence: { id: body.id } });
  }
  if (request.method === "POST" && path === "/v1/teach/proposals") {
    return reply(response, 201, { proposal: { id: proposalId, status: "CREATED" } });
  }
  if (request.method === "POST" && path === `/v1/teach/proposals/${proposalId}/review`) {
    teachProposalStatus = "REVIEWED";
    return reply(response, 200, { proposal: { id: proposalId, status: teachProposalStatus } });
  }
  if (request.method === "POST" && path === `/v1/teach/proposals/${proposalId}/evaluate`) {
    teachProposalStatus = "EVALUATED";
    return reply(response, 200, { proposal: { id: proposalId, status: teachProposalStatus } });
  }
  if (request.method === "POST" && path === `/v1/teach/proposals/${proposalId}/promote`) {
    teachProposalStatus = "PROMOTED";
    return reply(response, 200, { proposal: { id: proposalId, status: teachProposalStatus } });
  }
  if (request.method === "POST" && path === `/v1/packs/${packId}/approve`) {
    approvalApplied = body?.manualApproval === true;
    return reply(response, 200, { pack: { ...pack, status: "APPROVED" } });
  }
  if (request.method === "POST" && path === `/v1/packs/${packId}/release`) {
    releaseApplied = approvalApplied;
    return reply(response, 200, { pack: { ...pack, status: "RELEASED" } });
  }

  return reply(response, 404, { error: "MOCK_ROUTE_NOT_FOUND", path, method: request.method });
});

function runScript(file, overrides = {}) {
  const env = {
    PATH: process.env.PATH,
    VIRA_API_URL: `http://127.0.0.1:${server.address().port}`,
    VIRA_API_KEY: "local-test-key",
    VIRA_ALLOW_INSECURE_LOCALHOST: "true",
    VIRA_ORGANIZATION_ID: "org-mock",
    VIRA_PROJECT_ID: "project-mock",
    VIRA_ENVIRONMENT_ID: "environment-mock",
    VIRA_TUTORIAL_NON_PRODUCTION: "true",
    VIRA_TUTORIAL_ALLOW_MUTATIONS: "true",
    VIRA_TUTORIAL_RUN_ID: runId,
    VIRA_TUTORIAL_CONFIRM_PACK_INSTALL: "false",
    VIRA_TUTORIAL_APPROVE_RELEASE: "false",
    VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL: "false",
    VIRA_AI_SYSTEM_ID: "system-mock",
    VIRA_CONNECTION_ID: "connection-mock",
    VIRA_CONTROL_POINT_ID: "control-point-mock",
    VIRA_TUTORIAL_PACK_ID: packId,
    VIRA_TUTORIAL_EVALUATION_ID: evaluationId,
    VIRA_TUTORIAL_APPROVED_PACK_DIGEST: packDigest,
    VIRA_TUTORIAL_TEACH_PROPOSAL_ID: proposalId,
    ...overrides,
  };
  for (const [key, value] of Object.entries(env)) if (value === undefined) delete env[key];
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [file], { cwd: tutorialDir, env, stdio: ["ignore", "pipe", "pipe"] });
    const stdout = [];
    const stderr = [];
    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    const timer = setTimeout(() => child.kill("SIGTERM"), 10_000);
    child.once("error", (error) => {
      clearTimeout(timer);
      resolve({ error, status: null, stdout: Buffer.concat(stdout).toString("utf8"), stderr: Buffer.concat(stderr).toString("utf8") });
    });
    child.once("close", (status, signal) => {
      clearTimeout(timer);
      resolve({ status, signal, stdout: Buffer.concat(stdout).toString("utf8"), stderr: Buffer.concat(stderr).toString("utf8") });
    });
  });
}

async function assertScriptSuccess(file, overrides) {
  const result = await runScript(file, overrides);
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, `${file}\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

test("marketing tutorial runs its governed lifecycle against a local mock only", async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const initialRequestCount = requests.length;
    const missingMutationGate = await runScript("01-connect.mjs", { VIRA_TUTORIAL_ALLOW_MUTATIONS: undefined });
    assert.notEqual(missingMutationGate.status, 0);
    assert.match(missingMutationGate.stderr, /VIRA_TUTORIAL_ALLOW_MUTATIONS/);
    assert.equal(requests.length, initialRequestCount, "connect ran before its local non-production mutation gate");

    await assertScriptSuccess("01-connect.mjs");
    await assertScriptSuccess("02-observe-baseline.mjs");
    await assertScriptSuccess("03-feedback.mjs");
    await assertScriptSuccess("04-semantic-resolve.mjs");

    const candidateOnly = await assertScriptSuccess("05-pack-lifecycle.mjs");
    assert.match(candidateOnly, /Install not started/);
    assert.equal(requests.some((entry) => entry.path === `/v1/packs/${packId}/install`), false);

    const installed = await assertScriptSuccess("05-pack-lifecycle.mjs", { VIRA_TUTORIAL_CONFIRM_PACK_INSTALL: "true" });
    assert.match(installed, /"released": false/);
    const installCall = requests.find((entry) => entry.path === `/v1/packs/${packId}/install`);
    assert.deepEqual(installCall.body, { variables: { brand_name: "Example Brand", markets: ["TR"], approval_required: true } });
    assert.equal(requests.some((entry) => entry.method === "GET" && entry.path === "/v1/packs"), true, "202 installation did not poll for materialization");
    assert.equal(evaluation?.targetArtifact?.packId, packId);
    assert.equal(evaluation?.targetArtifact?.packDigest, packDigest);

    await assertScriptSuccess("06-runtime-resolve.mjs");
    await assertScriptSuccess("07-quality-decision.mjs");
    assert.match(await assertScriptSuccess("08-teach-proposal.mjs"), /"promoted": false/);

    let beforeBlockedRelease = requests.length;
    const missingReleaseApproval = await runScript("09-release-pack.mjs");
    assert.notEqual(missingReleaseApproval.status, 0);
    assert.match(missingReleaseApproval.stderr, /VIRA_TUTORIAL_APPROVE_RELEASE/);
    assert.equal(requests.length, beforeBlockedRelease, "release read or write happened before explicit approval");

    nextPackReadDigest = "changed-digest";
    beforeBlockedRelease = requests.length;
    const staleDigest = await runScript("09-release-pack.mjs", { VIRA_TUTORIAL_APPROVE_RELEASE: "true" });
    assert.notEqual(staleDigest.status, 0);
    assert.match(staleDigest.stderr, /PACK_DIGEST_CHANGED_OR_NOT_FOUND/);
    assert.equal(requests.slice(beforeBlockedRelease).some((entry) => entry.path.endsWith("/approve") || entry.path.endsWith("/release")), false);

    const mismatchedEvaluation = structuredClone(evaluation);
    evaluation = { ...evaluation, targetArtifact: { ...evaluation.targetArtifact, packDigest: "changed-digest" } };
    beforeBlockedRelease = requests.length;
    const staleEvaluation = await runScript("09-release-pack.mjs", { VIRA_TUTORIAL_APPROVE_RELEASE: "true" });
    assert.notEqual(staleEvaluation.status, 0);
    assert.match(staleEvaluation.stderr, /PACK_EVALUATION_NOT_BOUND_TO_APPROVED_DIGEST/);
    assert.equal(requests.slice(beforeBlockedRelease).some((entry) => entry.path.endsWith("/approve") || entry.path.endsWith("/release")), false);
    evaluation = mismatchedEvaluation;

    beforeBlockedRelease = requests.length;
    await assertScriptSuccess("09-release-pack.mjs", { VIRA_TUTORIAL_APPROVE_RELEASE: "true" });
    assert.equal(approvalApplied, true);
    assert.equal(releaseApplied, true);
    const approval = requests.findLast((entry) => entry.path.endsWith("/approve"));
    assert.equal(approval.body.manualApproval, true);
    assert.match(approval.body.reason, new RegExp(evaluationId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const release = requests.findLast((entry) => entry.path.endsWith("/release"));
    assert.ok(requests.indexOf(approval) > beforeBlockedRelease);
    assert.ok(requests.indexOf(release) > requests.indexOf(approval));

    beforeBlockedRelease = requests.length;
    const missingTeachApproval = await runScript("10-review-teach-proposal.mjs");
    assert.notEqual(missingTeachApproval.status, 0);
    assert.match(missingTeachApproval.stderr, /VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL/);
    assert.equal(requests.length, beforeBlockedRelease, "Teach review happened before explicit approval");

    await assertScriptSuccess("10-review-teach-proposal.mjs", { VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL: "true" });
    assert.equal(teachProposalStatus, "PROMOTED");
    assert.equal(requests.some((entry) => entry.path === `/v1/teach/proposals/${proposalId}/review`), true);
    assert.equal(requests.some((entry) => entry.path === `/v1/teach/proposals/${proposalId}/evaluate`), true);
    assert.equal(requests.some((entry) => entry.path === `/v1/teach/proposals/${proposalId}/promote`), true);

    const writes = requests.filter((entry) => ["POST", "DELETE"].includes(entry.method) && !entry.path.endsWith("/test"));
    assert.ok(writes.every((entry) => entry.authorization === "Bearer local-test-key"));
    assert.ok(writes.every((entry) => typeof entry.idempotencyKey === "string" && entry.idempotencyKey.length > 0));
    assert.ok(requests.every((entry) => entry.path.startsWith("/v1/")), "the tutorial escaped the local mock server API base URL");
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
