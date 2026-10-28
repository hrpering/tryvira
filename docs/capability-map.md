# Capability map

This page maps the current Vira capabilities to the public integration surfaces.

Legend:

- **Yes**: directly exposed on that surface.
- **Underlying routes**: available through HTTP primitives rather than the same convenience helper.
- **Partial**: related operations exist, but not the complete lifecycle.
- **No tool**: no dedicated MCP tool today.

| Capability | JavaScript `@tryvira/sdk` | Python `tryvira-sdk` | HTTP | MCP `@tryvira/mcp` |
| --- | --- | --- | --- | --- |
| **Product capability discovery** | `listCapabilities` | `list_capabilities` | `GET /v1/capabilities` | `list_capabilities` |
| List/read AI systems | `listAISystems`, `getAISystem` | `list_ai_systems`, `get_ai_system` | Yes | `list_ai_systems` |
| Connect system | `connectSystem` | `connect` | Yes | No create/connect tool |
| Connect adapter | `connectAdapter` | `connect_adapter` | Yes | No tool |
| **Connect once** | **`connectOnce`** | **`connect_once`** | underlying routes | No tool |
| Connection health/test | `connectionHealth`, `testConnection` | `connection_health`, `test_connection` | Yes | No tool |
| Inventory | `inventory` | `inventory` | Yes | No tool |
| Observe / trace / feedback / outcome | Yes | Yes | Yes | `create_observation` |
| Observation batch / SDK delivery | Yes | Yes | Yes | No tool |
| **Semantic Task authoring** | list/create | list/create | list/create/read | list/create |
| **Behavior Point authoring** | list/create | list/create | list/create/read | list/create |
| Semantic resolve | `resolveSemantic` | `resolve_semantic` | Yes | `resolve_semantic` |
| Semantic → runtime convenience | `resolveSemanticRuntime` | supported client flow | underlying routes | separate tools |
| Boundary-first runtime resolve | `resolveBoundary` / `resolveRuntime` | current client equivalents | Yes | `resolve_runtime` |
| Signal discovery/mapping | Yes | Yes | governed routes | Yes |
| Behavior Programs | list/get/create | list/get/create | Yes | list |
| Strategy definitions | list/get/create/variant/validate/simulate/**activate** | Yes | Yes | list/get/simulate/**activate** |
| **Strategy execution** | start/get/trace/continue/cancel | Yes | Yes | Yes |
| Packs | full lifecycle | full lifecycle | Yes | full lifecycle |
| **Teach evidence** | `submitTeachEvidence` | `submit_teach_evidence` | Yes | `submit_teach_evidence` |
| **Teach proposals** | create + review/evaluate/promote transition | Yes | Yes | create + transition |
| **Behavior Evaluation** | `startEvaluation`, `getEvaluation` | `start_evaluation`, `get_evaluation` | Yes | `start_evaluation` |
| **Response Quality & Decision** | `evaluateQuality` | `evaluate_quality` | `POST /v1/quality/evaluate` | No tool |
| Release | `createRelease` | `create_release` | Yes | `create_release` + Pack release |
| Runtime execute/resolve | Yes | Yes | Yes | `resolve_runtime` |
| Runtime capability attestation/resolution | Yes | Yes | Yes | No dedicated tool |
| Model-serving resolve/trace | Yes | Yes | Yes | No tool |
| Behavior capsule | `compileBehaviorCapsule` | current client equivalent | Yes | `compile_behavior_capsule` |
| Behavior projection | `serveBehaviorProjection` | current client equivalent | Yes | `serve_behavior_projection` |
| Deployment comparison/health | Yes | Yes | Yes | No tool |

## Capability discovery versus runtime capability negotiation

These are different layers:

- **Product capability discovery** answers: “What can this scoped credential use, and on which public surfaces?”
- **Runtime capability attestation/resolution** participates in governed runtime selection.

Use [Capability discovery](capability-discovery.md) before hard-coding assumptions about SDK, Python, MCP, API, or Studio availability.

## Two public authoring paths

### Direct canonical authoring

```text
SDK / Python / HTTP / MCP
→ Semantic Task
→ Behavior Point
→ Program / Strategy
→ validate / simulate
→ explicit activation or governed release path
```

### Pack authoring

```text
Pack candidate
→ import
→ install
→ evaluate
→ approve
→ release
```

Direct authoring is useful for incremental tools and Studio-style workflows. Packs remain useful when multiple related objects should move as one portable, reviewable bundle.

See [Canonical authoring](canonical-authoring.md).

## Product lifecycle

```text
Connect
→ Observe
→ Discover / Semantic Resolve
→ Author Task / Point / Program / Strategy
→ Teach AI proposal
→ Review
→ Behavior Evaluation
→ activate / approve / release as required
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
→ governed approval decision
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
