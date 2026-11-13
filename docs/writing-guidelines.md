# Public documentation and product writing standards

This guide keeps Vira's public language consistent across README pages, tutorials, example applications, and customer-facing explanations.

## One shared description

> Vira helps teams define, evaluate, release and inspect how their existing AI applications and agents behave.

Explain behavior in concrete terms: what the AI **says, decides, and does** for a task. Use **behavior-control layer** only after the plain-language explanation. Define a product term on first use; do not stack Semantic Task, Point, Program, Strategy and IR acronyms in the opening paragraph.

## Lead with reader value

- Start with the problem and one recognizable scenario, not a catalog of internal concepts.
- Offer a route for the reader's role: customer/evaluator, app developer, or maintainer.
- Give the shortest real working step before advanced architecture.
- Explain what the reader should actually observe and which prerequisites are missing.
- Use active, concise English in canonical technical docs; keep translations linked and scoped.

## Claims must be testable

- Never state that Vira guarantees correctness, compliance, saved tokens, lower latency, or better scores without named, reproducible evidence.
- Clearly label *illustrative* examples and *product vision* separately from shipped, tested behavior.
- A local build is not a live hosted-service run. An SDK package on npm is not proof of account availability.
- Do not imply an automatic Teach release, universal tool interception or feature parity across SDK/MCP/Studio.
- Show a meaningful denied/no-match path instead of pretending everything succeeds.

## Editorial structure

A task guide should contain: **purpose → prerequisites → commands → expected outcome → failure conditions → next step**. Code examples must use an actual published client surface and synthetic, non-sensitive data. The installed package version is authoritative for method signatures.

Prefer headings such as “Connect your agent”, “Evaluate a change”, or “Inspect runtime evidence” over ambiguous terms such as “Revolutionary intelligence orchestration”.

## Examples, comparisons and modes

- Show several levels of examples: everyday, team workflow and multi-task operations. Include a real prompt, intended behavior and a negative test. Label illustrative scenarios rather than fabricating model responses.
- A category comparison may discuss Skills, agents, prompt libraries, memory, observability, orchestration and other platform types **without naming competing brands**. Avoid claiming that an entire category lacks a feature.
- Name SINGLE, STRATEGY, COMPOUND and HYBRID as TaskRun execution modes, with AUTO as the routing request. They must not be described as the same operation.
- Use installed, published client contracts; do not equate package installation with tenant access or a simulated transport test with live execution. Every actual admission needs an explicit operator action.
- Link new developer examples from both the examples index and the appropriate SDK reference, and add offline smoke tests where possible.

## Visuals and trust

Brand wordmark: **vira** as text, without added V glyphs, lines or invented symbols. Core visual palette: midnight black, electric blue and cantaloupe orange, plus neutral backgrounds. Avoid generic indigo/purple AI gradients. Use actual product screenshots only when they depict a verified current build; diagrams should say that they are illustrations.

Do not add fake stars, test badges, customer logos, partnership claims, quantified benchmarks, public sign-up buttons or a claim of an open-source license for this proprietary documentation repo. Reference the MIT-licensed client packages separately.

## Before opening a PR

Review the page as a first-time reader. Confirm relative links, code paths, client version, availability language, secrets handling and customer-facing terms. Run `npm run verify` after installing the repository prerequisites. Preserve the Skills content unless the change explicitly scopes a separate reviewed Skills update.
