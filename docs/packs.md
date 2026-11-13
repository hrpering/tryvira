# Packs

A Vira Pack groups behavior-authoring material for review and transfer. Importing or installing a Pack does not itself authorize or activate production behavior.

## Full examples and field-by-field authoring

A high-quality Pack has **task boundaries, an explicit Point, executable Program modules, positive/negative cases and (when genuinely needed) a structured Strategy**. See [where to fill every field](pack-authoring-guide.md) and [three complete, graded source Packs](../examples/packs/README.md).

For normal application requests the canonical path is [AUTO TaskRun](canonical-taskrun.md), **not** a direct behavior-projection call.

## Product-level workflow

```text
prepare a candidate
→ import and inspect it
→ configure and install it
→ confirm persisted completion
→ evaluate the candidate
→ separately authorize approval and release
→ verify runtime behavior
```

Treat every step as distinct. An accepted or queued request is not proof that later work finished. Read the persisted state before moving forward, preserve the identity returned by Vira, and stop if the chosen client does not document the required operation.

## Use a supported interface

Pack support differs across JavaScript SDK, Python SDK, MCP, HTTP, and Studio. Check the installed package's public documentation and the current [MCP catalog](reference/mcp-tools.md) before choosing a surface. Do not infer HTTP routes, payload fields, or response shapes from a method name on another client. If the installed interface lacks a needed operation or the public schema is incomplete, request the current public contract rather than guessing.

For a minimal legacy example, see [`examples/packs/marketing-starter/`](../examples/packs/marketing-starter/); for the recommended quality bar, use [the Pack academy](../examples/packs/README.md) and the customer-facing workflow in [`tutorials/marketing-agent/`](../tutorials/marketing-agent/README.md). Verify any runnable example against the installed package types before adapting it to a customer's environment.

## Safe Pack content

Use fictional identifiers and synthetic content. Never place credentials, API keys, private URLs, tenant identifiers, customer data, or production traces in Packs committed to a public repository. Keep review and release decisions explicit and separate from authoring and installation.
