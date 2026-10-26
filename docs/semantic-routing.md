# Semantic routing

Semantic routing maps a user request to an eligible governed task.

## JavaScript

```ts
const result = await vira.resolveSemantic({
  input: "Create a launch plan for a new meal-delivery membership",
  profile: {
    domain: "marketing"
  }
});
```

## Raw HTTP

```http
POST /v1/semantic/resolve
Authorization: Bearer <api-key>
Content-Type: application/json
Idempotency-Key: semantic-request-001
```

```json
{
  "input": "Create a launch plan for a new meal-delivery membership",
  "profile": {
    "domain": "marketing"
  },
  "requestId": "semantic-request-001"
}
```

## Outcomes

A semantic resolver should support three practical outcomes:

### Select

A governed task is eligible.

```text
marketing.launch_plan
```

### Uncertain / abstain

The resolver cannot confidently select a governed target.

The application can ask for clarification, use a safe generic path, or continue without behavior-specific routing.

### No match

No registered task applies.

This is a valid product outcome.

## Important

Semantic resolution is not authorization.

A semantic result can identify a candidate task or Behavior Point.

Runtime authority still depends on the released governed state.
