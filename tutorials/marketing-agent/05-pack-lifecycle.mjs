import { vira } from "./_client.mjs";

const objects = {
  semanticTasks: [
    {
      taskKey: "marketing.launch_plan",
      description: "Build a launch plan for a product or service",
      aliases: ["go to market plan", "launch strategy"],
      examples: [
        "Create a launch plan for a subscription product",
        "Build a go-to-market plan for a membership service"
      ],
      negativeExamples: [
        "Rewrite this headline"
      ]
    }
  ],
  behaviorPoints: [
    {
      key: "marketing.launch_plan",
      taskKey: "marketing.launch_plan",
      requirement: "Cover the full funnel and include measurement",
      verification: "Confirm each funnel stage has an objective and measurement approach"
    }
  ],
  behaviorPrograms: [
    {
      key: "marketing.launch_plan",
      rubric: [
        "Cover awareness, consideration, conversion, and retention",
        "Include a measurement approach for every stage"
      ],
      examples: [
        "A launch plan with objectives and metrics by funnel stage"
      ],
      antiPatterns: [
        "Acquisition-only plan",
        "Invented campaign results"
      ]
    }
  ],
  behaviorStrategies: [
    {
      key: "marketing.launch_plan",
      schemaVersion: 1,
      strategyKey: "marketing.launch_plan",
      behaviorPointKey: "marketing.launch_plan",
      executionMode: "STAGED",
      goal: {type:"produce",artifact:"launch-plan",successCriteria:["Cover awareness, consideration, conversion, and retention","Include a measurement approach for every stage"]},
      entryStepKey: "draft",
      steps: [
        {stableKey:"draft",type:"model",purpose:"Draft the launch plan",requires:["context:request"],produces:["state:draft"]},
        {stableKey:"verify",type:"verify",purpose:"Verify full-funnel coverage and measurement",requires:["state:draft"],produces:["state:verified"],verifierKeys:["marketing.full_funnel"]},
        {stableKey:"compose",type:"compose",purpose:"Return the verified plan",requires:["state:verified"],produces:["state:final"],verifierKeys:["marketing.full_funnel"]}
      ],
      edges: [
        {stableKey:"draft-to-verify",from:"draft",to:"verify"},
        {stableKey:"verify-to-compose",from:"verify",to:"compose"}
      ],
      stateSlots: [
        {key:"state:draft",schemaRef:"schema:launch-plan",privacy:"tenant",source:"model",maxBytes:100000},
        {key:"state:verified",schemaRef:"schema:launch-plan",privacy:"tenant",source:"derived",maxBytes:100000},
        {key:"state:final",schemaRef:"schema:launch-plan",privacy:"public",source:"derived",maxBytes:100000}
      ],
      contextPolicy: {allowedRefs:["context:request"],maxBytes:100000},
      evidencePolicy: {requiredRefs:[],allowMissing:true},
      toolPolicy: {allowedToolKeys:[],effectfulToolKeys:[]},
      generationPolicy: {structuredOnly:true},
      verificationPolicy: {requiredVerifierKeys:["marketing.full_funnel"],requireFinalComposeVerification:true},
      recoveryPolicy: {maxTotalRecoveries:1,defaultAction:"block"},
      budgets: {maxStepExecutions:8,maxModelCalls:1,maxToolCalls:0,maxDecisionCalls:0,maxRepairAttempts:1,maxSerializedStateBytes:500000}
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

const imported = await vira.importPack({
  manifest: {
    id: "vira.marketing.starter",
    name: "Marketing Starter",
    version: "1.0.0"
  },
  objects,
  idempotencyKey: "tutorial:pack:marketing-starter:1.0.0"
});

const packId = String(imported?.body.pack?.id ?? imported?.body.id ?? "");
if (!packId) throw new Error("Pack import did not return a pack id");
await vira.installPack(packId, {});
await vira.evaluatePack(packId, {passed:true,score:1,runId:"tutorial-marketing-eval-001"});
await vira.approvePack(packId);
await vira.releasePack(packId);
console.log(JSON.stringify({ packId, released: true }, null, 2));
