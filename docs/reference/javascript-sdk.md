# JavaScript / TypeScript SDK

**Current package:** [`@tryvira/sdk`](https://www.npmjs.com/package/@tryvira/sdk) `0.1.44`

**Runtime:** Node.js 20+

**Install:** `npm install @tryvira/sdk@0.1.44`

The published npm package is the authoritative source for the current method signatures and request/response types. This repository's public integration guidance intentionally avoids reproducing low-level operation schemas. Read the package README and type declarations for the exact version installed in your application.

## Configure a customer-owned Vira deployment

Configure `VIRA_API_URL` with the API deployment URL supplied for the customer's Vira account. It is not the application's backend URL or the Studio URL. Keep `VIRA_API_KEY` and scope identifiers in server-side environment or secret storage; never place them in a browser bundle, source control, chat, or logs. This repository contains no shared endpoint or credentials.

Example configuration with placeholders:

```dotenv
VIRA_API_URL=<customer-vira-api-url>
VIRA_API_KEY=<customer-server-side-key>
VIRA_ORGANIZATION_ID=<customer-organization>
VIRA_PROJECT_ID=<customer-project>
VIRA_ENVIRONMENT_ID=<customer-environment>
```

Use an isolated development scope when the customer's account provides one. Production changes require the customer's authorization and controls.

## Integration approach

1. Confirm the installed npm version and read its matching package documentation and types.
2. Configure the customer's endpoint and scoped credentials on a trusted server.
3. Check which operations are supported by that release and account before using them.
4. Keep evidence collection, candidate review, evaluation, approval, release, and runtime use as separate governed steps.
5. Preserve returned identities and read persisted state before continuing asynchronous work.
6. Handle errors without logging credentials or private user content.

The JavaScript package currently documents capabilities beyond those documented by every other integration surface. Do not infer Python, HTTP, or MCP support from an SDK method. For TaskRun operations, follow the npm documentation and the [`vira-task-runs` Skill](../../skills/vira-task-runs/SKILL.md); this reference does not publish an HTTP route or payload contract.

## TaskRun modes and version-matched examples

The published `@tryvira/sdk§ line exposes §resolveTaskRun§ and §startTaskRun§ for task routing/admission. The requested mode can be §SINGLE§, §STRATEGY§, §COMPOUND§, §HYBRID§ or §AUTO§; AUTO asks for a mode recommendation instead of being an execution mode.

The client also exposes §getTaskRun§, §listTaskRunEvents§, §continueTaskRun§, §retryTaskRun§ and §cancelTaskRun§. For explicit mode selection use §startTaskRun§ rather than assuming §startTaskRunFromPrompt§ forwards a §requestedMode§ option.

Run the [route-only by default example](../../examples/javascript/taskrun-modes.mjs) after installing the pinned SDK and configuring a provisioned customer endpoint. The [Next.js test suite](../../examples/frameworks/node-next/test/taskrun-sdk.test.mjs) asserts exact method availability and request serialization against its pinned published npm dependency with an offline transport.

**No test here claims live service execution.** Admission needs a real eligible released task, scope, policy and host support; persisted state is required for continuations. [Execution modes](../execution-modes.md) · [Developer checklist](../developer-checklist.md)

## Related resources

- [Published package versions](../published-packages.md)
- [Python SDK](python-sdk.md)
- [MCP catalog](mcp-tools.md)
- [HTTP integration guidance](api.md)
- [Capability map](../capability-map.md)
- [Customer-runnable Next.js chatbot](../../examples/frameworks/node-next/README.md)
- [Agent Skills](../../skills/README.md)
