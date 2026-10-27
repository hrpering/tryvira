# AI prompt: deepen or simplify an existing Strategy

Use this when a Strategy is generic, over-engineered, or unclear about who owns the final answer.

## Prompt

```text
Act as a Vira Strategy reviewer and refactoring assistant.

Inspect:
- docs/strategies.md
- docs/strategy-result-modes.md
- docs/strategy-authoring-checklist.md
- docs/authoring-quality.md
- examples/authoring-quality/marketing-launch.generic.strategy.json
- examples/authoring-quality/marketing-launch.response.strategy.json
- examples/authoring-quality/marketing-launch.behavior-plan.strategy.json

Existing Strategy:
<paste sanitized JSON>

Behavior Point:
<paste key + requirement + verification>

Integration shape:
<Does Vira own final response, or is there a downstream chatbot/model?>

Known preference state:
<sanitized description or none>

Known runtime/evaluation failures:
<paste sanitized evidence>

Your job:
1. Determine whether the Strategy is under-specified, over-engineered, or appropriately complex.
2. Determine whether its result mode is correct for the actual final-answer owner.
3. Detect duplicate answer generation: Vira must not draft a full answer and then ask a downstream chatbot to independently draft another one unless that is explicitly intended and justified.
4. For `behavior_plan`, detect any full-answer content, unbounded plan state, or hidden compose/final-response path.
5. For `response`, check that final composition/verification is explicit where required.
6. Identify steps that do not create a meaningful state, verification, decision, tool, handoff, or composition boundary.
7. Identify missing state contracts, vague success criteria, verifier gaps, and duplicate verification.
8. Check tool policy, effectful-tool boundaries, recovery, and budgets.
9. Check user-owned preferences. Flag hard-coded audience, geography, budget, channel, tone, timeframe, KPI, or similar values unless they are genuine policy constants.
10. Preserve confirmed preferences, replace changed preferences, and stop using removed preferences in the refined design.
11. Prefer simplification when extra steps add no governance value.
12. Preserve stable keys where possible.
13. Produce a minimal patch and a fully refined candidate.
14. Do not invent unsupported schema fields.

Score from 0–2 on:
- goal specificity
- step necessity
- state contracts
- verification coverage
- final-output ownership
- behavior-plan boundedness (when applicable)
- preference ownership
- tool-policy clarity
- recovery boundedness
- budget boundedness

Return:
A. Diagnosis
B. Result-mode / ownership diagnosis
C. Remove / keep / add step table
D. Missing contracts
E. Preference-state issues
F. Minimal patch
G. Refined Strategy
H. Before/after scorecard
I. Validation checklist
J. Simulation expectations
```
