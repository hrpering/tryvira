# Vira documentation

This repository contains public product guidance, integration examples, and Agent Skills. Vira is under active development; product access is not open yet. See the [product overview](product-positioning.md) or visit [Vira Studio](https://studio.tryvira.xyz) for updates.

## Start here

- [Developer guide](developer-guide.md) for choosing a supported client and following the customer journey.
- [Published packages](published-packages.md) for current JavaScript, Python, and MCP releases.
- [Capability map](capability-map.md) for a high-level view of supported surfaces.
- [Teach AI](teach.md) for the evidence-to-improvement journey.
- [Agent Skills](../skills/README.md) for task-based assistant guidance.
- [Runnable framework examples](../examples/frameworks/README.md) for customer-configured integrations.

## Product journey

```text
Connect an AI application
→ collect permitted evidence
→ describe intended behavior
→ review suggestions and evaluate changes
→ explicitly authorize any release
→ apply eligible behavior through a supported integration
→ inspect results and continue learning
```

Suggestions, review, evaluation, release, and runtime use are separate steps. Exact operations depend on the installed package and customer permissions. Use each package’s public documentation or the current MCP tool list to confirm support; do not assume all interfaces expose the same actions.

## Security

Use customer-owned credentials and scopes. Never publish API keys, private account details, customer records, or internal deployment information. Keep credentials server-side and redact customer data from diagnostics.
