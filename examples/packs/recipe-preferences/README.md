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

Set `serving_count` at install (as text, e.g. `"4"`), review `vegetarian` and `onion_free`, then update the Point and Program together if your requirement differs. **Installer variables are configuration inputs; a Pack must be checked for whether and how they are referenced by executable rules. Do not assume declaring a variable automatically changes a Program.**

Keep Task and Point keys stable across revisions; change the semantic version when the behavior contract changes. Do not add an invented model response or score to this Pack.

## What a meaningful test proves

The positive test verifies useful cooking output **and** the prohibition. The negative tests target excluded ingredients, conflicts and hallucinated pantry facts. `tests/cases.json` is an authoring fixture, not an evaluation receipt. Only a real account with the reviewed candidate, persisted evaluation and explicit release can participate in the ON TaskRun path.

**Execution note:** Normal users send a prompt through **AUTO TaskRun**. This Pack does not mandate a user-facing SINGLE switch.
