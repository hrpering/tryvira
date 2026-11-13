# Vira Agent Skills

Portable, proprietary Agent Skills for integrating with and operating Vira through documented public surfaces. The 24-Skill library is in active development and is not yet published to skills.sh.

## Install

From the target application repository, install one skill from this public repository’s `main` branch:

```bash
npx skills add hrpering/tryvira --skill vira-js-sdk
```

To try the local chatbot with Vira OFF/ON, install its guide:

```bash
npx skills add hrpering/tryvira --skill vira-chatbot
```

Install the full library by omitting `--skill` or select the target agent in the CLI. See [installation and compatibility details](../docs/agent-skills/installation.md). For a local checkout, point your agent at `skills/` or copy the selected skill folder into its supported skills directory.

For a published JavaScript or Python TaskRun workflow, install `vira-task-runs` alongside the matching SDK Skill:

```bash
npx skills add hrpering/tryvira --skill vira-task-runs
```

## Skills

| Skill | Use it for |
| --- | --- |
| `vira-get-started` | Inspect a project and choose the supported integration path |
| `vira-npm-cli` | Install/upgrade npm SDK and MCP package safely |
| `vira-integrate-app` | Select the appropriate documented integration surface |
| `vira-js-sdk` | JavaScript/TypeScript SDK implementation |
| `vira-task-runs` | JavaScript and Python SDK TaskRun routing, admission, readback, and state transitions |
| `vira-python-sdk` | Python SDK implementation |
| `vira-mcp` | Published MCP configuration and runtime tool discovery |
| `vira-http-api` | HTTP operations, auth, and scope |
| `vira-framework-integration` | Framework-neutral integration without claiming nonexistent adapters |
| `vira-author-behavior` | Semantic Tasks, Behavior Points, Programs, Strategies |
| `vira-signals` | Consent-aware signal discovery, review, materialization, and producer mapping |
| `vira-strategies` | Strategy validation, simulation, activation, and execution continuation |
| `vira-build-pack` | Build and validate a Pack candidate |
| `vira-packs` | Pack import, install/materialization, evaluation, approval, release |
| `vira-observe-teach` | Evidence, Teach analysis/readback, recommendation decisions, and proposal lifecycle |
| `vira-evaluate` | Build and review synthetic evaluations and response quality checks |
| `vira-evaluate-release` | Evaluation, approval, and release boundaries |
| `vira-release` | Prepare explicit approval/release/deployment verification |
| `vira-runtime` | Governed runtime resolution, execution, receipts |
| `vira-chatbot` | Try the real local Next.js chatbot with Vira OFF or ON |
| `vira-studio` | Studio workflow guidance and access-state caveats |
| `vira-debug` | Surface-specific troubleshooting |
| `vira-lifecycle` | End-to-end behavior lifecycle planning |
| `vira-full-lifecycle` | Orchestrate a complete governed user workflow |

Shared sources: [capability matrix](../references/capability-matrix.md), [authority and safety](../references/authority-and-safety.md), [coverage and validation report](../docs/agent-skills/validation-status.md), [maintenance process](../docs/agent-skills/maintenance.md). These skills distinguish SDK, Python, HTTP, MCP, and Studio capability. MCP tools must be discovered at runtime; SDK operations are not automatically MCP tools.

For the complete customer journey, use `vira-full-lifecycle` with `vira-observe-teach`. The [Teach guide](../docs/teach.md) and [Marketing Agent tutorial](../tutorials/marketing-agent/README.md) walk through a real configured service, from permitted evidence and behavior review through runtime use and the next learning cycle. Each Skill folder includes a task-specific example or guide; the [coverage report](../docs/agent-skills/skill-status.md) distinguishes runnable examples from workflow guidance and unavailable product access.

## Runnable operation examples

- `vira-evaluate/examples/` includes a Pack-bound Behavior Evaluation runner. Live writes require explicit non-production and mutation flags.
- `vira-observe-teach/examples/` includes asynchronous Teach analysis creation/readback. Live writes require explicit non-production and mutation flags.
- `vira-chatbot/examples/` explains how to run the real local chatbot in OFF mode and, with the user's own access, ON mode.

Both examples require an operator-provided `VIRA_API_URL` and server-side credential, and call the configured Vira API through the published SDK. Never put credentials in prompts, source control, or logs. A run reports only the server state it reads; queued work is not a completed result.

## Validation state

Package selected skills as Anthropic-compatible `.skill` ZIP files with `python3 scripts/package_agent_skills.py vira-js-sdk` (archives are written to ignored `dist/skills/`). Export Anthropic `run_eval.py`-compatible binary trigger cases with `python3 scripts/export_skill_trigger_eval.py vira-js-sdk --out /tmp/vira-js-sdk-evals.json --ambiguous-out /tmp/vira-js-sdk-ambiguous.json`. Run the upstream evaluator only when Claude Code CLI is installed and configured. Run `python3 scripts/validate_agent_skills.py` and `python3 -m unittest discover -s skills/evals -v` from the repository root. The trigger dataset contains positive, negative, and ambiguous prompts for each Skill; `skills/evals/workflow-scenarios.jsonl` adds synthetic lifecycle execution cases with expected and forbidden behaviors. Offline checks do not prove model-trigger quality, live API behavior, package publication, or Studio access. Official OpenAI and Anthropic structural validators were run for an earlier version of the library, not this 24-Skill revision. No external model evaluation or live Vira service call is claimed. The Skills are not listed in the skills.sh directory, and no separate `.skill` archive release is claimed.
