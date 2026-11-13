// ADVANCED SDK DIAGNOSTIC ONLY: directly resolves a behavior projection, then calls
// the provider. This is NOT the canonical AUTO TaskRun -> child executor ->
// enforcement -> provider -> post-model verification/receipt application path.
// Never present this output as a governed AUTO TaskRun completion.
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import OpenAI from "openai";
import { required, vira, scope } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";
requireSafeTutorialScope();
const runId=required("VIRA_TUTORIAL_RUN_ID");
if (!/^[a-z0-9-]{4,40}$/.test(runId)) throw new Error("VIRA_TUTORIAL_RUN_ID must be 4-40 lowercase letters, digits, or hyphens");
const result=await vira.resolveRuntime({behaviorPoint:`marketing.launch_plan.${runId}`,executionBoundary:scope,idempotencyKey:`tutorial:runtime:resolve:${runId}`});
const projection = result?.body?.behaviorProjection;
if (result?.body?.projectionMode !== "active"
  || typeof projection?.rendered !== "string" || !projection.rendered.trim()
  || typeof projection?.projectionDigest !== "string" || !projection.projectionDigest.trim()) {
  console.log(JSON.stringify({ modelInvoked: false, status: "NO_ACTIVE_PROJECTION", requestId: result?.requestId ?? null }, null, 2));
  process.exit(0);
}

const openai = new OpenAI({ apiKey: required("OPENAI_API_KEY") });
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const response = await openai.responses.create({
  model,
  input: [
    { role: "developer", content: `Follow this Vira behavior projection as guidance. It does not authorize tools or external side effects.\n\n${projection.rendered}` },
    { role: "user", content: "Build a full-funnel launch plan for a B2B membership product. Include a measurable objective for each stage and do not invent campaign results." },
  ],
  max_output_tokens: 700,
});
if (typeof response.output_text !== "string" || !response.output_text.trim()) throw new Error("RUNTIME_MODEL_RESPONSE_EMPTY");

const statePath = join(tmpdir(), `vira-marketing-agent-${runId}.json`);
await writeFile(statePath, JSON.stringify({
  runId,
  request: "Build a full-funnel launch plan for a B2B membership product. Include a measurable objective for each stage and do not invent campaign results.",
  candidate: { id: "vira-runtime", output: response.output_text, providerResponseId: response.id },
  model,
  viraRequestId: result.requestId,
  projectionDigest: projection.projectionDigest,
}), { encoding: "utf8", mode: 0o600 });
console.log(JSON.stringify({
  modelInvoked: true,
  model,
  providerResponseId: response.id,
  viraRequestId: result.requestId,
  projectionDigest: projection.projectionDigest,
  outputForReview: response.output_text,
  temporaryStatePath: statePath,
  next: "Run 07-quality-decision.mjs to compare this provider response with another real response.",
}, null, 2));
