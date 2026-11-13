# Core concepts

## AI System

The application, agent, copilot, or model-backed system connected to Vira.

## Connection

The adapter-level connection between an AI System and Vira.

## Scope

The organization, project, and environment boundary in which data and behavior apply.

## Observe

A structured, scoped record of what a connected AI system actually did: conversations, model requests/responses, tool calls, actions, errors, cost and later outcomes. Observation acceptance is not verification. [Observe guide](observe.md)

## Runtime verification

An applicable released behavior is checked at the actual runtime stage (`pre_model`, `pre_tool`, `post_model` or `pre_action`), subject to the host's real capability. It needs an actual verifier and a receipt. [Runtime verification](runtime-verification.md)

## Feedback and outcome attribution

User/operator feedback and actual business outcomes are different evidence inputs. Neither may silently authorize a behavior release. [Teach](teach.md)

## Response Quality & Decision

A bounded evaluation/selection of response candidates. It is not the same as offline Behavior Evaluation or runtime verification. [Quality](decision-and-quality.md)

## Host capability attestation

Server-governed evidence that a particular connected host can enforce a requested runtime boundary. Client-declared capabilities do not grant permission. [Canonical TaskRun](canonical-taskrun.md)

## Semantic Task

A governed task definition used by semantic resolution.

Example:

```text
marketing.launch_plan
```

## Behavior Point

A named point in an AI workflow where governed behavior can apply.

A Semantic Task answers:

> What kind of task is this?

A Behavior Point answers:

> Where should governed behavior attach?

## Signal

Typed evidence that can be produced from an observation or another approved producer.

## Behavior Program

A structured set of behavior modules such as guards, judgments, transforms, verifications, escalations, rubrics, examples, and anti-patterns.

## Strategy

A bounded execution graph for a Behavior Point.

Strategies describe how work may proceed. Policy and release checks remain separate.

## Teach

The lifecycle that turns admitted evidence into a reviewable behavior proposal.

## Evaluation

A test of a candidate artifact or behavior change before release.

## Release

An explicit approved behavior state that runtime can consume.

## Runtime resolution

The process of resolving released behavior for a request.

## Trace

A developer-facing explanation of what task and behavior were selected and what happened.

Trace examples in this repository use a compact developer-facing format.
