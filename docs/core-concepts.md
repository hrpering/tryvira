# Core concepts

## AI System

The application, agent, copilot, or model-backed system connected to Vira.

## Connection

The adapter-level connection between an AI System and Vira.

## Scope

The organization, project, and environment boundary in which data and behavior apply.

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

Strategies describe how work may proceed. Hard policy authority remains separate.

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

This public repository intentionally keeps traces simple and does not expose internal receipt internals.
