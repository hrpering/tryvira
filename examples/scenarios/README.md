# Synthetic behavior evaluation scenarios

This directory contains **16 structured, reproducible prompt sets** across everyday, business and multi-task tasks. They are not a replacement for the live Vira API or a fake backend.

Each scenario provides a **short prompt**, a **detailed prompt**, requirements to evaluate and negative cases to catch. The suggested `requestedMode` is the intended test route, **not** a prediction of Vira's actual routing result. A strong baseline may already satisfy the requirement.

## Try the prompts without a Vira account

From the repository root:

```bash
node examples/scenarios/print-prompt.mjs --list
node examples/scenarios/print-prompt.mjs B-001 short
node examples/scenarios/print-prompt.mjs I-001 detailed
```

Copy the printed prompt to any suitable local model/application. If using the [Next.js chatbot](../frameworks/node-next/README.md), its **OFF** mode needs only your own configured model provider. The **ON** mode is available only for a provisioned Vira tenant and an eligible released Behavior Point; the chatbot does **not** automatically turn these 12 scenarios into Vira behavior.

You can run the same short/detailed prompts against your own configured application. **Do not hardcode prompts as a substitute for a real behavior definition and release.**

## Try TaskRun routing using the current SDK

With your own authorized, isolated Vira test tenant and the published JavaScript client installed:

```bash
cd examples/javascript
npm install
# Export the customer-issued VIRA_API_URL and VIRA_API_KEY first.
VIRA_TASKRUN_INPUT="Summarize today's support complaints" node taskrun-modes.mjs AUTO
```

This is **route-only by default**. It does not create a behavior, request admission or simulate a completed task. To request specific modes, use `SINGLE`, `STRATEGY`, `COMPOUND` or `HYBRID` as the final CLI argument. Registered and eligible tasks, supported host capabilities and, in applicable cases, released strategies or child plans are required. Denial, clarification, or an unsupported-host result is valid.

For Python: [taskrun_modes.py](../python/taskrun_modes.py). See the [execution modes guide](../../docs/execution-modes.md) before attempting admission.

## Structure

`cases.json` uses:

- `id`: stable synthetic scenario identifier.
- `level`: beginner, intermediate or advanced.
- `requestedMode`: a proposed routing request for a supported test environment.
- `packExample`: a related Pack Academy example, or `null` when the scenario is not represented by an installable example. This is **not** a claim that a Pack is installed or released in your account.
- `shortPrompt` / `detailedPrompt`: two independently copyable test inputs.
- `behaviorRequirements`: criteria that the evaluator may inspect **only if that behavior has been configured**.
- `negativeCases`: concrete errors to flag, including missing authorization or fabricated state where relevant.

No source field contains a claimed score, actual model output, customer tenant ID, fabricated API receipt or pre-approved release. The tests do **not** automatically grade model correctness.

## Run the fixture quality gate

```bash
npm run verify:scenarios
```

The gate checks the schema, unique IDs, depth distribution, mode coverage and positive/negative test descriptions. It does not contact a provider. For source syntax, published SDK method checks, real package version verification and framework builds, see the [example verification matrix](../../docs/example-verification.md).

## Fair evaluation protocol

1. Record the model version, inputs, parameters and permitted data for a baseline response.
2. Before comparing, define the actual behavior candidate, evaluation criteria and negative cases.
3. Verify the exact released identity for ON; if release/scope/host prerequisites are missing, mark the case **not runnable** rather than fabricating output.
4. Run the same task and controlled environment, then mark each check **pass**, **fail** or **not observable**.
5. Inspect persisted server receipts/child states where supported; a route proposal is not an executed TaskRun.
6. Report both benefits and regressions, including latency or cost only when measured.

[12 scenarios in prose](../../docs/use-cases.md) · [Mode details](../../docs/execution-modes.md) · [Developer checklist](../../docs/developer-checklist.md)
