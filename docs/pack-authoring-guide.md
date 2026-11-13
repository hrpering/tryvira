# Author a high-quality Vira Pack

A Pack is a **versioned set of behavioral contracts**, not a convenient box for a long system prompt. It carries task matching, requirements, execution/verification definitions and evaluation sources together so a team can review them before deploying. Quality means **a specific, testable difference** even when a baseline model is already competent.

[Start with the beginner Pack](../examples/packs/recipe-preferences/README.md) · [Retail-media Pack](../examples/packs/retail-media-review/README.md) · [Advanced orchestration](../examples/packs/operations-orchestration/README.md)

## Folder anatomy: what goes where

```text
my-pack/
├── pack.yaml                         # identity, version, install variables
├── semantic-tasks/items.json         # task keys, aliases, positive and negative match examples
├── behavior-points/items.json        # task -> requirement / verification attachment
├── behavior-programs/items.json      # guard, judgment, transform, verify, escalation; optional modules
├── behavior-strategies/items.json    # OPTIONAL: real bounded step graph for a Strategy task
├── signals/items.json               # OPTIONAL: scoped improvement signal names
├── evaluations/items.json           # OPTIONAL: evaluation inventory references (not results)
└── tests/cases.json                  # authoring fixture; NOT imported or automatically evaluated
```

The supported Pack ZIP importer groups collection files using these collection-folder names. **These files are JSON on purpose:** JSON collection inputs and YAML manifests are both supported. Do not assume an arbitrary root-level `behaviors:` YAML field will be materialized. If your product release exposes a newer single-file authoring format, validate it against that release's own schema instead of translating by guesswork.

## Field-by-field decisions

| File / field | Fill it with | What makes it good | Common mistake |
| --- | --- | --- | --- |
| `pack.yaml.id` | Lowercase stable dotted identifier | Unique, durable across versions | Renaming it for every edit |
| `version` | Semantic version of the Pack content | New version when executable behavior changes | Rewriting a released artifact in place |
| `variables` | Typed, required or default install inputs | Only values customers genuinely configure | Assuming a declared variable automatically changes an executable rule |
| `semanticTasks.taskKey` | Canonical stable task key | Distinct work, not "general AI assistant" | Broad labels that match unrelated requests |
| `description` / `aliases` | Clear task intent and user wording | Synonyms backed by real task examples | Marketing phrases instead of matchable user language |
| `examples` / `negativeExamples` | Positive and explicitly *out-of-scope* prompts | Distinguish neighboring tasks | Only positive examples, causing indiscriminate routing |
| `behaviorPoints.key` / `taskKey` | Stable attachment point | Maps to an existing Task | Point key with no Task or ambiguous binding |
| `requirement` | Observable desired behavior | Task-specific hard requirements plus useful result | "Be helpful, professional and accurate" |
| `verification` | Inspectable condition | Points to facts or structure an evaluator can check | "Give a high-quality answer" |
| `behaviorPrograms.key` | Program linked to Point | Unambiguous Program binding | Mismatched key and orphaned Program |
| `rubric` / `antiPatterns` | Real decision rules and known failures | Domain-specific, adversarial, actionable | Generic slogans with no negative tests |
| `modules[].kind` | guard / judgment / transform / verification / escalation / rubric / example / anti_pattern | Choose an appropriate operation | Put executable effects on a rubric-only module |
| `modules[].stableKey` | Lowercase canonical unique identifier | Stable identity and diffability | Uppercase or duplicates |
| `modules[].stage` | pre_model / pre_tool / post_model / pre_action | Match the decision moment | Post-model check passed off as pre-tool authorization |
| `verification.onFailure` | repair / rerank / escalate / block | Bounded reaction to failed check | Infinite implicit repair loops |
| `behaviorStrategies` | Explicit graph of steps/edges/state/policies/budget | Only for a genuinely multi-stage task | Renaming a long list into a Strategy |
| `evaluations` | Evaluation inventory ID | Stable reference for real later evaluation | Fake `passed: true` inside a Pack |
| `tests/cases.json` | Short inputs + expected criteria + failures | Positive, negative, boundary, missing-data, authorization cases | Treat fixtures as persisted evaluation receipts |

## Minimum viable strong Program

The **Point** answers *what must be true*. The **Program** answers *how to check and respond*:

```json
{
  "key": "retail.compare_campaign_evidence",
  "rubric": [
    "Check attribution windows and sales scope before ranking ROAS.",
    "Do not invent incremental profit from attributed revenue."
  ],
  "antiPatterns": [
    "Claiming the 7-day-click and 30-day-click-plus-view metrics are directly comparable."
  ],
  "modules": [
    {
      "kind": "verification",
      "stableKey": "retail.compare_campaign_evidence.metric_claims",
      "stage": "post_model",
      "requirement": "Every budget recommendation identifies measurement compatibility and its evidence.",
      "onFailure": "repair"
    }
  ]
}
```

This is an **illustration extracted from the intermediate example**, not a claim that writing the check alone proves it passed. Select a verifier able to observe the actual claim; a missing or unavailable verifier must not result in fake success.

## What belongs in a Strategy

A Strategy needs more than prose: `schemaVersion`, `strategyKey`, `behaviorPointKey`, execution mode, goal, entry step, ordered steps and edges, typed state slots, context/evidence/tool/generation/verification/recovery policies, and strict budgets. See the [complete structured example](../examples/packs/operations-orchestration/behavior-strategies/items.json).

A **TaskRun mode** is not configured by a generic `mode` property in `pack.yaml`. Eligibility is derived from the registered tasks, materialized Strategy, host capability and released authority. **AUTO** is the normal user-facing request. It may select SINGLE/STRATEGY/COMPOUND/HYBRID or abstain.

## Quality rubric before import

1. **Specific:** you can tell exactly which failure would make this task unacceptable.
2. **Useful:** the assistant still completes the original job; it does not over-refuse.
3. **Discriminative:** positive and negative semantic examples separate adjacent tasks.
4. **Testable:** at least one boundary, contradiction, missing-evidence and unauthorized-action case exists where relevant.
5. **Governed:** no client-supplied scores, fake receipts or self-authorized release.
6. **Bounded:** model calls, retries, tools and waits have explicit limits for a Strategy.
7. **Portable:** task/point/program identity and intended behavior survive a model/provider replacement, subject to a new evaluation.
8. **Traceable:** reviewers can identify exact Pack version, task, program, candidate, evaluation and release identity.

## Install is not release

```text
archive / manifest + objects
 → import candidate / inventory / conflict check
 → configure + install into the customer's authority scope
 → confirm real materialization and persisted identities
 → evaluate the exact candidate against a persisted dataset
 → review evidence and approve separately
 → release immutable eligible behavior
 → normal application request via AUTO TaskRun
 → semantic resolve → mode dispatch → child execution / enforcement
 → provider / chatbot → post-model verification / real receipt
```

The final end-to-end response/verification handoff must be supported by the **actual connected runtime**. The public client can submit TaskRuns and read persisted state; do not infer that all response-output and verifier endpoints are available merely from those methods. See [canonical runtime guide](canonical-taskrun.md).

### How to validate

- `npm run verify:packs`: public **structural lint** for the example collections and tests, not a server materialization proof.
- `npm run verify`: repository-level links, examples, Skills and safety checks.
- In an authorized dev account: import, inspect conflicts, install, read back persistent materialization, attach a real PASSED evaluation for the immutable Pack digest, approve, release, exercise AUTO TaskRun and inspect receipts. Do not supply a client-built `score` or `passed` flag.

[Pack API lifecycle](packs.md) · [Developer checklist](developer-checklist.md) · [Execution modes](execution-modes.md)
