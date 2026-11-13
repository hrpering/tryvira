# Vira Agent Skills: E2E readiness plan and evidence ledger

**Current scope:** 27 public Skills. This page describes the *six acceptance gates* for publishing a claim of completeness. It is not a checklist that can be marked PASS by a green source-code build.

## Gate 1: exact published SDK contract / snippet execution

**Done in source:** corrected Observe examples to include the seven required scope/identity fields in both JS and Python; added real API-call entry points gated by explicit opt-in; added unit tests for required envelope and negatives; corrected the Python TaskRun command. Basic source/code checks run in CI.

**Real PASS requires:** installed npm/PyPI release matching documented method signatures, execution in an authorized tenant, and actual server-created event IDs/status. Missing tenant credentials are **not** equivalent to PASS.

## Gate 2: canonical provider-to-verifier output and receipt

**Done in source:** a read-only live acceptance driver validates *real* scope, Signal mapping, Pack release, evaluation, Teach readback and four TaskRun modes, and fails closed when an authenticated final provider-output/post-model verified-answer handoff is absent. It has no undocumented verify endpoint and never synthesizes successful receipts.

**BLOCKED as an E2E capability:** the released public SDK/TaskRun read model does not yet expose the full server-owned, output-digest-bound verified provider response. This requires an **implementation in the Vira production backend/host integration**, a versioned public SDK readback contract, tests with an actual model response and a real verifier, and deployment to a scoped authorized environment.

**Acceptance:** same taskRunId, exact scope, task/child executor receipts, immutable program release and authority digests, true provider output, verifier checks and failure policy, final output digest and matching persisted receipt. Tampering, missing verifier, changing scope, partial child, unavailable host and repair exhaustion must fail closed.

## Gate 3: 27/27 portable installation

**Done in CI:** every \`.skill\` archive bundles the exact repository-owned Markdown, code examples and local dependency closure referenced by that Skill into \`references/repo\`. Owned links inside its Skill instruction/README are remapped to local paths. A separate validator opens **all 27 ZIPs** and checks manifest, license, archive safety and local dependency closure without reading the checkout. A follow-up smoke installer extracts all archives into three clean Codex/Claude/Cursor-style layouts; this does not prove real agent recognition.

**Acceptance boundary:** this verifies standalone instructional/resource archives. It does not install npm/PyPI SDK binaries, run live Vira calls or automatically prove Codex/Claude/Cursor recognized the Skill. \`npx skills add\` installs the source Skill and uses network links; the independently packaged \`.skill\` includes local copies.

## Gate 4: actual Skill auto-selection quality

**Done in tooling:** \`python3 scripts/eval_skill_selection.py --validate-only\` validates **84** positive/negative/ambiguous cases across all 27 Skills. \`--command\` runs an external **real agent adapter**, requiring a model ID, agent ID, trace ID and **per-Skill file-load events with the matching trace ID** for every case. \`--results\` scores independently captured real agent traces. Scoring separates positive recall, negative specificity and ungraded ambiguous cases. There is no model-choice simulation fallback.

**BLOCKED as a measured score:** no real Codex/Claude/Cursor agent trace source/model runtime is connected to this environment. Real benchmark scores cannot be reported until the user runs a real configured agent and preserves its selection traces. Historical explicit-Skill prompts are **not** an automatic-selection benchmark.

## Gate 5: Observe → Signal → Teach → Pack → Eval → Release → AUTO → output verification

**Done in tooling:** the read-only \`examples/javascript/skill-e2e-acceptance.mjs\` calls actual published SDK GET methods for scoped Connection, active approved Signal mapping, released Pack, persisted Evaluation, completed Teach analysis and four distinct persisted TaskRuns, requiring real input/authority/plan digests and lifecycle events. It intentionally refuses to report final verification when the output handoff is unavailable. The source-code negative tests check scope, mode, status and output-proof separation.

**BLOCKED for full PASS:** requires a real non-production connection, completed immutable Pack/evaluation/release, actual Teach evidence and all four eligible registered tasks/host capabilities. It additionally depends on Gate 2. No external mutations are performed by the checker.

## Gate 6: clear Skill installation/commercial permission

**Done in source:** the **Vira Agent Skill Installation & Application Use License v1.0** is included in all 27 Skill folders. It expressly permits download, installation, modification, commercial-client use, attribution-preserving redistribution inside projects and official portable Skill packages. It does **not** license the hosted service, private backend or trademarks.

**Legal review:** the custom license is not an OSI-certified open-source license. Before broad marketplace listing, have legal counsel confirm its compatibility with intended marketplaces and third-party bundled resources. The root repository documentation retains its own license outside official Skill packages.

## Local commands

~~~bash
npm run verify
python3 scripts/eval_skill_selection.py --validate-only
python3 scripts/package_agent_skills.py --out /tmp/tryvira-skills
python3 scripts/verify_portable_skills.py /tmp/tryvira-skills --expected 27
node --test skills/vira-observe/examples/observe-contract.test.mjs
node --test examples/javascript/skill-e2e-assertions.test.mjs
~~~

For a **real** model-trigger benchmark, provide an agent adapter command which executes the installed Skills and returns actual selected-Skill telemetry, then use \`--command\`. For a **real** tenant lifecycle check, supply exact IDs under a protected JSON manifest and the user's own VIRA_API_URL/KEY; see [Live acceptance](live-acceptance.md). The live checker does not mutate behavior.

## Deployment decision

| Dimension | Status before live acceptance |
| --- | --- |
| Public Skill text + examples and static checks | Source validated in CI |
| Portable ZIPs | 27/27 offline archive validation in CI |
| Installed npm/PyPI client + API compatibility | Partial; separate live acceptance required |
| Actual automatic model selection across supported agents | Not run; real trace runner available |
| Canonical TaskRun → provider → post-model PASS receipt | Unavailable public handoff; **blocks final E2E PASS** |
| Real customer tenant end-to-end | Not run; credentials/service authorization required |
| Skill commercial installation rights | Explicit Skill Use License included; legal review recommended |

**No artifact here claims all six dimensions are complete.** The remaining two red gates are actual integration requirements, not documentation polish.
