# Customer example: Diagnose a failed customer integration without exposing secrets

## Scenario

Collect the package version, safe status/error code, request ID, and sanitized failing operation; follow the relevant surface-specific troubleshooting branch.

## Reference

- Workflow guide: [README.md](https://github.com/hrpering/tryvira/blob/main/docs/troubleshooting/README.md)
- Customer artifact or runnable code: [authentication-and-scope.md](https://github.com/hrpering/tryvira/blob/main/docs/troubleshooting/authentication-and-scope.md)

## Run and verify

Do not paste keys, production traces, or customer prompts. Start with read-only diagnosis and change only the smallest failing integration point.

This example uses the customer’s own configured Vira deployment when it is executable. It does not include a mock Vira server, shared credentials, customer records, or private production data. Where the public contract or account capability is not available, the example is a review procedure and explicitly says where execution must stop.
