# Teach AI

Teach AI turns admitted runtime evidence into **reviewable behavior proposals**.

Its purpose is to reduce repeated manual prompt/policy maintenance without allowing a model to silently rewrite production behavior.

## Full lifecycle

```text
observations / feedback / outcomes / approved context
→ evidence admission
→ related Signal + context resolution
→ proposal synthesis
→ review
→ Behavior Evaluation
→ promotion
→ explicit release
→ runtime result
→ outcome attribution
→ re-evaluation / new Teach cycle
```

## Evidence first

Teach starts from evidence, not a blank “improve yourself” request. Evidence may come from model observations, user corrections, business outcomes, admitted conversations, or approved integration sources.

Every proposal should remain traceable to the admitted evidence and scope used to produce it.

## Run a Teach analysis

The JavaScript and Python SDKs expose a persisted Teach analysis operation. Configure `VIRA_API_URL` with the API deployment root supplied by the Vira account/operator; do not use the Studio URL or append `/v1`. Keep `VIRA_API_KEY` in a server-side secret store. If the API URL is missing, ask for it rather than guessing.

JavaScript:

```ts
const queued = await vira.createTeachAnalysis(
  [evidenceId],
  {
    analysisId: "teach-analysis-demo-001",
    controlPointId: behaviorPointId,
    summary: "Review the selected evidence for this behavior point.",
    idempotencyKey: "teach-analysis-demo-001",
  },
);

if (queued?.status !== 202) throw new Error("TEACH_ANALYSIS_NOT_QUEUED");
const analysisId = String(queued.body.analysisId ?? "");
if (!analysisId) throw new Error("TEACH_ANALYSIS_ID_MISSING");

const current = await vira.getTeachAnalysis(analysisId);
if (current?.status !== 200 || current.body.analysisId !== analysisId) {
  throw new Error("TEACH_ANALYSIS_READBACK_NOT_CONFIRMED");
}
console.log({ analysisId, status: current.body.status, teachRunId: current.body.teachRunId });
```

Python:

```python
queued = client.create_teach_analysis(
    [evidence_id],
    analysis_id="teach-analysis-demo-001",
    control_point_id=behavior_point_id,
    summary="Review the selected evidence for this behavior point.",
    idempotency_key="teach-analysis-demo-001",
)
if queued is None or queued.status != 202:
    raise RuntimeError("TEACH_ANALYSIS_NOT_QUEUED")
analysis_id = str(queued.body.get("analysisId", ""))
current = client.get_teach_analysis(analysis_id)
if current is None or current.status != 200 or current.body.get("analysisId") != analysis_id:
    raise RuntimeError("TEACH_ANALYSIS_READBACK_NOT_CONFIRMED")
print({"analysisId": analysis_id, "status": current.body.get("status"), "teachRunId": current.body.get("teachRunId")})
```

Creation is asynchronous. If the readback state is queued or running, check the same `analysisId` later. Do not report synthesis as complete merely because the create call returned. The [runnable skill resource](../skills/vira-observe-teach/examples/README.md) includes a gated SDK runner.

## Signal intelligence

Teach may discover that useful evidence is not yet represented by a governed Signal. Missing Signals should enter the Signal discovery/review/mapping lifecycle instead of being silently promoted to production facts.

## Proposal synthesis is not authority

AI-assisted synthesis may propose a Behavior Point change, Program change, Strategy change, example/anti-pattern, Signal use, or evaluation case.

```text
AI proposal
≠ released behavior
```

The public proposal lifecycle is:

```text
evidence
→ proposal
→ review
→ evaluate
→ promote
→ explicit release
```

Promotion moves an eligible proposal forward. It does **not** silently create production authority or bypass release requirements.

## JavaScript

Submit evidence:

```ts
await vira.submitTeachEvidence({
  id: "evidence-marketing-001",
  source: "runtime",
  content: "The user corrected the launch plan because retention and measurement were missing.",
  privacy: "CONSENTED_TENANT",
  consent: true,
});
```

Create a proposal and prepare a persisted evaluation. Evidence submission and proposal creation do not approve or promote behavior:

```ts
const created = await vira.createTeachProposal({
  // Use the ID returned for evidence that was actually admitted in this scope.
  evidenceId,
  controlPointId: "<behavior-point-id>",
  summary: "Launch plans should preserve full-funnel coverage and measurement.",
});
const proposalId = String(created?.body?.proposal?.id ?? "");
if (!proposalId) throw new Error("TEACH_PROPOSAL_NOT_CREATED");

// Create and read an evaluation bound to this proposal. This does not approve it.
const started = await vira.startEvaluation({
  id: `teach-proposal-evaluation-${proposalId}`,
  targetArtifact: {
    proposalId,
    criteria: ["Address the evidence-backed change without expanding scope."],
  },
  dataset: [{
    id: "<case-id>",
    input: "<representative input from your application>",
    criteria: ["<observable requirement from the reviewed Behavior Point>"],
  }],
  threshold: 0.8,
}, { idempotencyKey: `teach-proposal-evaluation:${proposalId}` });
const evaluationId = String(started?.body?.evaluation?.id ?? "");
if (started?.status !== 201 || !evaluationId) throw new Error("TEACH_EVALUATION_NOT_PERSISTED");
const evaluation = await vira.getEvaluation(evaluationId);
if (evaluation?.body?.evaluation?.targetArtifact?.proposalId !== proposalId) {
  throw new Error("TEACH_EVALUATION_PROPOSAL_BINDING_MISMATCH");
}
```

Only after an authorized human reviewer has inspected the proposal and evaluation, perform the separately requested transition. Do not execute this block automatically as part of proposal creation or evaluation:

```ts
// Run only with explicit authorization from the designated reviewer.
await vira.transitionTeachProposal(proposalId, "review", { decision: "APPROVE" });
```

After the server records the proposal as reviewed, pass its persisted evaluation ID in the separate evaluate transition:

```ts
await vira.transitionTeachProposal(proposalId, "evaluate", {
  evaluationId,
});
```

Only after a separate explicit promotion decision, run:

```ts
await vira.transitionTeachProposal(proposalId, "promote", {});
```

## Python

```python
client.submit_teach_evidence({
    "id": "evidence-marketing-001",
    "source": "runtime",
    "content": "The user corrected the launch plan because retention and measurement were missing.",
    "privacy": "CONSENTED_TENANT",
    "consent": True,
})

proposal = client.create_teach_proposal({
    "evidenceId": "evidence-marketing-001",
    "controlPointId": behavior_point_id,
    "summary": "Launch plans should preserve full-funnel coverage and measurement.",
})

client.transition_teach_proposal(proposal_id, "review", {"decision": "APPROVE"})
client.transition_teach_proposal(proposal_id, "evaluate", {"evaluationId": evaluation_id})
client.transition_teach_proposal(proposal_id, "promote", {})
```

Allowed transition names are currently:

```text
review
evaluate
promote
```

The `evaluationId` must refer to a persisted evaluation bound to the proposal. Do not submit a client-authored score as evaluation evidence.

## HTTP

```text
POST /v1/teach/evidence
POST /v1/teach/proposals
POST /v1/teach/proposals/{proposalId}/review
POST /v1/teach/proposals/{proposalId}/evaluate
POST /v1/teach/proposals/{proposalId}/promote
POST /v1/releases
```

## MCP

The published `@tryvira/mcp@0.1.44` package exposes only these Teach tools:

```text
submit_teach_evidence
create_teach_proposal
```

These are effectful and remain scope/authorization gated. Review, evaluation,
promotion, and release are not exposed by this MCP package; use the SDK or HTTP API.

## Outcome-driven re-teaching

Later outcomes may justify a new proposal or re-evaluation. They should not mutate active behavior automatically.

```text
released behavior
→ runtime execution
→ outcome
→ new evidence
→ new Teach cycle
```
