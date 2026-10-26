# Evaluation and approval

Behavior changes should be tested before release.

## Evaluation API

```text
POST /v1/evaluations
GET  /v1/evaluations/{evaluationId}
```

## Conceptual evaluation input

```json
{
  "id": "eval-marketing-launch-v1",
  "targetArtifact": {
    "behaviorPoint": "marketing.launch_plan"
  },
  "dataset": [
    {
      "input": "Create a launch plan for a subscription product"
    },
    {
      "input": "Plan the launch of a membership service"
    }
  ],
  "assertions": [
    true,
    true,
    true
  ],
  "threshold": 0.9,
  "evaluatorVersion": "public-example-v1"
}
```

Evaluation artifacts and strategy lineage are server-versioned.

## Example checks

For a public marketing example:

- full funnel is covered;
- measurement is included;
- requested format is preserved;
- no fake campaign performance is invented;
- no prohibited action is taken.

## Approval

Approval is a separate lifecycle decision from evaluation.

A passing evaluation means:

> The candidate passed the configured checks.

It does not automatically mean:

> This candidate must become production behavior.

Pack workflows include an explicit approval step before release.
