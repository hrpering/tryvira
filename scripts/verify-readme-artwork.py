#!/usr/bin/env python3
"""Verify the README visual system: clean wordmark, real links, no obsolete graphics."""
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
IMAGES = {
    "assets/vira-hero.svg",
    "assets/vira-lifecycle.svg",
    "assets/vira-build.svg",
    "assets/vira-on-off.svg",
    "assets/vira-social-preview.svg",
}
USAGE = {
    "README.md": {"vira-hero.svg", "vira-lifecycle.svg", "vira-build.svg", "vira-on-off.svg"},
    "README.tr.md": {"vira-hero.svg", "vira-lifecycle.svg", "vira-build.svg", "vira-on-off.svg"},
    "docs/how-vira-works.md": {"vira-lifecycle.svg"},
    "docs/README.md": {"vira-lifecycle.svg"},
    "skills/README.md": {"vira-build.svg"},
    "examples/packs/README.md": {"vira-build.svg"},
    "examples/frameworks/node-next/README.md": {"vira-on-off.svg"},
    "docs/github-repository-metadata.md": {"vira-social-preview.svg"},
}
OLD = (
    "vira-overview.svg",
    "vira-request-path.svg",
    "vira-integrations.svg",
    "vira-use-cases.svg",
    "social-preview.png",
    "Vira Davranış Döngüsü Infografiği.png",
)
actual = {str(path.relative_to(ROOT)) for path in (ROOT / "assets").iterdir() if path.is_file()}
if actual != IMAGES:
    raise SystemExit("ARTWORK_ASSET_INVENTORY_MISMATCH missing="
                     + str(sorted(IMAGES-actual)) + " old_or_extra=" + str(sorted(actual-IMAGES)))
for img in sorted(IMAGES):
    path = ROOT / img
    tree = ET.parse(path)
    root = tree.getroot()
    if not root.tag.endswith("svg"):
        raise SystemExit("ARTWORK_NOT_SVG " + img)
    if not root.attrib.get("viewBox"):
        raise SystemExit("ARTWORK_NO_VIEWBOX " + img)
    text = path.read_text(encoding="utf8")
    if ">vira</text>" not in text:
        raise SystemExit("ARTWORK_PLAIN_VIRA_WORDMARK_MISSING " + img)
    if "<script" in text or "foreignObject" in text or "<image " in text:
        raise SystemExit("ARTWORK_HAS_EXTERNAL_OR_SCRIPT_DEPENDENCY " + img)
    if any(bad in text.lower() for bad in ("98%", "96%", "receipt available", "verified ✓")):
        raise SystemExit("ARTWORK_HAS_UNGROUNDED_PERFORMANCE_OR_VERIFICATION " + img)
for page, names in USAGE.items():
    text = (ROOT / page).read_text(encoding="utf8")
    for name in names:
        if name not in text:
            raise SystemExit("ARTWORK_NOT_PLACED " + page + ": " + name)
for path in ROOT.rglob("*.md"):
    if any(p in {".git", "node_modules", ".venv", "dist"} for p in path.parts):
        continue
    text = path.read_text(encoding="utf8")
    for name in OLD:
        if name in text:
            raise SystemExit("OBSOLETE_ARTWORK_REFERENCE " + str(path.relative_to(ROOT)) + " " + name)
print(f"README_ARTWORK_PASS: {len(IMAGES)} valid self-contained SVGs, {len(USAGE)} placements, no old images/references")
