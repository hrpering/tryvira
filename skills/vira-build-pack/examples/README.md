# Author and package three quality-graded Packs

## Short test prompt

> Build a beginner recipe Pack, intermediate retail-media Pack and advanced operations Pack.

## Detailed test prompt

> Fill pack.yaml, semantic tasks/negative examples, Points, Programs with explicit checks, optional Strategies and Signal refs. Keep tests/cases.json out of imports.

## Action and evidence

In the full tryvira repository, run `npm run verify:packs`. For an extracted standalone Skill, use `cd references/repo && python3 scripts/package-example-packs.py --check`, followed by `--out /tmp/vira-pack-candidates`. The portable package includes all three Pack folders and the builder. ZIP candidates are not release receipts.

Use the customer's own authorized non-production tenant when live execution is necessary, and the installed public SDK/Studio contract. Do not claim server execution from a local file or structure test. See [Skill contract](https://github.com/hrpering/tryvira/blob/main/skills/vira-build-pack/SKILL.md) and [product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md).

## Negative test

An unconfigured judge:, source fixture or a 202 install cannot become a verified behavior or release.
