# Security model

## Scope is explicit

Requests operate inside an organization, project, and environment boundary.

## Semantic selection does not activate behavior

A semantic match identifies a candidate task.

Runtime use still depends on released, eligible behavior.

## Proposals are not releases

Teach and discovery can propose.

Evaluation and approval remain separate.

## Effectful paths fail closed where required

A network or telemetry failure must not become accidental permission for an irreversible action.

## Credentials stay outside source

Never commit:

- API keys;
- MCP auth tokens;
- database credentials;
- provider secrets;
- signing keys.

## Public examples use fictional data

Do not place real user conversations, identifiers, credentials, or production traces in this repository.
