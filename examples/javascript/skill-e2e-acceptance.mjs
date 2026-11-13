/**
 * Read-only, real-API acceptance runner for a customer's scoped Vira tenant.
 *
 * This script never fabricates TaskRuns, Packs, Signals, evaluations, or receipts.
 * It does not auto-release or auto-approve. Requires installed @tryvira/sdk,
 * VIRA_API_URL and VIRA_API_KEY in the caller's protected server environment.
 *
 * Usage: node skill-e2e-acceptance.mjs --manifest /path/to/real-ids.json
 *        node skill-e2e-acceptance.mjs --help
 *
 * Real acceptance intentionally fails when the public SDK cannot read back
 * a provider-generated answer plus matching post-model verification evidence.
 */
import {readFile} from "node:fs/promises";
import {ViraClient} from "@tryvira/sdk";
import {validateRunIdentity, identifyMissingVerifiedOutput, requireExactStatus} from "./skill-e2e-assertions.mjs";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(name + " required in protected environment");
  return value;
}
function expectHttp(ok, name) {
  if (!ok || ok.status !== 200) throw new Error(name + ": HTTP_READBACK_NOT_CONFIRMED");
  return ok.body ?? {};
}
function label(name, value) {
  process.stdout.write(JSON.stringify({checkpoint:name,status:"READBACK_CONFIRMED",value})+"\n");
}
if (process.argv.includes("--help")) {
  console.log("Usage: node skill-e2e-acceptance.mjs --manifest /path/to/customer-ids.json");
  console.log("Requires real VIRA_API_URL and VIRA_API_KEY. Read-only.");
  console.log("Fails closed when final provider+verification readback is unavailable.");
  process.exit(0);
}
const index = process.argv.indexOf("--manifest");
if (index < 0 || !process.argv[index+1]) throw new Error("MANIFEST_REQUIRED");
const manifest = JSON.parse(await readFile(process.argv[index+1], "utf8"));
for(const key of ["organizationId","projectId","environmentId","connectionId","aiSystemId","packId","evaluationId","signalMappingId","teachAnalysisId"]) {
  if (typeof manifest[key] !== "string" || !manifest[key].trim()) throw new Error("MANIFEST_FIELD_REQUIRED:"+key);
}
if (!Array.isArray(manifest.taskRuns) || manifest.taskRuns.length !== 4 || new Set(manifest.taskRuns.map(x=>x.expectedMode)).size !== 4)
  throw new Error("FOUR_DISTINCT_TASKRUN_MODES_REQUIRED");
const modes=new Set(["SINGLE","STRATEGY","COMPOUND","HYBRID"]);
if (manifest.taskRuns.some(x=>!modes.has(x.expectedMode)||!x.taskRunId||!x.expectedInputDigest))
  throw new Error("TASKRUN_ID_MODE_INPUT_DIGEST_REQUIRED");
const url = required("VIRA_API_URL").replace(/\/$/, "");
if (url.endsWith("/v1") || url.includes("example.invalid")) throw new Error("CUSTOMER_API_BASE_URL_REQUIRED");
const client = new ViraClient({baseUrl:url, apiKey:required("VIRA_API_KEY"), failureMode:"throw"});
const connection=expectHttp(await client.getConnection(manifest.connectionId),"connection");
const connectionValue=connection.connection??connection;
if(String(connectionValue.id??"")!==manifest.connectionId)throw new Error("CONNECTION_ID_MISMATCH");
label("connection", {id:manifest.connectionId});
const mapping=expectHttp(await client.getSignalMapping(manifest.signalMappingId),"signal_mapping");
const mappingValue=mapping.mapping??mapping.signalMapping??mapping;
if(String(mappingValue.id??"")!==manifest.signalMappingId)throw new Error("SIGNAL_MAPPING_ID_MISMATCH");
if(!["APPROVED","ACTIVE"].includes(String(mappingValue.status??mappingValue.reviewState??"")))
  throw new Error("SIGNAL_MAPPING_NOT_APPROVED");
label("signal_mapping",{id:manifest.signalMappingId,status:mappingValue.status??mappingValue.reviewState});
const packs=expectHttp(await client.listPacks(),"packs");
const pack=Array.isArray(packs.packs)?packs.packs.find(x=>String(x.id)===manifest.packId):null;
if(!pack||pack.status!=="RELEASED"||typeof pack.digest!=="string"||!pack.digest)
  throw new Error("PACK_NOT_RELEASED_WITH_DIGEST");
label("pack",{id:manifest.packId,status:pack.status,digest:pack.digest});
const evaluation=expectHttp(await client.getEvaluation(manifest.evaluationId),"evaluation");
const evalValue=evaluation.evaluation??evaluation;
if(String(evalValue.id??"")!==manifest.evaluationId) throw new Error("EVALUATION_ID_MISMATCH");
if (typeof manifest.expectedEvaluationStatus!=="string" || evalValue.status!==manifest.expectedEvaluationStatus)
  throw new Error("EVALUATION_STATUS_UNCONFIRMED");
label("evaluation",{id:manifest.evaluationId,status:evalValue.status});
const teach=expectHttp(await client.getTeachAnalysis(manifest.teachAnalysisId),"teach_analysis");
if(String(teach.analysisId??teach.analysis?.analysisId??"")!==manifest.teachAnalysisId)
  throw new Error("TEACH_ANALYSIS_ID_MISMATCH");
if (typeof manifest.expectedTeachStatus!=="string" || (teach.status??teach.analysis?.status)!==manifest.expectedTeachStatus)
  throw new Error("TEACH_ANALYSIS_NOT_COMPLETE");
label("teach_analysis",{id:manifest.teachAnalysisId,status:teach.status??teach.analysis?.status});
for(const caseInput of manifest.taskRuns) {
  const response=expectHttp(await client.getTaskRun(caseInput.taskRunId),"TaskRun "+caseInput.expectedMode);
  const run=response.taskRun??response;
  validateRunIdentity({run, caseInput, scope:manifest});
  const events=expectHttp(await client.listTaskRunEvents(caseInput.taskRunId),"TaskRun events "+caseInput.expectedMode);
  const recorded=Array.isArray(events.events)?events.events:null;
  if(!recorded||!recorded.length)throw new Error("TASKRUN_EVENTS_MISSING:"+caseInput.expectedMode);
  requireExactStatus(run.status,"COMPLETED","TaskRun "+caseInput.expectedMode);
  label("taskrun",{id:run.taskRunId,mode:run.mode,status:run.status,eventCount:recorded.length});
  // No documented public SDK method presently reads the exact final provider
  // output + post_model verifier PASS + matching digest/receipt for this run.
  // Deliberate hard failure: cannot turn child COMPLETED into verified delivery.
  const missing=identifyMissingVerifiedOutput(response, caseInput);
  if(missing.length)throw new Error("FINAL_VERIFIED_RESPONSE_NOT_PROVEN:"+caseInput.expectedMode+":"+missing.join(","));
}
console.log("LIVE_CANONICAL_ACCEPTANCE_PASS (only when a real, documented verified-output handoff exists)");
