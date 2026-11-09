import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";

requireSafeTutorialScope();
const proposalId = required("VIRA_TUTORIAL_TEACH_PROPOSAL_ID");
const mode = process.argv[2] ?? "review-evaluate";

if (mode === "promote") {
  if (process.env.VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL !== "true") {
    throw new Error("Stop: set VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL=true only after a separate explicit promotion decision");
  }
  const promoted = await vira.transitionTeachProposal(proposalId, "promote", {}, {
    idempotencyKey: `tutorial:teach:promote:${proposalId}`,
  });
  if (promoted?.body?.proposal?.status !== "PROMOTED") {
    throw new Error("TEACH_PROPOSAL_NOT_PROMOTED");
  }
  console.log(JSON.stringify({ proposalId, status: "PROMOTED", released: false }, null, 2));
} else if (mode === "review-evaluate") {
  if (process.env.VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL !== "true") {
    throw new Error("Stop: set VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL=true only after reviewing the exact proposal and explicitly authorizing review");
  }
  const reviewed = await vira.transitionTeachProposal(proposalId, "review", {
    decision: "APPROVE",
  }, { idempotencyKey: `tutorial:teach:review:${proposalId}` });
  if (reviewed?.body?.proposal?.status !== "REVIEWED") {
    throw new Error("TEACH_PROPOSAL_NOT_REVIEWED");
  }

  const started = await vira.startEvaluation({
    id: `tutorial-teach-evaluation-${proposalId}`,
    targetArtifact: {
      proposalId,
      criteria: [
        "Address the evidence-backed omission without inventing performance data.",
        "Keep the Behavior Point within its existing scope.",
      ],
    },
    dataset: [{
      id: "teach-proposal-case",
      input: "Revise the launch-plan behavior to address the reviewed evidence.",
      criteria: [
        "Address retention and measurement for each funnel stage.",
        "Do not invent campaign results.",
      ],
    }],
    threshold: 0.8,
  }, { idempotencyKey: `tutorial:teach:evaluation:${proposalId}` });
  const evaluation = started?.body?.evaluation;
  const evaluationId = String(evaluation?.id ?? "");
  if (started?.status !== 201 || !evaluationId || evaluation?.status !== "PASSED" || Number(evaluation?.score) < 0.8) {
    throw new Error("TEACH_PROPOSAL_EVALUATION_NOT_PASSED");
  }
  if (evaluation?.targetArtifact?.proposalId !== proposalId) {
    throw new Error("TEACH_EVALUATION_PROPOSAL_BINDING_MISMATCH");
  }

  const evaluated = await vira.transitionTeachProposal(proposalId, "evaluate", { evaluationId }, {
    idempotencyKey: `tutorial:teach:evaluate:${proposalId}`,
  });
  if (evaluated?.body?.proposal?.status !== "EVALUATED") {
    throw new Error("TEACH_PROPOSAL_EVALUATION_NOT_RECORDED");
  }
  console.log(JSON.stringify({ proposalId, evaluationId, status: "EVALUATED", released: false, next: "Separate authorized promotion: node 10-review-teach-proposal.mjs promote" }, null, 2));
} else {
  throw new Error("Usage: node 10-review-teach-proposal.mjs [review-evaluate|promote]");
}
