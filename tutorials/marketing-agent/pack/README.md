# Marketing tutorial Pack source

The runnable tutorial imports the source-controlled [Marketing Launch Decision Pack](../../../examples/packs/marketing-starter/README.md) directly through `05-pack-lifecycle.mjs`. This prevents the tutorial's behavior definition, checks and evaluation criteria from drifting from the public Pack Academy.

The old self-contained YAML collections are retired. The canonical manifest and JSON collections live under `examples/packs/marketing-starter/`. A run-specific suffix is applied to Task, Point, Program, Signal and evaluation IDs by the tutorial; no unbound installer variables are used.

Source fixtures and structural checks are not execution receipts. The tutorial still requires an authorized Vira service, real package contracts and a separately verified runtime answer to claim ON completion.
