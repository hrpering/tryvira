import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
const script = resolve("scripts/validate-pack-candidate.mjs");
function run(path) {
  const child = spawnSync(process.execPath, [script, path], { encoding: "utf8" });
  return { code: child.status, output: JSON.parse(child.stdout) };
}
test("checked-in Pack examples pass offline candidate structural validation", () => {
  for (const name of ["recipe-preferences", "retail-media-review", "operations-orchestration"]) {
    const result = run(resolve("examples/packs", name));
    assert.equal(result.code, 0, JSON.stringify(result.output.errors));
    assert.equal(result.output.result, "PASS");
    assert.equal(result.output.evidenceLevel, "offline-structure-only");
  }
});
test("task with missing negative examples fails rather than claiming quality", () => {
  const temp = mkdtempSync(join(tmpdir(), "vira-candidate-"));
  try {
    cpSync(resolve("examples/packs/recipe-preferences"), temp, { recursive: true });
    const path = join(temp, "semantic-tasks/items.json");
    const tasks = JSON.parse(readFileSync(path, "utf8"));
    tasks[0].negativeExamples = [];
    writeFileSync(path, JSON.stringify(tasks));
    const result = run(temp);
    assert.equal(result.code, 1);
    assert.match(result.output.errors.join(" "), /negative examples/);
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
test("judge checks remain explicitly unverified offline", () => {
  const result = run(resolve("examples/packs/recipe-preferences"));
  assert.ok(result.output.totals.checks.extensionRequired > 0);
  assert.ok(result.output.warnings.some(x => /registered runtime extension/.test(x)));
});
