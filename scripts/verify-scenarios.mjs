/**
 * Validate the public example scenario corpus, not the quality of an LLM.
 *
 * No API request, simulated Vira response or hidden “pass” verdict is made.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile("examples/scenarios/cases.json", "utf8"));
assert.equal(data.schemaVersion, 1);
assert.equal(typeof data.purpose, "string");
assert.ok(data.purpose.toLowerCase().includes("not actual model outputs"));
assert.ok(Array.isArray(data.cases));
assert.ok(data.cases.length >= 12);

const ids = new Set();
const modeCount = new Map();
const levelCount = new Map();
const allowedModes = new Set(["AUTO", "SINGLE", "STRATEGY", "COMPOUND", "HYBRID"]);
const allowedLevels = new Set(["beginner", "intermediate", "advanced"]);

for (const row of data.cases) {
  assert.match(row.id, /^[BIA]-\d{3}$/);
  assert.ok(!ids.has(row.id), "duplicate scenario id: " + row.id);
  ids.add(row.id);
  assert.ok(allowedLevels.has(row.level), row.id + ": invalid level");
  assert.ok(allowedModes.has(row.requestedMode), row.id + ": invalid requestedMode");
  for (const field of ["title", "domain", "shortPrompt", "detailedPrompt"]) {
    assert.ok(typeof row[field] === "string" && row[field].trim().length >= 5,
      row.id + ": invalid " + field);
  }
  assert.ok(row.detailedPrompt.length > row.shortPrompt.length + 10,
    row.id + ": the detailed test needs more context");
  assert.ok(Array.isArray(row.behaviorRequirements) && row.behaviorRequirements.length >= 2);
  assert.ok(Array.isArray(row.negativeCases) && row.negativeCases.length >= 1);
  for (const check of [...row.behaviorRequirements, ...row.negativeCases]) {
    assert.ok(typeof check === "string" && check.trim().length >= 12, row.id + ": empty check");
  }
  modeCount.set(row.requestedMode, (modeCount.get(row.requestedMode) || 0) + 1);
  levelCount.set(row.level, (levelCount.get(row.level) || 0) + 1);
}

for (const mode of allowedModes) assert.ok(modeCount.has(mode), "missing " + mode);
for (const level of allowedLevels) assert.ok(levelCount.get(level) >= 3, "few " + level + " cases");

console.log("PUBLIC_SCENARIOS_PASS", {
  count: ids.size,
  levels: Object.fromEntries(levelCount),
  requestedModes: Object.fromEntries(modeCount),
  note: "fixture validation only; no live model or Vira run",
});
