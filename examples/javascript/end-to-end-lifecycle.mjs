import { ViraClient, ViraApiError } from '@tryvira/sdk';

// Public example only. Supply credentials through the environment.
// Never paste a real key, tenant identifier, private URL, or production trace into this file.
const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
};

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL ?? required('VIRA_API_URL'),
  apiKey: required('VIRA_API_KEY'),
  timeoutMs: 15_000,
  retries: 2,
  failureMode: 'throw',
});

const scope = {
  organizationId: required('VIRA_ORGANIZATION_ID'),
  projectId: required('VIRA_PROJECT_ID'),
  environmentId: required('VIRA_ENVIRONMENT_ID'),
};

const suffix = Date.now();

async function main() {
  // 1. Connect once.
  const connected = await vira.connectOnce({
    ...scope,
    name: `public-example-agent-${suffix}`,
    systemType: 'custom-agent',
    adapterType: 'custom-node',
    adapterVersion: '1',
    idempotencyKey: `example:connect:${suffix}`,
  });

  const systemId = String(connected?.body.system?.id ?? '');
  const connectionId = String(connected?.body.connection?.id ?? '');
  if (!systemId || !connectionId) throw new Error('Connection IDs missing');

  // 2. Discover what this credential/scope can actually use.
  const capabilities = await vira.listCapabilities({ surface: 'sdk' });
  console.log('capabilities', capabilities?.body);

  // 3. Record evidence. Evidence does not activate behavior.
  await vira.observe({
    ...scope,
    eventId: `example:event:${suffix}`,
    eventType: 'model.response',
    aiSystemId: systemId,
    connectionId,
    payload: { message: 'Public lifecycle example observation.' },
  }, { idempotencyKey: `example:event:${suffix}` });

  // 4. Author a Semantic Task.
  const taskKey = `example.marketing.launch_plan.${suffix}`;
  const task = await vira.createSemanticTask({
    taskKey,
    description: 'Create a measurable launch plan.',
    examples: ['Build a launch plan for a membership product.'],
    negativeExamples: ['Write one ad headline.'],
  });

  const taskId = String(task?.body.task?.id ?? task?.body.id ?? '');
  if (!taskId) throw new Error('Task ID missing');

  // 5. Author the stable governed Behavior Point.
  const pointKey = `example.marketing.launch_plan.${suffix}`;
  const point = await vira.createBehaviorPoint({
    key: pointKey,
    taskId,
    constraints: [
      'cover the required funnel stages',
      'include a measurement approach',
      'state material assumptions',
    ],
  });
  console.log('behavior point', point?.body);

  // 6. Semantic resolution is evidence/candidate selection, not authorization.
  const semantic = await vira.resolveSemantic({
    input: 'Build a full launch plan for our subscription product.',
    profile: { domain: 'marketing' },
  });
  console.log('semantic resolution', semantic?.body);

  // 7. Programs/Strategies are authored through their canonical SDK methods.
  // See docs/behavior-programs.md and docs/strategies.md for reviewed definition examples.
  // Typical Strategy lifecycle:
  //   createBehaviorStrategy(definition)
  //   validateBehaviorStrategy(strategyId)
  //   simulateBehaviorStrategy(strategyId, {})
  //   activateBehaviorStrategy(strategyId)
  // Activation does not bypass evaluation/release/runtime authority.

  // 8. Runtime is enforcing. Use a fresh idempotency key for effectful resolution/execution.
  // This can legitimately deny/abstain until an eligible released behavior identity exists.
  try {
    const runtime = await vira.resolveRuntime({
      behaviorPoint: pointKey,
      executionBoundary: scope,
      idempotencyKey: `example:runtime:${suffix}`,
    });
    console.log('runtime resolution', runtime?.body);
  } catch (error) {
    if (error instanceof ViraApiError) {
      console.log('runtime not yet eligible', {
        status: error.status,
        requestId: error.requestId,
        body: error.body,
      });
    } else {
      throw error;
    }
  }

  // For a real Pack flow, use the complete gated tutorial. This walkthrough
  // intentionally does not submit an empty or incomplete Pack.
  console.log('For Pack import, materialization, evaluation, and separate approval/release, see tutorials/marketing-agent/.');
}

main().catch((error) => {
  if (error instanceof ViraApiError) {
    console.error('Vira API error', {
      status: error.status,
      requestId: error.requestId,
      body: error.body,
    });
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
