# MCP tool catalog

This registry-synchronized catalog is generated from the latest published `@tryvira/mcp@0.1.44` package. The installed server's `tools/list` response remains authoritative at runtime.

Do not infer MCP support from an SDK method or API route. Tool schemas can change between package releases.

## Published package tools

| Tool | Access | Package description |
| --- | --- | --- |
| `list_capabilities` | Read | List capabilities available to this API key. |
| `list_semantic_tasks` | Read | List Semantic Tasks in the API key scope. |
| `list_behavior_points` | Read | List BehaviorPoints in the API key scope. |
| `list_behavior_programs` | Read | List behavior programs in the API key scope. |
| `list_behavior_strategies` | Read | List behavior strategies in the API key scope. |
| `resolve_semantic` | Read | Resolve text using Vira semantic routing. |
| `resolve_runtime` | Effectful | Resolve a BehaviorPoint through the governed runtime. |
| `create_semantic_task` | Effectful | Create a Semantic Task for review in the API key scope. |
| `create_behavior_point` | Effectful | Create a BehaviorPoint in the API key scope. |
| `submit_teach_evidence` | Effectful | Submit consented evidence to the Teach lifecycle. |
| `create_teach_proposal` | Effectful | Create a Teach proposal from admitted evidence. |

## Surface boundaries

The current package does not include these complete tool groups:

- Pack lifecycle
- Teach proposal transitions
- Behavior Evaluation
- Strategy execution
- Response Quality & Decision
- Release creation

Use the SDK, Python SDK, or HTTP API when the required operation is absent from this catalog.

The package uses the schemas shown by its live MCP server. Discover each installed tool's current schema with `tools/list`; do not invent fields. Effectful tools require an allow decision from the configured authority endpoint.

See [MCP integration](mcp.md), [Capability discovery](../capability-discovery.md), [Published packages](../published-packages.md), and [Packs](../packs.md).
