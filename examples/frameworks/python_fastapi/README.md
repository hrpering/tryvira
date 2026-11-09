# FastAPI + Python SDK + OpenAI

Create a Python 3.12 environment and install the pinned dependencies:

```bash
uv venv --python 3.12 .venv
uv pip sync requirements.lock
```

Set `VIRA_API_URL`, `VIRA_API_KEY`, `VIRA_ORGANIZATION_ID`, `VIRA_PROJECT_ID`, `VIRA_ENVIRONMENT_ID`, and `OPENAI_API_KEY` with your secret manager. Set optional `VIRA_PROVIDER` and `OPENAI_MODEL` if needed. Use an isolated non-production Vira scope. Start the real app:

```bash
uvicorn asgi:app --host 127.0.0.1 --port 8000
```

Send a request through the running service:

```bash
curl -X POST http://127.0.0.1:8000/behavior/project \
  -H 'content-type: application/json' \
  -H 'idempotency-key: support:case-123' \
  -d '{"message":"Where is my order?","provider":"openai"}'
```

The application calls the published Python SDK's `serve_behavior_projection`, reads the operation's `projection.rendered`, and invokes the configured OpenAI model only when a non-empty projection is returned. The response includes the projection digest and Vira request ID. `/healthz` is liveness; `/readyz` confirms local initialization, not Vira authorization. Add your application's authentication at a trusted ingress before exposing this route.
