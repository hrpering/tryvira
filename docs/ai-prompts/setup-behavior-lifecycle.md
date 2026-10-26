# Behavior lifecycle setup prompts

Use these prompts after the SDK/MCP connection works and you are configuring Vira behavior for the first time.

## Create a Semantic Task + Behavior Point through a Pack

```text
Help me author the smallest production-quality Vira Pack for one behavior use case.

Use only the public Vira Pack/Behavior Point concepts and the repository's existing examples. Inspect the current Pack structure first if one exists.

Goal/use case: <DESCRIBE>
Example user requests: <3-10 EXAMPLES>
Required behavior: <DESCRIBE>
Known negative/non-matching requests: <EXAMPLES>

Create or update:
- one Semantic Task with a stable taskKey, description, aliases, positive examples, and negative examples;
- one Behavior Point bound to that task;
- the minimum Behavior Program needed for the requirement;
- an evaluation that checks the important behavior;
- a Strategy only if the task genuinely needs multi-step execution.

Do not add fake metrics, unnecessary Signals, or a Strategy for a simple one-step rule. Do not activate/release anything automatically.

Return:
1. proposed keys and why they are stable
2. files/objects to add
3. exact Pack patch
4. validation checklist
5. import → install → evaluate → approve → release plan
6. 5 semantic regression examples with expected outcomes
```

## Add a Signal from real evidence

```text
Design a Vira Signal for this real behavior/evidence need.

Desired signal meaning: <MEANING>
Real source event: <SANITIZED EVENT SHAPE>
Where the value exists: <payload/attributes/tool result/application state>
Evidence event IDs available: <SANITIZED IDS OR NONE>

Determine whether a new Signal is actually necessary. If yes:
- propose a stable Signal key;
- choose the correct supported producerType based on the real source;
- choose a producerKey that exists in the event;
- create a discovery proposal backed by real evidence;
- keep review and mapping approval explicit;
- plan one known-value verification event.

Do not invent evidence IDs or producer fields that are absent from events.

Return proposal input, review/materialization sequence, mapping input, and verification.
```

## Add a Strategy only when needed

```text
Decide whether this Vira behavior requires a Behavior Strategy.

Task: <TASK>
Desired workflow: <STEPS>
Tools/models involved: <IF ANY>
Verification requirements: <REQUIREMENTS>
Failure/recovery requirements: <REQUIREMENTS>

First decide SIMPLE PROGRAM vs STRATEGY and explain why.

If Strategy is justified, design the minimum bounded graph using supported step concepts. Define entry, steps, edges, state requirements/outputs, verifier needs, terminal path, budgets, and recovery. Avoid cycles unless they are explicitly bounded.

Then provide:
1. structural Strategy definition/patch
2. validation checklist
3. simulation plan
4. evaluation plan
5. runtime prerequisites

Do not claim structural simulation makes real model/tool calls.
```

## Configure Teach + evaluation safely

```text
Plan a Vira Teach/evaluation flow for this use case.

Evidence sources: <SOURCES>
Privacy/consent constraints: <CONSTRAINTS>
Behavior Point/task: <TARGET>
What should improve: <BEHAVIOR>
What must never regress: <GUARDS>

Design:
1. what evidence is admitted and under what privacy/consent conditions;
2. how proposals are reviewed;
3. evaluation dataset and assertions;
4. success/failure criteria;
5. how a failed candidate is revised and re-evaluated;
6. approval/release steps after evaluation.

Do not auto-promote AI-generated proposals and do not lower thresholds to force success.

Return a lifecycle diagram, minimum required objects, example evaluation cases, and verification at each transition.
```

## End-to-end first setup audit

```text
Audit this first Vira behavior setup before release.

Return PASS/FAIL + evidence for:
1. SDK/MCP connection works
2. observations can be submitted
3. Semantic Task routes expected examples and abstains on negatives
4. Behavior Point exists in same scope
5. Program/Strategy matches the intended behavior
6. Signals, if any, are backed by real evidence and approved mappings
7. evaluation covers required behavior and regression cases
8. explicit approval is possible
9. release is eligible
10. runtime resolve can be tested with one known request

Stop at first FAIL. Give one fix and one verification. Do not release automatically.
```
