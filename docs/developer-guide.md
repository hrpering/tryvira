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

## Choose a mode for the task, not for every message

The TaskRun API supports **SINGLE**, **STRATEGY**, **COMPOUND** and **HYBRID**, with **AUTO** available as a routing request. These are not interchangeable. AUTO can request clarification or abstain rather than invent an eligible workflow.

| Requirement | Typical path |
| --- | --- |
| One task with a released behavior | SINGLE |
| One task with required ordered steps | STRATEGY |
| Several independently governed tasks | COMPOUND |
| Several tasks including a multi-step child | HYBRID |
| An application that should request mode selection | AUTO |

Execution-mode selection is provided through supported TaskRun clients; Studio and MCP capabilities differ. Use the [full mode guide](execution-modes.md), the [JavaScript TaskRun script](../examples/javascript/taskrun-modes.mjs) and the [pinned public SDK transport tests](../examples/frameworks/node-next/test/taskrun-sdk.test.mjs).

## Canonical application path

**AUTO TaskRun → semantic resolve → mode dispatch → real child executor → runtime behavior enforcement → provider/chatbot → post-model verification and receipt.** Normal apps start with `startTaskRun` / `start_task_run` and read persisted state. Direct `behavior-projection` and `resolveRuntime` are diagnostic/advanced SDK APIs, not the normal chat path. [Canonical integration and current final-answer contract gap](canonical-taskrun.md) · [Verified output evidence requirements](verified-answer-handoff.md).

## Observe, Signal, enforce, verify

1. **Observe:** instrument actual connected model/tool/action boundaries with permitted, idempotent events and collect real IDs. [Observe guide](observe.md).
2. **Define Signals:** decide if any observation needs a typed, reviewed producer mapping. Never use an untrusted plain JSON attribute as a hard authority input. [Signals](signals.md).
3. **Review behavior:** author a specific Pack, choose a verifier with real support, evaluate and release separately. [Pack Academy](pack-authoring-guide.md).
4. **Execute:** send the normal request through AUTO TaskRun, confirm server-resolved task/mode and child executor receipts. [Canonical flow](canonical-taskrun.md).
5. **Verify:** confirm the actual provider output and post-model verification result agree on the same artifact and output digest. If absent, return pending/unsupported rather than fabricating a verified answer. [Verification](runtime-verification.md).
6. **Improve:** correlate permitted feedback/outcomes with the run and propose a Teach change with separate authorization. [Teach](teach.md).

The rest of the platform also includes privacy/scope, release/rollout, telemetry, billing, Studio/Admin and experimental runtime/accelerator work. **Do not confuse a backend module with an advertised generally available SDK feature.** [All capability families](product-feature-map.md) · [Evidence status](product-status.md).

## A minimal safe integration

### 1. Configure scope and secrets

On a trusted server, configure `VIRA_API_URL`, `VIRA_API_KEY`, and the organization/project/environment identifiers provided for your account. The API URL is **not** the Studio URL and is not an arbitrary example host. Use an isolated non-production scope when available. Do not send keys to browser bundles.

### 2. Connect and collect only permitted evidence

Use a published client method documented for your installed version. The [JavaScript example](../examples/javascript/connect-observe.mjs) demonstrates connection, a connection test, and an observation with a sanitized payload. Record real server-issued identifiers and idempotency keys; do not fabricate success, business outcomes, or provider data.

### 3. Separate candidate selection from authorization

The normal request is submitted to AUTO TaskRun and the **server** resolves the semantic task, selects eligible child mode, enforces released behavior and dispatches actual work. The host/provider final-output and post-model verifier identity must be bound to the same run before a verified answer can be delivered.

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
- **MCP:** [setup](reference/mcp.md). Discover the installed server's real tools using `tools/list`; check actual tool names and schemas.
- **Direct HTTP:** use the customer's [documented API contract](reference/api.md), not method names guessed from SDKs.
- **Studio:** interactive workflows depend on account access; Studio workflows depend on account access and supported UI features.

## Comprehensive developer resources

| Area | Resource | Caution |
| --- | --- | --- |
| Installation and environment | [Start here](start-here.md) · [Published packages](published-packages.md) | No shared customer API URL or credentials |
| Semantic Task and Point | [Canonical authoring](canonical-authoring.md) | Candidate selection is not release |
| Programs and Strategies | [Programs](behavior-programs.md) · [Strategies](strategies.md) | Strategy eligibility is distinct from activation |
| TaskRun modes | [Execution modes](execution-modes.md) | AUTO is not unconditional compound execution |
| High-quality Pack authoring | [Field guide](pack-authoring-guide.md) · [Three graded Packs](../examples/packs/README.md) | Source examples are not released behavior |
| Pack lifecycle | [Packs](packs.md) · [Evaluation](evaluation-and-approval.md) · [Release](release.md) | No client-fabricated pass evidence |
| Observations and Teach | [Teach](teach.md) · [Signals](signals.md) | Evidence permissions and approvals required |
| Live decision and trace | [Runtime](runtime.md) · [Traces](traces.md) | Effectful calls require host enforcement |
| JavaScript and Python | [JS](reference/javascript-sdk.md) · [Python](reference/python-sdk.md) | SDK method sets can differ |
| MCP and HTTP | [MCP](reference/mcp.md) · [HTTP](reference/api.md) | Check the selected client and deployment |
| Integrations | [Runnable frameworks](../examples/frameworks/README.md) · [Verification matrix](example-verification.md) | CI build is not a live customer test |
| Failure handling | [Troubleshooting](troubleshooting/README.md) · [Checklist](developer-checklist.md) | Test denied, partial, missing and stale paths |

## What has actually been tested?

Review the [per-example verification matrix](example-verification.md) before demonstrating or deploying an integration. It distinguishes syntax/build checks, the published SDK's offline method tests, and live account acceptance that cannot be established without provisioned credentials. Test prompts are available as [short and detailed synthetic fixtures](../examples/scenarios/README.md).

## Before shipping

Check supported operations and role/scope, verify evaluation and exact release identity, enforce tool authorization in the host, test negative paths, redact evidence and logs, and retain returned IDs for debugging. Package install success or a local demo build is not a live Vira release test.

[Use cases](use-cases.md) · [Category comparison](approach-comparison.md) · [Capability map](capability-map.md) · [Troubleshooting](troubleshooting/README.md) · [Integration patterns](integration-patterns.md) · [Security model](security-model.md)
