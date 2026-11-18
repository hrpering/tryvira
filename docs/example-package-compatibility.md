# Client versions in runnable examples

**Current reference versions (automatically tracked):** JavaScript `@tryvira/sdk@0.1.67`; MCP `@tryvira/mcp@0.1.60`; Python `tryvira-sdk==0.1.54`. These independently released clients are pinned by the matching example manifests and lockfiles. Use installed methods and `tools/list` before invoking an operation.

| Example | Declared version | Version policy | What CI actually proves |
| --- | --- | --- | --- |
| `examples/javascript` | JS SDK 0.1.67 | Current starter | Code syntax and offline Observe request tests with the installed release |
| `examples/python` | Python SDK 0.1.54 | Current starter | Python source + offline injected-client tests with scoped Observe event |
| `examples/mcp` | MCP 0.1.60 | Current host instructions | Configuration JSON and published version reference |
| `examples/frameworks/mcp-client` | MCP 0.1.60 | Current MCP client | stdio client syntax and external dependency install |
| `examples/semantic-runtime` | JS SDK 0.1.67 | Current *diagnostic* starter | Syntax; not a canonical ON chatbot |
| `examples/frameworks/node-next` | JS SDK 0.1.67 | **Current SDK, hash-verified lock** | npm ci, tests and Next build on its committed lock |
| `tutorials/marketing-agent` | JS SDK 0.1.67 | **Current SDK, integrity-verified lock** | npm ci and safety tests on its committed lock |
| `examples/frameworks/python_fastapi` | Python SDK 0.1.54 | **Current SDK, hash-verified lock** | uv sync --require-hashes and Python contract tests on its committed lock |
| `examples/frameworks/langgraph` | Python SDK 0.1.54 | **Current SDK, hash-verified lock** | uv sync and Python syntax on its committed lock |

**Current state:** all runnable Vira examples use the registry-confirmed newest SDK/PyPI version. Frameworks retain committed npm/Python lockfiles, **regenerated from registries rather than string-edited**. Future version changes must update all Vira manifests **and regenerate locks** before review; do not change unrelated provider dependencies. Never edit npm tarball integrity fields or Python hashes by string replacement.

The public repository's registry sync now updates the package index, all Vira example manifests and a source-generated MCP tool snapshot, regenerates npm/Python dependency locks, verifies them and opens a reviewable PR rather than silently pushing to main. Version checks compare each committed manifest with its own lockfile and also check the current, lockless starters against `package-versions.json`.

**Evidence boundaries:** package install, syntax, tests and framework build do not prove service access, a live Pack release, true model Skill selection, or a post-model verified final answer. Use the [test trust matrix](agent-skills/test-trust-matrix.md) and [live E2E completion plan](agent-skills/e2e-completion-plan.md).
