# AI prompt: author a Behavior Program

Use this when a Behavior Point needs structured guards, judgments, transformations, verification, escalation, rubrics, examples, or anti-patterns.

## Prompt

```text
You are designing a Vira Behavior Program for an existing Behavior Point.

Inspect:
- docs/behavior-programs.md
- docs/behavior-points.md
- docs/authoring-quality.md

Behavior Point:
<paste sanitized key, requirement, verification>

Known failures / required behavior:
<paste evidence or examples>

Available public module kinds include:
- guard
- judgment
- transform
- verification
- escalation
- rubric
- example
- anti_pattern

Public stages may include:
- pre_model
- pre_tool
- post_model
- pre_action

Your job:
1. Decide which requirements actually need Program modules.
2. Do not create one module per sentence mechanically.
3. Map each module to the stage where it can actually observe or control the behavior.
4. Give every module a stable, descriptive key.
5. Separate judgment from verification when they answer different questions.
6. Add escalation only when there is a real condition that cannot safely continue automatically.
7. Add examples and anti-patterns only when they sharpen the boundary.
8. Produce evaluation cases for every material requirement.
9. Identify anything that belongs in Strategy orchestration instead of the Program.
10. Use only public/verified schema fields.

Return:
A. Program design rationale
B. Module table: kind / stable key / stage / requirement / why
C. Rubric
D. Examples
E. Anti-patterns
F. Evaluation cases
G. Program candidate using verified public fields
H. Concerns intentionally left outside the Program
```
