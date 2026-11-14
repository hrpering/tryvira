# The Vira story: own how your AI behaves

## Position

**Vira gives teams control over what their AI says, decides, and does, across models and applications.**

A model generates. An agent executes tasks. A Skill can teach a way of working. Vira is the **behavior lifecycle that decides what is eligible to run, executes through governed boundaries, and makes the result reviewable**. It complements these systems rather than claiming to replace them.

**Primary product line:** *Define it. Test it. Release it. Know what ran.*

**Customer-facing explanation:** Your AI will change: new models, agents, tools, providers, people and requirements. The behavior your organization relies on should not disappear into a new prompt or an undocumented deployment. Vira makes that behavior an identifiable, versioned, tested and releasable asset.

## The problem, shown rather than proclaimed

A support assistant promises an unapproved refund. A retail-media report ranks incomparable metrics. A developer fixes one prompt and the same issue returns in another agent. A new model silently changes a workflow.

A stronger model may already perform well. **The problem isn't simply that models give wrong answers.** It's that organizations need to control the requirements they depend on, evaluate changes, decide what is allowed into production and trace what happened.

## Why this is different from a bigger prompt

| Customer question | Vira's operational answer |
| --- | --- |
| What is this AI meant to do here? | Semantic Task + Behavior Point + explicit requirements |
| How does the system decide what work to run? | AUTO TaskRun and eligible mode dispatch |
| Where do those requirements actually apply? | Released Programs/Strategies at supported execution and enforcement boundaries |
| How do we know an improvement won't silently change production? | Candidate evaluation, review and explicit release |
| What happened in this run? | Scoped child receipts, state, execution/authority identity and available verification evidence |
| Can we change the model without rewriting our organization into its prompt? | Reuse behavior definitions and re-evaluate on the new integration |

**Portability does not mean identical behavior on every model.** Re-evaluate every new model, framework, tool boundary and provider before making equivalence claims.

## The system that makes the position meaningful

**Observe it:** collect approved evidence about AI requests, tool calls, decisions, failures and outcomes.

**Understand it:** distinguish raw events from typed, reviewed Signals and the exact Semantic Task.

**Shape it:** write a reusable Program/Strategy/Pack with tests; Teach can propose revisions, not self-release them.

**Run it:** allow the server to select eligible tasks and modes through AUTO TaskRun. Apply released behavior at a supported host boundary.

**Check it:** verify actual outputs with available post-model verifiers, bounded repair and a matched receipt. Then repeat the cycle with new evidence.

This is how Vira differs in focus from *only* prompt storage, *only* agent execution, or *only* monitoring. It does **not** mean all other tools lack those functions, or that Vira's complete verified-answer chain is publicly demonstrated. [Capability map](product-feature-map.md) · [Truthful status](product-status.md).

## Category positioning: complement rather than caricature

- **Agent and workflow frameworks** are strong at doing work with models and tools; Vira addresses governance of task behavior and runtime eligibility around that work.
- **Skills and instruction libraries** carry reusable guidance; Vira adds a managed decision, evaluation, release and runtime-evidence lifecycle where supported.
- **Prompt managers** organize and deploy text/configuration; Vira treats behavior as more than a prompt.
- **Evaluation and tracing systems** help observe and measure; Vira's distinguishing target is tying the behavior revision to **what was authorized to run**, not only to a score.
- **Memory and personalization** store useful context; Vira manages the governed behavior contract, not simply the remembered data.
- **Guardrails and policy engines** enforce boundaries; Vira integrates behavior selection, task-specific execution and revision governance without replacing host authorization.

These distinctions describe Vira's focus; other platforms may offer overlapping features. Direct comparisons depend on the specific product versions and evidence.

## What the brand should not say

- “Guaranteed accurate”, “works with every agent”, “universal tool interception”, “zero integration work”, “automatically learns and deploys”, or invented measured improvements.
- “Open source” for this publicly visible but proprietary documentation repository. Separate MIT-licensed SDK/MCP packages retain their own licenses.
- “AUTO runs any request” if semantic registry, released behavior, capabilities, provider or verifier evidence is missing.
- “Complete AI response” merely because a TaskRun job finished or a raw projection was returned.

## Visual and editorial principles

Use the text-only **vira** wordmark; midnight black, electric blue and cantaloupe orange rather than a generic violet AI gradient. Use real UI or technically accurate diagrams only. Write first for **people with problems**, then developers with a precise contract, then operators with evidence and limitations. Prefer real concise examples from cooking, support, marketing, software and operations.

## The product promise with a technical boundary

**"Your AI can change. Your rules shouldn't vanish."** This is a positioning line, not a correctness guarantee.

The product's canonical user flow begins at **AUTO TaskRun** and ends with actual verification and receipts when the complete integration is available. [Canonical TaskRun](canonical-taskrun.md) · [Pack academy](pack-authoring-guide.md) · [Brand-neutral comparison](approach-comparison.md) · [Use cases](use-cases.md)
