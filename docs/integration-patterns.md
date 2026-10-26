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

## Keep one authority path

Do not recreate private Vira authority inside an SDK wrapper, MCP client, or custom adapter.
