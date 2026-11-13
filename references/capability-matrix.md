# Public integration surface guide

Vira can be integrated through the JavaScript SDK, Python package, HTTP API, MCP, or Studio where the customer's account supports those options. Their capabilities are not identical and may change across releases and scopes.

| Customer goal | Where to check | Notes |
| --- | --- | --- |
| Connect an application and configure its scope | The installed SDK guide or customer deployment reference | Use the customer's own endpoint and server-side credentials |
| Observe and review behavior | The installed client guide and evidence policy | Send only permitted, minimized data |
| Define or select governed behavior | The installed client guide and authoring reference | Keep semantic selection separate from authorization |
| Complete the Teach improvement loop | The Teach product guide and installed client guide | Evidence, analysis, human review, evaluation, release, and runtime learning are distinct |
| Prepare or operate a Pack | The Pack guide and installed client guide | Check persisted state before moving between stages |
| Evaluate, approve, or release behavior | The installed client guide and applicable customer process | Separate each authorized decision |
| Apply behavior and inspect runtime results | The runtime guide for the installed client | Verify returned identity and runtime evidence |
| Use MCP | The installed MCP package and server `tools/list` | Do not infer support from SDK or HTTP naming |
| Navigate Studio | Current product guidance and authorized account access | UI workflows have not been verified here |
| Integrate with an application framework | The framework example and its published client docs | Examples do not imply a dedicated Vira adapter |

The current public packages and references are indexed in [published packages](../docs/published-packages.md), the [JavaScript guide](../docs/reference/javascript-sdk.md), [Python guide](../docs/reference/python-sdk.md), [HTTP integration guidance](../docs/reference/api.md), and [MCP guide](../docs/reference/mcp-tools.md). Always consult the documentation matching the installed package and customer's scope.

## Governed lifecycle

```text
connect
→ observe permitted behavior
→ define or select a candidate
→ review and evaluate
→ separately authorize approval or release
→ apply at runtime
→ inspect the result
→ continue through a new reviewed cycle
```

A semantic match, Teach suggestion, Pack installation, or passing evaluation does not itself authorize production behavior. Direct source-code integration is not a supported customer surface; use published clients or documented customer-facing interfaces.
