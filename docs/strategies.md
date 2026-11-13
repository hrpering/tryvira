# Behavior Strategies and TaskRun execution

A **Behavior Strategy** describes bounded, structured execution for a governed Behavior Point. It is not simply a longer prompt, and it is not the same as a multi-task COMPOUND run.

## Three different cases

| Need | Concept |
| --- | --- |
| Apply one released behavior to one task | **SINGLE** |
| Run ordered, verified steps for one task | **STRATEGY** |
| Coordinate different registered tasks with independent authority | **COMPOUND**, or **HYBRID** if some child tasks use STRATEGY |

**AUTO** requests a mode proposal from eligible registered tasks. It does not create a Strategy or override release/permission checks. See the [mode guide](execution-modes.md).

## Strategy lifecycle

A Strategy is a versioned artifact. Where supported, it can be created, validated, structurally simulated, explicitly activated and used through a governed execution path. Activation is not equivalent to approval/release or universal runtime authorization.

The JavaScript and Python clients document Strategy operations; installed versions may differ. Their exact request and response contracts must come from the [JavaScript client](reference/javascript-sdk.md), [Python client](reference/python-sdk.md) or a customer-provided, published HTTP reference. The published MCP tool catalog is narrower and does not imply Strategy execution.

### Example concept: incident investigation

```text
input → collect permitted incident evidence
      → check candidate causes against evidence
      → human/host checkpoint if required
      → report verified findings and unresolved questions
```

A waiting or denied step is a real state, not a success to skip. An external tool call still requires the host's own permissions. Do not start a Strategy against an unreleased identity or attempt continuation with invented authority digests.

## Strategy vs TaskRun

A Strategy is a governed **execution definition**. A TaskRun is a request to coordinate eligible task execution and retain its state/evidence. A TaskRun may use STRATEGY for one child and may mix STRATEGY with SINGLE children in HYBRID, if the actual server and host permit it.

[TaskRun execution modes](execution-modes.md) · [Canonical authoring](canonical-authoring.md) · [Packs](packs.md) · [Runtime](runtime.md) · [Developer checklist](developer-checklist.md)
