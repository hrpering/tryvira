# Start here: your first Vira experience

There are **two honest starting points**. Choose based on whether you have a provisioned Vira account. Public npm/PyPI packages do not themselves grant access to the hosted Vira service.

## Path A: Explore today without Vira access

The [Next.js + OpenAI Agents example](../examples/frameworks/node-next/README.md) has a functioning **Vira OFF** mode that uses your own OpenAI API key. You can inspect how the ON path is integrated, but you cannot verify a governed ON response without a provisioned Vira endpoint and released behavior.

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

**What you can observe:** the model's ordinary response, not a Vira-managed result. Do not interpret this OFF output as proof of how the ON version would behave.

## Path B: Integrate with a provisioned Vira account

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
5. **Resolve runtime behavior** and inspect request identity/receipt or trace: [Runtime](runtime.md), [Traces](traces.md).

After an eligible release exists, follow the [chatbot's ON setup](../examples/frameworks/node-next/README.md). The ON path is designed to stop before model invocation when Vira does not return an active eligible projection. It is not an automatic fallback to ungoverned behavior.

## Choose an integration

| You use | Best next step |
| --- | --- |
| Node.js / TypeScript | [JS examples](../examples/javascript/README.md) or [Next.js demo](../examples/frameworks/node-next/README.md) |
| Python / FastAPI / LangGraph | [Python examples](../examples/python/README.md) or [Frameworks](../examples/frameworks/README.md) |
| An MCP-capable host | [MCP configuration](reference/mcp.md) and live `tools/list` |
| A coding agent | [Vira Agent Skills](../skills/README.md) |
| A longer evaluated workflow | [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) |

## What counts as a successful test?

A successful local build is **not** a live product test. Record the exact client version, configuration surface, request IDs (redacted where necessary), selected behavior identity, result, and any denial or missing capability. Compare identical synthetic prompts for OFF and ON. Do not invent scores or traces. Review security before allowing external effects.

[Developer guide](developer-guide.md) · [Capabilities](capability-map.md) · [Troubleshooting](troubleshooting/README.md)
