# Third-party notices and license review

This directory is authored by Vira and is covered by the repository's proprietary `LICENSE`. It does not relicense any dependency.

The examples reference or install third-party software including Next.js, React, OpenAI Agents SDK, Vercel AI SDK and its OpenAI provider, LangGraph, LangChain OpenAI, FastAPI, Uvicorn, HTTPX, the Model Context Protocol SDK, and the separately published Vira JavaScript/Python SDK packages. Each dependency remains under the license distributed with the exact resolved artifact. Before redistribution, generate an SBOM from the committed lockfiles, collect each resolved package's license and required notice text, and have counsel or the organization's license-review process review any non-standard, source-available, or usage-restricted terms. Do not infer licensing from a package name or this summary.

No third-party source code is copied into this directory. The generated dependency lockfiles identify versions but do not replace required license notices.

For the reviewed Next.js lock (`ai` 7.0.164, `@ai-sdk/openai` 4.0.110, `@openai/agents` 0.21.0, `@tryvira/sdk` 0.1.43, Next.js 16.4.5, React and React DOM 19.3.1, `@types/node` 26.6.6, `@types/react` 19.3.0, TypeScript 7.0.2, and Zod 4.6.7), `npm sbom --sbom-format cyclonedx` reported Apache-2.0 for `ai`, `@ai-sdk/openai`, and TypeScript, and MIT for the other listed direct dependencies. This snapshot does not cover transitive packages, Python wheels, or MCP artifacts; regenerate each target's SBOM from its exact lock before redistribution.
