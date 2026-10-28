# MCP tool catalog

`@tryvira/mcp` exposes the current Vira MCP tool catalog. The current package surface contains **31 tools**.

Every call is scoped to the configured organization, project, and environment.

- **Read**: does not intentionally mutate Vira state.
- **Effectful**: can mutate state, advance a lifecycle, or trigger governed runtime work and therefore requires authorization.

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

## Not currently MCP tools

The current package does **not** expose dedicated tools for `connectOnce`, Teach evidence submission, Response Quality & Decision, capability attestation/model-serving selection, or deployment comparison/health recording.

Use the JavaScript SDK, Python SDK, or HTTP surface for those capabilities.
