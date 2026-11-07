#!/usr/bin/env python3
"""Dependency-free structural validation for this repository's Agent Skills."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
errors: list[str] = []


def fail(path: Path, message: str) -> None:
    errors.append(f"{path.relative_to(ROOT)}: {message}")


def frontmatter(text: str):
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end < 0:
        return None
    fields = {}
    for line in text[4:end].splitlines():
        match = re.match(r"^([a-zA-Z_][\w-]*):\s*(.*?)\s*$", line)
        if match:
            value = match.group(2).strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            fields[match.group(1)] = value
    return fields


for skill_dir in sorted(SKILLS.glob("vira-*")):
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        fail(skill_dir, "missing SKILL.md")
        continue
    text = skill_file.read_text(encoding="utf-8")
    meta = frontmatter(text)
    if meta is None:
        fail(skill_file, "missing or malformed YAML frontmatter")
        continue
    name = meta.get("name", "")
    desc = meta.get("description", "")
    if name != skill_dir.name:
        fail(skill_file, f"name {name!r} must match folder {skill_dir.name!r}")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name) or len(name) > 64:
        fail(skill_file, "name must be lowercase hyphenated text, at most 64 characters")
    if not desc or len(desc) > 1024 or "TODO" in desc:
        fail(skill_file, "description must be nonempty, <=1024 chars, and not a scaffold")
    if not meta.get("license") or not (skill_dir / "LICENSE").is_file():
        fail(skill_file, "skill license must be explicit and bundled")
    for match in re.finditer(r"\]\(([^)]+)\)", text):
        target = match.group(1).split("#", 1)[0]
        if not target or target.startswith(("https://", "http://", "mailto:", "#")):
            continue
        if not (skill_file.parent / target).resolve().exists():
            fail(skill_file, f"broken relative link: {target}")
    ui = skill_dir / "agents/openai.yaml"
    if not ui.is_file():
        fail(ui, "missing OpenAI metadata")
    else:
        ui_text = ui.read_text(encoding="utf-8")
        for key in ("display_name:", "short_description:", "default_prompt:"):
            if key not in ui_text:
                fail(ui, f"missing {key[:-1]} field")
        short = re.search(r'^\s*short_description:\s*[\"\']?(.*?)[\"\']?\s*$', ui_text, re.M)
        if short and not (25 <= len(short.group(1)) <= 64):
            fail(ui, "short_description must be 25-64 characters")
        default = re.search(r'^\s*default_prompt:\s*[\"\']?(.*?)[\"\']?\s*$', ui_text, re.M)
        if default and f"${name}" not in default.group(1):
            fail(ui, "default_prompt must invoke the matching $skill-name")

if errors:
    print("Agent Skill validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    sys.exit(1)
print(f"Validated {len(list(SKILLS.glob('vira-*/SKILL.md')))} Agent Skills.")
