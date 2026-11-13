# Diagnose a stalled TaskRun

## Short test prompt

> AUTO resolved the support task but no verified answer appears. Find the first failing stage.

## Detailed test prompt

> Read actual scoped TaskRun state, selected mode, child receipts, authority digest, provider handoff and post-model checks. Keep host capability attestation separate from client assertions.

## Action and evidence

TaskRun route → scope/release → real child → actual provider → verifier → receipt; report status and exact missing evidence.

Use the customer's own authorized non-production tenant when live execution is necessary, and the installed public SDK/Studio contract. Do not claim server execution from a local file or structure test. See [Skill contract](https://github.com/hrpering/tryvira/blob/main/skills/vira-debug/SKILL.md) and [product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md).

## Negative test

A raw projection or completed child is not a verified output; never bypass the verifier.
