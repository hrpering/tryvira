# Test trust matrix

This repository separates contract confidence from live-product confidence. A green test is evidence only for the boundary it exercises.

| Evidence | Supports | Does not support |
| --- | --- | --- |
| Skill metadata, link, archive and syntax checks | The 28 Skills are portable and internally well-formed | Automatic selection by a real agent |
| SDK/Python contract tests with a test transport | Client method shapes, serialization and failure handling | A hosted tenant accepting the request |
| MCP protocol and `tools/list` tests | Published MCP startup, discovery and catalog shape | Pack mutation or provider-backed execution |
| Authority, scope and fail-closed tests | Denial boundaries and invalid-input behavior | Successful customer authorization |
| Registry package acceptance | The published package can be installed and its configured probes can run | A complete Pack → Teach → release lifecycle unless every stage is exercised |
| Live acceptance receipt | A specific tenant, package version, artifact, provider result and release lineage were observed | Other tenants or versions |

## Required proof for a full published-package E2E claim

A full claim is allowed only when one evidence bundle contains, for the same package versions and authorized non-production scope:

1. MCP `initialize`/discovery and `tools/list` from the published package.
2. Pack import/materialization readback with canonical task, point, program and strategy identities.
3. Server-owned evaluation with persisted evaluation ID, case results and provider execution receipts.
4. Separate human approval and release readback with the released artifact digest.
5. AUTO TaskRun admission, child execution, provider output and post-model verification receipts.
6. Admitted evidence, Teach analysis, recommendation review, candidate evaluation and a new immutable revision.
7. Re-evaluation and runtime readback proving the new revision changed the served behavior.
8. Negative checks for wrong scope, invalid digest, missing authority, provider failure and replay.

Missing any item means the result must be reported as **partial** rather than full E2E. Mock HTTP responses may validate contracts, but cannot satisfy items 2–7.

The current public repository records this distinction deliberately. It has offline and registry-package evidence, but no bundled live tenant receipt; do not infer a live lifecycle from the green local suite.
