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
2. If no official adapter exists, implement a small framework-native wrapper around the documented JS/Python SDK or HTTP client. Use the runnable examples in `examples/frameworks/node-next`, `python_fastapi`, `langgraph`, and `mcp-client` as the checked patterns; use `examples/frameworks/node` for a minimal stub-only boundary fixture.
3. Read the installed operation's response type and use its documented fields and states verbatim. For integrations that consume the published JS `RuntimeResolution` projection, model work may proceed only when the documented projection is active and non-empty; projection content guides the model and is not authorization for tools or external side effects. For other operations, do not transfer this mapping without a matching contract.
4. Preserve the framework's message/tool/result types; do not convert missing, malformed, or unrecognized required contract data into permission to act. Keep credentials server-side, preserve trace/request identifiers, and avoid logging raw prompts or responses.
5. Add deterministic tests for active, missing, malformed, and failure responses at the boundary. Distinguish fixture evidence from live Vira/provider validation.

## Deliverable and failure handling
State whether an official adapter exists, show the boundary and operation-specific response mapping, and include fixture evidence. Stop if the wrapper would bypass Vira runtime checks or framework semantics cannot be safely preserved.

## References

- [capability-matrix](https://github.com/hrpering/tryvira/blob/main/references/capability-matrix.md)
- [integration-patterns](https://github.com/hrpering/tryvira/blob/main/docs/integration-patterns.md)
- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
