# Python SDK reference

Published package: `tryvira-sdk` (`0.1.6`). Runtime: Python 3.10+.

```bash
python -m pip install tryvira-sdk
```

```python
from vira import ViraClient, ViraApiError
```

The package is MIT-licensed. The Vira service/backend are governed separately.

## Connected systems

```text
list_ai_systems
get_ai_system
connect
connect_adapter
connect_once
connection_health
test_connection
inventory
```

`connect_once` is the recommended convenience flow and returns system + connection + handshake state.

## Scoped capability discovery

```text
list_capabilities
```

```python
capabilities = client.list_capabilities(surface="python")
```

This discovers product capabilities for the current scope/surface. Runtime capability attestation/resolution is a separate concern.

## Observations

```text
observe
observe_batch
trace
feedback
outcome
```

The current client also exposes agent-native observation helpers for workflow/action/checkpoint/handoff style events.

## Canonical authoring

Semantic Tasks:

```text
list_semantic_tasks
create_semantic_task
```

Behavior Points:

```text
list_behavior_points
create_behavior_point
```

Example:

```python
task = client.create_semantic_task({
    "taskKey": "marketing.launch_plan",
    "description": "Create a measurable launch plan",
    "examples": ["Build a launch plan for a membership product"],
    "negativeExamples": ["Write a single ad headline"],
})

task_id = task.body["task"]["id"]

client.create_behavior_point({
    "key": "marketing.launch_plan",
    "taskId": task_id,
    "constraints": ["cover required funnel stages", "include measurement"],
})
```

See [Canonical authoring](../canonical-authoring.md).

## Signals

```text
create_signal_discovery_proposal
review_signal_discovery_proposal
materialize_signal_discovery
create_signal_mapping
get_signal_mapping
review_signal_mapping
```

## Semantic + Runtime

Common operations include `resolve_semantic`, `resolve_runtime`, and `execute_runtime`. Use semantic results as evidence, not authorization.

## Behavior Programs

```text
list_behavior_programs
get_behavior_program
create_behavior_program
```

## Behavior Strategies

Definitions and lifecycle:

```text
list_behavior_strategies
get_behavior_strategy
create_behavior_strategy
create_behavior_strategy_variant
validate_behavior_strategy
simulate_behavior_strategy
activate_behavior_strategy
```

Activation is explicit and server-side. It does not replace evaluation/release/runtime eligibility checks that apply to the target flow.

Execution:

```text
start_strategy_execution
get_strategy_execution
get_strategy_execution_trace
continue_strategy_execution
cancel_strategy_execution
```

## Packs

```text
list_packs
import_pack
install_pack
evaluate_pack
approve_pack
release_pack
preview_pack_upgrade
```

## Teach AI

```text
submit_teach_evidence
create_teach_proposal
transition_teach_proposal
```

Allowed proposal transitions are:

```text
review
evaluate
promote
```

Promotion still does not silently grant release authority.

## Behavior Evaluation

```text
start_evaluation
get_evaluation
```

## Response Quality & Decision

```text
evaluate_quality
```

```python
result = client.evaluate_quality({
    "request": "Evaluate risks and next steps",
    "candidates": [
        {"id": "initial", "output": "Generic response"},
        {"id": "repair", "output": "Risks and next steps with explicit assumptions"},
    ],
    "allowedIds": ["initial", "repair"],
    "requiredTerms": ["risks", "next steps"],
    "threshold": 0.7,
})
```

## Release

```text
create_release
```

## Advanced runtime surfaces

The current Python client mirrors advanced runtime capabilities available to the JavaScript client, including runtime capability attestation/resolution, model-serving selection/traces, behavior capsule/projection, and deployment evidence.

See [Capability map](../capability-map.md).
