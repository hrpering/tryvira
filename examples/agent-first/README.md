# One agent-first journey, three public surfaces

This example is an executable **navigation and readback** runbook, not a simulated Pack release. Vira Skills guide the steps. The host chooses its installed MCP tools, JavaScript SDK or Python SDK. All use the **same server** and the same scope/authority; you should not run all three paths for one mutation.

## 1. Install and discover

Choose a compatible agent host; add `vira-full-lifecycle` and `vira-mcp` (or `vira-operator` for JS SDK fallback):

```bash
npx skills add hrpering/tryvira --skill vira-full-lifecycle
npx skills add hrpering/tryvira --skill vira-mcp
```

Configure `VIRA_API_URL`, `VIRA_API_KEY`, `VIRA_ORGANIZATION_ID`, `VIRA_PROJECT_ID`, `VIRA_ENVIRONMENT_ID` in the trusted runtime secret store. Use a real non-production tenant. No repo-supplied credentials or tenant identities exist.

**MCP:** from `examples/frameworks/mcp-client`, `npm ci && npm start` lists live tools. An explicit read-only discovery call is `VIRA_MCP_TOOL=list_capabilities VIRA_MCP_ARGUMENTS='{}' npm start`. Find the tool in `tools/list` before calling it.

**JavaScript:** from `examples/javascript`, install `@tryvira/sdk@0.1.67`, then `node taskrun-modes.mjs AUTO` to request a routing proposal only.

**Python:** from `examples/python`, install `tryvira-sdk==0.1.54`, then `python taskrun_modes.py AUTO` to request the same kind of routing proposal only.

MCP, JS and Python each have their own request signature. They do **not** automatically produce identical result envelopes. These scripts do not bypass an unavailable backend, permission denial or unreleased behavior.

## 2. Choose one surface for each operation

| Stage | Lead Skill | MCP discovery hint | SDK fallback | Readback required |
| --- | --- | --- | --- | --- |
| Connect | `vira-integrate-app` | `connect_once` | JS `connectOnce`; Python `connect_once` | System/Connection IDs |
| Observe | `vira-observe` | `observe` | JS `observe`; Python `observe` | Actual event admission |
| Teach | `vira-observe-teach` | `create_teach_analysis`, `get_teach_analysis` | Installed version's documented methods | Persisted analysis/recommendation |
| Author | `vira-author-behavior` | `create_behavior_program`, `import_pack` | Installed version's documented methods | Exact artifact identity |
| Evaluate | `vira-evaluate` | `evaluate_pack`, `get_evaluation` | Installed version's documented methods | Server results bound to digest |
| Release | `vira-release` | `approve_pack`, `release_pack` | Installed version's documented methods | Separate real approval and released digest |
| Run | `vira-task-runs` | `resolve_task_run`, `start_task_run`, `get_task_run` | Installed version's documented methods | Admitted run, events and child receipts |
| Improve | `vira-observe-teach` | `create_behavior_revision_candidate` | Installed version's documented methods | Evaluated new revision, not silent replacement |

A Skill file does not release a Pack. Installing a Pack does not approve it. A TaskRun `COMPLETED` state does not prove final post-model verification. For read-only use, stop after discovery and route proposal.

For real mutations, the owner must first authorize the exact scope and action. MCP-host `VIRA_MCP_APPROVED=yes` and SDK scripts' opt-in flags are **extra local safeguards**, not proof of Vira server authorization. Keep output data out of source control and do not print secrets.

## 3. Copyable agent prompt

> Read the installed Vira Skills and my project's Vira integration. Use the existing MCP server's live tools/list first; if a required operation is absent, use only a documented installed JS/Python SDK method. Do not use Studio private routes or retry denied actions through a different interface. Start read-only: list capabilities, AI Systems and existing Packs, then propose an exact-scoped plan. Do not import, install, approve or release anything until I explicitly authorize it. For each operation report the actual ID, status, receipt or missing capability; never invent evaluation or provider-output results.

## 4. What counts as a working result

Successful Skill installation, server discovery and local package tests prove their own boundaries only. Full release quality requires an actual scoped API, persisted evaluation and approval, and (for verified-answer claims) a provider output with matching post-model verification receipt. The [test trust matrix](../../docs/agent-skills/test-trust-matrix.md) separates these.

[Operation contract](../../docs/agent-first-operation-flow.md) · [JS TaskRun example](../javascript/taskrun-modes.mjs) · [Python TaskRun example](../python/taskrun_modes.py) · [MCP client example](../frameworks/mcp-client/README.md).
