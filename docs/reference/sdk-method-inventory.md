# Operation map: Skills → MCP → JavaScript / Python SDK

This is the public *operation selection* reference, not a copied OpenAPI contract. It does not reproduce method signatures, input schemas, or undocumented HTTP routes. **First select the workflow Skill.** If the coding agent already has a Vira MCP server, inspect live `tools/list` and use the corresponding tool. When the tool is absent, use an explicitly documented installed JavaScript/Python method without bypassing a server denial. Check the exact installed method signature and version; **Studio is not an API fallback**.

| User intent | Lead Skills | MCP discovery hints | JavaScript `@tryvira/sdk` | Python `tryvira-sdk` |
| --- | --- | --- | --- | --- |
| Install and inspect | `vira-get-started`, `vira-integrate-app`, `vira-mcp`, `vira-js-sdk`, `vira-python-sdk` | `list_capabilities`, `list_ai_systems`, `connection_health` | `listCapabilities`, `listAISystems`, `connectionHealth` | `list_capabilities`, `list_ai_systems`, `connection_health` |
| Connect and observe | `vira-observe`, `vira-signals` | `connect_once`, `observe`, `create_signal_mapping` | `connectOnce`, `observe`, `createSignalMapping` | Check installed `connect_once`, `observe`, `create_signal_mapping` |
| Author a behavior | `vira-author-behavior`, `vira-strategies` | `create_semantic_task`, `create_behavior_point`, `create_behavior_program` | `createSemanticTask`, `createBehaviorPoint`, `createBehaviorProgram` | Check installed snake_case counterparts |
| Pack lifecycle | `vira-build-pack`, `vira-packs`, `vira-release` | `import_pack`, `install_pack`, `evaluate_pack`, `approve_pack`, `release_pack` | `importPack`, `installPack`, `evaluatePack`, `approvePack`, `releasePack` | `import_pack`, `install_pack`, `evaluate_pack`, `approve_pack`, `release_pack` |
| Run and recover | `vira-task-runs`, `vira-traces` | `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events`, `retry_task_run` | `resolveTaskRun`, `startTaskRun`, `getTaskRun`, `listTaskRunEvents`, `retryTaskRun` | `resolve_task_run`, `start_task_run`, `get_task_run`, `list_task_run_events`, `retry_task_run` |
| Teach and improve | `vira-observe-teach`, `vira-evaluate` | `submit_teach_evidence`, `create_teach_analysis`, `get_teach_analysis`, `create_behavior_revision_candidate` | `submitTeachEvidence`, `createTeachAnalysis`, `getTeachAnalysis`, `createBehaviorRevisionCandidate` | Verify installed Python operations; `create_teach_analysis` and `get_teach_analysis` are documented |
| Inspect evidence | `vira-runtime`, `vira-runtime-verification`, `vira-traces` | `search_runtime_traces`, `get_evaluation`, `get_job` | `searchRuntimeTraces`, `getEvaluation` | Check installed trace/evaluation read methods | 

MCP tool availability is versioned and permission-scoped. The SDKs have independent signatures and capabilities. Do not simply convert camelCase to snake_case and assume parameter parity. Use the [full lifecycle and evidence checkpoints](../agent-first-operation-flow.md).

A route decision is not runtime admission. Pack installation is not release. A queued evaluation is not a PASS. A completed TaskRun is not a post-model verified answer. Each must be read back independently. The four child execution modes are SINGLE, STRATEGY, COMPOUND and HYBRID; AUTO selects a mode according to server eligibility.

[JavaScript runner](../../examples/javascript/taskrun-modes.mjs) · [Python runner](../../examples/python/taskrun_modes.py) · [MCP client](../../examples/frameworks/mcp-client/README.md) · [Studio-less limits](../agent-skills/studio-less-parity.md).
