# Creating and maintaining Agent Skills

This is a contribution guide for the Vira Agent Skills library. Skills use the standard SKILL.md format and reference the published Vira client APIs and public examples.

## Add a focused Skill

1. Choose a developer task that is not adequately covered by an existing Skill.
2. Write clear activation conditions, inputs, expected output and failure handling.
3. Refer to installed client method signatures and the current [capability matrix](../../references/capability-matrix.md).
4. Provide a complete, task-specific example with at least one unsuccessful case.
5. Add UI metadata, link checks and the bundled license.
6. Run the repository checks and package the resulting Skill.
7. Record the change in [Skills changelog](../../skills/CHANGELOG.md).

## Verification

Run `npm run verify`, then use the [portable archive checks](e2e-readiness.md). For actual automatic-selection quality, capture model Skill-load telemetry through the [evaluation harness](live-acceptance.md).

Live requests need a provisioned non-production environment and explicit authorization for state changes. Use example data that does not include customer records or private credentials.

[Maintenance guide](maintenance.md) · [Public SDK reference](../reference/sdk-method-inventory.md)
