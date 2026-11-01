# MCP tool catalog

`@tryvira/mcp` `0.1.14` exposes Vira's MCP-facing public tool surface.

Every call is scoped to the configured organization, project, and environment.

- **Read**: does not intentionally mutate Vira state.
- **Effectful**: can mutate state, advance a lifecycle, or trigger governed runtime work and therefore requires authorization.

> The installed MCP package/server is the source of truth. Always run `server/discover`, `initialize`, and `tools/list` instead of hard-coding this catalog into an integration.

## Capability discovery and canonical authoring

| Tool | Mode | Purpose |
| --- | --- | --- |
| `list_capabilities` | Read | Show which scoped Vira capabilities are available and on which public surfaces. |
| `list_semantic_tasks` | Read | List scoped Semantic Tasks. |
| `create_semantic_task` | Effectful | Create a scoped Semantic Task for governed authoring. |
| `list_behavior_points` | Read | List scoped canonical Behavior Points. |
| `create_behavior_point` | Effectful | Create a Behavior Point bound to one or more Semantic Tasks. |
| `activate_behavior_strategy` | Effectful | Explicitly activate a validated Strategy revision. |

## Explicit deletion

Deletion tools are effectful, require explicit confirmation, and remain subject to scope/authority checks. They are intended for resources that are eligible for deletion, not as a way to bypass release/history rules.

| Tool | Mode | Purpose |
| --- | --- | --- |
| `delete_ai_system` | Effectful | Delete an eligible unused AI system after `confirm: true`. |
| `delete_semantic_task` | Effectful | Delete an eligible unused Semantic Task after `confirm: true`. |
| `delete_behavior_point` | Effectful | Delete an eligible unused Behavior Point after `confirm: true`. |
| `delete_behavior_strategy` | Effectful | Delete an eligible non-active unused Strategy after `confirm: true`. |

## Teach and release lifecycle

| Tool | Mode | Purpose |
| --- | --- | --- |
| `submit_teach_evidence` | Effectful | Submit scoped evidence to Teach AI. |
| `create_teach_proposal` | Effectful | Create a Teach proposal from admitted evidence. |
| `transition_teach_proposal` | Effectful | Review, evaluate, or promote a Teach proposal. |
| `create_release` | Effectful | Create a scoped release after the required governed lifecycle. |

Promotion is not a hidden release shortcut. Release authority remains explicit.

## Core resolution and Signals

| Tool | Mode | Purpose |
| --- | --- | --- |
| `resolve_semantic` | Read | Resolve input through governed semantic routing. |
| `resolve_runtime` | Effectful | Resolve governed runtime behavior from a Behavior Point and/or semantic context. |
| `create_signal_discovery_proposal` | Effectful | Create an evidence-backed Signal proposal. |
| `review_signal_discovery_proposal` | Effectful | Approve/reject a Signal discovery proposal. |
| `materialize_signal_discovery` | Effectful | Materialize an approved Signal definition + mapping. |
| `create_signal_mapping` | Effectful | Create a Signal producer mapping proposal. |
| `get_signal_mapping` | Read | Read one scoped Signal mapping. |
| `review_signal_mapping` | Effectful | Approve/reject a Signal mapping. |

`resolve_semantic` returns candidate/evidence information. It does not grant runtime authority. `resolve_runtime` remains subject to scope, role, policy, release state, digest and authority checks.

## Programs and Strategies

| Tool | Mode | Purpose |
| --- | --- | --- |
| `list_behavior_programs` | Read | List scoped Behavior Programs. |
| `list_behavior_strategies` | Read | List persisted Strategy revisions. |
| `get_behavior_strategy` | Read | Read one Strategy definition/artifact binding. |
| `simulate_behavior_strategy` | Read | Run structural dry-run simulation. |

## Advanced Strategy execution

| Tool | Mode | Purpose |
| --- | --- | --- |
| `start_strategy_execution` | Effectful | Start a persisted eligible Strategy execution. |
| `get_strategy_execution` | Read | Read one scoped Strategy execution. |
| `get_strategy_execution_trace` | Read | Read persisted Strategy step trace/receipts. |
| `continue_strategy_execution` | Effectful | Continue a waiting execution with its pinned authority digest, state and references. |
| `cancel_strategy_execution` | Effectful | Cancel a non-terminal execution. |

A waiting execution should be continued. Do not start a replacement execution merely to work around `WAITING_USER` or `WAITING_HOST`.

## Connected systems, discovery, observations, evaluation

| Tool | Mode | Purpose |
| --- | --- | --- |
| `list_ai_systems` | Read | List connected AI systems. |
| `list_discovery_candidates` | Read | List evidence-backed discovery candidates. |
| `review_discovery_candidate` | Effectful | Record a review decision for a discovery candidate. |
| `create_observation` | Effectful | Submit one scoped observation; does not publish behavior. |
| `start_evaluation` | Effectful | Start Behavior Evaluation for an existing artifact. |

## Behavior runtime representation

| Tool | Mode | Purpose |
| --- | --- | --- |
| `compile_behavior_capsule` | Effectful | Compile a scoped behavior capsule/receipt. |
| `serve_behavior_projection` | Effectful | Serve the active behavior projection through the governed runtime boundary. |

## Packs

| Tool | Mode | Purpose |
| --- | --- | --- |
| `list_packs` | Read | List scoped Packs. |
| `import_pack` | Effectful | Import/parse a Pack candidate. Import does not activate behavior. |
| `install_pack` | Effectful | Install/materialize Pack draft objects into canonical repositories. |
| `evaluate_pack` | Effectful | Evaluate a materialized Pack candidate. |
| `approve_pack` | Effectful | Explicitly approve an eligible Pack. |
| `release_pack` | Effectful | Release an approved Pack through the authority boundary. |
| `preview_pack_upgrade` | Effectful | Preview an incoming Pack upgrade and conflicts before applying it. |

## 0.1.14 documented tool snapshot

The current `0.1.14` source contract contains **45 MCP tools**. Treat this as a documentation snapshot, not as a client-side allowlist. Use `tools/list` at runtime because a deployed/scoped server remains authoritative.

```text
list_capabilities
list_semantic_tasks
create_semantic_task
list_behavior_points
create_behavior_point
activate_behavior_strategy
submit_teach_evidence
create_teach_proposal
transition_teach_proposal
create_release
resolve_semantic
resolve_runtime
create_signal_discovery_proposal
review_signal_discovery_proposal
materialize_signal_discovery
create_signal_mapping
get_signal_mapping
review_signal_mapping
list_behavior_programs
list_behavior_strategies
get_behavior_strategy
simulate_behavior_strategy
start_strategy_execution
get_strategy_execution
get_strategy_execution_trace
continue_strategy_execution
cancel_strategy_execution
list_ai_systems
delete_ai_system
delete_semantic_task
delete_behavior_point
delete_behavior_strategy
list_discovery_candidates
review_discovery_candidate
create_observation
start_evaluation
compile_behavior_capsule
serve_behavior_projection
list_packs
import_pack
install_pack
evaluate_pack
approve_pack
release_pack
preview_pack_upgrade
```

## Surface differences

MCP intentionally does not have to mirror every SDK convenience method.

Operations that remain better represented on JavaScript, Python, or HTTP surfaces include client-side connect-once/adapter helpers, Response Quality & Decision, runtime capability attestation/resolution, model-serving traces, and deployment evidence unless the current MCP server advertises an equivalent tool.

Use `list_capabilities` and `tools/list` to discover the current scoped surface instead of relying on a version-old assumption.

See [MCP integration](mcp.md), [Capability discovery](../capability-discovery.md), and [Developer guide](../developer-guide.md).
