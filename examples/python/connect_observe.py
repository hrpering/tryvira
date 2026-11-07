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
        "python-example-agent",
        "custom-agent",
        scope,
        "custom-python",
        "1",
        idempotency_key="python-example-agent:connect:v1",
    )
    print(connected.body)
