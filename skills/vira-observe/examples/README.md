# Example: observe one existing AI turn without altering the response

**Prompt:** “Instrument the support assistant's real model response event. Do not change its prompt or trigger Teach.”

**Inputs:** Actual scoped AI System/Connection from an authorized isolated test tenant; permitted metadata `status:"completed"`; one stable eventId; no customer text. Use [the JS example](https://github.com/hrpering/tryvira/blob/main/examples/javascript/connect-observe.mjs) or [the Python example](https://github.com/hrpering/tryvira/blob/main/examples/python/connect_observe.py). Check the installed SDK signatures.

**Procedure:** Observe-only → submit once → inspect returned event/status → retry with same idempotency → optionally use a separately authorized user correction. Do not add a Pack/release side effect.

**Expected evidence:** server-accepted event ID/digest if supported. No Signal or Teach success implied.

**Negative test:** A mismatched tenant, unknown connection or disallowed conversation content must not be submitted. A 202 event status is not a runtime verifier PASS.

[Overview](https://github.com/hrpering/tryvira/blob/main/docs/observe.md)
