# Complete skill-led workflow

Use the [recordable Skills demonstration](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/video-workflow.md). This is a guide for a developer's own working environment, not a packaged Vira service or a claimed live run.

## Short test prompt

> Inspect the installed Vira Skills. Design a helpful support-assistant behavior that does not invent customer order facts, then tell me how to validate that candidate.

## Detailed test prompt

> Choose the needed Vira Skills, create a new portable candidate from the public Pack examples, add positive, negative and missing-data cases, and check the candidate's real files. Use AUTO TaskRun for authorized non-production runtime readback, not a fabricated model response. Separate live execution receipts from final provider-output verification. Describe how consented Observe evidence could enter a human-reviewed Teach revision, evaluation and release cycle.

## Validate the generated candidate itself

From the public repository root, run node scripts/validate-pack-candidate.mjs /path/to/candidate and retain its JSON report. The command checks the new candidate rather than only the repository examples; a PASS has evidenceLevel offline-structure-only. Fix all reported errors, then separately evaluate through a provisioned Vira service.

## Deliverables and boundaries

1. Evidence the assistant actually loaded each selected Skill.
2. A candidate Semantic Task, Behavior Point and Program; add Strategy only for a true staged need.
3. A record of local validation commands applied to the new candidate, with unsupported checks clearly identified.
4. If Vira access is genuinely configured, persisted route and TaskRun status with real selected mode, child state and receipts.
5. A separate output-bound verification status, marked unavailable if not exposed by the installed client.
6. A Teach review/evaluation/release plan that does not silently promote model suggestions.

## Negative test

Do not invent tenant or TaskRun identities, a second task to force COMPOUND, a registered judge, a permission grant, an ON answer, a receipt or a passing evaluation. No local structural check proves an actual Vira service call.
