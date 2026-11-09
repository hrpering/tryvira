# Vira Agent Skills

Portable, proprietary Agent Skills for integrating with and operating Vira through documented public surfaces. The library is in active development and is not yet published to skills.sh.

## Install

From the target application repository, install one skill from this public repository’s `main` branch:

```bash
npx skills add hrpering/tryvira --skill vira-js-sdk
```

Install the full library by omitting `--skill` or select the target agent in the CLI. See [installation and compatibility details](../docs/agent-skills/installation.md). For a local checkout, point your agent at `skills/` or copy the selected skill folder into its supported skills directory.

## Skills

| Skill | Use it for |
| --- | --- |
| `vira-get-started` | Inspect a project and choose the supported integration path |
| `vira-npm-cli` | Install/upgrade npm SDK and MCP package safely |
| `vira-integrate-app` | Select the appropriate documented integration surface |
| `vira-js-sdk` | JavaScript/TypeScript SDK implementation |
| `vira-python-sdk` | Python SDK implementation |
| `vira-mcp` | Published MCP configuration and runtime tool discovery |
| `vira-http-api` | HTTP operations, auth, and scope |
| `vira-framework-integration` | Framework-neutral integration without claiming nonexistent adapters |
| `vira-author-behavior` | Semantic Tasks, Behavior Points, Programs, Strategies |
| `vira-signals` | Consent-aware signal discovery, review, materialization, and producer mapping |
| `vira-strategies` | Strategy validation, simulation, activation, and execution continuation |
| `vira-build-pack` | Build and validate a Pack candidate |
| `vira-packs` | Pack import, install/materialization, evaluation, approval, release |
| `vira-observe-teach` | Evidence and Teach proposal lifecycle |
| `vira-evaluate` | Build and review synthetic evaluations and response quality checks |
| `vira-evaluate-release` | Evaluation, approval, and release boundaries |
| `vira-release` | Prepare explicit approval/release/deployment verification |
| `vira-runtime` | Governed runtime resolution, execution, receipts |
| `vira-studio` | Studio workflow guidance and access-state caveats |
| `vira-debug` | Surface-specific troubleshooting |
| `vira-lifecycle` | End-to-end behavior lifecycle planning |
| `vira-full-lifecycle` | Orchestrate a complete governed user workflow |

Shared sources: [capability matrix](../references/capability-matrix.md), [authority and safety](../references/authority-and-safety.md), [coverage and validation report](../docs/agent-skills/validation-status.md), [maintenance process](../docs/agent-skills/maintenance.md). These skills distinguish SDK, Python, HTTP, MCP, and Studio capability. MCP tools must be discovered at runtime; SDK operations are not automatically MCP tools.

## Runnable operation examples

- `vira-evaluate/examples/` includes a Pack-bound Behavior Evaluation runner. Live writes require explicit non-production and mutation flags.
- `vira-observe-teach/examples/` includes asynchronous Teach analysis creation/readback. Live writes require explicit non-production and mutation flags.

Both examples require an operator-provided `VIRA_API_URL` and server-side credential, and call the configured Vira API through the published SDK. Never put credentials in prompts, source control, or logs. A run reports only the server state it reads; queued work is not a completed result.

## Validation state

Package selected skills as Anthropic-compatible `.skill` ZIP files with `python3 scripts/package_agent_skills.py vira-js-sdk` (archives are written to ignored `dist/skills/`). Export Anthropic `run_eval.py`-compatible binary trigger cases with `python3 scripts/export_skill_trigger_eval.py vira-js-sdk --out /tmp/vira-js-sdk-evals.json --ambiguous-out /tmp/vira-js-sdk-ambiguous.json`. Run the upstream evaluator only when Claude Code CLI is installed and configured. Run `python3 scripts/validate_agent_skills.py` and `python3 -m unittest discover -s skills/evals -v` from the repository root. The trigger dataset contains positive, negative, and ambiguous prompts for each skill; `skills/evals/workflow-scenarios.jsonl` adds synthetic lifecycle execution cases with expected and forbidden behaviors; offline scenario assertions and structural checks do not prove model-trigger quality, live API behavior, package publication, or Studio access. Official OpenAI and Anthropic structural validators were run locally; no external model evaluation or live service call is claimed. No skill package or repository change has been published from this work.
