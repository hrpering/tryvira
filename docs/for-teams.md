# Evaluating Vira for your team

Vira is being built for teams that operate AI applications and need to answer three operational questions:

**What should the AI do? Who approved this behavior? What actually ran?**

The product introduces governed behavior definitions and lifecycle boundaries around existing models and agents. It is not a replacement for your foundation model, orchestration framework, data platform, or application's authorization checks.

## See the use cases before choosing a tool

The [12-level example catalog](use-cases.md) starts with everyday food and writing preferences and progresses to business reporting, incident investigation and multi-task operations. A strong baseline may already succeed; the evaluation should measure the *governed lifecycle*, not manufacture a weak opponent.

For a comparison against Skills, agents and adjacent platform categories without competing brand names, use the [approach comparison](approach-comparison.md). To understand when SINGLE, STRATEGY, COMPOUND, HYBRID or AUTO applies, use the [execution-mode guide](execution-modes.md).

## Where it may help

| Team | Repeated problem | Behavior worth evaluating |
| --- | --- | --- |
| Customer support | Escalations differ across agents and model versions | When to ask a human to review; what context to preserve |
| Marketing / retail media | Reports compare incompatible attribution or KPI definitions | Verify metrics before ranking performance or recommending budgets |
| Research | Assertions appear without clear sources or confidence | Separate sourced facts, inference, and unresolved questions |
| Operations | Tool-using assistants act on incomplete or ambiguous requests | Require confirmation and explicit action boundaries |

These are candidate use cases, not proof of a measured outcome.

## What buyers should expect from the complete lifecycle

A governance checkbox is not the product. **Observe** supplies real behavior evidence; **Signals** create reviewed typed context; **Teach** turns feedback/outcomes into proposals; **evaluation/release** controls changes; **AUTO TaskRun** selects eligible work; **runtime verification** checks the actual output when supported and **receipts** make the decision auditable.

This combination is a product direction with separate maturity levels. Ask to see the exact integrated provider-to-post-model verification receipt, not a screenshot or a completed routing status. See the [full feature map](product-feature-map.md), [Observe](observe.md), [Signals](signals.md) and [runtime verification](runtime-verification.md).

## What a practical evaluation should include

1. **Baseline:** run the current application on representative tasks without Vira behavior applied. Keep prompts, model configuration, and inputs recorded.
2. **Behavior definition:** specify the task, expected behavior, negative examples, verification criteria, scope, and any tool-policy boundary.
3. **Candidate evaluation:** compare the same cases with the reviewed behavior candidate. Record failures as well as successes; do not rely on a single impressive response.
4. **Authority check:** test an unreleased candidate, wrong scope, missing permission, and unavailable verifier. A valid denial is not a failure of governance.
5. **Runtime inspection:** verify the eligible released identity, returned receipt/trace, and host-side enforcement for every relevant action.
6. **Decision:** compare quality, regressions, integration work, latency, operating cost, and security responsibilities. Report measured values from your own test only.

## What to ask before adoption

- **Integration:** Which operations work in the JavaScript SDK, Python SDK, MCP or HTTP for the installed release?
- **Access:** Is a Vira account actually provisioned, with a supported API endpoint and scoped role?
- **Authority:** Can a tool or model request bypass the integration point? How does the host enforce denials?
- **Data:** Which observations are allowed, minimized and retained? Who approves changes?
- **Evidence:** Can the team retrieve the exact evaluated candidate, release identity, and runtime receipt?
- **Limits:** What happens on an unresolved task, unavailable service, failed verification or missing release?

## Availability and licensing

The published client libraries and examples are available to inspect. Live service access and Studio use are **not generally open** yet. The public documentation repository is proprietary under its [LICENSE](../LICENSE); separately distributed client packages are MIT-licensed under their own terms. This repository does not establish pricing, service-level agreements, production readiness, or model-quality benchmarks.

[What is Vira?](what-is-vira.md) · [Capability map](capability-map.md) · [Security model](security-model.md) · [OFF/ON example](../examples/frameworks/node-next/README.md) · [Support](../SUPPORT.md)
