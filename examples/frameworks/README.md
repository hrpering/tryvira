# Runnable framework integration examples

These are host-application examples built on the published JavaScript/Python clients and their public contracts. They do not imply Vira ships dedicated framework adapters. Each keeps Vira credentials server-side. The Next.js examples consume the JavaScript `RuntimeResolution` projection fields; FastAPI and LangGraph call Python `serve_behavior_projection` and read its `projection` response object. Each invokes model work only when its operation-specific response contains a non-empty rendered projection. Projection content guides model behavior; it does not authorize external side effects.

| Example | What runs | Offline checks |
| --- | --- | --- |
| [Next.js + OpenAI Agents + Vercel AI SDK](node-next/README.md) | Two Node routes; one uses a draft-only OpenAI Agent, the other streams with Vercel AI SDK. An additional [approved Teach-to-Pack Revision lifecycle](node-next/REVISION-WORKFLOW.md) uses persisted evaluation and separately confirmed transitions. | `npm ci && npm test`; `npm run build` |
| [FastAPI](python_fastapi/README.md) | FastAPI projection endpoint using the Python SDK | `uv pip sync requirements.lock && .venv/bin/python -m unittest discover -s . -v` |
| [LangGraph + LangChain OpenAI](langgraph/README.md) | Conditional graph; missing or unavailable projection stops before model invocation | `uv pip sync requirements.lock && .venv/bin/pytest` |
| [MCP client](mcp-client/README.md) | stdio initialize, dynamic `tools/list`, optional approved `tools/call` | `npm ci && npm test` |

The earlier framework-neutral Node and Python boundary helpers remain in `node/` and `python/` for small integrations. Their stubs test local control flow only.

Deployment requirements, secret handling, lockfiles, SBOM and license boundaries are in [DEPLOYMENT.md](DEPLOYMENT.md) and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). No live API or hosted deployment is claimed by the offline checks.
