"""Offline consistency checks between skill instructions and public contracts."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class PublicContractChecks(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text()

    def test_published_mcp_catalog_is_discovery_first_and_general(self):
        text = self.read("docs/reference/mcp-tools.md")
        self.assertIn("tools/list", text)
        self.assertIn("does not mirror low-level tool signatures", text)
        self.assertIn("does not provide complete parity", text)
        self.assertNotIn("submit_teach_evidence", text)
        self.assertNotIn("create_teach_proposal", text)
        self.assertIn("never infer mcp support", self.read("skills/vira-mcp/SKILL.md").lower())

    def test_pack_guidance_avoids_unpublished_raw_contracts(self):
        api = self.read("docs/reference/api.md")
        guide = self.read("docs/packs.md")
        skill = self.read("skills/vira-packs/SKILL.md")
        self.assertIn("does not publish a raw endpoint or payload catalog", api)
        self.assertIn("Do not infer HTTP routes", guide)
        self.assertIn("installed JavaScript or Python SDK documentation", skill)
        self.assertIn("approval and release", guide)
        self.assertNotIn("/v1/packs/", api)
        self.assertNotIn('"variables"', api)

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
        self.assertIn("UI workflows have not been verified here", matrix)
        self.assertIn("not proof a page is currently accessible or operational", skill)

    def test_public_product_positioning_keeps_claims_within_documented_boundaries(self):
        overview = self.read("docs/product-positioning.md")
        readme = self.read("README.md")
        self.assertIn("cannot intercept it", overview)
        self.assertIn("Results are limited to the tested artifact", overview)
        self.assertIn("product access is not open yet", overview)
        self.assertIn("does not guarantee that every model response is correct", readme)
        self.assertIn("docs/product-positioning.md", readme)



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

    def test_teach_skill_covers_analysis_recommendation_and_proposal_intents(self):
        skill = self.read("skills/vira-observe-teach/SKILL.md")
        openai = self.read("skills/vira-observe-teach/agents/openai.yaml")
        self.assertIn("single- and cross-conversation analysis", skill)
        self.assertIn("recommendation inspection and decision", skill)
        self.assertIn("proposal creation/revision", skill)
        self.assertIn("published method inventory", skill)
        self.assertIn("discover its actual tools", skill)
        self.assertIn("Teach analysis and readback", openai)
        self.assertIn("recommendation decisions", openai)

        triggers = [json.loads(line) for line in self.read("skills/evals/trigger-scenarios.jsonl").splitlines()]
        positive_prompts = [row["prompt"].lower() for row in triggers if row["skill"] == "vira-observe-teach" and row["kind"] == "positive"]
        self.assertTrue(any("run vira teach" in prompt and "analysis" in prompt for prompt in positive_prompts))
        self.assertTrue(any("recommendation" in prompt for prompt in positive_prompts))
        self.assertTrue(any("proposal" in prompt for prompt in positive_prompts))

        workflows = [json.loads(line) for line in self.read("skills/evals/workflow-scenarios.jsonl").splitlines()]
        teach = next(row for row in workflows if row["id"] == "teach-analysis-recommendation-governance")
        mcp = next(row for row in workflows if row["id"] == "teach-mcp-surface-gap")
        mcp_expected = " ".join(mcp["expected"]).lower()
        mcp_forbidden = " ".join(mcp["forbidden"]).lower()
        self.assertIn("vira-mcp", mcp_expected)
        self.assertIn("vira-observe-teach", mcp_expected)
        self.assertIn("discover", mcp_expected)
        self.assertIn("invent", mcp_forbidden)
        expected = " ".join(teach["expected"]).lower()
        forbidden = " ".join(teach["forbidden"]).lower()
        for phrase in ("read back", "recommendation", "proposal", "mcp", "vira-evaluate", "vira-release"):
            self.assertIn(phrase, expected)
        self.assertIn("queued", expected)
        self.assertIn("invent", forbidden)

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

    def test_customer_lifecycle_is_real_api_only_and_mutation_gated(self):
        package = json.loads(self.read("tutorials/marketing-agent/package.json"))
        quality = self.read(".github/workflows/quality.yml")
        client = self.read("tutorials/marketing-agent/_client.mjs")
        tutorial = self.read("tutorials/marketing-agent/README.md")
        runtime_step = self.read("tutorials/marketing-agent/06-runtime-resolve.mjs")
        quality_step = self.read("tutorials/marketing-agent/07-quality-decision.mjs")
        pack_step = self.read("tutorials/marketing-agent/05-pack-lifecycle.mjs")
        self.assertNotIn("lifecycle-mock.test.mjs", quality)
        self.assertNotIn("VIRA_ALLOW_INSECURE_LOCALHOST", client)
        self.assertIn("new ViraClient", client)
        self.assertIn("published `@tryvira/sdk`", tutorial)
        self.assertIn("product access is still under active development", tutorial)
        self.assertEqual(package["dependencies"]["openai"], "7.53.0")
        self.assertEqual(package["scripts"]["check:safety"], "node --test safety.test.mjs")
        self.assertFalse((ROOT / "tutorials/marketing-agent/lifecycle-mock.test.mjs").exists())
        self.assertFalse((ROOT / "examples/frameworks/node").exists())
        self.assertFalse((ROOT / "examples/frameworks/python").exists())
        self.assertIn('projectionMode !== "active"', runtime_step)
        self.assertIn("openai.responses.create", runtime_step)
        self.assertIn("writeFile", runtime_step)
        self.assertIn("runtimeState.candidate", quality_step)
        self.assertIn("openai.responses.create", quality_step)
        self.assertNotIn('output:"Focus on acquisition with paid media."', quality_step)
        self.assertIn("quality.missing_measurement.${runId}", pack_step)
        self.assertIn("marketing.launch.${runId}", pack_step)
        self.assertLess(tutorial.index("node 09-release-pack.mjs"), tutorial.index("node 04-semantic-resolve.mjs"))
        self.assertLess(tutorial.index("node 04-semantic-resolve.mjs"), tutorial.index("node 06-runtime-resolve.mjs"))
        self.assertIn("does not currently specify the event-specific payload", tutorial)

    def test_full_lifecycle_skill_has_explicit_specialist_handoffs(self):
        full = self.read("skills/vira-full-lifecycle/SKILL.md")
        self.assertIn("Specialist routing and handoff", full)
        for name in (
            "vira-get-started", "vira-npm-cli", "vira-integrate-app", "vira-js-sdk",
            "vira-python-sdk", "vira-http-api", "vira-mcp", "vira-framework-integration",
            "vira-author-behavior", "vira-signals", "vira-strategies", "vira-build-pack",
            "vira-packs", "vira-evaluate", "vira-evaluate-release", "vira-release",
            "vira-runtime", "vira-task-runs", "vira-observe-teach", "vira-studio", "vira-debug", "vira-lifecycle",
        ):
            self.assertIn(f"`{name}`", full)
        self.assertIn("does not define its event-specific payload", full)

    def test_taskrun_skill_preserves_governance_and_surface_boundaries(self):
        skill = self.read("skills/vira-task-runs/SKILL.md")
        example = self.read("skills/vira-task-runs/examples/README.md")
        api = self.read("docs/reference/api.md")
        self.assertIn("explicit authorization", skill)
        self.assertIn("re-read persisted state", skill.lower())
        self.assertIn("installed public JavaScript SDK documentation", skill)
        self.assertIn("Do not infer HTTP, Python, or MCP support", example)
        self.assertIn("does not publish a direct TaskRun route contract", api)
        self.assertNotIn("resolveTaskRun(", skill)

    def test_published_sdk_task_coverage_routes_to_skills(self):
        inventory = self.read("docs/reference/sdk-method-inventory.md")
        versions = json.loads(self.read("package-versions.json"))
        self.assertIn(versions["npm"]["@tryvira/sdk"], self.read("docs/reference/javascript-sdk.md"))
        self.assertIn(versions["pypi"]["tryvira-sdk"], self.read("docs/reference/python-sdk.md"))
        for skill in ("vira-js-sdk", "vira-python-sdk", "vira-task-runs", "vira-observe-teach", "vira-packs", "vira-release", "vira-runtime"):
            self.assertIn(f"`{skill}`", inventory)
        self.assertIn("does not reproduce method signatures", inventory)
        self.assertNotRegex(inventory, r"/v1/[A-Za-z0-9_/{}/.-]+")
        self.assertNotIn("createTeachAnalysis(", inventory)

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

    def test_per_skill_status_table_covers_every_skill_without_live_claims(self):
        status = self.read("docs/agent-skills/skill-status.md")
        rows = [line for line in status.splitlines() if line.startswith("| `vira-")]
        reported = [re.search(r"\| `(vira-[a-z0-9-]+)` \|", line).group(1) for line in rows]
        expected = sorted(path.parent.name for path in (ROOT / "skills").glob("vira-*/SKILL.md"))
        self.assertEqual(sorted(reported), expected)
        self.assertEqual(len(reported), len(set(reported)))
        self.assertTrue(all(line.endswith("| Not run |") for line in rows))
        self.assertIn("no per-skill model result", status)
        self.assertIn("No creator model evaluation was run", status)

    def test_pack_evaluation_skill_runner_is_real_api_and_explicitly_gated(self):
        runner = self.read("skills/vira-evaluate/examples/run-pack-evaluation.mjs")
        skill = self.read("skills/vira-evaluate/SKILL.md")
        self.assertIn("VIRA_TUTORIAL_NON_PRODUCTION", runner)
        self.assertIn("VIRA_TUTORIAL_ALLOW_MUTATIONS", runner)
        self.assertIn("new ViraClient", runner)
        self.assertIn("baseUrl", runner)
        self.assertIn("VIRA_API_URL", skill)
        self.assertNotRegex(runner, r"vira_live_[A-Za-z0-9_-]{20,}")

    def test_teach_analysis_skill_runner_is_real_api_and_explicitly_gated(self):
        runner = self.read("skills/vira-observe-teach/examples/run-teach-analysis.mjs")
        skill = self.read("skills/vira-observe-teach/SKILL.md")
        self.assertIn("VIRA_TUTORIAL_NON_PRODUCTION", runner)
        self.assertIn("VIRA_TUTORIAL_ALLOW_MUTATIONS", runner)
        self.assertIn("new ViraClient", runner)
        self.assertIn("baseUrl", runner)
        self.assertIn("VIRA_API_URL", skill)
        self.assertNotRegex(runner, r"vira_live_[A-Za-z0-9_-]{20,}")

    def test_teach_guidance_stays_general_and_preserves_authority_boundaries(self):
        docs = self.read("docs/teach.md")
        self.assertIn("do not infer http or mcp support from an sdk method name", docs.lower())
        self.assertIn("Evaluation, promotion, release, and runtime use remain distinct decisions", docs)
        self.assertNotIn("/v1/teach/", docs)
        self.assertNotIn("createTeachAnalysis(", docs)

    def test_fastapi_customer_journey_routes_cross_skill_sequence_and_stop_gates(self):
        rows = [json.loads(line) for line in self.read("skills/evals/workflow-scenarios.jsonl").splitlines()]
        scenario = next(row for row in rows if row["id"] == "fastapi-support-governed-lifecycle")
        self.assertTrue(scenario["synthetic"])
        self.assertEqual(scenario["category"], "multi-skill-lifecycle")
        expected = " ".join(scenario["expected"])
        for skill in ("vira-full-lifecycle", "vira-get-started", "vira-integrate-app", "vira-framework-integration", "vira-python-sdk", "vira-author-behavior", "vira-build-pack", "vira-packs", "vira-evaluate", "vira-release", "vira-runtime", "vira-observe-teach"):
            self.assertIn(skill, expected)
        forbidden = " ".join(scenario["forbidden"])
        self.assertIn("Invent an outcome event payload", forbidden)
        self.assertIn("Behavior Point response JSON path", forbidden)
        review = self.read("docs/agent-skills/customer-journey-review.md")
        for anchor in ("manual instruction-following trace", "No mock Vira service", "a model-trigger benchmark", "no `outcome` payload schema"):
            self.assertIn(anchor, review)

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
        self.assertIn("published package documentation", docs)
        self.assertIn("Customer-runnable Python framework examples", docs)
        self.assertIn("vira_client.serve_behavior_projection(request)", graph)
        self.assertNotIn("projectionMode", app + graph)
        self.assertIn("ChatOpenAI", app)
        self.assertIn("model.invoke", app)
        self.assertIn("OPENAI_API_KEY", app)

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
        self.assertIn("VIRA_TUTORIAL_PROMOTE_TEACH_PROPOSAL", teach_review)
        self.assertIn('mode === "promote"', teach_review)
        self.assertIn('"EVALUATED"', teach_review)
        self.assertIn("VIRA_TUTORIAL_TEACH_PROPOSAL_ID", teach_review)

if __name__ == "__main__":
    unittest.main()
