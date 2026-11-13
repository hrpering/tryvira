# Example: observe one existing AI turn without altering the response

**Prompt:** “Instrument the support assistant's real model response event. Do not change its prompt or trigger Teach.”

**Inputs:** Actual scoped AI System/Connection from an authorized isolated test tenant; permitted metadata `status:"completed"`; one stable eventId; no customer text. For an isolated app with the SDK installed, set real `VIRA_*` scope/connection IDs, one non-secret `VIRA_EVENT_ID` and `VIRA_ALLOW_OBSERVE=yes`, then run `node observe-once.mjs` or `python observe_once.py`. Both examples include **all 7 required envelope fields** and stop on missing scope. You may also use [the JS example](https://github.com/hrpering/tryvira/blob/main/examples/javascript/connect-observe.mjs) or [the Python example](https://github.com/hrpering/tryvira/blob/main/examples/python/connect_observe.py). Check the installed SDK signatures.

**Procedure:** Observe-only → submit once → inspect returned event/status → retry with same idempotency → optionally use a separately authorized user correction. Do not add a Pack/release side effect.

**Offline test:** `node --test observe-contract.test.mjs` checks required fields and negative cases without network access. There is no live PASS implied.

**Expected evidence:** server-accepted event ID/digest if supported. No Signal or Teach success implied.

**Negative test:** A mismatched tenant, unknown connection or disallowed conversation content must not be submitted. A 202 event status is not a runtime verifier PASS.

[Overview](https://github.com/hrpering/tryvira/blob/main/docs/observe.md)
