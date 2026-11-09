# Vira Agent Skills changelog

## 0.3.3 — 2026-11-09

- Removed loopback/fake-service integration tests and stub-only customer examples; documented the honest limits of static checks.
- Added real API-backed framework examples and aligned Python FastAPI with an actual model invocation after a Vira projection.
- Reworked the marketing lifecycle guide and skills to use actual configured services with non-production mutation gates.


## 0.3.2 — 2026-11-09

- Split marketing tutorial Teach review/evaluation from promotion and require a separate promotion opt-in.
- Added regression assertions that review/evaluation stop before promotion and promotion requires separate explicit authorization.

## 0.3.1 — 2026-11-09

- Corrected the Teach analysis JavaScript example to pass idempotency in the published SDK options argument.
- Split proposal evaluation from review and promotion so example code preserves explicit human authority boundaries.
- Added regression checks for the SDK call shape and separate transition instructions.

## 0.3.0 — 2026-11-09

- Added executable, opt-in gated Pack-bound Behavior Evaluation and asynchronous Teach analysis/readback SDK examples; the examples call the configured Vira API and are not simulated API sessions.
- Clarified API deployment-root configuration, server-side credential handling, persisted operation IDs, and async completion checks in skills and public references.
- Added request-shape and mutation-gate checks to standard skill verification; CI packages both skills and asserts runnable SDK examples are included in `.skill` archives.
- Revalidated all 22 skills with official OpenAI and Anthropic structural validators and packaged all 22 with Anthropic's official packager. No Vira API, model provider, or production service was called.
- Anthropic model evaluation remains unrun because the `claude` executable is unavailable; local FastAPI dependency installation was blocked by PyPI DNS.

## 0.2.0 — 2026-11-07

- Added specialist Signals and Strategies skills and trigger cases.
- Added runnable Next.js/OpenAI Agents and Vercel AI SDK routes, FastAPI, LangGraph/LangChain, and MCP host examples with offline checks and deployment/license guidance. Python integrations use `serve_behavior_projection`, separate from JS response fields.
- Added generated OpenAI skill metadata for all 22 skills.
- Live Vira behavior, Studio access, model-trigger accuracy, and hosted deployment remain unverified.

## 0.1.0 — 2026-11-07

- Initial 20-skill library for onboarding, SDK/HTTP/MCP integration, behavior authoring, Packs, evaluation, release, runtime, Studio guidance, debugging, and lifecycle orchestration.
- Added shared capability and authority references, 60 trigger prompts, offline regression checks, a structural validator, runnable Next.js/OpenAI Agents, FastAPI, LangGraph, and MCP client examples, installation guide, and publication-readiness reporting.
- No live Vira/Studio workflow or model-trigger benchmark is claimed.
