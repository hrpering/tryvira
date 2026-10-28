# Marketing Agent: end-to-end Vira tutorial

This tutorial uses the published `@tryvira/sdk` package.

## Flow

```text
1. connectOnce
2. verify connection
3. observe baseline
4. submit feedback / Teach evidence
5. resolve Semantic Task
6. author governed Behavior Point / Pack
7. Behavior Evaluation
8. approve + release
9. runtime resolution
10. candidate response(s)
11. optional Response Quality & Decision
12. observe result/outcome
13. new Teach cycle when evidence justifies it
```

`01-connect.mjs` uses `connectOnce` and `testConnection`.

Observations/feedback are evidence; they do not activate behavior.

Teach AI conceptually turns admitted evidence into a proposal, then review → Behavior Evaluation → approval/release.

`05-pack-lifecycle.mjs` demonstrates the Pack lifecycle. Treat sample evaluation values as tutorial inputs only; never fabricate a production pass.

`06-runtime-resolve.mjs` resolves released behavior.

`07-quality-decision.mjs` demonstrates the separate response-quality layer:

```text
bounded response candidates
→ quality checks
→ selected candidate OR abstention
```

Response Quality does not release behavior or bypass policy.
