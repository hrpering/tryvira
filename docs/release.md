# Release

Release makes the exact approved/evaluated governed identity eligible for runtime.

## Principle

```text
proposal ≠ released behavior
evaluation pass ≠ automatic release
semantic match ≠ released behavior
Strategy activation ≠ permission to bypass release
```

The release boundary answers a precise question:

> Which canonical behavior identity is eligible in this scope now?

## Governed release lifecycle

```text
candidate revision
→ required evaluation / approval evidence
→ release exact canonical identity + digest
→ durable promotion/release receipt
→ runtime resolve / execute
→ trace / outcome
```

The client should preserve the returned identity, digest, request ID and receipt data. Do not reconstruct a release by changing a local status or substituting a different revision.

## Public API

```text
POST /v1/releases
```

A release is created only after the required revision, scope, policy, evaluation and approval checks pass for that flow.

## Pack release

For Pack workflows:

```text
import
→ validate / inventory / configure
→ install / materialize draft
→ evaluate
→ approve
→ release
→ runtime
```

Pack import or installation never silently grants runtime eligibility.

## Why release identity matters

An explicit release identity supports:

- reproducibility: runtime can identify exactly what was eligible;
- review: evaluation/approval evidence remains attributable;
- traceability: runtime receipts can bind back to the released identity;
- rollback: operators can restore a known canonical identity instead of guessing from mutable state.

## Runtime relationship

Semantic selection can identify a candidate task/behavior target, but runtime still consumes the eligible released identity through the authority boundary. A semantic match is not a release receipt.

## Rollback

Rollback is part of the release model, not an afterthought. It should restore a known canonical identity and make the resulting runtime state observable through the same trace/receipt model.

See [Runtime](runtime.md), [Evaluation and approval](evaluation-and-approval.md), [Packs](packs.md), and the [Developer guide](developer-guide.md).
