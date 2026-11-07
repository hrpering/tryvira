#!/usr/bin/env python3
"""Build portable `.skill` ZIP-format archives for selected Agent Skills (stdlib only)."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import argparse
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=ROOT / "dist" / "skills")
    parser.add_argument("skills", nargs="*", help="Skill folder names; defaults to all vira-* skills")
    args = parser.parse_args()
    check = subprocess.run([sys.executable, str(ROOT / "scripts/validate_agent_skills.py")], cwd=ROOT)
    if check.returncode:
        return check.returncode
    names = args.skills or sorted(p.name for p in SKILLS.glob("vira-*"))
    out = args.out if args.out.is_absolute() else ROOT / args.out
    out.mkdir(parents=True, exist_ok=True)
    for name in names:
        if not re.fullmatch(r"vira-[a-z0-9]+(?:-[a-z0-9]+)*", name):
            parser.error(f"invalid skill name: {name}")
        folder = SKILLS / name
        if not folder.is_dir() or not (folder / "SKILL.md").is_file():
            parser.error(f"unknown or incomplete skill: {name}")
        archive = out / f"{name}.skill"
        with ZipFile(archive, "w", ZIP_DEFLATED) as zf:
            for file in sorted(folder.rglob("*")):
                if not file.is_file():
                    continue
                relative = file.relative_to(folder.parent)
                if any(part in {"__pycache__", "node_modules", "evals"} for part in relative.parts) or file.name == ".DS_Store" or file.suffix == ".pyc":
                    continue
                zf.write(file, relative)
        print(archive)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
