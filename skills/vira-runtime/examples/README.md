# Explain a governed runtime request without bypasses

## User prompts to test the Skill

**Short:** > Why did this AUTO TaskRun finish its child but not return a verified AI response?

**Detailed:** > Inspect selected canonical task, release/artifact digest, child execution, host capability and actual pre/post module check outcomes. Separate a real provider output from the child status.

## How to carry out the task

Follow [runtime verification](https://github.com/hrpering/tryvira/blob/main/docs/runtime-verification.md) with [TaskRun state](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) and the current Next.js ON handler. Direct projection may be used only for a clearly labeled low-level diagnostic.

This is a customer-run procedure using real installed contracts, not a synthetic Vira success or a mocked service. Obtain the user's own authorized, isolated environment for any live Vira mutation. Keep API/provider keys server-side.

## Evidence to return

Truth table: TaskRun status, child receipts, verifier availability and output digest/receipt. If final provider handoff absent, label 'not verified'.

## Required negative test

A projection with text is not permission to act; no fake PASS if a judge, tool gate, Signal attestation or provider output is missing.

## Handoff

Consult [the Skill's specific production-aligned procedure](https://github.com/hrpering/tryvira/blob/main/skills/vira-runtime/SKILL.md), [full product status](https://github.com/hrpering/tryvira/blob/main/docs/product-status.md) and [AUTO TaskRun](https://github.com/hrpering/tryvira/blob/main/docs/canonical-taskrun.md) before calling an unverified operation. Do not infer support across SDK, HTTP, MCP or Studio.
