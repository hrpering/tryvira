import { ViraClient } from "@tryvira/sdk";
import { runPackEvaluation } from "./pack-evaluation.mjs";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Set ${name} in your local secret/environment manager`);
  return value;
}

if (process.env.VIRA_TUTORIAL_NON_PRODUCTION !== "true") {
  throw new Error("Set VIRA_TUTORIAL_NON_PRODUCTION=true only after verifying the configured deployment is isolated and non-production");
}
if (process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS !== "true") {
  throw new Error("Set VIRA_TUTORIAL_ALLOW_MUTATIONS=true only when you authorize creating this evaluation record");
}

const baseUrl = required("VIRA_API_URL").replace(/\/$/, "");
if (baseUrl.includes("example.invalid") || baseUrl.endsWith("/v1")) {
  throw new Error("VIRA_API_URL must be the real API base URL without a /v1 suffix");
}
const runId = required("VIRA_EVALUATION_RUN_ID");
if (!/^[a-z0-9][a-z0-9-]{2,39}$/.test(runId)) {
  throw new Error("VIRA_EVALUATION_RUN_ID must be 3–40 lowercase letters, digits, or hyphens");
}

const vira = new ViraClient({
  baseUrl,
  apiKey: required("VIRA_API_KEY"),
  failureMode: "throw",
});

const result = await runPackEvaluation(vira, {
  packId: required("VIRA_PACK_ID"),
  packDigest: required("VIRA_PACK_DIGEST"),
  runId,
});
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 2;
