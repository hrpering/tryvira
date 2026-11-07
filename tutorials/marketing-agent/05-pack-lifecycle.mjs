import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";

requireSafeTutorialScope();
const runId = required("VIRA_TUTORIAL_RUN_ID");
if (!/^[a-z0-9-]{4,40}$/.test(runId)) throw new Error("VIRA_TUTORIAL_RUN_ID must be 4-40 lowercase letters, digits, or hyphens");

const objects = {
  semanticTasks: [
    {
      taskKey: `marketing.launch_plan.${runId}`,
      description: "Build a launch plan for a product or service",
      aliases: ["go to market plan", "launch strategy"],
      examples: [
        "Create a launch plan for a subscription product",
        "Build a go-to-market plan for a membership service"
      ],
      negativeExamples: ["Rewrite this headline"]
    }
  ],
  behaviorPoints: [
    {
      key: `marketing.launch_plan.${runId}`,
      taskKey: `marketing.launch_plan.${runId}`,
      requirement: "Cover the full funnel and include measurement",
      verification: "Confirm each funnel stage has an objective and measurement approach"
    }
  ],
  behaviorPrograms: [
    {
      key: `marketing.launch_plan.${runId}`,
      rubric: [
        "Cover awareness, consideration, conversion, and retention",
        "Include a measurement approach for every stage"
      ],
      examples: ["A launch plan with objectives and metrics by funnel stage"],
      antiPatterns: ["Acquisition-only plan", "Invented campaign results"]
    }
  ],
  signals: [
    { key: "quality.missing_measurement" },
    { key: "feedback.user_correction" }
  ],
  evaluations: [
    { id: "marketing.launch.public-example" }
  ]
};

const manifest = {
  id: `vira.marketing.starter.${runId}`,
  name: "Marketing Starter",
  version: "1.1.0",
  requires: { vira: ">=1.0" },
  variables: [
    { key: "brand_name", label: "Brand name", required: true },
    { key: "markets", label: "Markets", type: "multi_select" },
    { key: "approval_required", label: "Require approval before media changes?", type: "boolean", default: true }
  ]
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
const installResponse = await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"],
  approval_required: true
});
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

// Provider-backed evaluation creates a trusted, digest-bound evaluation from
// supplied criteria. It does not prove that runtime executed the installed Pack.
const started = await vira.startEvaluation({
  id: `tutorial:pack:evaluate:${runId}`,
  targetArtifact: {
    packId,
    packDigest,
    criteria: [
      "Cover awareness, consideration, conversion, and retention.",
      "Include a measurement approach for every stage.",
      "Do not invent campaign results.",
    ],
  },
  dataset: [{
    id: "launch-plan-case",
    input: "Create a launch plan for a B2B membership product.",
    criteria: [
      "Cover awareness, consideration, conversion, and retention.",
      "Include measurable next steps for each stage.",
    ],
  }],
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
