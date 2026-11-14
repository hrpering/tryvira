# Vira capabilities

Vira helps teams define, evaluate, release and inspect how their existing AI systems respond, decide and act. The product combines two related workflows: **serving governed behavior** and **learning from observed outcomes**.

[Get started](start-here.md) · [See real examples](../examples/README.md) · [Current availability](product-status.md)

## How the workflows connect

### Serve

A request enters an **AUTO TaskRun**, which resolves eligible tasks and chooses SINGLE, STRATEGY, COMPOUND or HYBRID execution based on the released configuration and available host capabilities. The host executes authorized model/tool work through the applicable behavior and verification boundaries.

### Improve

With appropriate permission, Observe captures events and outcomes. Signals can provide reviewed, typed context; Teach can suggest improvements. Evaluation, human review and explicit release determine which revision becomes eligible for future requests.

A Teach recommendation does not publish changes automatically, and a completed TaskRun is separate from a verified final model response. The latter requires an integrated provider-output and post-model verification receipt. [Execution guide](canonical-taskrun.md) · [Verification](runtime-verification.md)

## Product areas

The table describes Vira's product areas and where to learn about them. **Availability depends on the deployed service, account permissions and integration surface.** JavaScript, Python, MCP, HTTP and Studio do not currently expose identical functionality.

| Area | What it helps with | Current integration notes | Guide |
| --- | --- | --- | --- |
| **1. Identity, organizations and tenancy** | Scope accounts, projects, environments, roles and access | Requires a provisioned workspace and appropriate permissions | [Authentication](auth-and-scope.md) |
| **2. Connect AI Systems and integrations** | Connect existing applications and agents through supported clients | Published SDKs are available; live service access is separate | [Integrations](integration-patterns.md) |
| **3. Observe and collect evidence** | Capture permitted model, tool, feedback and outcome events | Event admission is distinct from Signal review and behavior updates | [Observe](observe.md) |
| **4. Discover tasks, context and risks** | Identify tasks and potential mismatches in observed workflows | Suggestions need review and may be ambiguous | [Semantic routing](semantic-routing.md) |
| **5. Signals and context intelligence** | Supply typed, versioned, source-bound values for behavior decisions | A Signal requires an approved definition and producer mapping | [Signals](signals.md) |
| **6. Author behavior and Packs** | Define tasks, requirements, Programs and reusable Behavior Packs | Authoring and installation precede evaluation and release | [Pack authoring](pack-authoring-guide.md) |
| **7. Strategy and multi-task execution** | Coordinate single, multi-step and multi-task requests | Eligible modes depend on registered tasks and host capabilities | [Execution modes](execution-modes.md) |
| **8. Runtime authority and enforcement** | Apply released policies at supported model and tool boundaries | Only connected host boundaries can enforce behavior | [Runtime](runtime.md) |
| **9. Runtime verification and decision quality** | Check outputs and handle verification failures | Final provider-output verification/readback integration is still in development | [Verification](runtime-verification.md) |
| **10. Evaluate, govern release and rollback** | Test candidate behavior and manage approved revisions | Evaluation, approval and release are distinct actions | [Evaluation](evaluation-and-approval.md) |
| **11. Teach and continuous improvement** | Turn permitted evidence and corrections into reviewable proposals | Proposals require evaluation and authorization before release | [Teach](teach.md) |
| **12. Optimization and model/variant selection** | Explore bounded response and model-selection strategies | Advanced optimization is deployment-specific and under development | [Quality & decisions](decision-and-quality.md) |
| **13. Traces, receipts and telemetry** | Inspect execution, authority and verification evidence | Available fields depend on the actual run and client | [Traces](traces.md) |
| **14. Data, privacy and knowledge** | Handle consent, retention, provenance and scoped data access | Privacy and connector capabilities depend on deployment | [Security](security-model.md) |
| **15. Reliability, billing and operations** | Manage quotas, execution reliability and usage controls | Commercial plans and service terms are not announced by this repository | [Availability](product-status.md) |
| **16. Studio, Admin, developer platform and delivery** | Author, review and operate Vira through UI and developer tools | Some Studio/Admin workflows are limited to provisioned environments | [Integrations](capability-map.md) |

## Hardware and infrastructure

Model serving, caching, distributed execution and accelerator support are ongoing engineering areas. This repository does not publish generalized hardware-performance benchmarks or compatibility guarantees. Product capabilities are documented separately from infrastructure experimentation.

## Choosing an integration

- **JavaScript or Python:** start with the published SDK and the [developer guide](developer-guide.md).
- **MCP:** discover tools supported by your installed server using `tools/list`; see the [MCP reference](reference/mcp-tools.md).
- **HTTP:** use endpoints documented for your deployed API and authorized scope; see [API integration](reference/api.md).
- **Studio:** availability and permissions are determined by your provisioned environment.

For a specific environment, the installed client version, authenticated capability discovery and server responses determine what you can use. See [product availability](product-status.md).
