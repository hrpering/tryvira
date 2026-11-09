# Next.js + OpenAI Agents SDK + Vercel AI SDK

Requires Node.js 22.6+. Install the pinned dependencies with `npm ci`, configure `VIRA_API_URL`, `VIRA_API_KEY`, organization/project/environment IDs, and `OPENAI_API_KEY` in the server environment, then run `npm run dev`. Vira and model credentials stay server-side. Use an isolated non-production Vira scope.

`POST /api/support` runs the OpenAI Agents SDK draft route; `POST /api/ai-sdk-support` streams with Vercel AI SDK. Both call the published Vira SDK against the configured API and invoke the model only after receiving an active, non-empty projection with its digest and Vira request ID. The projection guides model behavior; it does not authorize external effects. A missing or unavailable projection stops before model invocation. Protect both routes with application authentication before exposing them.

Example request:

```bash
curl -X POST http://localhost:3000/api/support \
  -H 'content-type: application/json' \
  -H 'idempotency-key: support:case-123' \
  -d '{"message":"Where is my order?"}'
```

This calls your configured Vira deployment; it is not a simulated response. For the deeper persisted Teach proposal → candidate evaluation → Pack Revision flow, follow [REVISION-WORKFLOW.md](REVISION-WORKFLOW.md). Each confirmation in that workflow sends a real state transition and requires review by the authorized operator.
