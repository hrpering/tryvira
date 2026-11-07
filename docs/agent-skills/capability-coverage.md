# Agent Skills capability coverage

Baseline source: public `main` at `39eab1ad6466afabc486354acbc94a16cfb3970e`; this local, uncommitted working tree adds two specialist skills and four runnable example projects. The Next.js project covers both OpenAI Agents and Vercel AI SDK, and the LangGraph project uses LangChain OpenAI. Contracts were checked against public capability, API, SDK/MCP references and package-version metadata on 2026-11-07. The production repository was consulted read-only for implementation questions; unpublished source details are deliberately excluded from public guidance.

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
| Runtime resolve, execute, trace, receipts | `vira-runtime` | `vira-debug` | Yes (`RuntimeResolution` may include projection fields) | Yes (`serve_behavior_projection` returns a `projection` object) | Yes | `resolve_runtime` subset; no projection tool | Not verified | operation-specific response shapes; semantic resolution is not authority |
| Studio navigation | `vira-studio` | `vira-debug` | — | — | alternative | Not verified | Not verified | route presence is not UI operation evidence |
| Diagnose integration failures | `vira-debug` | surface-specific skill | Yes | Yes | Yes | Partial | Not verified | gather sanitized evidence, fix earliest boundary |
| Full lifecycle orchestration | `vira-full-lifecycle` | all relevant skills | Yes | Yes | Yes | Partial | Not verified | complete flow depends on scoped surfaces and approval |

**Direct source-code integration:** not a supported customer surface. Integrate through published SDKs, HTTP API, MCP, or verified Studio access. Internal implementation details are not copied into these skills.

## Validation-state meaning

- **Structurally validated:** frontmatter, folder name, metadata, relative links, and required OpenAI metadata pass repository checks.
- **Contract reviewed:** instructions were compared with public docs and published package metadata; this is not an API call.
- **Fixture tested:** only the offline scenario checks listed in `skills/evals/test_skill_library.py` have run.
- **Local Vira / interface / publication:** not tested unless a future report records concrete evidence. No such test is claimed here.
