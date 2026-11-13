"""Offline regression checks for public skill trigger and safety boundaries."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class SkillScenarios(unittest.TestCase):
    def test_mcp_skill_preserves_surface_gap(self):
        text = (ROOT / "skills/vira-mcp/SKILL.md").read_text().lower()
        for phrase in ("tools/list", "never infer mcp support", "do not fabricate missing pack"):
            self.assertIn(phrase, text)

    def test_pack_skill_preserves_contract_boundaries(self):
        text = (ROOT / "skills/vira-packs/SKILL.md").read_text()
        for phrase in ("evaluationId", "202", "variables", "approval", "release"):
            self.assertIn(phrase.lower(), text.lower())
        self.assertIn("no pack tools", text.lower())

    def test_release_skill_keeps_authority_transitions_separate(self):
        text = (ROOT / "skills/vira-evaluate-release/SKILL.md").read_text().lower()
        for phrase in ("approval", "release", "does not grant release authority", "distinct"):
            self.assertIn(phrase, text)

    def test_integrations_do_not_claim_framework_adapters(self):
        text = (ROOT / "skills/vira-framework-integration/SKILL.md").read_text().lower()
        self.assertIn("dedicated adapter", text)
        self.assertIn("if absent", text)

    def test_framework_examples_include_deployment_and_license_boundaries(self):
        deployment = (ROOT / "examples/frameworks/DEPLOYMENT.md").read_text().lower()
        notices = (ROOT / "examples/frameworks/THIRD-PARTY-NOTICES.md").read_text().lower()
        for phrase in ("authentication", "health", "lock", "sbom", "private network"):
            self.assertIn(phrase, deployment)
        self.assertIn("license", notices)

    def test_framework_catalog_names_only_executable_examples(self):
        text = (ROOT / "examples/frameworks/README.md").read_text().lower()
        for phrase in ("next.js", "openai agents", "fastapi", "langgraph", "mcp client", "real configured", "non-production", "external side effects"):
            self.assertIn(phrase, text)
        for rel in ("node-next/package.json", "node-next/src/support-handler.mjs", "node-next/app/api/support/route.ts", "python_fastapi/vira_app.py", "langgraph/graph.py", "mcp-client/client.mjs"):
            self.assertTrue((ROOT / "examples/frameworks" / rel).is_file(), rel)

    def test_chatbot_skill_guides_real_off_on_example(self):
        skill = (ROOT / "skills/vira-chatbot/SKILL.md").read_text().lower()
        example = (ROOT / "skills/vira-chatbot/examples/README.md").read_text().lower()
        for phrase in ("off", "on", "observation", "runtime", "product access"):
            self.assertIn(phrase, skill)
        for phrase in ("npm ci", "npm run dev", "same synthetic support question", "no mock vira server"):
            self.assertIn(phrase, example)

    def test_python_framework_docker_builds_use_hash_locked_dependencies(self):
        for example in ("python_fastapi", "langgraph"):
            folder = ROOT / "examples/frameworks" / example
            dockerfile = (folder / "Dockerfile").read_text()
            requirements = (folder / "requirements.txt").read_text()
            lock = (folder / "requirements.lock").read_text()
            self.assertIn("--require-hashes", dockerfile)
            self.assertIn("requirements.lock", dockerfile)
            self.assertIn("--hash=sha256:", lock)
            import re
            expected = re.search(r"^tryvira-sdk==(\S+)$", requirements, re.M).group(1)
            self.assertIn(f"tryvira-sdk=={expected} \\", lock)


    def test_signal_and_strategy_skills_keep_governance_transitions_separate(self):
        signals = (ROOT / "skills/vira-signals/SKILL.md").read_text().lower()
        strategy = (ROOT / "skills/vira-strategies/SKILL.md").read_text().lower()
        for phrase in ("consent", "human review", "materialize", "producer mapping", "mcp does not expose"):
            self.assertIn(phrase, signals)
        for phrase in ("structural simulation", "not provider execution", "authority digest", "waiting", "do not create a replacement"):
            self.assertIn(phrase, strategy)

    def test_trigger_dataset_covers_every_skill_and_intent_class(self):
        rows = [json.loads(line) for line in (ROOT / "skills/evals/trigger-scenarios.jsonl").read_text().splitlines()]
        expected = {p.parent.name for p in (ROOT / "skills").glob("vira-*/SKILL.md")}
        self.assertEqual({row["skill"] for row in rows}, expected)
        for skill in expected:
            self.assertEqual({row["kind"] for row in rows if row["skill"] == skill}, {"positive", "negative", "ambiguous"})

    def test_all_skill_documents_have_no_scaffold_placeholders(self):
        for path in (ROOT / "skills").glob("vira-*/SKILL.md"):
            text = path.read_text()
            self.assertNotIn("[TODO:", text, str(path))
            self.assertNotIn("Briefly describe what this skill", text, str(path))

    def test_each_skill_has_goal_specific_activation_inputs_workflow_and_outcome(self):
        workflows = set()
        for path in (ROOT / "skills").glob("vira-*/SKILL.md"):
            text = path.read_text()
            for section in (
                "## Activate this skill when",
                "## Inputs and preconditions",
                "## Workflow",
                "## Deliverable and failure handling",
                "## References",
            ):
                self.assertIn(section, text, f"{path}: missing {section}")
            workflow = text.split("## Workflow", 1)[1].split("## Deliverable and failure handling", 1)[0]
            self.assertNotIn("Make the smallest complete implementation", workflow, str(path))
            workflows.add(workflow)
        self.assertEqual(len(workflows), len(list((ROOT / "skills").glob("vira-*/SKILL.md"))), "each skill needs its own task-specific workflow")

    def test_public_reference_links_in_skills_point_to_real_repository_files(self):
        import re
        for path in (ROOT / "skills").glob("vira-*/SKILL.md"):
            text = path.read_text()
            for target in re.findall(r"https://github\.com/hrpering/tryvira/blob/main/([^)>]+)", text):
                repository_path = target.split("#", 1)[0]
                self.assertTrue((ROOT / repository_path).is_file(), f"{path}: broken public link {target}")

    def test_skill_package_is_standalone_and_has_no_repo_relative_links(self):
        import subprocess
        import sys
        import tempfile
        import zipfile
        with tempfile.TemporaryDirectory() as temp:
            result = subprocess.run(
                [sys.executable, str(ROOT / "scripts/package_agent_skills.py"), "--out", temp, "vira-js-sdk"],
                cwd=ROOT, capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            archive = Path(temp) / "vira-js-sdk.skill"
            with zipfile.ZipFile(archive) as package:
                names = package.namelist()
                self.assertIn("vira-js-sdk/SKILL.md", names)
                self.assertIn("vira-js-sdk/LICENSE", names)
                text = package.read("vira-js-sdk/SKILL.md").decode()
                self.assertNotIn("../../docs/", text)
                self.assertIn("references/repo/docs/", text)
                self.assertIn("vira-js-sdk/references/manifest.json", names)
                self.assertTrue(any(name.startswith("vira-js-sdk/references/repo/docs/") for name in names))

if __name__ == "__main__":
    unittest.main()
