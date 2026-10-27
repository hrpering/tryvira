# Strategy result modes

Vira Strategies can participate in two different output contracts.

The key design question is:

> **Who owns the final user-visible answer?**

Answer that before designing the step graph.

## `response`

Use `response` when the Strategy itself owns the final answer.

```text
model / tool steps
→ verify
→ compose
→ final response
```

Typical use cases:

- Vira is the direct execution runtime for the task;
- the Strategy is expected to return the final artifact;
- there is no downstream chatbot that should rewrite the result.

A response workflow normally includes an explicit final-output boundary and final verification when the behavior requires it.

## `behavior_plan`

Use `behavior_plan` when Vira should control **how the downstream AI behaves**, while another model/provider remains responsible for the final prose.

```text
request
→ Vira Strategy
→ compact behavior plan
→ downstream chatbot / model
→ final user-visible answer
```

A behavior plan should be bounded and request-specific. It can contain concepts such as:

- intent;
- explicit constraints;
- confirmed preferences;
- a small number of clearly labeled assumptions;
- response shape;
- safety / policy checks;
- a verification checklist.

It should **not** contain a second full answer for the downstream model to repeat.

## Why the distinction matters

Without an explicit result contract, an agent integration can accidentally become:

```text
Vira writes full answer
→ provider chatbot receives it
→ provider chatbot writes another full answer
```

That wastes latency and tokens, obscures ownership, and makes it harder to understand which layer actually controlled the result.

With a behavior-plan contract:

```text
Vira plans and constrains behavior
→ provider chatbot writes the final answer once
```

## Choosing the mode

| Question | Prefer |
| --- | --- |
| Vira should return the final artifact | `response` |
| Existing chatbot/provider should write final prose | `behavior_plan` |
| Vira is being inserted as a behavior layer into an existing agent | usually `behavior_plan` |
| No downstream generation exists | `response` |

Do not choose `behavior_plan` merely because it sounds more advanced. Choose it when there is a real downstream answer owner.

## Public execution view

A response workflow can expose the final output in the public execution result.

A behavior-plan workflow can expose a sanitized bounded plan that explains what behavior was supplied to the downstream model.

Public traces should still remain compact and should not contain secrets, private model context, or raw internal receipts.

## Authoring implications

For `response`:

- define the final artifact;
- verify before final composition where required;
- make final-output ownership explicit.

For `behavior_plan`:

- produce a bounded plan state;
- verify that the plan is request-specific and constraint-safe;
- do not produce a final-response state as a side effect;
- keep the downstream model as the only final prose generator.

See:

- [Behavior Strategies](strategies.md)
- [Authoring quality](authoring-quality.md)
- [AI Strategy authoring prompt](ai-prompts/author-strategy.md)
- [Authoring quality examples](../examples/authoring-quality/)