# Install Vira Agent Skills

The library is designed around the open Agent Skills `SKILL.md` format. Install one skill or a small set; users do not need the full library.

## Licenses and bundled resources

The 27 Skills have their own [installation and commercial-use license](../../skills/vira-observe/LICENSE),
permitting copying into client apps, modifying the instructions, and distributing
them in project repositories with attribution. The public documentation outside
an official Skill archive and Vira's private backend retain different rights.
For marketplace redistribution, obtain legal review of this custom (non-OSI) license.

`npx skills add` installs source Skill files. Its remote documentation links
require network access. To install an **offline instructional/resource archive**,
build and verify the portable `.skill` ZIPs:

~~~bash
python3 scripts/package_agent_skills.py --out /tmp/tryvira-skills
python3 scripts/verify_portable_skills.py /tmp/tryvira-skills --expected 27
~~~

Each archive bundles the needed repository-owned references, selected runnable example folders (including three graded Packs and the Next.js chatbot) and source
examples in `references/repo/` and rewrites owned links locally. This does
**not** bundle external npm/PyPI SDKs or grant Vira hosted access.

## skills.sh / Codex / Claude Code / Cursor

From the target application repository, install a skill from this public repository's `main` branch:

```bash
npx skills add hrpering/tryvira
```

Follow the CLI's agent and skill selection prompts. For one skill, the current CLI supports selecting a named skill:

```bash
npx skills add hrpering/tryvira --skill vira-js-sdk
```

Use `npx skills add --help` to check current selector flags. The CLI documents support for Codex, Claude Code, and Cursor; installation writes skill files into the target repository for the selected agent. Start a new agent session after installation and confirm the installed skill appears before relying on it. This repository's collection is not yet listed in the skills.sh directory; the CLI installs from GitHub.

## Direct local installation

Copy one complete folder, including its `SKILL.md`, supporting resources, and `agents/` metadata, into the agent's supported skill location:

- **Codex:** `$CODEX_HOME/skills/vira-js-sdk/` (commonly `~/.codex/skills/vira-js-sdk/`)
- **Claude Code project:** `.claude/skills/vira-js-sdk/`
- **Claude Code personal:** `~/.claude/skills/vira-js-sdk/`
- **Cursor:** use the skills CLI, which selects and configures the supported target layout

For local experiments, point the agent directly at this repository's `skills/` directory if it supports additional skill directories. Do not copy the whole repository into an agent config directory.

## Codex metadata

`agents/openai.yaml` provides Codex UI display metadata. It is supplementary; the portable skill's required instructions and trigger description live in `SKILL.md`. Other agents can ignore `agents/openai.yaml`.

## Upgrade and removal

Re-run the skills CLI after updating the chosen repository ref; inspect the resulting diff before accepting it. To remove a skill, delete only the installed skill folder through the selected agent's normal project config workflow. Do not remove credentials or Vira application files as part of a skill update.

## Security

Review third-party skills before enabling them: skills may cause the agent to read files, run commands, or make network calls with the user's permissions. These Vira skills require environment-based credentials for API use, preserve scoped authority, and do not request production mutations without explicit authorization. The skill package itself contains no Vira credentials.

## Compatibility references

- [Agent Skills format](https://agentskills.io/specification)
- [skills CLI](https://skills.sh/docs/cli)
- [Claude Code skills](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Cursor skills via skills CLI](https://www.skills.sh/agent/cursor)
- [Codex skills via skills CLI](https://www.skills.sh/agent/codex)
