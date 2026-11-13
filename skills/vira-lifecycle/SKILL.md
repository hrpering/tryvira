---
name: vira-lifecycle
license: "Proprietary; see LICENSE"
description: "Plan a complete governed Vira behavior lifecycle across the surfaces that actually support each step."
---

# Lifecycle

Map the requested use case to available surfaces from the capability matrix; do not promise parity. Keep connect, observe, author, propose, review, evaluate, approve, release, runtime and feedback as distinct steps. Confirm queued operations, exact artifact bindings, explicit authority and receipts. If a surface lacks an operation, switch to documented SDK/Python/HTTP or state the gap.

## Activate this skill when
Planning or checking a multi-step governed behavior lifecycle across more than one Vira surface. Use `vira-full-lifecycle` when the user asks the assistant to orchestrate end-to-end implementation.

## Inputs and preconditions
Capture goal, application, permitted scope, candidate identity, available interfaces, evidence/data restrictions, evaluation needs, reviewer, and rollback requirement. Mark unknowns rather than inventing values.

## Workflow
1. Map the goal onto capability matrix and select a supported surface separately for each operation.
2. Plan connect/scope, evidence, task/point authoring, optional program/strategy, candidate/Pack, validation, and materialization gates.
3. Plan persisted evaluation, regression review, human approval, exact release, runtime trace/receipt, and feedback/Teach loop as distinct state transitions. For Teach, carry the documented business-outcome gap forward: the event-specific payload is not defined, so do not invent one or claim business-outcome attribution. Require a visibly returned or operator-verified Behavior Point ID because the SDK exposes `listBehaviorPoints()` as a generic response and the public contract does not define its response envelope; if the ID cannot be verified, stop at that handoff instead of guessing.
4. For each stage define input, expected persisted state, evidence to inspect, and safe stop condition.
5. Execute only requested authorized steps; update the plan from observed server state and route surface gaps to supported alternatives. The JS/Python `outcome` helper stamps `eventType: "business.outcome"` on the common observation envelope, but its business-result fields are unspecified; keep attribution marked as a gap until that schema is documented.

## Deliverable and failure handling
Return a stage checklist with surface, required authority, evidence, status, and next action. Never compress proposal/approval/release into one step or report unexecuted plan items as completed.

## References

- [Live Marketing Agent lifecycle tutorial](https://github.com/hrpering/tryvira/blob/main/tutorials/marketing-agent/README.md)

- [developer-guide](https://github.com/hrpering/tryvira/blob/main/docs/developer-guide.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [mcp-tools](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
