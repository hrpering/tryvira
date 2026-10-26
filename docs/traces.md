# Simple traces

Traces should make runtime behavior easy to understand at a glance.

## Recommended developer view

```text
Request          Build a launch plan for a membership product
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Behavior         full_funnel_launch_planning
Applied          yes
Result           completed
```

## Another example

```text
Request          Approve this refund
Task             support.refund_request
Behavior Point   support.refund_request
Behavior         refund_review_threshold
Applied          yes
Result           escalation_required
```

## What to show

A public trace may show:

- request or trace label;
- resolved task;
- Behavior Point;
- released behavior label;
- applied / skipped state;
- high-level result;
- user-safe reason when appropriate.

## Public examples

For documentation, demos, screenshots, and issue reports, use the compact trace fields shown above.
Never include credentials, personal data, or confidential application data in material shared publicly.
