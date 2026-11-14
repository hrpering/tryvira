# Agent Skill support and limitations

The [27 Vira Agent Skills](../../skills/README.md) provide focused guidance for SDK setup, application integration, Observe, Signals, Pack authoring, evaluation, release, TaskRuns and troubleshooting.

## Local developer experience

The repository provides installable Skill folders, portable .skill archives, offline structure/link checks, example application builds and three graded Behavior Pack examples. These resources can be inspected without a Vira service account.

## Connected workflows

Operations such as Observe ingestion, Signal mapping, Teach analysis, Pack materialization/release and runtime TaskRuns need a provisioned Vira API endpoint and authorized scope.

| Surface | Current consideration |
| --- | --- |
| JavaScript and Python | Check the installed package version and supported operations |
| MCP | Use the installed server's `tools/list`; the published tool catalog does not cover the full SDK lifecycle |
| Studio | Requires account access; not all UI flows have public live acceptance evidence |
| Model-driven Skill selection | A trace-based evaluator and 84 scenarios are supplied; live automatic-selection scores are not yet published |
| ON chatbot | AUTO TaskRun admission and state are demonstrated; final verified provider-output retrieval is a separate integration requirement |

The Skills do not include API keys, hosted accounts or bundled third-party SDK binaries.

[Testing and readiness](e2e-readiness.md) · [Live acceptance](live-acceptance.md) · [Product availability](../product-status.md)
