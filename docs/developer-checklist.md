# Developer integration checklist

Vira works with an existing model, application or agent. Public SDKs are clients of a server-side authority boundary, not a second runtime or permission store. This checklist prevents a green build from being mistaken for production acceptance.

## Select the correct surface

| Need | Recommended path | Contract source |
| --- | --- | --- |
| JavaScript / TypeScript | [@tryvira/sdk example](../examples/javascript/README.md) | [Installed npm package](reference/javascript-sdk.md) |
| Python | [tryvira-sdk example](../examples/python/README.md) | [Installed PyPI package](reference/python-sdk.md) |
| MCP host | [MCP launcher and discovery](reference/mcp.md) | Installed `tools/list`, not guessed tools |
| Framework app | [Next.js, FastAPI, LangGraph, MCP](../examples/frameworks/README.md) | Versioned package + host integration |
| Raw HTTP | [HTTP integration boundaries](reference/api.md) | The customer's published API contract |
| TaskRun | [Execution modes](execution-modes.md) | Published SDK methods; no current MCP TaskRun tools |
| Pack evaluation and release | [Pack guide](packs.md) | Published package surface, explicit approval gates |

**Canonical user flow:** [AUTO TaskRun](canonical-taskrun.md). Keep direct behavior-projection under diagnostics; never treat a returned projection string as the final proof of model verification. [High-quality Pack field guide](pack-authoring-guide.md).

## Verify prerequisites

1. **Access:** a provisioned Vira endpoint and customer-owned credentials are required for live Vira operations. The public npm/PyPI package alone does not grant access. The API URL is not the Studio URL.
2. **Scope:** ensure credentials, organization, project and environment are aligned with the intended isolated test scope.
3. **Secrets and data:** credentials only in trusted server environments. Use fictional or permitted minimized observations; never add production traces to public tests.
4. **Client version:** install a documented release and read its actual types/methods. Do not assume JavaScript, Python, MCP, HTTP and Studio expose the same features.
5. **Idempotency and identity:** send proper unique keys for new writes and retain server-returned IDs/receipts. Never manufacture evaluation status, release identity or persisted state versions.
6. **Release:** separate candidate creation, evaluation, approval, release and runtime use. A semantic match or Teach proposal cannot release itself.
7. **Host authority:** the host still runs the model and external tools. Vira cannot intercept actions bypassing the integrated control boundary.
8. **Failure:** test missing credentials, wrong scope, unresolved task, unreleased behavior, unsupported host, no projection and stale TaskRun version. Governing ON paths must not secretly invoke a bypass.
9. **Observability:** record actual statuses, sanitized request IDs, selected behavior identity and child events/receipts where supported; never claim model adherence from a digest alone.
10. **Performance and risk:** use measured comparisons for latency, answer quality, cost and regressions. Do not invent numbers.

## Repository checks

From the root:

```bash
npm ci
npm ci --prefix tutorials/marketing-agent
npm run verify
```

For the pinned Next.js + published JavaScript SDK example:

```bash
npm ci --prefix examples/frameworks/node-next
npm test --prefix examples/frameworks/node-next
npm run build --prefix examples/frameworks/node-next
```

[Per-example verification matrix](example-verification.md) separates local checks from live acceptance. [Repository CI](../.github/workflows/quality.yml) additionally validates the Python framework examples, package registry versions and Agent Skills. The [TaskRun SDK tests](../examples/frameworks/node-next/test/taskrun-sdk.test.mjs) use the real published JavaScript client with an **offline test transport** to verify method availability and request shapes, not a fabricated live service run.

**Not proven by CI:** external model response quality, hosted tenant operation, a fully released Pack, or end-to-end authorization against a provisioned customer environment. Those require separate live acceptance evidence.

[Developer guide](developer-guide.md) · [Execution modes](execution-modes.md) · [Troubleshooting](troubleshooting/README.md) · [Public limitations](capability-map.md)
