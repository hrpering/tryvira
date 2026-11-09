# Agent Skills coverage and remaining gaps

## Coverage reviewed

The 22 public Vira skills were individually reviewed against the published SDK method inventory, HTTP reference, MCP catalog, capability matrix, and current customer examples. The skills are specialists; `vira-full-lifecycle` routes the end-to-end work across them. The published SDK method inventory maps every verified JavaScript and Python SDK method to a skill. MCP remains a narrower interface, and the Studio UI remains unverified.

Customer-facing examples use real published clients and operator-provided Vira/API endpoints: the [Marketing Agent lifecycle](../../tutorials/marketing-agent/README.md), [Next.js/OpenAI Agents and Vercel AI SDK](../../examples/frameworks/node-next/README.md), [FastAPI/Python](../../examples/frameworks/python_fastapi/README.md), [LangGraph](../../examples/frameworks/langgraph/README.md), [MCP client](../../examples/frameworks/mcp-client/README.md), and [approved Teach-to-Pack Revision](../../examples/frameworks/node-next/REVISION-WORKFLOW.md). The examples use synthetic content in isolated non-production scopes; they do not contain API credentials or customer data.

## Remaining product and evidence gaps

1. **MCP is partial:** the published package has 11 tools and does not expose connection, Pack lifecycle, Behavior Evaluation, Strategy execution, Response Quality & Decision, release creation, or Teach proposal transitions. The skills route these operations to a supported SDK/HTTP surface instead of claiming parity.
2. **Studio UI is unverified:** product access is not open yet; no authenticated UI workflow was tested.
3. **No live tenant was available:** no API/provider, approval, release, runtime, Teach, rollback, trace, or OFF/ON comparison was executed during this work. Source review and builds are not live integration proof.
4. **Agent success rates are unmeasured:** trigger and workflow corpora are structural/evaluation inputs, not a complete model-run benchmark. No success percentage is claimed.
5. **Marketplace publication is separate:** GitHub source is public, but no skills.sh listing or separate `.skill` archive release is claimed.
6. **Customer validation is still required:** each real example needs to be run by an authorized operator against the account's isolated non-production API and configured provider before claiming a successful Vira integration.

## Removed non-customer verification

The earlier public tree included loopback/fake Vira test servers and stub-only framework examples. They were useful for checking request construction without tenant access, but they could not prove service behavior and risked being mistaken for runnable customer examples. They have been removed. CI now performs static/contract checks, package checks, builds, and syntax checks only; a build or guard check is never described as a live Vira test.
