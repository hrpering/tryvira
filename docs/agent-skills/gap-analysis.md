# Agent Skills coverage and remaining gaps

The 27 public Vira Skills were reviewed against customer-facing package and product references, examples, and workflow requirements. They specialize individual tasks; `vira-full-lifecycle` routes end-to-end work across them, while `vira-chatbot` helps a user run the public OFF/ON demo. The repository maps customer goals to Skills while leaving exact signatures and data shapes to the matching published package documentation.

Customer-facing examples use published clients and operator-provided Vira endpoints: the [Marketing Agent lifecycle](../../tutorials/marketing-agent/README.md), [Next.js chatbot](../../examples/frameworks/node-next/README.md), [FastAPI/Python](../../examples/frameworks/python_fastapi/README.md), [LangGraph](../../examples/frameworks/langgraph/README.md), and [MCP client](../../examples/frameworks/mcp-client/README.md). Examples use synthetic content and do not contain credentials or customer data.

## Repaired documentation and routing problems

The production source audit found projection-centric normal-chat instructions in several old Skills, incorrect Python TaskRun availability claims, generic metadata and stale TaskRun demo descriptions. All 24 original Skills were updated, three targeted specialists added, and short/detailed user drills + failure cases incorporated. The new [per-Skill audit](production-contract-audit.md) lists the specific root causes and replacement contract anchors.

The public Next.js ON example still cannot prove an actual provider-generated and post-model verified output. It only returns AUTO TaskRun status, correctly labeled. Private prod acceptance and source contracts are not equivalent to customer-ready hosted access.

## Remaining product and evidence gaps

1. **Surface coverage differs:** the JavaScript SDK, Python SDK, HTTP API, and MCP do not provide identical workflows. Read the installed package documentation and use the live MCP tool list before attempting an operation.
2. **Studio UI is unverified:** product access is not generally open; no authenticated UI workflow was tested.
3. **No live tenant was used:** no Vira API/provider, approval, release, runtime, Teach, rollback, trace, or ON/OFF comparison was executed during this documentation work. Source review and builds are not live integration proof.
4. **Agent success rates are unmeasured:** trigger and workflow corpora are evaluation inputs, not a complete model-run benchmark. No success percentage is claimed.
5. **Marketplace publication is separate:** GitHub source is public, but no Skills marketplace listing or separate archive release is claimed.
6. **Customer validation remains necessary:** examples that require Vira must be run by an authorized operator with their own account, isolated development scope when available, and required provider configuration.

## Removed non-customer verification

Loopback/fake Vira servers and stub-only framework examples were removed. They could not prove service behavior and risked being mistaken for customer examples. Repository checks now focus on static safety, package configuration, builds, and syntax; none claims to be a live Vira test.
