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
  if(typeof run.planDigest!=="string" || !run.planDigest)throw new Error("TASKRUN_PLAN_DIGEST_MISSING");
  if(typeof run.authorityDigest!=="string"||!run.authorityDigest)throw new Error("TASKRUN_RELEASE_AUTHORITY_MISSING");
  if(!Array.isArray(run.selectedTaskKeys)||!run.selectedTaskKeys.length)throw new Error("TASKRUN_CHILD_KEYS_MISSING");
  if(run.status!=="COMPLETED")throw new Error("TASKRUN_NOT_COMPLETED:"+String(run.status));
  return true;
}
export function identifyMissingVerifiedOutput(/* taskRunReadback, caseInput */) {
  // This intentionally remains unavailable until the product publishes an
  // authenticated output+verifier+receipt readback. Do not trust arbitrary
  // "verified": true fields injected into task readback by a client.
  return ["provider_output","post_model_verifier_result","output_digest_bound_receipt"];
}
