---
name: vira-build-pack
license: "Proprietary; see LICENSE"
description: "Create and validate a Vira Behavior Pack candidate before installation or evaluation."
---

# Build Pack

Use the public Pack format guide and existing fixture. Keep Pack identity/version stable and inputs synthetic. Validate manifest and collection structure; import through SDK/API using `{manifest, objects}` or supported archive. Inspect import inventory and every conflict. Pass the variables map directly to install. If install returns 202, wait for persisted materialization before evaluation. A Pack is not an Agent Skill and import/install are not release.

## Activate this skill when
Creating a portable Vira Behavior Pack candidate and checking it before import. Use `vira-packs` for the server-side import/install/evaluate lifecycle.

## Inputs and preconditions
Collect desired reusable behavior, supported Pack schema/version, target resources, variables, source ownership/license, and conflict policy. Use synthetic examples and a non-production target.

## Workflow
1. Read the current Pack schema and inspect `examples/packs/marketing-starter` as a shape reference only.
2. Create manifest and objects with stable IDs, explicit version, dependencies, and variable definitions; exclude credentials, tenant data, and private implementation.
3. Validate required fields, references, uniqueness, and declared variables locally before import.
4. Produce a dry-run inventory and enumerate potential conflicts/overwrites for human review.
5. Package the manifest/objects or supported archive exactly as the selected SDK/API accepts.

## Deliverable and failure handling
Return the candidate files, validation output, inventory, and unresolved conflicts. Stop on schema uncertainty or collision; import is a separate user-authorized operation and never means activation/release.

## References

- [packs.md](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [README.md](https://github.com/hrpering/tryvira/blob/main/examples/packs/marketing-starter/README.md)
- [authority-and-safety.md](https://github.com/hrpering/tryvira/blob/main/references/authority-and-safety.md)
- [api.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
