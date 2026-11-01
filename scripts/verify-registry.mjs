import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const expected = "0.1.14";

async function readJson(url, label) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "tryvira-public-docs-registry-check"
    },
  });
  if (!response.ok) throw new Error(`${label}: registry returned HTTP ${response.status}`);
  return response.json();
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: "pipe",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout || `exit ${result.status}`}`);
  }
  return result.stdout.trim();
}

const sdk = await readJson("https://registry.npmjs.org/%40tryvira%2Fsdk", "@tryvira/sdk");
const mcp = await readJson("https://registry.npmjs.org/%40tryvira%2Fmcp", "@tryvira/mcp");
const python = await readJson("https://pypi.org/pypi/tryvira-sdk/json", "tryvira-sdk");

const failures = [];

for (const [name, metadata] of [["@tryvira/sdk", sdk], ["@tryvira/mcp", mcp]]) {
  if (!metadata.versions?.[expected]) failures.push(`${name}@${expected} is not published`);
  if (metadata["dist-tags"]?.latest !== expected) {
    failures.push(`${name} latest dist-tag is ${metadata["dist-tags"]?.latest ?? "missing"}, expected ${expected}`);
  }
}

if (!python.releases?.[expected]?.length) failures.push(`tryvira-sdk==${expected} is not published`);
if (python.info?.version !== expected) failures.push(`tryvira-sdk latest is ${python.info?.version ?? "missing"}, expected ${expected}`);

if (failures.length) {
  console.error("REGISTRY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const consumer = await mkdtemp(join(tmpdir(), "tryvira-public-consumer-"));
try {
  await writeFile(join(consumer, "package.json"), JSON.stringify({
    name: "tryvira-public-docs-contract-consumer",
    private: true,
    type: "module"
  }, null, 2));

  run("npm", [
    "install", "--ignore-scripts", "--no-audit", "--no-fund",
    `@tryvira/sdk@${expected}`,
    `@tryvira/mcp@${expected}`
  ], { cwd: consumer });

  const jsMethods = [
    "connectOnce", "listCapabilities", "observe",
    "createSemanticTask", "createBehaviorPoint", "createBehaviorProgram",
    "createBehaviorStrategy", "validateBehaviorStrategy", "simulateBehaviorStrategy", "activateBehaviorStrategy",
    "resolveSemantic", "resolveRuntime", "executeRuntime",
    "startEvaluation", "createRelease",
    "importPack", "installPack", "evaluatePack", "approvePack", "releasePack", "previewPackUpgrade",
    "startStrategyExecution", "continueStrategyExecution"
  ];
  const jsProbe = `
    import { ViraClient } from '@tryvira/sdk';
    const client = new ViraClient({baseUrl:'https://api.example.invalid'});
    const required = ${JSON.stringify(jsMethods)};
    const missing = required.filter(name => typeof client[name] !== 'function');
    if (missing.length) throw new Error('SDK_PUBLISHED_SURFACE_MISSING:' + missing.join(','));
    console.log('SDK_PUBLISHED_SURFACE_PASS');
  `;
  run(process.execPath, ["--input-type=module", "-e", jsProbe], { cwd: consumer });

  const mcpPackage = JSON.parse(await readFile(join(consumer, "node_modules", "@tryvira", "mcp", "package.json"), "utf8"));
  if (mcpPackage.version !== expected) throw new Error(`MCP_INSTALLED_VERSION_MISMATCH:${mcpPackage.version}`);
  if (!mcpPackage.bin?.["vira-mcp"]) throw new Error("MCP_PUBLISHED_BIN_MISSING");

  const pythonTarget = join(consumer, "python");
  run("python3", [
    "-m", "pip", "install", "--disable-pip-version-check", "--no-input",
    "--target", pythonTarget,
    `tryvira-sdk==${expected}`
  ]);

  const pythonMethods = [
    "connect_once", "list_capabilities", "observe",
    "create_semantic_task", "create_behavior_point", "create_behavior_program",
    "create_behavior_strategy", "validate_behavior_strategy", "simulate_behavior_strategy", "activate_behavior_strategy",
    "resolve_semantic", "resolve_runtime", "execute_runtime",
    "start_evaluation", "create_release",
    "import_pack", "install_pack", "evaluate_pack", "approve_pack", "release_pack", "preview_pack_upgrade",
    "start_strategy_execution", "continue_strategy_execution"
  ];
  const pythonProbe = [
    "from vira import ViraClient",
    "client = ViraClient('https://api.example.invalid')",
    `required = ${JSON.stringify(pythonMethods)}`,
    "missing = [name for name in required if not callable(getattr(client, name, None))]",
    "assert not missing, 'PYTHON_PUBLISHED_SURFACE_MISSING:' + ','.join(missing)",
    "print('PYTHON_PUBLISHED_SURFACE_PASS')"
  ].join("\n");
  run("python3", ["-c", pythonProbe], {
    env: { ...process.env, PYTHONPATH: pythonTarget }
  });

  console.log("REGISTRY_VERIFY_PASS");
  console.log(`Installed and verified @tryvira/sdk@${expected}, @tryvira/mcp@${expected}, and tryvira-sdk==${expected} from their public registries.`);
} finally {
  await rm(consumer, { recursive: true, force: true });
}
