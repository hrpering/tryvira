"""FastAPI boundary using the published Python SDK projection operation."""
from collections.abc import Mapping
from contextlib import asynccontextmanager
from typing import Any
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from vira_boundary import serve_vira_projection


class ProjectionRequest(BaseModel):
    message: str
    provider: str
    programId: str | None = None
    model: str | None = None
    protocol: str = "generic-chat"


def extract_projection(response: Any):
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


def create_app(vira_client: Any | None, scope: Mapping[str, str] | None, *, lifespan=None, agent_runner=None) -> FastAPI:
    app = FastAPI(title="Vira FastAPI integration example", lifespan=lifespan)
    app.state.vira, app.state.scope = vira_client, dict(scope or {})
    app.state.agent_runner = agent_runner

    @app.get("/healthz")
    def healthz():
        return {"status": "ok"}

    @app.get("/readyz")
    def readyz():
        if app.state.vira is None or not all(app.state.scope.get(k) for k in ("organizationId", "projectId", "environmentId")):
            raise HTTPException(status_code=503, detail="Vira client or scope is not ready")
        return {"status": "ready"}

    @app.post("/behavior/project")
    def project_behavior(body: ProjectionRequest, idempotency_key: str | None = Header(default=None, alias="Idempotency-Key")):
        if not idempotency_key:
            raise HTTPException(status_code=400, detail="Idempotency-Key required")
        if app.state.vira is None:
            raise HTTPException(status_code=503, detail="Vira client is not configured")
        try:
            result = serve_vira_projection(
                app.state.vira,
                message=body.message,
                provider=body.provider,
                scope=app.state.scope,
                idempotency_key=idempotency_key,
                program_id=body.programId,
                model=body.model,
                protocol=body.protocol,
            )
        except Exception:
            raise HTTPException(status_code=502, detail="Vira behavior projection failed") from None
        if result is None:
            raise HTTPException(status_code=502, detail="Vira returned no result")
        projection = extract_projection(result)
        if projection is None:
            return {"status": "NO_PROJECTION", "agentInvoked": False, "requestId": result.request_id}
        if app.state.agent_runner is None:
            return {"status": "PROJECTED", "agentInvoked": False, "projectionDigest": projection["projectionDigest"], "viraResult": result.body, "requestId": result.request_id}
        answer = app.state.agent_runner(body.message, projection["rendered"])
        return {"status": "PROJECTED", "agentInvoked": True, "answer": answer, "projectionDigest": projection["projectionDigest"], "requestId": result.request_id}

    return app


def create_app_from_environment() -> FastAPI:
    import os
    from vira import ViraClient
    names = ("VIRA_API_URL", "VIRA_API_KEY", "VIRA_ORGANIZATION_ID", "VIRA_PROJECT_ID", "VIRA_ENVIRONMENT_ID")
    missing = [name for name in names if not os.environ.get(name)]
    if missing:
        raise RuntimeError("Missing server configuration: " + ", ".join(missing))
    scope = {"organizationId": os.environ["VIRA_ORGANIZATION_ID"], "projectId": os.environ["VIRA_PROJECT_ID"], "environmentId": os.environ["VIRA_ENVIRONMENT_ID"]}

    @asynccontextmanager
    async def lifespan(app):
        with ViraClient(os.environ["VIRA_API_URL"], api_key=os.environ["VIRA_API_KEY"]) as client:
            app.state.vira = client
            yield

    return create_app(None, scope, lifespan=lifespan)
