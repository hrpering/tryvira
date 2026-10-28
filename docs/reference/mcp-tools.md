# MCP tool catalog

`@tryvira/mcp` `0.1.6` exposes the current Vira MCP tool catalog. The current package surface contains **41 tools**.

Every call is scoped to the configured organization, project, and environment.

- **Read**: does not intentionally mutate Vira state.
- **Effectful**: can mutate state, advance a lifecycle, or trigger governed runtime work and therefore requires authorization.

## Capability discovery and canonical authoring

| Tool | Mode | Purpose |
| --- | --- | --- |
| `list_capabilities` | Read | Show which scoped Vira capabilities are available and on which public surfaces. |
| `list_semantic_tasks` | Read | List scoped Semantic Tasks. |
| `create_semantic_task` | Effectful | Create a scoped Semantic Task for governed authoring. |
| `list_behavior_points` | Read | List scoped canonical Behavior Points. |
| `create_behavior_point` | Effectful | Create a Behavior Point bound to one or more Semantic Tasks. |
| `activate_behavior_strategy` | Effectful | Explicitly activate a validated Strategy revision. |

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
| `start_strategy_execution` | Effectful | Start a persisted Strategy execution. |
| `get_strategy_execution` | Read | Read one scoped Strategy execution. |
| `get_strategy_execution_trace` | Read | Read persisted Strategy step trace/receipts. |
| `continue_strategy_execution` | Effectful | Continue a waiting execution with pinned state/references. |
| `cancel_strategy_execution` | Effectful | Cancel a non-terminal execution. |

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
| `import_pack` | Effectful | Import and validate a Pack candidate. |
| `install_pack` | Effectful | Install/materialize Pack draft. |
| `evaluate_pack` | Effectful | Evaluate a Pack. |
| `approve_pack` | Effectful | Explicitly approve a Pack. |
| `release_pack` | Effectful | Release an approved Pack. |
| `preview_pack_upgrade` | Effectful | Preview an incoming Pack upgrade. |

## Current 41-tool list

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

## Not currently MCP tools

The current package does **not** expose dedicated MCP tools for:

- `connectOnce` / adapter connection helpers;
- Response Quality & Decision (`evaluateQuality` / `evaluate_quality`);
- runtime capability attestation/resolution;
- model-serving selection/traces;
- deployment comparison/health recording.

Use JavaScript, Python, or HTTP for those capabilities. Use `list_capabilities` to discover the current scoped product surface rather than assuming every integration exposes identical operations.
