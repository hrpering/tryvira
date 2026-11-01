# Packs

Packs are Vira's bulk authoring input format. They move related governed resources together without creating a second authority path.

A Pack import is a candidate. It is **not** an activation event.

## Governed lifecycle

```text
import
→ parse / validate
→ inventory / conflicts
→ configure variables
→ install / materialize draft
→ evaluate
→ approve
→ release
→ runtime
```

Import, parsing or successful installation never silently makes behavior runtime-eligible.

## Supported input shapes

The current Pack boundary can ingest:

- `pack.yaml`, `pack.yml`, or `pack.json` manifests;
- ZIP archives containing a manifest and collection folders;
- JSON/YAML collection files inside a ZIP;
- XLSX workbooks whose sheets become collection candidates, such as Behavior Points, Rules, Examples or Policies.

Parsing stays separate from Vira authority. No archive/parser can bypass scope, policy, approval, evaluation or release.

## Manifest example

```yaml
id: vira.marketing.starter
name: Marketing Starter
version: 1.1.0
requires:
  vira: ">=1.0"
variables:
  - key: brand_name
    label: Brand name
    required: true
  - key: markets
    label: Markets
    type: multi_select
  - key: approval_required
    label: Require approval before media changes?
    type: boolean
    default: true
```

See [`examples/packs/marketing-starter/`](../examples/packs/marketing-starter/).

## What a Pack can contain

A Pack may carry related authoring collections such as:

- Semantic Tasks;
- Behavior Points;
- Behavior Programs;
- Strategies / variants;
- policies;
- signal keys/mappings;
- Teach/evaluation material where supported by the current contract.

The exact accepted collection inventory is server/version owned. Use the import response and scoped capability discovery rather than assuming every deployment accepts every collection type.

## What installation does

Installation is canonical materialization, not merely a Pack row changing status.

When the scoped canonical repositories are available, installation can resolve variables and materialize the corresponding Semantic Task, Behavior Point, Behavior Program, Strategy/variant, policy and immutable revision records. The server persists digest-bound materialization/receipt data and returns runtime revision identity where applicable.

Evaluation, approval and release remain separate steps after materialization.

## JavaScript SDK lifecycle

```ts
const imported = await vira.importPack({
  manifest: {
    id: "vira.marketing.starter",
    name: "Marketing Starter",
    version: "1.1.0"
  },
  objects,
  idempotencyKey: "pack:import:vira.marketing.starter:1.1.0"
});

const packId = String(imported?.body.pack?.id ?? "");
if (!packId) throw new Error("PACK_ID_MISSING");

await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"],
  approval_required: true
});

await vira.evaluatePack(packId, {
  passed: true,
  score: 1,
  runId: "example-eval-001"
});

await vira.approvePack(packId);
await vira.releasePack(packId);
```

The exact response fields are versioned by the server. Preserve returned request IDs and receipts rather than rebuilding authority state in the client.

## Python lifecycle

The equivalent Python methods are:

```text
list_packs
import_pack
install_pack
evaluate_pack
approve_pack
release_pack
preview_pack_upgrade
```

## MCP lifecycle

Use `tools/list` to discover the current Pack tools advertised by the scoped MCP server. Effectful Pack operations remain authority-gated.

## What “verify a Pack” means

There is intentionally no client-side `verifyPack()` shortcut that can declare a Pack safe for production.

Verification is the governed sequence:

1. **Parse/import** the candidate.
2. **Validate** manifest and collection structure.
3. **Inspect inventory/conflicts** before applying changes.
4. **Configure** required variables.
5. **Install/materialize** canonical draft objects.
6. **Evaluate** the materialized candidate and critical regressions.
7. **Approve** when the current policy/workflow requires it.
8. **Release** the exact approved identity.
9. **Resolve at runtime** and keep receipts/traces.

If any step fails, do not skip forward by editing status locally or constructing a fake release identity.

## Upgrade preview

Use `previewPackUpgrade` / `preview_pack_upgrade` before changing an installed Pack. Upgrade preview should preserve customer override keys and report conflicts before an update is applied.

## Pack publishing checks are different

`npm pack --dry-run` / package `pack:check` validates the distributable npm client package. It is unrelated to Vira Pack governance. The identical word “pack” doing two jobs was apparently deemed acceptable by civilization, so the docs spell out the distinction.

## Security

Do not place secrets, customer IDs, production traces, private endpoints, or real credentials in Pack examples committed to a public repository. Use synthetic IDs and placeholder values.
