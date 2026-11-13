---
name: vira-framework-integration
license: "Proprietary; see LICENSE"
description: "Integrate Vira into an AI application framework without assuming an undocumented adapter."
---

# Framework Integration

First verify whether the chosen published package has a dedicated adapter. If absent, use documented JS/Python SDK or HTTP primitives in the framework lifecycle. Keep Vira runtime authority on the service boundary; do not present a local hook as a Vira adapter, permission grant, or release mechanism. Runtime response fields are operation-specific: do not invent a universal ALLOW/DENY/ABSTAIN mapping.

## Activate this skill when
Adding Vira to OpenAI Agents SDK, Vercel AI SDK, LangChain, LangGraph, Next.js, FastAPI, or a custom agent. Do not claim a Vira framework adapter unless the installed published package explicitly contains one.

## Inputs and preconditions
Inspect framework version, model/tool lifecycle, server/client boundary, streaming semantics, and Vira operation required. Check package exports/docs for a dedicated adapter before proposing one.

## Workflow
1. Select a real boundary where the application resolves or applies behavior (before model/tool action, or at documented post-model verification).
2. If no official adapter exists, implement a small framework-native wrapper around documented AUTO TaskRun through the JS/Python SDK (or separately documented HTTP contract). Use the runnable examples in `examples/frameworks/node-next`, `python_fastapi`, `langgraph`, and `mcp-client` as the checked patterns; use only the runnable applications that call a configured Vira API or MCP server.
3. Read the installed operation's response type and use its documented fields and states verbatim. Normal ON model work must pass canonical AUTO TaskRun and the real provider-to-post-model verification boundary. Direct projection-to-model is diagnostic only. For other operations, do not transfer this mapping without a matching contract.
4. Preserve the framework's message/tool/result types; do not convert missing, malformed, or unrecognized required contract data into permission to act. Keep credentials server-side, preserve trace/request identifiers, and avoid logging raw prompts or responses.
5. Build and start the application, then verify the boundary against an authorized isolated non-production Vira deployment and configured provider. Record real response IDs/statuses; never report build output as live integration evidence.

## Production-aligned implementation playbook

1. Find the host's model/tool/action call sites, streaming behavior and how the final user-visible answer is sent. Keep secrets server-side and application tool permissions in the host.
2. For Next.js, OpenAI Agents or Vercel AI SDK, **OFF** may call the provider as a baseline; **ON** must submit AUTO TaskRun, not `resolveRuntime → projection → streamText`. The public example deliberately responds with persisted TaskRun state rather than a fabricated verified ON answer.
3. For FastAPI/LangGraph use Python `start_task_run` with `requestedMode:"AUTO"`, actual IDs and state readback. Preserve graph checkpoint semantics and stateVersion.
4. Before streaming an ON answer, require the documented provider-output/post-model verification contract with matching output digest and receipt; until available, return pending/unsupported. Do not infer an official adapter from framework-native glue.
5. Negative: no released Task, host capability, verifier or tool permission means no ON model/tool bypass.
[Current Next.js code](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/src/support-handler.mjs) · [Integration patterns](https://github.com/hrpering/tryvira/blob/main/docs/integration-patterns.md).

## Deliverable and failure handling
State whether an official adapter exists, show the boundary and operation-specific response mapping, and include evidence from the actual configured integration or clearly mark live verification as not run. Stop if the wrapper would bypass Vira runtime checks or framework semantics cannot be safely preserved.

## References

- [capability-matrix](https://github.com/hrpering/tryvira/blob/main/references/capability-matrix.md)
- [integration-patterns](https://github.com/hrpering/tryvira/blob/main/docs/integration-patterns.md)
- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
