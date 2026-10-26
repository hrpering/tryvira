# Signals

A Signal is typed evidence that can be consumed by behavior logic or discovery.

Examples:

```text
feedback.user_correction
quality.missing_measurement
risk.requires_review
outcome.accepted
```

## What a signal needs

A useful signal definition has a stable identity and a clear meaning.

Conceptual public fields include:

```yaml
stableKey: quality.missing_measurement
version: 1
valueType: boolean
description: The response omitted a required measurement approach
required: false
sensitivity: tenant
sourcePolicy: observation
```

The exact authoring schema is versioned by the server.

## How signals are created

The public-safe lifecycle is:

```text
observation / feedback / outcome
        ↓
signal discovery proposal
        ↓
human review
        ↓
approved signal definition
        ↓
approved producer mapping
        ↓
future evidence can produce the signal
```

This is deliberately different from:

```text
model guessed a signal
→ immediately active
```

## 1. Produce evidence

Use the SDK:

```ts
await vira.feedback({
  eventId: crypto.randomUUID(),
  aiSystemId,
  connectionId,
  feedback: {
    type: "correction",
    text: "The launch plan is missing measurement."
  }
});
```

## 2. Review the proposed signal

A signal discovery proposal should answer:

- What is the stable key?
- Which evidence supports it?
- What kind of producer can emit it?
- Is the proposal confident enough to review?
- Is the signal sensitive?

## 3. Materialize only after approval

Approved discovery can create a signal definition plus the mapping that explains where the value comes from.

## Signal producer examples

Public concepts include producers such as:

- observation attributes;
- tool results;
- user feedback;
- business outcomes;
- derived approved transformations.

## Signal mapping

A mapping connects:

```text
producer
→ source event
→ signal stable key + version
```

Example concept:

```yaml
signalStableKey: quality.missing_measurement
signalVersion: 1
producerType: observation_attribute
producerKey: quality.missing_measurement
sourceEventType: model.response
```

## Signals in Packs

Packs can declare signal keys that a Behavior Point expects.

Example:

```yaml
signals:
  - key: quality.missing_measurement
```

The Pack binds expected signal keys to the materialized behavior context.

Signal definitions and producer mappings still follow the supported signal lifecycle.

## What is intentionally not public here

This repository does not expose:

- private signal-scoring thresholds;
- internal discovery prompts;
- proprietary ranking logic;
- raw internal capture jobs;
- tenant data.

Those details are unnecessary for integration.
