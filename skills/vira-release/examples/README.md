# Customer example: Release a reviewed Pack candidate

## Scenario

Read back the exact candidate and its persisted evaluation, verify they still refer to one another, and make approval and release separate authorized actions.

## Reference

- Workflow guide: [release.md](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
- Customer artifact or runnable code: [09-release-pack.mjs](https://github.com/hrpering/tryvira/blob/main/tutorials/marketing-agent/09-release-pack.mjs)

## Run and verify

Run this real API script only with an isolated customer scope and explicit release authorization; it does not manufacture a passing evaluation.

This example uses the customer’s own configured Vira deployment when it is executable. It does not include a mock Vira server, shared credentials, customer records, or private production data. Where the public contract or account capability is not available, the example is a review procedure and explicitly says where execution must stop.
