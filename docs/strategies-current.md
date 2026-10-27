# Current Strategy model

Vira Strategies have two independent design choices:

1. **Execution mode** — `INLINE`, `STAGED`, or `AGENTIC`.
2. **Result mode** — `response` or `behavior_plan`.

Do not confuse them.

`STAGED + response` means Vira can run a staged workflow and return the final answer.

`STAGED + behavior_plan` means Vira can run a staged workflow that produces and verifies only a compact behavior plan for a downstream model.

See [Behavior Strategies](strategies.md) and [Strategy result modes](strategy-result-modes.md).