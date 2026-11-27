# MCP catalog comparison: maintained source vs published npm

This report is generated from the reviewed maintained **source declaration** and the registry-verified **published npm artifact**. Neither inventory establishes live hosted `tools/list`, tenant permissions, tool schemas or effect/approval parity.

| Surface | Version | Advertised tools | Evidence |
| --- | --- | ---: | --- |
| Maintained Vira server/client shared catalog (source) | `0.1.91` | **99** | Reviewed source declaration on 2026-11-27; **not** a live hosted endpoint check |
| Published `@tryvira/mcp` npm artifact | `0.1.90` | **99** | [Versioned npm CLI snapshot](reference/mcp-published-tools.json); npm bundle compared in registry CI |
| Common tool names | These two snapshots | **99** | Name intersection only |

The two inventories **have the same advertised names**: 0 tool(s) only in the maintained source snapshot, 0 only in the published npm snapshot. The tool-name sets match, but these are different package revisions: source `0.1.91` is an unpublished candidate and npm `0.1.90` is the published artifact. Name parity does not establish package, schema, authority, or live hosted parity.

## Declared by maintained source, absent from this npm snapshot (0)

None.

## Present in this npm snapshot, absent from maintained source declaration (0)

None.

## What to check in an actual integration

1. Inspect the installed `@tryvira/mcp` version and run `initialize` followed by `tools/list`.
2. Use only returned names, input schemas and authorization decisions. A missing tool can require a newer published package or a separately documented SDK/API integration.
3. Never treat `read_control_api` or `write_control_api` as permission to guess routes or bypass a denial.
4. Treat post-model verification, approvals and release authority as separate evidence requirements.
5. Public CI checks the npm tarball and this comparison. It **cannot continuously read private maintained source** or validate a live hosted endpoint; refresh the source declaration when that catalog changes.

[Package setup](reference/mcp.md) · [MCP tool reference](reference/mcp-tools.md) · [Agent-first operation flow](agent-first-operation-flow.md) · [Version and acceptance plan](integration-compatibility.md)
