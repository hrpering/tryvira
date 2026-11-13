---
name: vira-observe-teach
license: "Proprietary; see LICENSE"
description: "Guide a customer through the complete Teach learning journey, from permitted evidence to a reviewed behavior improvement and the next cycle."
---

# Observe and Teach AI

Use this Skill for the full customer-facing Teach journey. Teach helps a team learn from permitted evidence and consider a behavior improvement; it does not silently change a live application.

## Activate this skill when
The user wants to learn from permitted application evidence, review a proposed improvement, or connect runtime use to a later behavior-improvement cycle. For an end-to-end application task, coordinate with `vira-full-lifecycle`.

## Inputs and preconditions
Understand the user's goal, what evidence they are allowed to use, the Vira account and integration surface available to them, who can review a proposed change, and which later steps they want to reach. For a customer-run SDK example, use `VIRA_API_URL` for the customer's API deployment root and keep `VIRA_API_KEY` in server-side secret storage; never ask for either value in chat. Keep customer content out of source control. Use synthetic evidence in an authorized development environment for public examples. If Vira access is not available, explain the limit and continue with planning that does not require live service.

## Workflow: complete Teach learning journey

1. **Agree on evidence.** Confirm what may be processed, minimize it, and distinguish observations, feedback, conversation context, and business outcomes.
2. **Bring in permitted evidence.** Use a customer-supported surface, preserve its source context, and keep the example data synthetic.
3. **Review what Teach found.** Use the chosen public interface and wait for its persisted work to finish before describing a result.
4. **Connect the result to behavior.** Ask the relevant authoring and Signal Skills to help identify an appropriate behavior area. Treat uncertain signals as questions to review.
5. **Prepare a suggestion.** Keep the evidence and intended behavior change clear. A suggestion is not an accepted change.
6. **Review with an authorized person.** Present the source evidence, scope, expected effect, and possible regressions. Keep human review distinct from model-generated analysis.
7. **Check the proposed behavior.** Use the evaluation Skill and a representative set of allowed examples. Do not describe a candidate as successful without persisted customer-facing evidence.
8. **Use separate review and release decisions.** Ask the release Skill to prepare the authorized next step. Teach completion alone does not put a change into live use.
9. **Try the eligible behavior in the application.** Use the runtime Skill and the framework-specific Skill to inspect the actual customer-facing result.
10. **Begin another cycle only when useful.** Collect permitted results, keep uncertainty visible, and return to the evidence review when the user wants another improvement.

## Work across the Skills

Use `vira-full-lifecycle` to coordinate a complete application journey and invoke the specialist Skills when their work is needed:

- Application setup: `vira-get-started`, `vira-integrate-app`, `vira-framework-integration`, and the relevant SDK Skill.
- Behavior context: `vira-author-behavior`, `vira-signals`, and `vira-strategies`.
- Candidate preparation and review: `vira-build-pack`, `vira-packs`, `vira-evaluate`, and `vira-evaluate-release`.
- Approved use: `vira-release`, `vira-runtime`, and `vira-debug`.
- Later learning: return to `vira-observe-teach` with the permitted evidence.

Use only the operations documented by the selected public interface and installed client. SDK, Python, HTTP, MCP, and Studio capabilities can differ. If a stage is unavailable, state exactly which customer task is paused and continue only with independent supported steps. Do not make up a request, response, event, or customer result.

Teach work can include single- and cross-conversation analysis, recommendation inspection and decision, and proposal creation/revision when the selected public surface documents them. Check the published method inventory; for MCP, discover its actual tools before choosing a surface. Do not infer support on one interface from another interface's documentation.

## Example and verification

For the complete Skills-guided customer journey, install `vira-full-lifecycle` with this Skill and follow the real-service [Marketing Agent tutorial](https://github.com/hrpering/tryvira/blob/main/tutorials/marketing-agent/README.md). It connects an application, works through a synthetic customer example, checks behavior in the app, and returns to a reviewed Teach improvement. The [Teach guide](https://github.com/hrpering/tryvira/blob/main/docs/teach.md) maps the product journey to specialist Skills. For a local ON/OFF interaction, use [`vira-chatbot`](https://github.com/hrpering/tryvira/blob/main/skills/vira-chatbot/SKILL.md).

For a focused customer-run analysis and readback, follow the [Teach analysis example](examples/README.md). Use only the customer's isolated authorized scope and admitted evidence; the example is gated and does not accept recommendations, promote changes, or release behavior.

The tutorial uses configured customer services and contains no mock Vira server. It requires the user's own Vira access and an authorized development environment; product access is not open yet. Do not claim a live result when only the repository checks ran.

## Deliverable and failure handling
Return the last confirmed customer-facing stage, the specialist Skills used, what the user can do next, and any access or documentation gap. If evidence is not permitted, review authority is unclear, or the required interface is unavailable, pause that stage and explain the next customer action. Never expose secrets or turn an analysis into an unreviewed production change.

## References
- [Teach AI end-to-end guide](https://github.com/hrpering/tryvira/blob/main/docs/teach.md)
- [Complete customer tutorial](https://github.com/hrpering/tryvira/blob/main/tutorials/marketing-agent/README.md)
- [Signals guide](https://github.com/hrpering/tryvira/blob/main/docs/signals.md)
- [Evaluation and approval guide](https://github.com/hrpering/tryvira/blob/main/docs/evaluation-and-approval.md)
- [Release guide](https://github.com/hrpering/tryvira/blob/main/docs/release.md)
- [Runtime guide](https://github.com/hrpering/tryvira/blob/main/docs/runtime.md)
- [Skill coverage and validation status](https://github.com/hrpering/tryvira/blob/main/docs/agent-skills/skill-status.md)
