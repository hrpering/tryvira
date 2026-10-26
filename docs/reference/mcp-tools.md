# MCP tool catalog

`@vira/mcp` exposes the current Vira tool catalog through MCP discovery.

Every call is scoped to the configured organization, project, and environment.

**Read** means the tool does not intentionally mutate Vira state.

**Effectful** means it can mutate state, trigger a governed runtime action, or advance a lifecycle and therefore remains authority-gated.

| Tool | Mode | Purpose |
| --- | --- | --- |
| `resolve_semantic` | Read | Resolve input through governed semantic runtime. |
| `resolve_runtime` | Effectful | Resolve a persisted Behavior Point through governed runtime. |
| `create_signal_discovery_proposal` | Effectful | Create an evidence-backed Signal proposal. |
| `review_signal_discovery_proposal` | Effectful | Approve or reject a Signal discovery proposal. |
| `materialize_signal_discovery` | Effectful | Materialize approved Signal definition + producer mapping. |
| `create_signal_mapping` | Effectful | Create a Signal producer mapping proposal. |
| `get_signal_mapping` | Read | Read one scoped Signal mapping. |
| `review_signal_mapping` | Effectful | Approve or reject a Signal mapping. |
| `list_behavior_programs` | Read | List scoped canonical Behavior Programs. |
| `list_behavior_strategies` | Read | List persisted Behavior Strategies. |
| `get_behavior_strategy` | Read | Read one Behavior Strategy. |
| `simulate_behavior_strategy` | Read | Run structural dry-run simulation. |
| `start_strategy_execution` | Effectful | Start a persisted Strategy execution. |
| `get_strategy_execution` | Read | Read execution state. |
| `get_strategy_execution_trace` | Read | Read authenticated execution trace evidence; public docs keep output simplified. |
| `continue_strategy_execution` | Effectful | Continue an existing waiting execution. |
| `cancel_strategy_execution` | Effectful | Cancel a non-terminal execution. |
| `list_ai_systems` | Read | List connected AI systems. |
| `list_discovery_candidates` | Read | List evidence-backed discovery candidates. |
| `review_discovery_candidate` | Effectful | Record a human discovery review decision. |
| `create_observation` | Effectful | Submit one scoped observation; does not publish behavior. |
| `start_evaluation` | Effectful | Start an evaluation for an existing artifact. |
| `compile_behavior_capsule` | Effectful | Compile a persisted scoped Behavior capsule. |
| `serve_behavior_projection` | Effectful | Serve active scoped behavior projection. |
| `list_packs` | Read | List scoped Packs. |
| `import_pack` | Effectful | Import and validate a Pack candidate. |
| `install_pack` | Effectful | Install/materialize Pack draft. |
| `evaluate_pack` | Effectful | Evaluate a Pack. |
| `approve_pack` | Effectful | Explicitly approve a Pack. |
| `release_pack` | Effectful | Release an approved Pack. |
| `preview_pack_upgrade` | Effectful | Preview incoming Pack upgrade. |

## Common scope fields

Tool schemas use:

```json
{
  "organizationId": "<organization>",
  "projectId": "<project>",
  "environmentId": "<environment>"
}
```

These values must match the MCP server's configured scope.

## Example: semantic resolution

```json
{
  "organizationId": "<organization>",
  "projectId": "<project>",
  "environmentId": "<environment>",
  "input": "Create a launch plan for a subscription product",
  "profile": {
    "domain": "marketing"
  }
}
```

## Example: runtime resolution

```json
{
  "organizationId": "<organization>",
  "projectId": "<project>",
  "environmentId": "<environment>",
  "behaviorPoint": "marketing.launch_plan",
  "executionBoundary": {
    "channel": "chat"
  }
}
```

`resolve_runtime` is effectful and can be denied even when the MCP connection is authenticated.

## Example: Signal discovery proposal

```json
{
  "organizationId": "<organization>",
  "projectId": "<project>",
  "environmentId": "<environment>",
  "signalStableKey": "quality.missing_measurement",
  "evidenceEventIds": ["evt-001"],
  "suggestedProducerType": "observation_attribute",
  "suggestedProducerKey": "quality.missing_measurement",
  "confidence": 0.91
}
```

Then review and materialize through:

```text
review_signal_discovery_proposal
→ materialize_signal_discovery
```

## Example: Pack lifecycle

```text
import_pack
→ install_pack
→ evaluate_pack
→ approve_pack
→ release_pack
```

Import is not activation.

## Strategy execution

Advanced Strategy tools require identities issued by Vira, such as the persisted artifact and runtime revision information.

Do not manufacture server-owned authority fields in an MCP host.

## Trace privacy

`get_strategy_execution_trace` is listed because it is a real MCP tool.

This public reference intentionally does not reproduce the internal response schema or raw receipt fields. Use the authenticated product trace surface for deeper incident analysis.
