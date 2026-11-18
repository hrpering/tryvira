# Third-party notices and license review

This directory is authored by Vira and is covered by the repository's proprietary `LICENSE`. It does not relicense any dependency.

The examples reference or install third-party software including Next.js, React, OpenAI Agents SDK, Vercel AI SDK and its OpenAI provider, LangGraph, LangChain OpenAI, FastAPI, Uvicorn, HTTPX, the Model Context Protocol SDK, and the separately published Vira JavaScript/Python SDK packages. Each dependency remains under the license distributed with the exact resolved artifact. Before redistribution, generate an SBOM from the committed lockfiles, collect each resolved package's license and required notice text, and have counsel or the organization's license-review process review any non-standard, source-available, or usage-restricted terms. Do not infer licensing from a package name or this summary.

No third-party source code is copied into this directory. The generated dependency lockfiles identify versions but do not replace required license notices.

The current Next.js example declares `@openai/agents`, `@tryvira/sdk`, Next.js, React and React DOM as runtime dependencies, alongside Node/React/TypeScript type packages in development. It uses the committed npm integrity lockfile for exact resolved versions. The FastAPI and LangGraph samples use their own hash-locked Python dependencies. The MCP client has a separately pinned protocol client/server dependency set.

Package-specific licenses and notices must be checked against the **currently resolved artifacts** before redistribution; this document is not a complete SBOM or legal review. Former framework dependencies must not be presented as still installed merely because they appeared in an older lockfile.
