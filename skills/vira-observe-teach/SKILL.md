---
name: vira-observe-teach
license: "Proprietary; see LICENSE"
description: "Submit permitted evidence and create or review Vira Teach proposals without implying automatic promotion."
---

# Observe Teach

Only submit consented, minimized, non-sensitive evidence. Distinguish observations/evidence from authored behavior. Create a proposal from admitted evidence; review/evaluate/promote are separate transitions. Promotion is not an implicit release. Check the selected surface: current MCP may create evidence/proposals but lacks complete transition lifecycle.

## Activate this skill when
Capturing allowed observations/feedback/outcomes or creating, reviewing, accepting, rejecting, or correcting Teach proposals. Do not equate proposal promotion with release.

## Inputs and preconditions
Confirm evidence source, consent/retention rules, minimization/redaction, target system/scope, real event identifiers, and requested proposal decision. Use synthetic fixtures for tests.

## Workflow
1. Check whether the selected surface supports evidence ingestion and the requested proposal transition.
2. For conversation archives, import only consented/minimized records, retain the returned evidence IDs, and use the documented revocation operation when consent or retention requires removal.
3. Submit only permitted evidence; verify its server-issued ID and admitted state. Analyze only selected evidence IDs or conversation references in scope.
4. Create the Teach proposal from actual evidence IDs and a specific Behavior Point/control target.
5. Read current proposal status/reviewState before review; perform explicit accepted/rejected/corrected transition with authorized reviewer identity when supported.
6. If promotion creates a candidate revision, evaluate and release it through the separate documented workflow.

## Deliverable and failure handling
Return evidence/proposal IDs, redacted summaries, state transitions, and the next required human step. Stop for absent consent, nonexistent evidence IDs, unsupported MCP transition, or unclear target; never invent evidence or claim a runtime release.

## References

- [teach](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [signals](https://github.com/hrpering/tryvira/blob/main/docs/signals.md)
- [traces](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
