# Client versions in runnable examples

**Current reference versions (automatically tracked):** JavaScript `@tryvira/sdk@0.1.66`; MCP `@tryvira/mcp@0.1.55`; Python `tryvira-sdk==0.1.54`. These independently released clients are pinned by the matching example manifests and lockfiles. Use installed methods and `tools/list` before invoking an operation.

| Example | Declared version | Version policy | What CI actually proves |
| --- | --- | --- | --- |
| `examples/javascript` | JS SDK 0.1.66 | Current starter | Code syntax and offline Observe request tests with the installed release |
| `examples/python` | Python SDK 0.1.54 | Current starter | Python source + offline injected-client tests with scoped Observe event |
| `examples/mcp` | MCP 0.1.55 | Current host instructions | Configuration JSON and published version reference |
| `examples/frameworks/mcp-client` | MCP 0.1.55 | Current MCP client | stdio client syntax and external dependency install |
| `examples/semantic-runtime` | JS SDK 0.1.66 | Current *diagnostic* starter | Syntax; not a canonical ON chatbot |
| `examples/frameworks/node-next` | JS SDK 0.1.66 | **Lockfile-tested compatibility sample** | npm ci, tests and Next build on its committed lock |
| `tutorials/marketing-agent` | JS SDK 0.1.66 | **Lockfile-tested compatibility tutorial** | npm ci and safety tests on its committed lock |
| `examples/frameworks/python_fastapi` | Python SDK 0.1.54 | **Hash-locked compatibility sample** | uv sync --require-hashes and Python contract tests on its committed lock |
| `examples/frameworks/langgraph` | Python SDK 0.1.54 | **Hash-locked compatibility sample** | uv sync and Python syntax on its committed lock |

**Intentional difference:** a framework example with a committed lockfile is not silently upgraded when a new SDK is published. Its version is a tested compatibility target, not the latest recommended dependency for a new application. To migrate it, update its manifest **and regenerate the lockfile with the same package manager**; run its integration tests and build before committing. Never edit npm tarball integrity fields or Python hashes by string replacement.

The public repository's registry sync updates the current package index and public starter documentation. It must leave lockfiles, compatibility manifests and tested samples untouched. Version checks compare each committed manifest with its own lockfile and also check the current, lockless starters against `package-versions.json`.

**Evidence boundaries:** package install, syntax, tests and framework build do not prove service access, a live Pack release, true model Skill selection, or a post-model verified final answer. Use the [test trust matrix](agent-skills/test-trust-matrix.md) and [live E2E completion plan](agent-skills/e2e-completion-plan.md).
