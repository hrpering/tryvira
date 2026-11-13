---
name: vira-author-behavior
license: "Proprietary; see LICENSE"
description: "Author Semantic Tasks, Behavior Points, Programs, and Strategies using Vira contracts."
---

# Author Behavior

Follow canonical identity: Semantic Task → Behavior Point → Program/Strategy as needed. Use the public authoring reference for exact fields, meaningful positive/negative examples, and bounded constraints. Validate/simulate where supported. Authoring does not activate or release behavior. Do not collapse candidate selection, proposal approval, and release.

## Activate this skill when
Designing or reviewing a Semantic Task, Behavior Point, Program, Strategy, or their relationships. Do not use it to install a Pack or release behavior.

## Inputs and preconditions
Request the agent's real task, allowed outcomes, hard constraints, examples of correct/incorrect behavior, scope, and applicable policy. Distinguish user-visible language from a stable behavior requirement.

## Workflow
1. Define the Semantic Task as the intent/context boundary and write examples that distinguish neighboring intents.
2. Define the Behavior Point as an independently testable control with positive behavior, prohibited behavior, and measurable checks; it is more than a prompt string.
3. Add a Program only to compose compatible points; add a Strategy only when documented selection/variant/condition logic is needed.
4. Validate schema and identity relationships using public authoring docs; simulate only through a documented operation.
5. Produce a reviewable candidate and tests; do not activate or release it as a side effect of authoring.

## Deliverable and failure handling
Return canonical object drafts, rationale, positive/negative cases, validation results, and open policy questions. Stop if requirements are vague or conflict; do not invent user policy or authority.

## References

- [canonical-authoring](https://github.com/hrpering/tryvira/blob/main/docs/canonical-authoring.md)
- [semantic-routing](https://github.com/hrpering/tryvira/blob/main/docs/semantic-routing.md)
- [behavior-points](https://github.com/hrpering/tryvira/blob/main/docs/behavior-points.md)
- [behavior-programs](https://github.com/hrpering/tryvira/blob/main/docs/behavior-programs.md)
- [strategies](https://github.com/hrpering/tryvira/blob/main/docs/strategies.md)
- [authoring-quality](https://github.com/hrpering/tryvira/blob/main/docs/authoring-quality.md)
