"""Offline tests with a fake client; never claims server admission."""
from __future__ import annotations
import unittest
from types import SimpleNamespace
from connect_observe import build_observation, run_connect_observe

ENV = {
    "VIRA_ALLOW_OBSERVE": "yes",
    "VIRA_ORGANIZATION_ID": "org-offline",
    "VIRA_PROJECT_ID": "project-offline",
    "VIRA_ENVIRONMENT_ID": "sandbox",
    "VIRA_CONNECT_IDEMPOTENCY_KEY": "connect-offline",
    "VIRA_EVENT_ID": "event-offline",
}

class FakeClient:
    def __init__(self, observe_status=202, valid=True):
        self.calls = []
        self.observe_status = observe_status
        self.valid = valid
    def connect_once(self, name, kind, scope, adapter, version, **kwargs):
        self.calls.append(("connect_once", scope, kwargs))
        body = {"system":{"id":"system-1"}, "connection":{"id":"connection-1"}} if self.valid else {"system":{"id":"system-1"}}
        return SimpleNamespace(body=body, status=200)
    def observe(self, event, *, idempotency_key):
        self.calls.append(("observe", event, idempotency_key))
        return SimpleNamespace(status=self.observe_status, request_id="request-offline")

class ConnectObserveTests(unittest.TestCase):
    def test_scope_is_sent_to_observe_not_only_connect(self):
        client = FakeClient()
        output = run_connect_observe(client, ENV)
        self.assertEqual(output["observedHttpStatus"], 202)
        self.assertFalse(output["verifiedOutput"])
        self.assertEqual([c[0] for c in client.calls], ["connect_once", "observe"])
        _, event, key = client.calls[-1]
        for field, expected in (("organizationId", "org-offline"), ("projectId", "project-offline"), ("environmentId", "sandbox")):
            self.assertEqual(event[field], expected)
        self.assertEqual(event["aiSystemId"], "system-1")
        self.assertEqual(event["connectionId"], "connection-1")
        self.assertEqual(key, "event-offline")
    def test_missing_scope_does_not_mutate(self):
        client = FakeClient()
        for key in ("VIRA_ORGANIZATION_ID", "VIRA_PROJECT_ID", "VIRA_ENVIRONMENT_ID"):
            with self.assertRaisesRegex(RuntimeError, key):
                run_connect_observe(client, {**ENV, key:""})
        self.assertEqual(client.calls, [])
    def test_opt_in_required(self):
        client=FakeClient()
        with self.assertRaisesRegex(RuntimeError, "VIRA_ALLOW_OBSERVE"):
            run_connect_observe(client, {**ENV, "VIRA_ALLOW_OBSERVE":""})
        self.assertEqual(client.calls, [])
    def test_connection_without_id_fails_before_observation(self):
        client=FakeClient(valid=False)
        with self.assertRaisesRegex(RuntimeError, "CONNECTION_READBACK_MISSING"):
            run_connect_observe(client, ENV)
        self.assertEqual(len(client.calls), 1)
    def test_denied_observation_is_not_success(self):
        with self.assertRaisesRegex(RuntimeError, "OBSERVATION_NOT_ADMITTED"):
            run_connect_observe(FakeClient(observe_status=403), ENV)
    def test_invalid_payload_scope(self):
        with self.assertRaisesRegex(RuntimeError, "organizationId"):
            build_observation({"projectId":"p","environmentId":"e"}, event_id="ev",system_id="s",connection_id="c")

if __name__ == "__main__":
    unittest.main()
