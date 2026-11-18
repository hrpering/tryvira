# Agent Skill catalog and examples

The default install is now the **one self-contained root `vira` Skill**. The 28 specialist manuals listed below remain advanced references with their own validated archives. Find the developer task covered by each specialist, its example, and the current validation level. For live integration testing, use a provisioned Vira environment.

For the exact local and live test coverage, use [Skill testing](e2e-readiness.md), [live acceptance](live-acceptance.md), and the [test trust matrix](test-trust-matrix.md). Live workflows require a provisioned Vira environment.

## Test coverage

All 28 Skill folders are checked for metadata, links, example structure and package integrity. CI verifies all 28 portable archives and tests extraction into three agent-style directory layouts.

The 87 model-selection inputs and 34 workflow scenarios are structured evaluation fixtures. Automatic Skill selection has not been measured against a live agent model in this release; the trace-based evaluator can be used for that test.

Repository CI validates published client contracts through test transports and builds the accompanying examples. Live connection, release, provider and Studio workflows require a separately provisioned environment.

## Coverage by Skill

| Skill | Developer task | Guide or example | Offline coverage |
| --- | --- | --- | --- |
| `vira-operator` | Run SDK-backed lifecycle workflows without Studio | Operator CLI and SDK parity matrix | Offline authority/allowlist tests; live tenant required |
| `vira-observe` | Capture permitted model/tool/action/feedback events | JS/Python connect-observe examples | Dedicated Skill procedure and event negative tests |
| `vira-runtime-verification` | Check real post-model modules and output-bound receipts | Runtime verification guide | Verifier and fail-closed negative tests |
| `vira-traces` | Inspect TaskRun child and authority lineage | TaskRun readback guides | Receipt correlation and partial-run scenarios |
| `vira-get-started` | Choose an integration path | Quickstart and framework guide | Structure and trigger checks |
| `vira-npm-cli` | Install or update npm clients | Published package guide | Registry check |
| `vira-integrate-app` | Connect an existing application | Framework examples | Structure and trigger checks |
| `vira-js-sdk` | Integrate a JavaScript application | JavaScript and Next.js examples | SDK and example checks |
| `vira-task-runs` | Use a supported TaskRun workflow | Installed public package documentation | Dedicated JS and Python route-first runners; no live tenant |
| `vira-python-sdk` | Integrate a Python application | FastAPI and LangGraph examples | Package and syntax checks |
| `vira-mcp` | Configure an MCP host and inspect available tools | MCP client example | Catalog and example checks |
| `vira-http-api` | Use a documented HTTP surface | HTTP integration guidance | Shared repository checks; no route-specific runner |
| `vira-framework-integration` | Add Vira at an application boundary | Next.js, FastAPI, LangGraph, and MCP examples | Example build and syntax checks |
| `vira-author-behavior` | Describe governed behavior | Canonical authoring example | Shared lifecycle checks |
| `vira-signals` | Review customer-authorized Signals | Signals guide | Structure and workflow checks |
| `vira-strategies` | Validate and use a Strategy | Strategy example | Structure and workflow checks |
| `vira-build-pack` | Prepare a Pack candidate | Four versioned Pack Academy examples and ZIP builder | Structure and workflow checks |
| `vira-packs` | Work through a Pack lifecycle | Marketing Agent tutorial | Tutorial safety checks |
| `vira-observe-teach` | Follow the Teach improvement journey | Teach guide and analysis example | Skill and example checks |
| `vira-evaluate` | Review a behavior evaluation | Evaluation example | Runner and repository checks |
| `vira-evaluate-release` | Prepare review and release decisions | Revision workflow guide | Repository checks |
| `vira-release` | Prepare an authorized release | Marketing Agent tutorial | Tutorial checks |
| `vira-runtime` | Apply and inspect governed behavior | Canonical Next.js AUTO TaskRun, verification guide (legacy Python projections diagnostic-only) | Example checks |
| `vira-chatbot` | Try the chatbot with Vira OFF/ON | Next.js + OpenAI Agents chatbot | Skill and OFF/ON boundary checks |
| `vira-studio` | Navigate Studio when access is available | Capability guidance | No authenticated UI run |
| `vira-debug` | Diagnose an integration issue | Troubleshooting guides | Structure and trigger checks |
| `vira-lifecycle` | Plan a behavior lifecycle | JavaScript lifecycle walkthrough | Shared lifecycle checks |
| `vira-full-lifecycle` | Coordinate a customer journey across Skills | Marketing Agent tutorial and Teach guide | Handoff and workflow checks |

## Short demonstration route

Use vira-full-lifecycle with vira-build-pack, vira-task-runs and vira-traces. Add vira-observe-teach for a separately governed learning loop. A verified final provider-answer claim also needs real output-bound evidence; the public ON chatbot does not supply it. See the [video workflow](video-workflow.md) and [gap review](production-parity-demo.md).


## Interpretation

The Skills route customer tasks across the documented Vira surfaces, and the full-lifecycle Skill coordinates their handoffs. Some tasks rely on shared examples or installed package documentation; TaskRun has dedicated JavaScript and Python route-first runners, while direct HTTP still requires an authorized customer API contract, and Studio access is unavailable. The repository currently documents the workflows and validates local packaging; live execution depends on the supported client and the customer's authorized environment.
