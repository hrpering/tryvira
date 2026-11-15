# Vira Agent Skills: production-alignment review

Reviewed 15 November 2026. This is a public capability and evidence map, not a copy of private source code or a guarantee of product access. A Skill guides a coding assistant; it does not implement Vira's service authority.

| Product boundary | Leading public Skills | Status and remaining evidence |
| --- | --- | --- |
| Connection and scope | vira-get-started, vira-integrate-app, JS/Python Skills | Confirm installed client and authorized scope from a real Connection, never invent tenant identities |
| Semantic Task / Point / Program | vira-author-behavior, vira-build-pack | Public Pack samples cover positive and negative intent examples, staged modules and test cases; production eligibility requires server materialization and release |
| Strategy execution | vira-strategies, vira-task-runs | A configured production environment has executed staged Strategy steps. Public local checks cannot prove a provider call or final verification |
| SINGLE / STRATEGY / COMPOUND / HYBRID | vira-task-runs, vira-traces | All four modes have configured-environment acceptance evidence. AUTO requests selection; any given tenant may still lack eligible tasks or capabilities |
| Host tool/action authority | vira-runtime, vira-author-behavior | A Pack policy cannot grant host permissions; real effects require exact scope, server-attested capabilities and the appropriate approvals |
| Pack lifecycle | vira-build-pack, vira-packs, vira-release | Import, install/materialization, evaluation, approval and release are distinct transitions |
| Teach and outcome learning | vira-observe-teach, vira-observe, vira-signals | Preserve consent, conversation/episode identity, asynchronous analysis and reviewable unbound proposals |
| Evaluation and improvement | vira-evaluate, vira-evaluate-release | Quality comparison and optimization proposals are not permission to release or change canonical policy |
| Runtime checks and receipts | vira-runtime-verification, vira-traces | Persisted TaskRun/child receipt is not interchangeable with a provider-output-bound post-model PASS |
| MCP and Studio | vira-mcp, vira-studio | Discover MCP tools at runtime; Studio availability requires actual account/UI verification |

The [Studio-less parity ledger](studio-less-parity.md) identifies public SDK operations callable via Vira Operator and the administrative, monitoring and optimization features that still need product API work. Skills alone cannot turn a Studio route into an authorized public endpoint.

## Remaining gaps that documentation cannot resolve

1. **Public chatbot output handoff:** the Next.js sample shows OFF model output and ON TaskRun state. It does not expose the authenticated, verified final ON provider response. This requires an implemented and tested backend/SDK/host handoff, not a new paragraph in a Skill.
2. **Published surface differences:** MCP cannot be assumed to mirror SDK TaskRun, Pack or release methods. Studio routes are not proof of user access.
3. **Automatic Skill-selection measurement:** fixture prompts and structural tests do not prove a real coding agent selected a Skill. Show actual Skill-load evidence before publishing selection accuracy.
4. **Actual behavior quality:** a local expected-case fixture, a manually written ON answer or a COMPLETED TaskRun is not an independent OFF/ON benchmark. Use comparable provider configurations and persisted evidence.
5. **Hosted access:** public examples provide no Vira tenant, secrets, already released Pack or production permission. Keep live demo steps conditional on an authorized non-production environment.

## Safe evidence ladder

**Level 1:** an agent actually loads a Skill. **Level 2:** a candidate Pack is generated and checked locally. **Level 3:** an authorized Vira deployment returns a scoped TaskRun with real child states and receipts. **Level 4:** the actual final provider output has matching digest and post-model verification PASS. Do not describe Level 2 as Level 4.

[Recordable workflow](video-workflow.md) · [Skills](../../skills/README.md) · [TaskRuns](../canonical-taskrun.md) · [Verified-answer handoff](../verified-answer-handoff.md).
