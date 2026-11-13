# Agent Skills validation and live-readiness status

The public library contains 27 task-specific Skills. Each has activation conditions, preconditions, a workflow, a deliverable, failure handling, and references. See [capability coverage](capability-coverage.md) for product-goal routing and the [public package guide](../reference/sdk-method-inventory.md) for current interface boundaries.

Historical November 7 model-run evidence used a now-superseded projection-to-provider integration. Keep that record only as historical evidence and do not copy it as current production guidance. The per-Skill evidence table is in [skill status](skill-status.md). It distinguishes structural checks, offline regressions, runnable examples, model evaluation, and live verification; no Skill is represented as live-tested.

## Production contract audit

All 24 original Skill guides were reviewed against the latest accessible production SDK, TaskRun, Pack, Observe, Signal and verifier contracts, and three missing specialists were added: `vira-observe`, `vira-runtime-verification` and `vira-traces`. Review the [per-Skill production audit](production-contract-audit.md) and the [versioned baseline](production-contract-baseline.md). New test cases distinguish old projection-centric example assertions from canonical AUTO requirements.

## What repository verification establishes

- Structural validation checks Skill folders, metadata, links, and package contents.
- Registry verification checks published package versions and executable metadata; it does not infer unsupported cross-surface contracts.
- Repository verification scans for credential-like patterns, restricted material, broken links, and stale package versions.
- CI builds the customer-facing Next.js app, checks the MCP client, and syntax-checks Python examples. The Marketing tutorial safety check confirms mutation flags are required.
- These checks do not produce synthetic success receipts and do not prove a live Vira integration.

Examples that call Vira require an operator-provided customer endpoint, credentials, provider configuration where needed, and explicit authorization for effectful transitions.

## Updated 0.7.0 audit and evidence gates

[Six-gate E2E plan](e2e-readiness.md) and [read-only live acceptance instructions](live-acceptance.md)
separate the offline 27/27 portable archive checks and source-level snippet tests
from actual agent selection and verified provider-output acceptance. A real
agent-trace scorer now handles all 84 trigger examples, but has **not** run against
a connected model in this review. The canonical final provider-to-verifier
readback is still a product/SDK integration blocker. No customer tenant,
provider or effectful release has been exercised.

## Live verification

| Area | Current status | What remains |
| --- | --- | --- |
| JavaScript SDK and customer tutorials | Source/build checked; live tenant not tested | Run the gated tutorial with the customer's authorized development scope |
| Next.js chatbot | Production build checked; live Vira/provider path not tested | Exercise ON/OFF with customer-provisioned server credentials |
| FastAPI and LangGraph | Source/syntax checked; live Vira/provider path not tested | Run with an authorized scope and real configured provider |
| MCP | Catalog source checked; no live `initialize`/`tools/list` call in this revision | Start the installed server and inspect advertised tools |
| Studio | Not verified | Requires authorized product access |

A passing build, registry version check, or structural Skill validator is not a live Vira result.
