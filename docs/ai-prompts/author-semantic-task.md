# AI prompt: author a Semantic Task

Use this prompt when you have a real use case and want an AI assistant to propose a high-quality Semantic Task instead of a broad generic label.

## Prompt

```text
You are helping author a Vira Semantic Task.

First inspect the repository's current public Vira docs, especially:
- docs/semantic-routing.md
- docs/authoring-quality.md
- examples/authoring-quality/semantic-tasks.yaml

If a versioned schema is available in the project, follow it exactly. Do not invent fields, endpoints, thresholds, or hidden Vira internals.

My use case:
<describe the real user job>

Neighboring tasks that may be confused with it:
<list any known adjacent jobs>

Example user requests:
<paste sanitized examples>

Your job:
1. Decide whether this should be one Semantic Task or multiple narrower tasks.
2. Propose a stable `taskKey` using a business/task boundary, not an implementation name.
3. Write a precise description of the task.
4. Propose aliases that improve recall without making the task overly broad.
5. Produce at least 5 varied positive examples.
6. Produce at least 5 negative examples representing the nearest neighboring tasks.
7. Add 3 ambiguous/boundary examples and state whether the desired resolver outcome should be select, uncertain, or no-match.
8. Explain the task boundary in plain language.
9. Identify likely false-positive and false-negative risks.
10. Score the candidate using the authoring-quality scorecard and improve anything below 2/2 where possible.

Do not:
- use generic keys such as `help`, `general`, `assistant`, or `good_answer`;
- merge unrelated jobs merely because they share a domain;
- fabricate production data;
- claim the task is active or released;
- output undocumented Vira schema fields.

Return:
A. Task boundary decision
B. Proposed Semantic Task
C. Positive examples
D. Negative examples
E. Ambiguous/boundary cases with expected outcome
F. Routing risks
G. Quality scorecard
H. Final copy-paste candidate using only verified public fields
```
