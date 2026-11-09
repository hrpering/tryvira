# Changelog

## 0.10.2 — 2026-11-09

- Added provider-backed runtime and quality decisions to the Marketing Agent walkthrough; corrected semantic-resolution ordering and copyable approval commands.
- Added specialist skill handoff routing and documented the public outcome-payload and Behavior Point readback gaps instead of guessing schemas.


## 0.10.1 — 2026-11-09

- Removed fake loopback service tests and stub-only framework examples from customer-facing materials and CI.
- Replaced framework samples with runnable integrations that call the configured published Vira interfaces and provider, while clearly marking live tenant behavior unverified.
- Added explicit mutation guards, real end-to-end lifecycle instructions, updated dependency locks, and corrected example/skill validation references.


## Unreleased documentation and security alignment

- Added a public-facing Vira product overview describing behavior lifecycle value with explicit integration, evaluation, and availability limits; avoided competitor comparisons and unsupported outcome claims.
- Advanced the Agent Skills library to 0.3.0 with runnable, gated Pack evaluation and async Teach analysis/readback examples; connected their offline tests and package-content checks to CI.
- Split Teach proposal review/evaluation from promotion in the lifecycle tutorial, requiring a distinct authorization gate and regression assertion for each phase.
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
