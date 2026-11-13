/**
 * Public SDK TaskRun mode tester.
 *
 * Route-only by default. Live Vira access is required, and routing does not
 * prove authorization, release eligibility, execution or model correctness.
 * The script sends no synthetic "successful" receipts.
 *
 * Run from examples/javascript after npm install:
 *   VIRA_API_URL=... VIRA_API_KEY=... node taskrun-modes.mjs AUTO
 *
 * To request a real admission, explicitly set:
 *   VIRA_CONFIRM_TASKRUN_START=yes
 * Use only an authorized isolated test tenant with eligible released Tasks.
 */
import { randomUUID } from "node:crypto";
import { ViraClient } from "@tryvira/sdk";

const supported = new Set(["AUTO", "SINGLE", "STRATEGY", "COMPOUND", "HYBRID"]);

if (process.argv.includes("--help")) {
  console.log([
    "Usage: node taskrun-modes.mjs [AUTO|SINGLE|STRATEGY|COMPOUND|HYBRID]",
    "Required: VIRA_API_URL, VIRA_API_KEY",
    "Optional: VIRA_TASKRUN_INPUT, VIRA_CONNECTION_ID,",
    "  VIRA_TASKRUN_HOST_CAPABILITIES, VIRA_TASKRUN_HYBRID_PLAN_JSON,",
    "  VIRA_TASKRUN_COMPOUND_PLAN_ID",
    "Default: routing proposal only; NO task execution requested.",
    "To request admission: VIRA_CONFIRM_TASKRUN_START=yes (authorized test scope only).",
  ].join("\n"));
  process.exit(0);
}

const requestedMode = (process.argv[2] || "AUTO").toUpperCase();
if (!supported.has(requestedMode)) {
  throw new Error("Mode must be AUTO, SINGLE, STRATEGY, COMPOUND or HYBRID");
}
for (const key of ["VIRA_API_URL", "VIRA_API_KEY"]) {
  if (!process.env[key]) throw new Error(key + " is required for live Vira routing");
}

const input = process.env.VIRA_TASKRUN_INPUT ||
  "Summarize this support incident and identify what needs verification";

function optionalHybridPlan() {
  if (!process.env.VIRA_TASKRUN_HYBRID_PLAN_JSON) return undefined;
  const value = JSON.parse(process.env.VIRA_TASKRUN_HYBRID_PLAN_JSON);
  if (!Array.isArray(value) || !value.length ||
      value.some((item) => !item || typeof item.semanticTaskKey !== "string" ||
        !["SINGLE", "STRATEGY"].includes(item.mode))) {
    throw new Error("Hybrid plan must be an array of registered semanticTaskKey and mode pairs");
  }
  return value;
}

const hybridPlan = optionalHybridPlan();
const hostCapabilities = (process.env.VIRA_TASKRUN_HOST_CAPABILITIES || "")
  .split(",").map((value) => value.trim()).filter(Boolean);

const connectionId = process.env.VIRA_CONNECTION_ID;
const routeRequest = {
  input,
  requestedMode,
  ...(connectionId ? { connectionId } : {}),
  ...(hostCapabilities.length ? { hostCapabilities } : {}),
  ...(hybridPlan ? { hybridPlan } : {}),
};

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL,
  apiKey: process.env.VIRA_API_KEY,
});

const proposal = await vira.resolveTaskRun(routeRequest);
const body = proposal?.body;
const decision = body?.route && typeof body.route === "object" ? body.route : body;
console.log(JSON.stringify({
  stage: "route_proposal",
  requestedMode,
  route: typeof decision?.route === "string" ? decision.route : "UNKNOWN",
  proposedMode: decision?.mode ?? null,
  reason: decision?.reason ?? null,
  requestId: proposal?.requestId ?? null,
}, null, 2));

if (process.env.VIRA_CONFIRM_TASKRUN_START !== "yes") {
  console.log("Route-only: no task admission or execution requested.");
  process.exit(0);
}

if (decision?.route !== "ROUTED") {
  throw new Error("Cannot request admission because Vira did not route this task");
}
if (!process.env.VIRA_CONFIRM_NON_PRODUCTION || process.env.VIRA_CONFIRM_NON_PRODUCTION !== "yes") {
  throw new Error("Set VIRA_CONFIRM_NON_PRODUCTION=yes after verifying an authorized non-production scope");
}

const suffix = randomUUID();
const taskRunId = "task-run-" + suffix;
const requestId = "request-" + suffix;
const compoundPlanId = process.env.VIRA_TASKRUN_COMPOUND_PLAN_ID;
const admitted = await vira.startTaskRun({
  taskRunId,
  requestId,
  input,
  requestedMode,
  ...(connectionId ? { connectionId } : {}),
  ...(hostCapabilities.length ? { hostCapabilities } : {}),
  ...(hybridPlan ? { hybridPlan } : {}),
  ...(compoundPlanId ? { compoundPlanId } : {}),
  budget: { maxChildren: 4, maxCalls: 8 },
}, { idempotencyKey: "task-run:start:" + requestId });

const readback = await vira.getTaskRun(taskRunId);
const state = readback?.body?.taskRun || readback?.body;
console.log(JSON.stringify({
  stage: "admission_and_readback",
  requestId: admitted?.requestId ?? null,
  taskRunId,
  persistedStatus: state?.status ?? null,
  persistedMode: state?.mode ?? null,
  stateVersion: state?.stateVersion ?? null,
}, null, 2));

// The API may legitimately return WAITING_USER / BLOCKED / FAILED / PARTIAL.
// Never fabricate success or continue a run with an invented stateVersion.
// Never assume the host may execute external actions because route=ROUTED.
