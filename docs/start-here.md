# Start here: your first Vira experience

Choose how you want to explore Vira: run a public example locally, or connect an existing AI application through a provisioned Vira workspace. The SDKs and examples are public; live service access is separate.

## Start with a familiar task

Start with [ordinary recipes, support and writing cases](use-cases.md) before trying analytics or multi-stage agent workflows. Each example includes a prompt and a specific failure to watch for. Live governed execution requires a provisioned Vira environment.

[What differs from a Skill or an agent?](approach-comparison.md) · [Five mode choices](execution-modes.md)

## How the feature families fit together

For a real account, start by instrumenting an agent with [Observe](observe.md). Use [Signals](signals.md) to review and map the typed evidence you actually need; [Teach](teach.md) can propose corrections. Then move through [Pack authoring](pack-authoring-guide.md), [evaluation/release](evaluation-and-approval.md) and [AUTO TaskRun](canonical-taskrun.md). [Runtime verification](runtime-verification.md) explains which real output checks and receipts are needed before describing a response as verified.

The [full feature map](product-feature-map.md) covers the rest of Vira, including Studio/Admin, billing, privacy, observability, optimization, tools and experimental infrastructure. [Product availability](product-status.md) describes access requirements and integration status.

## Option 1: Try the local example

The [Next.js + OpenAI Agents example](../examples/frameworks/node-next/README.md) has a functioning **Vira OFF** mode that uses your own OpenAI API key. Its ON path submits a scoped AUTO TaskRun and displays real admission/state; its final verified chatbot response integration is not yet available in this sample. [Canonical path](canonical-taskrun.md).

**Requirements:** Git, Node.js 22.6+, a model-provider key, and a local development machine.

```bash
git clone https://github.com/hrpering/tryvira.git
cd tryvira/examples/frameworks/node-next
npm ci
cp .env.example .env.local
```

Edit `.env.local` and set `OPENAI_API_KEY`. Keep this file private. Start the app:

```bash
npm run dev
```

Open the local address printed by Next.js. Choose **Vira OFF** and submit a synthetic question, for example:

> Compare two campaigns with ROAS 3.2 and 2.8. One report uses a 7-day click window and the other uses 30-day click plus 1-day view. Which is better?

**What you can observe:** the model's ordinary response without Vira behavior applied. The governed ON response is a separate, provisioned integration.

## Option 2: Connect a Vira workspace

**Requirements:** the customer-provided Vira API URL (not the Studio URL), a server-side API key with permissions for an isolated non-production scope, and organization/project/environment identifiers.

Start with a minimal scoped connection and a sanitized observation:

```bash
cd examples/javascript
npm install
# Set VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
# VIRA_PROJECT_ID and VIRA_ENVIRONMENT_ID in your shell
node connect-observe.mjs
```

Use the values **issued for your own account**, not a guessed URL or an example host. The script uses the published JavaScript SDK; inspect its [source](../examples/javascript/connect-observe.mjs) and [README](../examples/javascript/README.md) before running any effectful request.

Then follow the stages individually:

1. **Discover** supported client operations and scoped capabilities: [JavaScript reference](reference/javascript-sdk.md), [Capability discovery](capability-discovery.md).
2. **Define** a Semantic Task and Behavior Point: [Canonical authoring](canonical-authoring.md), [Packs](packs.md).
3. **Evaluate and review** a candidate; an imported Pack or Teach suggestion does not grant release: [Evaluation](evaluation-and-approval.md).
4. **Approve and release** only the intended identity with the customer's authority: [Release](release.md).
5. **Submit a request through AUTO TaskRun** (not direct behavior-projection) and inspect persisted state and child receipts: [Canonical TaskRun](canonical-taskrun.md), [Traces](traces.md).
6. **Require verified provider output** before showing a governed final answer. The current public TaskRun SDK does not by itself expose the complete last-mile verification handoff.

After an eligible release exists, follow the [chatbot's ON setup](../examples/frameworks/node-next/README.md). This sample submits an AUTO TaskRun and reports admission/status. Final verified chatbot output is a separate integration requirement.

## Learn to make a Pack

[Pack authoring guide](pack-authoring-guide.md) explains what belongs in every file. [Three source Packs](../examples/packs/README.md) progress from a cooking preference to retail-media and real structured Strategy execution. A valid archive is not an approved release.

## Want to try different execution modes?

Use [the mode reference](execution-modes.md) before selecting SINGLE, STRATEGY, COMPOUND, HYBRID or AUTO. With provisioned access, the [JavaScript tester](../examples/javascript/taskrun-modes.mjs) checks routing **without admitting a run by default**. Start an execution only in an authorized non-production environment with eligible released resources. An unsuccessful route can be the correct result.

## Choose an integration

| You use | Best next step |
| --- | --- |
| Node.js / TypeScript | [JS examples](../examples/javascript/README.md) or [Next.js demo](../examples/frameworks/node-next/README.md) |
| Python / FastAPI / LangGraph | [Python examples](../examples/python/README.md) or [Frameworks](../examples/frameworks/README.md) |
| An MCP-capable host | [MCP configuration](reference/mcp.md) and live `tools/list` |
| A coding agent | [Vira Agent Skills](../skills/README.md) |
| A longer evaluated workflow | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) |

## Evaluate your integration

For a live acceptance test, record the client version, deployment, scope, redacted request IDs, selected behavior and actual result. Use the same model and input settings for OFF/ON comparisons, including failure cases and any unavailable capability. Review authorization before enabling external effects.

[Developer guide](developer-guide.md) · [Capabilities](capability-map.md) · [Troubleshooting](troubleshooting/README.md)
