# What is Vira?

Vira helps teams **define, test, release and inspect how their AI applications behave**. It works alongside the models, agents and tools you already use.

An *AI behavior* is what the system says, decides or does in a particular situation. A customer-support agent should know when to escalate. A research assistant should distinguish evidence from assumptions. A marketing analyst should not compare incompatible metrics without explaining the difference.

## Why does that need its own layer?

As teams add agents, tools and models, expectations often end up scattered across prompts, code, configurations and tests. A fix in one workflow can be missing from another, and a model upgrade can make an old rule harder to track.

Vira gives teams a workflow for managing those expectations as **reviewable, versioned behavior definitions** rather than isolated prompt edits.

## The behavior lifecycle

| Step | What your team does | Explore |
| --- | --- | --- |
| **Observe** | Collect permitted evidence of requests, decisions, tool calls and outcomes | [Observe](observe.md) · [Signals](signals.md) |
| **Define** | Describe task-specific requirements and how they should apply | [Behavior Points](behavior-points.md) · [Programs](behavior-programs.md) · [Packs](packs.md) |
| **Evaluate & release** | Test a candidate, review the results and authorize the intended version | [Evaluation](evaluation-and-approval.md) · [Release](release.md) |
| **Run & inspect** | Resolve eligible behavior for a request and examine available evidence of execution | [TaskRun](canonical-taskrun.md) · [Traces](traces.md) |
| **Improve** | Turn approved feedback and outcomes into proposals for another evaluation cycle | [Teach](teach.md) |

![Vira's behavior lifecycle](../assets/vira-lifecycle.svg)

The [full concept glossary](core-concepts.md) explains Semantic Tasks, Behavior Points, Programs, Strategies, Signals, execution modes and verification in more detail.

## Examples at different levels

- **Everyday:** apply a configured vegetarian and onion-free preference to a recipe.
- **Customer support:** ask for missing order details before describing an unknown shipping status.
- **Marketing:** identify differences in sales definitions and attribution windows before ranking campaign results.
- **Operations:** coordinate multiple approved tasks and retain evidence for each execution step.

These are examples of behavior requirements you can define and evaluate, not measured performance claims. [Explore 12 scenarios](use-cases.md) · [Try three Pack examples](../examples/packs/README.md).

## How Vira fits your stack

A model produces text. An agent uses models, state and tools to do work. A Skill supplies reusable instructions. Vira focuses on the lifecycle and runtime eligibility of task behavior, including review, release and inspectable evidence at supported integration points.

Vira does not replace your application's authorization checks or automatically control tool calls that bypass its integration. Behavior definitions can be reused across model or application changes, but should be evaluated in each new environment.

[Compare approaches](approach-comparison.md) · [Integration guide](developer-guide.md) · [How execution works](how-vira-works.md)

## Try Vira

The public JavaScript and Python SDKs, MCP package, sample applications and Agent Skills are available to explore. Live Vira operations require a provisioned workspace. The current public chatbot ON example reports AUTO TaskRun admission/status; verified final provider-output delivery is still being integrated.

[Get started](start-here.md) · [Current availability](product-status.md) · [For teams](for-teams.md)
