#!/usr/bin/env python3
"""Run and score real agent Skill auto-selection traces.

No model, SDK or Vira API is faked by this script. It executes an explicitly supplied
agent adapter command once per synthetic prompt, reads JSON from stdout and requires
the adapter to identify the actual model and Skill load evidence. Without a command,
only dataset validation/score over independently collected traces is available.
"""
from __future__ import annotations

import argparse
import json
import shlex
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS = ROOT / "skills" / "evals" / "trigger-scenarios.jsonl"
SKILLS = ROOT / "skills"


def read_jsonl(path: Path) -> list[dict]:
    rows = []
    for lineno, line in enumerate(path.read_text(encoding="utf8").splitlines(), 1):
        if line.strip():
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as exc:
                raise ValueError(f"{path}:{lineno}: invalid JSON") from exc
    return rows


def validate_dataset(data: list[dict]) -> list[dict]:
    names = {p.parent.name for p in SKILLS.glob("vira-*/SKILL.md")}
    if len(data) < 3 * len(names):
        raise ValueError(f"Expected at least 3 cases for each of {len(names)} skills, found {len(data)}")
    buckets: dict[str, set[str]] = defaultdict(set)
    cases = []
    counters = Counter()
    for row in data:
        if row.get("skill") not in names or row.get("kind") not in {"positive", "negative", "ambiguous"}:
            raise ValueError("Invalid corpus target/kind")
        expected = {"positive": True, "negative": False, "ambiguous": None}[row["kind"]]
        if row.get("should_trigger", object()) is not expected or not row.get("prompt", "").strip():
            raise ValueError("Invalid corpus prompt or label")
        buckets[row["skill"]].add(row["kind"])
        counters[(row["skill"], row["kind"])] += 1
        cases.append({**row, "caseId": f"{row['skill']}::{row['kind']}::{counters[(row['skill'],row['kind'])]}"})
    if any(buckets[name] != {"positive", "negative", "ambiguous"} for name in names):
        raise ValueError("A Skill is missing one or more intent classes")
    return cases


def check_trace(row: dict, case: dict) -> list[str]:
    errors = []
    if row.get("caseId") != case["caseId"]:
        errors.append("case ID mismatch")
    if not isinstance(row.get("model"), str) or not row["model"].strip():
        errors.append("missing actual model identifier")
    if not isinstance(row.get("agent"), str) or not row["agent"].strip():
        errors.append("missing actual agent identifier")
    if not isinstance(row.get("traceId"), str) or not row["traceId"].strip():
        errors.append("missing trace ID")
    selected = row.get("selectedSkills")
    if not isinstance(selected, list) or any(not isinstance(s, str) for s in selected):
        errors.append("selectedSkills must be the agent's observed Skill loads")
    events = row.get("skillLoadEvents")
    if not isinstance(events, list):
        errors.append("skillLoadEvents must contain observed Skill-load events (empty is valid)")
    elif isinstance(selected, list):
        actual = []
        for event in events:
            if not isinstance(event, dict) or event.get("eventType") != "skill_loaded":
                errors.append("invalid Skill-load event type")
                continue
            key, uri = event.get("skill"), event.get("sourcePath")
            if not isinstance(key, str) or not isinstance(uri, str) or not uri.endswith("/skills/"+key+"/SKILL.md"):
                errors.append("Skill-load event does not identify a real Skill path")
            if event.get("traceId") != row.get("traceId"):
                errors.append("Skill-load event trace ID mismatch")
            actual.append(key)
        if set(actual) != set(selected):
            errors.append("selectedSkills is not derived from observed Skill-load events")
    if row.get("source") != "live_agent_trace":
        errors.append("source must be a real live_agent_trace, not a proposed response")
    if row.get("simulated") is not False:
        errors.append("simulated must explicitly be false")
    return errors


def run_agents(cases: list[dict], command: str, timeout_seconds: int) -> list[dict]:
    tokens = shlex.split(command)
    if not tokens:
        raise ValueError("Agent command required; a fake model selection is not allowed")
    results = []
    available = sorted(p.parent.name for p in SKILLS.glob("vira-*/SKILL.md"))
    for case in cases:
        payload = {
            "caseId": case["caseId"],
            "prompt": case["prompt"],
            "skillsRoot": str(SKILLS.resolve()),
            "availableSkills": available,
            "requiredEvidence": ["traceId", "agent", "model", "selectedSkills", "skillLoadEvents", "source", "simulated"],
        }
        # The adapter itself must run the real agent with this Skill library installed
        # and return Skill-load observations, never an LLM-written guess.
        process = subprocess.run(
            tokens, input=json.dumps(payload), text=True, capture_output=True,
            timeout=timeout_seconds, check=False
        )
        if process.returncode:
            raise RuntimeError(f"{case['caseId']}: agent adapter exited {process.returncode}; stdout/stderr redacted")
        try:
            actual = json.loads(process.stdout)
        except json.JSONDecodeError as exc:
            raise RuntimeError(f"{case['caseId']}: agent did not emit structured trace") from exc
        problems = check_trace(actual, case)
        if problems:
            raise RuntimeError(f"{case['caseId']}: invalid real trace: {', '.join(problems)}")
        results.append(actual)
        print(f"CAPTURED_AGENT_TRACE {case['caseId']} {actual['traceId']}", file=sys.stderr)
    return results


def score(cases: list[dict], results: list[dict]) -> dict:
    by_id = {r.get("caseId"): r for r in results}
    if len(by_id) != len(results):
        raise ValueError("Duplicate case IDs in traces")
    if len(results) != len(cases):
        raise ValueError("Incomplete model evaluation: missing case traces")
    pass_counts = Counter()
    per_skill = defaultdict(lambda: Counter())
    ambiguous = Counter()
    models = set()
    for case in cases:
        row = by_id.get(case["caseId"])
        if row is None:
            raise ValueError("Missing model trace " + case["caseId"])
        problems = check_trace(row, case)
        if problems:
            raise ValueError(f"{case['caseId']}: {', '.join(problems)}")
        models.add(row["model"])
        selected = case["skill"] in row["selectedSkills"]
        if case["kind"] == "positive":
            pass_counts["positive"] += int(selected)
            per_skill[case["skill"]]["positive"] += int(selected)
        elif case["kind"] == "negative":
            pass_counts["negative"] += int(not selected)
            per_skill[case["skill"]]["negative"] += int(not selected)
        else:
            ambiguous["selected"] += int(selected)
            ambiguous["abstained"] += int(not selected)
    positive = sum(c["kind"] == "positive" for c in cases)
    negative = sum(c["kind"] == "negative" for c in cases)
    return {
        "evidence": "real_agent_trace_required",
        "cases": len(cases),
        "models": sorted(models),
        "positiveRecall": round(pass_counts["positive"] / positive, 4) if positive else None,
        "negativeSpecificity": round(pass_counts["negative"] / negative, 4) if negative else None,
        "ambiguousCasesNotAutoGraded": dict(ambiguous),
        "perSkillCounts": {name: dict(counts) for name, counts in sorted(per_skill.items())},
        "readyToClaimAutomaticSelection": True,
        "notes": "This score covers observed Skill loading for these synthetic prompts, not quality of produced code or Vira E2E behavior."
    }


def main() -> int:
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--command", help="External agent adapter process; reads one JSON case on stdin and writes one real trace JSON on stdout")
    cli.add_argument("--results", type=Path, help="Read externally recorded live trace JSONL instead of invoking a model")
    cli.add_argument("--out", type=Path, help="Write captured traces as JSONL")
    cli.add_argument("--timeout", type=int, default=180)
    cli.add_argument("--validate-only", action="store_true")
    args = cli.parse_args()
    cases = validate_dataset(read_jsonl(CORPUS))
    if args.validate_only:
        print(f"SKILL_TRIGGER_DATASET_PASS {len(cases)} cases / {len(cases)//3} Skills (NO MODEL INVOKED)")
        return 0
    if bool(args.command) == bool(args.results):
        cli.error("Exactly one of --command or --results is required for a real model score")
    rows = run_agents(cases, args.command, args.timeout) if args.command else read_jsonl(args.results)
    if args.out:
        args.out.parent.mkdir(parents=True,exist_ok=True)
        args.out.write_text("\n".join(json.dumps(r) for r in rows) + "\n")
    print(json.dumps(score(cases, rows), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
