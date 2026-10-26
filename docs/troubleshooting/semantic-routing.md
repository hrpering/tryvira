# Semantic routing

Semantic routing can return a confident selection, uncertainty, or no match. Uncertainty/no-match is not automatically an error.

## `SDK_SEMANTIC_INPUT_REQUIRED`

**Meaning:** semantic resolution received an empty input string.

**Fix:** send the actual user/task input.

**Verify:** test with one of the Semantic Task's known examples.

---

## Resolver returns no selection

### What it means

Vira did not have enough evidence to select a task confidently.

### Common causes

- relevant Semantic Task does not exist;
- task exists but is not active/eligible in the current scope;
- aliases/examples do not resemble the incoming request;
- candidate filtering removed the relevant task;
- the request is genuinely ambiguous.

### Fix

1. Confirm the task exists in the intended scope.
2. Review its description, aliases, positive examples, and negative examples.
3. Add examples that distinguish the task from neighboring tasks.
4. Do not force a selection just to avoid an uncertain result.

### Verify

Test at least three inputs:

```text
clear positive example → should select
clear negative example → should not select
ambiguous example      → may abstain
```

---

## Wrong task selected

### Common causes

- aliases are too broad;
- examples overlap with another task;
- negative examples are missing;
- too many tasks express the same intent using different names.

### Fix

Improve the task definitions rather than adding hard-coded application routing around the semantic resolver.

### Verify

Create a small regression set containing:

- inputs that must select the task;
- inputs that must select neighboring tasks;
- inputs that should remain uncertain.

---

## Semantic selection succeeds but runtime resolution fails

A semantic match identifies the task. It does not by itself make behavior eligible for runtime.

### Check

- selected task maps to the expected Behavior Point;
- Behavior Point exists in the same scope;
- the behavior/release lifecycle is complete;
- the caller is authorized for the runtime operation.

### Verify

Resolve the Behavior Point directly. If direct runtime resolution fails, troubleshoot [Behavior Points](behavior-points.md) or [Runtime and release](runtime-and-release.md) rather than changing semantic examples.
