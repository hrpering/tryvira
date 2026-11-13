# Customer example: Route and inspect one user-authorized task

## Scenario

Check that the installed SDK release documents the requested TaskRun operations. Follow only returned server state and user authorization when deciding whether to continue or recover.

## Reference

- Workflow guide: [SKILL.md](https://github.com/hrpering/tryvira/blob/main/skills/vira-task-runs/SKILL.md)
- Customer artifact or runnable code: [sdk](https://www.npmjs.com/package/@tryvira/sdk)

## Run and verify

This repository has no executable TaskRun API runner. Use the installed package documentation and types for the exact operations; do not substitute a mock. Do not infer HTTP, Python, or MCP support from JavaScript package operations.

This example uses the customer’s own configured Vira deployment when it is executable. It does not include a mock Vira server, shared credentials, customer records, or private production data. Where the public contract or account capability is not available, the example is a review procedure and explicitly says where execution must stop.
