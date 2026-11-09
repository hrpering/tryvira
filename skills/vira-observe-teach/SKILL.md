---
name: vira-observe-teach
license: "Proprietary; see LICENSE"
description: "Submit permitted evidence and create or review Vira Teach proposals without implying automatic promotion."
---

# Observe and Teach AI

Only submit consented, minimized, non-sensitive evidence. Distinguish observations/evidence from authored behavior. Teach analysis is a persisted operation: create it from admitted evidence, retain its returned `analysisId`, and read the state back with `getTeachAnalysis`; a queued job is not a completed analysis. Creating a proposal from evidence is a separate workflow; review/evaluate/promote remain separate transitions. Promotion is not an implicit release. Check the selected surface: current MCP may create evidence/proposals but lacks the SDK analysis/readback and complete transition lifecycle.

For JavaScript, configure `VIRA_API_URL` as the API deployment root supplied by the Vira account/operator (no `/v1` suffix and not the Studio URL) and keep `VIRA_API_KEY` server-side. Construct `ViraClient` with `baseUrl: process.env.VIRA_API_URL`. Ask for the URL if it is missing; never guess it. The bundled [`examples/README.md`](examples/README.md) runs analysis creation plus persisted readback against the configured Vira API in an authorized non-production target.

## Activate this skill when
Capturing allowed observations/feedback/outcomes or creating, reviewing, accepting, rejecting, or correcting Teach proposals. Do not equate proposal promotion with release.

## Inputs and preconditions
Confirm API deployment URL, credential scope, evidence source, consent/retention rules, minimization/redaction, target system/scope, real event identifiers, and requested proposal decision. Use synthetic, non-customer evidence in an authorized non-production tenant for a real run.

## Workflow
1. Check whether the selected surface supports evidence ingestion, Teach analysis/readback, and the requested proposal transition. MCP support is narrower than SDK/API; discover `tools/list` and use the documented catalog.
2. For conversation archives, import only consented/minimized records, retain the returned evidence IDs, and use the documented revocation operation when consent or retention requires removal.
3. Submit only permitted evidence; verify its server-issued ID and admitted state. Analyze only selected evidence IDs or conversation references in scope.
4. To run Teach analysis, call `createTeachAnalysis(evidenceIds, { analysisId, controlPointId, summary })`, retain the returned `analysisId`, and call `getTeachAnalysis(analysisId)`. Report the server's current status; if queued or running, re-read that same ID later. Do not claim that creation alone completed synthesis.
5. If the goal is a directly reviewable proposal, use `createTeachProposal` with an admitted evidence ID and a specific Behavior Point/control target; this is separate from analysis.
6. Read current proposal status before review; perform the explicit accepted/rejected/corrected transition with an authorized reviewer identity when supported.
7. If promotion creates a candidate revision, evaluate and release it through the separate documented workflow.

## Deliverable and failure handling
Return evidence/proposal IDs, redacted summaries, state transitions, and the next required human step. Stop for absent consent, nonexistent evidence IDs, unsupported MCP transition, or unclear target; never invent evidence or claim a runtime release.

## References

- [teach](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [signals](https://github.com/hrpering/tryvira/blob/main/docs/signals.md)
- [traces](https://github.com/hrpering/tryvira/blob/main/docs/traces.md)
- [security-model](https://github.com/hrpering/tryvira/blob/main/docs/security-model.md)
- [capability-map](https://github.com/hrpering/tryvira/blob/main/docs/capability-map.md)
- [published SDK method inventory](https://github.com/hrpering/tryvira/blob/main/docs/reference/sdk-method-inventory.md)
- [Runnable Teach analysis](https://github.com/hrpering/tryvira/blob/main/skills/vira-observe-teach/examples/README.md)
