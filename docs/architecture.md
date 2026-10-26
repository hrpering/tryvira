# Public architecture

```mermaid
flowchart LR
    A[Agent / App / MCP client] --> B[Public integration boundary]
    B --> C[Observations]
    B --> D[Semantic resolve]
    D --> E[Behavior Point]
    E --> F[Program / Strategy]
    C --> G[Teach]
    G --> H[Evaluation / Approval]
    H --> I[Release]
    I --> J[Runtime]
    J --> K[Simple trace]
    K --> C
```

## Public boundary

This diagram intentionally describes product concepts rather than private service topology.

It does not expose:

- private infrastructure;
- customer data;
- internal prompts;
- scoring formulas;
- authority digests;
- raw receipt formats;
- secret material.
