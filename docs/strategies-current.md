# Current Strategy integration

A Strategy governs **bounded steps within a task**. It is distinct from COMPOUND, which coordinates several separately governed tasks; HYBRID can mix SINGLE and STRATEGY child tasks. AUTO requests a route proposal.

Start with the [SINGLE / STRATEGY / COMPOUND / HYBRID / AUTO guide](execution-modes.md). The actual public Strategy method contracts are in the published [JavaScript SDK](reference/javascript-sdk.md) and [Python SDK](reference/python-sdk.md); direct HTTP requires the customer's documented endpoint. MCP only supports operations actually listed by its [installed tool catalog](reference/mcp-tools.md).

Strategy activation, evaluation, release and eligible runtime use remain separate. A successful route or simulation does not grant effectful permissions.
