# AI setup prompt — MCP

```text
Integrate the published Vira MCP package @tryvira/mcp.
Inspect the current MCP host configuration first; do not invent paths or Vira tools.
Use: npx -y @tryvira/mcp@0.1.44
Configure VIRA_API_URL, VIRA_API_KEY and organization/project/environment scope through the host's secure env mechanism. The published CLI defaults VIRA_MCP_AUTHORITY_URL to `${VIRA_API_URL}/v1/mcp/authorize`; set that optional override only when your deployment uses a different authority endpoint.
Then initialize MCP, call tools/list, confirm catalog, and test a read-only tool first.
Do not enable effectful shortcuts in production.
Use the published MCP catalog: it includes evidence submission and Teach proposal creation, but not proposal transitions, Pack operations, Behavior Evaluation, Strategy activation/execution, connectOnce, or Response Quality & Decision.
Return host/config detected, minimal patch, security notes, read-only verification, expected tools/list result, next step only if verification succeeds.
```
