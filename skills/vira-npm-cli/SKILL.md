---
name: vira-npm-cli
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Install, configure, upgrade, or troubleshoot the published Vira npm SDK and MCP CLI."
---

# Install Vira npm packages

Check current npm registry versions before installing; do not trust a checked-in version pin as latest. Use `@tryvira/sdk` for application code and `@tryvira/mcp` only for MCP hosting/client integration. Verify Node runtime requirements and lockfile changes. For MCP initialize then call `tools/list`; do not assume SDK methods map to MCP tools. Keep tokens in the MCP host secret store/environment, never command history or config committed to Git.

## Activate this skill when
The task is to install, upgrade, pin, or troubleshoot `@tryvira/sdk` or run/configure `@tryvira/mcp`. Do not use it for Python-only projects or behavior authoring.

## Inputs and preconditions
Inspect `package.json`, lockfile, Node version, package manager, and intended MCP host. Determine whether the work is a library install or a local MCP launch. Never request a publish token for installation.

## Workflow
1. Query the npm registry for the latest package version; treat checked-in docs and cached metadata as snapshots.
2. Check the package's Node engine and the host's module/config format.
3. Add the package with the repository's package manager and update its lockfile; do not install globally unless the user specifically needs a global CLI.
4. For MCP, configure the host using environment-variable placeholders, start the server, initialize it, and call `tools/list` before suggesting a tool.
5. Run package-manager integrity checks and a minimal import/CLI check without contacting Vira unless explicitly requested.

## Implementation details

1. Check current npm registry version, engines, installed lockfile and package exports. `@tryvira/sdk` is the server-side SDK; `@tryvira/mcp` is the MCP server, not a substitute.
2. Inspect the installed .d.ts for `startTaskRun`, `getTaskRun`, `observe`; check MCP `initialize` + `tools/list` separately. Do not claim that package installation grants Vira service access.
3. Preserve the package manager lockfile and existing Node runtime. Run focused import/build checks.
4. Test: upgrading Next.js must not switch AUTO TaskRun back to projection-to-model just to preserve an old callback.
[Published packages](https://github.com/hrpering/tryvira/blob/main/docs/published-packages.md).

## Deliverable and failure handling
Report installed version, files changed, and command output. If registry access fails, use an explicit cached/offline status and do not assert latest. Never publish or put tokens in shell history, committed config, or logs.

## References

- [published-packages.md](https://github.com/hrpering/tryvira/blob/main/docs/published-packages.md)
- [javascript-sdk.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [mcp.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp.md)
- [mcp-tools.md](https://github.com/hrpering/tryvira/blob/main/docs/reference/mcp-tools.md)
