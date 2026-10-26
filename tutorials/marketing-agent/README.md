# Marketing Agent: end-to-end Vira tutorial

This tutorial shows the Vira lifecycle around a fictional marketing assistant.

It focuses on supported SDK, MCP, and lifecycle concepts.

## Goal

The assistant repeatedly produces acquisition-heavy launch plans.

We want this behavior:

> For launch-plan tasks, cover awareness, consideration, conversion, and retention. Include an objective and measurement approach for each stage.

## Flow

```text
1. Connect agent
2. Observe baseline interaction
3. Send user correction
4. Resolve semantic task
5. Author Behavior Point with Pack
6. Bind Signal keys
7. Install draft
8. Evaluate
9. Approve
10. Release
11. Resolve at runtime
12. Observe new result
13. View simple trace
```

## 1. Connect

See `01-connect.mjs`.

## 2. Observe baseline

See `02-observe-baseline.mjs`.

The observation contains fictional metadata only.

## 3. Record correction

See `03-feedback.mjs`.

The correction becomes evidence.

It does not become active behavior yet.

## 4. Semantic resolution

See `04-semantic-resolve.mjs`.

Input:

```text
Build a launch plan for a subscription product.
```

Expected conceptual selection:

```text
marketing.launch_plan
```

The server can still abstain or return no match.

## 5. Create the Behavior Point

Use the Pack in:

```text
pack/
```

The important file is:

```text
pack/behavior-points/items.yaml
```

The Behavior Point key is:

```text
marketing.launch_plan
```

## 6. Signals

The Pack declares expected signal keys:

```text
quality.missing_measurement
feedback.user_correction
```

Signal discovery and producer mapping still follow the governed Signal lifecycle.

## 7. Import and install

See `05-pack-lifecycle.mjs`.

Import creates the candidate.

Install materializes the draft governed resources.

## 8. Evaluate

The example calls Pack evaluation with an illustrative pass result.

In a real deployment, connect evaluation to your actual evaluation run.

## 9. Approve

Approval remains explicit.

## 10. Release

Release makes the approved Pack behavior eligible for runtime.

## 11. Runtime resolution

See `06-runtime-resolve.mjs`.

The application resolves:

```text
marketing.launch_plan
```

before generating the next relevant response.

## 12. Observe new result

Send the new output as another observation.

## 13. Simple trace

The user-facing developer trace should stay compact:

```text
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Behavior         full_funnel_launch_planning
Applied          yes
Result           completed
```

The compact trace above is sufficient for the public demo.
