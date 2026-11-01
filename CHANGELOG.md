# Changelog

## Unreleased

- Synced public JavaScript, Python and MCP documentation to the published `0.1.14` client line.
- Added a public-safe end-to-end developer guide covering connection, capability discovery, observations, Semantic Task creation, Behavior Point creation, Programs/Strategies, semantic resolution, evaluation/release, runtime resolution, Strategy continuation, and Pack verification/release.
- Added a runnable JavaScript lifecycle example and updated JavaScript/Python/tutorial dependencies to the `0.1.14` package line.
- Updated MCP guidance to use live `server/discover` → `initialize` → `tools/list` discovery instead of making a hard-coded tool count the integration contract.
- Expanded Pack documentation with manifest variables, parsing formats, conflict/configuration inspection, canonical materialization, evaluation, approval, release, and upgrade preview.
- Clarified that Pack import/install, semantic selection, Teach promotion, quality scoring, and Strategy activation do not independently grant runtime release authority.
- Updated release/runtime documentation to preserve exact governed identity, authority digests, receipts/traces, and semantic Program context through runtime projection/Strategy selection.
- Added `POST /v1/packs/{packId}/upgrade-preview` to the public HTTP reference.
- Updated the repository verification gate to enforce current `0.1.14` docs and end-to-end lifecycle markers rather than the previous `0.1.6`/fixed-tool-count assumptions.
- Rebuilt the root README and docs index as developer entry points while keeping secrets, tenant data, private infrastructure and operator-only deployment configuration out of the public repository.

## 0.10.0

- Synced the public repository with the latest canonical authoring and capability-discovery surfaces.
- Updated published `@tryvira/sdk` and `@tryvira/mcp` documentation to `0.1.6`; Python remains `tryvira-sdk` `0.1.6`.
- Added scoped product capability discovery through `listCapabilities`, `list_capabilities`, `GET /v1/capabilities`, and MCP `list_capabilities`.
- Added direct Semantic Task and Behavior Point authoring across JavaScript, Python, HTTP, and MCP.
- Added explicit Strategy activation across JavaScript, Python, HTTP, and MCP.
- Documented compiled/persisted Strategy variants as governed immutable revisions rather than placeholders.
- Expanded Teach AI from evidence submission to proposal creation plus `review`, `evaluate`, and `promote` transitions.
- Added MCP Teach evidence/proposal/transition/release tooling and corrected the previous documentation that said Teach was not exposed through MCP.
- Expanded the MCP catalog from 31 to 41 tools.
- Added canonical authoring and capability-discovery guides plus a runnable JavaScript canonical-authoring example.
- Expanded JS/Python references with AI-system list/read helpers and the new authoring/lifecycle methods.
- Updated the canonical HTTP route map with capability discovery, Task/Point authoring, Strategy activation, and Teach proposal transitions.
- Bumped public documentation metadata and verification contract to `0.10.0`.

## 0.9.0

- Synced docs with published `@tryvira/sdk`, `@tryvira/mcp`, and `tryvira-sdk` package identities.
- Documented current client package versions and MIT client licensing boundary.
- Added Capability × Integration Surface matrix.
- Promoted `connectOnce` / `connect_once` and connection verification.
- Expanded Teach AI lifecycle.
- Split Behavior Evaluation from Response Quality & Decision.
- Documented `evaluateQuality` / `evaluate_quality` and `POST /v1/quality/evaluate` without binding the product to a specific decision provider.
- Expanded JS/Python docs with Strategy execution, capability negotiation, model-serving, behavior projection, deployment evidence, and release surfaces.
- Expanded MCP docs from 24 to the then-current 31-tool surface.
- Made `docs/reference/api.md` the canonical HTTP route reference.
- Updated tutorials/examples to published package names and added response-quality examples.
- Added AI prompt for bounded response-quality selection/abstention.
- Corrected repository licensing metadata: docs repo proprietary; separately published client packages MIT.

## 0.8.0

- Synced Strategy `response` / `behavior_plan` contracts, user-owned preference guidance, runtime notes, and experimental GPU architecture vision.

## 0.7.0

- Added Authoring Quality guidance, weak vs production examples, and AI authoring prompts.

## 0.6.0

- Reworked public positioning, visual hierarchy, illustrations, docs navigation, and repository presentation.

## 0.5.0–0.5.1

- Added AI setup/troubleshooting prompt library and HTTP API setup prompt.

## 0.4.0

- Added structured troubleshooting center.

## 0.3.0–0.3.1

- Expanded SDK/MCP/HTTP references and repository verification.

## 0.2.0

- Added core behavior authoring/lifecycle docs and Marketing Agent tutorial.

## 0.1.0

- Initial public repository structure.
