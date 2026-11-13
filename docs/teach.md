# Teach AI

Teach AI carries permitted evidence about AI behavior through analysis, review, and a possible governed improvement. It closes the loop after runtime use by relating later outcomes to the next improvement cycle. Teach suggests changes; it does not silently rewrite or release active behavior.

## End-to-end Teach loop

```text
1. Permit and minimize evidence
→ 2. Admit evidence into the customer's scope
→ 3. Analyze selected evidence
→ 4. Resolve related behavior context and Signals
→ 5. Synthesize a reviewable recommendation or proposal
→ 6. Human review: accept, reject, or request a correction
→ 7. Evaluate a candidate against relevant examples and requirements
→ 8. Separately authorize promotion and release, when appropriate
→ 9. Apply the released behavior through the runtime boundary
→ 10. Inspect runtime results and permitted outcomes
→ 11. Start a new evidence-backed cycle when learning is warranted
```

### 1. Permit and minimize evidence

Decide which customer or application data may be used, confirm the relevant consent and retention rules, and remove content that is not needed. Observations, corrections, conversation references, and business outcomes are different kinds of evidence. Do not turn a model response or a generic event into a claimed business result.

### 2. Admit evidence into scope

Submit or select only evidence the customer is authorized to process. Preserve the source and scope so a reviewer can understand what a later suggestion was based on. Use synthetic evidence for public examples and isolated development scopes where available.

### 3. Analyze selected evidence

Run analysis only against explicitly selected, admitted evidence. If the operation is asynchronous, retain its server-issued identity and check persisted state until it finishes. A queued request means work was accepted; it does not mean analysis completed.

### 4. Resolve context and Signals

Relate the evidence to the behavior area it concerns. A missing or uncertain Signal belongs in the appropriate discovery and review process; do not silently convert a pattern into an approved fact. If a behavior target cannot be verified from the chosen interface, pause that part and ask an authorized operator to identify it.

### 5. Create a suggestion

Synthesis may result in a recommendation or a proposal for a change. Keep its relationship to the source evidence and intended behavior clear. A recommendation decision and a proposal review are separate product actions; do not treat one as the other.

### 6. Review the exact suggestion

An authorized reviewer inspects the evidence, scope, expected effect, and possible regressions. The reviewer can accept, reject, or request a correction through a supported customer-facing interface. An AI-generated suggestion does not act as its own approval.

### 7. Evaluate a candidate

Evaluate the candidate against relevant representative examples, requirements, and regressions. Use the documented evaluation surface for the installed client version. Preserve the returned evaluation evidence and bind it to the candidate being reviewed. Do not fabricate a score or treat a text-only review as a persisted evaluation.

### 8. Promotion and release

Where the workflow includes proposal promotion, make that decision separately from approval and release. Before production use, the designated authority must explicitly approve and release the intended candidate through a supported interface. Teach completion, recommendation acceptance, proposal promotion, Pack installation, and Strategy activation do not by themselves grant release authority.

### 9. Runtime application

Use the governed runtime boundary to apply an eligible released identity. Verify the resulting identity and runtime receipt or trace with the customer-facing tools available to the account. A released candidate that was never selected at runtime has not demonstrated runtime behavior.

### 10–11. Observe outcomes and continue learning

Collect only permitted runtime evidence and outcomes. Compare the observed result with the intended behavior, retain limitations and uncertainty, and start another cycle only when the evidence supports a useful change. Never claim business-outcome attribution from an undocumented event shape.

## Follow the loop with the Skills

Use the Skills as a customer task progresses; each one owns a distinct part of the journey:

| Journey stage | Lead Skill | What to confirm before moving on |
| --- | --- | --- |
| Choose permitted evidence and connect the customer application | [`vira-integrate-app`](../skills/vira-integrate-app/SKILL.md), [`vira-observe-teach`](../skills/vira-observe-teach/SKILL.md) | The evidence is allowed for this scope, minimized, and its source is understood. |
| Admit evidence and run or inspect Teach analysis | [`vira-observe-teach`](../skills/vira-observe-teach/SKILL.md) | The selected analysis is persisted and its result is available; request acceptance alone is not completion. |
| Identify behavior context and Signals | [`vira-signals`](../skills/vira-signals/SKILL.md), [`vira-author-behavior`](../skills/vira-author-behavior/SKILL.md) | Any target or Signal used for a proposed change is verified and appropriately reviewed. |
| Create and review a recommendation or proposal | [`vira-observe-teach`](../skills/vira-observe-teach/SKILL.md) | A human reviews the exact item; recommendation decisions and proposal review remain separate. |
| Evaluate the proposed candidate | [`vira-evaluate`](../skills/vira-evaluate/SKILL.md), [`vira-evaluate-release`](../skills/vira-evaluate-release/SKILL.md) | The evaluation is persisted for the candidate under review and includes relevant regression cases. |
| Decide promotion, approval, and release | [`vira-release`](../skills/vira-release/SKILL.md), [`vira-packs`](../skills/vira-packs/SKILL.md) | An authorized person makes each supported transition separately. |
| Apply the released behavior and inspect its use | [`vira-runtime`](../skills/vira-runtime/SKILL.md), [`vira-debug`](../skills/vira-debug/SKILL.md) | Customer-facing runtime evidence confirms what was selected and what happened. |
| Feed permitted results into the next cycle | [`vira-observe-teach`](../skills/vira-observe-teach/SKILL.md), [`vira-full-lifecycle`](../skills/vira-full-lifecycle/SKILL.md) | Outcomes are supported by a documented contract; uncertainty and attribution limits are retained. |

The runnable [Teach analysis example](../skills/vira-observe-teach/examples/README.md) covers analysis creation/readback. The [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) demonstrates a broader customer journey with synthetic evidence and separate review gates. These examples do not claim a live run or cover every surface. If the chosen client does not publish a required operation or response shape, stop at that point and obtain the supported customer-facing contract; do not fill the gap with guessed fields or endpoints.

## Select a supported interface

Evaluation, promotion, release, and runtime use remain distinct decisions. The JavaScript SDK, Python SDK, MCP server, HTTP API, and Studio may support different parts of the journey. Before using any step, check the installed package's public guide or the current customer-facing reference for that operation. Inspect MCP's published catalog and live `tools/list`; do not infer HTTP or MCP support from an SDK method name. If a required operation or data shape is undocumented, stop that step and request its public contract rather than guessing.

## Authority boundaries

- Evidence admission is not behavior approval.
- Analysis is not a recommendation decision.
- Accepting a recommendation is not reviewing a proposal.
- Proposal promotion is not release.
- A Pack installation is not runtime activation.
- A passing evaluation is not permission to release.
- Runtime use must be confirmed from the returned identity and customer-facing evidence.

Use [Evaluation and approval](evaluation-and-approval.md), [Release](release.md), and [Runtime](runtime.md) for their separate product-level guidance. For interface setup, start with the [Quickstart](quickstart.md) and choose the current [JavaScript](reference/javascript-sdk.md), [Python](reference/python-sdk.md), or [MCP](reference/mcp-tools.md) reference.

## Privacy and safety

- Submit only permitted evidence and the minimum content needed for the task.
- Keep credentials and customer records out of examples, prompts, logs, and public issues.
- Do not present an analysis or suggestion as a verified business outcome.
- Do not claim that a proposal changed runtime behavior without a separate authorized release and runtime confirmation.
