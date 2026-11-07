"""Offline consistency checks between skill instructions and public contracts."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class PublicContractChecks(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text()

    def test_published_mcp_catalog_is_narrow_and_discovery_first(self):
        text = self.read("docs/reference/mcp-tools.md")
        table = text.split("## Surface boundaries", 1)[0]
        tools = re.findall(r"\| `([a-z_]+)` \|", table)
        self.assertEqual(len(tools), 11)
        self.assertIn("tools/list", text)
        self.assertNotIn("import_pack", tools)
        self.assertNotIn("release_pack", tools)
        self.assertIn("never infer mcp support", self.read("skills/vira-mcp/SKILL.md").lower())

    def test_pack_contracts_require_exact_install_and_evaluation_inputs(self):
        js = self.read("docs/reference/javascript-sdk.md")
        api = self.read("docs/reference/api.md")
        skill = self.read("skills/vira-packs/SKILL.md")
        self.assertIn("installPack(packId, variables)", js)
        self.assertIn("evaluationId", js)
        self.assertIn("HTTP `202`", api)
        self.assertIn("materialization", api)
        self.assertIn("the exact `packId` and materialized `packDigest`", api)
        for marker in ("evaluationId", "materialization", "variables map directly", "approval and release"):
            self.assertIn(marker.lower(), skill.lower())

    def test_published_versions_are_not_hardcoded_in_skill_examples(self):
        versions = json.loads(self.read("package-versions.json"))
        self.assertIn("@tryvira/sdk", versions["npm"])
        self.assertIn("@tryvira/mcp", versions["npm"])
        self.assertIn("tryvira-sdk", versions["pypi"])
        self.assertIn("discover the registry version", self.read("skills/vira-js-sdk/SKILL.md").lower())
        self.assertIn("discover current registry version", self.read("skills/vira-python-sdk/SKILL.md").lower())
        self.assertNotRegex(self.read("skills/vira-mcp/SKILL.md"), r"@tryvira/mcp@\d")

    def test_studio_status_is_not_inferred_from_route_presence(self):
        matrix = self.read("references/capability-matrix.md")
        skill = self.read("skills/vira-studio/SKILL.md").lower()
        self.assertIn("Studio UI flows are unverified", matrix)
        self.assertIn("not proof a page is currently accessible or operational", skill)



    def test_workflow_scenarios_cover_authority_async_security_and_surface_gaps(self):
        rows = [json.loads(line) for line in self.read("skills/evals/workflow-scenarios.jsonl").splitlines()]
        self.assertGreaterEqual(len(rows), 20)
        self.assertEqual(len({row["id"] for row in rows}), len(rows))
        self.assertTrue(all(row["synthetic"] and row["expected"] and row["forbidden"] for row in rows))
        categories = {row["category"] for row in rows}
        self.assertTrue({"authority", "async-state", "security", "surface-gap", "evaluation"}.issubset(categories))
        prompts = "\n".join(row["prompt"] for row in rows).lower()
        self.assertIn("202", prompts)
        self.assertIn("evaluation", prompts)
        self.assertIn("tools/list", prompts)
        self.assertIn("vercel ai sdk", prompts)

    def test_model_run_evidence_records_failures_and_scope_limits(self):
        rows = [json.loads(line) for line in self.read("skills/evals/model-runs.jsonl").splitlines()]
        self.assertTrue(rows)
        for row in rows:
            if row.get("result") == "not_run":
                self.assertIsNone(row["model"])
                self.assertIsNone(row["trigger_observed"])
                self.assertIn("before model invocation", row["failure_boundary"])
                self.assertFalse(row["forbidden_services_called"]["vira_api"])
                continue
            self.assertTrue(row["model"])
            self.assertTrue(row["codex_cli"])
            self.assertTrue(row["prompt"])
            self.assertTrue(row["skills_explicitly_requested_and_read"])
            self.assertIn("not an automatic-trigger evaluation", row["selection_mode"])
            self.assertFalse(row["forbidden_services_called"]["vira_api"])
            self.assertFalse(row["forbidden_services_called"]["studio"])
            self.assertFalse(row["forbidden_services_called"]["openai_provider"])
            self.assertGreater(row["initial_iteration"]["unit_tests_failed"], 0)
            self.assertEqual(row["revised_model_iteration"]["unit_tests_failed"], 0)
            self.assertEqual(row["repository_example_integration"]["unit_tests_failed"], 0)

    def test_marketing_tutorial_mock_lifecycle_is_installed_and_runs_in_ci(self):
        package = json.loads(self.read("tutorials/marketing-agent/package.json"))
        lock = json.loads(self.read("tutorials/marketing-agent/package-lock.json"))
        versions = json.loads(self.read("package-versions.json"))
        quality = self.read(".github/workflows/quality.yml")
        sync = self.read(".github/workflows/sync-published-packages.yml")
        tutorial = self.read("tutorials/marketing-agent/lifecycle-mock.test.mjs")
        self.assertEqual(package["scripts"]["test"], "node --test")
        self.assertEqual(lock["packages"]["node_modules/@tryvira/sdk"]["version"], versions["npm"]["@tryvira/sdk"])
        self.assertIn("npm ci --prefix tutorials/marketing-agent", quality)
        self.assertIn("npm install --package-lock-only --ignore-scripts --prefix tutorials/marketing-agent", sync)
        for contract in ("/install", "202", "evaluationId", "PACK_EVALUATION_NOT_BOUND_TO_APPROVED_DIGEST", "VIRA_TUTORIAL_APPROVE_RELEASE", "idempotencyKey"):
            self.assertIn(contract.lower(), tutorial.lower())

    def test_complete_published_sdk_method_sets_are_mapped_to_skills(self):
        inventory = self.read("docs/reference/sdk-method-inventory.md")
        versions = json.loads(self.read("package-versions.json"))
        self.assertIn(f"@tryvira/sdk@{versions['npm']['@tryvira/sdk']}", inventory)
        self.assertIn(f"tryvira-sdk=={versions['pypi']['tryvira-sdk']}", inventory)
        rows = [line.split("|") for line in inventory.splitlines() if line.startswith("| ") and "`vira-" in line]
        js = [name for row in rows for name in re.findall(r"`([A-Za-z][A-Za-z0-9_]*)`", row[3])]
        python = [name for row in rows for name in re.findall(r"`([a-z][a-z0-9_]*)`", row[4])]
        self.assertGreaterEqual(len(js), 100)
        self.assertGreaterEqual(len(python), 115)
        self.assertEqual(len(js), len(set(js)))
        self.assertEqual(len(python), len(set(python)))
        self.assertIn("reviewComparativeFinding", js)
        self.assertNotIn("review_comparative_finding", python)
        api = self.read("docs/reference/api.md")
        self.assertIn("/v1/pack-revisions/{revisionId}/diff", api)
        self.assertIn("/v1/evaluations/{evaluationId}/comparison", api)

    def test_anthropic_eval_export_matches_upstream_query_schema(self):
        import subprocess
        import sys
        import tempfile
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp) / "binary.json"
            ambiguous = Path(temp) / "ambiguous.json"
            result = subprocess.run(
                [sys.executable, str(ROOT / "scripts/export_skill_trigger_eval.py"), "vira-js-sdk", "--out", str(output), "--ambiguous-out", str(ambiguous)],
                cwd=ROOT, capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            binary_rows = json.loads(output.read_text())
            ambiguous_rows = json.loads(ambiguous.read_text())
            self.assertEqual(len(binary_rows), 2)
            self.assertEqual({row["should_trigger"] for row in binary_rows}, {True, False})
            self.assertEqual(set(binary_rows[0]), {"query", "should_trigger"})
            self.assertEqual(len(ambiguous_rows), 1)

    def test_generated_openai_metadata_invokes_matching_skill(self):
        for path in (ROOT / "skills").glob("vira-*/agents/openai.yaml"):
            text = path.read_text()
            self.assertIn(f"${path.parent.parent.name}", text)

    def test_node_framework_fixture_runs_without_network(self):
        import subprocess
        result = subprocess.run(
            ["node", "--test", "examples/frameworks/node/vira-boundary.test.mjs"],
            cwd=ROOT, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_python_framework_fixture_runs_without_network(self):
        import subprocess
        result = subprocess.run(
            ["python3", "-m", "unittest", "discover", "-s", "examples/frameworks/python", "-v"],
            cwd=ROOT, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_python_framework_boundary_matches_documented_sdk_request_shape(self):
        reference = self.read("docs/reference/python-sdk.md")
        helper = self.read("examples/frameworks/python/vira_boundary.py")
        self.assertIn("client.resolve_runtime({", reference)
        for field in ("behaviorPoint", "executionBoundary", "idempotencyKey"):
            self.assertIn(f'"{field}"', helper)
            self.assertIn(f'"{field}"', reference)
        self.assertIn("return vira.resolve_runtime(", helper)

    def test_python_framework_projection_uses_operation_specific_contract(self):
        app = self.read("examples/frameworks/python_fastapi/vira_app.py")
        helper = self.read("examples/frameworks/python_fastapi/vira_boundary.py")
        docs = self.read("docs/reference/python-sdk.md")
        graph = self.read("examples/frameworks/langgraph/graph.py")
        self.assertIn("serve_vira_projection", app)
        self.assertIn("serve_behavior_projection", helper)
        self.assertIn('body.get("projection")', app)
        self.assertIn('"input": message', helper)
        self.assertIn('"provider": provider', helper)
        self.assertNotIn('"executionBoundary": dict(scope)', helper)
        self.assertIn('client.serve_behavior_projection({', docs)
        self.assertIn("vira_client.serve_behavior_projection(request)", graph)
        self.assertNotIn("projectionMode", app + graph)

    def test_marketing_tutorial_respects_published_scope_and_write_gates(self):
        lifecycle = self.read("examples/javascript/end-to-end-lifecycle.mjs")
        task_call = re.search(r"createSemanticTask\(\{([\s\S]*?)\}\)", lifecycle)
        point_call = re.search(r"createBehaviorPoint\(\{([\s\S]*?)\}\)", lifecycle)
        self.assertIsNotNone(task_call)
        self.assertIsNotNone(point_call)
        self.assertNotIn("...scope", task_call.group(1))
        self.assertNotIn("...scope", point_call.group(1))
        self.assertNotIn("objects: {}", lifecycle)
        self.assertIn("tutorials/marketing-agent/", lifecycle)
        self.assertNotIn("copy `.env.example`", self.read("examples/javascript/README.md"))

        for path, method in (
            ("01-connect.mjs", "connectOnce"),
            ("02-observe-baseline.mjs", "observe"),
            ("03-feedback.mjs", "feedback"),
            ("05-pack-lifecycle.mjs", "importPack"),
            ("06-runtime-resolve.mjs", "resolveRuntime"),
            ("07-quality-decision.mjs", "evaluateQuality"),
            ("08-teach-proposal.mjs", "submitTeachEvidence"),
            ("09-release-pack.mjs", "approvePack"),
            ("10-review-teach-proposal.mjs", "transitionTeachProposal"),
        ):
            text = self.read(f"tutorials/marketing-agent/{path}")
            self.assertIn("requireSafeTutorialScope();", text, path)
            self.assertIn(f"vira.{method}(", text, path)

        observe = self.read("tutorials/marketing-agent/02-observe-baseline.mjs")
        feedback = self.read("tutorials/marketing-agent/03-feedback.mjs")
        self.assertIn("vira.observe({...scope", observe)
        self.assertIn("vira.feedback({...scope", feedback)
        pack = self.read("tutorials/marketing-agent/05-pack-lifecycle.mjs")
        self.assertIn("PACK_CONFLICTS_REQUIRE_REVIEW", pack)
        self.assertIn("VIRA_TUTORIAL_CONFIRM_PACK_INSTALL", pack)
        self.assertNotIn("approvePack(", pack)
        self.assertNotIn("releasePack(", pack)
        release = self.read("tutorials/marketing-agent/09-release-pack.mjs")
        self.assertIn("VIRA_TUTORIAL_APPROVED_PACK_DIGEST", release)
        self.assertIn("PACK_EVALUATION_NOT_BOUND_TO_APPROVED_DIGEST", release)
        teach_proposal = self.read("tutorials/marketing-agent/08-teach-proposal.mjs")
        teach_review = self.read("tutorials/marketing-agent/10-review-teach-proposal.mjs")
        self.assertNotIn('"APPROVE"', teach_proposal)
        self.assertIn("VIRA_TUTORIAL_APPROVE_TEACH_PROPOSAL", teach_review)
        self.assertIn("VIRA_TUTORIAL_TEACH_PROPOSAL_ID", teach_review)

if __name__ == "__main__":
    unittest.main()
