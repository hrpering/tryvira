---
name: vira-signals
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Discover and govern typed Vira Signals from permitted evidence, including review, materialization, and producer mappings."
---

# Work with Vira Signals

Use Signals when an integration needs a stable, typed evidence value that behavior can consume. Signal discovery, human review, definition materialization, and producer mapping are distinct transitions. A proposed Signal or model-inferred value is not active evidence.

## Activate this skill when
Creating or diagnosing Signal discovery proposals, reviewing/materializing approved definitions, or creating and reviewing producer mappings. Do not use it for ordinary telemetry design or to activate behavior/release a Pack.

## Inputs and preconditions
Identify the scoped project/environment, authorized evidence source and consent/privacy basis, event types and actual producer payload shape, desired stable meaning/value type, and downstream consumer. Check capability discovery and the installed SDK method signatures; MCP does not expose the Signal lifecycle.

## Workflow
1. Inspect the permitted observations, feedback, or outcomes. Minimize/redact content and retain evidence IDs; do not submit raw conversations by default.
2. Create a discovery proposal with the documented JavaScript/Python SDK method or HTTP surface. Read its persisted status and evidence references; never invent a stable key, confidence, or approval.
3. Present the proposal for the required review. Only continue when the server records an approving review for this exact proposal.
4. Materialize the approved proposal through the documented operation. Record returned Signal identity/version and materialization receipt/status.
5. Create a producer mapping only after inspecting real event names and payload fields. Read it back and complete the required mapping review before treating producer values as Signals.
6. Verify one expected and one absent/negative event against the reviewed mapping. Confirm that only the expected typed value is emitted and that no proposal/review step silently changes active behavior.

The SDK reference lists `createSignalDiscoveryProposal`, `reviewSignalDiscoveryProposal`, `materializeSignalDiscovery`, `createSignalMapping`, `getSignalMapping`, and `reviewSignalMapping` (Python snake_case equivalents). It does not publish one universal request schema here: inspect the installed client contract before constructing payloads.

## Implementation details

1. A Signal is a **typed, versioned, scope-bound interpretation** of evidence, not a raw `model.response` event or a guessed boolean.
2. Discover from **real admitted evidence IDs** with consent; review discovery; materialize approved definition; separately propose/review/activate a producer mapping. Supported producer types are `observation_attribute`, `tool_result`, `application_state`, `runtime_state`.
3. Verify real producerKey and sourceEventType, definition version, mapping status and runtime attestation. A Pack's `signals/items.json` key is only a reference; it does not create trusted runtime authority.
4. Check positive/missing/stale/wrong-tenant/conflicting-source cases before a released guard relies on the value. Keep Signal changes separate from Teach proposal/release.
5. Negative: `signal:attribution_mismatch == true` supplied by an untrusted client cannot authorize budget changes.
[Signals](https://github.com/hrpering/tryvira/blob/main/docs/signals.md) · [Observe](https://github.com/hrpering/tryvira/blob/main/docs/observe.md).

## Deliverable and failure handling
Return the proposal/review/materialization/mapping IDs, evidence references, source event/value mapping, verification results, and remaining gaps. Stop on missing consent, unresolved review, unknown payload shape, failed materialization, inactive mapping, or an unsupported surface. Do not turn semantic matches into Signal values or approval.

## References

- [Signals lifecycle](https://github.com/hrpering/tryvira/blob/main/docs/signals.md)
- [Teach evidence](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [JavaScript SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [Python SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [Capability map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
