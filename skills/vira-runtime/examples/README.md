# Customer example: Compare a chatbot request with Vira OFF and ON

## Scenario

Use the customer-run Next.js/OpenAI Agents example. OFF skips Vira when observation is disabled; ON resolves runtime first and stops before the model unless an active projection is returned.

## Reference

- Workflow guide: [README.md](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/README.md)
- Customer artifact or runnable code: [route.ts](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/app/api/support/route.ts)

## Run and verify

Run locally with an OpenAI key. Vira ON additionally needs the customer’s configured endpoint, scope, Behavior Point, and eligible released behavior.

This example uses the customer’s own configured Vira deployment when it is executable. It does not include a mock Vira server, shared credentials, customer records, or private production data. Where the public contract or account capability is not available, the example is a review procedure and explicitly says where execution must stop.
