# End-to-end agent-first acceptance: execution plan and gates

This is the customer-executable acceptance plan for MCP, JavaScript, Python, Skills, Packs, Teach and TaskRun. It is **not a claim that the customer service or model was exercised by repository CI**.

## A. Public packaging and offline acceptance (CI)

1. Verify that `README`, SDK/PyPI/MCP setup prompts and all 28 Skills agree on the installed client versions, advertised lifecycle families and selected surface.
2. Install the **current** JS and Python starter SDKs. Assert scoped Observe event serialization and negative wrong-scope/missing-field behavior with transport-injected tests.
3. Parse the actual published MCP 0.1.59 artifact (91-tool snapshot) and initialize the real server with `tools/list` when connected. Do not count a documented tool as authorization. A standalone MCP host smoke test validates startup, not Pack release.
4. Verify the legacy Next.js/marketing/FastAPI/LangGraph manifests and **their own committed lockfiles**. Run Next build/tests, marketing safety, Python package and syntax tests.
5. Validate 28 portable Skills, archive completeness, 87 trigger fixtures, negative cases, relative docs links and a real-agent trace schema (no synthesized Skill loads).
6. Validate the public docs' capability/availability statements against supported, versioned contract descriptions. Verify that wrong-scope, approval denial, replay and missing provider proof are not silently reported as successful.

Exit gate: GitHub `Repository quality` is green on the merge commit. **Scope:** offline package and documentation quality only.

## B. Live non-production service acceptance (requires user-provisioned tenant)

Prerequisites: customer-controlled `VIRA_API_URL`, scoped secret key and organization/project/environment; approved isolated non-production environment; real AI System and Connection; real model/provider with permitted test data; a human reviewer for changes. Never copy credentials into public artifacts.

1. **Discover:** use a real coding-agent host, load the actual installed Skills, start published MCP, call `tools/list`, `list_capabilities` and scoped reads. Save redacted tool list/version and trace IDs.
2. **Connect and Observe:** call `connect_once` and `observe` with consent and unique idempotency keys; check the actual HTTP admission, AI System/Connection and accepted event readback. Assert wrong-scope denial, missing scope and replay behavior.
3. **Teach/Author:** submit admitted evidence, request server Teach analysis, read actual recommendation, accept/reject/edit under reviewed authority, author Tasks/Points/Programs/Strategies and produce a validated Pack candidate with positive, negative, missing-data and conflict tests.
4. **Pack lifecycle:** import candidate, wait for materialization/job readback, evaluate using real persisted provider results, review comparisons and exact digest, obtain explicit human approval, release the exact eligible revision, read back the server release and rollback target. Denial must not fallback to another client.
5. **TaskRun:** use AUTO routing on the released artifact, inspect persisted mode, child states and receipt lineage; run eligible SINGLE, STRATEGY, COMPOUND and HYBRID cases separately and collect input digests/authority/scope for each.
6. **Provider answer:** obtain the actual user-visible output and a matching post-model verification receipt from a **published, authenticated backend/SDK read surface**. If that surface is absent, mark the outcome `BLOCKED_VERIFIED_OUTPUT_HANDOFF` and do not present an ON answer as verified.
7. **Improve:** submit consented actual feedback/outcome, review Teach proposal, materialize a **new** immutable revision, re-evaluate, approve and separately release it, then compare old/new genuine TaskRun evidence. Do not silently overwrite live behavior.
8. **Admin-related MCP checks:** inspect `get_scope`, read `list_inbox`, and verify `mark_inbox_read`, `inspect_conflicts`, `resolve_conflict`, `start_optimization` and `cancel_optimization_run` only in a reviewer-authorized sandbox, with persisted server readback. Absence of public SDK equivalents is **not** a license to invent methods.
9. **Security negatives:** wrong tenant, missing reviewer authority, expired scope, stale stateVersion, changed output digest, missing tool approval, provider timeout and duplicate idempotency keys must be denied or explicitly blocked.

Each checkpoint needs real ID, server status, trace/receipt pointer, artifact digest and evidence timestamp. Redact content and credentials. A missing checkpoint is **PARTIAL/BLOCKED**, never a synthetic PASS.

Use the existing read-only `examples/javascript/skill-e2e-acceptance.mjs --manifest <path>` and [manual acceptance guide](live-acceptance.md) to inspect actual tenant records. It intentionally fails closed when provider verification is unavailable. The read-only [Skill selection harness](selection-scoring.md) takes *observed* agent Skill-load events, not self-reported reasoning.

## C. External product delivery gates

These cannot be completed by editing public documentation: (1) published provider-output-bound final-answer retrieval contract and host interception; (2) actual production tenant/role/release/Pack authority; (3) customer reviewer approval and test credentials; (4) Studio-only billing, membership, conflict/optimization admin feature parity; (5) a real model-run Skill selection score.

Declare completion only with a bundle satisfying every item in the [test trust matrix](test-trust-matrix.md). If any external gate fails, publish the exact missing interface and keep the public repo's current claims limited to verified evidence.
