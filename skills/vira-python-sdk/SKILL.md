---
name: vira-python-sdk
license: "Proprietary; see LICENSE"
description: "Implement or debug a Vira integration using the published Python SDK."
---

# Python Sdk

Use the currently published `tryvira-sdk`; discover current registry version rather than copying a stale pin. Verify method names/signatures against the Python reference and installed package. Read secrets from environment variables; use context management when appropriate; retain scope and idempotency behavior. Do not assume MCP or JS-only functionality has a Python equivalent without checking. In particular, do not expect `resolve_runtime` to return the JavaScript `RuntimeResolution` projection fields: use the documented Python `serve_behavior_projection` operation and its `body.projection` response when a rendered projection is needed.

## Activate this skill when
Implementing or debugging Vira through the published `tryvira-sdk` Python package. Do not use it for Node/MCP-only changes.

## Inputs and preconditions
Inspect Python version, active virtual environment, dependency manager/lockfile, installed distribution version, and application lifecycle (sync/async, ASGI, workers). Verify exact method signatures against installed package docs/types.

## Workflow
1. Check current PyPI metadata when freshness matters; report registry failure instead of guessing latest.
2. Add the dependency using the existing environment manager and preserve its lockfile.
3. Read credentials and scope from environment/secret storage; use the package's documented client/context lifecycle.
4. Implement the minimum supported call with explicit exception handling, idempotency for writes, and no cross-surface API assumptions.
5. Add fixture-based tests and run focused lint/type/test commands; make no live request unless asked and authorized.

## Deliverable and failure handling
Return runnable code for the project's Python version, dependency changes, verification output, and any unresolved API boundary. Stop if scope is unknown or the installed contract contradicts a remembered signature.

## References

- [python-sdk](https://github.com/hrpering/tryvira/blob/main/docs/reference/python-sdk.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [auth-and-scope](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
- [quickstart](https://github.com/hrpering/tryvira/blob/main/docs/quickstart.md)
- [published SDK method inventory and JS/Python surface differences](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
