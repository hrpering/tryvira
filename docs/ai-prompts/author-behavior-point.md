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

User-owned preferences that may affect the behavior:
<audience, geography, budget, channels, tone, timeframe, KPI, constraints, etc. or none>

Examples of acceptable output:
<sanitized examples>

Examples of unacceptable output:
<sanitized examples>

Your job:
1. Decide whether this correction belongs at this Behavior Point or should be a separate task, Signal, Program module, Strategy step, preference state, or evaluation case.
2. Propose a stable Behavior Point key.
3. Write a requirement that describes observable governed behavior, not subjective adjectives.
4. Write verification that can become pass/fail evaluation logic.
5. Identify anti-patterns the requirement should reject.
6. Separate policy-like behavior from user-owned preferences. Do not hard-code preference values into the Behavior Point unless they are genuine policy constants.
7. If preferences matter, require the system to use explicit/confirmed values, preserve unchanged values, replace changed values, stop using removed values, and avoid inventing missing preferences.
8. Identify implementation details that should not be frozen into the Behavior Point.
9. Produce positive, negative, and preference-update/removal evaluation cases where relevant.
10. Score the candidate against boundary, stable naming, observability, negative boundary, verification, preference ownership, runtime safety, and maintainability.

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
F. Preference-state handling
G. Anti-patterns
H. Positive/negative/boundary cases
I. Quality scorecard
J. Final public-safe candidate
```
