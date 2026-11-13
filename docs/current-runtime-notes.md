# Current runtime integration status

**Normal path: [AUTO TaskRun](canonical-taskrun.md).** It submits a scoped request for server-owned semantic resolve, mode dispatch and real child execution with runtime enforcement. SINGLE, STRATEGY, COMPOUND and HYBRID are execution outcomes, not modes the ordinary user must select.

The current published SDK offers TaskRun admission, readback, events and lifecycle methods. The **provider/chatbot output and post-model verification receipt** must still be supported and retrieved explicitly before a customer application claims a verified final answer. Existing TaskRun child receipts do not substitute for that evidence.

**Low-level only:** `behavior-projection`, `serveBehaviorProjection` and `resolveRuntime` are for diagnostics and advanced SDK tests, not the recommended chat integration. See [Runtime](runtime.md) and [developer checklist](developer-checklist.md).

Use fictional data and a real authorized customer tenant for all live tests.
