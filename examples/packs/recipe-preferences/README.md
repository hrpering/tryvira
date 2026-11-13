# Recipe Preferences Pack · Beginner

An understandable first Pack: **keep a task-specific dietary requirement consistent without reducing the answer to a generic refusal**.

**Start from:** [Pack guide](../../../docs/packs.md) · [Field-by-field walkthrough](../../../docs/pack-authoring-guide.md) · [Canonical AUTO TaskRun](../../../docs/canonical-taskrun.md).

| File | Purpose |
| --- | --- |
| `pack.yaml` | Stable package identity, version and installer-configurable variables |
| `semantic-tasks/items.json` | What requests should match, with positive and negative routing examples |
| `behavior-points/items.json` | Where the task's hard requirements are attached |
| `behavior-programs/items.json` | Concrete guards, checks, failure handling and useful output criteria |
| `signals/items.json` | Names for permitted improvement signals |
| `evaluations/items.json` | Evaluation inventory reference, **not** a passing test result |
| `tests/cases.json` | Four design-time test inputs, including missing information and conflicts |

## How to adapt

This sample deliberately has **no installer variables**: the baseline dietary requirements are explicitly declared in the Point and Program, while servings come from the user's task input. To change the default diet, review the Point, Program and fixtures together and create a new version. **Do not add a `vegetarian: false` variable unless the materialization and runtime actually bind it to the executable requirement.**

Keep Task and Point keys stable across revisions; change the semantic version when the behavior contract changes. Do not add an invented model response or score to this Pack.

## What Runtime Verification actually requires

The Program includes a deterministic non-empty check plus domain-level `judge: ...` checks to distinguish actual forbidden ingredients from harmless explanations mentioning them. These **require an explicitly configured verifier extension**; otherwise they cannot be considered passing. `onFailure: repair` also requires a bounded available candidate/repair implementation. [Runtime verification](../../../docs/runtime-verification.md) · [Signal lifecycle](../../../docs/signals.md).

## What a meaningful test proves

The positive test verifies useful cooking output **and** the prohibition. The negative tests target excluded ingredients, conflicts and hallucinated pantry facts. `tests/cases.json` is an authoring fixture, not an evaluation receipt. Only a real account with the reviewed candidate, persisted evaluation and explicit release can participate in the ON TaskRun path.

**Execution note:** Normal users send a prompt through **AUTO TaskRun**. This Pack does not mandate a user-facing SINGLE switch.
