# Capability map

Vira exposes related product workflows through the JavaScript SDK, Python SDK, HTTP API, MCP, and Studio. These surfaces are not identical, and availability can vary by package release and customer scope.

| Product area | JavaScript SDK | Python SDK | HTTP API | MCP | Studio |
| --- | --- | --- | --- | --- | --- |
| Connect an AI application | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Observe and review behavior | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Define governed behavior | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Teach AI and review proposals | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Evaluate, approve, and release | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Apply and verify runtime behavior | See current client guide | See current client guide | See deployment's public API reference | Check installed server tools | Availability varies |
| Orchestrate TaskRuns | Published SDK mode routing, admission and state methods; check installed release | Published Python mode routing, admission and state methods; check installed release | No raw TaskRun contract republished here | No TaskRun tool listed in current MCP catalog | Availability varies |

Do not treat this table as an authorization rule. Check the installed package version and public reference, the connected MCP server's `tools/list`, and the capabilities available to the customer's scope before selecting an operation.

## Full capability coverage and truthful availability

The compact interface table above is **not** the full product inventory. [Full product feature map](product-feature-map.md) covers 16 product families, including Observe, Signals, Teach, runtime verification, quality/optimization, memory/knowledge, scoped security, billing, telemetry, Studio/Admin and experimental model/GPU work. [Evidence level and availability](product-status.md) distinguishes backend code, tests, live customer-scope acceptance and incomplete provider-verifier handoffs.

**Signals are not a synonym for observations; artifact verification, candidate evaluation and runtime post-model verification are separate gates.** [Observe](observe.md) · [Signals](signals.md) · [Runtime verification](runtime-verification.md).

## TaskRun mode selection

The SDK's requested modes are **SINGLE**, **STRATEGY**, **COMPOUND**, **HYBRID**, plus **AUTO** for routing. AUTO is not another execution mode. COMPOUND requires multiple registered, eligible tasks; STRATEGY requires an eligible released Strategy and a capable host; HYBRID combines child modes. A route may clarify, abstain, deny or report an unsupported host.

A package method being present does not prove that the current tenant is authorized for it. The published client interface and actual runtime outcome must both be checked. [Execution mode guide](execution-modes.md) · [Offline pinned npm transport tests](../examples/frameworks/node-next/test/taskrun-sdk.test.mjs) · [Public Python surface check](../scripts/check-published-python-sdk.py)

## Governed lifecycle

```text
connect
→ observe permitted behavior
→ define or select a candidate
→ review and evaluate
→ separately authorize approval or release
→ apply at runtime
→ inspect the result
→ improve through a new reviewed cycle
```

Semantic matching, evidence collection, proposal review, installation, evaluation, approval, release, and runtime use are separate actions. A result at one stage does not authorize the next.

## Product-level authoring choices

Direct authoring supports incremental work on individual behavior resources. Packs group related material into a reviewable candidate. Both paths require the supported public client documentation for their detailed inputs and state. Request schemas and supported operations are defined by each published integration surface.

## Evaluations

Behavior Evaluation assesses a behavior candidate before any separate approval or release decision. Response Quality & Decision evaluates a bounded response choice at runtime. Neither operation silently grants release authority.

## References

- [Published packages](published-packages.md)
- [JavaScript SDK reference](reference/javascript-sdk.md)
- [Python SDK reference](reference/python-sdk.md)
- [HTTP integration guidance](reference/api.md)
- [MCP tool catalog](reference/mcp-tools.md)
- [Capability discovery](capability-discovery.md)
- [Canonical authoring](canonical-authoring.md)
- [Packs](packs.md)
- [Teach AI](teach.md)
- [Use cases by level](use-cases.md)
- [Brand-neutral approach comparison](approach-comparison.md)
