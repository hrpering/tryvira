# Vira: governed behavior for AI applications

Vira is being built for teams that need to change how an AI application responds, decides, or uses tools without losing track of what changed and how that change was checked.

Instead of treating every correction as a new prompt edit, Vira gives teams product concepts for describing behavior, evaluating revisions, making review and release decisions explicit, and connecting eligible behavior to supported runtime integrations. The goal is to make behavior changes easier to inspect and operate across an application's lifecycle.

## What this helps a team do

- **Describe expected behavior:** represent task-specific requirements as governed Vira resources rather than relying only on one long system prompt.
- **Review changes before use:** test a candidate against declared cases, inspect its persisted evaluation, and keep approval and release as distinct decisions.
- **Connect behavior to runtime:** use a supported SDK, HTTP, or other documented integration to resolve or execute behavior within the application's chosen boundary.
- **Inspect what happened:** retain the identities, receipts, traces, or outcomes that the selected operation returns, then use permitted evidence to inform a later proposal.

These capabilities form related but separate steps. A semantic match does not grant authority. A Teach proposal does not approve itself. An evaluation is not a release, and a trace is evidence of a recorded operation rather than proof that the model was correct.

## Example: a support action

A support team may want high-impact refund requests to receive an additional review. It can express the expected behavior, evaluate a proposed change, and wire its refund action through an appropriate Vira-controlled decision boundary. The application must still implement the returned decision safely and enforce its own tool permissions. If a code path invokes the refund tool without consulting that boundary, Vira cannot intercept it.

This is an integration pattern, not a claim that Vira independently controls every tool call or guarantees a particular business outcome.

## What the product does not promise

- No claim that Vira produces more accurate answers, lower costs, or fewer regressions without comparative evidence from a relevant environment.
- No guarantee that behavior is identical across models or applications. The host application and model still affect results.
- No universal enforcement of external actions. Enforcement depends on the application's integration and on routing the action through the configured control boundary.
- No assumption that SDK, HTTP, MCP, and Studio expose identical operations. Check the [capability map](capability-map.md) and the selected surface's contract.
- No inference that a passing evaluation proves all future behavior safe. Results are limited to the tested artifact, dataset, criteria, and environment.

## Current availability

Vira is under active development and product access is not open yet. The public repositories describe supported integration contracts and examples; live tenant behavior and Studio workflows should not be inferred from documentation alone. Visit [Vira Studio](https://studio.tryvira.xyz) for product updates.

For implementation details, see [How Vira works](how-vira-works.md), the [capability map](capability-map.md), and [integration examples](../examples/README.md).
