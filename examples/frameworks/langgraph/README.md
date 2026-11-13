# LangGraph + LangChain OpenAI

Create and install the Python 3.12 environment:

```bash
uv venv --python 3.12 .venv
uv pip sync requirements.lock
```

Set `VIRA_API_URL`, `VIRA_API_KEY`, `VIRA_ORGANIZATION_ID`, `VIRA_PROJECT_ID`, `VIRA_ENVIRONMENT_ID`, `VIRA_PROVIDER=openai`, and `OPENAI_API_KEY` in your secret manager. Set optional `VIRA_PROGRAM_ID`, `VIRA_PROJECTION_PROTOCOL`, and `OPENAI_MODEL` to values supported by your account and installed SDK. Use an isolated non-production scope. Run the graph:

```bash
.venv/bin/python graph.py
```

The graph calls the published Python SDK `serve_behavior_projection` operation and invokes the configured model only when `projection.rendered` is non-empty. It preserves the projection digest. Missing or unavailable behavior stops before the model call. Projection content is guidance, not authorization for tools or external effects.
