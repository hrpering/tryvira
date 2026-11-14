# Governed Operations Pack · Advanced (v1.1.0)

Three independent Semantic Tasks handle support summaries, inventory reviews and incident investigations. The first two are read-only COMPOUND candidates; the incident task has a structured, bounded **collect → verify → compose** Strategy.

Support summaries preserve supplied ticket IDs and sample counts; inventory summaries separate on-hand, reserved, currently available and confirmed inbound from forecasts; incident reports separate observations, hypotheses, verified causes and unanswered questions. Missing or BLOCKED children must not be reported as successful work.

**This is not a warehouse connector or live remediation bot.** The Strategy intentionally allows zero external tool calls. Its named `default.response` verifier, post-model judges, child executors, released identity and host capabilities must exist in the authorized deployment for live execution to succeed.

The 29 criteria-based test cases cover source arithmetic, missing tools/evidence, timestamped logs, incomplete children, proposed actions and routing. None contains model scores or a real TaskRun receipt.

[Source tests](tests/cases.json) · [Evaluation protocol](../../../docs/pack-evaluation.md) · [Execution modes](../../../docs/execution-modes.md)
