import test from "node:test";
import assert from "node:assert/strict";
import {scoreComparison} from "./score-pack-comparison.mjs";
const fixture = {
  kind: "design-time-evaluation-fixtures",
  packVersion: "test-only",
  cases: [
    {id:"QA-001",kind:"baseline",expected:["Does not invent a response"],negative:["No fabricated action"]}
  ],
};
const make = (variant, result = "pass") => ({
  caseId:"QA-001",variant,response:"Observed synthetic answer for test harness only, not a model run.",
  evidence:{source:"observed_model_output",model:"synthetic-test-model",captureId:"synthetic-id-1234",capturedAt:"2026-01-01T00:00:00Z"},
  review:{reviewer:"test-reviewer",ratings:[
    {criterion:"expected:0",result,rationale:"This is a synthetic evaluation of the scorer."},
    {criterion:"negative:0",result:"pass",rationale:"The assertion did not mention any external action."}
  ]}
});
test("pairs actual-looking separately reviewed OFF and ON records; no model invoked",()=>{
  const r=scoreComparison(fixture,[make("OFF","fail"),make("ON")]);
  assert.equal(r.paired.onWins,1);assert.equal(r.variants.ON.passCases,1);
  assert.equal(r.variants.OFF.failCases,1);
  assert.equal(r.reportType,"SELF_REPORTED_REVIEW_OF_OBSERVED_MODEL_RESPONSES");
});
test("does not produce full-comparison claim from cherry-picked subset",()=>{
  assert.throws(()=>scoreComparison(fixture,[make("OFF")]),/full comparison/);
  const r=scoreComparison(fixture,[make("OFF")],{allowSubset:true});
  assert.equal(r.fullCoverage,false);assert.equal(r.paired.missingPairs,1);
});
test("rejects invented empty responses, vague evidence and unreviewed cases",()=>{
  const r=make("OFF");r.response="";assert.throws(()=>scoreComparison(fixture,[r,make("ON")]),/actual model response/);
  const q=make("OFF");q.review.ratings.pop();assert.throws(()=>scoreComparison(fixture,[q,make("ON")]),/rate every/);
  const z=make("OFF");z.evidence.source="mocked";assert.throws(()=>scoreComparison(fixture,[z,make("ON")]),/observed output/);
});
test("not observable cannot be counted as a passing case",()=>{
  const r=scoreComparison(fixture,[make("OFF","not_observable"),make("ON")]);
  assert.equal(r.variants.OFF.notObservableCases,1);
  assert.equal(r.fullyObservable,false);assert.equal(r.paired.unobservablePairs,1);
});
