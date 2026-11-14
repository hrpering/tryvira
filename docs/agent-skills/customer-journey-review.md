# Example workflow: improve an existing support assistant

This guide shows how an application team can use Vira with an existing FastAPI customer-support agent. The steps describe an integration journey rather than a recording of a completed live deployment.

## Scenario

The support team wants its assistant to follow an approved policy and make reviewed improvements using real customer corrections. The team supplies the policy, environment, model provider and authorizations.

| Stage | Action | Learn more |
| --- | --- | --- |
| Connect | Identify the AI call boundary and configure a scoped SDK | [Developer guide](../developer-guide.md) |
| Observe | Admit permitted model events and feedback | [Observe](../observe.md) |
| Define | Express support requirements as Task, Point and Program | [Authoring](../canonical-authoring.md) |
| Package | Build and inspect a Behavior Pack candidate | [Pack Academy](../../examples/packs/README.md) |
| Evaluate | Test the candidate, including failures and regressions | [Evaluation](../evaluation-and-approval.md) |
| Release | Obtain approval for the exact revision and scope | [Release](../release.md) |
| Execute | Submit the request using AUTO TaskRun | [Canonical TaskRun](../canonical-taskrun.md) |
| Improve | Review runtime evidence and Teach recommendations | [Teach](../teach.md) |

The original [FastAPI example](../../examples/frameworks/python_fastapi/README.md) demonstrates a lower-level projection diagnostic. The [Next.js example](../../examples/frameworks/node-next/README.md) shows canonical AUTO admission and state reporting.

Live operations need a provisioned workspace and appropriate credentials. For cross-Skill coordination, use the [full-lifecycle guide](../../skills/vira-full-lifecycle/SKILL.md); human approval remains separate from agent guidance.
