"""Offline Skill demo contract checks; these do not exercise a Vira service."""
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class DemoAlignment(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text(encoding="utf-8")

    def test_reproducible_demo_plan(self):
        content = self.read("docs/agent-skills/video-workflow.md").lower()
        for needle in ("actually loaded", "new candidate", "local checks",
                       "auto taskrun", "teach review loop", "no invented"):
            self.assertIn(needle, content)

    def test_taskrun_has_all_four_actual_modes(self):
        content = self.read("skills/vira-task-runs/SKILL.md")
        for needle in ("SINGLE", "STRATEGY", "COMPOUND", "HYBRID", "AUTO",
                       "getTaskRun", "listTaskRunEvents", "output digest"):
            self.assertIn(needle, content)

    def test_tool_authority_is_not_model_granted(self):
        content = self.read("skills/vira-runtime/SKILL.md")
        for needle in ("pre_tool", "pre_action", "hostCapabilities",
                       "block the effect", "COMPOUND", "HYBRID"):
            self.assertIn(needle, content)

    def test_teach_requires_conversation_and_evidence(self):
        content = self.read("skills/vira-observe-teach/SKILL.md")
        for needle in ("conversationId", "episodeId", "controlPointId",
                       "consented", "unbound draft", "outcomeRef"):
            self.assertIn(needle, content)

    def test_pack_quality_preserves_baseline(self):
        content = self.read("skills/vira-build-pack/SKILL.md")
        for needle in ("strong OFF baseline", "registered runtime extension",
                       "wrong-scope", "server evaluation"):
            self.assertIn(needle, content)

    def test_public_gap_is_explicit(self):
        content = self.read("docs/agent-skills/production-parity-demo.md")
        for needle in ("Public chatbot output handoff", "automatic Skill-selection",
                       "MCP", "Level 4"):
            self.assertIn(needle.lower(), content.lower())


if __name__ == "__main__":
    unittest.main()
