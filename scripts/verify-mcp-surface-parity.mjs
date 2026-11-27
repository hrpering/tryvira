import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const source=JSON.parse(await readFile(new URL('docs/reference/mcp-maintained-source-tools.json',root),'utf8'));
const npm=JSON.parse(await readFile(new URL('docs/reference/mcp-published-tools.json',root),'utf8'));
const versions=JSON.parse(await readFile(new URL('package-versions.json',root),'utf8'));
assert.equal(source.kind,'maintained-source-declaration');
assert.match(source.sourceVersion,/^\d+\.\d+\.\d+$/);
assert.equal(source.liveHostedVerified,false);
assert.equal(npm.version,versions.npm['@tryvira/mcp']);
assert.ok(source.tools.length>0&&npm.tools.length>0);
assert.equal(new Set(source.tools).size,source.tools.length,'Source tool names must be unique');
assert.equal(new Set(npm.tools.map(x=>x.name)).size,npm.tools.length,'Published names must be unique');
for(const name of source.tools)assert.match(name,/^[a-z][a-z0-9_]*$/);
for(const item of npm.tools){assert.match(item.name,/^[a-z][a-z0-9_]*$/);assert.equal(typeof item.effectful,'boolean');}

const sourceNames=new Set(source.tools);
const npmNames=new Set(npm.tools.map(x=>x.name));
const shared=[...sourceNames].filter(n=>npmNames.has(n)).sort();
const sourceOnly=[...sourceNames].filter(n=>!npmNames.has(n)).sort();
const npmOnly=[...npmNames].filter(n=>!sourceNames.has(n)).sort();
const sameRelease=source.sourceVersion===npm.version;
const parityNarrative=sourceOnly.length||npmOnly.length
  ?'Their tool-name sets differ; source/npm-only names are listed below. This is a catalog difference, not a live hosted or permission result.'
  :sameRelease
    ?'Both snapshots describe the same release version and have matching tool names; this does not establish schema, authority, or live hosted parity.'
    :'The tool-name sets match, but these are different package revisions: source `'+source.sourceVersion+'` is an unpublished candidate and npm `'+npm.version+'` is the published artifact. Name parity does not establish package, schema, authority, or live hosted parity.';
if(sameRelease&& (sourceOnly.length||npmOnly.length)){
  throw new Error('MCP_MATCHING_RELEASE_CATALOG_DRIFT source='+source.sourceVersion+
    ' sourceOnly='+sourceOnly.join(',')+' npmOnly='+npmOnly.join(','));
}
const bullet=(items)=>items.length?items.map(n=>'- '+String.fromCharCode(96)+n+String.fromCharCode(96)).join('\n'):'None.';
const ticks=(value)=>String.fromCharCode(96)+String(value)+String.fromCharCode(96);
const lines=[
  '# MCP catalog comparison: maintained source vs published npm',
  '',
  'This report is generated from the reviewed maintained **source declaration** and the registry-verified **published npm artifact**. Neither inventory establishes live hosted '+ticks('tools/list')+', tenant permissions, tool schemas or effect/approval parity.',
  '',
  '| Surface | Version | Advertised tools | Evidence |',
  '| --- | --- | ---: | --- |',
  '| Maintained Vira server/client shared catalog (source) | '+ticks(source.sourceVersion)+' | **'+source.tools.length+'** | Reviewed source declaration on '+source.inspectedAt+'; **not** a live hosted endpoint check |',
  '| Published '+ticks('@tryvira/mcp')+' npm artifact | '+ticks(npm.version)+' | **'+npm.tools.length+'** | [Versioned npm CLI snapshot](reference/mcp-published-tools.json); npm bundle compared in registry CI |',
  '| Common tool names | These two snapshots | **'+shared.length+'** | Name intersection only |',
  '',
  'The two inventories '+(sourceOnly.length||npmOnly.length?'**differ**':'**have the same advertised names**')+': '+sourceOnly.length+' tool(s) only in the maintained source snapshot, '+npmOnly.length+' only in the published npm snapshot. '+parityNarrative,
  '',
  '## Declared by maintained source, absent from this npm snapshot ('+sourceOnly.length+')',
  '',
  bullet(sourceOnly),
  '',
  '## Present in this npm snapshot, absent from maintained source declaration ('+npmOnly.length+')',
  '',
  bullet(npmOnly),
  '',
  '## What to check in an actual integration',
  '',
  '1. Inspect the installed '+ticks('@tryvira/mcp')+' version and run '+ticks('initialize')+' followed by '+ticks('tools/list')+'.',
  '2. Use only returned names, input schemas and authorization decisions. A missing tool can require a newer published package or a separately documented SDK/API integration.',
  '3. Never treat '+ticks('read_control_api')+' or '+ticks('write_control_api')+' as permission to guess routes or bypass a denial.',
  '4. Treat post-model verification, approvals and release authority as separate evidence requirements.',
  '5. Public CI checks the npm tarball and this comparison. It **cannot continuously read private maintained source** or validate a live hosted endpoint; refresh the source declaration when that catalog changes.',
  '',
  '[Package setup](reference/mcp.md) · [MCP tool reference](reference/mcp-tools.md) · [Agent-first operation flow](agent-first-operation-flow.md) · [Version and acceptance plan](integration-compatibility.md)',
  '',
];
const md=lines.join('\n');
const path=new URL('docs/mcp-surface-parity.md',root);
if(process.argv.includes('--write'))await writeFile(path,md);
else if(process.argv.includes('--check'))assert.equal(await readFile(path,'utf8'),md,'MCP source/npm comparison documentation is stale; regenerate with --write');
console.log('MCP_SURFACE_COMPARISON_PASS source='+source.sourceVersion+'/'+source.tools.length+
  ' published='+npm.version+'/'+npm.tools.length+' common='+shared.length+
  ' sourceOnly='+sourceOnly.length+' npmOnly='+npmOnly.length+
  ' mode='+(process.argv.includes('--write')?'write':process.argv.includes('--check')?'check':'inspect'));
