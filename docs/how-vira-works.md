# How Vira works

Vira helps teams govern **what an AI system says, decides and does**, rather than embedding every organizational requirement in a growing prompt. The normal request enters through an **AUTO TaskRun** that selects and executes only eligible released behavior.

```text
User request
  → AUTO TaskRun
  → Semantic Task selection / ambiguity check
  → SINGLE | STRATEGY | COMPOUND | HYBRID dispatch
  → real child execution
  → released behavior enforcement
  → provider / chatbot
  → post-model verification and receipts
```

Execution depends on released behavior and the capabilities of the connected host. A verified final answer also requires the provider output and post-model result to be linked to a persisted receipt; this handoff is still under development in the public client.

![How Vira works — conceptual governed lifecycle, not a live verification receipt](../assets/vira-lifecycle.svg)

The difference from simply editing a prompt is the **lifecycle**: declare → test → review → release → resolve/execute → inspect evidence → propose a new revision. Teach can propose but cannot silently release.

**Start with real examples:** [Pack academy](../examples/packs/README.md) · [Customer scenarios](use-cases.md) · [Canonical runtime](canonical-taskrun.md) · [Brand story](brand-positioning.md).

**Diagnostic only:** direct `behavior-projection` and `resolveRuntime` methods remain available as low-level public-client surfaces. They are not the normal chat flow.

[Developer guide](developer-guide.md) · [Capabilities](capability-map.md)
