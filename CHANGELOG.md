# Changelog

## 0.8.0

- Synced public Strategy documentation with the current `response` and `behavior_plan` result contracts.
- Added explicit response-owned and downstream-chatbot behavior-plan Strategy examples.
- Updated the canonical marketing Strategy example to the compact behavior-plan architecture used for existing-chatbot integrations.
- Added guidance to keep user preferences user-owned, updateable, removable, and separate from Strategy policy constants.
- Updated AI authoring prompts to choose final-answer ownership before designing a Strategy and to reject duplicate full-answer generation.
- Added current runtime architecture notes covering Strategy output ownership, preference handling, and optional provider timing metrics.
- Added a public GPU acceleration architecture vision and FAQ.
- Added a GPU architecture illustration showing same-device behavior + model inference as an experimental direction.
- Documented CPU/conventional runtime as a first-class path and accelerator promotion as parity-gated staged rollout.
- Explicitly marked accelerator work as experimental rather than generally production available.
- Added all new Strategy/GPU documentation and examples to repository verification.
- Synced repository package metadata to version 0.8.0.

## 0.7.0

- Added an Authoring Quality Guide covering Semantic Tasks, Behavior Points, Behavior Programs, Strategies, Signals, and evaluation design.
- Added side-by-side generic/weak versus production-quality examples.
- Added cross-domain authoring examples for marketing, support, research, and operations.
- Added paired generic and production-quality Strategy JSON examples.
- Expanded the AI Prompt Library with authoring prompts for Semantic Tasks, Behavior Points, Behavior Programs, Strategies, Signals/evaluation, governed Packs, and quality review.
- Added dedicated prompts for deepening generic Behavior Points and simplifying or deepening existing Strategies.
- Added authoring-quality examples to documentation and examples navigation.
- Added all authoring-quality guides, examples, and prompts to repository verification.
- Synced repository package metadata to version 0.7.0.

## 0.6.0

- Reworked the root README to improve positioning, visual hierarchy, and developer navigation.
- Added public SVG illustrations for the behavior lifecycle, request/runtime path, integration surfaces, and use cases.
- Added a social preview asset for GitHub repository presentation.
- Expanded `What is Vira?` and `How Vira works` into full product and architecture explanations.
- Added clearer product positioning, use-case framing, and public repository scope language.
- Added direct troubleshooting and AI prompt entry points to the root README.
- Added direct HTTP, JavaScript, Python, and MCP setup entry points from the root README.
- Expanded the docs index with visual maps and clearer goal-based navigation.
- Added a maintainers' GitHub metadata guide for About description, topics, website, and social preview.
- Added presentation assets and metadata docs to repository verification.
- Synced repository package metadata to version 0.6.0.

## 0.5.1

- Added a guarded AI setup prompt for direct public HTTP API integration.
- Linked the HTTP API setup prompt from the documentation maps.
- Added the HTTP API setup prompt to repository verification.
- Refreshed root README navigation to expose troubleshooting and AI prompt surfaces.
- Synced the changelog with the new documentation navigation.

## 0.5.0

- Added an AI Setup & Troubleshooting Prompt Library for repository-aware coding assistants and normal chat workflows.
- Added guarded setup prompts for JavaScript/TypeScript SDK, Python SDK, MCP, and first behavior lifecycle configuration.
- Added a master Vira integration debugger prompt that ranks root causes, proposes the smallest safe fix, and requires verification before further changes.
- Added error-aware prompts for HTTP/auth/scope/SDK validation, Semantic routing, Behavior Points, Signals, Packs, Strategies, Teach/evaluation, and runtime/release.
- Added prompts for the documented Signal, Pack, Teach/evaluation, SDK, MCP, Strategy, and lifecycle error codes.
- Added prompt guardrails against exposing credentials, bypassing scope/auth/release gates, fabricating IDs/evidence/evaluation results, mutating released Packs, or making broad destructive changes without evidence.
- Linked the AI prompt library from the documentation and troubleshooting maps.
- Added the AI prompt library to repository verification.

## 0.4.0

- Added a full troubleshooting center organized by API, SDK, MCP, semantic routing, Behavior Points, Signals, Packs, Strategies, Teach/evaluation, and runtime/release.
- Standardized troubleshooting entries around meaning → common causes → fix → verify.
- Added HTTP status and retry guidance, including idempotency and request ID handling.
- Documented public SDK validation errors and common MCP configuration/scope failures.
- Added Pack lifecycle error guidance for import, evaluation, approval, release, and version changes.
- Added Signal proposal/mapping debugging flows and Strategy validation/simulation/runtime guidance.
- Added Teach evidence/review/evaluation and runtime/release troubleshooting flows.
- Added the troubleshooting files to repository verification.

## 0.3.1

- Refined public documentation to focus on supported integration concepts and workflows.
- Simplified SDK, MCP, runtime, and trace references for external developers.
- Improved repository verification for the published documentation set.

## 0.3.0

- Redesigned the root README for a stronger product + developer first impression.
- Added complete JavaScript / TypeScript SDK method reference.
- Added expanded Python SDK reference.
- Added production-safe MCP configuration reference.
- Added MCP tool reference with read-only/effectful classification.
- Added expanded HTTP API route map.
- Added connection guide and troubleshooting guide.
- Improved examples navigation.
- Simplified trace documentation for public examples and developer workflows.

## 0.2.0

- Added Behavior Point authoring guide.
- Added Signal lifecycle guide.
- Added Semantic routing guide.
- Added Behavior Program guide.
- Added Behavior Strategy guide.
- Added Teach guide.
- Added evaluation, approval, release, runtime, and simple trace documentation.
- Added JavaScript and Python SDK guides.
- Added public API route reference.
- Added end-to-end Marketing Agent tutorial.
- Added public Pack example.
- Refined trace documentation and examples.

## 0.1.0

- Initial public repository structure.
