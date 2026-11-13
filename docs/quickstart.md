# Quickstart

**Pick a path that can actually work in your environment.** Vira's public clients are available, but the hosted product is not generally open. No endpoint, account key or pre-released behavior is bundled in this repository.

| Have Vira credentials? | Recommended first run |
| --- | --- |
| No | [Next.js chatbot, Vira OFF](../examples/frameworks/node-next/README.md): real model call with your own provider key |
| Yes | [JavaScript connect + observe](../examples/javascript/README.md): scoped SDK call with your own API deployment |
| Python user | [Python examples](../examples/python/README.md) |
| MCP user | [MCP setup and discovery](reference/mcp.md) |

## First run without Vira access

Use Node.js 22.6+:

```bash
git clone https://github.com/hrpering/tryvira.git
cd tryvira/examples/frameworks/node-next
npm ci
cp .env.example .env.local
# Fill OPENAI_API_KEY in .env.local
npm run dev
```

Open the local URL, select **Vira OFF**, and use synthetic input. The ON workflow requires separately issued Vira credentials and an eligible released Behavior Point. The example does **not** simulate an ON success when Vira is unavailable.

## First SDK connection (provisioned customers)

```bash
cd examples/javascript
npm install
# Export VIRA_API_URL, VIRA_API_KEY and your
# VIRA_ORGANIZATION_ID / VIRA_PROJECT_ID / VIRA_ENVIRONMENT_ID
node connect-observe.mjs
```

This issues a real connection and sanitized observation to the customer's configured deployment. Do not run it against production without authorization. [Read the code](../examples/javascript/connect-observe.mjs) and [environment requirements](../examples/javascript/README.md).

**Next:** [Start here](start-here.md) · [Developer guide](developer-guide.md) · [Capabilities](capability-map.md) · [Teach AI](teach.md)
