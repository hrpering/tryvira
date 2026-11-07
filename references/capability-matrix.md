# Public integration surface matrix

**Snapshot:** public `tryvira` docs at `main`. Read package versions from
`package-versions.json` or the package registries when needed; do not pin
versions from this reference. The installed SDK's types and MCP `tools/list`
response take precedence over this snapshot. Do not infer a published release
from a source manifest or repository branch.

Legend: **Yes** is documented as available; **Partial** means only some of the
lifecycle exists; **Not verified** means Studio access and UI behavior have not been exercised; **No** means
the current public documentation says no dedicated operation is available.

| Workflow | JavaScript SDK | Python SDK | HTTP API | MCP package | Studio | Direct source integration |
| --- | --- | --- | --- | --- | --- | --- |
| Capability discovery | Yes | Yes | Yes | Yes | Not verified | Use a published client or HTTP contract |
| Connect AI system | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Observe, trace, feedback, outcome | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Semantic Task / Behavior Point | Yes | Yes | Yes | List/create subset | Not verified | Not a supported customer surface |
| Behavior Program | Yes | Yes | Yes | Read/list subset | Not verified | Not a supported customer surface |
| Strategy authoring / validate / simulate | Yes | Yes | Yes | Read-only subset; discover installed tools | Not verified | Not a supported customer surface |
| Strategy execution | Yes | Yes | Yes | No dedicated tool in the current published catalog | Not verified | Not a supported customer surface |
| Signals | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Pack import / install / evaluate / approve / release / upgrade preview | Yes | Yes | Yes | No Pack tools | Not verified | Not a supported customer surface |
| Teach evidence / proposal | Yes | Yes | Yes | Partial: evidence and proposal creation | Not verified | Not a supported customer surface |
| Teach review / evaluate / promote | Yes | Yes | Yes | No complete transition lifecycle | Not verified | Not a supported customer surface |
| Behavior Evaluation | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Response Quality & Decision | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Release creation / deployment evidence | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Runtime resolve / execute | Yes | Yes | Yes | Partial: `resolve_runtime` | Not verified | Not a supported customer surface |
| Runtime capability attestation, model serving, projection | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |
| Receipts, traces, monitoring | Yes | Yes | Yes | No dedicated tool | Not verified | Not a supported customer surface |

## Frameworks

The public docs support integration by using the JavaScript/Python SDK or HTTP
contract inside an existing framework. Do not claim a dedicated Vira adapter
for OpenAI Agents, Vercel AI SDK, LangChain, LangGraph, Next.js, or FastAPI unless
the selected *published package* includes that adapter and its public reference
documents it. Skills should use small framework-neutral hooks and preserve the
same Vira authority boundary.

## Authority and runtime discovery

- `docs/capability-map.md` is the public surface comparison.
- `docs/reference/mcp-tools.md` is generated from the latest published MCP
  package; the installed server's `tools/list` remains the runtime truth.
- `docs/reference/javascript-sdk.md`, `docs/reference/python-sdk.md`, and
  `docs/reference/api.md` hold operation-specific contracts.
- `docs/reference/mcp.md` documents MCP configuration and authority behavior.
- Studio UI flows are unverified here; a route or documentation link alone does not prove an accessible, working, or tested UI workflow.

When a method or tool is missing from the selected public surface, switch to a
documented supported surface or explain the gap. Never synthesize a missing
operation.
