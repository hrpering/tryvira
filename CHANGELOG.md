# Changelog

## Unreleased documentation and security alignment

- Expanded the Agent Skills library from 20 to 22 skills, adding focused Signals and Strategies workflows, coverage/gap analysis, installation guidance, trigger and workflow evaluation datasets, local validation, standalone `.skill` packaging, and CI regression checks.
- Added runnable Next.js/OpenAI Agents and Vercel AI SDK routes, FastAPI, LangGraph/LangChain, and MCP client examples with pinned dependencies, Python hash locks, deployment/license notes, and CI checks. A read-only contract comparison corrected Python examples to use `serve_behavior_projection`; offline tests/builds passed. Live Vira, provider/model, Studio, package publishing, and remote repository updates remain unclaimed.
- Synced public package references to registry latest (JS SDK 0.1.43, MCP 0.1.44, Python SDK 0.1.43).
- Fixed nested MCP tool parsing so the generated catalog preserves effectful access metadata; added a regression fixture.
- Corrected JS SDK scope-field examples and marketing tutorial observations to match current published types.
- Added explicit non-production/write opt-ins and separated Pack/Teach review gates in the marketing tutorial.
- Expanded secret-pattern scanning and added checks for common cloud/payment/messaging key formats.
- Added automatic npm/PyPI version and MCP tool-catalog synchronization.
- Corrected Pack installation and evaluation examples to use current SDK signatures and persisted, digest-bound evaluation records.
- Documented the published MCP package's narrower surface and corrected MCP/SDK/API capability differences.
- Clarified the repository license scope relative to separately published client packages.
- Added the active-development and product-access notice and Studio link.
- Rewrote the public repository history to one root commit after final contract and security review.

## 0.1.26 documentation sync

- Updated public package references, examples, registry verification, and SDK setup instructions to the published 0.1.26 line.
