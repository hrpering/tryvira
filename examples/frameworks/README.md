# Runnable framework integration examples

The normal customer application path is **[AUTO TaskRun](../../docs/canonical-taskrun.md)**. The list below distinguishes canonical admission from **lower-level diagnostics**. A direct behavior projection is not a second supported production chatbot path. Each integration uses a published SDK or MCP server. Examples use **real configured** services when authorized, never a fabricated production backend. Configure a real operator-provided API URL, scoped credentials, and any model-provider key in the host environment. Use an isolated non-production organization/project/environment. Do not commit secrets. Vira product access is still under active development and is not open yet; no live tenant was available to us for these checks.

| Example | Customer-run behavior | Start it |
| --- | --- | --- |
| [Next.js + OpenAI Agents](node-next/README.md) | **Canonical AUTO TaskRun admission:** OFF invokes model baseline; ON submits TaskRun and displays real state while awaiting a verifiable provider-response handoff. | `npm ci && npm run dev` |
| [FastAPI + Python SDK](python_fastapi/README.md) | **Advanced SDK diagnostic only:** illustrates a low-level behavior-projection/model boundary, not canonical AUTO TaskRun. | `uv pip sync requirements.lock && uvicorn asgi:app` |
| [LangGraph + LangChain OpenAI](langgraph/README.md) | **Advanced SDK diagnostic only:** legacy projection integration, not the recommended customer path. | `uv pip sync requirements.lock && python graph.py` |
| [MCP client](mcp-client/README.md) | Starts the configured published Vira MCP server, initializes a real stdio connection, discovers `tools/list`, and optionally calls a tool the host has explicitly approved. | `npm ci && npm start` |

These include a canonical TaskRun admission sample and lower-level diagnostics; **the latter are not deployable canonical ON routes**. CI installs/builds the app code and checks syntax; it does not pretend those checks are a live Vira/provider run. External side effects remain the host application's responsibility and require its own authorization. For reviewed authoring and release, use the [Pack Academy](../packs/README.md). For the legacy authoring/diagnostic workflow with human approval boundaries, use the [Marketing Agent tutorial](../../tutorials/marketing-agent/README.md).

Deployment requirements, credential handling, SBOM, and license boundaries are in [DEPLOYMENT.md](DEPLOYMENT.md) and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

To run the Next.js chatbot with an installed agent Skill, use [`vira-chatbot`](../../skills/vira-chatbot/examples/README.md). It guides the same OFF/ON test and optional observation/runtime check without a mock Vira service.
