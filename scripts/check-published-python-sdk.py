"""Offline check for the installed, published tryvira-sdk contract.

This validates the Python method surface only. No Vira server, API key,
external model, released behavior or tool authorization is simulated.
"""
from __future__ import annotations

import json
from importlib.metadata import version
from pathlib import Path

from vira import ViraClient

versions = json.loads((Path(__file__).resolve().parents[1] / "package-versions.json").read_text())
expected = versions["pypi"]["tryvira-sdk"]
actual = version("tryvira-sdk")
if actual != expected:
    raise RuntimeError(f"Published Python SDK version mismatch: {actual} vs {expected}")

for name in (
    "connect_once",
    "test_connection",
    "observe",
    "evaluate_quality",
    "list_capabilities",
    "create_semantic_task",
    "create_behavior_point",
    "resolve_semantic",
    "resolve_runtime",
    "serve_behavior_projection",
    "import_pack",
    "install_pack",
    "evaluate_pack",
    "approve_pack",
    "release_pack",
    "submit_teach_evidence",
    "resolve_task_run",
    "start_task_run",
    "start_task_run_from_prompt",
    "get_task_run",
    "list_task_run_events",
    "continue_task_run",
    "retry_task_run",
    "cancel_task_run",
):
    if not callable(getattr(ViraClient, name, None)):
        raise RuntimeError(f"Published Python SDK missing method: {name}")

print(f"PUBLISHED_PYTHON_SDK_METHODS_PASS version={actual} methods=24 (offline only)")


# Cross-check the actual published Python SDK with the Skill's emitted
# scoped event using a fully local transport. This is SDK serialization
# testing, NOT server-side Observe admission or model verification.
from importlib.util import module_from_spec, spec_from_file_location
from typing import Any
import json as _json
skill_builder = Path(__file__).resolve().parents[1] / "skills" / "vira-observe" / "examples" / "observe_once.py"
spec = spec_from_file_location("skill_observe_example", skill_builder)
module = module_from_spec(spec)
assert spec is not None and spec.loader is not None
spec.loader.exec_module(module)
input_scope = {
    "organizationId": "org-a", "projectId": "project-a", "environmentId": "sandbox",
    "eventId": "event-a", "aiSystemId": "system-a", "connectionId": "connection-a"
}
event = module.build_event(input_scope)
received: list[Any] = []
def offline_transport(url, method, headers, body, timeout):
    received.append({"url":url,"method":method,"headers":dict(headers),"body":_json.loads(body)})
    return 202, {"x-request-id":"offline-serialization-test"}, b'{"accepted":true}'
with ViraClient("https://api.example.invalid",api_key="offline-only",transport=offline_transport) as client:
    response = client.observe(event, idempotency_key=event["eventId"])
assert response is not None and response.status == 202
assert len(received)==1
assert received[0]["method"]=="POST" and received[0]["url"].endswith("/v1/observations")
assert received[0]["headers"]["idempotency-key"] == event["eventId"]
for required_field in ("organizationId","projectId","environmentId","eventId","eventType","aiSystemId","connectionId"):
    assert received[0]["body"][required_field] == event[required_field]
for missing in ("organizationId","projectId","environmentId"):
    broken = dict(event)
    broken.pop(missing)
    try:
        with ViraClient("https://api.example.invalid",api_key="offline-only",transport=offline_transport) as client:
            client.observe(broken)
        raise AssertionError("Published Python SDK silently accepted missing scope")
    except ValueError as error:
        assert str(error)=="SDK_OBSERVATION_FIELD_REQUIRED"
print("PUBLISHED_PYTHON_SKILL_OBSERVE_ENVELOPE_PASS (mock transport, no live Vira API)")
