# Support and issue reporting

This public repository supports questions and reproducible issues about Vira documentation, samples, Agent Skills and the published JavaScript, Python and MCP clients.

**Open a [GitHub Issue](https://github.com/hrpering/tryvira/issues)** for public, non-sensitive problems. Choose the documentation or bug report template when relevant.

## Include in a useful report

- Which surface: `@tryvira/sdk`, `tryvira-sdk`, `@tryvira/mcp`, Studio, or a named example.
- Exact **package version**, runtime (Node/Python), OS and relevant guide or file path.
- Expected behavior and observed behavior, including a sanitized error code and relevant request ID if available.
- A **minimal reproduction with fictional data**, steps taken, and whether the issue happens in OFF or ON mode.
- Whether you actually have a provisioned Vira account and a permitted development scope. No access is not necessarily a package bug.

If an operation is missing, consult the [capability map](docs/capability-map.md) and the installed package/MCP tool discovery first. Surface parity is not assumed.

## Keep private information out of public reports

Never paste API keys, tokens, organization or account secrets, private URLs, production traces, customer prompts, personal information, billing details or confidential deployments. Redact logs before sharing. If a report involves a security vulnerability, use [private vulnerability reporting](SECURITY.md) instead of a public issue.

Hosted product access is not generally open. The public repo cannot issue credentials or guarantee a live test account. See [Start here](docs/start-here.md) and [Troubleshooting](docs/troubleshooting/README.md).
