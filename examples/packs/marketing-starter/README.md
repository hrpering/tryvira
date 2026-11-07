# Marketing starter Pack

This is a complete, inspectable Pack source example. It shows how related Semantic
Tasks, Behavior Points, Programs, Strategies, signals, and evaluations are grouped
before they are imported into a scoped Vira environment.

## Before importing

1. Replace only synthetic variables such as brand and market values.
2. Review stable keys, constraints, anti-patterns, and verifier requirements.
3. Run the Pack validation checks in the public Pack guide.
4. Import as a candidate and inspect inventory/conflicts.
5. Install/materialize, run a real candidate evaluation, review the receipt, approve,
   and release only after an explicit human decision.

Importing or installing this Pack does not activate behavior.

## Prompt for a coding agent

```text
Use examples/packs/marketing-starter as a reference to create a Pack for this use case:
<describe the behavior>

First inspect the existing manifest and every collection file. Preserve the repository's
schema and naming conventions. Add only the minimum Semantic Task, Behavior Point,
Program/Strategy, signals, and evaluation cases required by the use case.

Include positive, negative, boundary, missing-evidence, and policy-violation cases.
Make constraints and natural-language output verification explicit. Do not invent
fields, evidence IDs, scores, approvers, or release identities. Do not copy customer
secrets or production traces into the Pack.

Return the proposed file tree, a diff, key-stability rationale, conflict checklist,
candidate import/install commands, real evaluation requirements, and a release checklist.
Stop before approval or release and wait for explicit authorization.
```

See [`docs/packs.md`](../../../docs/packs.md) for the complete lifecycle and SDK/MCP
equivalents.
