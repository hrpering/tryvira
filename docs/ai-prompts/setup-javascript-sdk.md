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
