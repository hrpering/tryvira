# Vira developer guide

This guide explains the customer-facing integration journey and links to the current versioned client documentation for implementation details.

## Pick a supported surface

Vira has JavaScript and Python client packages, an MCP server, a public HTTP API, and Studio workflows. Their capabilities and update cadence differ. Check [published packages](published-packages.md), the matching [SDK reference](reference/javascript-sdk.md) or [Python reference](reference/python-sdk.md), the [MCP catalog](reference/mcp-tools.md), and the API documentation supplied for the customer's deployment before implementing an operation.

## Configure the customer's account

Use the Vira API URL and credentials issued for the customer's own account. The API URL is not the application backend URL or the Studio URL. Keep keys in server-side environment or secret storage; never commit real credentials, tenant data, production traces, or private addresses.

Use an isolated development scope when available. Production operations require the customer's authorization and controls.

## Governed product journey

```text
connect an application
→ observe permitted behavior
→ define or select a candidate
→ review and evaluate
→ separately authorize approval or release
→ apply behavior at runtime
→ inspect the outcome
→ continue through a new reviewed cycle
```

These are separate product actions. A semantic match, Teach suggestion, Pack installation, or passing evaluation does not itself authorize a production change. Preserve server-returned identities and read persisted state before continuing asynchronous work.

## Start with a customer-runnable example

The [Next.js chatbot](../examples/frameworks/node-next/README.md) demonstrates the Vira behavior OFF and ON paths with optional observation and runtime-result display. It uses the customer's own configured Vira endpoint and credentials; the OFF path can run without Vira access. The [marketing-agent tutorial](../tutorials/marketing-agent/README.md) shows a longer gated client workflow. Neither example includes a shared credential or calls a mock Vira service.

## Use Skills for task-specific guidance

The [Vira Skills library](../skills/README.md) covers setup, integration, authoring, runtime, evaluation, Teach, Packs, and release. Follow its surface-specific handoffs; if an operation or schema is not documented for the installed package, do not guess it from another surface.

## Before production use

- Confirm the customer's scope, permissions, and intended target.
- Review any proposed behavior and evaluation evidence.
- Keep approval and release as separate decisions.
- Verify the released identity and runtime result using the supported customer-facing tools.
- Protect keys and customer data in logs and diagnostics.

See [Product capabilities](capability-map.md), [Teach AI](teach.md), [Packs](packs.md), [Evaluation and approval](evaluation-and-approval.md), [Release](release.md), and [Runtime](runtime.md) for general guidance.
