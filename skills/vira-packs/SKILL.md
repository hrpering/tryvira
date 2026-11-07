---
name: vira-packs
license: "Proprietary; see LICENSE"
description: "Import, configure, evaluate, and govern Vira Packs using the current SDK/API contracts."
---

# Packs

Use the published Pack guide and selected surface reference. Import requires `manifest` and `objects` or a supported archive; inspect conflicts and inventory. JS/Python install takes the variables map directly. A queued 202 install is not materialized: confirm persisted materialization before evaluation. Pack evaluation requires the persisted server-side `evaluationId` bound to the exact Pack ID/digest; never send client-asserted `passed` or `score`. Approval and release are separate explicit authorized steps. The current published MCP catalog has no Pack tools.

## Activate this skill when
Importing, installing/materializing, evaluating, approving, upgrading, or releasing a Vira Pack. Use `vira-build-pack` for authoring the local artifact.

## Inputs and preconditions
Require Pack ID/manifest or archive, target scope, variables, conflict policy, expected digest, and selected supported surface. Never assume MCP Pack tools exist.

## Workflow
1. Confirm the operation exists on the chosen surface and inspect Pack identity, inventory, conflicts, and digest.
2. Import with `manifest` and `objects` or the documented archive form; record the server response.
3. Install with the variables map directly. If HTTP 202 is returned, follow the persisted job/materialization state until complete.
4. Create/read a server-side evaluation bound to the exact Pack ID and materialized digest; pass the returned `evaluationId` to Pack evaluation.
5. Review regressions and stop for separate explicit approval and release; verify exact released identity afterward.
6. For an accepted behavior revision, create a Pack Revision, inspect `getPackRevisionDiff`, perform only documented validation/approval/release transitions, and materialize after approval. Read back the exact revision and materialization receipt before runtime verification.

## Deliverable and failure handling
Report each state transition with IDs/digest and evidence. Stop when materialization is incomplete, evaluation ID/digest mismatch, conflict unresolved, approval absent, or a surface lacks the operation. Never send client-authored `passed`/`score` as proof.

## References

- [packs](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [api](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [mcp-tools](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
