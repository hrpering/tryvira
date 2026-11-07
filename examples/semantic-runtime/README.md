# Semantic selection and runtime authorization

This example demonstrates a boundary that is easy to get wrong:

```text
user request → semantic candidate selection → runtime authority check → execute or deny
```

`resolveSemantic` can return a candidate or abstain. It does not authorize execution.
`resolveRuntime` checks the scoped released identity, policy, and idempotency boundary.
An application must stop when runtime returns deny/abstain.

## Prompt for a coding agent

```text
Add a Vira semantic-to-runtime integration for this application.

Use @tryvira/sdk@0.1.43 and inspect the installed TypeScript declarations before
writing code. Resolve the user's request semantically, display the candidate and
confidence/evidence fields without treating them as permission, then call runtime
resolution with the explicit organization/project/environment scope and an idempotency
key. Continue only when the runtime decision is ALLOW.

Add tests for: semantic no-match, runtime deny because no released revision exists,
runtime allow with a known released identity, missing scope, and retry with the same
idempotency key. Never fall back to direct model/tool execution after deny or abstain.
Use only synthetic data and report the exact response fields observed.
```
