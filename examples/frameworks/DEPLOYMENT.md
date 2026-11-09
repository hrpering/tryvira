# Deployment and license notes

These examples are integration starting points, not managed Vira deployments. Use a non-production Vira scope until your own acceptance checks pass. The FastAPI and Next.js services intentionally have no end-user authentication. Keep them behind your application's authenticated private network, gateway, or service mesh; add caller authentication, authorization, rate limiting, request-size limits, timeouts, and audit logging before exposing them to the internet. Vira credentials must be injected by the deployment secret manager and must never be copied into images, source, browser bundles, or logs.

## Repeatable build and release

- Commit npm lockfiles (`npm ci`) and Python `requirements.lock` hash files generated from `requirements.txt` (`uv pip compile --python-version 3.12 --generate-hashes requirements.txt -o requirements.lock`). Docker builds install the lock with `pip --require-hashes`; local Python checks can use `uv pip sync requirements.lock`. Rebuild and review lock changes deliberately; update SDK pins only after checking the registry artifact and documented contract.
- Build from a reviewed commit. Scan dependencies and container images in your normal CI, generate a CycloneDX SBOM (for npm, `npm sbom --sbom-format cyclonedx`; for Python use your chosen SBOM generator), and retain the image digest and SBOM with the release record.
- Build and package-check in CI, then run the customer workflow against an isolated non-production Vira deployment. Verify `/healthz` and `/readyz` where provided; those routes report process/config readiness and do not prove Vira authorization or a successful runtime decision.
- Use non-root container users, a read-only filesystem where practical, resource limits, TLS at the trusted ingress, and explicit network egress policy. Keep secrets out of build args and Docker build context.
- Roll out gradually, monitor sanitized request IDs and errors, and keep a rollback to the previous immutable image digest. Do not automatically retry non-idempotent actions; reuse an idempotency key only for a retry of the same logical request.

## Framework-specific

- Next.js: build with the committed `package-lock.json`; keep both model routes on the Node.js runtime. The sample performs no browser-side Vira calls. Keep both Vira and model-provider keys on the server.
- FastAPI: build with the hash-locked requirements file and run behind an authenticated ingress. The sample calls Python SDK `serve_behavior_projection`; it does not treat `resolve_runtime` as returning the JavaScript projection shape. `/healthz` is liveness; `/readyz` checks local client/scope initialization only.
- LangGraph: run as a worker or authenticated application service. The sample requires the published response to contain an active, non-empty behavior projection before model invocation; the projection does not authorize tool or external side effects.
- MCP client: this is a host-side process, not a network service image. Pin and review both the MCP client and server package, restrict process/environment access, and let the host discover tools and request approval for effectful calls.

## License

The repository `LICENSE` governs Vira-authored documentation and examples only. It is proprietary and grants no redistribution or commercial-use rights. Third-party packages keep their own licenses; consult the license files in the exact lockfile-resolved artifacts and include applicable notices in redistributed images or products. The separately distributed Vira SDK packages are governed by the license files and metadata shipped with those packages, not by assumptions in these examples. This guide is not legal advice.
