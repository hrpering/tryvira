# Simple traces

Public traces should be useful without exposing internal authority metadata.

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

## What not to expose

This public repository deliberately avoids documenting or displaying:

- raw internal receipts;
- authority digests;
- internal composition identities;
- private deployment identifiers;
- hidden policy payloads;
- proprietary scoring;
- secret references;
- customer-sensitive metadata.

If a developer needs deeper incident debugging, use the authenticated product surfaces intended for that purpose.
