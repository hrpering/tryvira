# How Vira works

Vira has two connected flows: a **request path** that decides what behavior can apply now, and an **improvement path** that turns evidence into a reviewed and releasable behavior change.

## 1. Request path

![Vira request path](../assets/vira-request-path.svg)

### Request

An application, agent, or MCP host sends work through a supported integration surface.

### Semantic Task

Semantic resolution identifies what kind of work the request represents. It can select a task, return uncertainty, or return no match.

This classification step does not activate behavior by itself.

### Behavior Point

A Behavior Point is the stable governed attachment point for behavior.

```text
Semantic Task  → what kind of work is this?
Behavior Point → where can governed behavior attach?
```

### Behavior Program or Strategy

A Behavior Program can express guards, judgments, transforms, verification, escalation, rubrics, examples, and anti-patterns.

A Strategy can express a bounded multi-step flow for tasks that require more than one operation.

Strategies now have an explicit final-output ownership decision:

```text
response      → Vira Strategy owns the final answer
behavior_plan → Vira produces a compact plan; downstream model owns final prose
```

The second mode is especially useful when Vira is inserted into an existing chatbot. It avoids generating a full answer twice.

See [Strategy result modes](strategy-result-modes.md).

### Runtime

Runtime resolves released behavior that is eligible for the current request and execution boundary.

### Trace

The developer-facing trace stays compact. It should explain the task, Behavior Point, applied behavior, and result without exposing unnecessary runtime internals.

---

## 2. Improvement path

![Vira behavior control lifecycle](../assets/vira-overview.svg)

### Observe

Applications can submit supported observations, feedback, and outcomes.

Observation is evidence. It is not a production change.

### Discover / Teach

Evidence can support Signal discovery, mapping, or a Teach proposal.

AI assistance can help identify patterns or propose candidate behavior, but that candidate still moves through explicit gates.

### Evaluate

Evaluation checks whether the candidate satisfies required assertions and quality conditions.

### Approve

Approval is a separate lifecycle transition where required. Evaluation success and approval are not the same thing.

### Release

Release makes approved behavior eligible for runtime. Importing, installing, or proposing behavior does not equal release.

### Runtime → new evidence

Once released behavior is used, new observations and outcomes can feed the next improvement cycle.

---

## 3. Preference-aware behavior

Behavior may depend on user-owned preferences such as audience, geography, budget, channels, tone, timeframe, constraints, or success metrics.

Those values should remain user-owned state rather than hard-coded Strategy constants.

A preference-aware design should:

- use explicitly stated or confirmed preferences;
- preserve unchanged preferences;
- replace changed preferences;
- stop using removed preferences;
- avoid inventing missing preferences;
- label proposed defaults as hypotheses.

See [Authoring quality](authoring-quality.md).

---

## 4. Integration surfaces

![Vira integration surfaces](../assets/vira-integrations.svg)

Vira can be integrated through:

- JavaScript / TypeScript SDK;
- Python SDK;
- direct HTTP API;
- MCP.

These are different integration surfaces around the same behavior-control model.

---

## 5. Accelerator direction

![Vira GPU acceleration vision](../assets/vira-gpu-vision.svg)

Vira is exploring an accelerator path where released behavior execution can sit closer to model inference, including same-device GPU execution when that path is accepted.

The goals are to reduce unnecessary runtime boundaries while preserving the exact governance model:

```text
released behavior
→ bounded behavior execution
→ model inference
→ verification / trace
```

This work is experimental and is **not** presented as generally available production functionality. CPU/conventional runtime remains a first-class path and a parity reference.

See [GPU acceleration vision](gpu-acceleration-vision.md).

---

## 6. A concrete example

Imagine a marketing chatbot receives:

```text
Build a launch plan for a membership product.
```

A simplified path can look like:

```text
Semantic Task   marketing.launch_plan
Behavior Point  marketing.launch_plan
Strategy        resultMode=behavior_plan
Behavior plan   full-funnel + measurement + confirmed preferences
Downstream AI   writes final user-visible plan once
Trace           applied=yes, result=completed
```

If users repeatedly correct the agent because it forgets retention, measurement, or confirmed preferences, those corrections can become evidence for a reviewed behavior improvement instead of another ad hoc prompt patch.

## 7. Where to go next

| Goal | Guide |
| --- | --- |
| Connect an application or agent | [Connect an AI system](guides/connect-an-ai-system.md) |
| Understand attachment points | [Behavior Points](behavior-points.md) |
| Build behavior | [Behavior Programs](behavior-programs.md) |
| Build multi-step behavior | [Strategies](strategies.md) |
| Choose Strategy output ownership | [Strategy result modes](strategy-result-modes.md) |
| Learn authoring quality | [Authoring quality](authoring-quality.md) |
| Understand accelerator direction | [GPU acceleration vision](gpu-acceleration-vision.md) |
| Learn from evidence | [Teach](teach.md) |
| Test candidates | [Evaluation and approval](evaluation-and-approval.md) |
| Make behavior eligible | [Release](release.md) |
| Resolve behavior | [Runtime](runtime.md) |
| Debug failures | [Troubleshooting](troubleshooting/README.md) |
