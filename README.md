<h1 align="center">vira</h1>
<p align="center"><strong>Define, test, and release how your AI behaves.</strong></p>
<p align="center">A behavior-control layer for AI applications and agents. Make task-specific requirements reviewable, changes testable, and runtime behavior traceable, without retraining the model for every correction.</p>
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

## A concrete example

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

**Try the real Next.js + OpenAI Agents example.** It has an OFF path that runs without Vira and an ON path that requests a released Vira behavior before calling the model.

```bash
git clone https://github.com/hrpering/tryvira.git
cd tryvira/examples/frameworks/node-next
npm ci
cp .env.example .env.local
# Set OPENAI_API_KEY in .env.local (server-side)
npm run dev
```

Open the local URL Next.js prints and try **Vira OFF**. For **Vira ON**, configure the customer-provided Vira API endpoint, scoped credentials, and an eligible released Behavior Point as explained in the [example README](examples/frameworks/node-next/README.md). A missing or denied behavior must not silently fall back to an ungoverned ON request.

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
- **Building an integration?** [Developer guide](docs/developer-guide.md), [examples](examples/README.md), and [troubleshooting](docs/troubleshooting/README.md).
- **Evaluating it for a team?** [Team evaluation guide](docs/for-teams.md), [product overview](docs/product-positioning.md), and [FAQ](docs/faq.md).
- **Working with behavior changes?** [Packs](docs/packs.md), [Teach AI](docs/teach.md), [evaluation](docs/evaluation-and-approval.md), and [runtime](docs/runtime.md).
- **Contributing?** [Contribution guide](CONTRIBUTING.md), [support](SUPPORT.md), and [security reporting](SECURITY.md).

## Trust, limits, and licensing

Vira is **not** a foundation model, an agent framework, or an automatic replacement for application authorization. Runtime outcomes depend on the integration boundary. Semantic matches and Teach suggestions are not permission to release or execute. Check the [authority and security model](docs/security-model.md).

This repository publicly shares documentation, examples, and Skills. Its [repository license](LICENSE) is **proprietary**; public visibility does not grant an open-source license. The separately published JavaScript, Python, and MCP client packages use **MIT licenses under their own distribution terms**. See [published packages and licensing](docs/published-packages.md).

Found an issue? Use [GitHub Issues](https://github.com/hrpering/tryvira/issues) for reproducible public-doc or package problems, and [private vulnerability reporting](SECURITY.md) for security concerns. Do not post credentials or customer information.
