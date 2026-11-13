---
name: vira-task-runs
license: "Proprietary; see LICENSE"
description: "Guide a customer through the governed TaskRun journey using the current public JavaScript SDK documentation."
---

# Vira TaskRuns

Use this Skill when a customer wants to route or run a governed task, inspect its progress, provide an authorized continuation, or recover a failed run. TaskRuns are a runtime execution workflow; they do not create or release behavior artifacts. The installed public JavaScript SDK documentation is the source for exact calls and data shapes. This Skill explains the end-to-end decision flow without copying the operation contract into this repository.

## Activate this skill when
A task involves a Vira TaskRun or the user asks how to start, inspect, continue, cancel, or retry one. Use `vira-js-sdk` for application configuration, `vira-runtime` for runtime authority, and `vira-full-lifecycle` if the task belongs to a wider authoring/evaluation/release process.

## Inputs and preconditions

- The customer's own Vira API endpoint, server-side key, and authorized scope.
- The current published JavaScript package documentation for the installed version.
- An established application connection and a user request whose scope is understood.
- The user must provide explicit authorization before admitting work that may cause external effects.
- A bounded budget and a plan for protecting private input in logs.

Use an isolated development scope when available. Production use remains subject to the customer's access, policy, and approval controls. Do not point a live run at a system without the user's authorization.

## Workflow

1. **Check support.** Confirm that the installed package and customer scope support TaskRuns. Do not infer Python, HTTP, or MCP parity from the JavaScript package.
2. **Review the request.** Resolve ambiguity and confirm the intended outcome, boundaries, and budget before admitting work.
3. **Route before start.** If the supported interface provides a proposal-only routing step, inspect its result. Clarification, denial, abstention, or unsupported-host outcomes are stops, not invitations to bypass the boundary.
4. **Authorize admission.** Start only after the user has approved the request and the customer scope is verified. Use the documented idempotency mechanism for retried mutations.
5. **Read back progress.** Retain server-issued identifiers. Re-read persisted state before continuing, cancelling, or retrying. Use only the current server-provided state/cursor values and the exact supported transitions for the installed version.
6. **Continue with new input only when received.** Do not invent a user's missing answer, approval, or actor identity. Confirm the user authorized each effectful continuation.
7. **Recover conservatively.** Follow the installed documentation's retryable states and preserve the server's plan. For timeouts or unknown mutation results, read the same run before issuing another operation.
8. **Report the result.** Summarize the last persisted status, redacted identifiers, external effects if any, and any required human action. Never claim completion from a queued response alone.

## Deliverable and failure handling

Stop for unsupported surface, missing scope, ambiguous request, denial, missing authorization, stale state, or unclear recovery conditions. Ask the customer to consult the current SDK documentation or an authorized operator rather than guessing operation names, payloads, or status transitions. TaskRun completion does not publish a Strategy, create a behavior resource, approve a Pack, or release a behavior revision.

## References

- [Published JavaScript SDK](https://www.npmjs.com/package/@tryvira/sdk)
- [JavaScript SDK Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-js-sdk/SKILL.md)
- [Runtime Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-runtime/SKILL.md)
- [Full lifecycle Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-full-lifecycle/SKILL.md)
