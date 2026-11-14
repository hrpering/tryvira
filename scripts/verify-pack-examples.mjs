import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
const roots=["recipe-preferences","retail-media-review","operations-orchestration","marketing-starter"];
const valid=/^[a-z0-9][a-z0-9._:-]*$/;
let taskTotal=0;
for(const name of roots){
  const dir=join("examples","packs",name);
  const manifest=await readFile(join(dir,"pack.yaml"),"utf8");
  assert.match(manifest,/^id: vira\.examples\.[a-z0-9._-]+$/m);
  assert.match(manifest,/^name: \S/m);
  assert.match(manifest,/^version: \d+\.\d+\.\d+$/m);
  const read=async kind=>{try{return JSON.parse(await readFile(join(dir,kind,"items.json"),"utf8"));}catch(e){if(e.code==="ENOENT")return [];throw e;}};
  const tasks=await read("semantic-tasks"),points=await read("behavior-points"),programs=await read("behavior-programs");
  const strategies=await read("behavior-strategies"),fixtures=JSON.parse(await readFile(join(dir,"tests","cases.json"),"utf8"));
  assert.ok(tasks.length&&points.length===tasks.length&&programs.length===points.length);
  const taskKeys=new Set(tasks.map(t=>t.taskKey)),pointKeys=new Set(points.map(p=>p.key)),moduleKeys=new Set();
  assert.equal(taskKeys.size,tasks.length);assert.equal(pointKeys.size,points.length);
  for(const t of tasks){assert.match(t.taskKey,valid);assert.ok(t.description?.length>25);assert.ok(t.examples?.length&&t.negativeExamples?.length);}
  for(const p of points){assert.ok(taskKeys.has(p.taskKey));assert.ok(p.requirement?.length>30&&p.verification?.length>25);}
  for(const p of programs){
    assert.ok(pointKeys.has(p.key));assert.ok(p.rubric?.length>=2&&p.antiPatterns?.length);
    assert.ok(p.modules?.some(m=>m.kind==="verification"&&m.stage==="post_model"));
    for(const m of p.modules){assert.match(m.stableKey,valid);assert.ok(!moduleKeys.has(m.stableKey));moduleKeys.add(m.stableKey);assert.ok(m.requirement?.length>=20);}
  }
  for(const s of strategies){
    assert.equal(s.schemaVersion,1);assert.ok(pointKeys.has(s.behaviorPointKey));assert.ok(s.steps?.length>=2);
    const steps=new Set(s.steps.map(x=>x.stableKey));assert.ok(steps.has(s.entryStepKey));
    for(const edge of s.edges)assert.ok(steps.has(edge.from)&&steps.has(edge.to)&&edge.from!==edge.to);
    assert.ok(s.steps.some(x=>x.type==="compose"&&x.verifierKeys?.length));
    assert.ok(s.verificationPolicy?.requireFinalComposeVerification);assert.ok(s.budgets?.maxStepExecutions>=s.steps.length);
    const slots=new Set(s.stateSlots.map(x=>x.key));
    for(const step of s.steps)for(const key of [...step.requires,...step.produces])
      assert.ok(slots.has(key)||key.startsWith("context:")||key.startsWith("signal:"),name+": missing slot "+key);
  }
  assert.equal(fixtures.kind,"design-time-evaluation-fixtures");
  assert.equal(fixtures.schemaVersion,2,name+": evaluation fixtures must use current schema");
  assert.ok(fixtures.cases.length>=24,name+": at least 24 varied evaluation cases expected");
  const version=manifest.match(/^version: (\d+\.\d+\.\d+)$/m)?.[1];
  assert.equal(fixtures.packVersion,version,name+": fixture version must match Pack");
  const caseIds=new Set(),kindCounts=new Map();
  for(const test of fixtures.cases){
    assert.match(test.id,/^[A-Z]{2}-\d{3}$/,name+": missing stable case ID");
    assert.ok(!caseIds.has(test.id),name+": duplicate case "+test.id);caseIds.add(test.id);
    assert.ok(test.prompt?.length>20&&test.expected?.length&&test.negative?.length);
    for(const criteria of [...test.expected,...test.negative]){
      assert.ok(typeof criteria==="string"&&criteria.length>20,name+": vague evaluation check");
    }
    assert.ok(typeof test.kind==="string"&&test.kind.length>=4,name+": missing case family");
    kindCounts.set(test.kind,(kindCounts.get(test.kind)||0)+1);
  }
  assert.ok(kindCounts.size>=4,name+": cases lack diverse failure modes");
  for(const p of programs){
    const semantic=p.modules.filter(m=>m.kind==="verification").flatMap(m=>m.checks||[]);
    assert.ok(semantic.some(c=>c.requirement.startsWith("judge: ")),name+": missing domain verification contract");
    assert.ok(semantic.some(c=>c.requirement.startsWith("verifier:output.non_empty"))||name==="operations-orchestration",
      name+": missing deterministic completeness guard");
  }
  taskTotal+=tasks.length;
  console.log("PACK_STRUCTURE_PASS",name,tasks.length,"tasks",strategies.length,"strategies");
}
console.log("PACK_EXAMPLES_PASS",roots.length,"packs",taskTotal,"tasks (structural only, not live evaluation)");
