#!/usr/bin/env python3
"""Create standalone .skill archives, mirroring owned linked resources under references/repo/.

Offline portability applies to the **Skill instructions and repository resources**.
External SDK packages, real provider connectivity and Vira tenant access are still required
for live execution. No product operation is simulated here.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import deque
from pathlib import Path
from urllib.parse import unquote
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
REPO_LINK = re.compile(
    r"https://github\.com/hrpering/tryvira/(?:blob|tree)/main/"
    r"([A-Za-z0-9_\-./%]+)(#[A-Za-z0-9_\-./%]+)?"
)
MARKDOWN_LINK = re.compile(r"\]\(([^)]+)\)")
EXCLUDED = {".git", "node_modules", ".venv", "__pycache__", "dist", ".next", "evals"}
EXTRA_RESOURCES = {
    "vira-build-pack": [
        "scripts/package-example-packs.py", "scripts/verify-pack-examples.mjs",
        "examples/packs/recipe-preferences", "examples/packs/retail-media-review",
        "examples/packs/operations-orchestration"
    ],
    "vira-packs": [
        "scripts/package-example-packs.py",
        "examples/packs/recipe-preferences", "examples/packs/retail-media-review",
        "examples/packs/operations-orchestration"
    ],
    "vira-chatbot": ["examples/frameworks/node-next", "skills/vira-observe/examples/event-contract.mjs"],
    "vira-framework-integration": ["examples/frameworks/node-next", "skills/vira-observe/examples/event-contract.mjs"],
    "vira-task-runs": [
        "examples/javascript/taskrun-modes.mjs",
        "examples/python/taskrun_modes.py"
    ],
    "vira-full-lifecycle": [
        "examples/javascript/skill-e2e-acceptance.mjs",
        "examples/javascript/skill-e2e-assertions.mjs"
    ],
}
MAX_RESOURCE_FILES = 450
MAX_FILE_BYTES = 750_000


def in_repo(path: Path) -> bool:
    try:
        path.resolve().relative_to(ROOT.resolve())
        return True
    except ValueError:
        return False


def source_paths(text: str) -> set[Path]:
    result: set[Path] = set()
    for match in REPO_LINK.finditer(text):
        path = ROOT / unquote(match.group(1))
        if in_repo(path) and path.exists():
            result.add(path.resolve())
        else:
            raise ValueError(f"Public repository reference missing: {match.group(0)}")
    return result


def safe_files(folder: Path):
    for path in sorted(folder.rglob("*")):
        if not path.is_file() or any(part in EXCLUDED for part in path.relative_to(ROOT).parts):
            continue
        if path.name == ".DS_Store" or path.suffix == ".pyc":
            continue
        if path.stat().st_size > MAX_FILE_BYTES:
            raise ValueError(f"Reference too large for portable Skill: {path}")
        yield path.resolve()


def dependencies(path: Path) -> set[Path]:
    # Reproduce local Markdown dependencies in the same relative repo layout.
    if path.suffix.lower() != ".md":
        return set()
    text = path.read_text(encoding="utf8")
    direct = source_paths(text)
    for raw in MARKDOWN_LINK.findall(text):
        target = raw.strip().split("#", 1)[0].strip().strip("<>")
        if not target or "://" in target or target.startswith(("mailto:", "#")):
            continue
        candidate = (path.parent / unquote(target)).resolve()
        if in_repo(candidate) and candidate.exists():
            direct.add(candidate)
        # External URLs and generated anchors are not part of the local archive.
    return direct


def gather_resources(skill: Path) -> list[Path]:
    initial = [ROOT / path for path in EXTRA_RESOURCES.get(skill.name, ())]
    for input_path in [skill / "SKILL.md", skill / "examples" / "README.md"]:
        if input_path.is_file():
            initial.extend(sorted(source_paths(input_path.read_text(encoding="utf8"))))
    seen: set[Path] = set()
    queue = deque(initial)
    while queue:
        candidate = queue.popleft()
        if not in_repo(candidate):
            raise ValueError(f"Reference escaped repository root: {candidate}")
        if candidate.is_dir():
            for child in safe_files(candidate):
                queue.append(child)
            continue
        if not candidate.exists() or not candidate.is_file():
            raise ValueError(f"Referenced file missing: {candidate}")
        if any(part in EXCLUDED for part in candidate.relative_to(ROOT).parts):
            continue
        if candidate in seen:
            continue
        if candidate.stat().st_size > MAX_FILE_BYTES:
            raise ValueError(f"Reference too large for portable Skill: {candidate}")
        seen.add(candidate)
        if len(seen) > MAX_RESOURCE_FILES:
            raise ValueError(f"Resource closure too large ({len(seen)}); use narrower Skill references")
        for linked in dependencies(candidate):
            if linked not in seen:
                queue.append(linked)
    return sorted(seen)


def rewrite_public_links(content: str, folder_prefix: str) -> str:
    def replace(match: re.Match) -> str:
        relative = unquote(match.group(1))
        anchor = match.group(2) or ""
        return f"{folder_prefix}references/repo/{relative}{anchor}"
    return REPO_LINK.sub(replace, content)


def create_package(skill_name: str, output_dir: Path) -> Path:
    folder = SKILLS / skill_name
    if not folder.is_dir() or not (folder / "SKILL.md").is_file():
        raise ValueError(f"Unknown Skill: {skill_name}")
    resources = gather_resources(folder)
    archive = output_dir / f"{skill_name}.skill"
    with ZipFile(archive, "w", ZIP_DEFLATED) as zf:
        for path in safe_files(folder):
            rel = path.relative_to(folder.parent).as_posix()
            data = path.read_bytes()
            if path.name.endswith(".md"):
                prefix = "../" if path.relative_to(folder).parts[0] == "examples" else ""
                data = rewrite_public_links(data.decode("utf8"), prefix).encode("utf8")
            zf.writestr(rel, data)
        for path in resources:
            rel = path.relative_to(ROOT).as_posix()
            zf.write(path, f"{skill_name}/references/repo/{rel}")
        manifest = {
            "schemaVersion": 1,
            "skill": skill_name,
            "resourceFiles": [p.relative_to(ROOT).as_posix() for p in resources],
            "offlineDocumentResources": True,
            "externalSdkInstallationRequired": True,
            "liveViraTenantRequiredForApi": True,
            "liveProviderOutputVerified": False,
            "syntheticRuntimeReceipts": False,
        }
        zf.writestr(f"{skill_name}/references/manifest.json", json.dumps(manifest, indent=2) + "\n")
    with ZipFile(archive) as zf:
        if zf.testzip() is not None:
            raise ValueError(f"Corrupt Skill archive: {archive}")
    print(f"SKILL_ARCHIVE_CREATED {archive} referenced_files={len(resources)}")
    return archive


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=ROOT / "dist" / "skills")
    parser.add_argument("skills", nargs="*", help="Skill folder names; default all vira-*")
    args = parser.parse_args()
    result = subprocess.run([sys.executable, str(ROOT / "scripts/validate_agent_skills.py")], cwd=ROOT)
    if result.returncode:
        return result.returncode
    names = args.skills or sorted(p.name for p in SKILLS.glob("vira-*"))
    output_dir = args.out if args.out.is_absolute() else ROOT / args.out
    output_dir.mkdir(parents=True, exist_ok=True)
    for name in names:
        if not re.fullmatch(r"vira-[a-z0-9]+(?:-[a-z0-9]+)*", name):
            parser.error(f"Invalid Skill name: {name}")
        create_package(name, output_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
