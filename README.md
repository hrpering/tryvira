<h1 align="center">Vira</h1>
<h2 align="center">Behavior control for AI systems</h2>
<p align="center">Connect AI systems once, author governed behavior, learn from evidence, evaluate changes, release explicit behavior, resolve it at runtime, and trace what happened.</p>
<p align="center"><strong>What does AI behavior mean?</strong><br>AI behavior is how an AI system responds, makes decisions, and takes actions in different situations. Simply put, it’s what your AI says, decides, and does.</p>

<p align="center">
  <img alt="Documentation license" src="https://img.shields.io/badge/Docs-Proprietary-111827">
  <img alt="SDK license" src="https://img.shields.io/badge/Client%20SDKs-MIT-0F766E">
  <img alt="Latest JavaScript SDK" src="https://img.shields.io/npm/v/%40tryvira/sdk?label=npm%20SDK">
  <img alt="Latest MCP package" src="https://img.shields.io/npm/v/%40tryvira/mcp?label=MCP">
  <img alt="Latest Python SDK" src="https://img.shields.io/pypi/v/tryvira-sdk?label=PyPI">
  <img alt="Node 20+" src="https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=node.js&logoColor=white">
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-%E2%89%A53.10-3776AB?logo=python&logoColor=white">
  <img alt="MCP" src="https://img.shields.io/badge/MCP-discoverable%20tools-0F766E">
</p>

<p align="center"><strong>Under active development — product access is not open yet.</strong> <a href="https://studio.tryvira.xyz">Visit Vira Studio</a></p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="docs/developer-guide.md">Developer guide</a> ·
  <a href="docs/capability-map.md">Capabilities</a> ·
  <a href="docs/canonical-authoring.md">Canonical authoring</a> ·
  <a href="docs/packs.md">Packs</a> ·
  <a href="skills/README.md">Agent Skills</a> ·
  <a href="docs/README.md">Docs</a>
</p>

<p align="center"><img src="assets/Vira%20Davran%C4%B1%C5%9F%20D%C3%B6ng%C3%BCs%C3%BC%20Infografi%C4%9Fi.png" alt="Vira Behavior Loop: connect once, define, teach, evaluate, release, run, and improve AI behavior" width="100%"></p>

---

## What Vira is

Vira is under active development. Product access is not open yet. Vira's public vision is to help teams manage AI behavior through a governed lifecycle, from authoring and review to runtime use. Visit [studio.tryvira.xyz](https://studio.tryvira.xyz) for product updates.

Vira is a behavior-control layer for AI systems. It separates learning about behavior, authoring behavior, activation/release authority, and runtime enforcement.

```text
connect
→ observe evidence
→ discover / semantic resolve
→ author Task / Point / Program / Strategy
→ Teach AI can propose
→ review / evaluate
→ activate and/or release explicitly
→ runtime resolve / execute
→ receipt / trace / outcome
→ learn again
```

The important boundary is simple:

> **AI can propose. Semantic routing can select. Quality can score. Released behavior remains explicit.**

A semantic match is not authorization. A Teach promotion is not a hidden release. Pack import/install is not activation. Strategy activation does not bypass scope, policy, evaluation, release, or runtime checks.

---

## Public client packages

| Surface | Package | Current line | Runtime | Install |
| --- | --- | ---: | --- | --- |
| JavaScript / TypeScript SDK | `@tryvira/sdk` | `0.1.43` | Node.js 20+ | `npm install @tryvira/sdk@0.1.43` |
| MCP server/client | `@tryvira/mcp` | `0.1.44` | Node.js 20+ | `npx -y @tryvira/mcp@0.1.44` |
| Python SDK | `tryvira-sdk` | `0.1.43` | Python 3.10+ | `python -m pip install tryvira-sdk==0.1.43` |

The version badges read current npm/PyPI registry metadata. A scheduled repository sync refreshes pinned documentation, examples, and the MCP tool catalog from the latest releases. The public client packages are MIT-licensed. The hosted Vira service, backend, branding, and this documentation repository are governed separately.

See [Published packages](docs/published-packages.md).

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
  name: "example-agent",
  systemType: "custom-agent",
  organizationId: process.env.VIRA_ORGANIZATION_ID!,
  projectId: process.env.VIRA_PROJECT_ID!,
  environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  adapterType: "custom-node",
  adapterVersion: "1",
  idempotencyKey: "connect:example-agent:v1",
});

const capabilities = await vira.listCapabilities({ surface: "sdk" });
```

Use environment variables and placeholder values in checked-in examples. Never commit real credentials or private tenant/service information.

### Python

```bash
python -m pip install tryvira-sdk
```

```python
import os
from vira import ViraClient

with ViraClient(
    os.environ["VIRA_API_URL"],
    api_key=os.environ.get("VIRA_API_KEY"),
) as client:
    capabilities = client.list_capabilities(surface="python")
```

### MCP

```bash
npx -y @tryvira/mcp@0.1.44
```

MCP clients should discover the live surface instead of hard-coding a tool count:

```text
server/discover
→ initialize
→ tools/list
→ tools/call
```

Effectful MCP tools remain governed by Vira's authority boundary.

---

## Canonical authoring

Vira supports direct authoring through SDK, Python, HTTP, and MCP.

```text
Semantic Task
      ↓
Behavior Point
      ↓
Program / Strategy
      ↓
validate / simulate
      ↓
evaluate / activate / release as required
      ↓
runtime
```

JavaScript example:

```ts
const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  examples: ["Build a launch plan for a membership product"],
  negativeExamples: ["Write a single ad headline"],
});

const taskId = String(task?.body.task?.id ?? "");

await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId,
  constraints: [
    "cover the required funnel stages",
    "include a measurement approach"
  ],
});
```

Strategy activation is explicit:

```ts
await vira.validateBehaviorStrategy(strategyId);
await vira.simulateBehaviorStrategy(strategyId, {});
await vira.activateBehaviorStrategy(strategyId);
```

See [Canonical authoring](docs/canonical-authoring.md), [Behavior Points](docs/behavior-points.md), [Behavior Programs](docs/behavior-programs.md), and [Strategies](docs/strategies.md).

---

## Semantic resolution and runtime are different

```ts
const semantic = await vira.resolveSemantic({
  input: "Build a launch plan",
  profile: { domain: "marketing" },
});
```

Semantic resolution returns candidate/evidence information. It does not grant authority.

```ts
const runtime = await vira.resolveRuntime({
  behaviorPoint: "marketing.launch_plan",
  executionBoundary: {
    organizationId: process.env.VIRA_ORGANIZATION_ID!,
    projectId: process.env.VIRA_PROJECT_ID!,
    environmentId: process.env.VIRA_ENVIRONMENT_ID!,
  },
  idempotencyKey: "runtime:launch-plan:001",
});
```

Runtime is the enforcing boundary and can deny, abstain, or require an eligible released identity.

---

## Teach AI, Evaluation, Release

Teach AI turns admitted evidence into governed proposals:

```text
evidence
→ proposal
→ review
→ evaluate
→ promote
→ explicit release
→ runtime
→ outcome
```

Public client methods include `createTeachProposal`, `transitionTeachProposal`, Behavior Evaluation methods, and governed release methods. Promotion remains separate from release authority.

See [Teach AI](docs/teach.md), [Evaluation and approval](docs/evaluation-and-approval.md), and [Release](docs/release.md).

---

## Packs

Use Packs when related Tasks, Points, Programs, Strategies, policies/signals, and evaluation material should move together.

```text
import
→ parse / validate
→ inventory / conflicts
→ configure
→ install / materialize draft
→ evaluate
→ approve
→ release
→ runtime
```

Import never activates behavior. Installation materializes canonical draft objects; evaluation, approval, and release remain separate.

Public client methods include:

```text
listPacks
importPack
installPack
evaluatePack
approvePack
releasePack
previewPackUpgrade
```

There is intentionally no client-side `verifyPack()` shortcut that can declare a candidate production-safe. Pack verification is the governed lifecycle above plus runtime receipt/trace inspection.

See [Packs](docs/packs.md) and the [Developer guide](docs/developer-guide.md).

### Pack authoring in five minutes

Start with the smallest portable directory. A Pack is source material for a governed
candidate; it is not a permission or a deployment by itself.

```text
my-pack/
├── pack.yaml
├── semantic-tasks/items.yaml
├── behavior-points/items.yaml
├── behavior-programs/items.yaml
├── strategies/items.yaml
└── evaluations/items.yaml
```

Create `pack.yaml` with a stable key, immutable version, and explicit scope:

```yaml
key: marketing.starter
version: 1.0.0
description: A bounded launch-plan behavior
variables:
  audience: B2B founders
  region: EU
```

Put canonical objects in the matching `items.yaml` files. Keep keys stable, make
constraints and verification requirements explicit, and never put API keys, customer
IDs, private URLs, or production traces in the Pack. Validate the files, then use the
SDK lifecycle in this order:

```ts
const suffix = Date.now();
const manifest = {
  id: `vira.marketing.starter.${suffix}`,
  name: "Marketing Starter",
  version: "1.0.0",
  variables: [
    { key: "audience", label: "Audience", required: true },
    { key: "region", label: "Region", required: true },
  ],
};
const objects = {
  semanticTasks: [{
    taskKey: "marketing.launch_plan",
    description: "Create a measurable product launch plan",
    examples: ["Create a launch plan for a B2B product"],
    negativeExamples: ["Write one headline"],
  }],
  behaviorPoints: [{
    key: "marketing.launch_plan",
    taskKey: "marketing.launch_plan",
    requirement: "Cover the requested audience and region with measurable next steps",
  }],
  behaviorPrograms: [{
    key: "marketing.launch_plan",
    rubric: ["Address the supplied audience and region", "Include measurable next steps"],
  }],
};

const imported = await vira.importPack({
  manifest,
  objects,
  idempotencyKey: `pack:import:${manifest.id}:1.0.0`,
});
const packId = String(imported?.body.pack?.id ?? "");
if (imported.status !== 201 || !packId) throw new Error("PACK_IMPORT_FAILED");
if (Array.isArray(imported.body.conflicts) && imported.body.conflicts.length) {
  throw new Error("PACK_CONFLICTS_REQUIRE_REVIEW");
}

const installResponse = await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"],
});
let installedPack = installResponse?.body.pack;
let materialization = installResponse?.body.materialization ?? installedPack?.objects?.materialization;

if (installResponse.status === 202) {
  // The response only confirms queueing. Confirm materialization with the
  // public listPacks readback before starting evaluation.
  const deadline = Date.now() + 30_000;
  while (!materialization && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    const listed = await vira.listPacks();
    installedPack = listed?.body.packs?.find((item) => item.id === packId);
    materialization = installedPack?.objects?.materialization;
  }
}

const packDigest = String(installedPack?.digest ?? "");
if (installedPack?.id !== packId || !packDigest || !materialization) {
  throw new Error("PACK_MATERIALIZATION_NOT_CONFIRMED");
}

// This provider-backed evaluation is bound to the Pack ID/digest. It evaluates
// a generated response against supplied criteria; it is not proof of runtime
// execution of the installed behavior.
const started = await vira.startEvaluation({
  id: `marketing-starter-evaluation-${suffix}`,
  targetArtifact: {
    packId,
    packDigest,
    criteria: ["Address the supplied audience and region", "Include measurable next steps"],
  },
  dataset: [{
    id: "case-1",
    input: "Create a launch plan for a B2B product in the EU.",
    criteria: ["Address the supplied audience and region", "Include measurable next steps"],
  }],
  threshold: 0.8,
});
const evaluation = started?.body.evaluation;
const evaluationId = String(evaluation?.id ?? "");
if (started.status !== 201 || !evaluationId || evaluation?.status !== "PASSED") {
  throw new Error("PACK_EVALUATION_NOT_PASSED");
}
if (evaluation?.targetArtifact?.packId !== packId || evaluation?.targetArtifact?.packDigest !== packDigest) {
  throw new Error("PACK_EVALUATION_BINDING_MISMATCH");
}
await vira.evaluatePack(packId, { evaluationId });
// Approve and release only as separate authorized actions.
```

Python uses `install_pack(pack_id, variables)` and `evaluate_pack(pack_id, {"evaluationId": evaluation_id})`. The published MCP package does not expose Pack operations; use the SDK, Python SDK, or HTTP API for this lifecycle. Import and installation never activate runtime behavior. See the complete [Pack walkthrough](docs/packs.md).

---

## Response Quality & Decision

Response Quality & Decision evaluates bounded response candidates and can select or abstain. It is separate from Behavior Evaluation and it does not grant release authority.

See [Decision & response quality](docs/decision-and-quality.md).

---

## Capability discovery

Do not guess what a credential or integration surface can do.

```ts
const capabilities = await vira.listCapabilities({ surface: "sdk" });
```

```python
capabilities = client.list_capabilities(surface="python")
```

```text
GET /v1/capabilities?surface=api
```

MCP uses `list_capabilities` plus `tools/list`.

See [Capability discovery](docs/capability-discovery.md) and the full [Capability map](docs/capability-map.md).

---

## Full developer path

The [Developer guide](docs/developer-guide.md) walks through the public lifecycle end to end:

```text
install client
→ connect
→ discover capabilities
→ observe
→ create Semantic Task
→ create Behavior Point
→ Program / Strategy
→ semantic resolve
→ evaluate / release
→ runtime resolve
→ Strategy continuation
→ Pack import / materialize / verify / release
→ receipts / traces
```

Copyable examples:

- [`examples/javascript/end-to-end-lifecycle.mjs`](examples/javascript/end-to-end-lifecycle.mjs)
- [`examples/javascript/canonical-authoring.mjs`](examples/javascript/canonical-authoring.mjs)
- [`examples/packs/marketing-starter/`](examples/packs/marketing-starter/)
- [`examples/authoring-quality/`](examples/authoring-quality/)
- [`examples/python/`](examples/python/)
- [`examples/mcp/`](examples/mcp/)

---

## Advanced runtime surfaces

The current public SDK/API contract also includes Strategy execution, runtime capability attestation/resolution, model-serving decisions/traces, behavior capsule/projection, Pack upgrade preview, and deployment evidence.

See [JavaScript SDK reference](docs/reference/javascript-sdk.md), [Python SDK reference](docs/reference/python-sdk.md), [MCP integration](docs/reference/mcp.md), and [HTTP API reference](docs/reference/api.md).

---

## Security and license

Never put API keys, MCP tokens, tenant identifiers, personal/customer data, private infrastructure URLs, production traces, or internal operator configuration in public issues or examples.

The documentation/examples in this repository are proprietary. The separately published client packages listed above are MIT-licensed according to their package metadata. See [LICENSE](LICENSE), [SECURITY.md](SECURITY.md), and [SUPPORT.md](SUPPORT.md).
