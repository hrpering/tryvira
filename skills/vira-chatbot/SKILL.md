---
name: vira-chatbot
license: "Proprietary; see LICENSE"
description: "Set up and try the public Next.js chatbot with Vira behavior OFF or ON, including optional observation and runtime readback."
---

# Vira OFF/ON Chatbot

Help a user run the repository's real Next.js + OpenAI Agents chatbot and compare the same synthetic request with Vira OFF and ON. Use the existing example; do not create a mock Vira service, fabricate a runtime response, or replace the user's app.

## Activate this skill when
The user wants to launch, configure, or try the public Vira chatbot, compare baseline and governed behavior, or enable its optional observation/runtime display. Route a framework integration without the chatbot to `vira-framework-integration`; route a broader behavior lifecycle to `vira-full-lifecycle`.

## Inputs and preconditions
Use `examples/frameworks/node-next/README.md` as the runbook and `.env.example` as the environment-variable inventory. Check that the user has a local checkout and Node.js 22.6 or later. OFF chat requires the user's server-side OpenAI key. ON additionally requires Vira product access, the customer's API deployment URL, server-side scoped credentials, and a real registered and released task/Program with an eligible scoped Connection. Observation also requires an authorized connected system/connection. Never ask the user to paste keys into chat or print them in logs.

If Vira access or scope is unavailable, still help them run OFF if they have the model key, then clearly report that ON cannot yet be tested. The product notice says access is not open yet; do not promise a hosted public demo or imply every reader has a Vira account.

## Workflow
1. Inspect the existing project and read the chatbot README. Use the repository example as-is; keep `.env.local` local and out of source control.
2. Install its locked dependencies with `npm ci`. Copy `.env.example` to `.env.local`; have the user add the OpenAI key locally. Leave all Vira settings empty for OFF with observation disabled.
3. Start `npm run dev` from `examples/frameworks/node-next` and give the user the local URL shown by Next.js. Try one synthetic support question in OFF mode.
4. For ON, check that the user supplied their own Vira deployment root, authorized scope, key in server-side environment, and verified Behavior Point. Do not infer IDs or scope. If a connection must be created, follow the README's explicit isolated non-production and idempotency gates; never enable them on the user's behalf.
5. Send the same synthetic question in ON mode. ON admits AUTO TaskRun and shows real persisted state; it does not invoke the ON provider or claim a verified final model answer. Do not add a fallback that bypasses this result.
6. Offer optional metadata-only observation for OFF baseline; ON shows TaskRun state, not a projection receipt or model compliance.
7. Report which modes actually ran, whether the model was invoked, optional observation/readback status, and any missing access or configuration. Distinguish build/test checks from a live Vira result.

## Boundaries
This demo has no tools or external side effects, and the route has no end-user authentication, rate limiting, or tenant mapping. Keep it local or behind the user's authenticated server boundary. Use synthetic content. Never expose keys, customer prompts, or `.env.local`; never turn an error, denial, or missing projection into Vira OFF silently.

## Production-aligned implementation playbook

1. The checked-in Next.js demo's **OFF** path invokes the configured OpenAI Agent; optional **Send baseline observation** records metadata-only `model.response` with permission.
2. **ON** sends `requestedMode:"AUTO"` via `startTaskRun`. It displays actual TaskRun admission/status/selected mode, but currently **does not call the provider for ON** and **does not return a verified ON chatbot answer**.
3. The ON route returns HTTP 202 `TASKRUN_ACCEPTED_PENDING_VERIFIED_CHAT_RESPONSE`; **Show TaskRun state** displays state, not a projection digest or post-model PASS. This is not a full ON/OFF answer-quality demo yet.
4. Use the same synthetic support prompt in OFF/ON and report separately what occurred. No Vira access, missing task/release/host capability or final verifier handoff means ON stops without fabricated answer or OFF fallback.
5. Keep local-only app unauthenticated route off the public internet. Do not invent receipts or use customer prompts.
[Current app](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/README.md) · [Verified answer gap](https://github.com/hrpering/tryvira/blob/main/docs/verified-answer-handoff.md).

In an extracted standalone `.skill` archive, the Next.js sample is under `references/repo/examples/frameworks/node-next/`; install its pinned npm dependencies from that directory. Runtime Vira and provider credentials remain external.

## Deliverable and failure handling
Give the user the local URL, the modes actually tried, and the observed response status. If dependencies, model credentials, Vira access, scope, or an eligible released behavior are missing, state the exact first blocked step and continue only with an independently usable mode. Never present an OFF-only build as an ON test or a UI runtime check as proof of model compliance.

## References
- [Runnable chatbot setup and configuration](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/README.md)
- [Chat UI](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/app/page.tsx)
- [Server-side route](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/app/api/support/route.ts)
- [Runtime integration Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-runtime/SKILL.md)
- [Framework integration Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-framework-integration/SKILL.md)
