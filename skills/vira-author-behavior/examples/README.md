# Author an executable support Program

## Short test prompt

> Define a behavior that prevents claiming an unconfirmed refund.

## Detailed test prompt

> Write a Semantic Task with discriminative positive/negative examples; attach Point; write Program guard and explicit post_model checks. Use a supported verifier syntax, or declare and configure judge extension separately.

## Action and evidence

Return stable task/point/program keys, check stage, failure policy, negative case and evaluation plan.

Use the customer's own authorized non-production tenant when live execution is necessary, and the installed public SDK/Studio contract. Do not claim server execution from a local file or structure test. See [Skill contract](https://github.com/hrpering/tryvira/blob/main/skills/vira-author-behavior/SKILL.md) and [product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md).

## Negative test

A natural-language requirement is not automatically a verifier. Missing tool receipt is no proof of refund.
