# OpenCode + Vira

This is a **public integration guide** for the separately published `@tryvira/opencode` package. It does not contain the plugin implementation or private Vira server.

**Version check:** the maintained plugin source and the last recorded registry readback report **`@tryvira/opencode@0.1.76`** on 27 November 2026. The earlier public guide referenced `0.1.61`. Start in `observe`, confirm actual host lifecycle hooks and connection evidence, then consider `enforce` only after a supported interception path and server-owned approval checks are demonstrated. Recheck `npm view @tryvira/opencode version` and the installed package when upgrading; this does not prove a live OpenCode/Vira host integration. See [integration compatibility](../../docs/integration-compatibility.md).

## What the plugin does

The inspected integration implements the OpenCode V2 host lifecycle, with a `server()` compatibility transport for OpenCode 1.19.x. These transports are host-version dependent; don't assume an arbitrary installed OpenCode exposes both.

- **`context`:** resolves applicable semantic/released behavior for a primary agent request (including supported continuations) and attaches an eligible projection once to the outgoing request. It does not replace the underlying model/provider.
- **`execute.before`:** may enforce an exact server-authorized tool proposal in `enforce` mode, **only** when the host can intercept a tool *before* side effects and can prevent execution. An `ALLOW` needs matching decision and authority receipt digests; denial, missing binding, expired authority and mismatched arguments fail closed.
- **`execute.after`:** submits an observation of the actual tool result; failed tools are failures, not successes.
- **`fork` / compaction / expiry:** invalidates or constrains session-bound behavior context rather than reusing stale authority.
- **Optional evidence:** when the host exposes an assistant message in a context event, `conversation.output` may be recorded best-effort. Supported feedback and outcome host events can produce separate minimized signals; these observations do not teach or release behavior by themselves.

**Limit:** the verified OpenCode V2 server hooks do **not** support a response-before-display interception point. This adapter cannot claim that it blocked, repaired or verified a model answer before an already-streamed response reaches the user.

## Start with observe mode

Install the version currently available in npm through OpenCode's native plugin mechanism, or add the package to your application's `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "@tryvira/opencode",
      "options": { "mode": "observe" }
    }
  ]
}
```

[Copyable credential-free example](opencode.example.json). The OpenCode configuration key is **`plugins`** (plural), with either a published-package string or an object containing `package` and `options`. The [official OpenCode plugin guide](https://opencode.ai/docs/plugins/) documents the host configuration syntax.

The plugin accepts its supported options or these **host-managed server environment** variables:

| Variable | Purpose |
| --- | --- |
| `VIRA_CONTROL_URL` | Customer Vira API deployment root, not the Studio UI |
| `VIRA_API_KEY` | Server-held credential; never put a live key in a checked-in JSON file |
| `VIRA_ORGANIZATION_ID`, `VIRA_PROJECT_ID`, `VIRA_ENVIRONMENT_ID` | Exact tenant/project/environment scope bound to the credential |
| `VIRA_AI_SYSTEM_ID`, `VIRA_CONNECTION_ID` | Actual Vira system/connection identity |
| `VIRA_HOST_MODE` | `off`, `observe`, or `enforce` |
| `VIRA_HOST_TIMEOUT_MS` | Bounded host request timeout, default 30 seconds and capped at 120 seconds in inspected source |
| `VIRA_ADAPTER_VERSION` | Stable adapter protocol identifier, normally `1`; **not** the OpenCode application version |

For local loopback-only development, `VIRA_ALLOW_INSECURE_LOCALHOST=true` may be permitted by the package; production API endpoints must use HTTPS. Don't copy a developer's real keys or identifiers into public issues, prompts, recordings or examples.

## Mode behavior

| Mode | Expected behavior | What it does not provide |
| --- | --- | --- |
| `off` | Pass-through with no Vira network calls | Observe, governance or enforcement |
| `observe` | Discover/context and evidence collection without blocking normal tool execution | An enforced tool allow/deny decision |
| `enforce` | Strict pre-tool authorization where the host advertises interception and prevention capability and exact Vira authority can be resolved | A blanket permission grant; a verified post-model/pre-display output hook |

In `enforce` mode on a capable OpenCode V2 host, the plugin can use native `permission.evaluate`: the host asks the customer for permission for the **exact** proposed effect, then creates a **server-owned, single-use** approval bound to the action. `permissionMode: "deny"` disables this bridge, leaving approval-required actions blocked. Do not put a `confirmed: true` value or a callback into JSON options and call it consent. A host without native approval or pre-tool interception **must not** claim equivalent enforcement.

## Verification workflow

1. Check the installed OpenCode host version, published `@tryvira/opencode` version and effective plugin configuration. Use `opencode plugin list` where the installed host supports that command.
2. Establish scoped Vira connection IDs and keep credentials in the server/host secret store. Use an authorized **test** tenant and `observe` first.
3. Confirm the host loaded the plugin and inspect an **actual admitted observation and corresponding trace**. Loaded is not connected; connected is not enforced.
4. For `enforce`, first verify interception/prevention capabilities and the proper session-bound server context. Test a harmless authorized tool and an intentionally denied tool separately. The denied tool must not execute.
5. Where native permission evaluation exists, exercise approval, denial, expired/replayed approval and changed-argument cases. Confirm the **actual server receipt/digests**, not just an OpenCode UI prompt.
6. Check fork, compaction, timeout and failed-tool observations. Report post-model-before-display verification as **unsupported** unless a separately verified host integration provides that boundary.

Use the [root Vira Skill](../../SKILL.md) for lifecycle decisions. The plugin is a host adapter; MCP and SDK are separate client surfaces of the same Vira authority. Avoid duplicate observation hooks without a deduplication plan.

## Troubleshooting

- **Plugin load failure:** verify the released npm version, host compatibility and effective `plugins` configuration. A local `plugins/` folder beside `opencode.jsonc` is not automatically discovered; use an explicit path or OpenCode's documented plugin directory.
- **No observation:** check host mode, API URL, authorized scope/IDs and transport status; don't equate a log line to successful server persistence.
- **Enforce blocks everything:** inspect host capabilities, exact server-issued execution/context binding, registered tool proposal, authority digest, one-use approval and timeout. Do **not** bypass through a direct SDK tool invocation.
- **Response still shown:** output interception is not offered by the verified host boundary. Tool pre-execution authorization is a different guarantee.

This repository cannot run a live OpenCode/Vira customer-scope test without an authorized host and environment; a source inspection or npm listing is not that test.
