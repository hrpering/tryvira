# The Vira story: own how your AI behaves

## Your AI can change. Keep the behavior you depend on.

**Vira gives teams control over what their AI says, decides, and does, across models and applications.**

A model generates. An agent executes tasks. A Skill can teach a way of working. Vira is the **behavior lifecycle that decides what is eligible to run, executes through governed boundaries, and makes the result reviewable**. It complements these systems rather than claiming to replace them.

*Define it. Test it. Release it. Know what ran.*

Your AI will change: new models, agents, tools, providers, people and requirements. The behavior your organization relies on should not disappear into a new prompt or undocumented deployment. Vira makes it an identifiable, versioned, testable and releasable asset.

## Why this matters

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

## Where Vira fits

- **Agent and workflow frameworks** are strong at doing work with models and tools; Vira addresses governance of task behavior and runtime eligibility around that work.
- **Skills and instruction libraries** carry reusable guidance; Vira adds a managed decision, evaluation, release and runtime-evidence lifecycle where supported.
- **Prompt managers** organize and deploy text/configuration; Vira treats behavior as more than a prompt.
- **Evaluation and tracing systems** help observe and measure; Vira's distinguishing target is tying the behavior revision to **what was authorized to run**, not only to a score.
- **Memory and personalization** store useful context; Vira manages the governed behavior contract, not simply the remembered data.
- **Guardrails and policy engines** enforce boundaries; Vira integrates behavior selection, task-specific execution and revision governance without replacing host authorization.

These distinctions describe Vira's focus; other platforms may offer overlapping features. Direct comparisons depend on the specific product versions and evidence.

## Adopt Vira alongside your existing stack

Vira works with compatible applications, models and agent frameworks. Its behavior definitions can be reused, with a fresh evaluation whenever the model, tool access or integration changes.

The public developer resources cover JavaScript, Python, MCP, sample applications and 27 Agent Skills. Live Vira operations currently require provisioned service access. [Get started](start-here.md) · [Integration compatibility](capability-map.md) · [Product availability](product-status.md)

## From definition to execution

**Your AI can change. Your rules shouldn't vanish.**

The integration path begins with an eligible AUTO TaskRun. Actual model-output verification also requires a connected provider and matching verification evidence, which is still being integrated in the public chatbot example.

[How execution works](canonical-taskrun.md) · [Pack academy](pack-authoring-guide.md) · [Compare approaches](approach-comparison.md) · [Use cases](use-cases.md)
