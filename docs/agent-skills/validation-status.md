# Agent Skills validation and live-readiness status

The public library contains 22 task-specific skills. Every skill has its own activation conditions, preconditions, workflow, deliverable, failure handling, and references. The individually reviewed surface mapping is in [capability coverage](capability-coverage.md), and the complete published JS/Python method-to-skill map is in [SDK method inventory](../reference/sdk-method-inventory.md).

## What repository verification establishes

- Structural validation checks the 22 skill folders, metadata, links, and package contents.
- The registry verifier compares the published SDK method sets and MCP catalog to their documented inventories. Registry checks are version/contract checks, not API calls.
- Repository verification scans for secrets/restricted disclosures and checks public links, API/SDK examples, and package versions.
- CI builds the customer-facing Next.js app, checks MCP client source, and syntax-checks the Python examples. The marketing tutorial's safety check confirms that mutation flags are required.
- These checks do not produce synthetic success receipts and do not prove a live Vira integration.

The former loopback fake-service lifecycle test and stub-only framework test projects were removed. Current public examples call the configured published Vira SDK/API or MCP server directly. They require an operator-provided isolated non-production scope, credentials, provider configuration where needed, and explicit authorization for effectful transitions.

## Live verification

| Area | Current status | What remains
| --- | --- | --- |
| JavaScript SDK, Pack, evaluation, release, Teach | Source/contract reviewed; live tenant not tested | Run the numbered [Marketing Agent tutorial](../../tutorials/marketing-agent/README.md) against a real isolated non-production API; separately review each requested transition. |
| Next.js + OpenAI Agents/Vercel AI SDK | App build checked; live Vira/provider path not tested | Start the example with real server-side Vira/OpenAI credentials and exercise the documented routes. |
| FastAPI + Python SDK | Source/contract and syntax checked; live Vira/provider path not tested | Run `serve_behavior_projection` and the configured model from the [FastAPI example](../../examples/frameworks/python_fastapi/README.md). |
| LangGraph + Python SDK | Source/contract and syntax checked; live Vira/provider path not tested | Run `graph.py` using an authorized non-production scope and real model-provider key. |
| MCP | Package catalog documented; no live server `initialize`/`tools/list` call in this revision | Start the actual published server and inspect its current advertised schemas. |
| Studio | Not verified | Requires product access and an authenticated UI session. |
| Full Teach-to-revision-to-Pack release | Workflow code reviewed; no live candidate/release run | Run the [interactive revision workflow](../../examples/frameworks/node-next/REVISION-WORKFLOW.md) with returned identities and separately authorized transitions. |
| Skill model triggering/task success | Not measured at scale | Run a supported model evaluator against the positive, negative, ambiguous, and workflow corpora. |

No Vira API, model provider, MCP server, Studio UI, or customer tenant was called during this audit. Vira product access is still under active development and is not open yet. Do not describe any row above as live-tested until the operator records the real endpoint scope, package version, request IDs, persisted states, and verification result.
