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

**The three new examples intentionally omit `variables` because the public source examples do not demonstrate a reliable variable-to-Program binding.** A declarative toggle that does nothing is worse than leaving a setting out.

The supported Pack ZIP importer groups collection files using these collection-folder names. **These files are JSON on purpose:** JSON collection inputs and YAML manifests are both supported. Do not assume an arbitrary root-level `behaviors:` YAML field will be materialized. If your product release exposes a newer single-file authoring format, validate it against that release's own schema instead of translating by guesswork.

## Field-by-field decisions

| File / field | Fill it with | What makes it good | Common mistake |
| --- | --- | --- | --- |
| `pack.yaml.id` | Lowercase stable dotted identifier | Unique, durable across versions | Renaming it for every edit |
| `version` | Semantic version of the Pack content | New version when executable behavior changes | Rewriting a released artifact in place |
| `variables` (optional) | Typed install inputs with a proven binding | Include only when the actual runtime maps values into executable behavior | A cosmetic checkbox that does not change rules |
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
| `modules[].checks` / `checks[].requirement` | Supported deterministic check syntax, or an explicitly configured policy/rubric/judge extension | Actual output test and visible failure | Treating a natural-language requirement as automatically executable |
| `modules[].stage` | pre_model / pre_tool / post_model / pre_action | Match the decision moment | Post-model check passed off as pre-tool authorization |
| `verification.onFailure` | repair / rerank / escalate / block | Bounded reaction to failed check | Infinite implicit repair loops |
| `behaviorStrategies` | Explicit graph of steps/edges/state/policies/budget | Only for a genuinely multi-stage task | Renaming a long list into a Strategy |
| `evaluations` | Evaluation inventory ID | Stable reference for real later evaluation | Fake `passed: true` inside a Pack |
| `tests/cases.json` | Short inputs + expected criteria + failures | Positive, negative, boundary, missing-data, authorization cases | Treat fixtures as persisted evaluation receipts |

## Minimum viable strong Program

The **Point** answers *what must be true*. The **Program** answers *how to check and respond*. A Pack's `signals/items.json` lists **required Signal references**, not automatically approved producer mappings or live values. [Signal lifecycle](signals.md) · [Observe evidence](observe.md). The Program example includes concrete check syntax:

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
      "requirement": "Check whether the metrics are comparable before a budget recommendation.",
      "checks": [
        {"stableKey": "retail.compare_campaign_evidence.non_empty", "requirement": "verifier:output.non_empty"},
        {"stableKey": "retail.compare_campaign_evidence.domain", "requirement": "judge: Confirm each recommendation is supported by the supplied metric definitions and attribution windows."}
      ],
      "onFailure": "block"
    }
  ]
}
```

This is an **illustration drawn from the intermediate example**, not a live PASS receipt. `verifier:output.non_empty` is a supported narrow deterministic check. `judge: ...` needs an explicitly configured model-judge extension; **without it, the check must fail closed**. Unstructured prose like “check the numbers” is *not* automatically verified by the default verifier. Even a supported verification module must run at a real host/provider boundary. [Runtime verification](runtime-verification.md).

## Evidence to include with a serious Pack

Document how the connected AI System emits permitted **Observe** events; which **Signal** definitions and approved producer mappings (if any) the behavior needs; which **verification modules** can really execute at the host's post-model boundary; the exact repair/block behavior; and how to retrieve the matching receipt. A passing source-level structure check is not proof of these things.

The beginner, retail and operations Packs intentionally require a **configured domain judge extension** for the semantic checks. These are **authoring references and install candidates**, not plug-and-play guarantees of quality or live verifier support. See [Observe → Signal → Runtime walkthrough](../examples/observe-signal-verify/README.md).

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

- `npm run verify:packs`: structural lint plus an in-memory **ZIP packaging smoke check**, not a server materialization proof.
- `python3 scripts/package-example-packs.py --out /tmp/tryvira-example-packs`: build import-ready ZIP candidates of the three examples. The script excludes `tests/cases.json` and docs; the real backend still must parse and materialize the archive.
- `npm run verify`: repository-level links, examples, Skills and safety checks.
- After release, the [guarded AUTO TaskRun tutorial runner](../tutorials/marketing-agent/11-auto-taskrun.mjs) can submit a live admission. It does **not** assert a provider/verifier result.
- In an authorized dev account: import, inspect conflicts, install, read back persistent materialization, attach a real PASSED evaluation for the immutable Pack digest, approve, release, exercise AUTO TaskRun and inspect receipts. Do not supply a client-built `score` or `passed` flag.

[Pack API lifecycle](packs.md) · [Developer checklist](developer-checklist.md) · [Execution modes](execution-modes.md)
