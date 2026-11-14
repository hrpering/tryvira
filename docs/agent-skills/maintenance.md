# Agent Skills maintenance and release process

## Versioning

`skills/VERSION` is the library version, independent of the documentation repository version and npm/PyPI SDK versions. Use semantic versioning for skill behavior:

- **Patch:** wording, typo, or reference correction that does not change the workflow.
- **Minor:** add a backward-compatible skill, workflow, example, or supported surface.
- **Major:** change skill names, activation intent, required user inputs, safety boundaries, or previously documented workflow behavior incompatibly.

Record user-visible changes in `skills/CHANGELOG.md` and the repository `CHANGELOG.md`. Package version changes do not automatically mean the skills version changed; update integration guidance when a package contract actually changes.

## Contract update loop

1. Read public SDK/API/MCP references and published package metadata. For MCP, compare the package and the live `tools/list` only in a permitted isolated environment.
2. Update `references/capability-matrix.md`, relevant skill instructions, examples, and public docs together.
3. Add/adjust positive, negative, and ambiguous triggers; add a deterministic contract fixture for any exact signature or safety invariant.
4. Run `npm run verify`, then `npm run verify:registry` where outbound registry access is available. `verify:registry` uses temporary directories and does not call the Vira service.
5. Run model evaluations in an isolated, non-production harness and record prompts, model/version, selection outcome, execution evidence, and failure cases. Keep this separate from deterministic unit test results.
6. Review the complete diff for secret-like values, private tenant data, unpublished implementation details, and accidental authority/approval shortcuts.
7. Prepare a PR or release from current public `main`; do not publish/merge without repository owner authorization.

## Drift signals

- Package registry versions may advance independently; use `package-versions.json` only as a synchronized repository snapshot. The monthly main-branch workflow updates Vira package references, refreshes the Vercel AI SDK pins, and regenerates framework lockfiles before CI verification. Weekly Dependabot checks cover the framework packages and GitHub Actions. A failed registry check is not a pass; dependency updates must pass the full workflow before merge.
- MCP tools must match the package artifact; SDK/API methods are not MCP parity.
- Studio source route catalogs are not UI evidence. Record browser results only for an actual accessible, authorized test session.
- Publish integration details from supported public client contracts. Keep private implementation details and customer data out of example repositories.
