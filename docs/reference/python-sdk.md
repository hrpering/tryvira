# Python SDK reference

Package:

```text
vira-sdk
```

Runtime:

```text
Python >= 3.10
```

Import:

```python
from vira import ViraClient, ViraApiError
```

## Install

```bash
python -m pip install vira-sdk
```

## Create a client

```python
import os
from vira import ViraClient

client = ViraClient(
    os.environ["VIRA_API_URL"],
    api_key=os.environ.get("VIRA_API_KEY"),
    timeout=15.0,
    retries=2,
    failure_mode="throw",
)
```

Or use it as a context manager:

```python
with ViraClient(
    os.environ["VIRA_API_URL"],
    api_key=os.environ.get("VIRA_API_KEY"),
) as client:
    ...
```

## Response

```python
ViraResponse(
    status=200,
    body={...},
    request_id="..."
)
```

## Errors

```python
try:
    client.resolve_runtime({...})
except ViraApiError as error:
    print(error.status, error.request_id, error.body)
```

## Connection

`connect`, `connect_adapter`, and `connect_once` create the AI system and adapter connection. `connection_health`, `test_connection`, and `inventory` inspect the connection.

## Observations

`observe`, `observe_batch`, `trace`, `feedback`, and `outcome` submit evidence. The Python client also exposes agent-native lifecycle helpers such as workflow start/step/complete, action proposed/completed, checkpoint, handoff, and compensation observations.

## Signals

Python mirrors the reviewed Signal flow:

```text
create_signal_discovery_proposal
review_signal_discovery_proposal
materialize_signal_discovery
create_signal_mapping
get_signal_mapping
review_signal_mapping
```

Example:

```python
proposal = client.create_signal_discovery_proposal({
    "signalStableKey": "quality.missing_measurement",
    "evidenceEventIds": ["evt-001"],
    "suggestedProducerType": "observation_attribute",
    "suggestedProducerKey": "quality.missing_measurement",
    "confidence": 0.91,
})

proposal_id = proposal.body["proposal"]["id"]
client.review_signal_discovery_proposal(proposal_id, "APPROVE")
client.materialize_signal_discovery(proposal_id, {
    "valueType": "boolean",
    "description": "The response omitted required measurement",
})
```

## Semantic + Runtime

### `resolve_semantic(request, ...)`

```python
semantic = client.resolve_semantic({
    "input": "Build a launch plan for a membership product",
    "profile": {"domain": "marketing"},
})
```

### `resolve_runtime(request)`

```python
runtime = client.resolve_runtime({
    "behaviorPoint": "marketing.launch_plan",
    "executionBoundary": scope,
    "idempotencyKey": "runtime-001",
})
```

Advanced methods include `execute_runtime`, `compile_behavior_capsule`, and `serve_behavior_projection`.

## Behavior Programs

```text
list_behavior_programs
get_behavior_program
create_behavior_program
```

## Behavior Strategies

```text
list_behavior_strategies
get_behavior_strategy
create_behavior_strategy
validate_behavior_strategy
simulate_behavior_strategy
```

Advanced execution:

```text
start_strategy_execution
get_strategy_execution
get_strategy_execution_trace
continue_strategy_execution
cancel_strategy_execution
```

Public documentation keeps Strategy trace output high-level and does not reproduce internal receipt structures.

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

Lifecycle:

```text
import → install → evaluate → approve → release
```

## Discovery, Teach, Evaluation, Release

```text
list_discovery_candidates
submit_teach_evidence
teach
start_evaluation
get_evaluation
create_release
```

## Capabilities + model serving

Capability APIs:

```text
attest_host_capabilities
resolve_with_capabilities
trace_with_capabilities
```

Model-serving APIs:

```text
model_selection
served_trace
```

## Deployment health

```text
compare_rollout
rollout_health
```

Use advanced runtime and deployment methods only when your integration owns those responsibilities.
