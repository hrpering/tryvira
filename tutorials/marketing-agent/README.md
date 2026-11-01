# Marketing Agent: end-to-end Vira tutorial

This tutorial uses the published `@tryvira/sdk` `0.1.14` package.

## Flow

```text
1. connectOnce
2. verify connection
3. observe baseline
4. submit feedback / Teach evidence
5. resolve Semantic Task
6. author governed Behavior Point / Pack
7. validate/materialize candidate behavior
8. Behavior Evaluation
9. explicit approval + release when appropriate
10. runtime resolution
11. candidate response(s)
12. optional Response Quality & Decision
13. observe result/outcome
14. new Teach cycle when evidence justifies it
```

`01-connect.mjs` uses `connectOnce` and `testConnection`.

Observations/feedback are evidence; they do not activate behavior. Semantic resolution is also candidate/evidence selection, not authorization.

Teach AI conceptually turns admitted evidence into a proposal, then review → Behavior Evaluation → promotion → explicit release as required by the governed flow.

`05-pack-lifecycle.mjs` demonstrates the current Pack lifecycle:

```text
import
→ inspect validation / inventory / conflicts
→ configure
→ install / materialize draft
→ evaluate
→ approve
→ release
```

The tutorial deliberately gates the final approval/release calls behind `VIRA_TUTORIAL_APPROVE_RELEASE=true`. Sample evaluation values are tutorial inputs only; never fabricate a production pass.

`06-runtime-resolve.mjs` resolves eligible released behavior through the runtime authority boundary.

`07-quality-decision.mjs` demonstrates the separate Response Quality & Decision layer:

```text
bounded response candidates
→ quality checks
→ selected candidate OR abstention
```

Response Quality does not release behavior or bypass policy.

For the full public contract and Point-to-Pack walkthrough, see the [Developer guide](../../docs/developer-guide.md).
