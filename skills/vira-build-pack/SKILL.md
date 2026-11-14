---
name: vira-build-pack
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Create and validate a Vira Behavior Pack candidate before installation or evaluation."
---

# Build a Behavior Pack

Use the quality-graded Pack Academy samples; legacy Marketing Starter is only a minimal historical reference. Keep Pack identity/version stable and inputs synthetic. Validate manifest and collection structure; import through SDK/API using `{manifest, objects}` or supported archive. Inspect import inventory and every conflict. Pass the variables map directly to install. If install returns 202, wait for persisted materialization before evaluation. A Pack is not an Agent Skill and import/install are not release.

## Activate this skill when
Creating a portable Vira Behavior Pack candidate and checking it before import. Use `vira-packs` for the server-side import/install/evaluate lifecycle.

## Inputs and preconditions
Collect desired reusable behavior, supported Pack schema/version, target resources, variables, source ownership/license, and conflict policy. Use synthetic examples and a non-production target.

## Workflow
1. Read the current Pack schema and inspect `examples/packs/recipe-preferences`, `retail-media-review` and `operations-orchestration` as current examples.
2. Create manifest and objects with stable IDs, explicit version, dependencies, and variable definitions; exclude credentials, tenant data, and private implementation.
3. Validate required fields, references, uniqueness, and declared variables locally before import.
4. Produce a dry-run inventory and enumerate potential conflicts/overwrites for human review.
5. Package the manifest/objects or supported archive exactly as the selected SDK/API accepts.

## Implementation details

1. Use the quality-graded [Recipe](https://github.com/hrpering/tryvira/tree/main/examples/packs/recipe-preferences), [Retail Media](https://github.com/hrpering/tryvira/tree/main/examples/packs/retail-media-review) or [Operations](https://github.com/hrpering/tryvira/tree/main/examples/packs/operations-orchestration) Pack, not the old minimal marketing-starter as the quality bar.
2. Define `pack.yaml` identity/version; `semantic-tasks/items.json` positive/negative routing cases; `behavior-points/items.json` requirements; `behavior-programs/items.json` executable staged modules and **explicit checks**; optional `behavior-strategies/items.json` graph, and `signals/items.json` *references only*. `tests/cases.json` fixtures are not evaluation receipts.
3. In a full tryvira checkout, run `npm run verify:packs`; then `python3 scripts/package-example-packs.py --out /tmp/vira-packs`. In a standalone `.skill` archive, open the Skill's `references/repo` directory and run `python3 scripts/package-example-packs.py --check` or `--out /tmp/vira-packs`; the three Pack folders and this builder are bundled. Do not run checkout-only npm scripts if its package.json is absent. The real backend still must import/materialize and evaluate the ZIP.
4. JS `importPack({manifest,objects})` or `archiveBase64,fileName` is supported, then `installPack(packId,variablesMap)`. Await real materialization before evaluation. A fake toggle unconnected to Program execution must be removed.
5. Domain `judge:` checks require a configured verifier extension. An unconfigured judge cannot PASS. Include no-release, missing-source, wrong-tenant and unsupported-verifier tests.
[Pack field guide](https://github.com/hrpering/tryvira/blob/main/docs/pack-authoring-guide.md).

## Deliverable and failure handling
Return the candidate files, validation output, inventory, and unresolved conflicts. Stop on schema uncertainty or collision; import is a separate user-authorized operation and never means activation/release.

## References

- [packs.md](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [README.md](https://github.com/hrpering/tryvira/blob/main/examples/packs/marketing-starter/README.md)
- [authority-and-safety.md](https://github.com/hrpering/tryvira/blob/main/references/authority-and-safety.md)
- [api.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
