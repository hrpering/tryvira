# Try the Vira OFF/ON chatbot

Use this customer-run example to compare the same synthetic support question with Vira behavior disabled and enabled. It uses the real Next.js chatbot and published SDK; there is no mock Vira server.

To have an agent guide the run, install the Skill from your application repository:

```bash
npx skills add hrpering/tryvira --skill vira-chatbot
```

## Start the app

From the repository root:

```bash
cd examples/frameworks/node-next
npm ci
cp .env.example .env.local
```

Set `OPENAI_API_KEY` in `.env.local` using a local editor or secret manager. Do not send the key to an agent or commit `.env.local`. Start the app:

```bash
npm run dev
```

Open the local URL printed by Next.js. Leave Vira OFF, keep observation unchecked, and send a synthetic question. This baseline does not construct a Vira client or call Vira.

## Try Vira ON

Vira ON requires product access for the user's account. Set the customer's API deployment root, scoped server-side credential, and a verified Behavior Point in `.env.local`; the behavior must be eligible and released in that scope. Never use credentials from the production source repository. If there is no authorized Vira access or verified Behavior Point, stop at OFF mode and report why ON is unavailable.

Select **ON · governed** and send the same synthetic question. The server checks Vira before the model call. A failure or missing active projection stops the request; it must not silently continue as OFF.

Optional controls:

- **Send observation** is off by default and submits metadata only, not the chat text. Configure a connected system/connection and enable it only with the user's authorization.
- **Show runtime check** displays the request ID and projection digest returned for that turn. It does not prove that the model followed the behavior.
- To create a connection, follow the README's non-production and idempotency-key gates. The gate values are operator assertions; do not set them for production.

## Expected result and limits

Compare the two answers while holding the prompt constant. Record the selected mode and the status shown by the app. If Vira has no eligible released behavior, expect the ON request to stop before the model. The sample has no tools or external actions and is not ready for public deployment without application authentication, rate limiting, and tenant mapping.

This is a local customer-run demo, not a hosted playground. Vira is under active development and product access is not open yet; OFF can be tried by a user with an OpenAI key, while ON requires their own provisioned Vira access. The repository CI build is not a live Vira test.

See the full [chatbot README](https://github.com/hrpering/tryvira/blob/main/examples/frameworks/node-next/README.md) and invoke this guide with the [`vira-chatbot` Skill](https://github.com/hrpering/tryvira/blob/main/skills/vira-chatbot/SKILL.md).
