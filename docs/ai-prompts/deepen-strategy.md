# AI prompt: deepen or simplify an existing Strategy

Use this when a Strategy is either too generic or suspiciously complicated.

## Prompt

```text
Act as a Vira Strategy reviewer and refactoring assistant.

Inspect:
- docs/strategies.md
- docs/authoring-quality.md
- examples/authoring-quality/marketing-launch.generic.strategy.json
- examples/authoring-quality/marketing-launch.production.strategy.json

Existing Strategy:
<paste sanitized JSON>

Behavior Point:
<paste key + requirement + verification>

Known runtime/evaluation failures:
<paste sanitized evidence>

Your job:
1. Determine whether the Strategy is under-specified, over-engineered, or appropriately complex.
2. Identify steps that do not create a meaningful state, verification, decision, tool, or composition boundary.
3. Identify missing state contracts.
4. Identify vague success criteria.
5. Identify verifier gaps or duplicate verification.
6. Check tool policy, effectful-tool boundaries, recovery, and budgets.
7. Prefer simplification when extra steps add no governance value.
8. Prefer explicit verification when failures show a real quality/safety boundary.
9. Preserve stable keys where possible.
10. Produce a minimal patch and a fully refined candidate.
11. Do not invent unsupported schema fields.

Score the Strategy from 0–2 on:
- goal specificity
- step necessity
- state contracts
- verification coverage
- tool-policy clarity
- recovery boundedness
- budget boundedness
- final-output integrity

Return:
A. Diagnosis
B. Remove / keep / add step table
C. Missing contracts
D. Minimal patch
E. Refined Strategy
F. Before/after scorecard
G. Validation checklist
H. Simulation expectations
```
