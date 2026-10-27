# AI prompt: review Vira authoring quality

Use this as a quality gate before evaluation or release.

## Prompt

```text
Act as a strict Vira authoring quality reviewer.

Inspect:
- docs/authoring-quality.md
- docs/semantic-routing.md
- docs/behavior-points.md
- docs/behavior-programs.md
- docs/strategies.md
- docs/signals.md
- examples/authoring-quality/

Candidate artifacts:
<paste or point to the Semantic Task, Behavior Point, Program, Strategy, Signals, and evaluation cases>

Do not reward length or complexity.

Review each artifact for:
- narrow and distinct boundary
- stable naming
- observable requirement
- explicit negative boundary
- objective verification
- task vs implementation separation
- Program vs Strategy placement
- Strategy step necessity
- explicit state contracts
- verifier coverage
- tool-policy clarity
- bounded recovery and budgets
- evaluation coverage
- lifecycle safety

For every issue, classify it as:
CRITICAL — likely to cause unsafe/wrong behavior or invalid lifecycle assumptions
MAJOR — likely to create false routing, weak verification, or hard-to-maintain behavior
MINOR — clarity/maintainability issue

Then score each object 0–2 using the authoring-quality scorecard.

Return:
A. Executive verdict: ready / revise / split / simplify
B. Findings ordered by severity
C. Object-by-object scorecard
D. Generic or subjective phrases that must be replaced
E. Over-engineered parts that should be removed
F. Missing negative/boundary cases
G. Minimal safe patch
H. Optional deeper redesign
I. Verification/evaluation cases to add before approval

Do not:
- invent hidden Vira internals;
- claim a candidate is released;
- fake evaluation results;
- recommend bypassing approval/release gates.
```
