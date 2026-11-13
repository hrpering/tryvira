# Frequently asked questions

### What does “AI behavior” mean?

How an AI system responds, makes decisions and takes actions in a particular context. A behavior can define requirements, checks, escalation rules or an eligible strategy for a task. [Concepts](core-concepts.md)

### Is Vira a new model or an agent framework?

No. Vira is designed to work alongside existing models, applications and agent frameworks. The host still runs the model and tools.

### Is Vira just prompt management?

No. It covers definitions, candidate evaluation, approval, release, runtime resolution and related evidence. A prompt may be one part of a behavior, but not the entire lifecycle.

### Does Vira “learn” and rewrite production behavior automatically?

No. Teach can help turn permitted evidence into a reviewable proposal. Promotion, evaluation, approval and release remain separate authorized decisions. [Teach](teach.md)

### Does an ON response always improve quality?

No guarantee. Evaluate identical relevant cases with the same model and controlled settings. Record negative paths and regressions as well as improvements. [Team evaluation guide](for-teams.md)

### Can Vira block every external tool call?

No. The application must route the action through the supported control boundary and enforce the outcome. A bypassing code path is outside that boundary. [Security model](security-model.md)

### Are JavaScript, Python, HTTP and MCP interchangeable?

No. They have different public operations, versions and authorization scopes. Confirm the installed package's contract or the MCP server's live `tools/list`. [Capability map](capability-map.md)

### Can I try Vira today?

The client packages are published. The [Next.js chatbot](../examples/frameworks/node-next/README.md) runs in OFF mode with your provider key. Live Vira ON requires provisioned access and an eligible released behavior; general service access is not open. [Start here](start-here.md)

### Is this repo open source?

It is publicly viewable, but its [documentation/examples license](../LICENSE) is proprietary. Separately published Vira SDK/MCP packages use MIT licenses under their own distribution terms. [Packages](published-packages.md)

### Does Vira replace application security, privacy controls or human review?

No. Use customer-owned secrets and scopes, minimize evidence, enforce permissions in the host, and keep approval/release decisions explicit. [Security](security-model.md)

### Where can I get help or report a bug?

[Support](../SUPPORT.md) explains reproducible public issues. Report security vulnerabilities privately using [SECURITY.md](../SECURITY.md).
