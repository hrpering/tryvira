# JavaScript and TypeScript examples

These examples use the published `@tryvira/sdk` `0.1.44` line and the hosted API contract. Supply your
own scoped credentials through environment variables and keep payloads synthetic.

## Choose an example

| File | Use it when | Expected result |
| --- | --- | --- |
| `taskrun-modes.mjs` | route and optionally admit SINGLE/STRATEGY/COMPOUND/HYBRID/AUTO tasks | route proposal or real server rejection by default; never a fabricated COMPLETED result |
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

## Request a TaskRun routing decision

Install the published version and provide your **own** authorized Vira API URL and server-side key. By default this does not start an execution:

```bash
node taskrun-modes.mjs --help
VIRA_TASKRUN_INPUT="Summarize this incident" node taskrun-modes.mjs AUTO
```

Use `SINGLE` for one task, `STRATEGY` for a multi-step eligible task, `COMPOUND` for multiple registered tasks, `HYBRID` for a mixed child plan, or `AUTO` to request mode selection. Routing may return clarification, denial or unsupported host. A real task admission requires `VIRA_CONFIRM_TASKRUN_START=yes` and `VIRA_CONFIRM_NON_PRODUCTION=yes` after verifying an authorized development scope. For multi-task execution, the account must already have eligible registered tasks and host capabilities; this script does not create them.

[Full mode guide](../../docs/execution-modes.md) · [Offline published-SDK tests](../frameworks/node-next/test/taskrun-sdk.test.mjs)

## Prompt for a coding agent

```text
Integrate @tryvira/sdk@0.1.44 into this existing Node.js application.

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
