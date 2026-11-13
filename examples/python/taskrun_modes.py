"""Route public Vira TaskRuns without inventing server outcomes.

By default, this script requests a route proposal only. A live customer Vira
account is required for routing. Admission is an explicit opt-in, with a
second assertion that the endpoint belongs to an authorized test scope.

Usage from examples/python after installing tryvira-sdk==0.1.44:
    python taskrun_modes.py AUTO
    python taskrun_modes.py SINGLE
    python taskrun_modes.py STRATEGY
    python taskrun_modes.py COMPOUND
    python taskrun_modes.py HYBRID

Required environment: VIRA_API_URL and VIRA_API_KEY.
Optional: VIRA_TASKRUN_INPUT, VIRA_TASKRUN_HOST_CAPABILITIES,
          VIRA_TASKRUN_HYBRID_PLAN_JSON, VIRA_CONNECTION_ID.
"""
from __future__ import annotations

import json
import os
import sys
from collections.abc import Mapping
from uuid import uuid4

from vira import ViraClient

MODES = {"AUTO", "SINGLE", "STRATEGY", "COMPOUND", "HYBRID"}


def require(key: str) -> str:
    value = os.environ.get(key, "")
    if not value.strip():
        raise RuntimeError(f"{key} is required")
    return value


def body_mapping(response: object) -> Mapping:
    body = getattr(response, "body", None)
    return body if isinstance(body, Mapping) else {}


def main() -> None:
    mode = (sys.argv[1] if len(sys.argv) > 1 else "AUTO").upper()
    if mode not in MODES:
        raise SystemExit("Usage: python taskrun_modes.py [AUTO|SINGLE|STRATEGY|COMPOUND|HYBRID]")

    api_url = require("VIRA_API_URL")
    api_key = require("VIRA_API_KEY")
    prompt = os.environ.get("VIRA_TASKRUN_INPUT", "Summarize this support incident and note missing evidence")
    request: dict = {"input": prompt, "requestedMode": mode}

    if os.environ.get("VIRA_CONNECTION_ID"):
        request["connectionId"] = os.environ["VIRA_CONNECTION_ID"]
    capabilities = [x.strip() for x in os.environ.get("VIRA_TASKRUN_HOST_CAPABILITIES", "").split(",") if x.strip()]
    if capabilities:
        request["hostCapabilities"] = capabilities
    if os.environ.get("VIRA_TASKRUN_HYBRID_PLAN_JSON"):
        plan = json.loads(os.environ["VIRA_TASKRUN_HYBRID_PLAN_JSON"])
        if not isinstance(plan, list) or not plan or any(
            not isinstance(item, dict)
            or not isinstance(item.get("semanticTaskKey"), str)
            or item.get("mode") not in {"SINGLE", "STRATEGY"} for item in plan
        ):
            raise RuntimeError("Hybrid plan must contain registered task keys with SINGLE/STRATEGY child modes")
        request["hybridPlan"] = plan

    with ViraClient(api_url, api_key=api_key) as client:
        response = client.resolve_task_run(request)
        raw = body_mapping(response)
        decision = raw.get("route") if isinstance(raw.get("route"), Mapping) else raw

        print(json.dumps({
            "stage": "route_proposal",
            "requestedMode": mode,
            "route": decision.get("route") if isinstance(decision, Mapping) else None,
            "proposedMode": decision.get("mode") if isinstance(decision, Mapping) else None,
            "reason": decision.get("reason") if isinstance(decision, Mapping) else None,
        }, indent=2))

        if os.environ.get("VIRA_CONFIRM_TASKRUN_START") != "yes":
            print("Route-only; no TaskRun admission requested.")
            return

        if not isinstance(decision, Mapping) or decision.get("route") != "ROUTED":
            raise RuntimeError("Vira did not propose a routable task")
        if os.environ.get("VIRA_CONFIRM_NON_PRODUCTION") != "yes":
            raise RuntimeError("Verify an authorized non-production scope and set VIRA_CONFIRM_NON_PRODUCTION=yes")

        request_id = f"request-{uuid4()}"
        task_run_id = f"task-run-{uuid4()}"
        admission = {
            "requestId": request_id,
            "taskRunId": task_run_id,
            **request,
            "budget": {"maxChildren": 4, "maxCalls": 8},
        }
        if os.environ.get("VIRA_TASKRUN_COMPOUND_PLAN_ID"):
            admission["compoundPlanId"] = os.environ["VIRA_TASKRUN_COMPOUND_PLAN_ID"]
        submitted = client.start_task_run(admission, idempotency_key=f"task-run:start:{request_id}")
        readback = body_mapping(client.get_task_run(task_run_id))
        state = readback.get("taskRun") if isinstance(readback.get("taskRun"), Mapping) else readback
        print(json.dumps({
            "stage": "admission_and_readback",
            "taskRunId": task_run_id,
            "requestId": getattr(submitted, "request_id", None),
            "persistedStatus": state.get("status"),
            "persistedMode": state.get("mode"),
            "stateVersion": state.get("stateVersion"),
        }, indent=2))

        # Do not assume a COMPLETED status; do not invent continuation state.
        # Actual model and external tool execution remain host-authorized.


if __name__ == "__main__":
    main()
