# AI prompt: author a Behavior Point

Use this prompt to turn a repeated correction or behavioral requirement into a stable Behavior Point.

## Prompt

```text
You are helping author a Vira Behavior Point.

Inspect:
- docs/behavior-points.md
- docs/authoring-quality.md
- examples/authoring-quality/behavior-points.yaml

Use only fields supported by the current public docs or the versioned schema available in this repository. Do not invent hidden policy or runtime fields.

Semantic Task:
<task key + description>

Repeated correction / desired behavior:
<describe what the AI keeps getting wrong or what must stay consistent>

Examples of acceptable output:
<sanitized examples>

Examples of unacceptable output:
<sanitized examples>

Your job:
1. Decide whether this correction belongs at this Behavior Point or should be a separate task, Signal, Program module, Strategy step, or evaluation case.
2. Propose a stable Behavior Point key.
3. Write a requirement that describes observable governed behavior, not subjective adjectives.
4. Write verification that can become pass/fail evaluation logic.
5. Identify anti-patterns the requirement should reject.
6. Identify which parts are task-level behavior and which are implementation details that should not be frozen into the Behavior Point.
7. Produce 5 positive and 5 negative evaluation cases.
8. Score the candidate against boundary, stable naming, observability, negative boundary, verification, runtime safety, and maintainability.

Avoid vague requirements such as:
- be helpful
- be accurate
- be detailed
- make it high quality

Avoid implementation-specific requirements unless they are themselves a business/policy requirement.

Return:
A. Placement decision
B. Behavior Point candidate
C. Why the key is stable
D. Requirement
E. Verification
F. Anti-patterns
G. Positive/negative cases
H. Quality scorecard
I. Final public-safe candidate
```
