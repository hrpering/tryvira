# Quality review notes

## Semantic Task

The weak `marketing.help` task can absorb almost any marketing request. That creates false-positive routing and makes downstream behavior hard to reason about.

The stronger `marketing.launch_plan` task defines a specific job and includes negative examples for adjacent jobs.

## Behavior Point

The weak `marketing.good_answer` point contains subjective language and a non-verifiable check.

The stronger `marketing.launch_plan` point defines what must be present and what must be rejected.

## Strategy

The generic Strategy is not necessarily invalid, but it does not justify its own complexity. One model step with “high quality” as the success criterion adds orchestration without adding governance.

The production-quality Strategy earns its stages:

- `draft` creates the candidate;
- `verify` checks explicit requirements;
- `compose` returns only verified state;
- state slots make transitions visible;
- verifier keys make checks explicit;
- budgets prevent unbounded execution;
- recovery is bounded and fail-closed in the example.

## Review questions

Before approving a candidate, ask:

1. Could this key still make sense if the model/provider changes?
2. Can a reviewer distinguish this task from its nearest neighboring tasks?
3. Can the requirement be tested without reading the author's mind?
4. Does verification contain actual checks rather than adjectives?
5. Does the Strategy have a reason to exist beyond “more steps feels advanced”?
6. Are state, verifier, tool, recovery, and budget boundaries explicit where needed?
7. Are negative and boundary cases represented in evaluation?
