import test from "node:test";
import assert from "node:assert/strict";
import { GROUPS, OPERATIONS, operation, requireExecutionAuthority, validateUrl, parseArguments, invokeClient, safeSummary } from "../skills/vira-operator/scripts/operate.mjs";

test("allowlist is unique and has diverse SDK coverage", () => {
  const all = Object.values(GROUPS).flat();
  assert.ok(all.length > 110, "expected over 110 public SDK operations");
  assert.equal(new Set(all).size, all.length);
  assert.equal(Object.keys(OPERATIONS).length, all.length);
  assert.equal(operation("constructor"), null);
  assert.equal(operation("__proto__"), null);
  assert.equal(operation("request"), null);
});
test("read-only status is callable without mutation approval", async () => {
  let called = false;
  const result = await invokeClient({getTaskRun: async id => {called=true;return {status:200,body:{taskRunId:id}};}}, "getTaskRun", ["real-id"], {env:{}});
  assert.equal(called,true);
  assert.equal(result.response.body.taskRunId,"real-id");
});
test("mutations are blocked unless explicit confirmation AND scope are present", async () => {
  let called=false;
  const client={releasePack:async()=>{called=true;return {};}};
  await assert.rejects(()=>invokeClient(client,"releasePack",["pack-id"],{env:{}}),/MUTATION_REQUIRES/);
  assert.equal(called,false);
  assert.throws(()=>requireExecutionAuthority({method:"releasePack",confirm:true,acknowledge:"releasePack",env:{VIRA_ALLOW_MUTATIONS:"true"}}),/EXPLICIT_SCOPE/);
  assert.throws(()=>requireExecutionAuthority({method:"releasePack",confirm:true,env:{VIRA_ALLOW_MUTATIONS:"true",VIRA_ORGANIZATION_ID:"o",VIRA_PROJECT_ID:"p",VIRA_ENVIRONMENT_ID:"e"}}),/EXACT_METHOD_ACK/);
});
test("high-impact mutation receives exact-method acknowledgement", async () => {
  let called=false;
  const result=await invokeClient({releasePack:async id=>{called=true;return {status:201,id};}}, "releasePack", ["pack"], {confirm:true,acknowledge:"releasePack",env:{VIRA_ALLOW_MUTATIONS:"true",VIRA_ORGANIZATION_ID:"o",VIRA_PROJECT_ID:"p",VIRA_ENVIRONMENT_ID:"e"}});
  assert.equal(called,true);
  assert.equal(result.response.id,"pack");
});
test("unknown SDK method cannot be invoked, even with confirmation", async () => {
  await assert.rejects(()=>invokeClient({request:async()=>true},"request",[],{confirm:true,env:{VIRA_ALLOW_MUTATIONS:"true"}}),/ALLOWLISTED/);
});
test("proposal-only route is distinct from execution", () => {
  assert.equal(operation("resolveTaskRun").level,"proposal");
  assert.equal(operation("startTaskRun").level,"mutation");
});
test("arguments must use explicit positional array, never an eval expression", () => {
  assert.deepEqual(parseArguments('{"args":[{"requestedMode":"AUTO"}]}'),[{requestedMode:"AUTO"}]);
  assert.throws(()=>parseArguments('{"method":"releasePack"}'),/ARGS_FILE_REQUIRES/);
});
test("url forbids insecure remote service or path with /v1", () => {
  assert.equal(validateUrl("https://example.org/"),"https://example.org");
  assert.equal(validateUrl("http://localhost:4185"),"http://localhost:4185");
  assert.throws(()=>validateUrl("http://example.org"),/HTTPS_REQUIRED/);
  assert.throws(()=>validateUrl("https://example.org/v1"),/CLEAN_DEPLOYMENT_ROOT/);
});
test("status output redacts credentials and customer prompt contents", () => {
  const record=safeSummary({status:200,body:{apiKey:"abc",payload:{secret:"abc"},taskRunId:"id",text:"customer detail"}});
  assert.equal(record.body.apiKey,"[REDACTED]");
  assert.equal(record.body.payload,"[CONTENT_HIDDEN]");
  assert.equal(record.body.taskRunId,"id");
  assert.equal(record.body.text,"[CONTENT_HIDDEN]");
});
