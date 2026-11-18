# OpenCode + Vira

**Integration guide, not the OpenCode plugin implementation.** The public `tryvira` repository previously contained no OpenCode plugin source. This folder provides a public, credential-free host setup example for the separately distributed `@tryvira/opencode` package. Its npm publication and exact options must be verified against the actual installed package; a copied configuration is not proof of a working adapter.

## Configure

1. Confirm the release is publicly installable with `npm view @tryvira/opencode version`. If it is not published, stop instead of substituting an internal repository/package.
2. In your own application's *private* `opencode.json(c)`, add the `@tryvira/opencode` package to the OpenCode `plugins` array. The [example config](opencode.example.json) deliberately contains no credential values.
3. Supply the real Vira deployment root and scoped organization/project/environment through the host's trusted environment/secret mechanism, following the **installed plugin version's** documented options. Never commit `VIRA_API_KEY` or a real customer scope.
4. Start OpenCode, inspect actual loaded plugins, inspect a scoped Vira connection and run a sanitized **observe-only** test first. Distinguish plugin loaded, API admitted event and applied/released behavior. A successful load does not imply successful authorization, Teach or verifier PASS.
5. Use the [root Vira Skill](../../SKILL.md) as the single agent instruction layer; the plugin is the OpenCode host adapter, MCP/SDK are separate execution surfaces. Do not attach multiple hooks that submit the same event without deduplication.

The exact OpenCode format follows the [official OpenCode plugin documentation](https://opencode.ai/docs/plugins/). OpenCode's current config uses **`plugins`** (plural) and accepts published packages or objects with `package` and `options`; do not copy a deprecated `plugin` field from an older host version.

## Limitations

This folder does **not** contain, rebuild, release or publish `@tryvira/opencode`. No private backend or unpublished plugin source is exported. A live plugin test needs the actual published package, a provisioned Vira tenant and an operator-authorized environment. If the npm package does not exist, plugin availability is **BLOCKED**, regardless of the Skill being installable.
