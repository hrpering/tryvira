# Pack examples · Beginner to advanced

These are **complete inspectable source examples**, not pre-released customer behavior or successful model benchmarks.

| Level | Pack | Learn |
| --- | --- | --- |
| Beginner | [Recipe preferences](recipe-preferences/README.md) | Make a real requirement repeatable without destroying answer usefulness |
| Intermediate | [Retail media evidence](retail-media-review/README.md) | Turn evidence comparability and uncertainty into operational behavior checks |
| Advanced | [Operations orchestration](operations-orchestration/README.md) | Three distinct tasks, a structured Strategy, and AUTO/COMPOUND/HYBRID eligibility conditions |
| Earlier minimal example | [Marketing starter](marketing-starter/README.md) | Minimal manifest and collection layout; **not** the recommended quality bar |

Every new pack uses a **YAML manifest** and JSON collection files. This is a supported mixed ZIP structure: the import parser reads `pack.yaml` plus `semantic-tasks/items.json`, `behavior-points/items.json`, etc. The JSON is machine-readable and avoids claiming that a one-line example is a complete behavior.

### Where do you fill things in?

Read the [field-by-field Pack authoring guide](../../docs/pack-authoring-guide.md) and [canonical TaskRun usage](../../docs/canonical-taskrun.md). Configuration variables live in the manifest, semantic matching in the Tasks, requirements in Points, executable intent/verification in Programs, ordered execution in Strategies, and tests in `tests/cases.json`.

### Quality and scope

`tests/cases.json` is *design-time evaluation input*. It is deliberately ignored by the Pack importer and **does not** count as a PASSED server evaluation. Even a valid ZIP is only a candidate until install, evaluated evidence, human approval and explicit release. Model/provider integration and receipts are separate live-runtime concerns.

Run the public structural checks with `npm run verify:packs`. They check keys, references, modules, Strategy graphs and test coverage, not actual behavior execution.
