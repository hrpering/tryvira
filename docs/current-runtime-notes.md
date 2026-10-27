# Current runtime architecture notes

This page records public-facing runtime changes that materially affect how Vira should be understood and authored.

## Strategy output ownership

Current Strategy design supports two result contracts:

- `response`: the Strategy owns the final user-visible answer;
- `behavior_plan`: the Strategy produces a compact, verified behavior plan and a downstream chatbot/provider owns final prose.

For integrations where Vira is added to an existing chatbot, `behavior_plan` is usually the cleaner architecture because it avoids two models independently drafting the same final answer.

See [Strategy result modes](strategy-result-modes.md).

## Preference-aware behavior

Preferences that belong to the user should remain user-owned state, not hard-coded Strategy constants.

A preference-aware behavior should:

- use explicitly stated or previously confirmed preferences;
- preserve unchanged preferences across relevant requests;
- replace a preference when the user changes it;
- stop applying a preference when the user removes it;
- avoid inventing missing preferences;
- label proposed defaults or scenarios as hypotheses rather than facts.

This principle applies to things such as target audience, geography, budget, channel preference, tone, constraints, timeframe, and success metrics.

## Runtime observability

Provider execution can expose useful timing dimensions such as first-token time, decode duration, and output throughput where the selected provider makes those measurements available.

These metrics are operational evidence. They do not replace behavior evaluation or release gates.

## Accelerator direction

Vira is also exploring a same-device accelerator path where governed behavior execution can sit closer to model inference.

That work is experimental and must preserve CPU/runtime parity before promotion.

See [GPU acceleration vision](gpu-acceleration-vision.md).