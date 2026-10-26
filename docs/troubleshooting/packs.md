# Packs

Packs have an ordered lifecycle:

```text
import
→ install
→ evaluate
→ approve
→ release
```

Skipping stages produces useful errors. Do not solve them by calling release repeatedly.

## Import errors

### `SDK_PACK_MANIFEST_OR_ARCHIVE_REQUIRED`

**Meaning:** the SDK received neither a Pack manifest nor an archive.

**Fix:** provide a manifest + objects, or an archive.

### `PACK_MANIFEST_REQUIRED`

**Meaning:** the imported source requires a manifest but none was supplied.

**Fix:** add the Pack manifest before import.

### `SDK_PACK_FILE_NAME_REQUIRED`

**Meaning:** an archive upload has no filename.

**Fix:** provide `fileName` with the archive.

### `PAYLOAD_TOO_LARGE`

**Meaning:** the Pack/request exceeded the API payload limit.

**Fix:** remove unnecessary files/data, split the content, or use the supported packaging form for your deployment.

**Verify:** import the minimized Pack and confirm it appears in `listPacks()`.

---

## Install errors

### `SDK_PACK_ID_REQUIRED`

**Meaning:** install/evaluate/approve/release was called without a Pack ID.

**Fix:** use the ID returned by import or `listPacks()`.

### Install succeeds but behavior is not active

That is expected. Install materializes a draft; it is not a release.

**Next:** evaluate the installed Pack.

---

## Evaluation errors

If evaluation itself fails to start or validate, use [Teach and evaluation](teach-and-evaluation.md).

A Pack should only move forward after the evaluation result is recorded.

---

## `PACK_APPROVAL_REQUIRES_EVALUATION`

### What it means

Approval was attempted before the Pack reached the evaluated state.

### Fix

Run/record evaluation first:

```ts
await vira.evaluatePack(packId, {
  passed: true,
  score: 0.97,
  runId: "eval-001",
});

await vira.approvePack(packId);
```

### Verify

Read/list the Pack and confirm it is evaluated before approving it.

---

## `PACK_APPROVER_REQUIRED`

### What it means

The approval transition has no valid approver identity.

### Fix

Perform approval through an authenticated/authorized Studio, API, SDK, or MCP identity that can be recorded as the approver.

### Verify

Retry approval with the correct write-authorized identity.

---

## `PACK_RELEASE_REQUIRES_APPROVAL`

### What it means

Release was attempted before explicit Pack approval.

### Fix

Do not skip the gate:

```text
evaluate → approve → release
```

### Verify

Confirm the Pack is approved, then call release once.

---

## `PACK_RELEASED_IMMUTABLE`

### What it means

The operation is trying to change a Pack record that is already released.

### Fix

Create/import a new Pack version or use the supported upgrade workflow. Do not overwrite the released version in place.

### Verify

The released version remains unchanged and the new candidate/version has its own lifecycle.

---

## Pack upgrade preview fails

### `PACK_UPGRADE_INPUT_REQUIRED`

**Meaning:** upgrade preview has no incoming Pack candidate.

**Fix:** provide the incoming Pack representation to preview.

### Verify

Run upgrade preview before applying/releasing the next version.

---

## Recommended Pack debugging checklist

```text
Can I list the Pack?
↓
Was import valid?
↓
Was it installed?
↓
Did evaluation complete?
↓
Was approval explicit?
↓
Was release performed after approval?
```

If the answer changes from yes to no at one stage, fix that stage instead of debugging runtime first.
