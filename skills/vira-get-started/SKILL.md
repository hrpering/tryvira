---
name: vira-get-started
license: "Proprietary; see LICENSE"
description: "Get a Vira integration started in an existing project by checking its stack and supported surfaces."
---

# Get Started

Inspect the project language/runtime and the user goal. Compare JS, Python, HTTP, and MCP in the shared matrix. Confirm current package versions from registries/package-version metadata rather than stale pins. Set environment-variable placeholders, check scoped capabilities, and implement the smallest documented read-only path first. Do not access production credentials or claim Studio availability without verification.

## Activate this skill when
A developer is new to Vira or asks which integration surface/package fits an existing project. Do not use it for a narrowly scoped error or a known lifecycle operation; route those to the matching specialist.

## Inputs and preconditions
Inspect the repository language, runtime, package manager, server/client boundary, AI call site, and existing configuration. Ask for missing organization/project/environment scope only when an operation needs it. Use placeholders; never read production credentials.

## Workflow
1. Read the shared capability matrix and current package metadata. Identify the user's desired behavior and whether they need SDK, HTTP, or MCP.
2. Compare required operations against each surface; state missing MCP/Studio capabilities instead of promising parity.
3. Recommend one smallest path and the exact next public guide. Start with a read-only capability/connection check where the selected contract supports it.
4. Implement only after the user asks for code changes; keep secrets server-side and preserve the host app's conventions.
5. Run local checks and report changed files, package version source, scope assumptions, and any unverified live step.

## Deliverable and failure handling
Return a surface recommendation with tradeoffs, prerequisites, first verification, and unresolved inputs. Stop if scope is unknown, the selected operation is undocumented, or access is closed; do not invent identifiers or claim connectivity.

## References

- [quickstart.md](https://github.com/hrpering/tryvira/blob/main/docs/quickstart.md)
- [capability-discovery.md](https://github.com/hrpering/tryvira/blob/main/docs/capability-discovery.md)
- [capability-matrix.md](https://github.com/hrpering/tryvira/blob/main/references/capability-matrix.md)
- [auth-and-scope.md](https://github.com/hrpering/tryvira/blob/main/docs/auth-and-scope.md)
