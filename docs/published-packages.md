# Published client packages

Vira's public client packages use the `tryvira` package identity and point back to this public repository.

| Ecosystem | Package | Current package version | License | Install |
| --- | --- | ---: | --- | --- |
| npm | `@tryvira/sdk` | `0.1.6` | MIT | `npm install @tryvira/sdk` |
| npm | `@tryvira/mcp` | `0.1.6` | MIT | `npx -y @tryvira/mcp` |
| PyPI | `tryvira-sdk` | `0.1.6` | MIT | `python -m pip install tryvira-sdk` |

Package pages:

- https://www.npmjs.com/package/@tryvira/sdk
- https://www.npmjs.com/package/@tryvira/mcp
- https://pypi.org/project/tryvira-sdk/

Repository / documentation:

- https://github.com/hrpering/tryvira

## 0.1.6 public surface highlights

The `0.1.6` client line includes the newer public authoring/lifecycle work documented in this repository, including canonical Task/Point authoring, Strategy activation, Teach proposal lifecycle parity, and scoped capability discovery where supported by each client surface.

Use [Capability discovery](capability-discovery.md) instead of assuming a package exposes every operation in every deployment/scope.

## Licensing boundary

The client packages above are MIT-licensed according to their package metadata.

The hosted Vira service, application, backend, branding, and this documentation repository are governed separately. See the repository [LICENSE](../LICENSE).

## Versioning note

The documentation repository version is not required to match client package versions. Package versions describe independently published client artifacts; the docs version describes this repository's documentation set.
