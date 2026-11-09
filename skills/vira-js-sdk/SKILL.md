---
name: vira-js-sdk
license: "Proprietary; see LICENSE"
description: "Implement or debug a Vira integration using the published JavaScript or TypeScript SDK."
---

# Js Sdk

Use the currently published `@tryvira/sdk`; discover the registry version rather than copying a stale pin. Verify method names and signatures against the public SDK reference and installed package types. Use `ViraClient`, scoped env configuration, stable idempotency keys for retried mutations, and explicit error handling. Semantic resolve is not authorization. Never invent an SDK method from another surface.

The SDK needs `VIRA_API_URL`, the Vira API deployment root supplied by the operator, as `baseUrl` (do not append `/v1` and do not use the Studio URL). Keep `VIRA_API_KEY` server-side. If the URL is missing, ask for it; do not guess a host.

## Activate this skill when
Implementing or debugging Vira calls in JavaScript/TypeScript with `@tryvira/sdk`. Do not use it for MCP server setup or pure HTTP integrations.

## Inputs and preconditions
Inspect Node version, installed SDK version/types, module system, `VIRA_API_URL`, `VIRA_API_KEY` availability (never print the value), current Vira client construction, config source, and exact operation. Resolve method names and signatures from the installed package and public reference, not memory.

## Workflow
1. Confirm registry latest when version freshness matters; inspect the installed declaration for the actual project's contract.
2. Reuse the existing client/config pattern and read scoped values from environment/secret storage.
3. Implement the narrow operation with explicit scope, request validation, error handling, and stable idempotency for retries.
4. For Pack flows, use supported manifest/archive input, direct variables map, wait for 202 materialization, and pass a persisted evaluationId bound to the exact digest.
5. Build the integration and, when the user provides an authorized isolated non-production scope, run it against the actual Vira API and report returned request IDs/statuses. Do not present static checks, source review, or build output as evidence of live Vira behavior.

## Deliverable and failure handling
Provide compilable JS/TS matching the installed types, test command/results, and any required separate approval step. Stop on unsupported method, missing scope, or authorization denial; never substitute an API/MCP method as an SDK method.

## References

- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [quickstart](https://github.com/hrpering/tryvira/blob/main/docs/quickstart.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
