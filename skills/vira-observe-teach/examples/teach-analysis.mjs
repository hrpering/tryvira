/** Start an analysis from already admitted evidence and read its server state. */
export async function createAndReadTeachAnalysis(vira, input) {
  const { analysisId, evidenceIds, controlPointId, summary } = input;
  if (!analysisId || !Array.isArray(evidenceIds) || evidenceIds.length === 0) {
    throw new Error("ANALYSIS_ID_AND_ADMITTED_EVIDENCE_IDS_REQUIRED");
  }

  const created = await vira.createTeachAnalysis(evidenceIds, {
    analysisId,
    ...(controlPointId ? { controlPointId } : {}),
    ...(summary ? { summary } : {}),
    idempotencyKey: `teach-analysis:${analysisId}`,
  });
  const createdBody = created?.body ?? {};
  const persistedAnalysisId = createdBody.analysisId;
  if (
    created?.status !== 202 ||
    typeof persistedAnalysisId !== "string" ||
    persistedAnalysisId !== analysisId
  ) {
    throw new Error("TEACH_ANALYSIS_NOT_QUEUED_OR_ID_MISMATCH");
  }

  const readback = await vira.getTeachAnalysis(persistedAnalysisId);
  const analysis = readback?.body;
  if (
    readback?.status !== 200 ||
    analysis?.analysisId !== persistedAnalysisId ||
    typeof analysis?.status !== "string"
  ) {
    throw new Error("TEACH_ANALYSIS_READBACK_NOT_CONFIRMED");
  }

  return {
    analysisId: persistedAnalysisId,
    status: analysis.status,
    teachRunId: typeof analysis.teachRunId === "string" ? analysis.teachRunId : null,
    errorCode: typeof analysis.errorCode === "string" ? analysis.errorCode : null,
    requestId: readback.requestId,
  };
}
