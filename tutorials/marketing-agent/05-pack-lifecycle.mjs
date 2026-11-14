import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";

requireSafeTutorialScope();
const runId = required("VIRA_TUTORIAL_RUN_ID");
if (!/^[a-z0-9-]{4,40}$/.test(runId)) throw new Error("VIRA_TUTORIAL_RUN_ID must be 4-40 lowercase letters, digits, or hyphens");

// Load the same canonical source Pack that the Pack Academy documents.
// This prevents the tutorial from silently drifting back to a generic rubric.
import { readFile } from "node:fs/promises";
const packRoot = new URL("../../examples/packs/marketing-starter/", import.meta.url);
const collection = async kind => JSON.parse(await readFile(new URL(kind + "/items.json", packRoot), "utf8"));
const suffix = "." + runId;
const key = value => value + suffix;
const rawTasks = await collection("semantic-tasks");
const rawPoints = await collection("behavior-points");
const rawPrograms = await collection("behavior-programs");
const objects = {
  semanticTasks: rawTasks.map(t => ({...t, taskKey: key(t.taskKey)})),
  behaviorPoints: rawPoints.map(p => ({...p, key: key(p.key), taskKey: key(p.taskKey)})),
  behaviorPrograms: rawPrograms.map(p => ({
    ...p, key: key(p.key),
    modules: (p.modules || []).map(m => ({...m, stableKey: key(m.stableKey),
      checks: (m.checks || []).map(c => ({...c, stableKey: key(c.stableKey)}))
    }))
  })),
  signals: (await collection("signals")).map(s => ({...s,key: key(s.key)})),
  evaluations: (await collection("evaluations")).map(e => ({...e,id: key(e.id)}))
};
const manifest = {
  id: "vira.examples.marketing_launch." + runId,
  name: "Marketing Launch Decision",
  version: "1.2.0",
  requires: { vira: ">=1.0" }
};
// Import parses/adopts a candidate. It does not activate behavior.
const imported = await vira.importPack({
  manifest,
  objects,
  idempotencyKey: `tutorial:pack:import:${runId}`
});

const packId = String(imported?.body.pack?.id ?? imported?.body.id ?? "");
if (!packId) throw new Error("Pack import did not return a pack id");
if (Array.isArray(imported?.body?.conflicts) && imported.body.conflicts.length > 0) {
  throw new Error("PACK_CONFLICTS_REQUIRE_REVIEW; inspect the import result and resolve conflicts before install");
}

console.log("Imported candidate. Inspect validation/inventory/conflicts before install:");
console.log(JSON.stringify(imported?.body, null, 2));
if (process.env.VIRA_TUTORIAL_CONFIRM_PACK_INSTALL !== "true") {
  console.log(`Install not started. Review the import result, then rerun with VIRA_TUTORIAL_CONFIRM_PACK_INSTALL=true and the same VIRA_TUTORIAL_RUN_ID=${runId}.`);
  process.exit(0);
}

// Installation materializes canonical draft objects. It is still not release.
// This version has no unbound installer variables; task inputs supply real constraints.
const installResponse = await vira.installPack(packId, {});
let installedPack = installResponse?.body.pack;
let materialization = installResponse?.body.materialization ?? installedPack?.objects?.materialization;

if (installResponse.status === 202) {
  // A 202 response is only a queued job. Read the scoped Pack list until the
  // worker's persisted materialization receipt is visible.
  const deadline = Date.now() + 30_000;
  while (!materialization && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    const listed = await vira.listPacks();
    installedPack = listed?.body.packs?.find((item) => item.id === packId);
    materialization = installedPack?.objects?.materialization;
  }
}
const packDigest = String(installedPack?.digest ?? "");
if (installedPack?.id !== packId || !packDigest || !materialization) {
  throw new Error("PACK_MATERIALIZATION_NOT_CONFIRMED");
}

// Use multiple diverse, source-controlled cases rather than one easy launch request.
// This evaluates a candidate using supplied criteria; it does not prove runtime use.
const corpus = JSON.parse(await readFile(new URL("tests/cases.json", packRoot), "utf8"));
const caseIds = new Set(["MK-001","MK-005","MK-006","MK-010","MK-011","MK-015","MK-018","MK-019","MK-021","MK-022"]);
const dataset = corpus.cases.filter(c => caseIds.has(c.id)).map(c => ({
  id: c.id + "." + runId,
  input: c.prompt,
  criteria: [...c.expected, ...c.negative.map(n => "Must avoid: " + n)]
}));
if (dataset.length !== caseIds.size) throw new Error("MARKETING_EVAL_CASES_MISSING");
const started = await vira.startEvaluation({
  id: `tutorial:pack:evaluate:${runId}`,
  targetArtifact: {
    packId, packDigest,
    criteria: [
      "Respect real product, budget, team, market and evidence constraints.",
      "Produce prioritized experiments with KPI definitions and decision gates.",
      "Do not invent customer evidence, performance or approved actions."
    ]
  },
  dataset,
  threshold: 0.8,
}, { idempotencyKey: `tutorial:pack:evaluate:${runId}` });
const evaluationId = String(started?.body.evaluation?.id ?? "");
if (started.status !== 201 || !evaluationId || started?.body.evaluation?.status !== "PASSED") {
  throw new Error("Tutorial candidate evaluation did not pass");
}
const evaluation = started?.body.evaluation;
if (evaluation?.targetArtifact?.packId !== packId || evaluation?.targetArtifact?.packDigest !== packDigest) {
  throw new Error("PACK_EVALUATION_BINDING_MISMATCH");
}
const packEvaluation = await vira.evaluatePack(packId, { evaluationId });
console.log("Pack evaluation attachment", JSON.stringify(packEvaluation?.body, null, 2));
console.log(JSON.stringify({ packId, packDigest, evaluationId, evaluated: true, released: false,
  next: "Review this exact Pack digest and persisted evaluation. Use 09-release-pack.mjs only after explicit approval." }, null, 2));
