import assert from "node:assert/strict";
import test from "node:test";
import {validateRunIdentity,identifyMissingVerifiedOutput,requireExactStatus} from "./skill-e2e-assertions.mjs";
const scope={organizationId:"org",projectId:"proj",environmentId:"sandbox"};
const row={taskRunId:"run-a",expectedMode:"SINGLE",expectedInputDigest:"input-digest"};
const run={...scope,taskRunId:"run-a",mode:"SINGLE",status:"COMPLETED",
  inputDigest:"input-digest",planDigest:"plan-digest",authorityDigest:"authority-digest",selectedTaskKeys:["support.summary"]};
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
