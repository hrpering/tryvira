# Integration safety invariants

Use these invariants in every Vira skill. Read the detailed public references
only when the task reaches that boundary.

- Keep API credentials in the host's secret mechanism; read values from
  environment variables and never print them.
- Preserve organization, project, and environment scope. Do not use caller
  supplied IDs to widen a credential's authority.
- Discover capabilities for the requested scope and surface. An SDK method
  existing does not mean the account, deployment, or MCP adapter exposes it.
- Treat semantic matching and quality scoring as selection/evidence, not
  authorization.
- Keep proposal, review, evaluation, approval, activation, release, and runtime
  resolution distinct. Never invent or imply a successful transition.
- Use persisted server evaluation IDs/receipts and exact artifact identities
  where the public contract requires them. Never accept a client-made score or
  `passed` flag as authoritative evidence.
- Treat MCP mutations and runtime execution as effectful. Require the configured
  Vira MCP authority decision; stop on deny, error, missing scope, or missing
  capability.
- Use stable idempotency keys for retryable mutations. Do not retry an unknown
  outcome with a new logical key.
- Do not run production mutations, publish packages, or release behavior while
  creating/evaluating these skills. Use synthetic inputs for local policy tests.
  A local fake or stub may test an application's own wrapper, but it never
  verifies Vira and must not appear as a customer integration or service result.
  Verify integration behavior only against the configured supported surface in
  an authorized isolated non-production scope.

Read [authentication and scope](../docs/auth-and-scope.md), [security
model](../docs/security-model.md), [evaluation and approval](../docs/evaluation-and-approval.md),
and [release](../docs/release.md) when the workflow touches them.
