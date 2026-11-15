#!/usr/bin/env node
/**
 * Vira Operator: a client-side SDK bridge for Agent Skills.
 * No Vira backend logic, unauthorized host actions, or undocumented HTTP routes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

export const GROUPS = Object.freeze({
  connections: "connectSystem listAISystems deleteAISystem deleteAISystemCascade getAISystem connectAdapter connectOnce connectionHealth getConnection listSystemConnections inventory testConnection".split(" "),
  observation: "observe trace searchRuntimeTraces outcome feedback observeBatch observeSdk listConversationArchive importConversationArchive revokeConversation".split(" "),
  discovery: "discover resolveSemantic resolveSemanticRuntime listDiscoveryCandidates createSignalDiscoveryProposal reviewSignalDiscoveryProposal materializeSignalDiscovery createSignalMapping getSignalMapping reviewSignalMapping".split(" "),
  authoring: "listBehaviorStrategies deleteBehaviorStrategy getBehaviorStrategy createBehaviorStrategy listSemanticTasks deleteSemanticTask createSemanticTask listBehaviorPoints deleteBehaviorPoint createBehaviorPoint listBehaviorPrograms getBehaviorProgram deleteBehaviorProgram deleteBehaviorProgramCascade createBehaviorProgram createBehaviorStrategyVariant validateBehaviorStrategy activateBehaviorStrategy simulateBehaviorStrategy".split(" "),
  packs: "listPacks deletePack importPack installPack diagnosePack evaluatePack approvePack releasePack previewPackUpgrade createPackRevision getPackRevision getPackRevisionDiff transitionPackRevision materializePackRevision".split(" "),
  execution: "executeRuntime resolveRuntime resolveBoundary authorizeHostAction createHostActionApproval compileBehaviorCapsule serveBehaviorProjection attestCapabilities resolveCapabilities recordCapabilityTrace resolveModelServing recordModelServingTrace startStrategyExecution getStrategyExecution getStrategyExecutionTrace continueStrategyExecution cancelStrategyExecution resolveTaskRun startTaskRun startTaskRunFromPrompt getTaskRun listTaskRunEvents continueTaskRun cancelTaskRun retryTaskRun listCapabilities".split(" "),
  teach: "submitTeachEvidence createTeachAnalysis getTeachAnalysis createCrossConversationTeachAnalysis createTeachProposal getTeachRunBehaviorSet listTeachRuns getTeachRunRecommendation acceptTeachRecommendation rejectTeachRecommendation editTeachRecommendation transitionTeachProposal requestTeachProposalChanges".split(" "),
  evaluation: "startEvaluation startComparativeEvaluation evaluateQuality getEvaluation getEvaluationComparison reviewComparativeFinding createEvaluationPlan getEvaluationPlan sealEvaluationPlan createImprovementProposal getImprovementProposal reviewImprovementProposal editImprovementProposalAsNew createBehaviorRevisionCandidate evaluateBehaviorRevisionCandidate transitionBehaviorRevisionCandidate createRelease createManualRelease releaseProgramManually recordDeploymentComparison recordDeploymentHealth".split(" "),
});

export const READ_METHODS = new Set(
  "listAISystems getAISystem connectionHealth getConnection listSystemConnections inventory searchRuntimeTraces listConversationArchive listDiscoveryCandidates getSignalMapping listBehaviorStrategies getBehaviorStrategy listSemanticTasks listBehaviorPoints listBehaviorPrograms getBehaviorProgram listPacks getPackRevision getPackRevisionDiff getStrategyExecution getStrategyExecutionTrace getTaskRun listTaskRunEvents listCapabilities getTeachAnalysis getTeachRunBehaviorSet listTeachRuns getTeachRunRecommendation getEvaluation getEvaluationComparison getEvaluationPlan getImprovementProposal".split(" ")
);
// Proposal-only routing does not execute model/tool/host actions, but still needs valid scope.
export const PROPOSAL_METHODS = new Set("resolveTaskRun".split(" "));
export const HIGH_IMPACT = new Set(
  "deleteAISystem deleteAISystemCascade revokeConversation deleteBehaviorStrategy deleteSemanticTask deleteBehaviorPoint deleteBehaviorProgram deleteBehaviorProgramCascade deletePack approvePack releasePack createRelease createManualRelease releaseProgramManually activateBehaviorStrategy cancelStrategyExecution cancelTaskRun createHostActionApproval authorizeHostAction transitionTeachProposal transitionPackRevision transitionBehaviorRevisionCandidate reviewImprovementProposal materializePackRevision".split(" ")
);
const ALL = new Map();
for (const [group, methods] of Object.entries(GROUPS)) {
  for (const method of methods) {
    if (ALL.has(method)) throw new Error("DUPLICATE_OPERATION_" + method);
    ALL.set(method, { group, method, level: READ_METHODS.has(method) ? "read" : PROPOSAL_METHODS.has(method) ? "proposal" : HIGH_IMPACT.has(method) ? "high-impact" : "mutation" });
  }
}
export const OPERATIONS = Object.freeze(Object.fromEntries(ALL.entries()));
export const operation = name => Object.prototype.hasOwnProperty.call(OPERATIONS, name) ? OPERATIONS[name] : null;

export function requireExecutionAuthority({ method, confirm = false, acknowledge = "", env = {} }) {
  const op = operation(method);
  if (!op) throw new Error("OPERATION_NOT_ALLOWLISTED");
  if (op.level === "read" || op.level === "proposal") return op;
  if (!confirm || env.VIRA_ALLOW_MUTATIONS !== "true") throw new Error("MUTATION_REQUIRES_CONFIRM_AND_VIRA_ALLOW_MUTATIONS_TRUE");
  if (op.level === "high-impact" && acknowledge !== method) throw new Error("HIGH_IMPACT_REQUIRES_EXACT_METHOD_ACK");
  if (![env.VIRA_ORGANIZATION_ID,env.VIRA_PROJECT_ID,env.VIRA_ENVIRONMENT_ID].every(x => typeof x === "string" && x.trim()))
    throw new Error("MUTATION_REQUIRES_EXPLICIT_SCOPE_ENV");
  return op;
}
export function validateUrl(raw) {
  if (!raw) throw new Error("VIRA_API_URL_REQUIRED");
  const url = new URL(raw);
  const localhost = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && localhost)) throw new Error("HTTPS_REQUIRED_EXCEPT_LOOPBACK");
  if (url.username || url.password || url.hash || url.search || /\/v1\/?$/i.test(url.pathname)) throw new Error("VIRA_API_URL_MUST_BE_CLEAN_DEPLOYMENT_ROOT");
  return url.toString().replace(/\/$/, "");
}
export function parseArguments(text) {
  if (!text.trim()) throw new Error("ARGS_JSON_EMPTY");
  const parsed = JSON.parse(text);
  // Explicit positional args map directly onto the version-matched SDK signature.
  if (!parsed || !Array.isArray(parsed.args) || parsed.args.length > 12) throw new Error("ARGS_FILE_REQUIRES_ARGS_ARRAY");
  return parsed.args;
}
export async function invokeClient(client, method, args, options) {
  const op = requireExecutionAuthority({ method, ...options });
  if (typeof client?.[method] !== "function") throw new Error("METHOD_UNAVAILABLE_IN_INSTALLED_SDK");
  // Own allowlist above prevents property-name injection and arbitrary client internals.
  const result = await client[method](...args);
  return { operation: method, group: op.group, level: op.level, response: result };
}
export function safeSummary(value, depth = 0) {
  if (depth > 8) return "[TRUNCATED_DEPTH]";
  if (Array.isArray(value)) return value.slice(0, 60).map(x => safeSummary(x, depth + 1));
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [k,v] of Object.entries(value).slice(0, 150)) {
    if (/api.?key|secret|password|authorization|access.?token|refresh.?token|credential|private.?key/i.test(k)) out[k] = "[REDACTED]";
    else if (/^prompt$|^input$|^output$|^message$|^content$|^text$|^payload$|^messages$|^rawResponse$/i.test(k)) out[k] = "[CONTENT_HIDDEN]";
    else out[k] = safeSummary(v, depth + 1);
  }
  return out;
}
async function loadClient() {
  const projectRequire = createRequire(join(process.cwd(), "package.json"));
  let file;
  try { file = projectRequire.resolve("@tryvira/sdk"); }
  catch { throw new Error("SDK_NOT_INSTALLED_IN_WORKING_PROJECT: npm install @tryvira/sdk"); }
  const sdk = await import(pathToFileURL(file).href);
  if (typeof sdk.ViraClient !== "function") throw new Error("SDK_MISSING_VIRA_CLIENT_EXPORT");
  const baseUrl = validateUrl(process.env.VIRA_API_URL);
  if (!process.env.VIRA_API_KEY) throw new Error("VIRA_API_KEY_REQUIRED");
  return new sdk.ViraClient({ baseUrl, apiKey: process.env.VIRA_API_KEY, failureMode: "throw" });
}
const usage = () => [
  "Vira Operator (SDK-only; Studio is not required)",
  "  node operate.mjs catalog [group]",
  "  node operate.mjs doctor",
  "  node operate.mjs plan <method> --args <json-file>",
  "  node operate.mjs run <method> --args <json-file> [--confirm] [--ack <method>]",
  "  JSON format: {\"args\":[...]} matching the installed SDK signature.",
  "  Read/proposal operations execute directly. Mutations require VIRA_ALLOW_MUTATIONS=true and --confirm.",
  "  High-impact operations additionally require --ack <exactMethod>. Never infer human authorization from flags.",
].join("\n");
async function cli(argv=process.argv.slice(2)) {
  const [command, value, ...rest] = argv;
  if (!command || command === "help" || argv.includes("--help")) { console.log(usage()); return; }
  if (command === "catalog") {
    const groups = value ? { [value]: GROUPS[value] } : GROUPS;
    if (value && !GROUPS[value]) throw new Error("UNKNOWN_GROUP");
    console.log(JSON.stringify(Object.fromEntries(Object.entries(groups).map(([group,methods])=>[group,methods.map(method=>({method,level:OPERATIONS[method].level}))])),null,2));
    return;
  }
  if (command === "doctor") {
    const result = { sdkInstalled: false, apiUrlConfigured: Boolean(process.env.VIRA_API_URL), keyConfigured: Boolean(process.env.VIRA_API_KEY), scopeConfigured: ["VIRA_ORGANIZATION_ID","VIRA_PROJECT_ID","VIRA_ENVIRONMENT_ID"].every(k=>Boolean(process.env[k])), installedPackage: null };
    try { const req=createRequire(join(process.cwd(),"package.json")); result.installedPackage=req.resolve("@tryvira/sdk"); result.sdkInstalled=true; }
    catch { /* missing SDK is a doctor finding */ }
    if (process.env.VIRA_API_URL) { try { validateUrl(process.env.VIRA_API_URL); } catch(error) { result.urlError = error.message; } }
    console.log(JSON.stringify(result,null,2));
    return;
  }
  if (command !== "plan" && command !== "run") throw new Error("UNKNOWN_COMMAND");
  if (!operation(value)) throw new Error("OPERATION_NOT_ALLOWLISTED");
  const i=rest.indexOf("--args");
  if (i<0 || !rest[i+1] || rest[i+1].startsWith("--")) throw new Error("ARGS_FILE_REQUIRED");
  const filename=rest[i+1];
  const raw=filename==="-"?readFileSync(0,"utf8"):readFileSync(resolve(filename),"utf8");
  if (Buffer.byteLength(raw)>5_000_000) throw new Error("ARGS_FILE_TOO_LARGE");
  const args=parseArguments(raw);
  const op=operation(value);
  if (command==="plan") {
    console.log(JSON.stringify({operation:value,group:op.group,level:op.level,argCount:args.length,requiresConfirm:!["read","proposal"].includes(op.level),requiresAck:op.level==="high-impact",sdkOperation:true,liveCall:false},null,2));
    return;
  }
  const a=rest.indexOf("--ack");const acknowledge=a>=0?rest[a+1]:"";
  const confirm=rest.includes("--confirm");
  // No SDK load or live network access until local authorization checks pass.
  requireExecutionAuthority({method:value,confirm,acknowledge,env:process.env});
  const client=await loadClient();
  const result=await invokeClient(client,value,args,{confirm,acknowledge,env:process.env});
  console.log(JSON.stringify(safeSummary(result),null,2));
}
if (process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  cli().catch(e=>{console.error("VIRA_OPERATOR_ERROR:",String(e?.message??e));process.exitCode=1;});
}
