import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";
requireSafeTutorialScope();
const runId = required("VIRA_TUTORIAL_RUN_ID");

const controlPointId = process.env.VIRA_CONTROL_POINT_ID;
if (!controlPointId) {
  throw new Error("Set VIRA_CONTROL_POINT_ID to the persisted Behavior Point ID from the authoring step");
}

// This synthetic, public example is safe to admit without customer consent.
// Use CONSENTED_TENANT only for evidence with the required tenant consent.
const evidenceId = `tutorial-public-${runId}`;
const admitted = await vira.submitTeachEvidence({
  id: evidenceId,
  source: "tutorial:marketing-agent",
  content: "Synthetic review: the launch-plan draft omitted retention and did not define a measurement for each funnel stage.",
  privacy: "PUBLIC",
  consent: false,
}, { idempotencyKey: evidenceId });
const persistedEvidenceId = String(admitted?.body.evidence?.id ?? "");
if (!persistedEvidenceId) throw new Error("TEACH_EVIDENCE_NOT_ADMITTED");

const created = await vira.createTeachProposal({
  evidenceId: persistedEvidenceId,
  controlPointId,
  summary: "Include retention and a measurable outcome for each funnel stage.",
}, { idempotencyKey: `tutorial:teach:proposal:${evidenceId}` });
const proposalId = String(created?.body.proposal?.id ?? "");
if (!proposalId) throw new Error("TEACH_PROPOSAL_NOT_CREATED");
console.log(JSON.stringify({ evidenceId: persistedEvidenceId, proposalId, reviewed: false, evaluated: false,
  promoted: false, next: "Inspect this exact proposal in the authorized review surface before running 10-review-teach-proposal.mjs." }, null, 2));
