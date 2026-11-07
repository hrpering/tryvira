# Per-skill validation and readiness report

**Snapshot:** `tryvira` local, unpublished worktree based on public `main` commit `39eab1ad6466afabc486354acbc94a16cfb3970e`, 2026-11-07. These statuses are intentionally separate. “Contract reviewed” means compared with current public documentation/package metadata; it does not mean live traffic was sent. The shared fixture suite contains focused assertions for MCP, Packs, release authority, framework boundaries, trigger corpus structure, and deterministic Node/Python framework examples. It does not execute every skill as an agent or prove skill success rates.

| Skill | Structural | Contract review | Fixture/mock tests | Real local Vira | Relevant live interface | Ready to publish |
| --- | --- | --- | --- | --- | --- | --- |
| `vira-get-started` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — model trigger unmeasured |
| `vira-npm-cli` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — install not exercised |
| `vira-integrate-app` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — live connection not exercised |
| `vira-js-sdk` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no live API request |
| `vira-python-sdk` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no live API request |
| `vira-mcp` | Pass | Reviewed | Boundary assertions + trigger corpus; no live server call | No | No | No — no server initialize/tools/list call |
| `vira-http-api` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no HTTP call |
| `vira-framework-integration` | Pass | Reviewed against public JS/Python references and installed package artifacts | Next.js 5 tests + production build; MCP discovery fixture; FastAPI 7 tests; LangGraph 4 graph tests | No | No | No — live Vira/provider and response mapping remain unverified |
| `vira-signals` | Pass | Reviewed against public SDK docs | Governance assertions + trigger corpus; no live mutation | No | No | No — no lifecycle run |
| `vira-strategies` | Pass | Reviewed against public SDK docs | Governance assertions + trigger corpus; no live execution | No | No | No — no execution run |
| `vira-author-behavior` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no resource created |
| `vira-build-pack` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no Pack imported |
| `vira-packs` | Pass | Reviewed | Contract assertions + trigger corpus; no Pack lifecycle run | No | No | No — no Pack lifecycle run |
| `vira-observe-teach` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no evidence submitted |
| `vira-evaluate` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no provider evaluation run |
| `vira-evaluate-release` | Pass | Reviewed | Authority-boundary assertion + trigger corpus; no live transition | No | No | No — no evaluation/release run |
| `vira-release` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no approval or release run |
| `vira-runtime` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no runtime call |
| `vira-studio` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — Studio UI not tested |
| `vira-debug` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no live error fixture |
| `vira-lifecycle` | Pass | Reviewed | Shared static/trigger corpus checks; no agent execution | No | No | No — no lifecycle execution |
| `vira-full-lifecycle` | Pass | Reviewed | Shared trigger corpus; no isolated end-to-end execution | No | No | No — no isolated end-to-end environment |

## Validation evidence

- Structural check: `python3 scripts/validate_agent_skills.py`.
- Offline checks: `python3 -m unittest discover -s skills/evals -v` (structural behavior assertions, public contract cross-checks, an isolated Node mock fixture, and a ZIP packaging test).
- The 66-row trigger corpus has one positive, negative, and ambiguous prompt per skill; a separate 25-row synthetic workflow corpus covers surface gaps (including Vercel AI streaming), authority, asynchronous Pack completion, security, evaluation, and recovery. The exporter maps positives/negatives to Anthropic `run_eval.py` input and keeps ambiguities separate. It has not been submitted to an LLM; no selection accuracy is measured.
- `scripts/verify-repo.mjs` runs both checks as part of `npm run verify`; GitHub Actions runs `npm run verify` on PRs and main pushes.
- The Next.js app builds and its five tests pass, including a Vercel AI SDK stream route fixture; the MCP host fixture performs initialize and dynamic tool discovery; FastAPI has seven passing tests; LangGraph has four passing graph tests. The FastAPI suite includes a no-network wire-contract test against the installed published Python SDK 0.1.43 artifact. Tests use fixture Vira/model interfaces and do not call a Vira or model provider. Container image builds remain unverified because the local Docker socket denied access.
- A read-only source-of-truth cross-check found that Python `resolve_runtime` must not be treated as returning JavaScript projection fields. FastAPI and LangGraph now call `serve_behavior_projection` and consume its `body.projection`; the installed artifact's exact outgoing path, request body, and idempotency header are checked with a stub transport. No production file was changed and no live Vira call was made.
- The `.skill` packager is exercised in a temporary directory for a selective archive; all 22 archives were generated under `/private/tmp` and inspected for required files and excluded build noise. No archive is committed.
- The local skill-library suite has 25 passing tests. It checks skill structure and public contract assertions; it does not run an AI assistant against all skills, so trigger accuracy and execution success rates remain unmeasured.
- `npm run verify` scanned 293 files in the latest recorded run for secret-like patterns, restricted compute terminology, broken links, and package-version contracts. OCR over both PNG assets found no restricted compute terminology or token-like matches. This is source/pattern review, not a guarantee against unknown secret formats.
- The repository's existing `verify:registry` checks public artifacts/package metadata. It is separate from skill validation and does not establish Vira service or Studio functionality.
- Live npm/PyPI registry JSON was inspected on 2026-11-07: latest versions were `@tryvira/sdk` 0.1.43, `@tryvira/mcp` 0.1.44, and `tryvira-sdk` 0.1.43. Both npm tarballs were fetched and inspected; SDK method signatures and the MCP 11-tool catalog/access labels match the public references. The successful GitHub Actions registry-verification job downloaded and extracted the 0.1.43 Python wheel, then probed the published client for the documented public methods. It did not make a Vira API request. A fresh local `npm run verify:registry` passed with temporary network access enabled; it downloaded and verified those exact latest npm artifacts and the PyPI wheel. A separate sandbox-only attempt failed because registry DNS is blocked without network access. The MCP catalog parser also has a nested-schema regression fixture; no live MCP `tools/list` call was made.
- The current npm registry versions for the Vercel AI SDK example were queried as `ai` 7.0.164 and `@ai-sdk/openai` 4.0.110 on 2026-11-07; both are pinned in the example lock, and the monthly main-branch workflow refreshes these two packages before CI checks.
- OpenAI and Anthropic official `quick_validate.py` validators passed on all 22 skills in the final local tree. The Anthropic official packager generated and validated 22 `.skill` archives under `/private/tmp`; archives are not committed. Structural validation and successful packaging do not measure behavior quality.
- The published `skills` CLI 1.7.6 selectively installed `vira-js-sdk` from the local checkout into an isolated Codex project using copy mode; installed `SKILL.md` matched the source. This validates local repository discovery and project installation, not GitHub transport or skills.sh directory listing.
- The public `main` baseline has one parentless commit. The previous root tree and three short follow-on commits were previously scanned for restricted compute disclosures and known key/token formats; GitHub still returned old commits by direct SHA, so repository-level garbage collection is not confirmed. No npm/PyPI publish, skills.sh listing, `.skill` release, or public skill installation occurred in this local task. Skill triggering remains unmeasured against an external model evaluator and real Vira environment.
