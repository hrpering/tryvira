# Published SDK capability guide

Package versions move independently. This guide maps product tasks to the Skill that should lead them; it does not reproduce method signatures, payload schemas, or endpoint paths. Check the installed JavaScript/Python package documentation for exact operations and data shapes.

| Product task | Skill | JavaScript SDK | Python SDK | MCP |
| --- | --- | --- | --- | --- |
| Connect and configure an application | `vira-get-started`, `vira-integrate-app`, `vira-js-sdk`, `vira-python-sdk` | See installed package documentation | See installed package documentation | See installed server catalog |
| Observe behavior and manage permitted evidence | `vira-observe-teach` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Author governed behavior | `vira-author-behavior`, `vira-signals`, `vira-strategies` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Prepare and govern a Pack | `vira-build-pack`, `vira-packs` | See installed package documentation | See installed package documentation | No Pack tools listed in the current catalog |
| Teach analysis and improvement loop | `vira-observe-teach`, `vira-lifecycle` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Evaluate a candidate | `vira-evaluate`, `vira-evaluate-release` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Approve and release behavior | `vira-release` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Apply and inspect runtime behavior | `vira-runtime`, `vira-debug` | See installed package documentation | See installed package documentation | Discover with `tools/list` |
| Orchestrate TaskRuns | `vira-task-runs` | `resolveTaskRun` / `startTaskRun` / state reads; verify installed npm contract | `resolve_task_run` / `start_task_run` / state reads; verify installed PyPI contract | No TaskRun tools listed in the current catalog |
| Integrate with an application framework | `vira-framework-integration` | See installed package documentation | See installed package documentation | See framework host requirements |

The JavaScript SDK, Python package, MCP server, HTTP API, and Studio do not have identical coverage. Check the installed release and the selected customer's scope before using a capability. Do not infer HTTP or MCP support from an SDK or Python method name.

[TaskRun execution modes](../execution-modes.md) include SINGLE, STRATEGY, COMPOUND, HYBRID and AUTO routing; mode selection is not server authorization. [JS runner](../../examples/javascript/taskrun-modes.mjs) · [Python runner](../../examples/python/taskrun_modes.py).

The exact method inventory is available in each published package's own documentation and declarations. This repository maps product tasks to Skills without republishing that low-level contract. The separate [MCP catalog](mcp-tools.md) describes public MCP tools and points integrations to live `tools/list` discovery.
