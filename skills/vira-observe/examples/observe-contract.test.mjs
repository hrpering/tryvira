import test from "node:test";
import assert from "node:assert/strict";
import {makeObservationEvent} from "./event-contract.mjs";
const envelope = {
  organizationId:"org-a", projectId:"project-a", environmentId:"sandbox",
  eventId:"event-a", eventType:"model.response",
  aiSystemId:"system-a", connectionId:"connection-a",
  payload:{status:"completed"}
};
test("Builds the complete, scoped SDK observation envelope", () => {
  const event=makeObservationEvent(envelope);
  for(const key of ["organizationId","projectId","environmentId","eventId","eventType","aiSystemId","connectionId"])
    assert.equal(event[key], envelope[key]);
  assert.deepEqual(event.payload,{status:"completed"});
});
test("Missing scope/connection fails before calling the API", () => {
  for(const key of ["organizationId","projectId","environmentId","eventId","eventType","aiSystemId","connectionId"]) {
    assert.throws(() => makeObservationEvent({...envelope,[key]:""}), new RegExp("OBSERVE_REQUIRED_"+key));
  }
});
test("Rejects invalid observation payload", () => {
  assert.throws(() => makeObservationEvent({...envelope,payload:"secret text"}),/OBSERVE_PAYLOAD_OBJECT_REQUIRED/);
});
