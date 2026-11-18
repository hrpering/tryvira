import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';

const versions = JSON.parse(await readFile(new URL('../package-versions.json', import.meta.url), 'utf8'));
const mcpVersion=versions.npm['@tryvira/mcp'];
const skillNames = await readdir(new URL('../skills/', import.meta.url), {withFileTypes:true});
const skills = skillNames.filter(entry => entry.isDirectory() && entry.name.startsWith('vira-'));
assert.equal(skills.length, 28, `expected 28 Vira Skills, found ${skills.length}`);
for (const skill of skills) await readFile(new URL(`../skills/${skill.name}/SKILL.md`, import.meta.url), 'utf8');
const mcpSkill = await readFile(new URL('../skills/vira-mcp/SKILL.md', import.meta.url), 'utf8');
for (const tool of ['start_task_run','get_task_run','list_task_run_events','import_pack','evaluate_pack','approve_pack','release_pack'])
  assert.match(mcpSkill, new RegExp(`\\b${tool}\\b`), `MCP Skill missing ${tool}`);
assert.doesNotMatch(mcpSkill, /does not provide TaskRun|has no Pack tools|do not create a fake `start_task_run`/);
const catalog = await readFile(new URL('../docs/reference/mcp-tools.md', import.meta.url), 'utf8');
assert.ok(catalog.includes(mcpVersion), 'MCP docs version drift');
assert.match(catalog, /versioned tool catalog/);
const setup = await readFile(new URL('../docs/reference/mcp.md', import.meta.url), 'utf8');
assert.doesNotMatch(setup, /does not expose Teach proposal transitions|does not expose.*Pack operations/i);
const shared = await readFile(new URL('../docs/agent-first-operation-flow.md', import.meta.url), 'utf8');
for (const name of ['start_task_run','get_task_run','import_pack','evaluate_pack','approve_pack','release_pack'])
  assert.ok(shared.includes(name), 'missing common operation: ' + name);
const snapshot=JSON.parse(await readFile(new URL('../docs/reference/mcp-published-tools.json', import.meta.url),'utf8'));
assert.equal(snapshot.version,mcpVersion);
for(const name of ['get_scope','list_inbox','mark_inbox_read','inspect_conflicts','get_conflict_inspection','resolve_conflict','start_optimization','get_optimization_run','cancel_optimization_run'])assert.ok(snapshot.tools.some(x=>x.name===name),'New public tool absent: '+name);
console.log(`SKILL_MCP_PARITY_PASS skills=${skills.length} mcpVersion=${mcpVersion} tools=${snapshot.tools.length} (static only)`);
