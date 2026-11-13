# Signals: governed facts that behavior can use

A **Signal** is a typed, versioned piece of evidence used in a specific scope. It can inform semantic selection, behavior guards, runtime conditions or Teach proposals **only through an approved producer mapping and the appropriate runtime authority**.

An observation is an event. A Signal is a **defined interpretation** of selected event/tool/application/runtime data. The same distinction matters in a support agent, an operations workflow or a marketing copilot: "the customer clicked" is not automatically "the order was successful".

## Example: from raw observation to a governed Signal

Suppose a retail-media agent observes a report that combines a 7-day click attribution window and a 30-day click-plus-view window.

| Stage | Example | Authority |
| --- | --- | --- |
| Observation | A `model.response` or `tool.result` event records the evidence from a connected host | Event accepted, **not** a behavior rule |
| Candidate Signal | `retail.attribution_mismatch`: typed boolean | A candidate name/meaning awaiting validation |
| Signal discovery | Model/logic suggests this Signal based on explicit evidence IDs | Proposal, no runtime authority |
| Definition | A versioned stable key, type, description, privacy/scope | Governed after authorized review |
| Producer mapping | A reviewed mapping from an allowed observation attribute or tool result | Active only after approved mapping |
| Runtime attestation | The value is bound to the correct defined Signal/version/scope and evidence | May be used by eligible behavior under supported runtime policy |
| Behavior | A released Program can choose to block an unsupported channel ranking | Only when the execution boundary applies and has the needed authority |

## The controlled Signal lifecycle

```text
Permitted observation, feedback, tool result or outcome
    ↓
Signal discovery proposal + source evidence IDs
    ↓
Review: APPROVE or REJECT
    ↓
Versioned Signal definition
    ↓
Producer mapping proposal → review → activate
    ↓
Capture typed evidence from a supported producer
    ↓
Attest source/value/scope/version for governed runtime use
    ↓
Eligible released Program or Strategy consumes the Signal
    ↓
Receipt, trace and subsequent permitted feedback / Teach cycle
```

Do not collapse **discovered**, **defined**, **mapped**, **attested**, and **enforced** into one green status.

## What to fill in

| Field / property | Meaning | Important constraint |
| --- | --- | --- |
| `signalStableKey` | Stable lowercase domain-qualified name | Stable across revisions; avoid arbitrary generated names |
| `signalVersion` | Version of the definition | Bind mapping to the correct version |
| `valueType` | Boolean, numeric, category or defined typed value | Must align with the actual source value |
| `description` | What the signal means and what it does not mean | Distinguish observation from inference |
| `producerType` | `observation_attribute`, `tool_result`, `application_state` or `runtime_state` | Only genuinely connected and authorized producers |
| `producerKey` | Specific known attribute/source key | Do not invent an attribute in a third-party report |
| `sourceEventType` | Relevant event type when the producer uses observations | Must match the actual admitted event |
| `evidenceEventIds` | Real admitted evidence IDs supporting discovery and mapping | Never fake these IDs in an active mapping |
| `status` / `reviewState` | Proposed/active/revoked and needs-review/approved/rejected | A proposal is not an active mapping |
| Scope + attestation | Organization, project, environment, current producer lineage | A caller's plain JSON cannot grant trust to a value |

The backend includes Signal definition/version, discovery proposal, mapping review and mapped observation capture contracts. **The public SDK/MCP/Studio may not expose every lifecycle step** at a given version. Discover the supported surface and only then use the documented operation; do not extrapolate an HTTP method from a backend module name.

## Signals inside Packs

An example Pack may contain `signals/items.json`:

```json
[
  { "key": "retail.attribution_mismatch" }
]
```

This **declares a reference**; it does not create a trusted producer, guarantee an active mapping, or supply the real value of the Signal. An author may define a Program that needs the Signal, but the installed Pack and host must prove that the Signal was correctly produced, versioned and attested.

The richer executable behavior can use a conditional guard or Strategy condition, but avoid teaching consumers that a plain unchecked object is a trusted Boolean. If a required hard-authority Signal is absent or invalid, the runtime should abstain or fail closed according to its policy, not silently treat it as false.

## Signal versus feedback, outcome and quality score

- **Feedback** is a user's or operator's correction about a response. It is evidence, not a released Signal definition.
- **Outcome** records a real application/business result correlated to actual execution. It is not a reward model's assumption or a client-provided PASS flag.
- **Quality score** is evaluation evidence for a candidate or response. It does not become an approved Signal unless the mapping, lineage and policy support it.
- **Signal** is a governed input with explicit meaning, source, version and lifecycle. It can be used in an authorized decision; it cannot approve a new behavior or bypass a release.
- **Trace/receipt** is proof of the specific selection/execution/verification decisions that occurred, not a self-declared Signal.

## Quality requirements for a real Signal

1. Do not create a Signal merely because its name sounds useful. Show a real decision or investigation that needs it.
2. Define type, scope, producer, provenance and intended freshness; identify missing-value behavior.
3. Include a positive case, missing data, stale/expired mapping, conflicting source and wrong-tenant negative.
4. Require explicit review and mapping activation before allowing it to affect a hard runtime decision.
5. Distinguish a Signal being **available** from it **actually influencing** an execution, which requires a trace.
6. After a new model, adapter or data source is connected, check the producer mapping again.
7. Report uncertainties and access limitations. Do not claim that every observation generates useful Signals automatically.

## Related workflows

**Observe** collects permitted event evidence. **Discover** proposes meanings. **Teach** proposes changes. **Evaluate** tests candidates. **Release** grants scoped runtime eligibility. **AUTO TaskRun** executes governed behavior. **Runtime verification** checks the actual result, when the required host/provider/verifier handoff exists.

[Observe](observe.md) · [Teach](teach.md) · [Pack authoring](pack-authoring-guide.md) · [Runtime verification](runtime-verification.md) · [Trace and receipt](traces.md)
