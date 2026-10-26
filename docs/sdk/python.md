# Python SDK

Package:

```text
vira-sdk
```

Import:

```python
from vira import ViraClient
```

## Install

```bash
python -m pip install vira-sdk
```

## Connect

```python
import os
from vira import ViraClient

scope = {
    "organizationId": os.environ["VIRA_ORGANIZATION_ID"],
    "projectId": os.environ["VIRA_PROJECT_ID"],
    "environmentId": os.environ["VIRA_ENVIRONMENT_ID"],
}

with ViraClient(
    os.environ["VIRA_API_URL"],
    api_key=os.environ.get("VIRA_API_KEY"),
) as client:
    connected = client.connect_once(
        "marketing-agent",
        "custom-agent",
        scope,
        "custom-python",
        "1",
        idempotency_key="connect:marketing-agent:v1",
    )
```

## Observe

```python
client.observe(
    {
        **scope,
        "eventId": "event-001",
        "eventType": "model.response",
        "aiSystemId": system_id,
        "connectionId": connection_id,
        "payload": {
            "task": "Create a launch plan",
            "status": "completed",
        },
    },
    idempotency_key="event-001",
)
```

## Resolve semantic task

```python
semantic = client.resolve_semantic({
    "input": "Build a launch plan for a membership product"
})
```

The Python and JavaScript clients use the same server authority boundary.

Do not build a second behavior authority inside the client.
