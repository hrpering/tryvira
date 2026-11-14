# Agent Skill coverage and validation status

Find the developer task covered by each of the 27 Skills, its example, and the current validation level. For live integration testing, use a provisioned Vira environment.

For the exact local and live test coverage, use [Skill testing](e2e-readiness.md) and [live acceptance](live-acceptance.md). Live workflows require a provisioned Vira environment.

## Test coverage

All 27 Skill folders are checked for metadata, links, example structure and package integrity. CI verifies all 27 portable archives and tests extraction into three agent-style directory layouts.

The 84 model-selection inputs and 34 workflow scenarios are structured evaluation fixtures. Automatic Skill selection has not been measured against a live agent model in this release; the trace-based evaluator can be used for that test.

Repository CI validates published client contracts through test transports and builds the accompanying examples. Live connection, release, provider and Studio workflows require a separately provisioned environment.

## Coverage by Skill

| Skill | Customer task | Shared example or guide | Repository evidence | Live |
| --- | --- | --- | --- | --- |
| `vira-observe` | Capture permitted model/tool/action/feedback events | JS/Python connect-observe examples | Dedicated Skill procedure and event negative tests | Not run |
| `vira-runtime-verification` | Check real post-model modules and output-bound receipts | Runtime verification guide | Verifier and fail-closed negative tests | Not run |
| `vira-traces` | Inspect TaskRun child and authority lineage | TaskRun readback guides | Receipt correlation and partial-run scenarios | Not run |
| `vira-get-started` | Choose an integration path | Quickstart and framework guide | Structure and trigger checks | Not run |
| `vira-npm-cli` | Install or update npm clients | Published package guide | Registry check | Not run |
| `vira-integrate-app` | Connect an existing application | Framework examples | Structure and trigger checks | Not run |
| `vira-js-sdk` | Integrate a JavaScript application | JavaScript and Next.js examples | SDK and example checks | Not run |
| `vira-task-runs` | Use a supported TaskRun workflow | Installed public package documentation | Dedicated JS and Python route-first runners; no live tenant | Not run |
| `vira-python-sdk` | Integrate a Python application | FastAPI and LangGraph examples | Package and syntax checks | Not run |
| `vira-mcp` | Configure an MCP host and inspect available tools | MCP client example | Catalog and example checks | Not run |
| `vira-http-api` | Use a documented HTTP surface | HTTP integration guidance | Shared repository checks; no route-specific runner | Not run |
| `vira-framework-integration` | Add Vira at an application boundary | Next.js, FastAPI, LangGraph, and MCP examples | Example build and syntax checks | Not run |
| `vira-author-behavior` | Describe governed behavior | Canonical authoring example | Shared lifecycle checks | Not run |
| `vira-signals` | Review customer-authorized Signals | Signals guide | Structure and workflow checks | Not run |
| `vira-strategies` | Validate and use a Strategy | Strategy example | Structure and workflow checks | Not run |
| `vira-build-pack` | Prepare a Pack candidate | Three graded Pack Academy examples and ZIP builder | Structure and workflow checks | Not run |
| `vira-packs` | Work through a Pack lifecycle | Marketing Agent tutorial | Tutorial safety checks | Not run |
| `vira-observe-teach` | Follow the Teach improvement journey | Teach guide and analysis example | Skill and example checks | Not run |
| `vira-evaluate` | Review a behavior evaluation | Evaluation example | Runner and repository checks | Not run |
| `vira-evaluate-release` | Prepare review and release decisions | Revision workflow guide | Repository checks | Not run |
| `vira-release` | Prepare an authorized release | Marketing Agent tutorial | Tutorial checks | Not run |
| `vira-runtime` | Apply and inspect governed behavior | Canonical Next.js AUTO TaskRun, verification guide (legacy Python projections diagnostic-only) | Example checks | Not run |
| `vira-chatbot` | Try the chatbot with Vira OFF/ON | Next.js + OpenAI Agents chatbot | Skill and OFF/ON boundary checks | Not run |
| `vira-studio` | Navigate Studio when access is available | Capability guidance | No authenticated UI run | Not run |
| `vira-debug` | Diagnose an integration issue | Troubleshooting guides | Structure and trigger checks | Not run |
| `vira-lifecycle` | Plan a behavior lifecycle | JavaScript lifecycle walkthrough | Shared lifecycle checks | Not run |
| `vira-full-lifecycle` | Coordinate a customer journey across Skills | Marketing Agent tutorial and Teach guide | Handoff and workflow checks | Not run |

## Interpretation

The Skills route customer tasks across the documented Vira surfaces, and the full-lifecycle Skill coordinates their handoffs. Some tasks rely on shared examples or installed package documentation; TaskRun has dedicated JavaScript and Python route-first runners, while direct HTTP still requires an authorized customer API contract, and Studio access is unavailable. The repository currently documents the workflows and validates local packaging; live execution depends on the supported client and the customer's authorized environment.
