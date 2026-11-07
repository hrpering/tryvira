import { ViraClient } from '@tryvira/sdk';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { runApprovedTeachToPackRevision } from './revision-workflow.mjs';

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const scope = {
  organizationId: required('VIRA_ORGANIZATION_ID'),
  projectId: required('VIRA_PROJECT_ID'),
  environmentId: required('VIRA_ENVIRONMENT_ID'),
};

const client = new ViraClient({
  baseUrl: required('VIRA_BASE_URL'),
  apiKey: required('VIRA_API_KEY'),
  allowInsecureLocalhost: true,
  failureMode: 'throw',
});

const candidateId = required('VIRA_CANDIDATE_ID');
const proposalId = required('VIRA_APPROVED_TEACH_PROPOSAL_ID');
const parentRevisionId = required('VIRA_PARENT_REVISION_ID');
const parentRevisionDigest = required('VIRA_PARENT_REVISION_DIGEST');
const packRevisionId = required('VIRA_PACK_REVISION_ID');
const packKey = required('VIRA_PACK_KEY');
const packVersion = required('VIRA_PACK_VERSION');
const packId = required('VIRA_MATERIALIZED_PACK_ID');
const dataset = JSON.parse(required('VIRA_CANDIDATE_DATASET_JSON'));

const program = {
  ...scope,
  id: required('VIRA_PROGRAM_ID'),
  semanticKey: required('VIRA_PROGRAM_SEMANTIC_KEY'),
  version: Number(process.env.VIRA_PROGRAM_VERSION ?? '1'),
  guard: 'always',
  judgment: 'review',
  transform: 'preserve',
  verification: 'required',
  escalation: 'human-review',
  rubric: ['Follow the approved policy and state uncertainty clearly.'],
  examples: ['A concise, policy-compliant answer.'],
  antiPatterns: ['Unsupported claims or actions outside the approved scope.'],
  modules: [
    {
      kind: 'verification',
      stableKey: required('VIRA_PROGRAM_VERIFIER_KEY'),
      stage: 'post_model',
      requirement: 'The response follows the approved policy.',
    },
  ],
};

if (!Array.isArray(dataset) || dataset.length === 0) {
  throw new Error('VIRA_CANDIDATE_DATASET_JSON must be a non-empty JSON array.');
}

const result = await runApprovedTeachToPackRevision({
  client,
  input: {
    candidateId,
    proposalId,
    parentRevisionId,
    parentRevisionDigest,
    packRevisionId,
    packKey,
    packVersion,
    packId,
    dataset,
    program,
  },
  authorize: async (stage, evidence) => {
    console.log(`\nReview required: ${stage}`);
    console.log(JSON.stringify(evidence, null, 2));
    if (!stdin.isTTY || !stdout.isTTY) {
      console.log('No interactive terminal is attached; stopping without the requested transition.');
      return false;
    }
    const prompt = createInterface({ input: stdin, output: stdout });
    try {
      const answer = await prompt.question(`Type ${stage} to authorize this transition: `);
      return answer.trim() === stage;
    } finally {
      prompt.close();
    }
  },
  log: console.log,
});
if (result.status === 'EVALUATION_FAILED') process.exitCode = 2;
