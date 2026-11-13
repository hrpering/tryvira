# Agent Skill coverage and validation status

This page shows the customer task covered by each of the 27 public Skills and the shared example that helps a user try it. Repository checks verify structure and selected behaviors; they do not prove every Skill completed a live customer workflow.

## Shared evidence and limits

- The repository validator checks the structure and packaging of all 27 Skills. Trigger data contains positive, negative, and ambiguous prompts for every Skill.
- The 34 workflow scenarios are synthetic evaluation inputs. They are not model runs or proof of successful task completion.
- CI validates repository files, packages representative Skills, and builds or checks the customer examples. A successful build is not a live Vira result.
- Vira, provider, MCP, and Studio live use has not been performed in this review. Product access is not open yet.
- The official OpenAI and Anthropic structural validators were run for an earlier library version. The newly added TaskRun and Chatbot Skills pass this repository's validator and packager; the bundled OpenAI validator could not run here because its PyYAML dependency is unavailable. No model trigger benchmark is claimed.
- There is no per-skill model result for the new Skill. No creator model evaluation was run. Historical dated model-run records tested a pre-AUTO projection integration; that old workflow is not the canonical model-serving path today.
- Skills and runnable examples require the user's own service access and credentials. Keep credentials server-side; do not add customer data or keys to examples.

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

The Skills route customer tasks across the documented Vira surfaces, and the full-lifecycle Skill coordinates their handoffs. Some tasks rely on shared examples or installed package documentation; TaskRun has dedicated JavaScript and Python route-first runners, while direct HTTP still requires an authorized customer API contract, and Studio access is unavailable. Do not claim all Skills independently completed a live workflow. Use the examples with an authorized customer scope and stop when the selected surface's public documentation or account capability is missing.
