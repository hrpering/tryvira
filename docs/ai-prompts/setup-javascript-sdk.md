# AI setup prompt — JavaScript / TypeScript SDK

```text
You are integrating the published Vira package @tryvira/sdk.
Inspect the repository first: package manager, Node version (>=20), module system, env/config pattern, smallest integration file, and any existing Vira integration.
Use the current public SDK reference. Do not invent methods.
Implement the minimum safe path:
1. install @tryvira/sdk;
2. create ViraClient using existing config conventions;
3. use connectOnce;
4. retain systemId + connectionId;
5. call testConnection or connectionHealth;
6. add one sanitized observation;
7. avoid unrelated runtime/Teach/release changes.
Never print or commit API keys.
Return files inspected, dependency change, minimal patch, required env, verification command, expected result.
```

## Copy/paste setup prompt

Use this prompt with a coding agent when starting a new Node.js or TypeScript service:

```text
Set up Vira in this existing Node.js/TypeScript application.

Goal: connect the application, record one safe observation, and show the first
governed runtime resolution. Do not create a Pack or release behavior yet.

Requirements:
1. Inspect package.json, the module system, Node version, and existing configuration.
2. Install @tryvira/sdk@0.1.44 or the current registry version and use the repository's package manager.
3. Read VIRA_API_URL, VIRA_API_KEY, VIRA_ORGANIZATION_ID,
   VIRA_PROJECT_ID, and VIRA_ENVIRONMENT_ID from the environment.
4. Add a small integration module using ViraClient, connectOnce, observe,
   resolveSemantic, and resolveRuntime only where the existing API supports them.
5. Use stable idempotency keys and sanitize observation payloads.
6. Never print, commit, or send credentials; never use a local URL as a production
   fallback; never bypass a denied or abstained runtime decision.
7. Do not invent endpoint names or response fields. Check the public SDK reference
   and the installed TypeScript declarations first.

Return:
- files inspected and changed;
- exact environment variables required;
- the complete example file;
- the command to run it;
- expected success, deny, and abstain behavior;
- tests added or run.
Stop and report the exact missing contract if the installed package cannot support a step.
```
