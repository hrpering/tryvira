# Public client packages and version verification

Vira's public integration packages are independently versioned. **A version declared in the maintained source is not necessarily the latest version available in npm or PyPI.** Do not use old documentation pins as a substitute for registry checks.

Source and registry comparison: **27 November 2026**. The registry artifacts were read back after publication from main commit `3a8b85a9f719406542e23275bb4722bfabb6ccf2`: npm `@tryvira/sdk@0.1.93`, npm `@tryvira/mcp@0.1.90`, npm `@tryvira/opencode@0.1.76`, and PyPI `tryvira-sdk==0.1.75`. The published `@tryvira/mcp@0.1.90` tarball advertises **99 tools**, recorded in the versioned snapshot below. These checks establish registry artifact availability and metadata; they do not prove live hosted runtime parity or signed build provenance.

| Ecosystem | Package | Maintained source version | Last version cited by the earlier public docs | Runtime | License |
| --- | --- | ---: | ---: | --- | --- |
| npm | [`@tryvira/sdk`](https://www.npmjs.com/package/@tryvira/sdk) | `0.1.93` | `0.1.67` | Node.js 20+ | MIT |
| npm | [`@tryvira/mcp`](https://www.npmjs.com/package/@tryvira/mcp) | `0.1.90` | `0.1.60` | Node.js 20+ | MIT |
| npm | [`@tryvira/opencode`](https://www.npmjs.com/package/@tryvira/opencode) | `0.1.76` | `0.1.61` | Node.js 20+ | MIT |
| PyPI | [`tryvira-sdk`](https://pypi.org/project/tryvira-sdk/) | `0.1.75` | `0.1.54` | Python 3.10+ | MIT |

**The latest npm/PyPI releases were checked in the registry workflow**, while the table separately shows maintained source versions. A source-only bump is not evidence of an npm/PyPI release. Recheck registry availability before pinning or upgrading:

```bash
npm view @tryvira/sdk version
npm view @tryvira/mcp version
npm view @tryvira/opencode version
python -m pip index versions tryvira-sdk
```

Install the actual released version. For exploratory setup, the unpinned commands resolve the registry's current release; production and test fixtures should pin the inspected version and commit their lockfile.

```bash
npm install @tryvira/sdk
npx -y @tryvira/mcp
python -m pip install tryvira-sdk
```

For OpenCode, see its [host-specific plugin setup](../plugins/opencode/README.md); a standalone npm installation does not prove the host loaded the adapter.

## Interfaces and authority

- JavaScript SDK: `ViraClient`, connection/observation and governed lifecycle methods. Canonical verb-noun helpers such as `connectAiSystem`, `recordUserFeedback`, and `recordBusinessOutcome` coexist with older aliases in the inspected source. Use the **installed** types.
- Python SDK: independently versioned client of the same scoped HTTP authority. Confirm Python methods against the installed package; do not assume JS signature parity.
- MCP: stdio adapter for the installed SDK/service. Inspect the running MCP server's `tools/list` and the scope bound to the configured credential. The [0.1.90 published tool snapshot](reference/mcp-published-tools.json) contains **99 advertised tools**, extracted from the npm bundle. It cannot substitute for the installed server's live catalog or authority checks.
- OpenCode plugin: host adapter with `off`, `observe`, and conditional `enforce`. It is not a replacement for MCP or the SDK.

All surfaces enforce Vira's server-side role, scope, policies, evaluation and release gates. Semantic selection is not authorization; import/install is not production release; a successful network call is not a verified model answer.

## Publishing and verification

Publication and actual installation must be separately checked. npm package dry-run, public-surface smoke checks, PyPI wheel inspection and release checks are independent of Vira Pack evaluation/release. Do not upload private server code, database migrations, local credentials or customer evidence.

This public documentation set and sample projects may intentionally pin versions tested at a different time. Update their pins and the [MCP snapshot](reference/mcp-published-tools.json) **only after inspecting the matching registry artifacts**, testing the consumer and recording snapshot provenance. Do not automatically copy internal source versions into published-package claims.

The client package metadata declares MIT licensing. The [repository license](../LICENSE) applies separately to public documentation and assets; public source visibility is not an open-source license grant for the hosted service.

[Full compatibility and phased verification plan](integration-compatibility.md) · [JavaScript](reference/javascript-sdk.md) · [Python](reference/python-sdk.md) · [MCP](reference/mcp.md) · [OpenCode](../plugins/opencode/README.md)
