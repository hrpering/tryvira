# Python SDK reference

Published package: `tryvira-sdk` (`0.1.43`). Runtime: Python 3.10+.

```bash
python -m pip install tryvira-sdk==0.1.43
```

```python
from vira import ViraClient, ViraApiError
```

The package is MIT-licensed. The Vira service/backend are governed separately.

The complete method-to-skill mapping for this published package is in the [SDK method inventory](sdk-method-inventory.md). Registry verification compares the callable public `ViraClient` method set with that inventory.

The Python SDK is a thin client of the same scoped authority boundary as the JavaScript SDK. It must not create a second local behavior authority, release behavior locally, or treat semantic classification as authorization.

## Client configuration

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

Use placeholders in checked-in examples. Never commit real credentials, tenant identifiers, production traces, or private endpoints.

## Recommended lifecycle

```text
connect_once
→ observe / trace / feedback / outcome
→ list_capabilities
→ resolve_semantic
→ author or select governed behavior
→ evaluate / approve / release where required
→ resolve_runtime / execute_runtime
→ receipt / trace / outcome
→ Teach / re-evaluate
```

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
delete_ai_system
```

```python
scope = {
    "organizationId": os.environ["VIRA_ORGANIZATION_ID"],
    "projectId": os.environ["VIRA_PROJECT_ID"],
    "environmentId": os.environ["VIRA_ENVIRONMENT_ID"],
}

connected = client.connect_once(
    "my-agent",
    "custom-agent",
    scope,
    "custom-python",
    "1",
    idempotency_key="connect:my-agent:v1",
)
```

## Scoped capability discovery

```python
capabilities = client.list_capabilities(surface="python")
```

Do not assume every credential/deployment exposes every operation. Product capability discovery is separate from runtime capability attestation/resolution.

## Observations

```text
observe
observe_batch
trace
feedback
outcome
```

Observations are evidence and do not activate behavior.

## Canonical authoring

Semantic Tasks:

```text
list_semantic_tasks
create_semantic_task
delete_semantic_task
```

Behavior Points:

```text
list_behavior_points
create_behavior_point
delete_behavior_point
```

```python
task = client.create_semantic_task({
    "taskKey": "marketing.launch_plan",
    "description": "Create a measurable launch plan",
    "examples": ["Build a launch plan for a membership product"],
    "negativeExamples": ["Write a single ad headline"],
})

task_id = task.body["task"]["id"]

point = client.create_behavior_point({
    "key": "marketing.launch_plan",
    "taskId": task_id,
    "constraints": [
        "cover the required funnel stages",
        "include a measurement approach",
    ],
})
```

## Explicit deletion

The current Python client exposes confirmed deletion helpers:

```text
delete_ai_system
delete_semantic_task
delete_behavior_point
delete_behavior_strategy
```

Deletion must be explicitly confirmed, is idempotency-aware, and remains server-authorized. Active/in-use/ineligible resources can be rejected.

```python
client.delete_semantic_task(
    task_id,
    confirm=True,
    idempotency_key=f"delete:semantic-task:{task_id}",
)
```

Do not use deletion to imitate rollback, release history, or deactivation.

## Signals

```text
create_signal_discovery_proposal
review_signal_discovery_proposal
materialize_signal_discovery
create_signal_mapping
get_signal_mapping
review_signal_mapping
```

## Semantic and runtime

Use `resolve_semantic` for candidate/evidence selection. Use `resolve_runtime` / `execute_runtime` for the authority-gated runtime boundary. A semantic result is not authorization. The Python method accepts the request mapping and forwards the documented runtime fields:

```python
runtime = client.resolve_runtime({
    "behaviorPoint": "support.answer",
    "executionBoundary": scope,
    "idempotencyKey": "runtime:support:request-001",
})
```

Reuse the idempotency key when retrying the same logical request. Inspect the returned status, denial/abstention, receipt, and request ID; do not infer permission from semantic selection alone. The isolated [framework-boundary helper](../../examples/frameworks/python_fastapi/vira_boundary.py) demonstrates input validation and result preservation without making a live service call.

## Behavior Programs

```text
list_behavior_programs
get_behavior_program
create_behavior_program
```

## Behavior Strategies

Definition/lifecycle:

```text
list_behavior_strategies
get_behavior_strategy
create_behavior_strategy
create_behavior_strategy_variant
validate_behavior_strategy
simulate_behavior_strategy
activate_behavior_strategy
delete_behavior_strategy
```

Execution:

```text
start_strategy_execution
get_strategy_execution
get_strategy_execution_trace
continue_strategy_execution
cancel_strategy_execution
```

Continue a waiting execution with the existing authority digest plus state/references instead of starting a replacement execution to bypass the wait state.

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
import
→ parse / validate / inventory conflicts
→ configure
→ install/materialize draft
→ evaluate
→ approve
→ release
```

Python signatures are `install_pack(pack_id, variables)` and `evaluate_pack(pack_id, {"evaluationId": evaluation_id})`. The latter requires a persisted trusted evaluation bound to the exact Pack digest. Import never activates behavior. See [Packs](../packs.md).

## Teach AI

```text
submit_teach_evidence
create_teach_analysis / get_teach_analysis
create_teach_proposal
transition_teach_proposal
```

`create_teach_analysis(evidence_ids, analysis_id=..., control_point_id=..., summary=..., idempotency_key=...)` starts an asynchronous analysis. Check for HTTP 202, retain the returned `analysisId`, and call `get_teach_analysis(analysis_id)` to read its persisted state. Proposal transitions include `review`, `evaluate`, and `promote`. Promotion does not silently grant runtime release authority.

## Behavior Evaluation

```text
start_evaluation
get_evaluation
start_comparative_evaluation
get_evaluation_comparison
review_comparative_finding
create_evaluation_plan
get_evaluation_plan
seal_evaluation_plan
```

Comparative evaluation is server-executed and requires a `comparisonPlan`; the client must not supply arm outputs as evidence. Sealing a plan is not behavior approval or release.

## Improvement and revision lifecycle

```text
create_improvement_proposal
get_improvement_proposal
review_improvement_proposal
edit_improvement_proposal_as_new
create_behavior_revision_candidate
evaluate_behavior_revision_candidate
transition_behavior_revision_candidate
create_pack_revision
get_pack_revision
get_pack_revision_diff
transition_pack_revision
materialize_pack_revision
```

Read each server-returned identity and digest before continuing. Proposal review, candidate evaluation/acceptance, Pack revision validation/approval/release, and materialization are separate transitions. Do not guess a request schema from the generic mapping type; check the [HTTP API reference](api.md) and installed SDK signature.

## Response Quality & Decision

```text
evaluate_quality
```

This evaluates bounded response candidates. It is separate from Behavior Evaluation and does not grant release authority.

## Release

```text
create_release
create_manual_release
release_program_manually
```

Preserve returned request, receipt and trace identifiers for support/audit.

The package has no `rollback` method. Rollback restores a previously known eligible canonical identity through the release workflow, followed by runtime readback. Deletion does not provide rollback semantics.

## Advanced runtime surfaces

The Python SDK mirrors the supported JavaScript client surface for runtime capability attestation/resolution, model-serving selection/traces, behavior capsule/projection, deployment evidence, and other versioned public operations.

To request the separately served behavior projection, use `serve_behavior_projection`; do not assume `resolve_runtime` has the JavaScript `RuntimeResolution` response fields. The SDK requires `input` and `provider` and accepts optional `programId`, `model`, `protocol`, and `idempotencyKey`:

```python
response = client.serve_behavior_projection({
    "input": "Draft a reply to this support request",
    "provider": "openai",
    "protocol": "generic-chat",
    "idempotencyKey": "projection:support:request-001",
})
projection = response.body.get("projection") if response and isinstance(response.body, dict) else None
rendered = projection.get("rendered") if isinstance(projection, dict) else None
if not isinstance(rendered, str) or not rendered.strip():
    raise RuntimeError("Vira returned no usable behavior projection")
# Treat rendered content as model guidance; apply separate app authorization
# before any tool call or external side effect.
rendered_behavior = rendered
projection_digest = projection.get("projectionDigest")
```

The active promoted projection may be selected by the authenticated Vira scope when `programId` is omitted. Keep the SDK credential server-side and preserve the returned receipt/request identifiers. See the runnable [FastAPI projection example](../../examples/frameworks/python_fastapi/README.md).

## Errors, retries and failure modes

The default client failure mode raises `ViraApiError`. GETs are safely retryable. Mutations should only be retried with an idempotency key. Observation-only telemetry may intentionally use `failure_mode="open"`; enforcing runtime/effectful calls should remain fail-closed.

## End-to-end guide

See [Developer guide](../developer-guide.md).
