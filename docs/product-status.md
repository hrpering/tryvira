# Product availability and validation

Vira's public SDKs, developer documentation and examples are available in this repository. **The hosted Vira service and Studio are currently accessible through provisioned environments rather than open self-service registration.**

This page helps you distinguish what can be explored locally from operations requiring an authorized Vira workspace.

## What you can use today

| Area | Available to developers | Additional requirements |
| --- | --- | --- |
| Documentation and Behavior Pack examples | Public guides, source files and ZIP-building tools | No account required for local inspection |
| Agent Skills | 27 installable guides with packaging and offline CI checks | An actual agent runtime for automatic selection; live Vira credentials for API workflows |
| JavaScript and Python SDKs | Published client packages and runnable examples | A provisioned API URL and scoped key for live operations |
| MCP | Published server package and tool discovery | Install the server and inspect its actual `tools/list` |
| Next.js chatbot | OFF runs a configured provider; ON submits an AUTO TaskRun | Your own provider key for OFF; provisioned Vira connection and released behavior for ON |
| Studio and Admin | Product interfaces for supported accounts | Account access and deployment-specific permissions |

[Quickstart](quickstart.md) · [Agent Skills](../skills/README.md) · [Developer examples](../examples/README.md)

## Integration status

| Product area | What is documented or tested | Current boundary |
| --- | --- | --- |
| Connection and Observe | Scoped event contracts, client examples and ingestion tests | Requires a live authorized connection; observation does not trigger release |
| Signals and Teach | Definition, review, mapping and proposal workflows | Actual data/consent, approved mappings and separate release decisions |
| Tasks, Programs, Strategies and Packs | Authoring contracts, examples, evaluation and lifecycle interfaces | Runtime eligibility depends on registered and released artifacts |
| AUTO TaskRun | Admission, persisted status, execution-mode routing and child state | Host capabilities and completed execution vary by environment |
| Runtime verification | Module/check contracts, failure handling and receipt structures | The public provider-output-to-post-model verified answer handoff remains under development |
| Evaluation and release | Separate evaluation, review, approval and release operations | Each transition requires the appropriate authority and evidence |
| Traces and telemetry | Execution and receipt inspection guidance | Fields and retention depend on the connected environment |
| Billing, enterprise features and GPU/model serving | Product and engineering work in progress | No general commercial availability or performance guarantee is published here |

## Understanding the test evidence

Repository CI checks source compatibility, SDK request/response contracts, Skill archive packaging, example builds, and selected offline scenarios. **CI success does not mean a customer tenant, model provider or post-model verification chain was run.**

A deployed acceptance result requires a real scoped request and the corresponding server records. A **verified ON answer** additionally requires the exact provider output, released behavior identity, post-model result and matching persisted receipt.

| Evidence | What it establishes |
| --- | --- |
| Implementation / unit test | Local code and focused checks exist for a specific operation |
| Source/build test | Example compiles, links resolve, basic contracts are exercised |
| SDK serialization test | Published client sends the expected method and fields through a test transport |
| Deployed acceptance | A specified operation worked in one authorized environment |
| Full provider and verification chain | The real output passed the configured checks and matches its TaskRun/receipt |

The public Next.js example currently shows **TaskRun admission and status for ON**, rather than a final verified ON chatbot answer. [Canonical TaskRun](canonical-taskrun.md) · [Verified-answer integration](verified-answer-handoff.md)

## Version and surface compatibility

JavaScript, Python, MCP, HTTP and Studio are separate integration surfaces. Their supported operations and release schedules can differ. Check the [published client versions](published-packages.md), [capability discovery](capability-discovery.md) and your environment's permissions before implementing a workflow.

For privacy, billing, enterprise support and deployment-specific terms, use the agreement and service configuration supplied for your workspace.

[Product capabilities](product-feature-map.md) · [Security](security-model.md) · [SDK reference](reference/sdk-method-inventory.md)
