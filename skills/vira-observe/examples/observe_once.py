"""Live, explicitly authorized scoped Observe example for tryvira-sdk.

Required env: VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
VIRA_PROJECT_ID, VIRA_ENVIRONMENT_ID, VIRA_AI_SYSTEM_ID,
VIRA_CONNECTION_ID, VIRA_EVENT_ID and VIRA_ALLOW_OBSERVE=yes.
No customer prompt or secret is sent.
"""
import json
import os
from vira import ViraClient

def required(key: str) -> str:
    value = os.environ.get(key, "").strip()
    if not value:
        raise RuntimeError(f"{key} is required")
    return value

def build_event(scope: dict[str, str]) -> dict:
    names = ("organizationId", "projectId", "environmentId", "aiSystemId", "connectionId", "eventId")
    for name in names:
        if not isinstance(scope.get(name), str) or not scope[name].strip():
            raise ValueError(f"OBSERVE_REQUIRED_{name}")
    return {
        **{name: scope[name].strip() for name in names},
        "eventType": "model.response",
        "payload": {"status": "completed", "source": "vira-observe-skill-demo", "synthetic": True},
    }

def main() -> None:
    if os.getenv("VIRA_ALLOW_OBSERVE") != "yes":
        raise RuntimeError("VIRA_ALLOW_OBSERVE=yes required for actual event ingestion")
    base = required("VIRA_API_URL")
    if base.rstrip("/").endswith("/v1") or "example.invalid" in base:
        raise RuntimeError("VIRA_API_URL must be a real deployment root without /v1")
    scope = {
        "organizationId": required("VIRA_ORGANIZATION_ID"),
        "projectId": required("VIRA_PROJECT_ID"),
        "environmentId": required("VIRA_ENVIRONMENT_ID"),
        "aiSystemId": required("VIRA_AI_SYSTEM_ID"),
        "connectionId": required("VIRA_CONNECTION_ID"),
        "eventId": required("VIRA_EVENT_ID"),
    }
    event = build_event(scope)
    with ViraClient(base, api_key=required("VIRA_API_KEY")) as client:
        response = client.observe(event, idempotency_key=event["eventId"])
    print(json.dumps({
        "eventId": event["eventId"],
        "httpStatus": getattr(response, "status", None),
        "verifiedOutput": False,
        "note": "Observe admission is neither a Signal nor a verifier PASS."
    }, indent=2))
    if response is None or getattr(response, "status", 0) not in {200, 201, 202}:
        raise RuntimeError("OBSERVATION_NOT_ADMITTED")

if __name__ == "__main__":
    main()
