from types import SimpleNamespace
from graph import build_graph, extract_projection


class FakeVira:
    def __init__(self, response):
        self.response = response
        self.calls = []

    def serve_behavior_projection(self, request):
        self.calls.append(request)
        return self.response


class FakeModel:
    def __init__(self):
        self.calls = []

    def invoke(self, messages):
        self.calls.append(messages)
        return SimpleNamespace(content="safe answer")


def configure(monkeypatch):
    monkeypatch.setenv("VIRA_PROVIDER", "openai")
    monkeypatch.delenv("VIRA_PROGRAM_ID", raising=False)
    monkeypatch.delenv("VIRA_PROJECTION_PROTOCOL", raising=False)


def active(rendered="Approved behavior", digest="digest-1"):
    return SimpleNamespace(body={"projection": {"rendered": rendered, "projectionDigest": digest}, "receipt": {"id": "receipt-1"}})


def test_extracts_only_non_empty_projection():
    assert extract_projection(active()) == {"rendered": "Approved behavior", "projectionDigest": "digest-1"}
    assert extract_projection(SimpleNamespace(body={"other": {"rendered": "text"}})) is None
    assert extract_projection(SimpleNamespace(body={"projection": {"rendered": " "}})) is None


def test_missing_projection_never_invokes_model(monkeypatch):
    configure(monkeypatch)
    model = FakeModel()
    result = build_graph(FakeVira(SimpleNamespace(body={"error": "unavailable"})), model).invoke({"message": "hello", "idempotency_key": "req-1"})
    assert result["status"] == "NO_PROJECTION" and "answer" not in result and model.calls == []


def test_active_projection_is_forwarded_to_model_and_sdk_contract(monkeypatch):
    configure(monkeypatch)
    vira, model = FakeVira(active()), FakeModel()
    result = build_graph(vira, model).invoke({"message": "hello", "idempotency_key": "req-2"})
    assert result["answer"] == "safe answer" and result["status"] == "PROJECTED"
    assert model.calls[0][0].content == "Approved behavior"
    assert result["projection_digest"] == "digest-1"
    assert vira.calls == [{"input": "hello", "provider": "openai", "protocol": "generic-chat", "idempotencyKey": "req-2"}]


def test_null_sdk_response_stops_model(monkeypatch):
    configure(monkeypatch)
    model = FakeModel()
    result = build_graph(FakeVira(None), model).invoke({"message": "hello", "idempotency_key": "req-3"})
    assert result["status"] == "NO_PROJECTION" and model.calls == []
