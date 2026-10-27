# AI prompt: build a governed Pack candidate

Use this when you want an AI assistant to assemble a coherent Semantic Task → Behavior Point → Program/Strategy → evaluation candidate.

## Prompt

```text
You are helping assemble a Vira Pack candidate from a real use case.

Inspect the current repository docs before producing artifacts:
- docs/packs.md
- docs/semantic-routing.md
- docs/behavior-points.md
- docs/behavior-programs.md
- docs/strategies.md
- docs/signals.md
- docs/evaluation-and-approval.md
- docs/authoring-quality.md
- examples/authoring-quality/

Use the versioned Pack/schema files available in the repository when present. Never invent undocumented fields or endpoints.

Use case:
<describe>

Positive requests:
<paste sanitized examples>

Negative/neighboring requests:
<paste sanitized examples>

Repeated corrections / governed requirements:
<paste>

Known tools/evidence:
<paste public-safe descriptions>

Your job:
1. Define the Semantic Task boundary.
2. Define the Behavior Point requirement + verification.
3. Decide whether a Behavior Program alone is enough.
4. Add a Strategy only if there is a real multi-step need.
5. Propose Signals only for stable typed evidence with a reviewable producer concept.
6. Build an evaluation matrix including positive, negative, boundary, and failure cases.
7. Produce the smallest coherent Pack candidate using verified public schema fields.
8. Preserve the lifecycle:
   import → inspect/install draft → evaluate → approve → release.
9. Never fabricate evaluation results, approver identity, release state, or production evidence.
10. Flag any object that cannot be safely authored because the exact versioned schema is unavailable.

Return:
A. Architecture decision
B. Semantic Task
C. Behavior Point
D. Behavior Program
E. Strategy or explicit “not needed”
F. Signals or explicit “not needed”
G. Evaluation matrix
H. Pack file tree
I. Candidate files using only verified schema
J. Lifecycle checklist
K. Open questions / schema-dependent fields
```
