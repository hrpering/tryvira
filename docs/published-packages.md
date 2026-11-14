# Published client packages

Vira's public client packages use the `tryvira` package identity and point back to this public repository. The badges in the repository README always read current registry versions; the scheduled sync keeps pinned commands and references aligned.

| Ecosystem | Package | Current package version | Runtime | License | Install |
| --- | --- | ---: | --- | --- | --- |
| npm | `@tryvira/sdk` | `0.1.44` | Node.js 20+ | MIT | `npm install @tryvira/sdk@0.1.44` |
| npm | `@tryvira/mcp` | `0.1.44` | Node.js 20+ | MIT | `npx -y @tryvira/mcp@0.1.44` |
| PyPI | `tryvira-sdk` | `0.1.44` | Python 3.10+ | MIT | `python -m pip install tryvira-sdk==0.1.44` |

Package pages:

- https://www.npmjs.com/package/@tryvira/sdk
- https://www.npmjs.com/package/@tryvira/mcp
- https://pypi.org/project/tryvira-sdk/

Repository / documentation:

- https://github.com/hrpering/tryvira

## Current published client surfaces

Package versions in the table are refreshed from npm/PyPI registry metadata by the repository sync workflow. Their available operations differ. Use each surface's reference and discover MCP tools at runtime.

The JavaScript SDK, Python SDK, and MCP package have different operation sets. The [MCP tool catalog](reference/mcp-tools.md) is refreshed from the latest published MCP package. MCP exposes its own tool set. Use the running server's scoped tool discovery to check availability.

Use [Capability discovery](capability-discovery.md) instead of assuming a credential, deployment or integration exposes every operation.

## Authority boundary

The SDKs are thin clients. They do not create a second behavior authority, execute tools locally on behalf of Vira, release behavior locally, or maintain a parallel telemetry store.

Semantic resolution returns evidence/candidates. It is not authorization. Runtime and effectful mutations remain governed by server-side scope, role, policy, release state, idempotency and receipt contracts.

## Package verification

The npm packages are prepared with package dry-run and public-surface smoke checks before publication. That package-publishing check is distinct from a Vira Pack lifecycle. A Vira Pack still follows its own governed import, validation/materialization, evaluation, approval and release flow.

## Licensing boundary

The client packages above are MIT-licensed according to their package metadata and package license files. The repository [LICENSE](../LICENSE) applies only to documentation, examples, and visual assets here. The hosted service, application, backend, and branding are governed separately.

## Versioning note

The documentation repository version is not required to match client package versions. Package versions describe independently published client artifacts; the docs version describes this repository's documentation set.
