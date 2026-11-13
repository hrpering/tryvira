# Review a typed retail-media Signal

## Short test prompt

> Can we use attribution-window mismatch as a runtime Signal?

## Detailed test prompt

> Inspect actual admitted event IDs and source fields. Review the typed Signal definition and version, producer type/key, approved mapping, scope and attestation. Use real consented evidence.

## Action and evidence

Record definition, version, mapping status and missing/stale/absent producer tests.

Use the customer's own authorized non-production tenant when live execution is necessary, and the installed public SDK/Studio contract. Do not claim server execution from a local file or structure test. See [Skill contract](https://github.com/hrpering/tryvira/blob/main/skills/vira-signals/SKILL.md) and [product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md).

## Negative test

A caller's attributionMismatch boolean or a Pack Signal key is not trusted runtime authority.
