---
name: vira-studio
license: "Proprietary; see LICENSE"
description: "Navigate Vira Studio workflows using public documentation and verified capability availability."
---

# Studio

Treat Studio docs/routes as workflow guidance, not proof a page is currently accessible or operational. Product access may be closed. Do not claim to create, approve, release, or change anything unless the user has access and explicitly requests the action. Use displayed scope and confirm consequential transitions.

## Activate this skill when
A user asks where/how to perform a Vira task in Studio or interpret Studio-visible state. Do not claim current product access or automate a UI based only on a documented route.

## Inputs and preconditions
Confirm the customer's actual authenticated Studio endpoint, target organization/project/environment, requested page/action, and whether it is read-only or consequential. Product access may not yet be open.

## Workflow
1. Check the public access notice and Studio capability matrix; distinguish documented workflow from verified live UI.
2. If a browser session is available and authorized, inspect visible page state and scope before interaction; do not handle credentials outside approved UI.
3. For read-only review, capture only needed status/IDs and redact customer content.
4. Before approval, release, deletion, or configuration change, present the exact target and effect and get explicit authorization.
5. Verify the resulting state in Studio or a documented read API and record evidence.

## Production-aligned implementation playbook

1. Confirm the customer's actual Studio endpoint and authenticated scope. Old product URLs and source routes are not evidence of live access.
2. From the visible UI, check roles and capability availability before displaying actions. Keep Behavior authoring, Signal mapping, Pack install, evaluation, approval, release, TaskRun monitoring and Admin privilege boundaries separate.
3. Present the exact candidate/actor/target/digest before any effectful UI transition and obtain explicit approval. Read back persisted state; a toast does not prove background jobs finished.
4. For runtime verification, show actual TaskRun child status and post-model receipt only when the authenticated deployment exposes them. A completed run alone is not a verified chatbot answer.
5. Negative: never claim a feature exists simply because a page name is in the prod source or a screenshot.
[Capability discovery](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md) · [Product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md).

## Deliverable and failure handling
State whether the UI was actually accessed, the scope/page checked, and which steps remain unverified. If access is unavailable, offer documented SDK/API alternatives without implying Studio mutation occurred.

## References

- [what-is-vira](https://github.com/hrpering/tryvira/blob/main/docs/what-is-vira.md)
- [developer-guide](https://github.com/hrpering/tryvira/blob/main/docs/developer-guide.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [evaluation-and-approval](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [release](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
