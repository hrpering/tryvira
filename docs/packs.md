# Packs

Packs are the supported bulk authoring format for Behavior Point workflows.

They package related behavior resources for a single lifecycle.

## Lifecycle

```text
import
→ inspect / validate
→ install draft
→ evaluate
→ approve
→ release
```

Import alone never activates behavior.

## What a Pack can contain

Authoring collections can include:

- semantic tasks;
- Behavior Points;
- behavior programs;
- strategies;
- policies;
- signal keys;
- Teach patterns;
- evaluation references.

## Example

See:

```text
examples/packs/marketing-starter/
```

## SDK lifecycle

```ts
const imported = await vira.importPack({
  manifest: {
    id: "vira.marketing.starter",
    name: "Marketing Starter",
    version: "1.0.0"
  },
  objects,
  idempotencyKey: "pack:import:vira.marketing.starter:1.0.0"
});

const packId = String(imported?.body.pack?.id);

await vira.installPack(packId, {});
await vira.evaluatePack(packId, {
  passed: true,
  score: 1,
  runId: "example-eval"
});
await vira.approvePack(packId);
await vira.releasePack(packId);
```

The exact response fields are versioned by the server.

## Why Packs are useful

They let a developer author related behavior resources together while preserving evaluation, approval, release, and runtime checks.
