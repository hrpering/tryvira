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
  <img alt="MCP" src="https://img.shields.io/badge/MCP-supported-0F766E">
  <img alt="SDKs" src="https://img.shields.io/badge/SDK-JavaScript%20%7C%20Python-111827">
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="docs/README.md">Docs</a> ·
  <a href="#how-vira-works">How it works</a> ·
  <a href="#accelerator-vision">Accelerator vision</a> ·
  <a href="docs/troubleshooting/README.md">Troubleshooting</a> ·
  <a href="docs/ai-prompts/README.md">AI prompts</a> ·
  <a href="tutorials/marketing-agent/README.md">Tutorial</a>
</p>

<p align="center">
  <img src="assets/vira-overview.svg" alt="Vira behavior control lifecycle: observe, teach, evaluate, approve, release, runtime, trace, and new evidence" width="100%">
</p>

---

## What Vira is

Vira is a behavior-control layer for AI systems.

Instead of solving every repeated AI mistake by adding one more hidden prompt, Vira gives teams a governed lifecycle for behavior:

- **observe** what happened;
- **identify** the task and Behavior Point;
- **teach** from evidence;
- **evaluate** proposed behavior;
- **approve and release** what should run;
- **resolve at runtime** what behavior applies;
- **trace** what was selected and applied.

Vira is for product teams, agent builders, and platform teams that need AI behavior to be more consistent, reviewable, testable, and easier to improve.

---

## Why this matters

| Without Vira | With Vira |
| --- | --- |
| Corrections live in scattered prompts | Corrections become governed behavior |
| Teams cannot tell what changed | Behavior changes move through a visible lifecycle |
| Semantic intent and runtime behavior blur together | Routing, behavior, release, and runtime stay distinct |
| Debugging becomes prompt archaeology | Debugging follows trace, lifecycle, and release state |
| AI improvements are hard to operationalize | Candidates can be evaluated before release |
| A behavior layer may accidentally become a second chatbot | `behavior_plan` lets Vira guide the downstream model without duplicating the final answer |

---

## The control loop

Vira separates **learning about behavior** from **activating behavior**. Evidence can create a proposal, but a proposal does not silently become production behavior.

> **AI can propose. Released behavior remains explicit.**

---

## How Vira works

### Request → behavior → runtime

![Vira request path from user input through Semantic Task, Behavior Point, Behavior Program or Strategy, runtime, and trace](assets/vira-request-path.svg)

Semantic routing identifies the kind of work. A Behavior Point is the stable place where governed behavior can attach. Runtime resolves behavior that is released and eligible for the request.

### Strategy can own the answer or guide the answer

Current Strategy design supports two result contracts:

```text
response
Vira Strategy → final answer
```

```text
behavior_plan
Vira Strategy → compact behavior plan → downstream chatbot/model → final answer
```

For an existing chatbot or agent, `behavior_plan` is usually the cleaner architecture because Vira can control intent, constraints, preferences, response shape, safety checks, and verification without writing a second full answer first.

See [Strategy result modes](docs/strategy-result-modes.md).

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
| **Strategy** | How should a bounded task proceed, and who owns final output? | `behavior_plan` or `response` |
| **Evaluation** | Did the candidate pass required checks? | funnel + measurement + preference cases |
| **Release** | Which approved behavior is eligible for runtime? | released revision |
| **Runtime** | What governed behavior applies now? | resolved Behavior Point |
| **Trace** | What was selected and applied? | task + behavior + result |

---

## Authoring quality matters

A syntactically valid object can still be conceptually weak.

Vira’s public authoring guidance distinguishes between:

```text
marketing.help
```

and a bounded task such as:

```text
marketing.launch_plan
```

It also distinguishes subjective rules such as:

```text
Make the answer high quality.
```

from observable behavior such as:

```text
Cover every required funnel stage and give each stage a measurable objective.
```

See [Authoring quality](docs/authoring-quality.md) and the [weak vs production-quality examples](examples/authoring-quality/).

### User preferences stay user-owned

Preferences such as audience, geography, budget, channels, tone, timeframe, or KPI should not become hard-coded Strategy constants by accident.

A good behavior design derives them from explicit or confirmed user state, preserves unchanged values, replaces changed values, stops using removed values, and does not invent missing ones.

---

## Accelerator vision

> **Experimental architecture. Not general production availability.**

![Vira GPU acceleration vision](assets/vira-gpu-vision.svg)

Vira is exploring a runtime path that moves released behavior execution closer to model inference, including same-device GPU execution when that path is accepted.

The goal is not “put everything on GPU.” The goal is to reduce unnecessary runtime boundaries while preserving behavior semantics and traceability:

```text
request
→ semantic selection
→ released behavior
→ bounded behavior execution
→ model inference
→ verification / trace
```

The accelerator direction is provider-neutral and can target common CUDA serving patterns such as PyTorch CUDA, vLLM, TensorRT-LLM, and Triton-style runtimes.

CPU/conventional runtime remains first-class for compatibility, development, smaller deployments, parity comparison, and safe fallback where explicitly authorized.

Promotion is intentionally staged:

```text
OFF → SHADOW → CANARY → LIMITED → GENERAL
```

GPU execution must preserve the same governed task, released behavior, Strategy semantics, and explicit fallback policy before promotion.

Experimental CUDA work exists, but this public repository does **not** claim the accelerator path is generally production-ready today.

Read the full [GPU acceleration vision](docs/gpu-acceleration-vision.md) and [GPU FAQ](docs/gpu-acceleration-faq.md).

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

### MCP

```bash
npx -y @vira/mcp
```

See [MCP setup](docs/reference/mcp.md) and the [MCP tool catalog](docs/reference/mcp-tools.md).

### Direct HTTP API

Use the [HTTP API reference](docs/reference/api.md) and [HTTP API AI setup prompt](docs/ai-prompts/setup-http-api.md).

---

## Choose your path

| I want to… | Start here |
| --- | --- |
| Understand Vira in 5 minutes | [What is Vira?](docs/what-is-vira.md) |
| Understand the end-to-end lifecycle | [How Vira works](docs/how-vira-works.md) |
| Learn authoring quality | [Authoring quality](docs/authoring-quality.md) |
| Understand Strategy result modes | [Strategy result modes](docs/strategy-result-modes.md) |
| Understand the GPU direction | [GPU acceleration vision](docs/gpu-acceleration-vision.md) |
| Connect an existing agent | [Connect an AI system](docs/guides/connect-an-ai-system.md) |
| Create a Behavior Point | [Behavior Points](docs/behavior-points.md) |
| Build multi-step behavior | [Strategies](docs/strategies.md) |
| Evaluate and release | [Evaluation](docs/evaluation-and-approval.md) · [Release](docs/release.md) |
| Debug a broken integration | [Troubleshooting center](docs/troubleshooting/README.md) |
| Use AI to author/install/debug Vira | [AI Prompt Library](docs/ai-prompts/README.md) |
| Follow one complete example | [Marketing Agent tutorial](tutorials/marketing-agent/README.md) |

---

## Example use cases

![Vira use cases across marketing, support, research, and operations](assets/vira-use-cases.svg)

| Domain | Example task | What Vira helps control |
| --- | --- | --- |
| **Marketing** | Launch plan generation | full-funnel coverage, measurement, confirmed preferences |
| **Support** | Billing response agent | escalation rules, runtime guidance, traceability |
| **Research** | Brief or synthesis workflow | sourced claims, review checkpoints, structured output |
| **Operations** | Tool-using internal assistant | task routing, controlled actions, release-based behavior |

---

## A public trace stays simple

```text
Request          Build a launch plan for a membership product
Task             marketing.launch_plan
Behavior Point   marketing.launch_plan
Strategy mode    behavior_plan
Applied          yes
Result           completed
```

For documentation and demos, keep traces compact and safe. Never include credentials, personal data, customer data, or confidential information in public material.

---

## Repository map

```text
.
├── README.md
├── assets/              # product diagrams + accelerator vision + social preview
├── docs/
│   ├── guides/
│   ├── reference/
│   ├── troubleshooting/
│   ├── ai-prompts/
│   ├── authoring-quality.md
│   ├── strategy-result-modes.md
│   ├── gpu-acceleration-vision.md
│   ├── strategies.md
│   ├── runtime.md
│   └── traces.md
├── examples/
│   ├── authoring-quality/
│   ├── javascript/
│   ├── python/
│   ├── mcp/
│   ├── packs/
│   ├── semantic-runtime/
│   └── strategy/
└── tutorials/
    └── marketing-agent/
```

---

## What this public repository includes

This repository contains product positioning and concept docs, SDK/MCP/HTTP references, behavior authoring guidance, Strategy result-mode guidance, troubleshooting, AI-assisted authoring/debugging prompts, examples, tutorials, and the public accelerator architecture vision.

Service implementation and hosted operations are maintained separately from this documentation repository.

---

## Security

Never put API keys, MCP tokens, personal data, confidential information, or production traces in public issues or examples.

Read [SECURITY.md](SECURITY.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

The contents of this public repository are licensed under the [Apache License 2.0](LICENSE), unless a file states otherwise.
