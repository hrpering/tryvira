import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ViraClient } from '@tryvira/sdk';
import { runApprovedTeachToPackRevision } from './revision-workflow.mjs';

const fixtureInput = {
  candidateId: 'candidate-1', proposalId: 'proposal-approved-1',
  parentRevisionId: 'parent-revision-1', parentRevisionDigest: 'parent-digest',
  packRevisionId: 'pack-revision-1', packKey: 'support-behavior', packVersion: '2.0.0', packId: 'pack-1',
  dataset: [{ id: 'case-1', input: 'How do I update my account?' }],
  program: {
    organizationId: 'org-fixture', projectId: 'project-fixture', environmentId: 'environment-fixture',
    id: 'program-support-v2', semanticKey: 'support.account_update', version: 2,
    guard: 'always', judgment: 'review', transform: 'preserve', verification: 'required', escalation: 'human-review',
    rubric: ['Follow the approved policy and state uncertainty clearly.'],
    examples: ['A concise, policy-compliant answer.'],
    antiPatterns: ['Unsupported claims or actions outside the approved scope.'],
    modules: [{ kind: 'verification', stableKey: 'support.account_update.policy-check', stage: 'post_model', requirement: 'The response follows the approved policy.' }],
  },
};

function fixtureClient() {
  const calls = [];
  const replies = new Map([
    ['/v1/behavior-revision-candidates', { candidate: { id: 'candidate-1', status: 'CANDIDATE', digest: 'candidate-digest' } }],
    ['/v1/behavior-revision-candidates/candidate-1/evaluate', { candidate: { id: 'candidate-1', status: 'EVALUATED', digest: 'candidate-digest', evaluationId: 'evaluation-1' }, evaluation: { id: 'evaluation-1', status: 'PASSED', targetArtifact: { candidateId: 'candidate-1', candidateDigest: 'candidate-digest' } }, decision: 'PASS' }],
    ['/v1/behavior-revision-candidates/candidate-1/accept', { candidate: { id: 'candidate-1', status: 'ACCEPTED' } }],
    ['/v1/pack-revisions', { revision: { id: 'pack-revision-1', status: 'DRAFT' } }],
    ['/v1/pack-revisions/pack-revision-1/diff', { summary: { changed: 1, policiesWeakened: false, authorityChanges: 0 }, changes: [{ targetKey: 'support.account_update' }] }],
    ['/v1/pack-revisions/pack-revision-1/validate', { revision: { id: 'pack-revision-1', status: 'VALIDATED' } }],
    ['/v1/pack-revisions/pack-revision-1/request-approval', { revision: { id: 'pack-revision-1', status: 'APPROVAL_PENDING' } }],
    ['/v1/pack-revisions/pack-revision-1/approve', { revision: { id: 'pack-revision-1', status: 'APPROVED' } }],
    ['/v1/pack-revisions/pack-revision-1/materialize', { revision: { id: 'pack-revision-1', status: 'APPROVED', materializedPackId: 'pack-1' } }],
    ['/v1/pack-revisions/pack-revision-1/release', { revision: { id: 'pack-revision-1', status: 'RELEASED' } }],
  ]);
  const client = new ViraClient({
    baseUrl: 'http://127.0.0.1:3000', apiKey: 'fixture-key', allowInsecureLocalhost: true,
    retries: 0,
    fetcher: async (url, init) => {
      const path = new URL(url).pathname;
      calls.push({ method: init.method, path, body: init.body ? JSON.parse(init.body) : {} });
      const body = replies.get(path);
      return new Response(JSON.stringify(body), { status: body ? 200 : 404, headers: { 'content-type': 'application/json' } });
    },
  });
  return { client, calls };
}

test('approved Teach to Pack Revision example follows installed SDK wire contract and authority gates', async () => {
  const { client, calls } = fixtureClient();
  const logs = [];
  const result = await runApprovedTeachToPackRevision({
    client,
    input: fixtureInput,
    authorize: async (stage) => ['accept-candidate', 'approve-pack-revision', 'release-pack-revision'].includes(stage),
    log: (line) => logs.push(line),
  });
  assert.equal(result.status, 'RELEASED');
  assert.match(logs.at(-1), /Released Pack Revision/);
  assert.deepEqual(calls.map(({ path }) => path), [
    '/v1/behavior-revision-candidates',
    '/v1/behavior-revision-candidates/candidate-1/evaluate',
    '/v1/behavior-revision-candidates/candidate-1/accept',
    '/v1/pack-revisions',
    '/v1/pack-revisions/pack-revision-1/diff',
    '/v1/pack-revisions/pack-revision-1/validate',
    '/v1/pack-revisions/pack-revision-1/request-approval',
    '/v1/pack-revisions/pack-revision-1/approve',
    '/v1/pack-revisions/pack-revision-1/materialize',
    '/v1/pack-revisions/pack-revision-1/release',
  ]);
  assert.deepEqual(calls[0].body.changeSet.program, fixtureInput.program);
  assert.deepEqual(calls[1].body.dataset, fixtureInput.dataset);
  assert.deepEqual(calls[2].body, { candidateEvaluationId: 'evaluation-1' });
  assert.deepEqual(calls[8].body, { packId: 'pack-1', variables: {} });
});

test('default workflow stops after evaluation and does not accept candidate', async () => {
  const { client, calls } = fixtureClient();
  const result = await runApprovedTeachToPackRevision({ client, input: fixtureInput });
  assert.equal(result.status, 'CANDIDATE_ACCEPTANCE_PENDING');
  assert.deepEqual(calls.map(({ path }) => path), [
    '/v1/behavior-revision-candidates',
    '/v1/behavior-revision-candidates/candidate-1/evaluate',
  ]);
});

test('failed candidate evaluation stops before human acceptance', async () => {
  const { client, calls } = fixtureClient();
  const original = client.evaluateBehaviorRevisionCandidate.bind(client);
  client.evaluateBehaviorRevisionCandidate = async (...args) => {
    const result = await original(...args);
    result.body.decision = 'FAIL';
    return result;
  };
  const result = await runApprovedTeachToPackRevision({ client, input: fixtureInput, authorize: async () => true });
  assert.equal(result.status, 'EVALUATION_FAILED');
  assert.equal(calls.some(({ path }) => path.endsWith('/accept')), false);
});

test('candidate evaluation must be persisted against the exact candidate digest', async () => {
  const { client, calls } = fixtureClient();
  const original = client.evaluateBehaviorRevisionCandidate.bind(client);
  client.evaluateBehaviorRevisionCandidate = async (...args) => {
    const result = await original(...args);
    result.body.evaluation.targetArtifact.candidateDigest = 'different-candidate-digest';
    return result;
  };
  const result = await runApprovedTeachToPackRevision({ client, input: fixtureInput, authorize: async () => true });
  assert.equal(result.status, 'EVALUATION_FAILED');
  assert.equal(calls.some(({ path }) => path.endsWith('/accept')), false);
});

test('Pack Revision with authority changes stops before validation and approval', async () => {
  const { client, calls } = fixtureClient();
  const original = client.getPackRevisionDiff.bind(client);
  client.getPackRevisionDiff = async (...args) => {
    const result = await original(...args);
    result.body.summary.authorityChanges = 1;
    return result;
  };
  const result = await runApprovedTeachToPackRevision({
    client, input: fixtureInput,
    authorize: async () => true,
  });
  assert.equal(result.status, 'PACK_DIFF_REJECTED');
  assert.equal(calls.some(({ path }) => path.endsWith('/validate')), false);
  assert.equal(calls.some(({ path }) => path.endsWith('/approve')), false);
});
