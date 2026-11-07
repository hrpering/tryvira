# Behavior Points

A Behavior Point is the stable attachment point used when Vira resolves governed behavior.

## `SDK_BEHAVIOR_POINT_REQUIRED`

### What it means

`resolveRuntime` was called without a Behavior Point key.

### Fix

Provide a non-empty key:

```ts
await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: { organizationId, projectId, environmentId },
});
```

### Verify

Retry the same resolve request and confirm Vira recognizes the Behavior Point in the intended scope.

---

## Behavior Point not found / no eligible behavior

### Common causes

- Pack was imported but not installed;
- Behavior Point exists in another project/environment;
- task key and Behavior Point key were bound incorrectly;
- behavior was created but has not completed evaluation/approval/release;
- the application is using an old key after a Pack/version change.

### Fix

For Pack-based authoring, check the lifecycle in order:

```text
import
→ install
→ evaluate
→ approve
→ release
```

Then confirm the installed Pack contains the intended Behavior Point key and Semantic Task binding.

### Verify

1. list/read the Pack;
2. confirm the Behavior Point key;
3. run semantic resolution for a known input;
4. run direct `resolveRuntime` for that Behavior Point.

---

## Semantic task selects correctly but wrong Behavior Point is used

### Common causes

- Pack authoring bound the Behavior Point to the wrong `taskKey`/semantic key;
- multiple definitions use confusingly similar names;
- application code overrides the selected Behavior Point.

### Fix

Use stable, descriptive keys and keep Semantic Task → Behavior Point binding explicit in the Pack.

Example:

```yaml
semanticTasks:
  - taskKey: marketing.launch_plan

behaviorPoints:
  - key: marketing.launch_plan
    taskKey: marketing.launch_plan
```

### Verify

Run the same known semantic input and confirm the selected task and runtime Behavior Point are the pair you expect.
