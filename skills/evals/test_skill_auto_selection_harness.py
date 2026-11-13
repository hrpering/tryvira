"""Offline unit tests for a runner that must NOT invent real model selection."""
import json
import tempfile
import unittest
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("skill_auto_eval", ROOT/"scripts/eval_skill_selection.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class SkillAutoSelectionHarness(unittest.TestCase):
    def test_84_labeled_cases(self):
        cases=module.validate_dataset(module.read_jsonl(ROOT/"skills/evals/trigger-scenarios.jsonl"))
        self.assertEqual(len(cases),84)  # 27 Skills; Teach has four positive prompts
        self.assertEqual(len({c["caseId"] for c in cases}),84)

    def test_refuses_guessed_or_synthetic_agent_choices(self):
        case={"caseId":"vira-observe::positive::1","skill":"vira-observe","kind":"positive"}
        for row in [
            {"caseId":case["caseId"],"model":"test-model","agent":"agent","traceId":"t","selectedSkills":["vira-observe"],"source":"synthetic","simulated":True},
            {"caseId":case["caseId"],"model":"test-model","agent":"agent","traceId":"","selectedSkills":["vira-observe"],"source":"live_agent_trace","simulated":False,"skillLoadEvents":[{"eventType":"skill_loaded","skill":"vira-observe","sourcePath":"/workspace/skills/vira-observe/SKILL.md","traceId":"t"}]},
        ]:
            self.assertTrue(module.check_trace(row,case))
        self.assertRaises(ValueError,module.score,[case],[])

    def test_no_auto_trigger_score_without_model(self):
        good={"caseId":"vira-observe::positive","skill":"vira-observe","kind":"positive"}
        row={"caseId":good["caseId"],"model":"fixture-only","agent":"fixture-only",
             "traceId":"t","selectedSkills":["vira-observe"],"source":"live_agent_trace","simulated":False}
        # Unit contract alone can score fixture data. It is NOT evidence of model execution.
        self.assertEqual(module.score([good],[row])["positiveRecall"],1)

if __name__=="__main__":
    unittest.main()
