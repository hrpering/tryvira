# Agent Skill testing and readiness

The public library includes **27 task-specific Skills**. Repository CI automatically checks their structure, portable archives and example code. Agent selection and customer runtime acceptance are evaluated separately.

## Automated checks

| Check | Coverage |
| --- | --- |
| Skill structure | Metadata, task instructions, examples, licenses and links |
| Packaging | All 27 .skill archives and their bundled documentation/source references |
| Installation layout | Clean extraction into Codex-, Claude- and Cursor-style Skill directories |
| SDK integration | Published JavaScript/Python client serialization with offline test transports |
| Examples | Pack build checks, Next.js test/build and Python syntax |
| Trigger scenarios | 84 positive, negative and ambiguous inputs; corpus validation only |

Archive installation checks do **not** invoke an agent model. The model-selection evaluator requires actual model IDs and Skill-load telemetry before reporting a score.

## Live acceptance

A complete end-to-end deployment test must read actual records for the Connection, Signal mapping, Teach analysis, Pack evaluation/release, AUTO TaskRun child execution and provider-verification result.

| Live stage | Evidence |
| --- | --- |
| Agent selection | Real observed Skill-load events for the 84 evaluation prompts |
| Release | Approved artifact identity, evaluation and release state |
| Execution | Scoped TaskRun records for eligible SINGLE, STRATEGY, COMPOUND and HYBRID work |
| Verified response | Provider output, matching post-model result, output digest and receipt |

The final provider-output-to-verifier readback is not yet exposed by the published TaskRun client; full verified ON-answer acceptance depends on that integration.

## Run the local checks

~~~bash
npm run verify
python3 scripts/eval_skill_selection.py --validate-only
python3 scripts/package_agent_skills.py --out /tmp/tryvira-skills
python3 scripts/verify_portable_skills.py /tmp/tryvira-skills --expected 27
python3 scripts/smoke_install_skills.py /tmp/tryvira-skills --expected 27
~~~

[Live acceptance procedure](live-acceptance.md) · [Compatibility notes](production-contract-audit.md) · [Availability](../product-status.md)

## Usage rights

Each Skill includes an [installation and application-use license](../../skills/vira-observe/LICENSE). Other repository materials and hosted services retain their own terms.
