# Runnable framework integration examples

Each application below calls Vira through a published SDK or the published MCP server. Configure a real operator-provided API URL, scoped credentials, and any model-provider key in the host environment. Use an isolated non-production organization/project/environment. Do not commit secrets. Vira product access is still under active development and is not open yet; no live tenant was available to us for these checks.

| Example | Customer-run behavior | Start it |
| --- | --- | --- |
| [Next.js + OpenAI Agents + Vercel AI SDK](node-next/README.md) | Server routes call the JS SDK runtime projection/resolver before invoking the configured model. Includes a separate approved Teach-to-Pack Revision flow with real persisted state and interactive approvals. | `npm ci && npm run dev` |
| [FastAPI + Python SDK](python_fastapi/README.md) | HTTP route calls Python `serve_behavior_projection`, passes the returned projection to the configured OpenAI model, and returns request/digest evidence. | `uv pip sync requirements.lock && uvicorn asgi:app` |
| [LangGraph + LangChain OpenAI](langgraph/README.md) | Graph calls Python `serve_behavior_projection` and invokes the real configured model only when the returned projection is non-empty. | `uv pip sync requirements.lock && python graph.py` |
| [MCP client](mcp-client/README.md) | Starts the configured published Vira MCP server, initializes a real stdio connection, discovers `tools/list`, and optionally calls a tool the host has explicitly approved. | `npm ci && npm start` |

These examples are executable customer integrations. CI installs/builds the app code and checks syntax; it does not pretend those checks are a live Vira/provider run. External side effects remain the host application's responsibility and require its own authorization. For a complete governed Pack/Teach walkthrough with human approval boundaries, use the [Marketing Agent tutorial](../../tutorials/marketing-agent/README.md).

Deployment requirements, credential handling, SBOM, and license boundaries are in [DEPLOYMENT.md](DEPLOYMENT.md) and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
