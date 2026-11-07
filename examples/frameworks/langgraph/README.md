# LangGraph conditional runtime boundary

Create a Python 3.12 virtual environment with `uv venv --python 3.12 .venv`, then install the exact hash-locked requirements using `uv pip sync requirements.lock`. Run `.venv/bin/pytest` for deterministic fake-client/fake-model checks.

The graph calls the published Python SDK `serve_behavior_projection` operation with `input`, `provider`, optional `programId`, `protocol`, and an idempotency key. It reads the operation's `projection.rendered` response and invokes the model only when that value is a non-empty string; it retains the projection digest. A missing or malformed projection stops before model invocation. This is governed behavior content, not permission for tool or external side effects. Configure the Vira URL, API key, provider, and optional program ID in the server environment. No live Vira or OpenAI call is made by tests.
