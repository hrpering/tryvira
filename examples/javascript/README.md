# JavaScript and TypeScript examples

These examples use `@tryvira/sdk@0.1.43` and the hosted API contract. Supply your
own scoped credentials through environment variables and keep payloads synthetic.

## Choose an example

| File | Use it when | Expected result |
| --- | --- | --- |
| `connect-observe.mjs` | adding Vira to an existing agent | connection and one sanitized observation receipt |
| `canonical-authoring.mjs` | defining a Task and Behavior Point | scoped canonical objects are created or returned |
| `end-to-end-lifecycle.mjs` | learning the connection → evidence → authoring → runtime path (Pack approval/release are not completed) | each authority boundary is visible; no implicit release |
| `quality-decision.mjs` | comparing response candidates | a candidate is selected or the system abstains |

## Run

```bash
npm install
export VIRA_API_URL="https://api.example.invalid"
export VIRA_API_KEY="<server-side-key>"
export VIRA_ORGANIZATION_ID="<organization-id>"
export VIRA_PROJECT_ID="<project-id>"
export VIRA_ENVIRONMENT_ID="<environment-id>"
node connect-observe.mjs
```

Use a new idempotency key for a new operation and reuse the same key only when
retrying that operation. A denied or abstained runtime result is a valid outcome and
must not be bypassed by calling the model or tool through another path.

## Prompt for a coding agent

```text
Integrate @tryvira/sdk@0.1.43 into this existing Node.js application.

First inspect the package manager, Node version, module system, and existing config.
Implement the smallest safe example: connectOnce, retain systemId/connectionId,
submit one sanitized model.response observation, and print only request IDs and safe
status fields. Read VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
VIRA_PROJECT_ID, and VIRA_ENVIRONMENT_ID from the environment.

Do not invent SDK methods, hard-code credentials, create a Pack, approve/release
behavior, or bypass a denied/abstained runtime decision. Use idempotency keys for every
mutation. Run the example and a focused test, then report the exact files changed,
expected receipts, and any unsupported contract.
```
