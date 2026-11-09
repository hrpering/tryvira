# Agent Skill authoring and verification

This library uses the OpenAI Codex Skill format and the official Anthropic validator/packager where available. Skills contain portable instructions and links to real customer-facing examples; examples call published SDK/API/MCP surfaces with operator-supplied configuration. Do not put internal implementation details, customer identifiers, credentials, or simulated Vira receipts in them.

## Applied workflow

1. Inventory the public SDK/API/MCP/Studio capabilities and map developer tasks to focused skills. Never infer unsupported surface parity.
2. Use the official initializer for new skills, then replace scaffold text with task-specific activation, inputs, authority boundaries, operations, and outputs.
3. Generate and validate OpenAI metadata, check Anthropic-compatible packaging, inspect installed archives, and verify links.
4. Compare every sample call to the current published package/API contract and route customer tasks to an executable real-service example when one exists.
5. Run repository, structural, dependency, package, and build checks. These checks must not claim that Vira has returned a state unless the real API was called.
6. Run a live workflow only with an operator-provided isolated non-production tenant, credentials, provider access, and explicit authorization for each mutation. Record request IDs, persisted state, package versions, and stop points.
7. Review public files for secrets, customer data, private implementation detail, unsupported product claims, license ambiguity, and accidental authority shortcuts.

## Current verification boundary

The former loopback fake-service suite was used to inspect SDK request bodies, async polling and authority gates without tenant credentials. Its responses were synthetic and did not show that Vira worked. That suite and the framework stub-only examples have now been removed from the public customer examples and CI. Current CI checks source structure/contracts, package versions, SDK/Agent Skill packaging, JavaScript builds, Python syntax, and the tutorial's mutation guard. It does not fabricate Vira responses.

No live Vira API, provider, MCP server, Studio UI, or customer tenant was available for this revision. The real customer workflows are documented in the [Marketing Agent tutorial](../../tutorials/marketing-agent/README.md), [framework examples](../../examples/frameworks/README.md), and [Teach-to-Pack Revision workflow](../../examples/frameworks/node-next/REVISION-WORKFLOW.md). They remain unverified against a live tenant until an operator runs them in an isolated non-production scope.
