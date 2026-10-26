# Security model

## Scope is explicit

Requests operate inside an organization, project, and environment boundary.

## Semantic selection is not authorization

A semantic match identifies a candidate task.

Runtime authority still depends on governed released state.

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

No customer conversations, customer IDs, private prompts, or production traces belong in this repository.
