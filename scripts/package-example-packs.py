"""Build four candidate ZIPs for Pack Academy source examples.

Checks source packaging only, not server materialization, evaluation or release.
Design-time tests/cases.json and README content are excluded from each archive.
"""
from __future__ import annotations

import argparse
import io
import json
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1] / "examples" / "packs"
NAMES = ("recipe-preferences", "retail-media-review", "operations-orchestration", "marketing-starter")
COLLECTIONS = (
    "semantic-tasks", "behavior-points", "behavior-programs",
    "behavior-strategies", "policies", "signals", "teach-patterns",
    "evaluations", "connectors", "templates",
)

def manifest_version(directory: Path) -> str:
    content = (directory / "pack.yaml").read_text(encoding="utf-8")
    match = re.search(r"^version:\s*(\d+\.\d+\.\d+)\s*$", content, re.MULTILINE)
    if match is None:
        raise RuntimeError(f"{directory.name}: missing semantic manifest version")
    return match.group(1)

def package(name: str) -> bytes:
    directory = ROOT / name
    manifest = directory / "pack.yaml"
    if not manifest.is_file():
        raise RuntimeError(f"{name}: missing pack.yaml")
    manifest_version(directory)
    payload = io.BytesIO()
    entries = ["pack.yaml"]
    with ZipFile(payload, "w", compression=ZIP_DEFLATED) as archive:
        archive.write(manifest, "pack.yaml")
        for collection in COLLECTIONS:
            filename = directory / collection / "items.json"
            if not filename.is_file():
                continue
            parsed = json.loads(filename.read_text(encoding="utf-8"))
            if not isinstance(parsed, list):
                raise RuntimeError(f"{name}: {collection}/items.json must contain an array")
            arcname = f"{collection}/items.json"
            archive.write(filename, arcname)
            entries.append(arcname)
    result = payload.getvalue()
    with ZipFile(io.BytesIO(result)) as archive:
        if sorted(archive.namelist()) != sorted(entries):
            raise RuntimeError(f"{name}: archive members do not match known collection files")
        if any(path.startswith("tests/") or path.endswith(".md") for path in archive.namelist()):
            raise RuntimeError(f"{name}: design-time fixtures/readmes must not become Pack objects")
        if archive.testzip() is not None:
            raise RuntimeError(f"{name}: corrupt ZIP")
    return result

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate in-memory ZIP packaging")
    parser.add_argument("--out", type=Path, help="Write ZIP files to this directory")
    args = parser.parse_args()
    if not args.check and args.out is None:
        parser.error("Pass --check or --out DIR")
    for name in NAMES:
        result = package(name)
        if args.out is not None:
            args.out.mkdir(parents=True, exist_ok=True)
            destination = args.out / f"vira-{name}-{manifest_version(ROOT / name)}.zip"
            destination.write_bytes(result)
            print(f"PACK_ARCHIVE_CREATED {destination} ({len(result)} bytes)")
        else:
            print(f"PACK_ARCHIVE_CHECK_PASS {name} ({len(result)} bytes, no archive written)")

if __name__ == "__main__":
    main()
