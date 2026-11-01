# Receipts and traces

Receipts and traces make governed runtime behavior inspectable without turning public debugging output into a dump of internal state.

## Receipt vs trace

A **receipt** identifies the governed decision/execution result that should be preserved for audit/support, such as the applied release/projection identity, authority digest, request ID, and high-level outcome where returned by the current surface.

A **trace** explains the path in a developer-readable way: what task/Behavior Point was resolved, what governed behavior was eligible/applied/skipped/denied, and what happened next.

Do not recompute authority digests or synthesize release receipts in the client.

## Recommended developer view

```text
Request          Build a launch plan for a membership product
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Program          launch_planning
Strategy         full_funnel_launch_planning
Released identity <server-returned id/digest>
Applied          yes
Result           completed
Request ID       <server-returned request id>
```

## Another example

```text
Request          Approve this refund
Task             support.refund_request
Behavior Point   support.refund_request
Behavior         refund_review_threshold
Applied          no
Result           escalation_required
Reason           approval boundary required
```

## What to preserve in an integration

When returned by the selected surface, keep together:

- request ID;
- receipt ID;
- authority/release/projection digest or identity;
- trace ID;
- Strategy execution ID and authority digest for continuations;
- high-level applied/skipped/denied result;
- outcome/feedback correlation IDs.

Those values let support/debugging follow the same governed identity that runtime used instead of guessing from mutable client state.

## What to show publicly

A public trace may show:

- synthetic request or trace label;
- resolved task;
- Behavior Point;
- released behavior label;
- applied / skipped / denied state;
- high-level result;
- user-safe reason when appropriate.

For documentation, demos, screenshots, and public issues, use synthetic identifiers and compact trace fields. Never include credentials, personal/customer data, tenant identifiers, production receipt payloads, or private infrastructure details.

See [Runtime](runtime.md), [Release](release.md), and the [Developer guide](developer-guide.md).
