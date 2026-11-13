/**
 * Canonical app-facing step after a reviewed, evaluated and released Pack.
 *
 * Real Vira API only: AUTO TaskRun admission and persisted state readback.
 * Does not manufacture provider output, validation results or child receipts.
 * Last-mile verified chat output must be supplied by the actual connected
 * provider/verification boundary, which is not exposed by this sample.
 */
import { randomUUID } from "node:crypto";
import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";

requireSafeTutorialScope();
if (process.env.VIRA_TUTORIAL_CONFIRM_AUTO_TASKRUN !== "true") {
  throw new Error(
    "Set VIRA_TUTORIAL_CONFIRM_AUTO_TASKRUN=true only after approving an eligible released Pack and confirming authorized non-production host capabilities",
  );
}
const connectionId = required("VIRA_CONNECTION_ID");
const input = process.env.VIRA_TUTORIAL_TASKRUN_PROMPT ||
  "Build a full-funnel launch plan for a B2B membership product without inventing campaign results.";
const suffix = randomUUID();
const taskRunId = "marketing-taskrun-" + suffix;
const requestId = "marketing-request-" + suffix;

const admitted = await vira.startTaskRun({
  taskRunId, requestId, input, requestedMode: "AUTO", connectionId,
  budget: { maxChildren: 4, maxCalls: 8 },
}, { idempotencyKey: "tutorial:taskrun:start:" + requestId });
const run = admitted?.body?.taskRun;
if (admitted?.status !== 201 || !run || run.taskRunId !== taskRunId) {
  console.log(JSON.stringify({
    admitted: false,
    route: admitted?.body?.route ?? null,
    reason: admitted?.body?.reason ?? null,
    requestId: admitted?.requestId ?? null,
  }, null, 2));
  throw new Error("TASKRUN_NOT_ADMITTED");
}
const read = await vira.getTaskRun(taskRunId);
const state = read?.body?.taskRun;
if (!state || state.taskRunId !== taskRunId) {
  throw new Error("TASKRUN_READBACK_NOT_CONFIRMED");
}
const events = await vira.listTaskRunEvents(taskRunId);
console.log(JSON.stringify({
  admitted: true,
  taskRunId,
  selectedMode: state.mode,
  status: state.status,
  stateVersion: state.stateVersion ?? null,
  eventCount: Array.isArray(events?.body?.events) ? events.body.events.length : null,
  verifiedProviderResponse: false,
  reason: "No separately verified provider/chat output is exposed by this public TaskRun sample.",
}, null, 2));
// Do not invent stateVersion, an execution/verification receipt or a chatbot reply.
