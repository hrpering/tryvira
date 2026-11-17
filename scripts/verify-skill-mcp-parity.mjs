import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

const root = new URL('..', import.meta.url);
const skillNames = await readdir(new URL('../skills/', import.meta.url), {withFileTypes:true});
const skills = skillNames.filter(entry => entry.isDirectory() && entry.name.startsWith('vira-'));
assert.equal(skills.length, 28, `expected 28 Vira Skills, found ${skills.length}`);
for (const skill of skills) await readFile(new URL(`../skills/${skill.name}/SKILL.md`, import.meta.url), 'utf8');
const mcpSkill = await readFile(new URL('../skills/vira-mcp/SKILL.md', import.meta.url), 'utf8');
for (const tool of ['start_task_run','get_task_run','list_task_run_events','import_pack','evaluate_pack','approve_pack','release_pack'])
  assert.match(mcpSkill, new RegExp(`\\b${tool}\\b`), `MCP Skill missing ${tool}`);
assert.doesNotMatch(mcpSkill, /does not provide TaskRun|has no Pack tools|do not create a fake `start_task_run`/);
const catalog = await readFile(new URL('../docs/reference/mcp-tools.md', import.meta.url), 'utf8');
assert.match(catalog, /0\.1\.54/);
assert.match(catalog, /76 scoped tools/);
console.log(`SKILL_MCP_PARITY_PASS skills=${skills.length} mcpVersion=0.1.54`);
