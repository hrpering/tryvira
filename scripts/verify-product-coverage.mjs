import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=async path=>readFile(path,"utf8");
const main=await read("README.md"),tr=await read("README.tr.md"),index=await read("docs/README.md");
const features=await read("docs/product-feature-map.md"),status=await read("docs/product-status.md");
const docs=["docs/observe.md","docs/signals.md","docs/runtime-verification.md","docs/teach.md",
  "docs/pack-authoring-guide.md","docs/canonical-taskrun.md","docs/traces.md",
  "docs/product-feature-map.md","docs/product-status.md","docs/verified-answer-handoff.md"];
for(const path of docs){
  const text=await read(path);assert.ok(text.length>100,path+": empty document");
  assert.ok(index.includes(path.replace("docs/","")),path+": absent from documentation navigation");
}
for(const word of ["Observe","Signal","Teach","Runtime verification","AUTO TaskRun",
"Evaluation","Release","Traces","billing","Studio","Admin"]){
  assert.ok(features.toLowerCase().includes(word.toLowerCase()),"Missing product-family topic "+word);
}
for(let i=1;i<=16;i++){
  assert.ok(features.includes("| **"+i+". "), "Missing documented product-capability family #"+i);
}
for(const word of ["Observe","Signal","runtime verification","AUTO TaskRun"]){
  assert.ok(main.toLowerCase().includes(word.toLowerCase()),"Root README missing "+word);
  assert.ok(tr.toLowerCase().includes(word.toLowerCase()),"Turkish README missing "+word);
}
for(const word of ["Implementation","Deployed acceptance","verification","provider","Signal","TaskRun"]){
  assert.ok(status.toLowerCase().includes(word.toLowerCase()),"Missing maturity caveat "+word);
}
const patterns=await read("docs/integration-patterns.md");
const architecture=await read("docs/architecture.md");
assert.match(patterns,/canonical governed chatbot/);
assert.match(patterns,/diagnostic only/);
assert.doesNotMatch(patterns,/## Resolve-before-model/i);
assert.match(architecture,/AUTO TaskRun/);
assert.match(architecture,/Signal discovery/);
const prefixes=/^(verifier:\s*\S+|required:\s*.+|forbidden:\s*.+|json:\s*.+|policy:\s*.+|rubric:\s*.+|eval:\s*.+|judge:\s*.+)$/i;
let verifiedModules=0,judgeChecks=0;
for(const name of ["recipe-preferences","retail-media-review","operations-orchestration"]){
  const root="examples/packs/"+name;
  const programs=JSON.parse(await read(root+"/behavior-programs/items.json"));
  for(const p of programs)for(const m of p.modules??[]){
    if(m.kind!=="verification")continue;
    assert.ok(Array.isArray(m.checks)&&m.checks.length>=1,name+": undeclared executable verification checks");
    assert.ok(["repair","rerank","escalate","block"].includes(m.onFailure),name+": missing failure policy");
    const used=new Set();
    for(const x of m.checks){
      assert.ok(typeof x.stableKey==="string" && /^[a-z0-9][a-z0-9._:-]*$/.test(x.stableKey),name+": invalid check stable key");
      assert.ok(!used.has(x.stableKey),name+": duplicate check");
      used.add(x.stableKey);
      assert.match(x.requirement,prefixes,name+": unsupported verifier requirement format");
      if(x.requirement.startsWith("judge:"))judgeChecks++;
    }
    verifiedModules++;
  }
  const explanation=await read(root+"/README.md");
  assert.match(explanation,/judge/i,name+": missing real extension dependency documentation");
}
assert.ok(verifiedModules>=6 && judgeChecks>=6,"Not enough explicit Pack verification coverage");
const verifier=await read("docs/runtime-verification.md");
assert.match(verifier,/missing|unavailable/i);
assert.match(verifier,/deterministic verifier/i);
assert.match(verifier,/judge:/i);
assert.match(verifier,/output digest/i);
const walkthrough=await read("examples/observe-signal-verify/README.md");
assert.match(walkthrough,/retail\.metric_definition_mismatch/);
console.log("PRODUCT_COVERAGE_PASS: 16 feature families, 10 core navigation pages, "+
  verifiedModules+" explicit verified modules, "+judgeChecks+" external judge dependencies (static only)");
