#!/usr/bin/env python3
"""Dry-run extraction of all verified portable Skills into agent-style directories.

This tests archive extraction and file layouts, NOT actual agent registration,
automatic Skill selection or live provider execution.
"""
import argparse
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess
import sys
from zipfile import ZipFile

TARGETS = { "codex": ".codex/skills", "claude": ".claude/skills", "cursor": ".cursor/skills" }

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive_directory",type=Path)
    parser.add_argument("--expected",type=int,default=27)
    args=parser.parse_args()
    archives=sorted(args.archive_directory.glob("vira-*.skill"))
    if len(archives)!=args.expected:
        raise SystemExit(f"EXPECTED_{args.expected}_SKILLS_FOUND_{len(archives)}")
    with TemporaryDirectory(prefix="vira-skill-clean-install-") as tmp:
        for target,relative in TARGETS.items():
            destination=Path(tmp)/target/relative
            destination.mkdir(parents=True,exist_ok=True)
            for archive in archives:
                with ZipFile(archive) as bundle:
                    # The portable validator must have already rejected traversal entries.
                    for entry in bundle.namelist():
                        if entry.startswith("/") or ".." in Path(entry).parts:
                            raise SystemExit(f"ARCHIVE_PATH_TRAVERSAL:{archive.name}")
                    bundle.extractall(destination)
                skill=destination/archive.stem
                for rel in ("SKILL.md","LICENSE","agents/openai.yaml","examples/README.md","references/manifest.json"):
                    if not (skill/rel).is_file():
                        raise SystemExit(f"INSTALL_MISSING:{target}:{archive.stem}:{rel}")
                if not any((skill/"references/repo").rglob("*")):
                    raise SystemExit(f"INSTALL_REFERENCES_MISSING:{target}:{archive.stem}")
            builder = destination/"vira-build-pack"/"references"/"repo"/"scripts"/"package-example-packs.py"
            if not builder.is_file():
                raise SystemExit(f"STANDALONE_PACK_BUILDER_MISSING:{target}")
            result = subprocess.run(
                [sys.executable,str(builder),"--check"],
                cwd=builder.parent.parent,capture_output=True,text=True
            )
            if result.returncode:
                raise SystemExit(f"STANDALONE_PACK_BUILDER_FAILED:{target}: {result.stderr[-800:]}")
            sample = destination/"vira-chatbot"/"references"/"repo"/"examples"/"frameworks"/"node-next"
            if not (sample/"package-lock.json").is_file():
                raise SystemExit(f"STANDALONE_NEXTJS_LOCK_MISSING:{target}")
            observe_helper = destination/"vira-chatbot"/"references"/"repo"/"skills"/"vira-observe"/"examples"/"event-contract.mjs"
            if not observe_helper.is_file():
                raise SystemExit(f"STANDALONE_NEXTJS_OBSERVE_HELPER_MISSING:{target}")
            print(f"SKILL_INSTALL_LAYOUT_PASS {target} {len(archives)} archives; Pack ZIP builder PASS")
    print(f"SKILL_INSTALL_LAYOUTS_PASS {len(archives)} x {len(TARGETS)} (NO AGENT INVOCATION)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
