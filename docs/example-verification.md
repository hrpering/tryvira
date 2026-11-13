# Example verification and public contract status

The public repository contains runnable integration code **and** conceptual examples. They are not interchangeable. A repository that installs dependencies and builds cleanly can still fail against a customer's Vira tenant, external model or application permissions.

**Current reference package line:** `@tryvira/sdk@0.1.44`, `@tryvira/mcp@0.1.44`, `tryvira-sdk==0.1.44`, as synchronized in [published packages](published-packages.md). Version checks use registries; live tenant verification is a separate task.

**Feature coverage:** [Product map](product-feature-map.md) and [status/evidence levels](product-status.md) include Observe, Signals, verified output, Teach, security, billing, integrations and experimental infrastructure. CI can check that documentation exists; it cannot claim those backend capabilities passed customer E2E. A complete verifier proof requires [runtime verification acceptance](runtime-verification.md).

## What CI actually checks

| Entry point | SDK/API surface | Automated verification | Not verified by this CI |
| --- | --- | --- | --- |
| [JavaScript connection / authoring / lifecycle](../examples/javascript/README.md) | Published JS SDK | Source syntax, versioned package reference; task method names checked in pinned SDK tests | Real customer connection, authoring and release acceptance |
| [JavaScript TaskRun modes](../examples/javascript/taskrun-modes.mjs) | Published JS SDK | Syntax; routing/admission/mode/state request shapes tested against installed 0.1.44 npm client via offline transport | Actual semantic eligibility, permission, execution, released strategies |
| [Python connection and quality](../examples/python/README.md) | Published Python SDK | Python syntax and exported TaskRun method availability from installed 0.1.44 client | Actual customer outcome and model quality |
| [Python TaskRun modes](../examples/python/taskrun_modes.py) | Published Python SDK | Source syntax; method-surface import check in Python venv | Actual routing, admission, continuation or effects |
| [Next.js OFF/AUTO admission sample](../examples/frameworks/node-next/README.md) | Published JS SDK + provider baseline | npm install, ON TaskRun admission/readback tests, OFF provider path tests, Next.js build | Canonical verified ON chatbot answer until provider/verifier retrieval exists |
| [FastAPI example](../examples/frameworks/python_fastapi/README.md) | Python SDK | Locked dependency install, Python compilation | Live endpoint start, Vira response and model invocation |
| [LangGraph example](../examples/frameworks/langgraph/README.md) | Python SDK | Locked dependency install, Python compilation | Live graph execution and provider/tenant acceptance |
| [MCP example](../examples/frameworks/mcp-client/README.md) | Published MCP process | npm install and JavaScript syntax check | Live MCP tool discovery against a tenant, effectful tool authorization |
| [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) | Published JS SDK | Tutorial safety tests and script syntax; `11-auto-taskrun.mjs` uses AUTO admission | Full live Pack/Teach release and verified provider response; `06`/`07` are low-level diagnostics only |
| [Pack Academy](../examples/packs/README.md) | YAML manifest + JSON collections | Structural semantic/Point/Program/Strategy/test-fixture lint and candidate ZIP packaging smoke test with `npm run verify:packs` | Actual Pack parser/materializer, server-side evaluation, approval, release and live execution |
| [Agent Skills](../skills/README.md) | Guidance files | Skill schema/trigger tests and representative packaging | Every human-agent interaction or every live service operation |
| [12 scenario fixtures](../examples/scenarios/README.md) | Synthetic prompts, no API | Data schema, coverage, negative cases, prompt CLI output | Model scores, actual Vira behavior or tenant acceptance |

The [missing verified-answer handoff contract](verified-answer-handoff.md) specifies what the backend/SDK and provider adapter must expose before claiming the final ON chatbot response is verified. A test transport that returns **synthetic response bodies** is used only to verify client method request serialization. It is not presented as a fake Vira API service or a claim that the control plane made a real decision.

## Reliability gates before a customer demo

Use an isolated customer-authorized environment and run a complete workflow for the exact installed client:

1. Configure the real Vira API URL, server-side API key and permitted organization/project/environment. No shared keys or public tenant are bundled.
2. Connect or discover the existing system, retain the returned identities and check scope.
3. Author or select a **real** Semantic Task, Behavior Point, Behavior Program/Strategy or Pack.
4. Evaluate a candidate using persisted evidence and obtain explicit approval and release.
5. Submit a **normal AUTO TaskRun**, not direct projection; inspect the released identity, state, correct child execution and wrong-scope, unreleased, unavailable and ambiguous routes.
6. For TaskRun, inspect actual routing proposal, admission, status/state version, children and receipts. Test SINGLE, STRATEGY, COMPOUND, HYBRID and AUTO only when the prerequisites are satisfied.
7. Require the real provider/host execution and separately bound post-model verification receipt before showing a **verified** chatbot answer; a completed child receipt alone is insufficient.
8. Report reproducible outputs and negative-path results; do not substitute a local syntax check or an undocumented internal API route for evidence.

## Known limitations that need explicit wording

- A **passing build** proves a code path is syntactically/build compatible, not that a credential or live route is available.
- The JavaScript, Python and MCP published surfaces are different. A method in one does not establish an equivalent MCP tool or raw HTTP payload.
- The current sample chatbot offers **Vira OFF/ON** but not a five-way TaskRun switch. Use the mode runner and task guides for that purpose.
- TaskRun AUTO is a **routing request**, not a fifth execution mode or blanket consent for tool actions.
- The hosted product is under active development and not generally open. Full customer E2E validation remains dependent on provisioned access.

[Developer guide](developer-guide.md) · [Checklist](developer-checklist.md) · [Mode guide](execution-modes.md) · [Troubleshooting](troubleshooting/README.md)
