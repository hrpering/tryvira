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

Canonical materialization may run asynchronously. When install returns HTTP 202, it has queued a job; it has not finished installing. The SDK has no Pack-job status endpoint. Use `listPacks()` / `list_packs()` readback to confirm persisted materialization; if the scoped list does not expose it, inspect job completion through the authorized operator surface before evaluation. Evaluation, approval and release remain separate steps after materialization.

## JavaScript SDK lifecycle

```ts
const imported = await vira.importPack({
  manifest: {
    id: `vira.marketing.starter.${Date.now()}`,
    name: "Marketing Starter",
    version: "1.1.0",
    variables: [
      { key: "brand_name", label: "Brand name", required: true },
      { key: "markets", label: "Markets", type: "multi_select" },
    ],
  },
  objects,
  idempotencyKey: `pack:import:vira.marketing.starter:${Date.now()}`,
});
const packId = String(imported?.body.pack?.id ?? "");
if (imported.status !== 201 || !packId) throw new Error("PACK_IMPORT_FAILED");
if (Array.isArray(imported.body.conflicts) && imported.body.conflicts.length) {
  throw new Error("PACK_CONFLICTS_REQUIRE_REVIEW");
}

const installResponse = await vira.installPack(packId, {
  brand_name: "Example Brand",
  markets: ["TR"],
  approval_required: true,
});
let installedPack = installResponse?.body.pack;
let materialization = installResponse?.body.materialization ?? installedPack?.objects?.materialization;

if (installResponse.status === 202) {
  // The response only confirms queueing. Confirm materialization with the
  // public listPacks readback before starting evaluation.
  const deadline = Date.now() + 30_000;
  while (!materialization && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    const listed = await vira.listPacks();
    installedPack = listed?.body.packs?.find((item) => item.id === packId);
    materialization = installedPack?.objects?.materialization;
  }
}

const packDigest = String(installedPack?.digest ?? "");
if (installedPack?.id !== packId || !packDigest || !materialization) {
  throw new Error("PACK_MATERIALIZATION_NOT_CONFIRMED");
}

const started = await vira.startEvaluation({
  id: `marketing-starter-evaluation-${Date.now()}`,
  targetArtifact: {
    packId,
    packDigest,
    criteria: ["Follow the Pack's stated behavior and constraints."],
  },
  dataset: [{
    id: "case-1",
    input: "Create a launch plan for a B2B subscription product.",
    criteria: ["Cover the requested funnel stages.", "Include measurable next steps."],
  }],
  threshold: 0.8,
});
const evaluation = started?.body.evaluation;
const evaluationId = String(evaluation?.id ?? "");
if (started.status !== 201 || !evaluationId || evaluation?.status !== "PASSED") {
  throw new Error("PACK_EVALUATION_NOT_PASSED");
}
if (evaluation?.targetArtifact?.packId !== packId || evaluation?.targetArtifact?.packDigest !== packDigest) {
  throw new Error("PACK_EVALUATION_BINDING_MISMATCH");
}
await vira.evaluatePack(packId, { evaluationId });
// Approval and release require separate authorization after receipt review.
```

The provider-backed evaluator generates a response from the supplied input/criteria and persists a trusted evaluation bound to the Pack ID/digest. This is not a runtime execution receipt proving the installed behavior was invoked. Use the configured runtime/candidate execution boundary and inspect its receipts when validating actual runtime behavior. Preserve returned request IDs and receipts rather than rebuilding authority state in the client.

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

The Python SDK uses the same Pack contracts. This snippet shows import, variable
configuration, queued-install readback, provider-backed evaluation, and attaching the
persisted `evaluationId`; it deliberately stops before approval/release:

```python
import os
import time
from vira import ViraClient

manifest = {
    "id": f"vira.marketing.starter.{int(time.time())}",
    "name": "Marketing Starter",
    "version": "1.0.0",
    "variables": [
        {"key": "audience", "label": "Audience", "required": True},
        {"key": "region", "label": "Region", "required": True},
    ],
}
objects = {
    "semanticTasks": [{
        "taskKey": "marketing.launch_plan",
        "description": "Create a measurable product launch plan",
        "examples": ["Create a launch plan for a B2B product"],
    }],
    "behaviorPoints": [{
        "key": "marketing.launch_plan",
        "taskKey": "marketing.launch_plan",
        "requirement": "Address the supplied audience and region with measurable next steps",
    }],
}

with ViraClient(os.environ["VIRA_API_URL"], api_key=os.environ["VIRA_API_KEY"]) as client:
    imported = client.import_pack(
        manifest,
        objects,
        idempotency_key=f"pack:import:{manifest['id']}:1.0.0",
    )
    if not imported or imported.status != 201:
        raise RuntimeError("PACK_IMPORT_FAILED")
    pack_id = str(imported.body.get("pack", {}).get("id", ""))
    if not pack_id:
        raise RuntimeError("PACK_ID_MISSING")
    if imported.body.get("conflicts"):
        raise RuntimeError("PACK_CONFLICTS_REQUIRE_REVIEW")

    install = client.install_pack(pack_id, {"audience": "B2B founders", "region": "EU"})
    if not install:
        raise RuntimeError("PACK_INSTALL_FAILED")
    installed_pack = install.body.get("pack", {})
    materialization = install.body.get("materialization") or installed_pack.get("objects", {}).get("materialization")

    if install.status == 202:
        deadline = time.monotonic() + 30
        while not materialization and time.monotonic() < deadline:
            time.sleep(1)
            listing = client.list_packs()
            packs = listing.body.get("packs", []) if listing else []
            installed_pack = next((item for item in packs if item.get("id") == pack_id), {})
            materialization = installed_pack.get("objects", {}).get("materialization")

    pack_digest = str(installed_pack.get("digest", ""))
    if not pack_digest or not materialization:
        raise RuntimeError("PACK_MATERIALIZATION_NOT_CONFIRMED")

    started = client.start_evaluation({
        "id": f"marketing-starter-evaluation-{int(time.time())}",
        "targetArtifact": {
            "packId": pack_id,
            "packDigest": pack_digest,
            "criteria": ["Address the supplied audience and region", "Include measurable next steps"],
        },
        "dataset": [{
            "id": "case-1",
            "input": "Create a launch plan for a B2B product in the EU.",
            "criteria": ["Address the supplied audience and region", "Include measurable next steps"],
        }],
        "threshold": 0.8,
    }, idempotency_key=f"pack:evaluate:{pack_id}:{pack_digest}")
    evaluation = started.body.get("evaluation", {}) if started else {}
    evaluation_id = str(evaluation.get("id", ""))
    target = evaluation.get("targetArtifact", {})
    if not started or started.status != 201 or evaluation.get("status") != "PASSED":
        raise RuntimeError("PACK_EVALUATION_NOT_PASSED")
    if target.get("packId") != pack_id or target.get("packDigest") != pack_digest:
        raise RuntimeError("PACK_EVALUATION_BINDING_MISMATCH")
    client.evaluate_pack(
        pack_id,
        {"evaluationId": evaluation_id},
        idempotency_key=f"pack:evaluate-receipt:{pack_id}:{evaluation_id}",
    )
```

This is a provider-backed criteria evaluation bound to the Pack digest. It does not
prove that runtime executed the materialized behavior; inspect runtime/candidate
execution receipts separately for that claim.

## MCP lifecycle

Check the [current MCP catalog](reference/mcp-tools.md) before choosing that surface for Pack operations. Use the JavaScript SDK, Python SDK, or HTTP API whenever the installed MCP package does not list the required Pack tools. Discover available MCP operations with `tools/list`; do not assume an SDK/API method has an MCP equivalent.

## What “verify a Pack” means

There is intentionally no client-side `verifyPack()` shortcut that can declare a Pack safe for production.

Verification is the governed sequence:

1. **Parse/import** the candidate.
2. **Validate** manifest and collection structure.
3. **Inspect inventory/conflicts** before applying changes.
4. **Configure** required variables.
5. **Install/materialize** canonical draft objects.
6. **Evaluate** a Pack-bound candidate against the supplied criteria using the configured trusted evaluator; use runtime/candidate execution receipts separately to verify actual behavior execution.
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
