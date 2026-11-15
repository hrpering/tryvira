# Agent-first workflow: operate Vira without opening Studio

This is an **SDK-backed coding agent workflow**; the CLI never implements private Vira authority. Run within the project where the matching published @tryvira/sdk is installed. Vira service access and actual authenticated non-production scope are external. The operator's permission gates are client safety checks, not bypasses of product permissions.

## Short prompt

> Use $vira-operator to examine my existing Vira development scope. Find the relevant released Task/Program, plan an AUTO TaskRun and show me exactly what you will run. Don't mutate anything yet.

## Full prompt

> Use $vira-operator plus the Vira authoring, Pack, evaluation and Teach Skills. Inspect actual supported methods, create a reviewable behavior candidate, run checks on its real files, then plan import and materialization. Ask me to authorize every consequential operation. Evaluate and release only when server state and my authorization permit it. Finally run AUTO TaskRun, read back children and receipts, and explain how a later consented outcome could produce a new reviewed Teach candidate.

## Commands and local JSON

Create \`empty.json\` containing \`{"args":[]}\` and run:

~~~bash
node <installed-skill-path>/scripts/operate.mjs catalog --installed
node <installed-skill-path>/scripts/operate.mjs doctor
node <installed-skill-path>/scripts/operate.mjs plan listPacks --args empty.json
node <installed-skill-path>/scripts/operate.mjs run listPacks --args empty.json
~~~

Use a JSON file with exact positional SDK arguments for methods requiring inputs. For mutations, first present a dry-run plan, then require explicit user approval, VIRA_ALLOW_MUTATIONS=true and --confirm. Approval/release/deletion additionally require --ack <exactMethod>. The server always remains authoritative.

## Negative test

Try to invoke a method named \`request\` or \`constructor\`: it must be rejected by the static allowlist. Attempt to release a Pack without opt-in permission and a scope: the CLI must stop without constructing a live client. A fabricated Skill document, Studio route, or local JSON object cannot supply a real verified ON answer or permission grant.

For Studio-only capabilities that remain unexposed by the customer public APIs, report **unsupported through Skills**, not an invented call. Consult the [parity map](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/studio-less-parity.md).
