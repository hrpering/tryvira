# MCP client: real Vira server discovery

Requires Node.js 20+. Install the locked MCP client dependencies, then configure the host with the real Vira API URL, scoped credential, and any authority settings required by your deployment. Pin and review the published MCP server version before running it.

```bash
npm ci
export VIRA_MCP_COMMAND=npx
export VIRA_MCP_ARGS='--yes @tryvira/mcp@0.1.44'
npm start
```

The client starts the configured server over stdio, initializes a real MCP session, and reads the server's current `tools/list`. It does not assume that JavaScript/Python SDK methods exist in MCP. To call a discovered tool, set `VIRA_MCP_TOOL` and `VIRA_MCP_ARGUMENTS` to the actual advertised schema. Review its access annotation and require explicit host/operator approval for effectful or open-world tools; the example's approval flag is not a replacement for Vira authorization.

The MCP package exposes only a subset of Vira operations. Route missing operations to the documented SDK/HTTP surface. This command calls the real MCP server and requires an available, authorized Vira deployment; no live call was made while preparing this example.
