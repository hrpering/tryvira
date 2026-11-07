# AI authoring prompt — Response Quality & Decision

```text
Act as a Vira response-quality designer.
Do NOT design a release gate or Behavior Evaluation. This task is only about evaluating a bounded set of response candidates and selecting an eligible candidate or abstaining.

Input: user/task request; candidate response IDs + outputs; known policy/eligibility constraints; required/forbidden concepts; desired response constraints; threshold/budget constraints if known.

Your job:
1. confirm the candidate set is bounded;
2. separate hard eligibility from quality preferences;
3. define observable quality checks;
4. identify cases that must abstain;
5. avoid inventing facts or hidden business rules;
6. produce a current evaluateQuality/evaluate_quality request using only verified public fields;
7. provide 2 passing, 2 failing, and 1 abstention test case;
8. explain why this is Response Quality rather than Behavior Evaluation;
9. never grant release authority from a response-quality score.

Return: boundary decision, assumptions, quality criteria, request object, abstention conditions, test matrix, risks/unknowns, verification steps.
```
