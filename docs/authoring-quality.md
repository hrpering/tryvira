# Authoring quality

Keep public examples small, fictional, and tied to the published SDK contract. Use
clear task descriptions, include representative inputs, and state what outcome the
example demonstrates. Verify copyable snippets against the package version named by
the repository's registry checks.

Do not include customer records, private prompts, provider configuration, internal
scoring rules, implementation limits, production traces, or credentials in examples.

For exact fields and operations, use the [JavaScript SDK reference](reference/javascript-sdk.md),
[Python SDK reference](reference/python-sdk.md), [HTTP API reference](reference/api.md),
and current [MCP tool catalog](reference/mcp-tools.md).

## Strong behavior authoring, not empty instructions

- Bind a specific Semantic Task and stable Behavior Point to a real customer use case.
- Separate requirements, program modules, source Signals, executable checks and Strategy step budgets.
- Include positive, negative, ambiguous, missing-evidence, wrong-scope and verifier-unavailable cases.
- Distinguish a plain-English `requirement` from an actual supported `checks[].requirement`. Built-in checks are narrow; semantically rich `judge: ...` criteria need a configured verifier extension.
- Require signed-off Signal producer mappings and correct scope/attestation when a guard depends on a Signal.
- Do not label a Pack PASSED based on its JSON files, nor describe an observation as verification.
- Link model/provider output and post-model receipt to the same released artifact and TaskRun before describing the final reply as verified.

[Pack Academy](pack-authoring-guide.md) · [Runtime verification](runtime-verification.md) · [Observe](observe.md) · [Signals](signals.md).
