<p align="center">
  <strong>Vira</strong>
</p>

<h1 align="center">Behavior control for AI systems</h1>

<p align="center">
  Move from prompt patching to governed behavior: observe, teach, evaluate, release, resolve, and trace how AI systems behave.
</p>

<p align="center">
  <img alt="Apache 2.0" src="https://img.shields.io/badge/License-Apache--2.0-2563EB">
  <img alt="Node 20+" src="https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=node.js&logoColor=white">
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-%E2%89%A53.10-3776AB?logo=python&logoColor=white">
  <img alt="MCP" src="https://img.shields.io/badge/MCP-supported-7C3AED">
  <img alt="SDKs" src="https://img.shields.io/badge/SDK-JavaScript%20%7C%20Python-111827">
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="docs/README.md">Docs</a> ·
  <a href="#how-vira-works">How it works</a> ·
  <a href="docs/troubleshooting/README.md">Troubleshooting</a> ·
  <a href="docs/ai-prompts/README.md">AI prompts</a> ·
  <a href="docs/reference/javascript-sdk.md">JavaScript SDK</a> ·
  <a href="docs/reference/python-sdk.md">Python SDK</a> ·
  <a href="docs/reference/mcp.md">MCP</a> ·
  <a href="tutorials/marketing-agent/README.md">Tutorial</a>
</p>

<p align="center">
  <img src="assets/vira-overview.svg" alt="Vira behavior control lifecycle: observe, teach, evaluate, approve, release, runtime, trace, and new evidence" width="100%">
</p>

---

## What Vira is

Vira is a behavior-control layer for AI systems.

Instead of solving every repeated AI mistake by adding one more hidden prompt, Vira gives teams a governed lifecycle for behavior:

- **observe** what happened,
- **identify** the task and behavior point,
- **teach** from evidence,
- **evaluate** proposed behavior,
- **approve and release** what should run,
- **resolve at runtime** what behavior applies,
- **trace** what was selected and applied.

That makes Vira useful for product teams, agent builders, and platform teams that need AI systems to be more consistent, auditable, and easier to improve.

---

## Why this matters

| Without Vira | With Vira |
| --- | --- |
| Corrections live in scattered prompts | Corrections become governed behavior |
| Teams cannot tell what changed | Behavior changes move through a visible lifecycle |
| Semantic intent and runtime behavior blur together | Semantic routing, behavior release, and runtime resolution stay distinct |
| Debugging becomes prompt archaeology | Debugging follows trace, lifecycle, and release state |
| AI improvements are hard to operationalize | AI proposals can be evaluated before they are released |

---

## The control loop

Vira separates **learning about behavior** from **activating behavior**. Evidence can create a proposal, but a proposal does not silently become production behavior. Evaluation, approval, release, and runtime resolution remain visible stages.

> **AI can propose. Released behavior remains explicit.**

---

## How Vira works

### Request → behavior → runtime

![Vira request path from user input through Semantic Task, Behavior Point, Behavior Program or Strategy, runtime, and trace](assets/vira-request-path.svg)

Semantic routing identifies the kind of work. A Behavior Point is the stable place where governed behavior can attach. Runtime only resolves behavior that is eligible for the request and environment.

### Integrate through the surface that fits your stack

![Vira integration surfaces for JavaScript SDK, Python SDK, HTTP API, and MCP](assets/vira-integrations.svg)

The SDKs, HTTP API, and MCP are integration surfaces around the same behavior-control model. They are not separate behavior systems.

---

## What Vira controls

| Layer | What it answers | Example |
| --- | --- | --- |
| **Semantic Task** | What kind of work is this? | `marketing.launch_plan` |
| **Behavior Point** | Where should governed behavior attach? | `marketing.launch_plan` |
| **Signals** | What typed evidence matters? | `quality.missing_measurement` |
| **Behavior Program** | What should be guarded, judged, transformed, verified, or escalated? | full-funnel requirement |
| **Strategy** | How should a bounded multi-step task proceed? | draft → verify → compose |
| **Evaluation** | Did the candidate pass the required checks? | full funnel + measurement |
| **Release** | Which approved behavior is eligible for runtime? | released revision |
| **Runtime** | What governed behavior applies now? | resolved Behavior Point |
| **Trace** | What was selected and applied? | task + behavior + result |

---

## Quickstart

### JavaScript / TypeScript

```bash
npm install @vira/sdk
```

```ts
import { ViraClient } from "@vira/sdk";

const vira = new ViraClient({
  baseUrl: process.env.VIRA_API_URL!,
  apiKey: process.env.VIRA_API_KEY,
});

const connected = await vira.connectOnce({
  name: "marketing-agent",
  systemType: "custom-agent",
  organizationId: process.env.VIRA_ORGANIZATION_ID!,
  projectId: process.env.VIRA_PROJECT_ID!,
  environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:marketing-agent:v1",
});

const semantic = await vira.resolveSemantic({
  input: "Build a launch plan for a membership product",
  profile: { domain: "marketing" },
});

const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId: process.env.VIRA_ORGANIZATION_ID!,
    projectId: process.env.VIRA_PROJECT_ID!,
    environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  },
  idempotencyKey: crypto.randomUUID(),
});
```

**Reference:** [JavaScript SDK](docs/reference/javascript-sdk.md)  
**AI setup prompt:** [JavaScript setup](docs/ai-prompts/setup-javascript-sdk.md)

### Python

```bash
python -m pip install vira-sdk
```

```python
import os
from vira import ViraClient

scope = {
    "organizationId": os.environ["VIRA_ORGANIZATION_ID"],
    "projectId": os.environ["VIRA_PROJECT_ID"],
    "environmentId": os.environ["VIRA_ENVIRONMENT_ID"],
}

with ViraClient(
    os.environ["VIRA_API_URL"],
    api_key=os.environ.get("VIRA_API_KEY"),
) as client:
    connected = client.connect_once(
        "marketing-agent",
        "custom-agent",
        scope,
        "custom-python",
        "1",
        idempotency_key="connect:marketing-agent:v1",
    )
```

**Reference:** [Python SDK](docs/reference/python-sdk.md)  
**AI setup prompt:** [Python setup](docs/ai-prompts/setup-python-sdk.md)

### MCP

```bash
npx -y @vira/mcp
```

```json
{
  "mcpServers": {
    "vira": {
      "command": "npx",
      "args": ["-y", "@vira/mcp"],
      "env": {
        "VIRA_API_URL": "https://api.example.com",
        "VIRA_API_KEY": "<api-key>",
        "VIRA_MCP_AUTH_TOKEN": "<mcp-auth-token>",
        "VIRA_MCP_AUTHORITY_URL": "https://api.example.com/v1/mcp/authorize",
        "VIRA_ORGANIZATION_ID": "<organization>",
        "VIRA_PROJECT_ID": "<project>",
        "VIRA_ENVIRONMENT_ID": "<environment>"
      }
    }
  }
}
```

**Reference:** [MCP setup](docs/reference/mcp.md) · [MCP tools](docs/reference/mcp-tools.md)  
**AI setup prompt:** [MCP setup](docs/ai-prompts/setup-mcp.md)

### Direct HTTP API

If you are integrating Vira without an SDK, use the [HTTP API reference](docs/reference/api.md) and the [HTTP API AI setup prompt](docs/ai-prompts/setup-http-api.md).

---

## Choose your path

| I want to… | Start here |
| --- | --- |
| Understand Vira in 5 minutes | [What is Vira?](docs/what-is-vira.md) |
| Understand the end-to-end lifecycle | [How Vira works](docs/how-vira-works.md) |
| Connect an existing agent | [Connect an AI system](docs/guides/connect-an-ai-system.md) |
| Create a Behavior Point | [Behavior Points](docs/behavior-points.md) |
| Create and review Signals | [Signals](docs/signals.md) |
| Route requests semantically | [Semantic routing](docs/semantic-routing.md) |
| Author behavior | [Behavior Programs](docs/behavior-programs.md) |
| Build multi-step behavior | [Strategies](docs/strategies.md) |
| Learn from evidence | [Teach](docs/teach.md) |
| Evaluate and release | [Evaluation](docs/evaluation-and-approval.md) · [Release](docs/release.md) |
| Debug a broken integration | [Troubleshooting center](docs/troubleshooting/README.md) |
| Use AI to help install or debug Vira | [AI Prompt Library](docs/ai-prompts/README.md) |
| Follow one complete example | [Marketing Agent tutorial](tutorials/marketing-agent/README.md) |

---

## Example use cases

![Vira use cases across marketing, support, research, and operations](assets/vira-use-cases.svg)

| Domain | Example task | What Vira helps control |
| --- | --- | --- |
| **Marketing** | Launch plan generation | full-funnel coverage, measurement checks, approval flow |
| **Support** | Billing response agent | escalation rules, runtime guidance, traceability |
| **Research** | Brief or synthesis workflow | sourced claims, review checkpoints, structured output |
| **Operations** | Tool-using internal assistant | task routing, controlled actions, release-based behavior |

---

## A public trace stays simple

```text
Request          Build a launch plan for a membership product
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Behavior         full_funnel_launch_planning
Applied          yes
Result           completed
```

For documentation and demos, keep traces compact and safe. Never include credentials, personal data, customer data, or confidential information in public material.

---

## Repository map

```text
.
├── README.md
├── assets/              # public diagrams + social preview
├── docs/
│   ├── guides/
│   ├── reference/
│   ├── troubleshooting/
│   ├── ai-prompts/
│   ├── behavior-*.md
│   ├── signals.md
│   ├── semantic-routing.md
│   ├── teach.md
│   ├── strategies.md
│   ├── runtime.md
│   └── traces.md
├── examples/
│   ├── javascript/
│   ├── python/
│   ├── mcp/
│   ├── packs/
│   ├── semantic-runtime/
│   └── strategy/
├── tutorials/
│   └── marketing-agent/
└── .github/
    ├── workflows/
    └── ISSUE_TEMPLATE/
```

---

## What this public repository includes

This repository contains:

- product positioning and concept docs;
- JavaScript / TypeScript and Python SDK references;
- MCP setup and tool catalog;
- HTTP API route reference;
- Behavior Point, Signal, Program, Strategy, Teach, Evaluation, Release, Runtime, and Trace documentation;
- troubleshooting guides;
- AI-assisted setup and debugging prompts;
- examples and tutorials.

Service implementation and hosted operations are maintained separately from this documentation repository.

---

## Security

Never put API keys, MCP tokens, personal data, confidential information, or production traces in public issues or examples.

Read [SECURITY.md](SECURITY.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

The contents of this public repository are licensed under the [Apache License 2.0](LICENSE), unless a file states otherwise.
