export async function runApprovedTeachToPackRevision({ client, input, authorize = async () => false, log = () => {} }) {
  if (!Array.isArray(input.dataset) || input.dataset.length === 0) {
    throw new Error('VIRA_CANDIDATE_DATASET_JSON must be a non-empty JSON array.');
  }
  const candidateResponse = await client.createBehaviorRevisionCandidate({
    id: input.candidateId,
    sourceTeachProposalId: input.proposalId,
    parentRevisionId: input.parentRevisionId,
    parentRevisionDigest: input.parentRevisionDigest,
    changeSet: { program: input.program },
  }, { idempotencyKey: `example:create-candidate:${input.candidateId}` });
  const candidate = candidateResponse?.body?.candidate;
  if (!candidate?.id || candidate.status !== 'CANDIDATE') {
    throw new Error('Candidate creation did not return a persisted CANDIDATE.');
  }
  log(`Candidate created: ${candidate.id} (${candidate.digest})`);

  const evaluationResponse = await client.evaluateBehaviorRevisionCandidate(candidate.id, { dataset: input.dataset }, {
    idempotencyKey: `example:evaluate-candidate:${candidate.id}`,
  });
  const evaluatedCandidate = evaluationResponse?.body?.candidate;
  const evaluation = evaluationResponse?.body?.evaluation;
  const targetArtifact = evaluation?.targetArtifact;
  const evaluationMatchesCandidate = targetArtifact?.candidateId === candidate.id
    && targetArtifact?.candidateDigest === candidate.digest;
  if (!evaluatedCandidate?.evaluationId
    || evaluatedCandidate.evaluationId !== evaluation?.id
    || evaluation?.status !== 'PASSED'
    || !evaluationMatchesCandidate
    || evaluationResponse.body.decision !== 'PASS') {
    log('Candidate did not pass. Stop; revise it and run a new evaluation.');
    return { status: 'EVALUATION_FAILED', candidate: evaluatedCandidate, evaluation };
  }
  log(`Persisted evaluation passed: ${evaluation.id}`);
  if (!await authorize('accept-candidate', { candidate: evaluatedCandidate, evaluation })) {
    log('Stopped before candidate acceptance. No acceptance transition was sent.');
    return { status: 'CANDIDATE_ACCEPTANCE_PENDING', candidate: evaluatedCandidate, evaluation };
  }

  const acceptedResponse = await client.transitionBehaviorRevisionCandidate(candidate.id, 'accept', {
    candidateEvaluationId: evaluation.id,
  });
  if (acceptedResponse?.body?.candidate?.status !== 'ACCEPTED') {
    throw new Error('The server did not persist candidate acceptance.');
  }

  const revisionResponse = await client.createPackRevision({
    id: input.packRevisionId,
    packKey: input.packKey,
    version: input.packVersion,
    behaviorRevisionCandidateId: candidate.id,
  }, { idempotencyKey: `example:create-pack-revision:${input.packRevisionId}` });
  const revision = revisionResponse?.body?.revision;
  if (!revision?.id || revision.status !== 'DRAFT') {
    throw new Error('Pack Revision creation did not return a persisted DRAFT.');
  }
  const diff = await client.getPackRevisionDiff(revision.id);
  const summary = diff?.body?.summary;
  if (!summary || !Array.isArray(diff.body.changes) || summary.changed !== diff.body.changes.length) {
    throw new Error('Pack Revision diff was missing or inconsistent.');
  }
  if (summary.policiesWeakened === true || Number(summary.authorityChanges ?? 0) > 0) {
    log('Pack Revision diff contains a policy weakening or authority change. Stop for correction.');
    return { status: 'PACK_DIFF_REJECTED', candidate, evaluation, revision, diff };
  }
  log(`Review Pack Revision ${revision.id}: ${JSON.stringify(summary)}`);

  const validated = await client.transitionPackRevision(revision.id, 'validate');
  if (validated?.body?.revision?.status !== 'VALIDATED') {
    throw new Error('Pack Revision validation did not complete.');
  }
  const approvalPending = await client.transitionPackRevision(revision.id, 'request-approval');
  if (approvalPending?.body?.revision?.status !== 'APPROVAL_PENDING') {
    throw new Error('Pack Revision approval request did not persist.');
  }
  if (!await authorize('approve-pack-revision', { candidate, evaluation, revision, diff })) {
    log('Stopped at APPROVAL_PENDING. No Pack Revision approval transition was sent.');
    return { status: 'PACK_APPROVAL_PENDING', candidate, evaluation, revision, diff };
  }

  const packApproved = await client.transitionPackRevision(revision.id, 'approve');
  if (packApproved?.body?.revision?.status !== 'APPROVED') {
    throw new Error('Pack Revision approval did not persist.');
  }
  const materialized = await client.materializePackRevision(revision.id, { packId: input.packId, variables: {} });
  if (!materialized?.body?.revision?.materializedPackId) {
    throw new Error('Pack Revision materialization was not confirmed by readback.');
  }
  log(`Materialized Pack: ${materialized.body.revision.materializedPackId}`);
  if (!await authorize('release-pack-revision', { candidate, evaluation, revision: materialized.body.revision, diff })) {
    log('Stopped after materialization. No release transition was sent.');
    return { status: 'RELEASE_PENDING', candidate, evaluation, revision: materialized.body.revision, diff };
  }

  const released = await client.transitionPackRevision(revision.id, 'release');
  if (released?.body?.revision?.status !== 'RELEASED') {
    throw new Error('Pack Revision release did not persist.');
  }
  log(`Released Pack Revision: ${revision.id}`);
  return { status: 'RELEASED', candidate, evaluation, revision: released.body.revision, diff };
}
