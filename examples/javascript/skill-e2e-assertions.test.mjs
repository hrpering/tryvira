import assert from "node:assert/strict";
import test from "node:test";
import {validateRunIdentity,identifyMissingVerifiedOutput,requireExactStatus} from "./skill-e2e-assertions.mjs";
const scope={organizationId:"org",projectId:"proj",environmentId:"sandbox"};
const row={taskRunId:"run-a",expectedMode:"SINGLE",expectedInputDigest:"a".repeat(64)};
const run={...scope,taskRunId:"run-a",mode:"SINGLE",status:"COMPLETED",
  inputDigest:"a".repeat(64),planDigest:"b".repeat(64),authorityDigest:"c".repeat(64),selectedTaskKeys:["support.summary"]};
test("acceptance guard verifies returned scope, mode, input and authority",()=>{
  assert.equal(validateRunIdentity({run,caseInput:row,scope}),true);
});
test("wrong tenant/connection and wrong mode do not pass",()=>{
  for(const mismatch of [{projectId:"other"},{mode:"HYBRID"},{authorityDigest:""},{inputDigest:"different"},{status:"PARTIAL"}]){
    assert.throws(()=>validateRunIdentity({run:{...run,...mismatch},caseInput:row,scope}));
  }
});
test("no provider response / verifier binding means not verified",()=>{
  assert.ok(identifyMissingVerifiedOutput({taskRun:run},row).length);
});
test("TaskRun COMPLETED is distinct from verified chatbot answer",()=>{
  requireExactStatus("COMPLETED","COMPLETED","TaskRun");
  assert.throws(()=>requireExactStatus("WAITING_HOST","COMPLETED","TaskRun"));
  assert.throws(()=>requireExactStatus("PARTIAL","COMPLETED","TaskRun"));
});

import {createHash} from "node:crypto";

test("proposed future verifiedResponse readback passes only complete structurally correlated proof", () => {
  // Structural contract fixture ONLY: not authenticated server data, signed receipt or provider invocation.
  const output="synthetic output fixture";
  const outputDigest=createHash("sha256").update(output,"utf8").digest("hex");
  const future={
    taskRun:run,
    verifiedResponse:{
      ...scope,taskRunId:run.taskRunId,
      providerRequestId:"fixture-provider-id",output,outputDigest,
      verification:{
        boundary:"post_model",verificationStatus:"passed",
        executedModuleStableKeys:["fixture.check"],failedChecks:[],
        outputDigest,receiptDigest:"e".repeat(64)
      },
      receipt:{
        taskRunId:run.taskRunId,planDigest:run.planDigest,
        authorityDigest:run.authorityDigest,
        outputDigest,verificationReceiptDigest:"e".repeat(64),
        artifactDigest:"f".repeat(64),receiptDigest:"d".repeat(64)
      }
    }
  };
  assert.deepEqual(identifyMissingVerifiedOutput(future,{...row,expectedArtifactDigest:"f".repeat(64)}),[]);
  const tampered={...future,verifiedResponse:{...future.verifiedResponse,output:"tampered fixture"}};
  assert.ok(identifyMissingVerifiedOutput(tampered,row).includes("provider_output_digest"));
  const changedScope={...future,verifiedResponse:{...future.verifiedResponse,projectId:"another-project"}};
  assert.ok(identifyMissingVerifiedOutput(changedScope,row).includes("verified_scope_projectId"));
  const failedCheck={...future,verifiedResponse:{...future.verifiedResponse,verification:{...future.verifiedResponse.verification,verificationStatus:"failed",failedChecks:["fixture.check"]}}};
  assert.ok(identifyMissingVerifiedOutput(failedCheck,row).includes("post_model_verifier_result"));
  const changedReceipt={...future,verifiedResponse:{...future.verifiedResponse,receipt:{...future.verifiedResponse.receipt,verificationReceiptDigest:"0".repeat(64)}}};
  assert.ok(identifyMissingVerifiedOutput(changedReceipt,row).includes("output_digest_bound_receipt"));
});
