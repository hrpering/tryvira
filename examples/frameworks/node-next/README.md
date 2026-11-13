# Next.js + OpenAI Agents chatbot

This customer-run chatbot calls the published JavaScript SDK and OpenAI Agents SDK from a server route. The UI has Vira OFF and Vira ON modes, an optional metadata-only observation, and an optional readback display for the runtime result.

## Start

Use Node.js 22.6 or later. From this directory:

```bash
npm ci
cp .env.example .env.local
```

Set `OPENAI_API_KEY` in `.env.local` to use the model. With Vira OFF and observation disabled, the chat route calls the configured OpenAI Agent and does not construct a Vira client or call Vira.

To enable Vira ON, also set the API deployment URL (without `/v1`), scoped server-side credentials, and the Behavior Point configured for this application. The route resolves Vira runtime first and invokes the model only when it receives an active projection with the published runtime identity fields. If Vira denies, fails, or returns no eligible projection, the request stops before the model call. The projection guides the response; it does not authorize external actions. This example has no tools or external side effects.

To request optional observation, configure the connected system and connection IDs as well. Observation sends metadata only; it does not send the chat message. The checkbox is off by default. Optional runtime verification displays the returned request ID and projection digest; it verifies the Vira response for that turn, not that the model followed it.

## Create or reuse a Vira connection

When you have an isolated non-production deployment and are authorized to connect this application, set `VIRA_TUTORIAL_NON_PRODUCTION=true`, `VIRA_ALLOW_CONNECT=true`, and a unique `VIRA_CONNECT_IDEMPOTENCY_KEY`, then run:

```bash
npm run vira:connect
```

The command calls `connectOnce` and prints only the returned system, connection, and request IDs. Copy the returned system and connection IDs into the corresponding server-side variables. The flags are explicit operator assertions; they do not detect whether the endpoint is production.

Then start the app:

```bash
npm run dev
```

Open the local URL printed by Next.js. Send the same synthetic question in OFF and ON modes. For Vira ON, the operator must first make sure the configured Behavior Point has an eligible released behavior in the selected scope.

## Try progressively harder prompts

This app is currently wired to a single configured **Behavior Point**. Use identical synthetic inputs in OFF and ON modes, but do **not** expect a cooking or marketing requirement to apply in ON unless the corresponding behavior is actually released and configured for the application.

| Complexity | Suggested input | Behavior to evaluate when configured |
| --- | --- | --- |
| Simple | “My delivery is late. What do I do?” | Uncertain tracking status, useful next steps, escalation |
| Intermediate | “We have different attribution windows in our two campaign dashboards. Can I compare ROAS?” | Metric comparability before recommending action |
| Advanced | “Investigate the support incident and prepare a response requiring human approval.” | Do not claim an unexecuted strategy or approval happened |

For more scenarios, use the [12-case catalog](../../../docs/use-cases.md). For actual **SINGLE**, **STRATEGY**, **COMPOUND**, **HYBRID** and **AUTO** TaskRun selection, use the [execution modes guide](../../../docs/execution-modes.md) and the separate [TaskRun SDK runner](../../javascript/taskrun-modes.mjs). The current chatbot toggle itself does **not** expose a TaskRun mode switch.

## Boundaries

This example calls real configured Vira and OpenAI services; there is no mock Vira server or fake tool. It has not been run against a live Vira tenant because product access is not open yet. Use an isolated development scope and synthetic content. The route has no end-user authentication, rate limiting, or tenant mapping; keep it local or behind your application's authenticated service boundary before deployment. Never expose `.env.local`, credentials, or customer prompts.
