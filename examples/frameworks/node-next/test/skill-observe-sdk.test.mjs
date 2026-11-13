import test from "node:test";
import assert from "node:assert/strict";
import {buildObservationRequest, ViraClient} from "@tryvira/sdk";
import {makeObservationEvent} from "../../../../skills/vira-observe/examples/event-contract.mjs";

const scope = {
  organizationId: "scope-a", projectId: "project-a", environmentId: "sandbox",
  eventId: "event-a", eventType:"model.response", aiSystemId:"system-a", connectionId:"conn-a",
  payload:{status:"completed",synthetic:true}
};

test("published JS SDK accepts and transmits the complete scoped Observe event",async()=>{
  const event = makeObservationEvent(scope);
  const request = buildObservationRequest(event);
  assert.equal(request.method,"POST");
  assert.equal(request.path,"/v1/observations");
  assert.deepEqual(request.body,event);
  let received = null;
  const sdk = new ViraClient({
    baseUrl:"https://api.example.invalid", apiKey:"offline-only",
    fetcher:async(url,init)=>{
      received = {url:String(url),headers:init.headers,body:JSON.parse(init.body)};
      return new Response(JSON.stringify({accepted:true}),{
        status:202,headers:{"content-type":"application/json","x-request-id":"offline-sdk-test"}
      });
    },
    retries:0
  });
  const result = await sdk.observe(event,{idempotencyKey:event.eventId});
  assert.equal(result.status,202);
  assert.equal(received.url,"https://api.example.invalid/v1/observations");
  assert.equal(received.body.organizationId,scope.organizationId);
  assert.equal(received.body.projectId,scope.projectId);
  assert.equal(received.body.environmentId,scope.environmentId);
  assert.equal(received.headers["idempotency-key"],scope.eventId);
});
test("actual published JS SDK rejects missing scope before transport",()=>{
  for(const key of ["organizationId","projectId","environmentId"]){
    const event = {...scope};
    delete event[key];
    assert.throws(()=>buildObservationRequest(event),/SDK_OBSERVATION_SCOPE_REQUIRED/);
  }
});
