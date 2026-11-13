import {createHash} from "node:crypto";
/** Structural, fail-closed acceptance assertions. NOT a verifier implementation. */
export function requireExactStatus(actual, expected, label) {
  if (actual !== expected) throw new Error(label+":STATUS_EXPECTED_"+expected+"_GOT_"+String(actual));
}
export function validateRunIdentity({run,caseInput,scope}) {
  if(!run || typeof run!=="object")throw new Error("TASKRUN_READBACK_MISSING");
  for(const key of ["organizationId","projectId","environmentId"]){
    if(run[key]!==scope[key])throw new Error("TASKRUN_SCOPE_MISMATCH:"+key);
  }
  if(run.taskRunId!==caseInput.taskRunId)throw new Error("TASKRUN_ID_MISMATCH");
  if(run.mode!==caseInput.expectedMode)throw new Error("TASKRUN_SELECTED_MODE_MISMATCH");
  if(run.inputDigest!==caseInput.expectedInputDigest)throw new Error("TASKRUN_INPUT_DIGEST_MISMATCH");
  if(typeof run.planDigest!=="string" || !/^[a-f0-9]{64}$/.test(run.planDigest))throw new Error("TASKRUN_PLAN_DIGEST_MISSING");
  if(typeof run.authorityDigest!=="string"|| !/^[a-f0-9]{64}$/.test(run.authorityDigest))throw new Error("TASKRUN_RELEASE_AUTHORITY_MISSING");
  if(!Array.isArray(run.selectedTaskKeys)||!run.selectedTaskKeys.length)throw new Error("TASKRUN_CHILD_KEYS_MISSING");
  if(run.status!=="COMPLETED")throw new Error("TASKRUN_NOT_COMPLETED:"+String(run.status));
  return true;
}
export function identifyMissingVerifiedOutput(readback, caseInput) {
  // Future verified-output READBACK CONTRACT. This is a strict validator,
  // not an API implementation, receipt signer, or provider invocation.
  // The object must come from the authenticated server GET TaskRun response.
  const run=readback?.taskRun??readback;
  const v=readback?.verifiedResponse;
  const missing=[];
  if(!v || typeof v!=="object") return [
    "provider_output","post_model_verifier_result","output_digest_bound_receipt"
  ];
  const sha256=(text)=>createHash("sha256").update(text,"utf8").digest("hex");
  const validDigest=(x)=>typeof x==="string" && /^[a-f0-9]{64}$/.test(x);
  if(v.taskRunId!==run?.taskRunId || v.taskRunId!==caseInput.taskRunId)missing.push("taskrun_identity");
  for(const field of ["organizationId","projectId","environmentId"]){
    if(v[field]!==run?.[field])missing.push("verified_scope_"+field);
  }
  if(typeof v.providerRequestId!=="string"||!v.providerRequestId.trim())missing.push("provider_request_id");
  if(typeof v.output!=="string"||!v.output.trim())missing.push("provider_output");
  if(!validDigest(v.outputDigest) || (typeof v.output==="string" && v.outputDigest!==sha256(v.output)))
    missing.push("provider_output_digest");
  if(!v.verification || v.verification.verificationStatus!=="passed" ||
     v.verification.boundary!=="post_model" ||
     !Array.isArray(v.verification.executedModuleStableKeys) ||
     !v.verification.executedModuleStableKeys.length ||
     !Array.isArray(v.verification.failedChecks) ||
     v.verification.failedChecks.length)
    missing.push("post_model_verifier_result");
  if(v.verification?.outputDigest!==v.outputDigest ||
     !validDigest(v.verification?.receiptDigest))
    missing.push("post_model_receipt_binding");
  if(!v.receipt || v.receipt.taskRunId!==run.taskRunId ||
     v.receipt.planDigest!==run.planDigest ||
     v.receipt.authorityDigest!==run.authorityDigest ||
     v.receipt.outputDigest!==v.outputDigest ||
     v.receipt.verificationReceiptDigest!==v.verification?.receiptDigest ||
     !validDigest(v.receipt.receiptDigest))
    missing.push("output_digest_bound_receipt");
  if(caseInput.expectedArtifactDigest && v.receipt?.artifactDigest!==caseInput.expectedArtifactDigest)
    missing.push("released_artifact_digest");
  return [...new Set(missing)];
}
