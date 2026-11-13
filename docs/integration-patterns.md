# Integration patterns: observe first, then run through AUTO TaskRun

## Pattern A: Observe-only adoption

```text
existing model or agent → regular host/provider result
                       ↘ permitted Observe events → Signal/Teach candidate evidence
```

This is useful when the team first wants to understand errors, human corrections, tool attempts, costs or incident patterns. Observe is evidence collection: **it does not modify the model's instructions, auto-approve a Signal or release behavior**.

[Observe](observe.md) · [Signals](signals.md) · [Teach](teach.md)

## Pattern B: canonical governed chatbot / agent

```text
request → AUTO TaskRun → scoped semantic resolve → eligible mode dispatch
        → real child executor → released runtime behavior enforcement
        → authorized model / tool host → actual post-model verification
        → persisted matching receipt → eligible final-answer handoff
```

The application must submit to the server-owned TaskRun boundary. It must not imitate authorization by selecting a Behavior Point or constructing model instructions from a direct projection response. The public example currently returns admitted/readback state, not an invented verified provider answer.

[Canonical TaskRun](canonical-taskrun.md) · [Runtime verification](runtime-verification.md) · [Verified answer contract](verified-answer-handoff.md)

## Pattern C: effectful tool/action gate

```text
agent proposes side effect
  → host/tool capability + scope + release policy
  → required pre_tool / pre_action decision
  → allow with a real execution receipt, or deny / escalate / require approval
```

The host owns real external-effect permissions and must honor the runtime decision. Read-only guidance does **not** authorize a payment, refund, budget change or data deletion. Failure to obtain required authorization should block, not silently bypass.

## Pattern D: Teach and outcome loop

```text
permitted observations + actual feedback / outcome attribution
 → Signal mapping and evidence review when needed
 → Teach / discovery proposal → candidate evaluation / regression checks
 → separate human review / promotion / release
 → governed runtime → receipts → new permitted observations
```

Teach's analysis may be asynchronous. A queued analysis is not a completed revision; a promoted proposal is not necessarily an approved production release.

## Pattern E: advanced diagnostic only

`resolveRuntime`, `executeRuntime` and `behavior-projection` may be used to inspect an eligible artifact or diagnose an SDK/host integration. A rendered projection alone is **not** evidence of AUTO task dispatch, provider execution or post-model verified delivery. Do not build another product-facing chatbot path around these APIs.

## What to report from every pattern

Keep distinct: accepted observation ID, any Signal definition/version and source mapping, Teach evidence/analysis/proposal, candidate evaluation/release, TaskRun and children, provider output, actual verifier check result and receipt. A record that is not returned by the connected system should be marked **unavailable** rather than synthesized.

[Feature map](product-feature-map.md) · [Status](product-status.md) · [Capabilities](capability-discovery.md)
