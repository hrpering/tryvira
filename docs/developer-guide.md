# Developer guide

Vira integrates with an **existing** AI system. Your model, agent framework and tools remain yours; Vira adds a scoped workflow for defining behavior, evaluating changes, authorizing releases, and resolving eligible behavior at supported boundaries.

## Choose your first integration

| If you want to… | Start here | Requires live Vira access? |
| --- | --- | --- |
| Explore the OFF/ON architecture | [Next.js chatbot](../examples/frameworks/node-next/README.md) | OFF: no; ON: yes |
| Connect and record sanitized events | [JavaScript connect/observe](../examples/javascript/README.md) | Yes |
| Add Vira to a Python service | [FastAPI or LangGraph](../examples/frameworks/README.md) | Yes for Vira operations |
| Use an MCP host | [MCP config](reference/mcp.md) | Yes |
| Review a multi-stage Pack/Teach journey | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) | Yes to execute live operations |
| Give a coding agent Vira-specific guidance | [Agent Skills](../skills/README.md) | Depends on the chosen task |

Start with [the exact setup steps](start-here.md). For installation, use the [published package reference](published-packages.md); versioned contracts may differ across clients.

## A minimal safe integration

### 1. Configure scope and secrets

On a trusted server, configure `VIRA_API_URL`, `VIRA_API_KEY`, and the organization/project/environment identifiers provided for your account. The API URL is **not** the Studio URL and is not an arbitrary example host. Use an isolated non-production scope when available. Do not send keys to browser bundles.

### 2. Connect and collect only permitted evidence

Use a published client method documented for your installed version. The [JavaScript example](../examples/javascript/connect-observe.mjs) demonstrates connection, a connection test, and an observation with a sanitized payload. Record real server-issued identifiers and idempotency keys; do not fabricate success, business outcomes, or provider data.

### 3. Separate candidate selection from authorization

The conceptual request path is:

```text
AI request → semantic task selection → Behavior Point
           → eligible released Program / Strategy
           → runtime projection or decision → host model / authorized tool
           → returned identity / receipt / trace
```

A semantic match is a candidate, not permission. For an ON mode that requires governance, a deny, missing release, scope mismatch, or unavailable verifier should stop that path. The host is responsible for routing actions through the configured boundary; Vira cannot intercept bypassing tool calls.

### 4. Govern changes before activating them

```text
permitted evidence → reviewable suggestion / authored candidate
                   → evaluation → approval → explicit release
                   → runtime eligibility → inspect result
```

Observe-first integrations are possible without claiming that a suggestion was automatically applied. [Teach AI](teach.md), [Packs](packs.md), [Evaluation](evaluation-and-approval.md), and [Release](release.md) describe each boundary.

## SDK, MCP, HTTP or Studio?

- **JavaScript / TypeScript:** [SDK reference](reference/javascript-sdk.md) and [runnable examples](../examples/javascript/README.md).
- **Python:** [Python reference](reference/python-sdk.md) and [framework examples](../examples/frameworks/README.md).
- **MCP:** [setup](reference/mcp.md). Discover the installed server's real tools using `tools/list`; do not invent tools.
- **Direct HTTP:** use the customer's [documented API contract](reference/api.md), not method names guessed from SDKs.
- **Studio:** interactive workflows depend on account access; do not infer that every SDK operation exists in Studio.

## Before shipping

Check supported operations and role/scope, verify evaluation and exact release identity, enforce tool authorization in the host, test negative paths, redact evidence and logs, and retain returned IDs for debugging. Package install success or a local demo build is not a live Vira release test.

[Capability map](capability-map.md) · [Troubleshooting](troubleshooting/README.md) · [Integration patterns](integration-patterns.md) · [Security model](security-model.md)
