import { ViraClient } from "@tryvira/sdk";
import { createAndReadTeachAnalysis } from "./teach-analysis.mjs";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Set ${name} in your local secret/environment manager`);
  return value;
}

const mode = process.argv[2] ?? "create";
if (!new Set(["create", "read"]).has(mode)) {
  throw new Error("Usage: node run-teach-analysis.mjs [create|read]");
}

const baseUrl = required("VIRA_API_URL").replace(/\/$/, "");
if (baseUrl.includes("example.invalid") || baseUrl.endsWith("/v1")) {
  throw new Error("VIRA_API_URL must be the API deployment root without a /v1 suffix");
}
const vira = new ViraClient({
  baseUrl,
  apiKey: required("VIRA_API_KEY"),
  failureMode: "throw",
});

if (mode === "create") {
  if (process.env.VIRA_TUTORIAL_NON_PRODUCTION !== "true") {
    throw new Error("Set VIRA_TUTORIAL_NON_PRODUCTION=true only after verifying this is an isolated non-production deployment");
  }
  if (process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS !== "true") {
    throw new Error("Set VIRA_TUTORIAL_ALLOW_MUTATIONS=true only when you authorize creating this Teach analysis");
  }
  const evidenceIds = required("VIRA_TEACH_EVIDENCE_IDS")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (evidenceIds.length === 0) throw new Error("VIRA_TEACH_EVIDENCE_IDS must contain admitted evidence IDs");
  const result = await createAndReadTeachAnalysis(vira, {
    analysisId: required("VIRA_TEACH_ANALYSIS_ID"),
    evidenceIds,
    controlPointId: process.env.VIRA_CONTROL_POINT_ID?.trim() || undefined,
    summary: process.env.VIRA_TEACH_ANALYSIS_SUMMARY?.trim() || undefined,
  });
  console.log(JSON.stringify(result, null, 2));
  if (result.errorCode) process.exitCode = 2;
} else {
  const analysisId = required("VIRA_TEACH_ANALYSIS_ID");
  const readback = await vira.getTeachAnalysis(analysisId);
  if (readback?.status !== 200 || readback?.body?.analysisId !== analysisId) {
    throw new Error("TEACH_ANALYSIS_READBACK_NOT_CONFIRMED");
  }
  const analysis = readback.body;
  const result = {
    analysisId,
    status: analysis.status,
    teachRunId: typeof analysis.teachRunId === "string" ? analysis.teachRunId : null,
    errorCode: typeof analysis.errorCode === "string" ? analysis.errorCode : null,
    requestId: readback.requestId,
  };
  console.log(JSON.stringify(result, null, 2));
  if (result.errorCode) process.exitCode = 2;
}
