# Customer example: Call a documented customer HTTP operation

## Scenario

Read the exact public route and authorization guidance for the selected operation, send a synthetic request using the customer’s server-side key, and preserve the returned request identity.

## Reference

- Workflow guide: [api.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/api.md)
- Customer artifact or runnable code: [auth-and-scope.md](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)

## Run and verify

Use only routes and payloads published in the customer-facing API reference. If the required route is not documented, stop and ask for its public contract.

This example uses the customer’s own configured Vira deployment when it is executable. It does not include a mock Vira server, shared credentials, customer records, or private production data. Where the public contract or account capability is not available, the example is a review procedure and explicitly says where execution must stop.
