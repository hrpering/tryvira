# AI setup prompt — MCP

```text
Integrate the published Vira MCP package @tryvira/mcp.
Inspect the current MCP host configuration first; do not invent paths or Vira tools.
Use: npx -y @tryvira/mcp
Configure required VIRA_API_URL, VIRA_API_KEY, VIRA_MCP_AUTH_TOKEN and organization/project/environment scope through the host's secure env mechanism.
Then initialize MCP, call tools/list, confirm catalog, and test a read-only tool first.
Do not enable effectful shortcuts in production.
Do not assume SDK-only methods such as connectOnce, Teach evidence, or response-quality evaluation exist as MCP tools.
Return host/config detected, minimal patch, security notes, read-only verification, expected tools/list result, next step only if verification succeeds.
```
