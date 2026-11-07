# Skill creator systems assessed

Assessed for this library on 2026-11-07. The workflow reuses their compatible mechanisms without copying entire repositories or claiming their hosted model-evaluation systems were run.

| System | Mechanisms actually used | Adopted here | Not claimed |
| --- | --- | --- | --- |
| Agent Skills specification | Read the current format guidance and applied its portable `SKILL.md` frontmatter/folder structure | Selective skill folders, concise triggers, progressive disclosure through shared references and examples | Compliance with every agent-specific extension or host runtime behavior |
| OpenAI Skill Creator | Ran official `init_skill.py` for the two new specialist skills, official `generate_openai_yaml.py` across the library, and official `quick_validate.py` across all 22 final skills | Consistent OpenAI UI metadata and official structural validation | OpenAI model-based evaluations or production integrations |
| Anthropic Skill Creator | Inspected upstream authoring/evaluation/packaging code; ran official `quick_validate.py` across all 22 skills and official `package_skill.py` for all 22 | Validator-backed `.skill` packages and trigger/workflow evaluation inputs | Claude model runs, `run_eval.py`, eval viewer, optimizer, or quality benchmark |
| Superpowers Writing Skills | Read its test-first writing guidance and used failure-mode regression cases to guide skill/example iteration | Positive/negative/ambiguous trigger cases and explicit expected/forbidden workflow outcomes | Independent red/green subagent or model runs; those were not run |
| skills.sh | Read CLI/distribution documentation | Selective `npx skills add <owner/repo> --skill <name>` installation instructions | A live skills.sh directory entry or publication of this library |

## Why these conventions

The Agent Skills spec defines the portable core. OpenAI's generator adds Codex UI metadata. Anthropic's validator and packager check structure and distribution shape. Superpowers' test-first guidance informs regression cases. None of these structural mechanisms proves that a model selects or executes a skill successfully. The repository therefore separates structural checks, deterministic fixtures, package artifact checks, model evaluation, and live Vira testing.

## Upstream references

- [Agent Skills specification](https://agentskills.io/specification)
- [Anthropic Skill Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [OpenAI Skill Creator](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)
- [Superpowers Writing Skills](https://github.com/obra/superpowers/tree/main/skills/writing-skills)
- [skills.sh CLI docs](https://skills.sh/docs/cli)
- [skills.sh distribution docs](https://skills.sh/docs)
