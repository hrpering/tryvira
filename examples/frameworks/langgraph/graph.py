"""LangGraph boundary around the published Python behavior projection method."""
from __future__ import annotations
import os
from collections.abc import Mapping
from typing import TypedDict
from langgraph.graph import END, START, StateGraph
from langchain_core.messages import HumanMessage, SystemMessage
from vira import ViraClient

class State(TypedDict, total=False):
    message: str
    idempotency_key: str
    projection: str
    projection_digest: str
    answer: str
    status: str


def extract_projection(response):
    body = getattr(response, "body", None)
    if not isinstance(body, Mapping):
        return None
    projection = body.get("projection")
    if not isinstance(projection, Mapping):
        return None
    rendered = projection.get("rendered")
    if not isinstance(rendered, str) or not rendered.strip():
        return None
    return {"rendered": rendered, "projectionDigest": projection.get("projectionDigest")}


def build_graph(vira_client: ViraClient, model):
    def gate(state: State):
        request = {
            "input": state["message"],
            "provider": os.environ["VIRA_PROVIDER"],
            "protocol": os.environ.get("VIRA_PROJECTION_PROTOCOL", "generic-chat"),
            "idempotencyKey": state["idempotency_key"],
        }
        if os.environ.get("VIRA_PROGRAM_ID"):
            request["programId"] = os.environ["VIRA_PROGRAM_ID"]
        response = vira_client.serve_behavior_projection(request)
        projection = extract_projection(response)
        if not projection:
            return {"status": "NO_PROJECTION"}
        return {"status": "PROJECTED", "projection": projection["rendered"], "projection_digest": projection["projectionDigest"] or ""}

    def answer(state: State):
        messages = [SystemMessage(content=state["projection"]), HumanMessage(content=state["message"])]
        return {"answer": model.invoke(messages).content}

    graph = StateGraph(State)
    graph.add_node("gate", gate)
    graph.add_node("generate", answer)
    graph.add_edge(START, "gate")
    graph.add_conditional_edges("gate", lambda s: "generate" if s.get("projection") else END)
    graph.add_edge("generate", END)
    return graph.compile()


def main():
    from langchain_openai import ChatOpenAI
    client = ViraClient(os.environ["VIRA_API_URL"], api_key=os.environ["VIRA_API_KEY"])
    graph = build_graph(client, ChatOpenAI(model=os.environ.get("OPENAI_MODEL", "gpt-4.1-mini")))
    result = graph.invoke({"message": input("Message: "), "idempotency_key": input("Idempotency key: ")})
    print(result.get("answer", "No active Vira behavior projection; model was not invoked."))

if __name__ == "__main__":
    main()
