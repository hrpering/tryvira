import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const source=JSON.parse(await readFile(new URL('docs/reference/mcp-maintained-source-tools.json',root),'utf8'));
const npm=JSON.parse(await readFile(new URL('docs/reference/mcp-published-tools.json',root),'utf8'));
const versions=JSON.parse(await readFile(new URL('package-versions.json',root),'utf8'));
assert.equal(source.kind,'maintained-source-declaration');
assert.equal(typeof source.sourceVersion,'string');
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
if(sameRelease&& (sourceOnly.length||npmOnly.length)){
  throw new Error('MCP_MATCHING_RELEASE_CATALOG_DRIFT source='+source.sourceVersion+
    ' sourceOnly='+sourceOnly.join(',')+' npmOnly='+npmOnly.join(','));
}
const bullet=(items)=>items.length?items.map(n=>'- \`'+n+'\`').join('\n'):'None.';
const md=\`# MCP catalog comparison: maintained source vs published npm

This report is generated from the reviewed maintained **source declaration** and the registry-verified **published npm artifact**. Neither inventory establishes live hosted \\\`tools/list\\\`, tenant permissions, tool schemas, or effect/approval parity.

| Surface | Version | Advertised tools | Evidence |
| --- | --- | ---: | --- |
| Maintained Vira server/client shared catalog (source) | \\\`\${source.sourceVersion}\\\` | **\${source.tools.length}** | Reviewed source declaration on \${source.inspectedAt}; **not** a live hosted endpoint check |
| Published \\\`@tryvira/mcp\\\` npm artifact | \\\`\${npm.version}\\\` | **\${npm.tools.length}** | [Versioned npm CLI snapshot](reference/mcp-published-tools.json); actual npm bundle compared in registry CI |
| Common tool names | These two snapshots | **\${shared.length}** | Name intersection only |

The two inventories \${sourceOnly.length||npmOnly.length?'**differ**':'**have the same advertised names**'}: \${sourceOnly.length} tool(s) only in the maintained source snapshot, \${npmOnly.length} only in the published npm snapshot. \${sameRelease?'Both snapshots describe the same release version; the parity test requires the names to match.':'They describe **different package revisions**, so this difference must not be portrayed as a broken installed package or as complete public parity.'}

## Declared by maintained source, absent from this npm snapshot (\${sourceOnly.length})

\${bullet(sourceOnly)}

## Present in this npm snapshot, absent from maintained source declaration (\${npmOnly.length})

\${bullet(npmOnly)}

## What to check in an actual integration

1. Inspect the installed \\\`@tryvira/mcp\\\` version and run \\\`initialize\\\` followed by \\\`tools/list\\\`.
2. Use only returned names, input schemas and authorization decisions. A missing tool can require a newer published package or a separately documented SDK/API integration.
3. Never treat \\\`read_control_api\\\` or \\\`write_control_api\\\` as permission to guess routes or bypass a denial.
4. Treat post-model verification, approvals and release authority as separate evidence requirements.
5. The public CI checks the npm tarball and this documented comparison. It **cannot continuously read private maintained source** or validate a live hosted endpoint; refresh the source declaration when that catalog changes.

[Package setup](reference/mcp.md) · [MCP tool reference](reference/mcp-tools.md) · [Agent-first operation flow](agent-first-operation-flow.md) · [Version and acceptance plan](integration-compatibility.md)
\`;
const path=new URL('docs/mcp-surface-parity.md',root);
if(process.argv.includes('--write')){
  await writeFile(path,md);
}else if(process.argv.includes('--check')){
  assert.equal(await readFile(path,'utf8'),md,'MCP source/npm comparison documentation is stale; regenerate with --write');
}
console.log(\`MCP_SURFACE_COMPARISON_PASS source=\${source.sourceVersion}/\${source.tools.length} published=\${npm.version}/\${npm.tools.length} common=\${shared.length} sourceOnly=\${sourceOnly.length} npmOnly=\${npmOnly.length} mode=\${process.argv.includes('--write')?'write':process.argv.includes('--check')?'check':'inspect'}\`);
