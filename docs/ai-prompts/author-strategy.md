# AI prompt: author a Behavior Strategy

Use this prompt only when the task genuinely needs bounded multi-step execution.

## Prompt

```text
You are designing a Vira Behavior Strategy.

First inspect:
- docs/strategies.md
- docs/strategy-result-modes.md
- docs/strategy-authoring-checklist.md
- docs/authoring-quality.md
- examples/authoring-quality/marketing-launch.generic.strategy.json
- examples/authoring-quality/marketing-launch.response.strategy.json
- examples/authoring-quality/marketing-launch.behavior-plan.strategy.json

Also inspect the versioned Strategy schema available in the repository/deployment. Do not invent fields, state names, result modes, or edge-condition syntax.

Behavior Point:
<paste key + requirement + verification>

Task goal:
<what outcome is required>

Final-answer owner:
<Vira Strategy | existing downstream chatbot/model | undecided>

Available context/evidence:
<sanitized refs or description>

Known user-owned preferences:
<describe preference state, or none>

Allowed tools:
<tool keys or none>

Effectful tools:
<tool keys or none>

Known failure modes:
<list>

Your job:
1. First decide whether a Strategy is actually necessary. If one model call + Program verification is enough, recommend no Strategy.
2. If Strategy is justified, choose INLINE, STAGED, or AGENTIC and explain why.
3. Explicitly decide result ownership:
   - `response` when Vira owns the final user-visible artifact;
   - `behavior_plan` when a downstream chatbot/model owns final prose.
4. If `behavior_plan`, create only a compact plan containing intent, explicit constraints, confirmed preferences, a bounded number of labeled assumptions, response shape, safety checks, and verification requirements. Do NOT draft the final answer.
5. If `response`, define the final artifact and place final verification/composition where required.
6. Treat user preferences as user-owned state, not Strategy constants. Preserve confirmed values, replace changed values, stop applying removed values, and do not invent missing preferences.
7. Define task-specific success criteria that can be evaluated.
8. Design the smallest necessary step graph.
9. Every step must have a unique purpose and explicit requires/produces state.
10. Make tool policy explicit; do not add tools merely because they are available.
11. Keep effectful operations bounded by policy/authorization rather than Strategy cleverness.
12. Add bounded recovery and budgets appropriate to the graph.
13. Check that every referenced step/state/verifier/tool is reachable and intentional.
14. Produce structural validation and simulation expectations.
15. Do not claim simulation proves real providers/tools executed.

Return:
A. Strategy-needed decision
B. Execution-mode decision
C. Result-mode / final-answer-owner decision
D. Goal and success criteria
E. Step table
F. State flow
G. Preference-state handling
H. Verification design
I. Tool-policy design
J. Recovery + budgets
K. Risks / failure paths
L. Final Strategy candidate using only verified schema fields
M. Validation and simulation checklist

Fail the design review if:
- both Vira and the downstream model independently draft the final answer;
- `behavior_plan` contains a hidden full answer;
- user preferences are hard-coded as Strategy constants without a policy reason;
- complexity is added without a real governance boundary.
```
