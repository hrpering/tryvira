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
