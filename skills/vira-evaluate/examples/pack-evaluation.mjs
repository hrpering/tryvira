/**
 * Provider-backed Behavior Evaluation for one already materialized Pack.
 * The caller supplies a scoped client; this function is deliberately easy to
 * It never approves or releases the Pack.
 */
export async function runPackEvaluation(vira, { packId, packDigest, runId }) {
  if (!packId || !packDigest || !runId) {
    throw new Error("PACK_ID_DIGEST_AND_RUN_ID_REQUIRED");
  }

  const listed = await vira.listPacks();
  const pack = listed?.body?.packs?.find((item) => item.id === packId);
  const materialization = pack?.objects?.materialization ?? pack?.materialization;
  if (!pack || pack.digest !== packDigest || !materialization) {
    throw new Error("PACK_MATERIALIZATION_OR_DIGEST_NOT_CONFIRMED");
  }

  const started = await vira.startEvaluation(
    {
      id: `skill-pack-evaluation-${runId}`,
      targetArtifact: {
        packId,
        packDigest,
        criteria: ["Follow the Pack's stated behavior and constraints."],
      },
      dataset: [
        {
          id: `case-${runId}`,
          input: "Create a launch plan for a B2B subscription product.",
          criteria: [
            "Cover the requested funnel stages.",
            "Include measurable next steps.",
          ],
        },
      ],
      threshold: 0.8,
    },
    { idempotencyKey: `skill-pack-evaluation:${packId}:${runId}` },
  );

  const initial = started?.body?.evaluation;
  const evaluationId = initial?.id;
  if (started?.status !== 201 || typeof evaluationId !== "string" || !evaluationId) {
    throw new Error("EVALUATION_NOT_PERSISTED");
  }
  if (
    initial?.targetArtifact?.packId !== packId ||
    initial?.targetArtifact?.packDigest !== packDigest
  ) {
    throw new Error("EVALUATION_PACK_BINDING_MISMATCH");
  }

  const readback = await vira.getEvaluation(evaluationId);
  const evaluation = readback?.body?.evaluation;
  if (readback?.status !== 200 || evaluation?.id !== evaluationId) {
    throw new Error("EVALUATION_READBACK_NOT_CONFIRMED");
  }
  if (
    evaluation?.targetArtifact?.packId !== packId ||
    evaluation?.targetArtifact?.packDigest !== packDigest
  ) {
    throw new Error("EVALUATION_READBACK_BINDING_MISMATCH");
  }

  return {
    evaluationId,
    status: evaluation.status,
    requestId: readback.requestId,
    passed: evaluation.status === "PASSED",
  };
}
