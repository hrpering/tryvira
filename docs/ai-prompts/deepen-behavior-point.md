# AI prompt: deepen a generic Behavior Point

Use this when an existing Behavior Point works technically but reads like “be helpful and high quality”.

## Prompt

```text
Act as a Vira authoring reviewer.

Inspect:
- docs/behavior-points.md
- docs/authoring-quality.md
- examples/authoring-quality/behavior-points.yaml

Existing Behavior Point:
<paste the sanitized current point>

Related Semantic Task:
<paste task definition>

Known failure examples:
<paste repeated corrections, evaluation failures, or sanitized examples>

Do not rewrite it just to make it longer.

Your job:
1. Diagnose exactly why the current point is generic, overbroad, subjective, duplicated, or implementation-specific.
2. Preserve the stable key if it already represents the correct business/task boundary.
3. Split the point only if the current definition contains multiple independently governed behaviors.
4. Rewrite the requirement into observable behavior.
5. Rewrite verification into explicit pass/fail checks.
6. Extract anti-patterns from the failure examples.
7. Identify whether any requirement belongs in a Behavior Program module, Strategy, Signal, or evaluation suite instead.
8. Produce a minimal patch first, then an optional deeper version.
9. Add regression cases that prove the refinement is better.
10. Score before vs after using the authoring-quality scorecard.

Return:
A. Current weaknesses
B. Keep/split/rename decision
C. Minimal improvement
D. Deeper improvement
E. Moved-out concerns and where they belong
F. Regression cases
G. Before/after scorecard
H. Final candidate
```
