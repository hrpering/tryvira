# AI prompt: author a Behavior Strategy

Use this prompt only when the task genuinely needs bounded multi-step execution.

## Prompt

```text
You are designing a Vira Behavior Strategy.

First inspect:
- docs/strategies.md
- docs/authoring-quality.md
- examples/strategy/marketing-launch.strategy.json
- examples/authoring-quality/marketing-launch.generic.strategy.json
- examples/authoring-quality/marketing-launch.production.strategy.json

Also inspect the versioned Strategy schema available in the repository/deployment. Do not invent fields or edge-condition syntax.

Behavior Point:
<paste key + requirement + verification>

Task goal:
<what artifact/outcome is required>

Available context/evidence:
<sanitized refs or description>

Allowed tools:
<tool keys or none>

Effectful tools:
<tool keys or none>

Known failure modes:
<list>

Your job:
1. First decide whether a Strategy is actually necessary. If one model call + Program verification is enough, recommend no Strategy.
2. If Strategy is justified, choose INLINE, STAGED, or AGENTIC and explain why.
3. Define task-specific success criteria that can be evaluated.
4. Design the smallest necessary step graph.
5. Every step must have a unique purpose and explicit requires/produces state.
6. Add verification before final composition where the behavior requires it.
7. Make tool policy explicit; do not add tools just because they are available.
8. Keep effectful operations bounded by policy/authorization rather than Strategy cleverness.
9. Add bounded recovery and budgets appropriate to the graph.
10. Check that every referenced step/state/verifier/tool is reachable and intentional.
11. Produce a structural validation checklist and simulation expectations.
12. Do not claim simulation proves real providers/tools executed.

Return:
A. Strategy-needed decision
B. Execution-mode decision
C. Goal and success criteria
D. Step table
E. State flow
F. Verification design
G. Tool-policy design
H. Recovery + budgets
I. Risks / failure paths
J. Final Strategy candidate using only verified schema fields
K. Validation and simulation checklist
```
