# Measuring automatic Skill selection

The 87 trigger cases are a labeled evaluation corpus, not a model score. A real score requires an external agent adapter that actually runs the agent with this Skill library installed and records observed Skill-load events.

Run the structural check without invoking a model:

```bash
python3 scripts/eval_skill_selection.py --validate-only
```

To score a live trace capture, provide JSONL rows containing the exact `caseId`, the actual `agent` and `model` identifiers, a trace ID, the observed `selectedSkills`, and one `skill_loaded` event for each loaded Skill. The source must be `live_agent_trace` and `simulated` must be `false`:

```bash
python3 scripts/eval_skill_selection.py \
  --results ./artifacts/skill-selection-live.jsonl
```

For each case, the scorer checks that selected Skills are derived from observed load events, then reports positive recall and negative specificity. Ambiguous cases are reported separately and are not silently counted as failures. A result is not publishable evidence until `models` and trace IDs identify the real agent run; fixture validation alone must remain labeled `NO MODEL INVOKED`.

This measures Skill loading only. It does not prove generated code quality, Vira authorization, TaskRun completion, provider output, or final-answer verification. Those require their own live receipts and output-bound evidence.
