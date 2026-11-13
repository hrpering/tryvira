# Pack examples · Beginner to advanced

These are **complete inspectable source examples**, not pre-released customer behavior or successful model benchmarks.

| Level | Pack | Learn |
| --- | --- | --- |
| Beginner | [Recipe preferences](recipe-preferences/README.md) | Make a real requirement repeatable without destroying answer usefulness |
| Intermediate | [Retail media evidence](retail-media-review/README.md) | Turn evidence comparability and uncertainty into operational behavior checks |
| Advanced | [Operations orchestration](operations-orchestration/README.md) | Three distinct tasks, a structured Strategy, and AUTO/COMPOUND/HYBRID eligibility conditions |
| Earlier minimal example | [Marketing starter](marketing-starter/README.md) | Minimal manifest and collection layout; **not** the recommended quality bar |

The new examples include **explicit post-model `checks`**. Domain-specific `judge: ...` checks require a configured verifier extension and cannot be claimed as passed from the source files alone. See [runtime verification](../../docs/runtime-verification.md) and the [Observe → Signal → Teach walkthrough](../observe-signal-verify/README.md).

Every new pack uses a **YAML manifest** and JSON collection files. This is a supported mixed ZIP structure: the import parser reads `pack.yaml` plus `semantic-tasks/items.json`, `behavior-points/items.json`, etc. The JSON is machine-readable and avoids claiming that a one-line example is a complete behavior.

### Where do you fill things in?

Read the [field-by-field Pack authoring guide](../../docs/pack-authoring-guide.md) and [canonical TaskRun usage](../../docs/canonical-taskrun.md). Configuration variables live in the manifest, semantic matching in the Tasks, requirements in Points, executable intent/verification in Programs, ordered execution in Strategies, and tests in `tests/cases.json`.

### Quality and scope

`tests/cases.json` is *design-time evaluation input*. It is deliberately ignored by the Pack importer and **does not** count as a PASSED server evaluation. Even a valid ZIP is only a candidate until install, evaluated evidence, human approval and explicit release. Model/provider integration and receipts are separate live-runtime concerns.

## Build ZIPs that follow the actual Pack import parser

From repository root:

```bash
npm run verify:packs
python3 scripts/package-example-packs.py --out /tmp/tryvira-example-packs
```

This creates one ZIP per sample with `pack.yaml` and supported collection files such as `behavior-programs/items.json`, **excluding** README and `tests/cases.json` fixtures. The ZIPs are import candidates, **not released behavior**. Import only through an authorized customer environment, then inspect materialization, evaluate, approve and release separately. `npm run verify:packs` performs structural and ZIP smoke checks, not actual server-side materialization or live execution.
