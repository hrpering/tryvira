# Capability map

This page maps the current Vira capabilities to the public integration surfaces.

Legend:

- **Yes**: directly exposed on that surface.
- **Underlying routes**: available through HTTP primitives rather than the same convenience helper.
- **Partial**: related operations exist, but not the complete lifecycle.
- **No tool**: no dedicated MCP tool in the documented surface.

> Capability discovery and MCP `tools/list` are the runtime source of truth for a scoped deployment. Do not turn this documentation table into a client-side allowlist.

| Capability | JavaScript `@tryvira/sdk` | Python `tryvira-sdk` | HTTP | MCP `@tryvira/mcp` |
| --- | --- | --- | --- | --- |
| **Product capability discovery** | `listCapabilities` | `list_capabilities` | `GET /v1/capabilities` | `list_capabilities` |
| List/read AI systems | `listAISystems`, `getAISystem` | `list_ai_systems`, `get_ai_system` | Yes | No tool |
| Connect system | `connectSystem` | `connect` | Yes | No create/connect tool |
| Connect adapter | `connectAdapter` | `connect_adapter` | Yes | No tool |
| **Connect once** | **`connectOnce`** | **`connect_once`** | underlying routes | No tool |
| Connection health/test | `connectionHealth`, `testConnection` | `connection_health`, `test_connection` | Yes | No tool |
| Inventory | `inventory` | `inventory` | Yes | No tool |
| Confirmed deletion of eligible AI system / Task / Point / Strategy | `deleteAISystem`, `deleteSemanticTask`, `deleteBehaviorPoint`, `deleteBehaviorStrategy` | snake_case equivalents | DELETE routes | No tool |
| Observe / trace / feedback / outcome | Yes | Yes | Yes | No tool |
| Observation batch / SDK delivery | Yes | Yes | Yes | No tool |
| **Semantic Task authoring** | list/create/delete | list/create/delete | list/create/read/delete | list/create |
| **Behavior Point authoring** | list/create/delete | list/create/delete | list/create/read/delete | list/create |
| Semantic resolve | `resolveSemantic` | `resolve_semantic` | Yes | `resolve_semantic` |
| Semantic → runtime convenience | `resolveSemanticRuntime` | supported client flow | underlying routes | separate tools |
| Boundary-first runtime resolve | `resolveBoundary` / `resolveRuntime` | current client equivalents | Yes | `resolve_runtime` |
| Signal discovery/mapping | Yes | Yes | governed routes | No tool |
| Behavior Programs | list/get/create | list/get/create | Yes | list |
| Strategy definitions | list/get/create/variant/validate/simulate/**activate**/delete | Yes | Yes | list only |
| **Strategy execution** | start/get/trace/continue/cancel | Yes | Yes | No tool |
| Packs | import/install/evaluate/approve/release/**upgrade preview** | same | Yes | No tool |
| **Teach evidence** | `submitTeachEvidence` | `submit_teach_evidence` | Yes | `submit_teach_evidence` |
| **Teach proposals** | create + review/evaluate/promote transition | Yes | Yes | create only |
| **Behavior Evaluation** | `startEvaluation`, `getEvaluation` | `start_evaluation`, `get_evaluation` | Yes | No tool |
| **Response Quality & Decision** | `evaluateQuality` | `evaluate_quality` | `POST /v1/quality/evaluate` | No dedicated tool |
| Release | `createRelease` | `create_release` | Yes | No tool |
| Runtime execute/resolve | Yes | Yes | Yes | `resolve_runtime` only |
| Runtime capability attestation/resolution | Yes | Yes | Yes | No dedicated tool |
| Model-serving resolve/trace | Yes | Yes | Yes | No dedicated tool |
| Behavior capsule | `compileBehaviorCapsule` | current client equivalent | Yes | No tool |
| Behavior projection | `serveBehaviorProjection` | current client equivalent | Yes | No tool |
| Deployment comparison/health | Yes | Yes | Yes | No dedicated tool |

Confirmed deletion is a distinct effectful lifecycle. It requires explicit confirmation and can be denied for active, referenced, in-use, or otherwise ineligible resources. It is not rollback and it does not erase release/audit semantics by client fiat.

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
→ import / parse / validate
→ inventory / conflicts / configuration
→ install / materialize canonical draft
→ evaluate
→ approve
→ release
→ runtime
```

Import or installation does not silently activate behavior. Before changing an installed Pack, use upgrade preview to inspect incoming changes, preserved overrides, and conflicts.

Direct authoring is useful for incremental tools and Studio-style workflows. Packs remain useful when multiple related objects should move as one portable, reviewable bundle.

See [Canonical authoring](canonical-authoring.md) and [Packs](packs.md).

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
→ Receipt / Trace / Outcome
→ optional Response Quality & Decision
→ re-evaluate / Teach again
```

Semantic selection is not authority. Runtime consumes governed eligible identity through the authority boundary.

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
