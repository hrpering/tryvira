import unittest
from vira_boundary import resolve_vira_boundary


class FrameworkBoundaryTests(unittest.TestCase):
    def test_forwards_scope_and_preserves_runtime_result(self):
        expected = {"body": {"runtime": {"status": "ABSTAIN"}}, "status": 200}
        received = {}

        class StubVira:
            def resolve_runtime(self, request):
                received.update(request)
                return expected

        scope = {
            "organizationId": "org-demo",
            "projectId": "project-demo",
            "environmentId": "env-demo",
        }
        result = resolve_vira_boundary(
            StubVira(),
            behavior_point="support.answer",
            scope=scope,
            idempotency_key="test:runtime:1",
        )
        self.assertIs(result, expected)
        self.assertEqual(received, {
            "behaviorPoint": "support.answer",
            "executionBoundary": scope,
            "idempotencyKey": "test:runtime:1",
        })

    def test_rejects_incomplete_scope_before_call(self):
        class StubVira:
            called = False

            def resolve_runtime(self, request):
                self.called = True

        client = StubVira()
        with self.assertRaisesRegex(ValueError, "complete Vira execution scope"):
            resolve_vira_boundary(
                client,
                behavior_point="support.answer",
                scope={"organizationId": "org-demo"},
                idempotency_key="test:runtime:1",
            )
        self.assertFalse(client.called)


if __name__ == "__main__":
    unittest.main()
