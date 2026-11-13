# Plan a complete governed lifecycle

## Short test prompt

> Plan how our support agent will observe errors, release a behavior and learn from corrections.

## Detailed test prompt

> Map Observe → Signals → Task/Point/Program/Pack → evaluation → human approval/release → AUTO TaskRun → real verifier receipts → consented outcome/Teach. Every transition needs owner and stop gate.

## Expected result

Return a stage matrix with actual vs planned IDs, scope, evidence and blockers.

Follow the [production-aligned Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-lifecycle/SKILL.md) and [canonical TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md). Live execution requires customer-authorized non-production scope, real server IDs and supported installed client operations. Never fabricate an acceptance receipt.

## Negative test

Do not invent task IDs, Signal producers, evaluation pass or final provider answer.
