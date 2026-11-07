# Skill creator workflow and evidence

This library uses the format and local metadata conventions from the OpenAI Codex Agent Skills creator and Anthropic's official skill-creator. They are authoring/validation utilities; neither guarantees task success or Vira contract correctness.

## Applied workflow

1. Inventory public Vira surfaces and map each user job to the relevant skill. Verify gaps against the public capability matrix; do not invent missing features.
2. For new skills, use the official initializer, then replace scaffold text with focused workflows, explicit preconditions, authority boundaries, and linked public references.
3. Generate the OpenAI `agents/openai.yaml` metadata with the official OpenAI metadata generator. Keep the main `SKILL.md` portable and move detailed references/examples into separate files where appropriate.
4. Apply test-driven authoring: add an offline regression/trigger case that captures the failure mode, confirm it fails, then update the skill and re-run. These fixtures do not substitute for model evaluations.
5. Run the OpenAI and Anthropic official structural validators, repository validator, offline tests, package the skills, and inspect archive contents.
6. If available and authorized, run model-trigger evaluations and real integration checks in a disposable non-production environment. Record model/version, harness, prompts, selection/execution outcomes, and errors separately from unit tests.
7. Review the final diff for unsupported claims, credentials, private data/implementation detail, license errors, and accidental authority shortcuts.

## Evidence and current limits

For the current local change set, OpenAI's initializer was run for the two new skills, the official OpenAI metadata generator was run across all skills, and OpenAI plus Anthropic official validators passed on all 22 skills. Anthropic's official packager generated 22 validated archives under `/private/tmp`. Next.js build and tests, MCP discovery fixture, FastAPI tests, and LangGraph graph tests passed. These are local/fixture results, not model-trigger or live-service evaluations.

Anthropic's packaging tool is available separately from structural validation. A successful `.skill` archive only proves packaging shape. Offline mocks do not prove Vira service behavior, Studio access, model triggering, dependency registry availability, or deployment readiness. No live Vira call, model-trigger evaluation, publish, or deployment is claimed here.
