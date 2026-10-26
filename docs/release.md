# Release

Release makes approved behavior eligible for runtime.

## Principle

```text
proposal ≠ released behavior
evaluation pass ≠ automatic release
semantic match ≠ authorization
```

## Public API

```text
POST /v1/releases
```

The release boundary verifies the required revision, policy, evaluation, and release evidence for the target deployment.

## Public Pack release

For many developer workflows, the Pack lifecycle is simpler:

```text
import
→ install
→ evaluate
→ approve
→ release
```

## Why release identity matters

A release gives the system an explicit answer to:

> Which behavior is active?

That supports reproducibility and rollback without exposing private authority internals.

## What this repository intentionally does not document

- internal release digests;
- private manifest internals;
- raw promotion receipts;
- customer deployment topology;
- proprietary rollout logic.
