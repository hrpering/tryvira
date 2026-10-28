<p align="center"><strong>Vira</strong></p>
<h1 align="center">Behavior control for AI systems</h1>
<p align="center">Connect AI systems once, learn from evidence, evaluate behavior and response quality, release explicit behavior, resolve it at runtime, and trace what happened.</p>

<p align="center">
  <img alt="Documentation license" src="https://img.shields.io/badge/Docs-Proprietary-111827">
  <img alt="SDK license" src="https://img.shields.io/badge/Client%20SDKs-MIT-0F766E">
  <img alt="Node 20+" src="https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=node.js&logoColor=white">
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-%E2%89%A53.10-3776AB?logo=python&logoColor=white">
  <img alt="MCP" src="https://img.shields.io/badge/MCP-supported-0F766E">
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="docs/capability-map.md">Capabilities</a> ·
  <a href="docs/README.md">Docs</a> ·
  <a href="docs/decision-and-quality.md">Decision & Quality</a> ·
  <a href="docs/teach.md">Teach AI</a> ·
  <a href="docs/gpu-acceleration-vision.md">Accelerator vision</a> ·
  <a href="docs/troubleshooting/README.md">Troubleshooting</a>
</p>

<p align="center"><img src="assets/vira-overview.svg" alt="Vira behavior control lifecycle" width="100%"></p>

---

## What Vira is

Vira is a behavior-control layer for AI systems. It separates **learning about behavior** from **activating behavior**.

```text
connect
→ observe evidence
→ discover / resolve
→ Teach AI proposes
→ review
→ evaluate behavior
→ approve / release
→ resolve / execute at runtime
→ evaluate response quality when needed
→ select or abstain
→ trace / outcome
→ learn again
```

A model may propose. A quality layer may score. A decision layer may select or abstain. None of those silently rewrite released behavior.

> **AI can propose. Released behavior remains explicit.**

---

## Current public client packages

| Surface | Package | Current published package line | Install |
| --- | --- | ---: | --- |
| JavaScript / TypeScript SDK | `@tryvira/sdk` | `0.1.5` | `npm install @tryvira/sdk` |
| MCP server/client | `@tryvira/mcp` | `0.1.5` | `npx -y @tryvira/mcp` |
| Python SDK | `tryvira-sdk` | `0.1.6` | `python -m pip install tryvira-sdk` |

The client packages are MIT-licensed. The hosted Vira service and this public documentation repository are governed separately.

---

## Capability map

Vira is more than routing + prompts. The current public integration model spans:

| Capability | Purpose |
| --- | --- |
| **Connect once** | Register an AI system + adapter and receive system, connection, and handshake state. |
| **Observe** | Record model responses, feedback, outcomes, and bounded observation batches. |
| **Semantic routing** | Select, abstain, or remain uncertain about the task. |
| **Signals** | Turn evidence into reviewed, typed producer mappings. |
| **Behavior Points** | Stable places where governed behavior attaches. |
| **Behavior Programs** | Guards, judgments, transforms, verification, escalation, rubrics, examples, and anti-patterns. |
| **Strategies** | Bounded multi-step behavior with explicit output ownership. |
| **Teach AI** | Turn admitted evidence into reviewable behavior proposals without silently changing production behavior. |
| **Behavior Evaluation** | Test candidate behavior/artifacts before approval and release. |
| **Response Quality & Decision** | Evaluate bounded response candidates, rank eligible options, select one or abstain. |
| **Release** | Make approved behavior explicitly eligible for runtime. |
| **Runtime** | Resolve or execute released behavior for a request boundary. |
| **Capability / serving decisions** | Resolve runtime capabilities and model-serving choices where supported. |
| **Behavior projection** | Compile/serve bounded behavior representations for runtime integrations. |
| **Deployment evidence** | Record comparisons and authoritative health evidence. |
| **Trace / outcome** | Preserve what was selected, applied, and observed afterward. |

See the full [Capability × Integration Surface matrix](docs/capability-map.md).

---

## How Vira works

### Request → behavior → runtime

![Vira request path](assets/vira-request-path.svg)

Semantic routing identifies the work. A Behavior Point is the stable governed attachment point. Programs and Strategies define behavior. Runtime resolves released behavior that is eligible for the request.

### Teach AI closes the learning loop

```text
observations / feedback / outcomes
→ admitted evidence
→ related Signals + context
→ proposal synthesis
→ review
→ Behavior Evaluation
→ approval / release
→ runtime result
→ outcome attribution
→ re-evaluation / new Teach cycle
```

Teach AI is deliberately not “self-modifying prompts.” Evidence becomes a proposal first. See [Teach AI](docs/teach.md).

### Response quality is a separate decision layer

```text
model response
→ bounded candidate set
→ quality evaluation
→ policy/eligibility filter
→ selected candidate OR abstention
```

This is separate from Behavior Evaluation. Behavior Evaluation answers “should this behavior/artifact be released?” Response Quality answers “which eligible response candidate is acceptable now?” See [Decision & Response Quality](docs/decision-and-quality.md).

### Strategy can own the answer or guide the answer

```text
response
Vira Strategy → final answer
```

```text
behavior_plan
Vira Strategy → compact behavior plan → downstream model → final answer
```

For an existing chatbot, `behavior_plan` often avoids duplicate full-answer generation. See [Strategy result modes](docs/strategy-result-modes.md).

---

## Integration surfaces

![Vira integration surfaces](assets/vira-integrations.svg)

The public clients are different access surfaces over the same governed system. They do **not** all expose identical convenience operations.

Examples:

- `connectOnce` / `connect_once` is an SDK convenience flow. Direct HTTP uses the underlying AI-system + connection routes.
- Response quality evaluation is available through JavaScript, Python, and HTTP today; it is not currently an MCP tool.
- MCP exposes advanced Strategy execution and behavior projection tools in addition to core routing and Pack operations.

Read [Capabilities](docs/capability-map.md), [JavaScript SDK](docs/reference/javascript-sdk.md), [Python SDK](docs/reference/python-sdk.md), [HTTP API](docs/reference/api.md), and [MCP tools](docs/reference/mcp-tools.md).

---

## Quickstart

### JavaScript / TypeScript

```bash
npm install @tryvira/sdk
```

```ts
import { ViraClient } from "@tryvira/sdk";

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

const connectionId = String(connected?.body.connection?.id ?? "");
await vira.testConnection(connectionId);
```

`connectOnce` performs the common system + adapter connection flow and returns `system`, `connection`, and `handshake`.

### Python

```bash
python -m pip install tryvira-sdk
```

```python
import os
from vira import ViraClient

scope = {
    "organizationId": os.environ["VIRA_ORGANIZATION_ID"],
    "projectId": os.environ["VIRA_PROJECT_ID"],
    "environmentId": os.environ["VIRA_ENVIRONMENT_ID"],
}

with ViraClient(os.environ["VIRA_API_URL"], api_key=os.environ.get("VIRA_API_KEY")) as vira:
    connected = vira.connect_once(
        "marketing-agent", "custom-agent", scope,
        "custom-python", "1",
        idempotency_key="connect:marketing-agent:v1",
    )
```

### MCP

```bash
npx -y @tryvira/mcp
```

Use MCP discovery (`tools/list`) to inspect the tools exposed by the installed package. See the [MCP guide](docs/reference/mcp.md) and [tool catalog](docs/reference/mcp-tools.md).

### Direct HTTP

Use the canonical [HTTP API reference](docs/reference/api.md). `docs/api-reference.md` is kept only as a pointer to that canonical page.

---

## Advanced runtime surfaces

The current SDK surface also includes advanced runtime operations for Strategy execution, capability negotiation, model-serving selection/traces, behavior capsules/projection, and deployment evidence.

These are documented separately from the quickstart because they are not required for a basic integration. See [Capability map](docs/capability-map.md) and the SDK references.

---

## Accelerator vision

> **Experimental architecture. Not general production availability.**

![Vira GPU acceleration vision](assets/vira-gpu-vision.svg)

Vira is exploring a path where released behavior execution can move closer to model inference, including same-device accelerator execution when parity and operational acceptance are proven.

CPU/conventional runtime remains first-class. Read [GPU acceleration vision](docs/gpu-acceleration-vision.md) and [GPU FAQ](docs/gpu-acceleration-faq.md).

---

## Learn by path

| Goal | Start here |
| --- | --- |
| See every capability and integration surface | [Capability map](docs/capability-map.md) |
| Connect an AI system | [Connect an AI system](docs/guides/connect-an-ai-system.md) |
| Understand Teach AI | [Teach AI](docs/teach.md) |
| Understand the two evaluation layers | [Evaluation & approval](docs/evaluation-and-approval.md) · [Decision & Quality](docs/decision-and-quality.md) |
| Build governed behavior | [Behavior Points](docs/behavior-points.md) · [Programs](docs/behavior-programs.md) · [Strategies](docs/strategies.md) |
| Learn authoring quality | [Authoring quality](docs/authoring-quality.md) |
| Integrate with JS / Python / MCP / HTTP | [Docs map](docs/README.md) |
| Debug an integration | [Troubleshooting](docs/troubleshooting/README.md) |
| Use AI to author or debug | [AI Prompt Library](docs/ai-prompts/README.md) |
| Follow a full example | [Marketing Agent tutorial](tutorials/marketing-agent/README.md) |

---

## License

The documentation, examples, branding, and other materials in this repository are proprietary; see [LICENSE](LICENSE).

The separately published client packages `@tryvira/sdk`, `@tryvira/mcp`, and `tryvira-sdk` are MIT-licensed according to their package metadata. The Vira service, application, and backend remain proprietary and are governed separately.
