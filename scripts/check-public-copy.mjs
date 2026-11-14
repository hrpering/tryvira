import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const marketingPages = [
  'README.md',
  'README.tr.md',
  'docs/README.md',
  'docs/product-feature-map.md',
  'docs/product-status.md',
  'docs/what-is-vira.md',
  'docs/product-positioning.md',
  'docs/brand-positioning.md',
  'docs/how-vira-works.md',
  'docs/for-teams.md',
  'docs/approach-comparison.md',
  'docs/start-here.md',
];
const editorialLeak = [
  /\bdo not claim\b/i,
  /\bnever claim\b/i,
  /\bdo not market\b/i,
  /\bdo not infer\b/i,
  /\bowner-authorized production\b/i,
  /\bpublic navigation and claim-control\b/i,
  /\bprivate production repo\b/i,
  /\b(?:P0|P1|P2):\s/i,
  /\bmock Vira backend\b/i,
  /\bno fake Vira backend\b/i,
];
for (const file of marketingPages) {
  const contents = await readFile(file, 'utf8');
  assert.ok(contents.length > 300, file + ': missing customer guidance');
  for (const pattern of editorialLeak) {
    assert.doesNotMatch(contents, pattern, file + ': internal authoring instruction leaked into customer copy');
  }
}
const skills = [
  'vira-author-behavior','vira-build-pack','vira-chatbot','vira-debug',
  'vira-evaluate-release','vira-evaluate','vira-framework-integration',
  'vira-full-lifecycle','vira-get-started','vira-http-api','vira-integrate-app',
  'vira-js-sdk','vira-lifecycle','vira-mcp','vira-npm-cli','vira-observe-teach',
  'vira-observe','vira-packs','vira-python-sdk','vira-release',
  'vira-runtime-verification','vira-runtime','vira-signals','vira-strategies',
  'vira-studio','vira-task-runs','vira-traces'
];
assert.equal(new Set(skills).size, 27);
for(const name of skills) {
  const guide = await readFile('skills/'+name+'/SKILL.md','utf8');
  const license = await readFile('skills/'+name+'/LICENSE','utf8');
  assert.match(guide, /license: "Vira Agent Skill Installation & Application Use License v1\.0; see LICENSE"/,
    name+': metadata must match bundled usable license');
  assert.match(license, /Permission\./,name+': install permission missing');
  assert.match(guide, /^## Activate this skill when$/m);
  assert.match(guide, /^## Inputs and preconditions$/m);
  assert.match(guide, /^## Workflow/m);
  assert.match(guide, /^## Deliverable and failure handling$/m);
  assert.doesNotMatch(guide, /^# (?:Js Sdk|Mcp|Http Api|Npm Cli|Python Sdk)$/m,
    name+': placeholder-like title');
}
const skillsReadme = await readFile('skills/README.md','utf8');
assert.doesNotMatch(skillsReadme, /\[Audit of all 24 original Skills/);
const status = await readFile('docs/product-status.md','utf8');
assert.match(status,/final verified|verified final|verified provider/i);
assert.match(status,/provisioned/i);
const map = await readFile('docs/product-feature-map.md','utf8');
for(let i=1;i<=16;i++)assert.ok(map.includes('| **'+i+'. '),'Missing product area '+i);
console.log('PUBLIC_COPY_PASS: '+marketingPages.length+' reader-facing pages, 27 licensed Skills, 16 product areas');
