import { required, vira } from "./_client.mjs";
import { requireSafeTutorialScope } from "./guard.mjs";

requireSafeTutorialScope();
if (process.env.VIRA_TUTORIAL_APPROVE_RELEASE !== "true") {
  throw new Error("Stop: set VIRA_TUTORIAL_APPROVE_RELEASE=true only after reviewing the exact Pack digest and evaluation evidence");
}

const packId = required("VIRA_TUTORIAL_PACK_ID");
const evaluationId = required("VIRA_TUTORIAL_EVALUATION_ID");
const approvedDigest = required("VIRA_TUTORIAL_APPROVED_PACK_DIGEST");
const [listed, evaluated] = await Promise.all([
  vira.listPacks(),
  vira.getEvaluation(evaluationId),
]);
const pack = listed?.body?.packs?.find((item) => item.id === packId);
const evaluation = evaluated?.body?.evaluation;

if (!pack || String(pack.digest ?? "") !== approvedDigest) {
  throw new Error("PACK_DIGEST_CHANGED_OR_NOT_FOUND; do not approve or release");
}
if (evaluation?.status !== "PASSED"
  || evaluation?.targetArtifact?.packId !== packId
  || evaluation?.targetArtifact?.packDigest !== approvedDigest) {
  throw new Error("PACK_EVALUATION_NOT_BOUND_TO_APPROVED_DIGEST; do not approve or release");
}

console.log(JSON.stringify({
  packId,
  packDigest: approvedDigest,
  evaluationId,
  evaluationStatus: evaluation.status,
  approvalWillApplyToExactDigest: true,
}, null, 2));

const approval = await vira.approvePack(packId, {
  manualApproval: true,
  reason: `Reviewed evaluation ${evaluationId} for Pack digest ${approvedDigest}`,
});
console.log("Approval result", JSON.stringify(approval?.body, null, 2));

const release = await vira.releasePack(packId);
console.log("Release result", JSON.stringify(release?.body, null, 2));
