# Published client packages

Vira's public client packages use the `tryvira` package identity and point back to this public repository.

| Ecosystem | Package | Current package version | Runtime | License | Install |
| --- | --- | ---: | --- | --- | --- |
| npm | `@tryvira/sdk` | `0.1.14` | Node.js 20+ | MIT | `npm install @tryvira/sdk` |
| npm | `@tryvira/mcp` | `0.1.14` | Node.js 20+ | MIT | `npx -y @tryvira/mcp` |
| PyPI | `tryvira-sdk` | `0.1.14` | Python 3.10+ | MIT | `python -m pip install tryvira-sdk` |

Package pages:

- https://www.npmjs.com/package/@tryvira/sdk
- https://www.npmjs.com/package/@tryvira/mcp
- https://pypi.org/project/tryvira-sdk/

Repository / documentation:

- https://github.com/hrpering/tryvira

## 0.1.14 public surface

The `0.1.14` client line is built around the same scoped Vira authority boundary across JavaScript/TypeScript, Python and MCP.

The public surface includes, where supported by the selected integration:

- connect-once system + adapter registration;
- observations, traces, feedback and outcomes;
- scoped capability discovery;
- Semantic Task and Behavior Point authoring;
- Behavior Programs and Strategies;
- semantic resolution and governed runtime resolution/execution;
- Teach proposal lifecycle;
- Behavior Evaluation and explicit release;
- Pack import/materialization/evaluation/approval/release and upgrade preview;
- Strategy execution and continuation;
- behavior capsule/projection and other advanced runtime surfaces.

Use [Capability discovery](capability-discovery.md) instead of assuming a credential, deployment or integration exposes every operation.

## Authority boundary

The SDKs are thin clients. They do not create a second behavior authority, execute tools locally on behalf of Vira, release behavior locally, or maintain a parallel telemetry store.

Semantic resolution returns evidence/candidates. It is not authorization. Runtime and effectful mutations remain governed by server-side scope, role, policy, release state, idempotency and receipt contracts.

## Package verification

The npm packages are prepared with package dry-run and public-surface smoke checks before publication. That package-publishing check is distinct from a Vira Pack lifecycle. A Vira Pack still follows its own governed import, validation/materialization, evaluation, approval and release flow.

## Licensing boundary

The client packages above are MIT-licensed according to their package metadata.

The hosted Vira service, application, backend, branding, and this documentation repository are governed separately. See the repository [LICENSE](../LICENSE).

## Versioning note

The documentation repository version is not required to match client package versions. Package versions describe independently published client artifacts; the docs version describes this repository's documentation set.
