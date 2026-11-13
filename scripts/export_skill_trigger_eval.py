#!/usr/bin/env python3
"""Export one skill's positive/negative queries in Anthropic run_eval.py format."""
from pathlib import Path
import argparse
import json

ROOT = Path(__file__).resolve().parents[1]
DATASET = ROOT / "skills/evals/trigger-scenarios.jsonl"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("skill", help="Skill folder name, e.g. vira-js-sdk")
    parser.add_argument("--out", required=True, type=Path, help="Output path for the run_eval.py JSON array")
    parser.add_argument("--ambiguous-out", type=Path, help="Optional path for excluded ambiguous cases")
    args = parser.parse_args()
    rows = [json.loads(line) for line in DATASET.read_text().splitlines() if line.strip()]
    selected = [row for row in rows if row["skill"] == args.skill]
    if not selected or not (ROOT / "skills" / args.skill / "SKILL.md").is_file():
        parser.error(f"unknown skill or no trigger cases: {args.skill}")
    eval_set = [
        {"query": row["prompt"], "should_trigger": row["should_trigger"]}
        for row in selected if row["kind"] in {"positive", "negative"}
    ]
    ambiguous = [
        {"query": row["prompt"], "handling": "clarify the target surface or route to vira-get-started"}
        for row in selected if row["kind"] == "ambiguous"
    ]
    if not eval_set or not ambiguous:
        parser.error("each skill must have positive/negative and ambiguous trigger cases")
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(eval_set, ensure_ascii=False, indent=2) + "\n")
    if args.ambiguous_out:
        args.ambiguous_out.parent.mkdir(parents=True, exist_ok=True)
        args.ambiguous_out.write_text(json.dumps(ambiguous, ensure_ascii=False, indent=2) + "\n")
    print(f"Exported {len(eval_set)} binary trigger queries; {len(ambiguous)} ambiguous cases excluded from binary scoring.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
