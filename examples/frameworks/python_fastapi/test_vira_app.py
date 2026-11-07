import unittest
import json
import httpx
from vira import ViraClient
from vira_app import create_app, extract_projection
from vira_boundary import serve_vira_projection

SCOPE = {"organizationId": "org-test", "projectId": "project-test", "environmentId": "env-test"}


class Result:
    body = {"projection": {"rendered": "Approved behavior", "projectionDigest": "digest-1"}, "receipt": {"id": "receipt-1"}}
    request_id = "request-test"


class StubVira:
    def __init__(self, result=None):
        self.calls = []
        self.result = result or Result()

    def serve_behavior_projection(self, request):
        self.calls.append(request)
        return self.result


class FastAPIIntegrationTests(unittest.IsolatedAsyncioTestCase):
    async def request(self, app, method, path, **kwargs):
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
            return await client.request(method, path, **kwargs)

    async def test_route_preserves_result_and_uses_python_sdk_projection_contract(self):
        vira = StubVira()
        app = create_app(vira, SCOPE)
        response = await self.request(app, "POST", "/behavior/project", headers={"Idempotency-Key": "test:1"}, json={"message": "hello", "provider": "openai"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "PROJECTED")
        self.assertFalse(response.json()["agentInvoked"])
        self.assertEqual(vira.calls[0], {"input": "hello", "provider": "openai", "protocol": "generic-chat", "idempotencyKey": "test:1"})

    async def test_rejects_missing_key_or_invalid_body_before_sdk(self):
        vira = StubVira()
        app = create_app(vira, SCOPE)
        payload = {"message": "hello", "provider": "openai"}
        self.assertEqual((await self.request(app, "POST", "/behavior/project", json=payload)).status_code, 400)
        self.assertEqual((await self.request(app, "POST", "/behavior/project", headers={"Idempotency-Key": "k"}, json={"message": "hello"})).status_code, 422)
        self.assertEqual(vira.calls, [])

    async def test_health_readiness_and_sanitized_errors(self):
        app = create_app(StubVira(), SCOPE)
        self.assertEqual((await self.request(app, "GET", "/healthz")).status_code, 200)
        self.assertEqual((await self.request(app, "GET", "/readyz")).status_code, 200)
        self.assertEqual((await self.request(create_app(None, SCOPE), "GET", "/readyz")).status_code, 503)

        class Failing:
            def serve_behavior_projection(self, request):
                raise RuntimeError("secret")

        response = await self.request(create_app(Failing(), SCOPE), "POST", "/behavior/project", headers={"Idempotency-Key": "k"}, json={"message": "x", "provider": "openai"})
        self.assertEqual(response.status_code, 502)
        self.assertNotIn("secret", response.text)

    async def test_empty_or_missing_projection_never_runs_agent(self):
        for body in ({"projection": {"rendered": " "}}, {"notProjection": {"rendered": "text"}}):
            with self.subTest(body=body):
                calls = []
                result = type("Result", (), {"body": body, "request_id": "req"})()
                app = create_app(StubVira(result), SCOPE, agent_runner=lambda *args: calls.append(args))
                response = await self.request(app, "POST", "/behavior/project", headers={"Idempotency-Key": "k"}, json={"message": "x", "provider": "openai"})
                self.assertEqual(response.json()["status"], "NO_PROJECTION")
                self.assertFalse(response.json()["agentInvoked"])
                self.assertEqual(calls, [])

    async def test_projection_is_given_to_agent_without_authorizing_side_effects(self):
        calls = []
        app = create_app(StubVira(), SCOPE, agent_runner=lambda message, projection: calls.append((message, projection)) or "draft")
        response = await self.request(app, "POST", "/behavior/project", headers={"Idempotency-Key": "k"}, json={"message": "hello", "provider": "openai"})
        self.assertTrue(response.json()["agentInvoked"])
        self.assertEqual(calls, [("hello", "Approved behavior")])
        self.assertEqual(response.json()["answer"], "draft")

    async def test_projection_extractor_rejects_unknown_schema(self):
        self.assertIsNone(extract_projection(type("Result", (), {"body": {"projection": {"rendered": " "}}})()))

    async def test_published_python_sdk_artifact_sends_projection_contract(self):
        captured = {}

        def transport(url, method, headers, body, timeout):
            captured.update(url=url, method=method, headers=headers, body=json.loads(body), timeout=timeout)
            return 200, {"x-request-id": "request-sdk-test"}, b'{"projection":{"rendered":"Guidance","projectionDigest":"digest-2"},"receipt":{"id":"receipt-2"}}'

        client = ViraClient("https://api.example.invalid", api_key="fixture-only", retries=0, transport=transport)
        response = serve_vira_projection(client, message="hello", provider="openai", scope=SCOPE, idempotency_key="test:projection:1")
        self.assertEqual(response.body["projection"]["rendered"], "Guidance")
        self.assertEqual(captured["method"], "POST")
        self.assertEqual(captured["url"], "https://api.example.invalid/v1/runtime/behavior-projection")
        self.assertEqual(captured["headers"]["idempotency-key"], "test:projection:1")
        self.assertEqual(captured["body"], {"input": "hello", "provider": "openai", "protocol": "generic-chat", "idempotencyKey": "test:projection:1"})


if __name__ == "__main__":
    unittest.main()
