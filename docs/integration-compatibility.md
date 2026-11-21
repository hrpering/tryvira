# Integration compatibility and verification

Last source comparison: **21 November 2026**.

Vira's public Skills, JavaScript/Python clients, MCP server and OpenCode adapter all address the **same server-side scope and authority**. Their operation catalogs, host hooks and package releases are independently versioned. Source manifest versions are **not proof that those versions are published or installed**.

## Version sources

| Package | Version declared by the maintained package source (21 Nov 2026) | Prior version cited in this documentation | Confirm the installable release |
| --- | --- | --- | --- |
| `@tryvira/sdk` | `0.1.74` | `0.1.67` | `npm view @tryvira/sdk version` |
| `@tryvira/mcp` | `0.1.78` | `0.1.60` | `npm view @tryvira/mcp version` |
| `@tryvira/opencode` | `0.1.67` | `0.1.61` | `npm view @tryvira/opencode version` |
| `tryvira-sdk` (PyPI) | `0.1.55` | `0.1.54` | `python -m pip index versions tryvira-sdk` |

**For a reproducible project**, resolve the actual published version, install it, then pin and commit its lockfile. Don't install a source-only version or silently upgrade an existing tested example. This repository has not performed a live registry, customer-tenant or host acceptance test merely by refreshing documentation.

## Operation boundaries

| Surface | Use it for | Do not assume |
| --- | --- | --- |
| Root `vira` Skill + specialists | Agent instructions, sequencing, safe handoff and inspection | Skills add new server capabilities or grant authority |
| JavaScript / TypeScript SDK | Direct application lifecycle integration; typed `ViraClient` calls | Every SDK method is an MCP tool; all environments can execute it |
| Python SDK | Python-side calls through the same scoped HTTP authority | Identical method shapes or method availability across languages |
| MCP | Agent discovery through **live** `tools/list`; scoped lifecycle tools, TaskRun, Pack, Teach, traces and permission-aware operations | The older snapshot in `reference/mcp-published-tools.json` reflects newer releases; a tool is permission to call it |
| OpenCode plugin | Host-context projection, observations and **capability-attested** pre-tool authorization | OpenCode can block or repair a response *before display*; unsupported host hooks work anyway |

The JavaScript client uses canonical verb-noun helpers such as `connectAiSystem`, `recordUserFeedback` and `recordBusinessOutcome`; older `connectOnce`, `feedback` and `outcome` names are retained as aliases in the inspected source. MCP similarly advertises `connect_ai_system`, `record_user_feedback` and `record_business_outcome` while compatibility aliases need not appear in live discovery. Follow **the actual installed package declarations and live MCP catalog**, not assumptions about cross-surface parity.

For normal user-facing governed work, prefer **AUTO TaskRun** and inspect persisted state, child receipts and output verification separately. Semantic routing is not admission. Pack import/install is not release. An `ALLOW` decision must be tied to the exact authorized action. A completed TaskRun alone is not proof of a post-model verifier PASS.

## OpenCode compatibility and enforcement

The maintained plugin source declares `off`, `observe`, and `enforce` modes and an OpenCode V2 setup surface with a legacy `server()` compatibility transport. Its available runtime guarantee depends on the exact host hooks. In `enforce` mode, a supported pre-tool interception boundary is required; where native permission evaluation is available, the user may approve the exact proposed effect through OpenCode's permission UI. Do **not** use a JSON `confirmed` flag as permission. On a host without the necessary interception or approval capabilities, fail closed for effectful actions.

The verified OpenCode hook surface does **not** provide a supported response-before-display hook, so the plugin cannot promise suppression or repair of already streamed model output. See [OpenCode setup](../plugins/opencode/README.md).

## Implementation phases and gates

| Phase | Scope | Acceptance gate |
| --- | --- | --- |
| **0. Baseline** | Compare actual source package manifests, documented public capabilities and historical release snapshot | Identified versions, canonical names and unverified operations explicitly separated |
| **1. SDK + MCP documentation** | Refresh installation guidance, alias naming, TaskRun/Pack/Teach flow and compatibility notes | No source-only version is mislabeled as a published release; live `tools/list` is still authoritative |
| **2. Agent Skills** | Align the single root Skill and MCP/SDK/lifecycle specialists with the same method and authority decisions | No fabricated method, permission bypass, schema or assumed Studio dependency |
| **3. OpenCode** | Document host version/permission hooks, modes, one-use approval and honest output-verification limits | Observe-only setup is safe; enforce requires verified host capabilities and server decision |
| **4. Examples and catalog** | Upgrade pinned runnable examples and the generated MCP snapshot only against actual registry artifacts; validate code and expected schemas | Offline smoke tests, npm/PyPI package inspection and documented lockfile/snapshot provenance pass |
| **5. Live acceptance** | With an authorized test tenant, verify connection, observation, Pack evaluation/release, TaskRun, host approval and receipt readback | Actual IDs and server decisions recorded, negative-scope/approval cases fail closed; no secret published |

## Implementation status (21 November 2026)

| Phase | Status | What is committed / still needed |
| --- | --- | --- |
| 0 — Source baseline | **Updated** | Source-manifest version comparison and public surface boundaries recorded here |
| 1 — SDK + MCP documentation | **Updated** | Package guides, aliases, TaskRun capability matrix and historical MCP catalog status corrected |
| 2 — Agent Skills | **Updated** | Root Skill and selected MCP/JS/Python/TaskRun/lifecycle/optimization/debugging guides aligned; all 28 specialist guides retained |
| 3 — OpenCode | **Updated** | Observe-only example, host capability requirements, native one-use approval and output-verification limits documented |
| 4 — Example/regression tests | **Partial** | Public root Skill, agent-first, client-copy, MCP-parity and sync scripts updated; committed version pins and locks deliberately left unchanged until registry verification; full CI not confirmed by this review |
| 5 — Live acceptance | **Not run** | Requires authorized tenant/host, actual tool discovery, real API readback, negative-scope and permission tests and post-model evidence |

Static cross-file checks verify the edited documentation references and JSON example only. They **do not** run `npm run verify`, npm/PyPI registry acceptance, OpenCode host checks or live Vira integration tests.

Phases 4 and 5 **cannot** be claimed complete based on source comparison alone. They require published artifacts or a real authorized environment, respectively.

See [common agent-first flow](agent-first-operation-flow.md), [MCP tools](reference/mcp-tools.md), [SDK references](reference/javascript-sdk.md) / [Python](reference/python-sdk.md), and [Studio-less parity](agent-skills/studio-less-parity.md).
