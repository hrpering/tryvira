"""Server-side adapter around the published Python SDK projection method."""
from collections.abc import Mapping
from typing import Any


def serve_vira_projection(
    vira: Any,
    *,
    message: str,
    provider: str,
    scope: Mapping[str, str],
    idempotency_key: str,
    program_id: str | None = None,
    model: str | None = None,
    protocol: str = "generic-chat",
):
    method = getattr(vira, "serve_behavior_projection", None)
    if not callable(method):
        raise TypeError("ViraClient with serve_behavior_projection is required")
    if not message.strip() or not provider.strip():
        raise ValueError("message and provider are required")
    if not all(scope.get(key) for key in ("organizationId", "projectId", "environmentId")):
        raise ValueError("complete Vira scope is required")
    if not idempotency_key:
        raise ValueError("idempotency key is required")
    request = {
        "input": message,
        "provider": provider,
        "protocol": protocol,
        "idempotencyKey": idempotency_key,
    }
    if program_id:
        request["programId"] = program_id
    if model:
        request["model"] = model
    return method(request)
