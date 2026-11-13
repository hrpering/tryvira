# Quickstart

**Pick a path that can actually work in your environment.** Vira's public clients are available, but the hosted product is not generally open. No endpoint, account key or pre-released behavior is bundled in this repository.

| Have Vira credentials? | Recommended first run |
| --- | --- |
| No | [Next.js chatbot, Vira OFF](../examples/frameworks/node-next/README.md): real model call with your own provider key |
| Yes | [JavaScript connect + observe](../examples/javascript/README.md): scoped SDK call with your own API deployment |
| Python user | [Python examples](../examples/python/README.md) |
| MCP user | [MCP setup and discovery](reference/mcp.md) |

## Pick a relatable scenario

[Cooking, customer support, writing, research, marketing, inventory, software maintenance and advanced operations](use-cases.md) are covered as progressive examples. The [brand-neutral comparison](approach-comparison.md) explains how Skills, agents and adjacent AI platform categories relate to Vira.

For single- and multi-task routing, [SINGLE / STRATEGY / COMPOUND / HYBRID / AUTO](execution-modes.md) are covered separately from the basic chatbot ON/OFF toggle.

## Not just a chatbot: two ways to start

**Observe-first:** Connect an existing agent and submit sanitized events to build evidence before changing behavior. [Observe](observe.md) · [Signals](signals.md) · [Teach](teach.md).

**Governed execution:** Author, evaluate and release eligible behavior, then submit the normal request through [AUTO TaskRun](canonical-taskrun.md) and inspect real [runtime verification](runtime-verification.md) receipts when the connected provider/verifier contract supports them.

[All product feature families](product-feature-map.md) · [Feature maturity](product-status.md).

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

Open the local URL, select **Vira OFF**, and use synthetic input. ON submits a server-owned AUTO TaskRun with separately issued credentials and eligible released tasks. It reports real admission/state **without** inventing a provider-generated verified answer. [Canonical path](canonical-taskrun.md) · [Pack academy](../examples/packs/README.md).

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
