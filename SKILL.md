---
name: vira
description: "Operate Vira from a coding agent: integrate JS/Python/MCP/OpenCode, connect AI systems, author and evaluate Behavior Packs, review Teach, release governed revisions, run AUTO TaskRuns, inspect traces and receipts. Use for any Vira integration, behavior or lifecycle task."
license: "Vira Agent Skill Installation & Application Use License v1.0; https://github.com/hrpering/tryvira/blob/main/skills/vira-observe/LICENSE"
---

# Vira | Agent-first behavior workspace

Use **one Vira Skill** to coordinate the complete developer workflow. This root Skill is intentionally **self-contained**: a GitHub/skills.sh install might install only this file, not the 28 optional specialist Skill folders. Do not assume any other Skill, example, script, backend route or credential has been installed. You can complete integration planning, use an installed public client and execute authorized operations with this one guide.

Vira adds managed, reusable and testable behavioral expectations to an existing model/agent application. Vira's hosted service, not the Skill, makes authorization and runtime decisions and stores evidence. A Skill does not train a model, install a Pack, authorize a tool, or verify a final model answer by itself.

## Activation

Use for installing Vira, connecting an AI System, instrumenting observations, analyzing Signals, writing Tasks/Behavior Points/Programs/Strategies, building/importing/installing Packs, comparing/evaluating, approving/releasing, AUTO TaskRuns, receipt debugging, and Teach-based improvement. Inspect the existing application stack and ask only for essential access information; start with read-only discovery and a development scope.

## Select the actual supported surface

1. Check the application's package manager, runtime, agent host, Vira configuration and installed packages. Retrieve the current *published* versions rather than trusting a hardcoded historical version. Vira clients are `@tryvira/sdk` for Node/TypeScript, `tryvira-sdk` for Python and `@tryvira/mcp` for an MCP host.
2. **MCP available:** Initialize the installed Vira MCP server; read real `tools/list` and `list_capabilities` before any action. Prefer canonical names advertised by the installed server, including `connect_ai_system`, `record_user_feedback` and `record_business_outcome` when exposed; older `connect_once`, `feedback` and `outcome` names can be compatibility aliases not advertised by `tools/list`. Determine input schemas, effect classification and tenant permissions from the running server. Never invent a tool or assume parity with SDK.
3. **No matching MCP tool:** Use the installed, documented JS or Python SDK method in the application's own runtime, not an invented API endpoint. A genuinely missing tool may trigger a different supported surface; an authorization **denial may not**.
4. **OpenCode:** Its Vira plugin is a separate package; installing this Skill does not install a plugin or MCP server. Discover the installed OpenCode plugin and read its published options before configuring it. Modes are `off`, `observe`, and conditional `enforce`. Do not treat a JSON `confirmed` value as human approval: on a supported host use native permission evaluation and exact one-use server approval. Without the required pre-tool interception/capabilities, do not claim enforcement. No verified response-before-display hook is available. Prefer the public OpenCode integration guidance when available.
5. Raw HTTP is permissible only when a published Vira API contract supplies the exact endpoint and schema. Never call private Studio routes, repurpose session cookies or guess an API base URL.

Use `VIRA_API_URL` as a user-provided API deployment root (not a Studio URL and no `/v1` suffix) and keep `VIRA_API_KEY` exclusively in host/server-side secret storage. Require real `VIRA_ORGANIZATION_ID`, `VIRA_PROJECT_ID`, `VIRA_ENVIRONMENT_ID` from the user environment; never fabricate IDs or print credential values.

## Version and scope checkpoint

Use the installed package and live discovery as the contract. The published MCP catalog recorded on 27 November 2026 has 99 tools; a newer maintained source candidate has the same names but name parity is not publication, schema, deployment or authorization parity. Dedicated optimization tools are absent from that published snapshot. For generic Control API tools, discover the registered operation, exact method and schema; never guess paths or use them to bypass denied authority. For organization-unit, AI System and billing access, read the actor's scoped grants first; a unit role does not imply organization-wide privileges.

## The complete workflow

| Intent | What to do in order | Evidence to obtain |
| --- | --- | --- |
| Connect a new agent | Discover scoped AI Systems, MCP `connect_ai_system` (legacy `connect_once`) or SDK `connectAiSystem` (legacy `connectOnce`); read returned identity; optionally test connection | Actual System/Connection IDs and matching tenant scope |
| Observe real usage | Establish consent and event source; submit sanitized, scoped `observe` with event ID and idempotency | Admitted event/readback; ingestion is not Teach or release |
| Signals and Teach | Inspect admitted evidence; propose/review Signal mapping, submit permitted Teach evidence, generate and review recommendations | Persisted proposal, source/evidence identity and separate human accept/reject/edit decision |
| Author behavior | Identify one Semantic Task; draft Behavior Points, Programs and optional Strategies; validate supported policies and tool contracts | Typed artifact identity, scope, reviewed specifications and negative examples |
| Build a quality Pack | Write representative positive, negative, missing-data, policy-conflict and regression cases; validate, import then install/materialize | Exact Pack revision/digest, materialization/job readback |
| Evaluate and compare | Evaluate the exact candidate and a strong OFF/current baseline on comparable cases; inspect persisted evaluation/comparison | Real evaluation ID, matching artifact/digest, per-case regressions, status and criteria |
| Approve/release | Show the human the exact candidate, scope, differences and rollback target; obtain explicit authorization; apply Vira approval/release | Separate reviewer approval, released revision/digest and readback |
| Run the behavior | Prefer canonical AUTO `resolve_task_run`/`start_task_run` and supported read/continue/retry/cancel operations; server selects SINGLE/STRATEGY/COMPOUND/HYBRID | Actual route, TaskRun/child states, receipts, correlation IDs; no invented success |
| Verify and inspect | Correlate real released Program, scope, authority digest, provider output digest and post-model receipt through supported public read surfaces | Matching verification record and actual output; otherwise mark verified answer unavailable |
| Optimize/resolve conflicts | In published MCP, inspect actual `get_scope`, `list_inbox`, `inspect_conflicts`, `get_conflict_inspection`, `resolve_conflict`, and the registered optimization operations only when an installed tool or documented, authorized `read_control_api`/`write_control_api` operation exists | Server authorization, reviewer decision, run status and persisted identifiers; optimization is not automatic release |

For every effectful operation, obtain the user's explicit permission for that specific change and pass the server's own policy/role check. Keep an idempotency key stable for retries of *the same* write, unique for different writes. Preserve original scope, IDs, revision and digest across MCP/SDK handoffs. After asynchronous 202/queued results, poll documented readbacks instead of reporting completion.

For business-record tools, authorization must receive server-resolved owner/identity/status evidence and its receipt. Never treat model or client fields such as `ownerId`, `customerId`, `status`, `hostCapabilities`, or `confirmed:true` as trusted evidence. If the host capability attestation or owner preflight cannot be resolved, stop or fail closed.

For an effectful action awaiting consent, create a server-owned one-use approval for the exact proposal, tool, arguments digest, actor, session, release and data version. Pass the returned `approvalId` only to that matching authorization attempt. Denied, expired, replayed, or argument-changed approvals must not execute.

A routing proposal is not admission; installation is not release; approval is not execution. TaskRun `COMPLETED` alone is **not** a separately output-bound `post_model` verifier PASS. If the real customer/host cannot retrieve a verified final answer, report that limitation and never silently substitute a direct model invocation for the ON path.

## Quality and troubleshooting

Start with a narrowly scoped, measurable behavior and a fair baseline. For each test, include expected and forbidden outcomes, unsupported-tool/denied-tenant cases, invalid scope, stale state, duplicate idempotency, missing verification and unchanged-behavior regressions. Do not replace a good model answer with generic refusal/checklist text just to pass a rule. Test what the installed public client actually serialized, then run real tenant/provider tests separately with permission.

When a call fails: inspect config → authentication → scope/authority → schema → asynchronous job → materialized state → evaluation/approval/release → runtime/verification → trace. Return a safe error code, request/receipt IDs, the earliest failing boundary and an actionable next step, without dumping inputs, secrets or customer traces.

## Specialist coverage without 28 separate installs

This Skill covers the operational routing previously split into 28 specialists. For deeper instructions, optionally consult their public source files **as references**, without requiring the user to install them:

- Getting started/integrating: `vira-get-started`, `vira-integrate-app`, `vira-framework-integration`, `vira-npm-cli`, `vira-js-sdk`, `vira-python-sdk`, `vira-http-api`, `vira-mcp`, `vira-operator`.
- Behavior and packaging: `vira-author-behavior`, `vira-strategies`, `vira-build-pack`, `vira-packs`, `vira-signals`.
- Evaluation and release: `vira-evaluate`, `vira-evaluate-release`, `vira-release`.
- Runtime and apps: `vira-task-runs`, `vira-runtime`, `vira-runtime-verification`, `vira-traces`, `vira-chatbot`.
- Learning and operations: `vira-observe`, `vira-observe-teach`, `vira-lifecycle`, `vira-full-lifecycle`, `vira-debug`, `vira-studio`.

The specialist files live in the [public repository](https://github.com/hrpering/tryvira/tree/main/skills). They are optional, not automatically installed, and their presence in the repository does not imply Vira service access. The root Skill contains the complete default procedure even when those files are unavailable.

## Output format

Report **surface/version**, **requested goal**, **read-only findings**, **planned vs authorized writes**, **actual returned IDs/statuses**, **evaluation and release proof**, **runtime/verification proof** and **remaining blockers**. Distinguish `VERIFIED`, `PARTIAL`, `BLOCKED` and `NOT_RUN`; never manufacture a metric, tool call, approval or live receipt.

References if connected: [API and scope](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md) · [MCP tool inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md) · [Agent-first operation flow](https://github.com/hrpering/tryvira/blob/main/docs/agent-first-operation-flow.md) · [Live acceptance](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/e2e-completion-plan.md).
