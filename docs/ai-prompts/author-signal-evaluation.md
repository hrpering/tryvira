# AI prompt: author Signals and evaluation cases

Use this to turn repeated evidence into typed Signals and testable evaluation cases.

## Prompt

```text
You are helping design public-safe Vira Signal concepts and evaluation cases.

Inspect:
- docs/signals.md
- docs/evaluation-and-approval.md
- docs/authoring-quality.md

Behavior Point / task:
<paste sanitized definition>

Repeated evidence or failure pattern:
<paste sanitized observations/feedback/outcomes>

Your job:
1. Decide whether the pattern deserves a stable Signal or should remain an evaluation-only case.
2. If Signal is justified, propose a stable key, value type, meaning, sensitivity, and source-policy concept using only documented public fields.
3. State what evidence would justify emitting the Signal.
4. State what evidence must NOT emit it.
5. Do not create a Signal from a model guess with no reviewed producer/evidence path.
6. Create positive, negative, boundary, and adversarial evaluation cases.
7. Make every case specify expected pass/fail or routing outcome.
8. Separate task-routing failures from behavior-quality failures.
9. Do not fabricate production evidence or evaluation scores.

Return:
A. Signal-needed decision
B. Signal candidate if justified
C. Producer/evidence concept
D. Non-trigger examples
E. Evaluation matrix
F. Coverage gaps
G. Public-safe candidate using verified fields
```
