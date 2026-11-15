# Recordable Vira Agent Skills demonstration

Use a checkout of the public tryvira repository and a coding assistant that genuinely supports Agent Skills. No hidden mock API, arbitrary task IDs or guaranteed ON answer are involved. The screen recording can be done in English; the prompts below are ready to paste.

## Agent-first execution

For a Studio-free workflow, use [Vira Operator](https://github.com/hrpering/tryvira/blob/main/skills/vira-operator/SKILL.md) as the agent's operation interface. Specialist Skills still define the authoring and safety requirements. Its CLI executes the installed public SDK only and reports unavailable backend/API features rather than assuming all Studio routes can be called. See [Studio-less parity](studio-less-parity.md).

## Setup

Install the minimum four Skills with the supported installer:

~~~bash
npx skills add hrpering/tryvira --skill vira-full-lifecycle
npx skills add hrpering/tryvira --skill vira-build-pack
npx skills add hrpering/tryvira --skill vira-task-runs
npx skills add hrpering/tryvira --skill vira-traces
~~~

Ask the agent to confirm which Skills it actually loaded. Open examples/packs/recipe-preferences for an accessible audience or examples/packs/retail-media-review for a business audience. Keep the original example unchanged; create a separate candidate in a temporary working folder.

## Five short prompts and evidence to capture

### Scene 1: Select the Skills

> Inspect this repository and the Vira Skills you can actually load. I want a reusable behavior for a customer-support assistant. Choose the minimum relevant Skills, identify the real integration boundary and show a plan. Do not change files yet.

Screen: actual Skill load and correct routing. Do not claim automatic selection if you explicitly invoked the Skills.

### Scene 2: Author a real candidate

> Use the Vira authoring and Pack Skills to create a new support behavior candidate. Keep useful answers and next steps. Never invent an order status or claim a refund was performed. Define a Semantic Task, Behavior Point, Program and only add a Strategy if staged execution is necessary. Include executable checks where supported, positive and negative examples, missing-data cases and conflicting instructions. Follow the public Pack structure, not an invented schema.

Screen: the actual created files, design rationale and checks. A new candidate does not mean an installed Pack.

### Scene 3: Validate what was generated

> Validate the candidate's structure, cross-references and real checks. Show the commands you ran on this exact candidate and list unsupported verifier extensions, missing Signals and unresolved tool permissions. Separate local checks from server evaluation.

In the complete public checkout these commands test the **repository**, not automatically the new candidate:

~~~bash
npm run verify:packs
npm run verify:skills
~~~

For a separate candidate, run the actual candidate validator:

~~~bash
node scripts/validate-pack-candidate.mjs /absolute/path/to/new-candidate
~~~

The resulting JSON reports structural failures and runtime-dependent verifier/Signal warnings. It never executes the provider or releases a behavior.

For a separate candidate, additionally validate that candidate's own files and references. State explicitly if the provided checks covered only the checked-in examples.

### Scene 4: Route and read back a genuine TaskRun

> If our existing authorized non-production Vira connection has eligible released behavior, propose AUTO TaskRun for this support task. Show the actual selected task and mode, then seek approval before any effectful admission. Read back persisted status, child states and receipts. If the connection or release is unavailable, explain the first blocked boundary; do not use a mock or invented IDs.

Screen: real scoped readback if connected, otherwise an accurately labeled blocked step. Do not produce a fake COMPOUND/HYBRID trace or imply final post-model PASS.

### Scene 5: Show the Teach review loop

> Explain how a consented conversation's actual observed evidence can produce a reviewed Teach improvement. Preserve conversationId and optional episodeId. Separate asynchronous analysis, proposal review, evaluation, approval, release and another run. Do not submit or promote anything without authorized evidence and permission.

Screen: the workflow, with persisted statuses only where an actual service returned them.

## Three-minute edit guide

| Timestamp | Show | Explain |
| --- | --- | --- |
| 0:00–0:20 | GitHub and real Skill selection | Skill guides the assistant; it is not the runtime |
| 0:20–1:05 | Candidate Task/Point/Program files | Behavior is a reviewable, portable artifact |
| 1:05–1:35 | Positive/negative cases and local checks | Structure and quality are distinct |
| 1:35–2:15 | Live AUTO TaskRun and receipts, or explicit blocked state | Vira applies released authority and records execution |
| 2:15–2:45 | Observe → Teach → review → evaluate → release | AI proposes; release remains governed |
| 2:45–3:00 | Recap | Keep behavior portable and its evidence inspectable |

## No invented accomplishments

Never say installing Skills installed the Vira backend. Never call offline tests a live benchmark; never equate TaskRun COMPLETED with an output-bound verifier PASS; never imply MCP and SDK or Studio are identical; never grant tools from a Pack declaration alone. Show sanitized evidence and avoid API keys, tenant IDs, raw customer content and internal infrastructure.

[Skills catalog](../../skills/README.md) · [Production-alignment matrix](production-parity-demo.md).
