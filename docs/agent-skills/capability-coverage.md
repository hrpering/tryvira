# Agent Skills capability coverage

This page maps customer goals to public Skills without reproducing low-level SDK methods, HTTP paths, request schemas, or private implementation details. Package versions and available operations change independently; follow the installed package documentation and the current customer-facing reference for exact interfaces.

| Customer goal | Primary Skill | Supporting Skills | Coverage note |
| --- | --- | --- | --- |
| Start an integration and choose a supported surface | `vira-get-started` | `vira-integrate-app`, `vira-debug` | Confirm customer scope and surface availability |
| Integrate a JavaScript/TypeScript application | `vira-js-sdk` | `vira-integrate-app`, `vira-framework-integration` | Use the installed npm package documentation |
| Integrate a Python application | `vira-python-sdk` | `vira-integrate-app`, `vira-framework-integration` | Use the installed PyPI package documentation |
| Use Vira from an application framework | `vira-framework-integration` | `vira-js-sdk`, `vira-python-sdk` | Framework examples use real published clients |
| Call the public HTTP API | `vira-http-api` | `vira-debug` | Use the customer deployment's published API reference; do not infer routes |
| Configure an MCP host | `vira-mcp` | `vira-debug` | Check the installed package catalog and live `tools/list` |
| Author a governed behavior | `vira-author-behavior` | `vira-signals`, `vira-strategies` | Keep authoring and runtime authority separate |
| Build and govern a Pack | `vira-build-pack` | `vira-packs` | Check the installed surface and persisted candidate state |
| Observe and complete the Teach loop | `vira-observe-teach` | `vira-lifecycle`, `vira-evaluate`, `vira-release`, `vira-runtime` | Covers evidence through next runtime learning cycle |
| Evaluate behavior or response quality | `vira-evaluate` | `vira-evaluate-release` | Evaluation is separate from approval and release |
| Approve or release behavior | `vira-release` | `vira-evaluate-release` | Requires the customer's explicit authority |
| Apply behavior at runtime | `vira-runtime` | `vira-debug` | Verify returned identity and runtime result |
| Try the customer chatbot with Vira behavior OFF or ON | `vira-chatbot` | `vira-framework-integration`, `vira-js-sdk`, `vira-runtime` | Run the Next.js example locally; ON requires customer-provisioned access and an eligible released behavior |
| Orchestrate a TaskRun | `vira-task-runs` | `vira-js-sdk`, `vira-runtime`, `vira-full-lifecycle` | Current JavaScript and Python packages document TaskRun flows; verify exact operations in the installed release |
| Navigate Studio | `vira-studio` | `vira-debug` | UI availability has not been verified |
| Diagnose an integration | `vira-debug` | Surface-specific Skill | Use sanitized evidence and fix the earliest failing step |
| Plan a complete lifecycle | `vira-full-lifecycle` | Relevant Skills above | Requires customer scope and separate authorized decisions |

The library contains 24 task-specific Vira Skills. Their guides cover package setup, connection, evidence, authoring, runtime, evaluation, Teach, Packs, release, and trying the OFF/ON chatbot. MCP is a narrower surface than the SDKs in some areas; verify its currently installed tools before choosing it. Studio UI workflows are not claimed as verified. Direct source-code integration is not a supported customer surface.

See [Skill status](skill-status.md), [validation status](validation-status.md), the [capability map](../capability-map.md), and [package references](../reference/sdk-method-inventory.md).
