<h1 align="center">vira</h1>
<p align="center"><strong>Define it. Test it. Release it. Know what ran.</strong></p>
<p align="center">Own how your AI behaves. Define what it should say, decide and do; evaluate and release those expectations; run eligible behavior through governed tasks with inspectable evidence.</p>
<p align="center">
  <a href="docs/start-here.md">Get started</a> ·
  <a href="docs/README.md">Documentation</a> ·
  <a href="examples/frameworks/node-next/README.md">OFF/ON chatbot</a> ·
  <a href="skills/README.md">Agent Skills</a> ·
  <a href="README.tr.md">Türkçe</a>
</p>

> **Under development.** The client packages and examples are public, but access to the Vira service and Studio workflows is not generally open. You can run the example chatbot with Vira OFF using your own model-provider key. Vira ON requires a provisioned account, scoped credentials, and eligible released behavior. [See the access and demo guide](docs/start-here.md).

## The problem

Your agent does a task. You correct an answer. The same mistake returns in another session, workflow, or model. A rule gets added to a prompt, another to application code, and a third to a test. Soon nobody can answer: **What is this AI expected to do, which version is live, and was the change evaluated?**

Vira provides a separate, governed place to define and operate those behaviors. It works **with** your existing AI application, model, and agent framework rather than replacing them.

## One canonical application path

**AUTO TaskRun → semantic resolve → eligible mode dispatch → real child executor → runtime behavior enforcement → provider/chatbot → post-model verification and receipt.** This is the end-to-end target, and its final provider/verification handoff needs real integration evidence. Ordinary users do not choose SINGLE, STRATEGY, COMPOUND or HYBRID manually. [Canonical TaskRun guide](docs/canonical-taskrun.md) · [Brand positioning](docs/brand-positioning.md)

`behavior-projection` and direct `resolveRuntime` remain **advanced SDK/diagnostic surfaces**, not the customer quickstart or a second chatbot path. A `COMPLETED` TaskRun alone does not prove that a provider-generated answer passed post-model verification.

## See the full Vira loop

Vira is more than a Pack editor or a runtime rules switch. It connects **real AI activity → governed behavioral changes → execution-time evidence**:

| Capability | The practical question | Start here |
| --- | --- | --- |
| **Connect / Observe** | What do our AI agents actually say, decide, call and fail at? | [Observe](docs/observe.md) |
| **Discover / Signals** | Which tasks and typed context signals can we identify from permitted evidence? | [Semantic routing](docs/semantic-routing.md) · [Signals](docs/signals.md) |
| **Define / Packs / Strategies** | What behavior should apply, and how should it execute? | [Pack Academy](docs/pack-authoring-guide.md) · [Strategies](docs/strategies.md) |
| **Teach / Feedback / Outcomes** | How does a correction become a reviewed improvement, rather than another prompt patch? | [Teach](docs/teach.md) · [Observe](docs/observe.md) |
| **Evaluate / Release** | Has this exact revision been tested and explicitly approved? | [Evaluation](docs/evaluation-and-approval.md) · [Release](docs/release.md) |
| **AUTO TaskRun / Runtime enforcement** | Which eligible behavior and child executor actually ran? | [Canonical TaskRun](docs/canonical-taskrun.md) |
| **Runtime verification / Response Quality** | Did the actual output satisfy the configured checks, and what happens on failure? | [Runtime verification](docs/runtime-verification.md) · [Quality](docs/decision-and-quality.md) |
| **Traces / Receipts / Operations** | What was applied, skipped, denied or measured, and can the team inspect it? | [Receipts](docs/traces.md) · [Product feature map](docs/product-feature-map.md) |

**Every feature family is mapped:** [complete capability guide](docs/product-feature-map.md) and [status/limitations](docs/product-status.md) also cover scopes and privacy, memory/knowledge, integrations, Studio/Admin, optimization, billing and experimental model/GPU infrastructure. Availability and proof differ by surface; none of those links implies general service access.

## Examples for different kinds of AI work

Vira is not limited to one industry or to complex agents. Start simple, then move to multi-task execution:

| Complexity | Example | What you would govern |
| --- | --- | --- |
| Everyday | **A four-person dinner** | Keep a configured vegetarian, onion-free preference while producing a useful recipe |
| Team support | **A delayed package** | Ask for missing order context; never invent tracking status or promise a refund |
| Business | **A marketing performance report** | Avoid comparing incompatible attribution windows as if they matched |
| Technical | **A safe SDK upgrade** | Follow a bounded verification and rollback strategy |
| Advanced | **An operations decision brief** | Coordinate multiple independently governed tasks and approvals |

[12 scenarios with sample prompts and failure cases](docs/use-cases.md) · [copyable short/detailed fixture prompts](examples/scenarios/README.md) · [Skills vs agents vs other platform categories, without brand names](docs/approach-comparison.md)

### Execution choices at a glance

**SINGLE** handles one task. **STRATEGY** handles a multi-step process within one task. **COMPOUND** coordinates multiple governed tasks. **HYBRID** combines SINGLE and STRATEGY children. **AUTO** requests eligible mode selection; it is not an execution mode or permission bypass.

[Understand all modes and their limits](docs/execution-modes.md) · [Test TaskRun routing using the published SDK](examples/javascript/taskrun-modes.mjs)

## Learn to author high-quality Behavior Packs

Start with [three complete graded Packs](examples/packs/README.md): **recipe preferences** (beginner), **retail-media evidence review** (intermediate) and **operations orchestration** (advanced, including a structured Strategy). Each has Semantic Tasks, Points, Programs, positive/negative test inputs and a field-by-field guide. [Where each Pack field belongs](docs/pack-authoring-guide.md).

## A business example

Imagine a retail-media assistant answering:

> "Which campaign performed better? Compare these two channel reports and tell me where to move next month's budget."

The reports use different attribution windows and sales definitions. An ordinary answer might rank the ROAS figures as though they were directly comparable.

A Vira behavior for this task can explicitly require the assistant to:

1. **Check comparability:** identify attribution windows, sales scope, and metric definitions before ranking channels.
2. **Handle uncertainty:** distinguish supported findings from assumptions and request missing information rather than inventing a comparison.
3. **Preserve the workflow:** provide a useful recommendation when evidence permits, including the basis and limitations.

That definition can be packaged, evaluated with positive and negative cases, reviewed, and explicitly released. A supported runtime integration resolves eligible behavior for the request and returns evidence of what was selected.

**This is an illustrative scenario, not a measured benchmark.** Vira does not guarantee that every model response is correct, that a model follows every instruction, or that a recommendation is valid. The host application still owns model execution and external tool permissions.

## What Vira adds

| Without a governed behavior layer | With Vira |
| --- | --- |
| Requirements spread across prompts, code, and notes | Named **Semantic Tasks**, **Behavior Points**, **Programs**, and **Strategies** |
| Changes that are hard to inspect or reproduce | Versioned candidates, evaluations, explicit review and release |
| Rules activated without a clear authority boundary | Scoped runtime resolution of eligible released behavior |
| Repeated mistakes with no structured improvement process | Permitted evidence → **Teach** proposals → review → evaluation |
| "It behaved differently" with little context | Returned identities, receipts, and traces for supported operations |

These are product workflow capabilities, **not** claims of universal enforcement, identical SDK feature coverage, or independently demonstrated accuracy gains. [Capabilities and limitations](docs/capability-map.md) · [Product explanation](docs/what-is-vira.md)

![Illustration of Vira's governed behavior lifecycle](assets/vira-overview.svg)

## See it in action

**Try the real Next.js + OpenAI Agents integration.** OFF invokes your configured model as a baseline. ON submits an **AUTO TaskRun** and shows the server's real admission/state. It does **not** manufacture a model answer: the public TaskRun response does not yet establish the canonical provider-output + post-model verification handoff.

```bash
git clone https://github.com/hrpering/tryvira.git
cd tryvira/examples/frameworks/node-next
npm ci
cp .env.example .env.local
# Set OPENAI_API_KEY in .env.local (server-side)
npm run dev
```

Open the local URL printed by Next.js and try **Vira OFF**. **Vira ON** requires your provisioned API endpoint, scoped credentials, an actual connection and eligible released tasks. The example returns a TaskRun pending/status response, **not** a verified chatbot reply, until the integrated provider/verifier response contract exists. [Exact sample limitations](examples/frameworks/node-next/README.md).

The example calls real configured services, contains **no fake Vira backend**, and has not been validated against a live Vira tenant in this public repository. Never expose its unauthenticated demo route to the public internet.

[Chatbot setup](examples/frameworks/node-next/README.md) · [Framework examples](examples/frameworks/README.md) · [Marketing Agent walkthrough](tutorials/marketing-agent/README.md)

## Build with the stack you already use

| Integration | Install or entry point | Guide |
| --- | --- | --- |
| JavaScript / TypeScript | `npm install @tryvira/sdk` | [SDK guide](docs/reference/javascript-sdk.md) |
| Python | `python -m pip install tryvira-sdk` | [Python guide](docs/reference/python-sdk.md) |
| MCP | `npx -y @tryvira/mcp` | [MCP setup and tool discovery](docs/reference/mcp.md) |
| HTTP | Customer deployment's documented API | [HTTP integration boundaries](docs/reference/api.md) |
| Agent Skills | Task-specific guidance for coding agents | [Skills library](skills/README.md) |

Package availability is not service access. Operations vary by release and credential scope. Confirm your installed package's documented methods or MCP `tools/list` instead of assuming parity.

## Find your path

- **New to Vira?** [Start here](docs/start-here.md) and [understand the concepts](docs/what-is-vira.md).
- **Building an integration?** [Example verification status](docs/example-verification.md), [Developer checklist](docs/developer-checklist.md), [mode guide](docs/execution-modes.md), [Developer guide](docs/developer-guide.md), [examples](examples/README.md), and [troubleshooting](docs/troubleshooting/README.md).
- **Evaluating it for a team?** [Use cases](docs/use-cases.md), [approach comparison](docs/approach-comparison.md), [Team evaluation guide](docs/for-teams.md), [product overview](docs/product-positioning.md), and [FAQ](docs/faq.md).
- **Working with behavior changes?** [Packs](docs/packs.md), [Teach AI](docs/teach.md), [evaluation](docs/evaluation-and-approval.md), and [runtime](docs/runtime.md).
- **Contributing?** [Contribution guide](CONTRIBUTING.md), [support](SUPPORT.md), and [security reporting](SECURITY.md).

## Trust, limits, and licensing

Vira is **not** a foundation model, an agent framework, or an automatic replacement for application authorization. Runtime outcomes depend on the integration boundary. Semantic matches and Teach suggestions are not permission to release or execute. Check the [authority and security model](docs/security-model.md).

This repository publicly shares documentation, examples, and Skills. Its [repository license](LICENSE) is **proprietary**; public visibility does not grant an open-source license. The separately published JavaScript, Python, and MCP client packages use **MIT licenses under their own distribution terms**. See [published packages and licensing](docs/published-packages.md).

Found an issue? Use [GitHub Issues](https://github.com/hrpering/tryvira/issues) for reproducible public-doc or package problems, and [private vulnerability reporting](SECURITY.md) for security concerns. Do not post credentials or customer information.
