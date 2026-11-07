---
name: vira-js-sdk
license: "Proprietary; see LICENSE"
description: "Implement or debug a Vira integration using the published JavaScript or TypeScript SDK."
---

# Js Sdk

Use the currently published `@tryvira/sdk`; discover the registry version rather than copying a stale pin. Verify method names and signatures against the public SDK reference and installed package types. Use `ViraClient`, scoped env configuration, stable idempotency keys for retried mutations, and explicit error handling. Semantic resolve is not authorization. Never invent an SDK method from another surface.

## Activate this skill when
Implementing or debugging Vira calls in JavaScript/TypeScript with `@tryvira/sdk`. Do not use it for MCP server setup or pure HTTP integrations.

## Inputs and preconditions
Inspect Node version, installed SDK version/types, module system, current Vira client construction, config source, and exact operation. Resolve method names and signatures from the installed package and public reference, not memory.

## Workflow
1. Confirm registry latest when version freshness matters; inspect the installed declaration for the actual project's contract.
2. Reuse the existing client/config pattern and read scoped values from environment/secret storage.
3. Implement the narrow operation with explicit scope, request validation, error handling, and stable idempotency for retries.
4. For Pack flows, use supported manifest/archive input, direct variables map, wait for 202 materialization, and pass a persisted evaluationId bound to the exact digest.
5. Add a deterministic test with a stubbed client/transport; separately label live API behavior unverified unless actually exercised.

## Deliverable and failure handling
Provide compilable JS/TS matching the installed types, test command/results, and any required separate approval step. Stop on unsupported method, missing scope, or authorization denial; never substitute an API/MCP method as an SDK method.

## References

- [javascript-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [quickstart](https://github.com/hrpering/tryvira/blob/main/docs/quickstart.md)
