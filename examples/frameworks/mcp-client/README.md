# MCP host client example

Run with Node.js 20+: `npm ci && npm start`. The client starts the configured server over stdio and calls `initialize`, `tools/list`, then optionally `tools/call`. It discovers the installed catalog; it never assumes that SDK methods have MCP equivalents.

Set `VIRA_API_URL`, `VIRA_API_KEY`, and required scope variables in the host environment. For reproducibility and supply-chain review, set `VIRA_MCP_COMMAND` / `VIRA_MCP_ARGS` to a pinned, already-reviewed executable and lock the host dependency tree. The default npx invocation is convenience-only and should not be used as a deployment pin. Review tool annotations and input schemas; require explicit human/host approval for effectful tools. Never forward arbitrary model-generated arguments without application validation.
