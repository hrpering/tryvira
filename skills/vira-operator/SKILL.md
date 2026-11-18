---
name: vira-operator
license: "Vira Agent Skill Installation & Application Use License v1.0; see LICENSE"
description: "Operate Vira directly from coding agents through its documented SDK: connect, author, import, evaluate, review, release, run, trace, and Teach without opening Studio."
---

# Operate Vira without Studio

Use this Skill when the developer wants to **operate Vira using natural language in a coding agent**, instead of clicking through Studio. Vira Operator is the **SDK-backed path when an MCP tool is absent or the host has no MCP connection**, not a competing control plane. First check the connected MCP `tools/list`; do not retry a denial through the SDK. It is not a web dashboard, substitute backend, raw HTTP proxy or new authorization layer. MCP 0.1.60 now offers `list_inbox`, `inspect_conflicts`, `resolve_conflict`, `start_optimization`, `get_optimization_run` and `cancel_optimization_run`; use those advertised tools when connected rather than claiming they are Studio-only or inventing SDK methods.

## Activate this skill when

The user asks you to create, inspect, test, approve, deploy, monitor or improve Vira behavior end-to-end; operate Packs, TaskRuns, Signals, Programs, Strategies, evaluations, receipts, Teach and application Connections; or move a Studio operation into an agent-first workflow. Delegate specialized design and validation to the relevant Vira Skills as needed.

## Inputs and preconditions

Use the developer's existing project and real Vira API deployment, not the Studio URL. Require the installed published JavaScript SDK version, a server-held VIRA_API_KEY and explicit tenant environment. Never ask the user to paste secret values into chat. Start in an isolated non-production scope. Never assume SDK, MCP, HTTP and Studio feature parity or that a declared API operation is enabled for the current tenant.

## Workflow

1. **Select one execution surface.** Discover the connected MCP catalog first where supported. Use the installed JS SDK via this Operator only for an absent operation or a host without MCP. Keep one server authority and never switch on a denial. Follow [the common operation flow](https://github.com/hrpering/tryvira/blob/main/docs/agent-first-operation-flow.md).
2. **Translate a request into an operation plan.** Identify the desired artifact, expected scope, matching published SDK methods, readback and rollback. Inspect the local operator catalog before claiming support.
3. **Perform read-only discovery first.** List systems, Tasks, Points, Programs, Packs, Strategies, capabilities and persisted states through supported read methods. Never fabricate IDs, approvals, releases or provider answers.
4. **Build the proposed behavior.** Use vira-author-behavior, vira-build-pack and vira-strategies for proper Task/Point/Program/Strategy files and meaningful tests. A Skill itself does not install a Pack.
5. **Prepare mutations explicitly.** Generate the exact SDK method argument array in a local uncommitted JSON file and run operator `plan`. Inspect scope, identity, digest, policy, permissions and effects. Do not automatically turn plan into execution.
6. **Execute only on the user's explicit authorization.** Use operator `run` with --confirm and VIRA_ALLOW_MUTATIONS=true for a mutation. High-impact transitions also need exact --ack. These flags are extra guardrails, **not** a substitute for human authorization or server role/scope/release enforcement.
7. **Read server state back.** Installation is not release; 202 is not completion; AUTO route is not TaskRun admission. Inspect persisted evaluation, TaskRun child records, receipts and actual verifier outcome before making claims.
8. **Continue the full lifecycle.** Observe consented evidence, run Teach, review/change a candidate, evaluate exact digest and separately approve/release. A generated improvement never silently replaces live behavior.
9. **Report parity gaps.** If a Studio-only operation has no customer SDK/HTTP contract, label it unavailable and show the exact product API gap. Do not drive undocumented /api/studio routes or synthesize methods.

## Operator CLI

Installed with this Skill at `scripts/operate.mjs`. Run from an application repository containing the published `@tryvira/sdk` dependency, Node.js 22+ and server-side Vira environment configuration.

~~~bash
npm install @tryvira/sdk
node .agents/skills/vira-operator/scripts/operate.mjs catalog --installed
node .agents/skills/vira-operator/scripts/operate.mjs doctor
node .agents/skills/vira-operator/scripts/operate.mjs plan listPacks --args ./read.json
node .agents/skills/vira-operator/scripts/operate.mjs run listPacks --args ./read.json
~~~

Use `catalog --installed` to list methods present in the installed SDK version, without needing a service credential. Unavailable operations are not executed or claimed. The static catalog is a maximum allowlist, not a guarantee of server access.

The exact installed Skill path depends on the coding agent. Point to that installed folder, not an assumed `.agents` location. `read.json` is `{"args":[]}`. Every method accepts a positional `args` array **matching the installed SDK version**, not an invented JSON API. Methods not in the allowlist and methods unavailable in the installed package fail explicitly.

For a **consequential** operation, the agent must first obtain user approval, prepare a scoped plan and only then use the opt-in flags:

~~~bash
# Authorized non-production scope and credentials are provisioned by the operator.
VIRA_ALLOW_MUTATIONS=true node <installed-skill-path>/scripts/operate.mjs run releasePack --args ./release.json --confirm --ack releasePack
~~~

A mutation can be denied by server authority even when CLI flags are present. Do not expose customer raw output, tokens, model secrets, billing data or actor identifiers in chat; default CLI summary redacts secrets and prompt content. To read content only when the authorized user needs it, set VIRA_ALLOW_CONTENT_OUTPUT=true and supply --show-content; credentials remain redacted. This displays potentially sensitive output in the terminal, so use a trusted environment and never copy it into logs or public demo recordings.

## Product boundary and unsupported operations

The CLI covers the allowlisted JavaScript SDK surface only. Some Studio workspace operations, billing, member management, credential profiles, conflict resolution, some optimization/dataset flows and administrative security settings are still **not** documented as customer SDK operations. The [Studio-less capability matrix](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/studio-less-parity.md) identifies these gaps. They need first-class public API/SDK/MCP implementation and tests before this Skill can execute them without Studio.

## Deliverable and failure handling

Return the chosen Skill, exact operation plan, scope, methods invoked, persisted readback, actual receipt IDs, unresolved authorization, audit and rollback considerations. Distinguish read-only inspection, dry-run plan, server-accepted mutation and fully verified completed action. On unsupported method, unknown tenant, missing approval, missing check, denied release, stale state, missing connection or absent final output verification, stop rather than pretending a Studio operation occurred.

## References

- [SDK capability guide](https://github.com/hrpering/tryvira/blob/main/docs/reference/javascript-sdk.md)
- [Operator capability matrix](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/studio-less-parity.md)
- [Full lifecycle](https://github.com/hrpering/tryvira/blob/main/skills/vira-full-lifecycle/SKILL.md)
- [Pack lifecycle](https://github.com/hrpering/tryvira/blob/main/skills/vira-packs/SKILL.md)
- [Runtime and tools](https://github.com/hrpering/tryvira/blob/main/skills/vira-runtime/SKILL.md)
- [Teach](https://github.com/hrpering/tryvira/blob/main/skills/vira-observe-teach/SKILL.md)
