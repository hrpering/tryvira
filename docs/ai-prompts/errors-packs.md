# AI prompts: Pack errors

Use these prompts for the Pack lifecycle:

```text
import → install → evaluate → approve → release
```

The AI should always read current Pack state before proposing the next transition.

## `SDK_PACK_MANIFEST_OR_ARCHIVE_REQUIRED` / `PACK_MANIFEST_REQUIRED`

```text
Fix `<ERROR_CODE>` in this Vira Pack import.

Inspect the import call and the Pack files. Determine whether this project intends to import a manifest + object payload or an archive. Do not create a second format unless necessary.

Check that a valid Pack manifest is present and that the import call actually passes it. If using an archive, confirm the archive contains the expected Pack structure.

Return intended import format, missing input, exact minimal patch, and verification using import followed by `listPacks()`.
```

## `SDK_PACK_FILE_NAME_REQUIRED`

```text
Fix `SDK_PACK_FILE_NAME_REQUIRED`.

Inspect the archive import code. Preserve the existing archive bytes and add the real archive filename alongside `archiveBase64`. Do not invent a file extension that does not match the source.

Return the corrected import call and verification that import succeeds and returns/list exposes a Pack ID.
```

## `PAYLOAD_TOO_LARGE`

```text
Reduce this Vira Pack request that fails with `PAYLOAD_TOO_LARGE`.

Inspect the Pack contents and identify what contributes most to payload size. Separate required behavior definitions from unnecessary generated files, duplicate examples, binary assets, build artifacts, or unrelated data.

Do not silently remove required Semantic Tasks, Behavior Points, Programs, Strategies, Signals, evaluations, or policy objects.

Return:
1. size contributors ranked
2. safe items to remove/split
3. resulting Pack structure
4. import verification
5. confirmation that required behavior objects remain present
```

## `SDK_PACK_ID_REQUIRED`

```text
Fix `SDK_PACK_ID_REQUIRED` without hard-coding an arbitrary ID.

Trace the Pack lifecycle from import/list to the failing call. Find where the returned Pack ID should be stored/passed. Confirm it belongs to the same scope.

Return the real source of Pack ID, smallest plumbing fix, and verification with `listPacks()` before retrying the lifecycle call.
```

## `PACK_APPROVAL_REQUIRES_EVALUATION`

```text
Fix `PACK_APPROVAL_REQUIRES_EVALUATION` by restoring the correct Pack lifecycle.

Read the Pack state first. Confirm whether install completed and whether an evaluation result has been recorded. Do not call approve again until the Pack is evaluated.

Return:
current Pack state → missing evaluation step → exact evaluate call/input source → read-back verification → approve call only after verification.

Do not fabricate a passing score just to advance the Pack. Use the actual evaluation result from the project's evaluation flow.
```

## `PACK_APPROVER_REQUIRED`

```text
Fix `PACK_APPROVER_REQUIRED` without adding a fake user ID.

Identify which authenticated/authorized application, Studio, SDK, API, or MCP identity is performing approval and why the approver identity is not reaching the Pack approval call.

Do not hard-code a random approver string. Return the correct identity source, minimum integration/config change, and a verification that approval records a valid authorized actor.
```

## `PACK_RELEASE_REQUIRES_APPROVAL`

```text
Fix `PACK_RELEASE_REQUIRES_APPROVAL` by checking state, not by retrying release.

Read the Pack. Confirm evaluation completed and explicit approval exists. Find the first missing transition in:
import → install → evaluate → approve → release.

Return current state, required predecessor state, one exact next action, read-back verification, and only then the release call.
```

## `PACK_RELEASED_IMMUTABLE`

```text
Resolve `PACK_RELEASED_IMMUTABLE` without editing the released Pack in place.

Identify what change is being attempted and create the correct next candidate/version or supported upgrade path. Preserve the released version unchanged.

Return:
1. attempted mutation
2. why it targets an immutable released Pack
3. new version/candidate plan
4. upgrade preview or new lifecycle steps
5. verification that old release is unchanged and new candidate has its own state
```

## `PACK_UPGRADE_INPUT_REQUIRED`

```text
Fix `PACK_UPGRADE_INPUT_REQUIRED`.

Inspect the upgrade-preview call and identify the incoming Pack candidate that should be compared with the current released Pack. Do not perform the actual upgrade/release before preview succeeds.

Return the expected incoming object/source, corrected preview call, key differences to inspect, and verification that preview returns a result without changing release state.
```

## Full Pack lifecycle debugger

```text
Audit this Pack without changing state until you know where it stopped.

For each stage return PASS/FAIL and evidence:
1. import produced a Pack ID
2. Pack can be listed/read in the same scope
3. install/materialization completed
4. evaluation completed with the real result
5. explicit approval completed
6. release completed

Stop at the first FAIL. Give exactly one next action and one read-back verification. Never skip a stage or overwrite a released Pack.
```
