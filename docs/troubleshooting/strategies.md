# Strategies

Use this guide for Strategy definition, validation, simulation, and execution failures.

## `SDK_STRATEGY_ID_REQUIRED`

**Meaning:** a get/validate/simulate/variant operation has no Strategy ID.

**Fix:** use an ID returned by Strategy creation/listing or Pack materialization.

**Verify:** read the Strategy before validating it.

---

## `SDK_STRATEGY_DEFINITION_REQUIRED`

**Meaning:** Strategy creation was called without a definition.

**Fix:** provide a complete versioned definition or author the Strategy through a Pack.

**Verify:** call structural validation immediately after creation.

---

## Strategy validation fails

### Common causes

- entry step does not exist;
- a step or edge points to an unknown key;
- no reachable terminal path exists;
- a cycle is not bounded;
- a required state value is not produced before use;
- a tool or verifier reference is not supported;
- the Strategy requires verification but no usable verifier is configured.

### Fix

Debug the graph first:

```text
1. entry step
2. reachable steps
3. edge targets
4. required/produced state
5. terminal path
6. verifier/tool references
7. budgets/recovery behavior
```

### Verify

Run `validateBehaviorStrategy(strategyId)` until structural validation passes, then run simulation.

---

## Simulation passes but no real model/tool call happens

That is expected.

`simulateBehaviorStrategy` is a structural dry run. It checks the Strategy shape and flow; it is not the real runtime execution path.

### Fix

Use runtime Strategy execution when you need real provider/tool calls.

### Verify

Confirm validation and simulation pass before moving to runtime.

---

## `STRATEGY_VERIFIER_UNAVAILABLE:<key>`

### What it means

The Strategy references a verifier key that the executing runtime does not provide.

### Common causes

- typo in `verifierKeys`;
- verifier is not available in the target runtime;
- Strategy version expects a verifier that was renamed.

### Fix

Use a supported verifier key or make the required verifier available in the target runtime, then validate the Strategy again.

### Verify

Simulation and validation should succeed with the intended verifier configuration before real execution.

---

## `RUNTIME_STRATEGY_SELECTION_REQUIRED`

### What it means

Runtime needs a Strategy for the requested behavior but cannot select an eligible one.

### Fix

Confirm:

- Strategy is bound to the intended Behavior Point;
- scope matches;
- Strategy candidate has completed the required lifecycle;
- runtime request is eligible for that Strategy.

### Verify

Read the Strategy and resolve the Behavior Point separately, then retry runtime execution.

---

## `STRATEGY_ARTIFACT_NOT_FOUND`

### What it means

Execution refers to a Strategy artifact that cannot be loaded in the current scope/runtime.

### Fix

Resolve/read the current Strategy version and start a new execution using the current eligible Strategy.

### Verify

The new execution should start with the expected Strategy version.

---

## Execution is waiting

A waiting Strategy is not necessarily failed.

### Fix

Continue the same execution with the expected state/references.

### Verify

Read the execution state, continue it once, and confirm it moves to the next expected state or terminal result.

---

## Execution fails after a tool step

### Check

- tool is available in the target integration;
- required tool arguments were produced by prior steps;
- the operation is permitted for the current caller;
- recovery policy does not require another explicit step.

### Verify

Test the smallest Strategy path containing that tool before restoring the full graph.
