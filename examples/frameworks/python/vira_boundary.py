"""Server-side adapter around the public Python SDK runtime resolver."""
from collections.abc import Mapping
from typing import Any


def resolve_vira_boundary(
    vira: Any,
    *,
    behavior_point: str,
    scope: Mapping[str, str],
    idempotency_key: str,
) -> Any:
    """Resolve governed behavior without converting the result into authority locally."""
    if not callable(getattr(vira, "resolve_runtime", None)):
        raise TypeError("A published ViraClient with resolve_runtime is required")
    if not behavior_point or not all(
        scope.get(key) for key in ("organizationId", "projectId", "environmentId")
    ):
        raise ValueError("behavior_point and complete Vira execution scope are required")
    if not idempotency_key:
        raise ValueError("A stable idempotency_key is required for this logical request")

    return vira.resolve_runtime(
        {
            "behaviorPoint": behavior_point,
            "executionBoundary": dict(scope),
            "idempotencyKey": idempotency_key,
        }
    )
