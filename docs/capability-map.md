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
| Orchestrate TaskRuns | Consult the installed JavaScript package documentation | Confirm from the installed Python release; do not infer parity | No direct HTTP guide in this repository | No TaskRun tool listed in the current catalog | Availability varies |

Do not treat this table as an authorization rule. Check the installed package version and public reference, the connected MCP server's `tools/list`, and the capabilities available to the customer's scope before selecting an operation.

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

Direct authoring supports incremental work on individual behavior resources. Packs group related material into a reviewable candidate. Both paths require the supported public client documentation for their detailed inputs and state. Do not infer request shapes or surface parity from the product flow.

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
