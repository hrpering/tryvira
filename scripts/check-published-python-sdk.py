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

print(f"PUBLISHED_PYTHON_SDK_METHODS_PASS version={actual} methods=8 (offline only)")
