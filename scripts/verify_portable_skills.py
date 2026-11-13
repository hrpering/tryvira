#!/usr/bin/env python3
"""Validate every portable .skill package using only archive bytes, never a repository checkout."""
from __future__ import annotations

import argparse
import json
import posixpath
import re
import sys
from pathlib import PurePosixPath
from zipfile import ZipFile

MD_LINKS = re.compile(r"\]\(([^)]+)\)")
REQUIRED = {"SKILL.md", "LICENSE", "agents/openai.yaml", "examples/README.md", "references/manifest.json"}

def validate(package: str, expected_name: str) -> list[str]:
    problems: list[str] = []
    with ZipFile(package) as zf:
        paths = set(zf.namelist())
        prefix = expected_name + "/"
        if any(not p.startswith(prefix) or p.startswith("/") or ".." in PurePosixPath(p).parts for p in paths):
            problems.append("archive traversal or foreign Skill file")
        for file in REQUIRED:
            if prefix + file not in paths:
                problems.append("missing " + file)
        if problems:
            return problems
        manifest = json.loads(zf.read(prefix + "references/manifest.json"))
        if manifest.get("skill") != expected_name or manifest.get("liveProviderOutputVerified") is not False:
            problems.append("invalid manifest or misleading live-verified flag")
        mirrored = set()
        for ref in manifest.get("resourceFiles", []):
            relative = prefix + "references/repo/" + ref
            if relative not in paths:
                problems.append("missing mirrored repo dependency " + ref)
            mirrored.add(relative)
        if not mirrored:
            problems.append("standalone archive contains no repository references")
        skill = zf.read(prefix + "SKILL.md").decode("utf8")
        if "https://github.com/hrpering/tryvira/blob/main/" in skill:
            problems.append("Skill still needs GitHub to open its own repo-owned file")
        for filename in sorted(paths):
            if filename.endswith(".md"):
                contents = zf.read(filename).decode("utf8")
                if filename in (prefix+"SKILL.md",prefix+"examples/README.md"):
                    if "https://github.com/hrpering/tryvira/blob/main/" in contents:
                        problems.append(f"{filename}: unresolved GitHub file reference")
                for link in MD_LINKS.findall(contents):
                    value = link.strip().split("#", 1)[0].strip("<>")
                    if not value or value.startswith(("https://","http://","mailto:","#")) or "://" in value:
                        continue
                    dest = posixpath.normpath(posixpath.join(posixpath.dirname(filename), value))
                    if dest not in paths and not any(p.startswith(dest.rstrip("/")+"/") for p in paths):
                        # Only local links inside mirrored / original Skill-owned docs count.
                        problems.append(f"{filename}: broken local link: {link}")
    return problems

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory")
    parser.add_argument("--expected",type=int,default=27)
    args = parser.parse_args()
    from pathlib import Path
    archives = sorted(Path(args.directory).glob("vira-*.skill"))
    if len(archives) != args.expected:
        print(f"PORTABLE_SKILLS_FAILED: expected {args.expected}, found {len(archives)}",file=sys.stderr)
        return 1
    all_issues=[]
    for arc in archives:
        name=arc.stem
        issues=validate(str(arc),name)
        if issues:
            all_issues.extend(f"{name}: {i}" for i in issues)
        else:
            print("PORTABLE_SKILL_PASS",name)
    if all_issues:
        print("PORTABLE_SKILLS_FAILED\n"+"\n".join(all_issues),file=sys.stderr)
        return 1
    print(f"PORTABLE_SKILLS_ALL_PASS {len(archives)}/{args.expected} archives inspected independently")
    return 0

if __name__=="__main__":
    raise SystemExit(main())
