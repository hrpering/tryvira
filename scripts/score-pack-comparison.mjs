/**
 * Score independently reviewed responses from actual model runs.
 *
 * No model invocation, verifier invocation, or Vira receipt is fabricated.
 * Human/external-judge labels remain self-reported review evidence.
 */
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const allowedPacks = new Set(["recipe-preferences", "retail-media-review", "operations-orchestration", "marketing-starter"]);
const variants = ["OFF", "ON"];
const verdicts = new Set(["pass", "fail", "not_observable"]);

function criteriaFor(test) {
  return [
    ...test.expected.map((text, i) => ({key: "expected:" + i, text})),
    ...test.negative.map((text, i) => ({key: "negative:" + i, text})),
  ];
}
function assertRecord(row, test) {
  assert.ok(variants.includes(row.variant), "variant must be OFF or ON");
  assert.equal(typeof row.response, "string");
  assert.ok(row.response.trim().length >= 20, row.caseId + ": missing actual model response");
  assert.ok(row.evidence?.model?.trim()?.length >= 3, row.caseId + ": model identity required");
  assert.ok(row.evidence?.captureId?.trim()?.length >= 5, row.caseId + ": actual capture reference required");
  assert.ok(Number.isFinite(Date.parse(row.evidence?.capturedAt)), row.caseId + ": timestamp required");
  assert.equal(row.evidence?.source, "observed_model_output", row.caseId + ": only observed output records accepted");
  assert.ok(row.review?.reviewer?.trim()?.length >= 3, row.caseId + ": independent reviewer identity required");
  assert.ok(Array.isArray(row.review?.ratings), row.caseId + ": ratings missing");
  const specs = criteriaFor(test);
  const expected = new Set(specs.map(s => s.key));
  const found = new Set();
  for (const rating of row.review.ratings) {
    assert.ok(expected.has(rating.criterion), row.caseId + ": unknown criterion " + rating.criterion);
    assert.ok(!found.has(rating.criterion), row.caseId + ": duplicate criterion " + rating.criterion);
    found.add(rating.criterion);
    assert.ok(verdicts.has(rating.result), row.caseId + ": invalid rating");
    assert.ok(typeof rating.rationale === "string" && rating.rationale.trim().length >= 12,
      row.caseId + ": provide factual reviewer rationale");
    if (rating.quote != null) {
      assert.ok(typeof rating.quote === "string" && row.response.includes(rating.quote),
        row.caseId + ": quote must appear verbatim in captured answer");
    }
  }
  assert.equal(found.size, expected.size, row.caseId + ": rate every expected and negative criterion");
  if (row.evidence?.latencyMs != null)
    assert.ok(Number.isFinite(row.evidence.latencyMs) && row.evidence.latencyMs >= 0, "invalid measured latency");
}
export function scoreComparison(fixtures, rows, {allowSubset = false} = {}) {
  assert.equal(fixtures.kind, "design-time-evaluation-fixtures");
  assert.ok(Array.isArray(fixtures.cases) && fixtures.cases.length >= 1);
  assert.ok(Array.isArray(rows) && rows.length > 0, "no real responses supplied");
  const byId = new Map(fixtures.cases.map(t => [t.id, t]));
  const seen = new Map();
  for (const row of rows) {
    const test = byId.get(row.caseId);
    assert.ok(test, "unknown case ID: " + row.caseId);
    assertRecord(row, test);
    const key = row.caseId + "|" + row.variant;
    assert.ok(!seen.has(key), "duplicate captured response for " + key);
    seen.set(key, row);
  }
  if (!allowSubset) assert.equal(seen.size, fixtures.cases.length * 2,
    "full comparison requires OFF and ON for every Pack case (use --allow-subset for exploratory work)");

  const aggregate = Object.fromEntries(variants.map(v => [v, {
    reviewedCases: 0, passCases: 0, failCases: 0, notObservableCases: 0,
    criteriaPass: 0, criteriaFail: 0, criteriaNotObservable: 0,
    missingCases: [], meanMeasuredLatencyMs: null,
  }]));
  const paired = {onWins: 0, offWins: 0, ties: 0, unobservablePairs: 0, missingPairs: 0};
  const outcomes = [];
  for (const test of fixtures.cases) {
    const outcome = {caseId: test.id, kind: test.kind};
    for (const variant of variants) {
      const row = seen.get(test.id + "|" + variant);
      if (!row) { aggregate[variant].missingCases.push(test.id); outcome[variant] = "missing"; continue; }
      const results = row.review.ratings.map(r => r.result);
      const result = results.includes("fail") ? "fail" :
        results.includes("not_observable") ? "not_observable" : "pass";
      outcome[variant] = result;
      aggregate[variant].reviewedCases++;
      if (result === "pass") aggregate[variant].passCases++;
      if (result === "fail") aggregate[variant].failCases++;
      if (result === "not_observable") aggregate[variant].notObservableCases++;
      for (const result of results) {
        const key = result === "pass" ? "criteriaPass" :
          result === "fail" ? "criteriaFail" : "criteriaNotObservable";
        aggregate[variant][key]++;
      }
    }
    if (outcome.OFF === "missing" || outcome.ON === "missing") paired.missingPairs++;
    else if (outcome.OFF === "not_observable" || outcome.ON === "not_observable")
      paired.unobservablePairs++;
    else if (outcome.OFF === outcome.ON) paired.ties++;
    else if (outcome.ON === "pass") paired.onWins++;
    else paired.offWins++;
    outcomes.push(outcome);
  }
  for (const variant of variants) {
    const values = [...seen.values()].filter(r => r.variant === variant).map(r => r.evidence.latencyMs);
    if (values.length && values.every(Number.isFinite)) {
      aggregate[variant].meanMeasuredLatencyMs = Math.round(
        values.reduce((a,b) => a + b, 0) / values.length * 100) / 100;
    }
  }
  const fullCoverage = variants.every(v => aggregate[v].missingCases.length === 0);
  const fullyObservable = variants.every(v => aggregate[v].notObservableCases === 0);
  return {
    packVersion: fixtures.packVersion, packCases: fixtures.cases.length,
    suppliedResponses: rows.length, fullCoverage, fullyObservable,
    reportType: "SELF_REPORTED_REVIEW_OF_OBSERVED_MODEL_RESPONSES",
    label: fullCoverage && fullyObservable ? "complete annotated comparison" : "partial or inconclusive annotated comparison",
    caution: "Reviewer ratings and capture identities are provided by the operator. This tool does not verify Vira receipts, check model authenticity, invoke an LLM judge, or prove causality.",
    variants: aggregate, paired, outcomes,
  };
}

function parseOptions(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--allow-subset") {opts.allowSubset = true; continue;}
    assert.ok(["--pack","--responses","--out","--template"].includes(arg), "unknown argument " + arg);
    assert.ok(args[i + 1], "missing value for " + arg);
    opts[arg.slice(2)] = args[++i];
  }
  assert.ok(allowedPacks.has(opts.pack), "--pack must name one of the four Pack Academy examples");
  assert.ok(Boolean(opts.responses) !== Boolean(opts.template), "use either --responses or --template");
  return opts;
}
async function main() {
  const options = parseOptions(process.argv.slice(2));
  const fixtures = JSON.parse(await readFile(
    "examples/packs/" + options.pack + "/tests/cases.json", "utf8"));
  if (options.template) {
    const rows = fixtures.cases.flatMap(test => variants.map(variant => ({
      caseId: test.id, variant, response: "",
      evidence: {source: "ENTER_REAL_SOURCE", model: "", captureId: "", capturedAt: ""},
      review: {reviewer: "", ratings: criteriaFor(test).map(s => ({
        criterion: s.key, result: "TO_REVIEW", rationale: "", criterionText: s.text
      }))},
    })));
    await writeFile(options.template, rows.map(r => JSON.stringify(r)).join("\n") + "\n");
    console.log("Wrote blank review template; fill with genuine OFF/ON outputs before scoring: " + options.template);
    return;
  }
  const lines = (await readFile(options.responses, "utf8")).split(/\r?\n/).filter(s => s.trim());
  const rows = lines.map((line,i) => {
    try { return JSON.parse(line); } catch { throw new Error("invalid JSONL at line " + (i+1)); }
  });
  const result = scoreComparison(fixtures, rows, {allowSubset: options.allowSubset});
  const output = JSON.stringify(result, null, 2) + "\n";
  if (options.out) await writeFile(options.out, output);
  process.stdout.write(output);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(e => {console.error("PACK_COMPARISON_INVALID: " + e.message); process.exitCode = 1;});
}
