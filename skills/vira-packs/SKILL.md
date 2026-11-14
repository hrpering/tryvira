---
name: vira-packs
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Prepare, review, and govern Vira Packs using the installed public client documentation without assuming cross-surface parity."
---

# Manage Behavior Packs

Use this skill when a customer needs to prepare or operate a Pack through a supported public interface. Read the current Pack guide and installed JavaScript or Python SDK documentation before writing code. Those versioned materials define the available calls and data shapes. Do not infer HTTP or MCP support from SDK operations.

## Activate this skill when
Importing, configuring, evaluating, reviewing, upgrading, or releasing a Vira Pack. Use `vira-build-pack` to author and validate the local candidate first.

## Inputs and preconditions

The current published MCP catalog has no Pack tools; verify live tools before selecting MCP.

- Confirm the customer's Vira API URL, credential scope, target environment, and requested operation.
- Keep credentials server-side and use only synthetic content in public examples.
- Check the installed client version and its published documentation. Confirm MCP support from its current catalog and runtime `tools/list` response.
- Use an isolated development scope when available. Production changes require the customer's authorization.

## Workflow

1. Inspect the candidate locally and identify its intended scope and required customer inputs.
2. Choose a client that documents the requested Pack operation. Stop if the surface does not expose it.
3. Import and review the server response, including any warnings, conflicts, or missing inputs. Do not proceed while review is needed.
4. Configure the candidate using the installed client documentation. Supply the documented variables map; if the service reports asynchronous work (including a queued `202`), read persisted state until materialization is confirmed.
5. Evaluate the persisted candidate using the documented evaluation flow. Where an operation requires `evaluationId`, use only an ID returned by a persisted evaluation. Do not invent results, scores, identities, or digest values.
6. Route approval and release through their separate, explicitly authorized operations. Confirm the released identity from persisted state before runtime verification.
7. For upgrades or revisions, inspect the documented preview or comparison before applying changes. Preserve the prior eligible identity for recovery.

## Stop conditions

Stop if the installed surface lacks the required operation, the public schema is unclear, conflicts are unresolved, asynchronous work is incomplete, evaluation evidence is missing, or approval is absent. Ask for the current public contract or an authorized operator decision; do not guess or skip a gate.

## Implementation details

1. Inspect actual Pack ZIP/manifest, Task/Point/Program/Strategy references, conflict inventory and installed collection status. An import creates a candidate; a queued 202 is not completed install.
2. JS `importPack({manifest,objects})` or archive, Python `import_pack(manifest,objects)`; install with direct `installPack(packId,variablesMap)` or `install_pack(pack_id,variables)`. Do not doubly nest variables.
3. Evaluate the exact materialized artifact using a server-persisted evaluation. Only call `evaluatePack(packId,{evaluationId: realId})` with a real matching evaluation; never client-authored score/PASS.
4. Approval and release require distinct authorization and readback. Test a released Pack in an ordinary request via **AUTO TaskRun**, then require real child/run/provider verification and receipts to claim applied behavior.
5. A Pack's Signal key does **not** materialize an approved producer; `judge:` is only a verifier-extension requirement until a real implementation is configured.
6. Negative: unresolved collision, missing variable binding, stale digest, unconfigured judge, partial child or wrong scope blocks progression.
[Current Pack Academy](https://github.com/hrpering/tryvira/blob/main/examples/packs/README.md) · [Verifier](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md).

## Deliverable and failure handling

Summarize the completed stages, redacted server-issued identifiers, current persisted status, unresolved review items, and the next authorized action. Never include API keys, customer content, private URLs, or production traces.

## References

- [Pack guide](https://github.com/hrpering/tryvira/blob/main/docs/packs.md)
- [JavaScript SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [Python SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [MCP catalog](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
- [Published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
- [Runnable Pack evaluation example](https://github.com/hrpering/tryvira/blob/main/skills/vira-evaluate/examples/README.md)
