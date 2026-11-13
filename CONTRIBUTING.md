# Contributing to Vira's public developer resources

Thanks for helping make Vira easier to understand and integrate. This repository contains **public documentation, examples and Agent Skills**, not the private hosted backend. Before contributing, read the [repository licensing boundary](LICENSE) and [repository scope](docs/repository-scope.md). Public does not mean openly licensed here.

## Ways to help

- Fix a confusing guide or broken link.
- Improve a reproducible JavaScript, Python, MCP or framework integration example.
- Add a focused negative-path test or clarify an authorization boundary.
- Improve accessibility, navigation, troubleshooting, or developer onboarding.
- Report a reproducible bug in a published public package.

For behavioral changes to an existing Skill, keep the change narrowly scoped and explain the test coverage. Do not casually change the Skills library as part of editorial cleanup.

## Before opening a pull request

1. Check for an existing [issue](https://github.com/hrpering/tryvira/issues) and describe the user-facing problem.
2. Create a feature branch from the current default branch.
3. Make a small, reviewable change. Link new guides from the appropriate index and include a real, version-matched runnable example when documenting operations.
4. Use **synthetic data** and do not commit private Vira endpoints, credentials, customer conversations, production traces, personal data, or unreleased service implementation details.
5. Run the checks below and explain which ones were not run.

```bash
npm ci
npm ci --prefix tutorials/marketing-agent
npm run verify
```

For changes to the Next.js app, also run:

```bash
npm ci --prefix examples/frameworks/node-next
npm test --prefix examples/frameworks/node-next
npm run build --prefix examples/frameworks/node-next
```

CI has additional framework checks. A passing local test does **not** establish live service behavior.

## PR checklist

- [ ] A first-time user can tell what changed and why.
- [ ] New links and documented paths exist; code matches a published contract.
- [ ] Access requirements, scope, authority checks and negative outcomes are accurate.
- [ ] No secrets or customer data appear in the diff or test output.
- [ ] Documentation is updated for user-facing behavior or a breaking change.
- [ ] Verification steps and results are reported; unsupported live tests are called out.

Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md). Follow the [writing guide](docs/writing-guidelines.md). For support questions, see [SUPPORT.md](SUPPORT.md). Suspected vulnerabilities belong in the private channel in [SECURITY.md](SECURITY.md), never public issues.
