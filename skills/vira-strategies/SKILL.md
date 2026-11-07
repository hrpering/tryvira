---
name: vira-strategies
license: "Proprietary; see LICENSE"
description: "Author, validate, simulate, activate, and operate Vira Behavior Strategies using the documented lifecycle and execution authority."
---

# Vira Strategies

Use a Behavior Strategy only when a task needs the documented selection, variant, or execution logic beyond a Semantic Task, Behavior Point, or Program. A Strategy is an optional governed artifact, not a prompt wrapper or a shortcut around evaluation/release.

## Activate this skill when
Creating a Strategy or variant, validating/simulating it, activating an eligible revision, starting or continuing Strategy execution, or debugging its trace/state. For simpler authoring, use `vira-author-behavior`.

## Inputs and preconditions
Gather the task, allowed outcomes, constraints, scope, intended canonical objects, and whether the request is authoring, activation, or execution. Check scoped capabilities and the installed JavaScript/Python SDK contract. MCP coverage is narrower; inspect `tools/list` and the published catalog.

## Workflow
1. Confirm that a Strategy is necessary; prefer a simpler Behavior Point/Program when it captures the requirement.
2. Inspect existing Strategies and canonical relationships in the target scope before creating anything. Draft the Strategy and any variant using the current SDK schema; preserve stable IDs and idempotency for mutation retries.
3. Validate the Strategy and inspect server-returned errors/eligibility. Treat structural simulation as a structural check, not provider execution, evaluation evidence, or approval.
4. Keep variant/revision identity immutable and record its returned ID/digest. Activate only as a separately authorized operation after the applicable validation and release/evaluation gates are satisfied.
5. Start execution only from the eligible immutable artifact. Inspect execution state and trace; correlate request, execution, and authority digest.
6. If execution is waiting, continue that same execution with its original authority digest and documented `state`/`references`. Do not create a replacement to bypass the wait. Cancel only when explicitly requested and permitted.
7. Verify readback and report validation, simulation, activation, execution, evaluation, and release as separate states.

JavaScript/Python references expose list/get/create/variant/validate/simulate/activate and execution methods. Read the installed method types for exact request schemas; do not make up field names. MCP offers only its published subset and does not imply activation/execution parity.

## Deliverable and failure handling
Return Strategy/variant/revision identifiers, scope, validation/simulation results, activation authority, execution state/digest/trace, and unresolved gates. Stop on schema uncertainty, validation failure, stale or mismatched digest, non-eligible state, missing authorization, or unsupported MCP operation. Do not infer a deployment or release from activation alone.

## References

- [Behavior Strategies](https://github.com/hrpering/tryvira/blob/main/docs/strategies.md)
- [Current strategy notes](https://github.com/hrpering/tryvira/blob/main/docs/strategies-current.md)
- [JavaScript SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [Python SDK](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [HTTP API](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- [Capability map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
