# Agent Skills: tests and compatibility

Vira provides 27 task-focused Agent Skills. Each guide includes activation conditions, a workflow, supporting examples and failure handling.

[Install](installation.md) · [Skills catalog](../../skills/README.md) · [Detailed test coverage](skill-status.md)

## Automated repository checks

| Check | Result type |
| --- | --- |
| Skill structure, metadata and links | 27 Skill directories validated |
| Portable packaging | 27 archives verified with bundled resources |
| Installation | 27 archives extracted into three clean agent-style layouts |
| Published SDK contracts | Selected JavaScript/Python request and error-handling tests |
| Examples | Next.js app build/tests, Python syntax checks, Pack archive tests |
| Selection scenarios | 84 input cases checked for structure and labels |

Automated checks use local test transports and scenarios, rather than a running Vira customer account. The [testing guide](e2e-readiness.md) lists the coverage.

## Live environment checks

| Area | What the deployment needs |
| --- | --- |
| JavaScript/Python integration | Authorized API scope and real server responses |
| MCP | Started server, successful initialization and observed `tools/list` |
| Studio | Authorized UI session and actual workflow state |
| AUTO TaskRun | Eligible released behavior, runtime host and real child execution |
| Verified provider answer | Exact model output, post-model verification result and matching receipt |
| Agent selection | Observed Skill-load events from a real agent/model execution |

Model-driven automatic selection has not been benchmarked for this release. The 84-case scorer is available to capture and measure real agent traces. Current public TaskRun readback also lacks the complete verified final-answer handoff.

[Live acceptance procedure](live-acceptance.md) · [Client compatibility](production-contract-audit.md) · [Product availability](../product-status.md)
