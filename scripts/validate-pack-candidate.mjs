#!/usr/bin/env node
// Read-only structure audit for an arbitrary author-created Vira demo Pack.
// Not a server import, runtime verifier, evaluation, approval, or release.
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/validate-pack-candidate.mjs <candidate-directory>");
  process.exit(2);
}
const root = resolve(target);
const errors = [], warnings = [];
const issue = (place, message) => errors.push(place + ": " + message);
const caution = (place, message) => warnings.push(place + ": " + message);
function readText(file) {
  const full = join(root, file);
  if (!existsSync(full)) { issue(file, "missing file"); return null; }
  try { return readFileSync(full, "utf8"); }
  catch (error) { issue(file, "cannot read: " + error.message); return null; }
}
function readArray(file, required = true) {
  const full = join(root, file);
  if (!existsSync(full) && !required) return [];
  const text = readText(file);
  if (text === null) return [];
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) { issue(file, "expected a JSON array"); return []; }
    return parsed;
  } catch (error) {
    issue(file, "invalid JSON: " + error.message); return [];
  }
}
const manifest = readText("pack.yaml") ?? "";
const id = manifest.match(/^id:\s*(\S+)/m)?.[1];
const version = manifest.match(/^version:\s*(\d+\.\d+\.\d+)/m)?.[1];
if (!id || !/^[-a-zA-Z0-9_.:]+$/.test(id)) issue("pack.yaml", "missing or invalid id");
if (!/^name:\s*\S+/m.test(manifest)) issue("pack.yaml", "missing name");
if (!version) issue("pack.yaml", "missing semantic version");
const tasks = readArray("semantic-tasks/items.json");
const points = readArray("behavior-points/items.json");
const programs = readArray("behavior-programs/items.json");
const strategies = readArray("behavior-strategies/items.json", false);
const signalRefs = readArray("signals/items.json", false);
const keyPattern = /^[a-z0-9][a-z0-9._:-]*$/;
function keySet(rows, prop, place) {
  const keys = new Set();
  for (const [index, item] of rows.entries()) {
    const value = item?.[prop];
    if (typeof value !== "string" || !keyPattern.test(value)) issue(place, "invalid " + prop + " at " + index);
    if (keys.has(value)) issue(place, "duplicate " + prop + " " + value);
    keys.add(value);
  }
  return keys;
}
if (!tasks.length || !points.length || !programs.length) issue("collections", "this demo-grade validator requires Task, Point and Program collections");
const taskKeys = keySet(tasks, "taskKey", "semantic-tasks");
const pointKeys = keySet(points, "key", "behavior-points");
keySet(programs, "key", "behavior-programs");
keySet(strategies, "strategyKey", "behavior-strategies");
keySet(signalRefs, "key", "signals");
for (const task of tasks) {
  if (!String(task?.description ?? "").trim()) issue("semantic-tasks", "task " + task?.taskKey + " missing description");
  if (!Array.isArray(task?.examples) || !task.examples.length || !Array.isArray(task?.negativeExamples) || !task.negativeExamples.length)
    issue("semantic-tasks", "task " + task?.taskKey + " must have positive AND neighboring negative examples");
}
for (const point of points) {
  if (!taskKeys.has(point?.taskKey)) issue("behavior-points", String(point?.key) + " refers to absent task " + point?.taskKey);
  if (!String(point?.requirement ?? "").trim()) issue("behavior-points", String(point?.key) + " missing explicit requirement");
}
const checkCounts = { deterministic: 0, extensionRequired: 0, unknown: 0 };
for (const program of programs) {
  if (!pointKeys.has(program?.key)) issue("behavior-programs", String(program?.key) + " has no matching Point");
  const modules = program?.modules;
  if (!Array.isArray(modules) || !modules.length) { issue("behavior-programs", String(program?.key) + " has no modules"); continue; }
  const moduleKeys = new Set();
  if (!modules.some(x => x?.kind === "verification" && x?.stage === "post_model"))
    caution("behavior-programs", String(program?.key) + " has no post_model verification module");
  for (const module of modules) {
    if (!module?.stableKey || moduleKeys.has(module.stableKey)) issue("behavior-programs", String(program?.key) + " missing/duplicate module stableKey");
    moduleKeys.add(module?.stableKey);
    if (!["pre_model", "pre_tool", "post_model", "pre_action"].includes(module?.stage))
      caution("behavior-programs", String(module?.stableKey) + " has unrecognized stage; verify runtime compatibility");
    if (module?.kind === "verification") {
      if (!Array.isArray(module.checks) || !module.checks.length) issue("behavior-programs", String(module?.stableKey) + " lacks checks");
      for (const check of module?.checks ?? []) {
        const requirement = String(check?.requirement ?? "");
        if (/^(verifier:output\.non_empty|required:\s|forbidden:\s|json:\s)/.test(requirement)) checkCounts.deterministic++;
        else if (/^(judge:|policy:|rubric:)/.test(requirement)) { checkCounts.extensionRequired++; caution("verification", String(check?.stableKey) + " requires a registered runtime extension; not verified offline"); }
        else { checkCounts.unknown++; caution("verification", String(check?.stableKey) + " does not match a recognized built-in check; not verified offline"); }
      }
    }
  }
}
for (const strategy of strategies) {
  if (!pointKeys.has(strategy?.behaviorPointKey)) issue("behavior-strategies", String(strategy?.strategyKey) + " references absent Point");
  const steps = Array.isArray(strategy?.steps) ? strategy.steps : [];
  if (!steps.length) { issue("behavior-strategies", String(strategy?.strategyKey) + " has no steps"); continue; }
  const stepKeys = keySet(steps, "stableKey", "strategy " + strategy.strategyKey);
  if (!stepKeys.has(strategy.entryStepKey)) issue("behavior-strategies", String(strategy.strategyKey) + " has absent entryStepKey");
  const states = new Set((strategy.stateSlots ?? []).map(x => x.key));
  for (const step of steps) {
    for (const key of [...(step.requires ?? []), ...(step.produces ?? [])])
      if (!states.has(key) && !String(key).startsWith("context:") && !String(key).startsWith("signal:"))
        issue("behavior-strategies", String(step.stableKey) + " references undeclared state " + key);
  }
  const edges = Array.isArray(strategy.edges) ? strategy.edges : [];
  for (const edge of edges) if (!stepKeys.has(edge.from) || !stepKeys.has(edge.to)) issue("behavior-strategies", "edge references absent step");
  const visiting = new Set(), visited = new Set();
  const graph = new Map([...stepKeys].map(k => [k, []]));
  for (const edge of edges) if (graph.has(edge.from)) graph.get(edge.from).push(edge.to);
  const dfs = key => {
    if (visiting.has(key)) { issue("behavior-strategies", "cycle at " + key); return; }
    if (visited.has(key)) return;
    visiting.add(key);
    for (const next of graph.get(key) ?? []) if (graph.has(next)) dfs(next);
    visiting.delete(key); visited.add(key);
  };
  for (const key of stepKeys) dfs(key);
  if (strategy.toolPolicy?.effectfulToolKeys?.length)
    caution("behavior-strategies", "effectful tools require host authority and live approval; not granted by this Pack");
}
const casesFile = join(root, "tests", "cases.json");
let cases = [];
if (existsSync(casesFile)) {
  try {
    const fixture = JSON.parse(readFileSync(casesFile, "utf8"));
    if (fixture.packVersion && fixture.packVersion !== version) issue("tests/cases.json", "version mismatch with pack.yaml");
    cases = fixture.cases ?? [];
    if (!Array.isArray(cases) || cases.length < 4) issue("tests/cases.json", "expected at least four diverse cases");
    else {
      const ids = new Set(), kinds = new Set();
      for (const item of cases) {
        if (!item.id || ids.has(item.id)) issue("tests/cases.json", "missing or duplicate case id");
        ids.add(item.id); kinds.add(item.kind);
        if (!String(item.prompt ?? "").trim() || !Array.isArray(item.expected) || !item.expected.length ||
            !Array.isArray(item.negative) || !item.negative.length)
          issue("tests/cases.json", String(item.id) + " needs prompt, expected and negative assertions");
      }
      if (kinds.size < 2) issue("tests/cases.json", "need at least two case families");
    }
  } catch (error) { issue("tests/cases.json", "unreadable cases: " + error.message); }
} else issue("tests/cases.json", "missing design-time cases");
if (signalRefs.length) caution("signals", "Signal keys are references; producer mapping and consent need live server evidence");
caution("scope", "scope, release eligibility and host capabilities require server readback");
const report = {
  result: errors.length ? "FAIL" : "PASS",
  evidenceLevel: "offline-structure-only",
  packId: id ?? null,
  packVersion: version ?? null,
  totals: { tasks: tasks.length, points: points.length, programs: programs.length, strategies: strategies.length, signalRefs: signalRefs.length, cases: cases.length, checks: checkCounts },
  errors, warnings
};
console.log(JSON.stringify(report, null, 2));
process.exitCode = errors.length ? 1 : 0;
