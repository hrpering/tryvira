# JavaScript / TypeScript SDK setup prompts

Use these prompts to install `@vira/sdk` into an existing Node.js application without replacing unrelated project structure.

## Fresh integration into an existing project

```text
Integrate Vira into this existing JavaScript/TypeScript project using the public package `@vira/sdk`.

Inspect the repository first. Preserve the existing framework, package manager, module system, environment loading, logging, testing, and application architecture. Do not create a second app or replace working code.

Requirements:
- Node.js must satisfy the documented Vira SDK requirement.
- Install `@vira/sdk` with the package manager already used by this repository.
- Read VIRA_API_URL and VIRA_API_KEY from the project's existing environment/config system.
- Never hard-code credentials.
- Add organization/project/environment scope using environment variables or the existing configuration layer.
- Create one reusable ViraClient instance rather than constructing a new client for every request.
- Add a minimal connection flow with `connectOnce` only where connection identity is actually needed.
- Add one sanitized observation example and one semantic/runtime resolution example appropriate to this application.
- Preserve idempotency for retryable mutations.
- Do not bypass Vira lifecycle gates.
- Do not invent SDK methods; confirm method names from the installed package/public docs.

Before editing, report:
1. package manager
2. Node version target
3. module system
4. current environment/config pattern
5. best file(s) for Vira client integration

Then make the smallest patch.

After editing, return:
A. files changed
B. install command
C. required environment variable names only, never values
D. minimal run/test command
E. expected successful result
F. rollback instructions
```

## Existing SDK install is broken

```text
Audit this project's existing `@vira/sdk` integration. Do not rewrite it from scratch.

Check in this order:
1. installed `@vira/sdk` version and package manager lockfile
2. Node runtime compatibility
3. import/module syntax
4. ViraClient construction and base URL
5. environment variable names and whether the runtime can see them, without printing values
6. scope fields
7. the first failing Vira method call
8. HTTP status/public error code/requestId if available
9. whether mutation retries reuse the same logical idempotency key

Classify the failure as one of:
- installation/dependency
- client construction
- client validation
- authentication
- scope
- lifecycle/state
- transient API/network

Make only the smallest evidence-backed change. Do not delete the lockfile, reinstall all dependencies, disable auth, or change multiple layers at once unless necessary.

Return observed facts, root cause, exact patch, verification command, expected output, and next branch if verification fails.
```

## Minimal verification prompt

```text
Verify this Vira JavaScript SDK installation without changing behavior configuration.

Use the least invasive checks available:
- confirm `@vira/sdk` resolves/imports;
- confirm ViraClient can be constructed with sanitized configuration;
- use a read-only request when possible;
- if testing a connection, do not create duplicate systems/connections unnecessarily;
- report HTTP status/public error code/requestId on failure.

Do not expose credentials or production payloads. Return PASS/FAIL for dependency, client construction, API reachability, authentication, scope, and one read-only Vira operation.
```
