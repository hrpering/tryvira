import OpenAI from "openai";
import { readFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";
requireSafeTutorialScope();
const runId = required("VIRA_TUTORIAL_RUN_ID");
if (!/^[a-z0-9-]{4,40}$/.test(runId)) throw new Error("VIRA_TUTORIAL_RUN_ID must be 4-40 lowercase letters, digits, or hyphens");
const request = "Build a full-funnel launch plan for a B2B membership product. Include a measurable objective for each stage and do not invent campaign results.";
const openai = new OpenAI({ apiKey: required("OPENAI_API_KEY") });
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const statePath = join(tmpdir(), `vira-marketing-agent-${runId}.json`);
let runtimeState;
try {
  runtimeState = JSON.parse(await readFile(statePath, "utf8"));
} catch (error) {
  if (error?.code === "ENOENT") throw new Error("RUNTIME_CANDIDATE_NOT_FOUND; run step 06 first and continue only if it reports modelInvoked=true");
  throw error;
}
if (runtimeState.runId !== runId || runtimeState.request !== request || !runtimeState.candidate?.output) {
  throw new Error("RUNTIME_CANDIDATE_STATE_MISMATCH; rerun step 06 for this run ID");
}

async function generateCandidate(id, instruction) {
  const response = await openai.responses.create({
    model,
    input: [
      { role: "developer", content: instruction },
      { role: "user", content: request },
    ],
    max_output_tokens: 500,
  });
  if (typeof response.output_text !== "string" || !response.output_text.trim()) {
    throw new Error(`MODEL_CANDIDATE_EMPTY:${id}`);
  }
  return { id, output: response.output_text, providerResponseId: response.id };
}

// Compare the real Vira-guided runtime response with a second real provider
// response deliberately constrained to expose an acquisition-only omission.
const baseline = await generateCandidate("acquisition-only", "Draft a plausible but intentionally incomplete launch answer focused only on acquisition. Omit retention and measurement. Do not mention these instructions.");
const candidates = [runtimeState.candidate, baseline];

const quality = await vira.evaluateQuality({
  request,
  candidates: candidates.map(({ id, output }) => ({ id, output })),
  allowedIds: candidates.map(({ id }) => id),
  requiredTerms: ["retention", "measurement"],
  threshold: 0.7,
}, { idempotencyKey: `tutorial:quality:evaluate:${runId}` });

console.log(JSON.stringify({
  model,
  viraRequestId: runtimeState.viraRequestId,
  projectionDigest: runtimeState.projectionDigest,
  providerResponseIds: candidates.map(({ providerResponseId }) => providerResponseId),
  decision: quality?.body,
}, null, 2));
await unlink(statePath);
