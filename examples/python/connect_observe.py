"""Connect one scoped AI System and ingest a sanitized observation.

Requires VIRA_ALLOW_OBSERVE=yes and a provisioned non-production Vira API.
Admission is not proof of Teach, released behavior or verifier PASS.
"""
from __future__ import annotations

import json
import os
from uuid import uuid4
from collections.abc import Mapping


def required(env: Mapping[str, str], key: str) -> str:
    value = str(env.get(key, "")).strip()
    if not value:
        raise RuntimeError(f"{key} is required")
    return value


def build_observation(scope: Mapping[str, str], *, event_id: str, system_id: str, connection_id: str) -> dict:
    fields = ("organizationId", "projectId", "environmentId")
    for field in fields:
        required(scope, field)
    for field, value in (("eventId", event_id), ("aiSystemId", system_id), ("connectionId", connection_id)):
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"OBSERVE_REQUIRED_{field}")
    return {
        **{key: scope[key] for key in fields},
        "eventId": event_id,
        "eventType": "model.response",
        "aiSystemId": system_id,
        "connectionId": connection_id,
        "payload": {"status": "completed", "synthetic": True, "source": "public-connect-observe"},
    }


def run_connect_observe(client, env: Mapping[str, str], make_id=None) -> dict:
    if env.get("VIRA_ALLOW_OBSERVE") != "yes":
        raise RuntimeError("VIRA_ALLOW_OBSERVE=yes required before creating connection/evidence")
    make_id = make_id or (lambda: str(uuid4()))
    scope = {
        "organizationId": required(env, "VIRA_ORGANIZATION_ID"),
        "projectId": required(env, "VIRA_PROJECT_ID"),
        "environmentId": required(env, "VIRA_ENVIRONMENT_ID"),
    }
    connected = client.connect_once(
        env.get("VIRA_CONNECTION_NAME", "").strip() or "public-python-example-agent",
        "custom-agent", scope, "custom-python", "1",
        idempotency_key=env.get("VIRA_CONNECT_IDEMPOTENCY_KEY", "").strip() or f"public:connect:{make_id()}",
    )
    body = getattr(connected, "body", None)
    if not isinstance(body, Mapping):
        raise RuntimeError("CONNECTION_READBACK_MISSING")
    system = body.get("system")
    connection = body.get("connection")
    system_id = system.get("id") if isinstance(system, Mapping) else None
    connection_id = connection.get("id") if isinstance(connection, Mapping) else None
    if not system_id or not connection_id:
        raise RuntimeError("CONNECTION_READBACK_MISSING")
    event = build_observation(scope,
        event_id=env.get("VIRA_EVENT_ID", "").strip() or make_id(),
        system_id=str(system_id), connection_id=str(connection_id))
    result = client.observe(event, idempotency_key=event["eventId"])
    status = getattr(result, "status", None)
    if status not in (200, 201, 202):
        raise RuntimeError("OBSERVATION_NOT_ADMITTED")
    return {
        "stage": "connect_observe",
        "observedHttpStatus": status,
        "requestId": getattr(result, "request_id", None),
        "eventId": event["eventId"],
        "verifiedOutput": False,
        "note": "Observation admission is not Teach, release or post-model verification.",
    }


def main() -> None:
    from vira import ViraClient
    env = os.environ
    api_url = required(env, "VIRA_API_URL")
    if "example.invalid" in api_url or api_url.rstrip("/").endswith("/v1"):
        raise RuntimeError("VIRA_API_URL must be the real API deployment root without /v1")
    api_key = required(env, "VIRA_API_KEY")
    with ViraClient(api_url, api_key=api_key) as client:
        result = run_connect_observe(client, env)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
