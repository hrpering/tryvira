# HTTP API and integration surfaces

Use the current public client package documentation as the source of request and response details. This page describes how to choose a surface and safe integration boundaries; it intentionally does not publish a raw endpoint or payload catalog.

## Configure the customer's Vira API

Set `VIRA_API_URL` to the API deployment URL supplied for the customer's Vira account. It is not the application backend URL or the Studio URL. Keep the customer's API key in server-side environment or secret storage, and never commit keys, tenant identifiers, private URLs, or production records.

Use a development scope isolated by the customer's organization when one is available. A production scope requires the customer's own authorization and controls. The endpoint and key always belong to the customer; this repository contains no shared Vira credential or service URL.

## Canonical versus diagnostic runtime

**Canonical app path:** [AUTO TaskRun](../canonical-taskrun.md), with server-selected task/mode, real child execution, runtime enforcement, provider handoff and post-model verification/receipt. Low-level `behavior-projection` / `resolveRuntime` are SDK/diagnostic tools, not a replacement canonical route. The full verified-answer retrieval contract is not established by the published TaskRun SDK alone.

## Choose the supported surface

- Use the JavaScript SDK or Python SDK for operations documented by the installed package version.
- Use MCP only for tools listed by the installed server's `tools/list` response and the matching public catalog.
- Use direct HTTP only when the public API reference for the customer's deployment documents the exact operation and schema. Do not derive paths or payloads from SDK method names.
- Use Studio only for workflows documented in the customer-facing product guidance. Studio availability may differ from API and package availability.

Surface coverage is not identical. Check the [capability matrix](../../references/capability-matrix.md), the [JavaScript method inventory](sdk-method-inventory.md), [Python reference](python-sdk.md), [MCP catalog](mcp-tools.md), and the installed packages before choosing an operation.

## Observe, Signal and verification surface separation

**Observe** event admission, **Signal discovery/mapping**, **runtime enforcement** and **post-model verification** are separate operations. Only use documented endpoints and methods from the selected release; do not invent a “verify final answer” HTTP path from a source type or generic SDK method. [Observe](../observe.md) · [Signals](../signals.md) · [Runtime verification](../runtime-verification.md).

## Governed workflow boundaries

Connecting an AI system, submitting permitted evidence, resolving behavior, evaluating a candidate, approving or promoting it, releasing a revision, and applying behavior at runtime are separate actions. A result from one step is not permission to perform the next. Preserve server-returned identifiers and receipts, and read back state before continuing after asynchronous work.

Teach and Pack are described at a product level in [Teach AI](../teach.md) and [Packs](../packs.md). Their operation-specific request schemas should be taken from the supported public SDK documentation for the installed version. If a needed schema or surface is missing, stop that operation and request the published contract; do not guess.

## Current package coverage notes

Package versions and surface coverage change independently. Discover current registry versions from [published packages](../published-packages.md), inspect the installed package's types and documentation, and check the MCP server's live tool catalog. The JavaScript SDK reference points TaskRun users to its installed package documentation. Verify Python support in the installed PyPI package rather than assuming parity. This page does not claim matching MCP or raw HTTP support. It does not publish a direct TaskRun route contract.

## Security

Never paste API keys into chat, logs, source control, browser code, or client bundles. Use least-privilege scope, redact customer content from diagnostics, and do not send observation data unless the customer has configured and authorized that behavior.
