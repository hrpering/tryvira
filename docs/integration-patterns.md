# Integration patterns

## Observe-first

```text
existing agent
   ├── normal response path
   └── observation / feedback → Vira
```

Use this when you want evidence before changing runtime behavior.

## Resolve-before-model

```text
request
→ semantic resolve
→ runtime resolve
→ model / agent
→ observe
```

## Tool gate

```text
agent proposes action
→ governed runtime
→ allowed?
  ├── no → deny / escalate
  └── yes → execute
```

## Teach loop

```text
runtime
→ evidence
→ Teach proposal
→ evaluation
→ approval
→ release
→ runtime
```

## Keep one behavior-control path

Use Vira as the behavior-control layer instead of duplicating policy and release logic inside SDK wrappers, MCP clients, or custom adapters.
