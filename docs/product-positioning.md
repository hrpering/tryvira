# Vira: own how your AI behaves

## The one-sentence description

**Vira gives teams control over what their AI says, decides, and does across models and applications.**

*Define it. Test it. Release it. Know what ran.*

The product focuses on **behavior as a managed, reusable asset**, not on producing another prompt, running another agent, or storing conversations for their own sake.

Read the [brand story and differentiation principles](brand-positioning.md) and the [canonical AUTO TaskRun path](canonical-taskrun.md).

## The job Vira is built for

Teams routinely discover that an AI application responds inconsistently, compares incompatible evidence, or takes an action without the expected review. Fixes get scattered among prompts, code, agent configuration and tests. A new model, teammate or workflow makes those fixes hard to track.

Vira proposes a common lifecycle for those changes: declared requirements, task and application attachment, evaluation evidence, explicit authority/release, runtime resolution and traceability.

## A connected lifecycle

A behavior can begin as a requirement, evolve through feedback and become a new approved revision. Vira brings the steps into a workflow that a team can inspect:

1. **Observe** permitted model, tool and application activity.
2. **Define** task-specific expectations using reusable behavior definitions and, where needed, reviewed Signals.
3. **Evaluate** candidate changes against relevant examples and failure cases.
4. **Approve and release** the intended revision for its authorized scope.
5. **Run and inspect** eligible behavior through a supported integration, with the execution and verification evidence that integration exposes.

[Observe](observe.md) · [Signals](signals.md) · [Teach](teach.md) · [Runtime verification](runtime-verification.md) · [Current capabilities](product-feature-map.md)

## Four practical ideas

**1. A definition separate from the prompt.** Name the task and the point where a behavior belongs. Express requirements separately from the implementation path. The result can be reviewed and versioned instead of buried in a system-prompt paragraph.

**2. Evaluate the exact proposed change.** Use representative positive and negative examples to examine a candidate before production. A passed evaluation is not a guarantee of future correctness.

**3. A release is a decision.** Approvals and releases are explicit; a Teach proposal, semantic match or imported Pack cannot silently change runtime eligibility. Authority remains scoped.

**4. See what was selected.** Supported integrations return identities, receipts or traces that help an operator inspect which eligible behavior was resolved. A trace demonstrates the recorded operation, not that the model's final answer was right.

## Example: an advertising performance review

A marketing analytics agent is asked to reallocate spend based on two dashboards. Their ROAS figures use different attribution rules. The team wants the agent to identify incompatibilities, avoid presenting estimates as actuals, and make a recommendation only with visible assumptions. Vira lets the team describe and evaluate that behavior within a governed release process.

This example illustrates the intended behavior. Quantified quality, cost, latency or compliance outcomes require comparable, published evaluation data.

## Position relative to adjacent tools

| Category | Main job | Where Vira fits |
| --- | --- | --- |
| Model or fine-tuning stack | Generate or adapt model outputs | Manage task-specific behavior around an existing model |
| Agent framework | Orchestrate tools and steps | Define and resolve governed behavior at integration points |
| Prompt management | Store and version prompt material | Govern a broader behavior lifecycle, including authority and runtime eligibility |
| Observability / evaluation | Observe and assess behavior | Connect selected evidence and evaluation to explicit change/release decisions |
| Memory | Recall previous context or preferences | Govern how an application should behave, not merely what it remembers |
| Policy / guardrails | Restrict unsafe or disallowed outcomes | Integrate behavior selection and checks, without replacing host authorization |

These are distinctions of product focus, not claims that other tools lack overlapping features.

## Availability and scope

Vira is under active development, and general product access is not open yet. Published client libraries and examples are available; hosted operations require a provisioned account. Behavior applies only at supported application boundaries and authorized scopes. If an application calls a tool outside its configured Vira boundary, Vira cannot intercept it. Results are limited to the tested artifact, dataset, criteria and environment. See [availability and integration details](product-status.md).

[What is Vira?](what-is-vira.md) · [For teams](for-teams.md) · [Capabilities](capability-map.md) · [Developer guide](developer-guide.md)
