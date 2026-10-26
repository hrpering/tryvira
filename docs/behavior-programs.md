# Behavior Programs

A Behavior Program describes the governed behavior attached to a semantic/behavior context.

Programs can contain structured modules.

## Module kinds

Public concepts include:

- `guard`
- `judgment`
- `transform`
- `verification`
- `escalation`
- `rubric`
- `example`
- `anti_pattern`

## Stages

Behavior modules may apply at stages such as:

- `pre_model`
- `pre_tool`
- `post_model`
- `pre_action`

## Example

```json
{
  "id": "marketing-launch-v1",
  "semanticKey": "marketing.launch_plan",
  "version": 1,
  "guard": "always",
  "judgment": "review",
  "transform": "preserve",
  "verification": "required",
  "escalation": "human-review",
  "rubric": [
    "Cover awareness, consideration, conversion, and retention",
    "Include a measurement approach for each stage"
  ],
  "examples": [
    "A launch plan with objectives and metrics by funnel stage"
  ],
  "antiPatterns": [
    "Acquisition-only launch plan",
    "Invented performance results"
  ],
  "modules": [
    {
      "kind": "judgment",
      "stableKey": "marketing.launch.full-funnel",
      "stage": "post_model",
      "requirement": "The plan covers the full funnel"
    },
    {
      "kind": "verification",
      "stableKey": "marketing.launch.measurement",
      "stage": "post_model",
      "requirement": "Each stage has an objective and measurement approach"
    }
  ]
}
```

Scope fields are required by the API and should match the authenticated caller's scope.

## Create via Pack

For public authoring, a Pack is usually the easiest path because it binds the program to the Semantic Task and Behavior Point and keeps the release lifecycle intact.

## Direct API

The public API exposes:

```text
GET  /v1/behavior-programs
POST /v1/behavior-programs
GET  /v1/behavior-programs/{programId}
```

Use direct API authoring only when you understand the versioned program schema.

For most integrations, prefer Packs or Studio.
