# Agent Skills capability coverage

Baseline source: previously published public single-root `main`; this update replaces that tree with one parentless commit. The Next.js project covers both OpenAI Agents and Vercel AI SDK, and the LangGraph project uses LangChain OpenAI. Contracts were checked against published SDK artifacts, public capability/API/MCP references, and package-version metadata on 2026-11-07. The production repository was consulted read-only for implementation questions; unpublished source details are deliberately excluded from public guidance.

| Developer goal | Primary skill | Supporting skills | JS SDK | Python | HTTP | MCP | Studio | Status / limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Start, inspect stack, select a surface | `vira-get-started` | `vira-integrate-app` | Yes | Yes | Yes | Partial | Not verified | capability discovery first |
| Install/upgrade npm package or run MCP CLI | `vira-npm-cli` | `vira-js-sdk`, `vira-mcp` | Yes | — | — | Yes | — | versions must come from registries |
| Integrate JS/TS app | `vira-js-sdk` | `vira-integrate-app` | Yes | — | Yes | Partial | — | MCP is not SDK parity |
| Integrate Python app | `vira-python-sdk` | `vira-integrate-app` | — | Yes | Yes | Partial | — | use published wheel contract |
| Framework integration | `vira-framework-integration` | JS/Python/HTTP | Yes | Yes | Yes | Conditional | — | no dedicated adapters claimed |
| Authentication, scope, connection | `vira-integrate-app` | `vira-http-api`, `vira-debug` | Yes | Yes | Yes | No connect tool | Not verified | MCP catalog lacks connection operations |
| Observe, traces, feedback, outcomes | `vira-observe-teach` | `vira-lifecycle` | Yes | Yes | Yes | No dedicated tool | Not verified | MCP has no observation tool |
| Semantic Task / Behavior Point / Program / Strategy authoring | `vira-author-behavior` | `vira-build-pack` | Yes | Yes | Yes | Partial | Not verified | MCP provides only a subset |
| Strategy validate/simulate/activate/execute | `vira-strategies` | `vira-runtime`, `vira-author-behavior` | Yes | Yes | Yes | Partial | Not verified | MCP lists strategies, no execution lifecycle |
| Build/import/install/upgrade Pack | `vira-build-pack` | `vira-packs` | Yes | Yes | Yes | No Pack tools | Not verified | async install and materialization must be confirmed |
| Signal discovery/review/materialization/mapping | `vira-signals` | `vira-observe-teach`, `vira-http-api` | Yes | Yes | Yes | No dedicated tool | Not verified | consent and human review required |
| Teach evidence/proposals/review | `vira-observe-teach` | `vira-lifecycle` | Yes | Yes | Yes | Partial | Not verified | current MCP creates evidence/proposals only |
| Behavior Evaluation and dataset | `vira-evaluate` | `vira-evaluate-release` | Yes | Yes | Yes | No tool | Not verified | live provider execution not part of offline tests |
| Response Quality & Decision | `vira-evaluate` | `vira-runtime` | Yes | Yes | Yes | No tool | Not verified | distinct from Behavior Evaluation |
| Approval and release | `vira-release` | `vira-evaluate-release` | Yes | Yes | Yes | No tool | Not verified | explicit authorization remains mandatory |
| Comparative evaluation, evaluation plans, finding review | `vira-evaluate` | `vira-evaluate-release` | Yes | Yes | Yes | No tool | Not verified | server-owned comparisons; client cannot submit arm outputs |
| Improvement proposals and immutable behavior revision candidates | `vira-evaluate-release` | `vira-observe-teach`, `vira-release` | Yes | Yes | Yes | No tool | Not verified | review, evaluation, accept/reject, and Pack creation are distinct |
| Pack revision diff, approval/release transitions, materialization | `vira-packs` | `vira-build-pack`, `vira-release` | Yes | Yes | Yes | No tool | Not verified | revision actions must bind to the accepted candidate and exact digest |
| Conversation archive, revocation, Teach analyses/recommendations | `vira-observe-teach` | `vira-evaluate-release` | Yes | Yes | Yes | No tool | Not verified | consent, data minimization, and revocation remain in scope |
| Runtime capability attestation, model serving, projections/capsules | `vira-runtime` | `vira-debug`, `vira-framework-integration` | Yes | Yes | Yes | Partial | Not verified | runtime authority differs from product capability discovery |
| Deployment comparison and authoritative health evidence | `vira-release` | `vira-runtime`, `vira-debug` | Yes | Yes | Yes | No tool | Not verified | evidence recording does not itself deploy or roll back |
| Runtime resolve, execute, trace, receipts | `vira-runtime` | `vira-debug` | Yes (`RuntimeResolution` may include projection fields) | Yes (`serve_behavior_projection` returns a `projection` object) | Yes | `resolve_runtime` subset; no projection tool | Not verified | operation-specific response shapes; semantic resolution is not authority |
| Studio navigation | `vira-studio` | `vira-debug` | — | — | alternative | Not verified | Not verified | route presence is not UI operation evidence |
| Diagnose integration failures | `vira-debug` | surface-specific skill | Yes | Yes | Yes | Partial | Not verified | gather sanitized evidence, fix earliest boundary |
| Full lifecycle orchestration | `vira-full-lifecycle` | all relevant skills | Yes | Yes | Yes | Partial | Not verified | complete flow depends on scoped surfaces and approval |

**Direct source-code integration:** not a supported customer surface. Integrate through published SDKs, HTTP API, MCP, or verified Studio access. Internal implementation details are not copied into these skills.

The full method-by-method mapping for the latest published JavaScript and Python SDK artifacts is in the [published SDK method inventory](../reference/sdk-method-inventory.md). CI compares the complete SDK method sets with that mapping rather than checking a hand-picked subset.

## Validation-state meaning

- **Structurally validated:** frontmatter, folder name, metadata, relative links, and required OpenAI metadata pass repository checks.
- **Contract reviewed:** instructions were compared with public docs and published package metadata; this is not an API call.
- **Static/contract checked:** repository and published-package checks passed; these do not call Vira or prove a live workflow.
- **Local Vira / interface / publication:** not tested unless a future report records concrete evidence. No such test is claimed here.
- **Studio:** public material only describes scoped capability discovery. Product UI workflows are not enumerated as verified because there is no authenticated Studio test session and product access is not open yet.
