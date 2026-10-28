import os
from vira import ViraClient

with ViraClient(os.environ["VIRA_API_URL"], api_key=os.environ.get("VIRA_API_KEY")) as client:
    result = client.evaluate_quality({
        "request": "Evaluate risks and next steps",
        "candidates": [
            {"id": "initial", "output": "Generic response"},
            {"id": "repair", "output": "Risks and next steps with explicit assumptions"},
        ],
        "allowedIds": ["initial", "repair"],
        "requiredTerms": ["risks", "next steps"],
        "threshold": 0.7,
    })
    print(result.body if result else None)
