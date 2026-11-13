# Python SDK

**Current package:** [`tryvira-sdk`](https://pypi.org/project/tryvira-sdk/) `0.1.44`

**Runtime:** Python 3.10+

**Install:** `python -m pip install tryvira-sdk==0.1.44`

The published PyPI package is the authoritative source for current method signatures and request/response types. This repository's public integration guidance intentionally avoids reproducing low-level operation schemas. Read the published package documentation for the version installed by your application.

## Configure a customer-owned Vira deployment

Set `VIRA_API_URL` to the API deployment URL supplied for the customer's Vira account. It is not the application's backend URL or the Studio URL. Keep `VIRA_API_KEY` and scope identifiers in server-side environment or secret storage. Never commit real credentials, expose keys to browser code, or print secrets in logs.

Use an isolated development scope when the customer's account provides one. Production changes require the customer's authorization and controls.

## Integration approach

1. Confirm the installed PyPI version and read its matching public documentation.
2. Configure the customer's endpoint and scoped credentials using a server-side secret mechanism.
3. Check that the operation exists in the installed package before using it.
4. Keep evidence collection, candidate review, evaluation, approval, release, and runtime use as separate governed steps.
5. Preserve returned identities and read persisted state before continuing asynchronous work.
6. Handle failures without logging credentials or private user content.

Python and JavaScript package capabilities may differ. Do not infer Python support from a JavaScript method or from MCP/HTTP naming. Consult the installed package and [capability map](../capability-map.md).

## Related resources

- [Published package versions](../published-packages.md)
- [JavaScript SDK](javascript-sdk.md)
- [MCP catalog](mcp-tools.md)
- [HTTP integration guidance](api.md)
- [Customer-runnable Python framework examples](../../examples/frameworks/README.md)
- [Agent Skills](../../skills/README.md)
