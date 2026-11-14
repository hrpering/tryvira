# Integration compatibility: Vira Agent Skills

Vira Agent Skills guide application developers through the published JavaScript SDK, Python SDK, MCP and HTTP interfaces. The installed client and connected Vira environment determine what operations are available.

[Skills catalog](../../skills/README.md) · [SDK methods](../reference/sdk-method-inventory.md) · [Product availability](../product-status.md)

## Choose an integration path

| Goal | Guide | What to check |
| --- | --- | --- |
| Connect an application | [Integration Skill](../../skills/vira-integrate-app/SKILL.md) | The real AI call site, client, environment and scope |
| Observe events | [Observe Skill](../../skills/vira-observe/SKILL.md) | Scoped event, AI System, Connection and privacy requirements |
| Author and package behavior | [Pack authoring](../pack-authoring-guide.md) | Task, Point, Program, Strategy and candidate ZIP schema |
| Evaluate and release | [Evaluation](../evaluation-and-approval.md) | Persisted evaluation, reviewer authority and exact revision |
| Run requests | [AUTO TaskRun](../canonical-taskrun.md) | Released eligibility, selected mode, host capabilities and child state |
| Inspect a response | [Verification](../runtime-verification.md) | Real provider output, post-model result and matching receipt |

## Runtime and authorization

Normal applications enter through AUTO TaskRun. The lower-level `resolveRuntime`, `executeRuntime` and `serveBehaviorProjection` methods are suitable for diagnostics and specific SDK workflows, not an alternative chatbot serving path.

Observe, Signal review, Teach recommendations, Pack evaluation, approval and release have distinct authorization and evidence requirements. An admitted or completed TaskRun is not automatically a verified end-user answer. The final provider-output verification/readback integration remains under development.

## Client compatibility

The JavaScript and Python SDKs have broader functionality than the current MCP catalog. Discover actual MCP capabilities with `tools/list`. Use the HTTP routes documented for your deployed API rather than deriving them from SDK method names.

[JavaScript](../reference/javascript-sdk.md) · [Python](../reference/python-sdk.md) · [MCP](../reference/mcp-tools.md) · [HTTP](../reference/api.md)

## Working examples

[Next.js chatbot](../../examples/frameworks/node-next/README.md) · [JavaScript TaskRuns](../../examples/javascript/taskrun-modes.mjs) · [Python TaskRuns](../../examples/python/taskrun_modes.py) · [Pack Academy](../../examples/packs/README.md)

The FastAPI and LangGraph projection examples demonstrate an advanced diagnostic integration. They are not canonical AUTO TaskRun chatbots.
