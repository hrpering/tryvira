# Integration compatibility and verification

Last source and registry comparison: **21 November 2026**.

Vira's public Skills, JavaScript/Python clients, MCP server and OpenCode adapter all address the **same server-side scope and authority**. Their operation catalogs, host hooks and package releases are independently versioned. Source manifest versions are **not proof that those versions are published or installed**.

## Version sources

| Package | Version declared by the maintained package source (21 Nov 2026) | Prior version cited in this documentation | Confirm the installable release |
| --- | --- | --- | --- |
| `@tryvira/sdk` | `0.1.75` | `0.1.67` | `npm view @tryvira/sdk version` |
| `@tryvira/mcp` | `0.1.79` | `0.1.60` | `npm view @tryvira/mcp version` |
| `@tryvira/opencode` | `0.1.68` | `0.1.61` | `npm view @tryvira/opencode version` |
| `tryvira-sdk` (PyPI) | `0.1.56` | `0.1.54` | `python -m pip index versions tryvira-sdk` |

**Registry verification completed:** GitHub Actions confirmed npm `@tryvira/sdk@0.1.75`, npm `@tryvira/mcp@0.1.79`, PyPI `tryvira-sdk==0.1.56` and the earlier OpenCode npm `0.1.67` probe. The npm MCP 0.1.79 tarball exposes **61 tools**, and its tool names match all 61 in the maintained shared source catalog. This confirms published name parity only; it is not a live hosted or model-output acceptance result. For reproducibility, install a registry-published release and regenerate integrity/hashes in lockfiles. These tests do **not** establish a live customer-tenant or host acceptance.

## MCP surface parity

The maintained shared hosted/npm MCP source catalog and the registry-verified npm `0.1.79` package each advertise **61 matching names**. The [generated comparison](mcp-surface-parity.md) shows source and published evidence separately. The same-version tool-name parity gate now passes; it does **not** establish live hosted `tools/list`, matching request/response schemas, identical effect/approval behavior or customer permission.

## Operation boundaries

| Surface | Use it for | Do not assume |
| --- | --- | --- |
| Root `vira` Skill + specialists | Agent instructions, sequencing, safe handoff and inspection | Skills add new server capabilities or grant authority |
| JavaScript / TypeScript SDK | Direct application lifecycle integration; typed `ViraClient` calls | Every SDK method is an MCP tool; all environments can execute it |
| Python SDK | Python-side calls through the same scoped HTTP authority | Identical method shapes or method availability across languages |
| MCP | Agent discovery through **live** `tools/list`; scoped lifecycle tools, TaskRun, Pack, Teach and permission-aware operations | A versioned npm snapshot replaces live discovery, or a listed tool grants authority |
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
| 4 — Example/regression tests | **Completed for 0.1.79** | Published npm MCP 0.1.79 verified with 61 tool names matching source; npm/Python example locks regenerated and source/npm comparison CI passed in the registry synchronization workflow |
| 5 — Live acceptance | **Not run** | Requires authorized tenant/host, actual tool discovery, real API readback, negative-scope and permission tests and post-model evidence |

The package synchronization workflow ran `npm run verify`, registry metadata checks, published MCP tarball comparison and regenerated dependency locks successfully before creating its update branch. Those checks are not proof of a live Vira tenant, OpenCode host approval or a separately verified provider answer.

Phase 4 has published-registry, lockfile and CI evidence. Phase 5 still requires a separately authorized tenant, host callbacks and live execution/verification evidence; it cannot be inferred from package tests.

See [common agent-first flow](agent-first-operation-flow.md), [MCP tools](reference/mcp-tools.md), [SDK references](reference/javascript-sdk.md) / [Python](reference/python-sdk.md), and [Studio-less parity](agent-skills/studio-less-parity.md).
