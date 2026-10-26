# Release

Release makes approved behavior eligible for runtime.

## Principle

```text
proposal ≠ released behavior
evaluation pass ≠ automatic release
semantic match ≠ released behavior
```

## Public API

```text
POST /v1/releases
```

A release is created only after the required revision, policy, and evaluation checks pass.

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

That supports reproducibility, review, and rollback.
