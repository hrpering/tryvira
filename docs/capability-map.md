# Capability map

This page maps the current Vira product/runtime capabilities to the public integration surfaces.

Legend:

- **Yes**: directly exposed on that surface.
- **Underlying routes**: supported by HTTP primitives rather than the same SDK convenience helper.
- **Partial**: a related operation exists, but not the full lifecycle.
- **No tool**: not currently exposed as an MCP tool.

| Capability | JavaScript `@tryvira/sdk` | Python `tryvira-sdk` | HTTP | MCP `@tryvira/mcp` |
| --- | --- | --- | --- | --- |
| Connect system | `connectSystem` | `connect` | Yes | list only |
| Connect adapter | `connectAdapter` | `connect_adapter` | Yes | No tool |
| **Connect once** | **`connectOnce`** | **`connect_once`** | underlying routes | No tool |
| Connection health/test | `connectionHealth`, `testConnection` | `connection_health`, `test_connection` | Yes | No tool |
| Inventory | `inventory` | `inventory` | Yes | No tool |
| Observe / trace / feedback / outcome | Yes | Yes | Yes | `create_observation` |
| Observation batch / SDK delivery | Yes | Yes | Yes | No tool |
| Semantic resolve | `resolveSemantic` | `resolve_semantic` | Yes | `resolve_semantic` |
| Semantic → runtime convenience | `resolveSemanticRuntime` | supported client flow | underlying routes | separate tools |
| Boundary-first runtime resolve | `resolveBoundary` / `resolveRuntime` | current client equivalents | Yes | `resolve_runtime` |
| Signal discovery/mapping | Yes | Yes | current governed routes | Yes |
| Behavior Programs | list/get/create | list/get/create | Yes | list |
| Strategy definitions | list/get/create/variant/validate/simulate | Yes | Yes | list/get/simulate |
| **Strategy execution** | start/get/trace/continue/cancel | Yes | Yes | **Yes** |
| Packs | full lifecycle | full lifecycle | Yes | full lifecycle |
| **Teach evidence** | `submitTeachEvidence` | `submit_teach_evidence` | Yes | No dedicated tool |
| **Behavior Evaluation** | `startEvaluation`, `getEvaluation` | `start_evaluation`, `get_evaluation` | Yes | `start_evaluation` |
| **Response Quality & Decision** | `evaluateQuality` | `evaluate_quality` | `POST /v1/quality/evaluate` | No tool |
| Release | `createRelease` | `create_release` | Yes | Pack release only |
| Runtime execute/resolve | Yes | Yes | Yes | `resolve_runtime` |
| Capability attestation/resolution | Yes | Yes | Yes | No tool |
| Model-serving resolve/trace | Yes | Yes | Yes | No tool |
| Behavior capsule | `compileBehaviorCapsule` | current client equivalent | Yes | `compile_behavior_capsule` |
| Behavior projection | `serveBehaviorProjection` | current client equivalent | Yes | `serve_behavior_projection` |
| Deployment comparison/health | Yes | Yes | Yes | No tool |

## Why the surfaces are not identical

An SDK convenience helper does not imply a same-named HTTP or MCP operation. For example, `connectOnce` composes system creation and adapter connection for application code. MCP is intentionally oriented around discoverable governed tools and does not duplicate every client helper.

Likewise, Response Quality & Decision is currently an SDK/HTTP capability rather than an MCP tool. Documentation should describe the real surface rather than pretend all clients are symmetrical.

## Product lifecycle

```text
Connect
→ Observe
→ Discover / Semantic Resolve
→ Govern (Point / Program / Strategy / Signals)
→ Teach AI proposal
→ Review
→ Behavior Evaluation
→ Approve / Release
→ Runtime resolve / execute
→ optional Response Quality & Decision
→ Trace / Outcome
→ re-evaluate / Teach again
```

## Two evaluation layers

### Behavior Evaluation

Tests a behavior artifact or candidate before approval/release.

```text
candidate behavior
→ dataset / assertions
→ evaluation result
→ human/governed approval decision
→ release
```

### Response Quality & Decision

Evaluates a bounded set of already-admitted response candidates at response time.

```text
candidate responses
→ explicit quality checks
→ eligible ordering
→ selected candidate OR abstention
```

The response-quality layer does not grant release authority and does not silently rewrite canonical behavior.
