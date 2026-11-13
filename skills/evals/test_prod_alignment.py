"""Static public Skill/product contract regression checks. These are NOT live acceptance tests."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKILLS = ROOT / "skills"

class ProductionAlignment(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text()

    def test_27_task_specific_skills_with_examples(self):
        folders = sorted(p.parent for p in SKILLS.glob("vira-*/SKILL.md"))
        self.assertEqual(len(folders), 27)
        self.assertEqual(len({p.name for p in folders}), 27)
        for folder in folders:
            name = folder.name
            skill = (folder / "SKILL.md").read_text()
            example = (folder / "examples/README.md").read_text()
            metadata = (folder / "agents/openai.yaml").read_text()
            self.assertIn(f"name: {name}", skill)
            self.assertIn("## Activate this skill when", skill, name)
            self.assertIn("## Workflow", skill, name)
            self.assertIn("## Deliverable and failure handling", skill, name)
            self.assertIn("## References", skill, name)
            self.assertIn("negative", example.lower(), f"{name} needs real negative test")
            self.assertIn(f"${name}", metadata, name)
            self.assertNotIn("tasks and workflow guidance", metadata.lower(), name)
            self.assertGreater(len(example), 350, name)
            self.assertGreater(len(skill), 1100, name)

    def test_canonical_on_across_core_skills(self):
        for name in ("vira-integrate-app","vira-js-sdk","vira-python-sdk","vira-task-runs",
                     "vira-framework-integration","vira-runtime","vira-chatbot",
                     "vira-lifecycle","vira-full-lifecycle"):
            doc = self.read(f"skills/{name}/SKILL.md")
            self.assertRegex(doc, r"(?i)AUTO.?TaskRun", name)
        for name in ("vira-js-sdk","vira-python-sdk","vira-runtime","vira-framework-integration"):
            doc = self.read(f"skills/{name}/SKILL.md").lower()
            self.assertIn("diagnostic",doc,name)
            self.assertIn("projection",doc,name)
        chatbot=self.read("skills/vira-chatbot/examples/README.md").lower()
        self.assertIn("taskrun pending",chatbot)
        self.assertIn("no mock vira server",chatbot)
        self.assertIn("same synthetic support question",chatbot)

    def test_taskrun_js_python_and_modes(self):
        taskrun=self.read("skills/vira-task-runs/SKILL.md")
        for item in ("resolveTaskRun","startTaskRun","start_task_run","requestedMode","AUTO",
                     "SINGLE","STRATEGY","COMPOUND","HYBRID","stateVersion"):
            self.assertIn(item,taskrun,item)
        for path in ("examples/javascript/taskrun-modes.mjs","examples/python/taskrun_modes.py"):
            self.assertTrue((ROOT/path).is_file(),path)
        self.assertIn("does not forward",self.read("skills/vira-js-sdk/SKILL.md"))
        self.assertIn("does not forward",self.read("skills/vira-python-sdk/SKILL.md"))

    def test_verification_not_faked(self):
        skill=self.read("skills/vira-runtime-verification/SKILL.md")
        for token in ("verifier:output.non_empty","post_model","judge:","failedChecks",
                      "receiptDigest","output digest","fail closed"):
            self.assertIn(token.lower(),skill.lower(),token)
        for name in ("vira-observe","vira-signals","vira-traces","vira-observe-teach"):
            self.assertIn("evidence",self.read(f"skills/{name}/SKILL.md").lower(),name)
        self.assertIn("producer mapping",self.read("skills/vira-signals/SKILL.md"))
        self.assertIn("TaskRun",self.read("skills/vira-traces/SKILL.md"))

    def test_trigger_and_workflow_safety_dataset(self):
        import json
        triggers=[json.loads(x) for x in self.read("skills/evals/trigger-scenarios.jsonl").splitlines() if x.strip()]
        names={p.parent.name for p in SKILLS.glob("vira-*/SKILL.md")}
        self.assertEqual(names,{r["skill"] for r in triggers})
        for name in names:
            self.assertEqual({"positive","negative","ambiguous"},{r["kind"] for r in triggers if r["skill"]==name})
        cases=[json.loads(x) for x in self.read("skills/evals/workflow-scenarios.jsonl").splitlines() if x.strip()]
        self.assertEqual(len(cases),34)
        for case in cases:
            self.assertTrue(case["synthetic"])
            self.assertTrue(case["expected"])
            self.assertTrue(case["forbidden"])
        vercel=next(c for c in cases if c["id"]=="vercel-ai-streaming-boundary")
        self.assertIn("AUTO TaskRun"," ".join(vercel["expected"]))
        self.assertIn("projection"," ".join(vercel["forbidden"]))
        for ident in ("observe-first-model-event","signal-mapping-missing-authority",
                      "runtime-verifier-unconfigured-judge","trace-compound-partial",
                      "taskrun-start-from-prompt-mode"):
            self.assertIn(ident,{c["id"] for c in cases})

    def test_public_audit_contains_no_private_backend_path(self):
        for path in ("docs/agent-skills/production-contract-audit.md",
                     "docs/agent-skills/production-contract-baseline.md"):
            txt=self.read(path)
            self.assertNotIn("Vira_Behavior_Prod",txt)
            self.assertNotRegex(txt,r"(?i)(api[_-]?key|token|password)\s*[:=]\s*[A-Za-z0-9_-]{24,}")

if __name__ == "__main__":
    unittest.main()
