# Scoped capability discovery

Capability discovery answers a simple operational question:

> What can this credential use in this organization / project / environment, and on which public surface?

Do not infer this from package version alone. Scope, role, surface, and deployment policy can all matter.

## Studio

The current Studio surface exposes a scoped capability view at:

```text
/capabilities
```

It is intended to show what the current actor can use without implying extra authority. The Studio view can present:

- capability key;
- available / unavailable state;
- required roles;
- supported surfaces;
- a reason when an action is unavailable.

Capability visibility is evidence about the current scoped actor. It does not grant a role or bypass authorization.

## HTTP

```text
GET /v1/capabilities
GET /v1/capabilities?surface=api
```

Supported surface filters are currently:

```text
studio
sdk
python
mcp
api
```

The response includes the resolved scope, requested surface, capability entries, and the catalog source.

Each capability entry can describe:

- stable capability key;
- human-readable description;
- required roles;
- public surfaces;
- whether the operation is effectful.

## JavaScript

```ts
const all = await vira.listCapabilities();
const sdk = await vira.listCapabilities({ surface: "sdk" });
```

## Python

```python
all_capabilities = client.list_capabilities()
python_capabilities = client.list_capabilities(surface="python")
```

## MCP

```text
list_capabilities
```

Example arguments:

```json
{
  "organizationId": "<organization>",
  "projectId": "<project>",
  "environmentId": "<environment>",
  "surface": "mcp"
}
```

## Example capability families

The current public catalog includes capability families for connected AI systems, semantic resolution, Behavior Point authoring, Strategy execution/activation, Teach, evaluation, release, Packs, and MCP effectful execution.

The exact result is scoped. Treat the API/Studio result as the current answer instead of copying a static role matrix into application code.

## Discovery is not runtime capability negotiation

`listCapabilities`, `list_capabilities`, MCP `list_capabilities`, and the Studio capability view describe product capability availability.

Runtime capability attestation/resolution is a separate governed runtime surface used when selecting runtime capabilities. See [Capability map](capability-map.md).

## Recommended integration check

```text
startup
→ connectOnce / connect_once
→ test connection
→ list capabilities for the integration surface
→ enable only supported UI/actions
```

This is especially useful for Studio, MCP hosts, admin tooling, and SDK integrations that support multiple Vira deployment profiles.
