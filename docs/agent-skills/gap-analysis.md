# Agent Skills repository gap analysis

## Inputs reviewed

- Current public `tryvira` README, capability map, JavaScript/Python/API/MCP references, Pack guide, auth/security guidance, package version metadata, examples, repository verifier, and CI workflow.
- Production code was consulted read-only for signature/response questions; public materials do not expose private implementation details, which are not copied into this library.
- No starter ZIP was present in the supplied attachment or public checkout; existing public examples and skill files formed the baseline.

## Gaps addressed in this working change

| Gap | Change |
| --- | --- |
| Task-oriented installable skills were missing | Expanded to 22 composable skills, adding dedicated Signals and Strategies workflows, plus lifecycle orchestration |
| SDK/API/MCP parity could be inferred | Surface matrix and skills distinguish documented clients; MCP always discovers `tools/list` at runtime |
| Pack snippets could skip async completion or fake evaluation | Pack guidance requires import payload, direct variables map, materialization confirmation, persisted `evaluationId`, exact digest, and separate approval/release |
| User requests could conflate semantic selection, Teach promotion, activation, and release | Authority transitions are explicitly separated across authoring/evaluation/release/lifecycle skills |
| Framework integration had helper-only examples | Added executable Next.js routes for OpenAI Agents and Vercel AI SDK, FastAPI, LangGraph/LangChain, and MCP client projects with lockfiles, Docker files where appropriate, and offline tests |
| Python dependencies were unpinned | Added exact direct requirements and generated transitive hash locks for Python 3.12; Docker installs with `--require-hashes` |
| Example checks were not in CI | CI now runs JavaScript example tests/build and FastAPI/LangGraph tests using the committed locks |
| Deployment and licensing boundaries were unclear | Added deployment/security/SBOM guidance and third-party license notice guidance; repository's proprietary license remains controlling for Vira-authored files |
| Creator usage and validation limits were unclear | Documented actual OpenAI initializer/metadata generator, official OpenAI and Anthropic validators, Anthropic packager, offline checks, and unrun evaluations separately |

## Remaining product and evidence gaps

1. **MCP is not full parity:** published tools do not cover connection, observation, Pack lifecycle, Behavior Evaluation, Strategy execution, Response Quality, or release creation. Skills route to SDK/Python/HTTP where public contracts support them.
2. **Studio UI is unverified:** no authenticated Studio browser session or product test tenant was available. Route/source presence is not reported as UI proof.
3. **No isolated live Vira environment was available:** no connect, evaluation, release, runtime, Teach, approval, rollback, receipt, trace, OFF/ON comparison, or tenant-isolation flow was executed.
4. **Model-based evidence is still narrow:** one isolated Codex CLI run positively selected `vira-signals` for a gated Signals mapping plan; a negative generic-Python task did not select the skill; an ambiguous Vira-dashboard prompt produced a clarification without an API call (selection itself was not observable). A later explicit multi-skill Next.js route task read four relevant skills, implemented the Vercel AI SDK boundary, corrected initial TypeScript/test failures, then passed six stubbed tests and a build against installed SDK types. Since the prompt named the skills, it tests instructed workflow execution, not automatic skill selection. These probes provide no selection accuracy or broad agent success rates; the trigger and workflow JSONL corpora have not been evaluated by a model.
5. **Live API/provider calls were not run:** example tests use fake Vira/model interfaces. The marketing tutorial now executes all ten scripts against a loopback mock and checks its SDK wire contract, queued materialization, digest binding, and authority gates; Next.js, MCP, FastAPI, and LangGraph fixtures also pass. These cover local control flow only, not backend authorization, provider results, or runtime behavior in a Vira tenant.
6. **Projection response shapes differ by SDK:** JavaScript `RuntimeResolution` may expose `projectionMode` and `behaviorProjection.rendered`; the Python SDK uses `serve_behavior_projection` and a `projection` response object. Framework examples follow each operation's contract. Projection content is model guidance, not authorization for tools or external effects; applications need separate authorization for those effects.
7. **Package/marketplace publication remains incomplete:** the public GitHub source tree has been updated, but no npm/PyPI release, skills.sh directory listing, or `.skill` publication occurred.
8. **No Superpowers model pressure test was run:** its test-first method informed offline regression authoring, but no independent model evaluation using that method is claimed.

## Recommended product and documentation work

- If full MCP parity is desired, publish exact tools/schemas and authority behavior for connection, observation, Pack lifecycle, evaluation, Strategy execution, and release.
- Provide an isolated synthetic Vira tenant/sandbox for lifecycle regression and model evaluations.
- Provide a deterministic, authenticated Studio test environment and list tested customer UI workflows.
- Publish stable response schemas for runtime decisions/projections across JS, Python, HTTP and MCP so integration examples can map model execution without application-specific assumptions.
- Keep package contracts synchronized across SDK artifacts, API schemas, MCP catalog, examples, and registry verification.
