# What is Vira?

Vira is a **behavior-control layer for AI systems**.

It is designed for a common production problem: an AI system works, but teams keep correcting the same kinds of behavior again and again. Those corrections often end up scattered across prompts, application code, tool rules, evaluation scripts, and tribal knowledge.

Vira turns that repeated correction into a governed lifecycle.

![Vira behavior control lifecycle](../assets/vira-overview.svg)

## The problem Vira addresses

Prompting is useful, but prompts alone do not give a team a clean way to answer questions such as:

- What kind of task did the system think this was?
- Where is the behavior for that task attached?
- Which evidence caused a behavior change to be proposed?
- Was the candidate evaluated before release?
- Which approved behavior was eligible at runtime?
- What was actually selected and applied for this request?

Without a control layer, teams tend to answer those questions by digging through prompt files, model wrappers, orchestration code, and logs.

Vira gives them named concepts and explicit stages instead.

## The product model

```text
request
→ Semantic Task
→ Behavior Point
→ Behavior Program / Strategy
→ Runtime
→ Simple trace
```

Alongside that request path, Vira supports an improvement path:

```text
observation / feedback / outcome
→ evidence
→ Teach or discovery proposal
→ evaluation
→ approval
→ release
→ runtime eligibility
```

These paths meet at runtime, but they are not the same thing.

A semantic selection does not silently activate behavior. Evidence does not silently change production behavior. A proposal is not a release.

> **AI can propose. Released behavior remains explicit.**

## What Vira is not

Vira is not just a prompt library, an evaluation dashboard, or an observability wrapper.

Those are useful pieces, but Vira connects the full operational path between:

- evidence from real usage;
- governed behavior definitions;
- evaluation and approval;
- explicit release;
- runtime resolution;
- developer-facing traceability.

## Who Vira is for

Vira is useful when a team owns an AI system that must become more consistent over time without turning every correction into another hidden patch.

Typical teams include:

| Team | Example need |
| --- | --- |
| Product / AI product | make repeated corrections operational instead of ad hoc |
| Agent builders | control task-specific behavior across different agent flows |
| Platform teams | provide one behavior layer across multiple AI systems |
| Reliability / evaluation teams | connect evaluation results to explicit release decisions |

## Example domains

![Vira use cases across marketing, support, research, and operations](../assets/vira-use-cases.svg)

- **Marketing:** require a launch plan to cover the full funnel and measurement.
- **Support:** make escalation behavior consistent and reviewable.
- **Research:** distinguish sourced claims, inference, and required review checkpoints.
- **Operations:** control task routing and behavior for tool-using internal assistants.

## Next

- [How Vira works](how-vira-works.md)
- [Core concepts](core-concepts.md)
- [Connect an AI system](guides/connect-an-ai-system.md)
- [Troubleshooting center](troubleshooting/README.md)
