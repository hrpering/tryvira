import assert from "node:assert/strict";
import {readFile,mkdtemp,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {spawnSync} from "node:child_process";
import {parseMcpTools} from "./mcp-catalog.mjs";

const versions=JSON.parse(await readFile(new URL("../package-versions.json",import.meta.url),"utf8"));
const snapshot=JSON.parse(await readFile(new URL("../docs/reference/mcp-published-tools.json",import.meta.url),"utf8"));
const version=versions.npm["@tryvira/mcp"];
assert.equal(snapshot.package,"@tryvira/mcp");
assert.equal(snapshot.version,version);
assert.ok(Array.isArray(snapshot.tools)&&snapshot.tools.length>0);
assert.equal(new Set(snapshot.tools.map(t=>t.name)).size,snapshot.tools.length);
// Require stable, advertised public lifecycle tools. Optimization and other
// non-promoted operations may be routed through authenticated read/write_control_api.
for(const name of ["get_scope","list_inbox","mark_inbox_read","inspect_conflicts",
  "get_conflict_inspection","resolve_conflict","start_task_run","import_pack",
  "release_pack","evaluate_pack"]) {
  assert.ok(snapshot.tools.some(t=>t.name===name),"Missing published MCP tool: "+name);
}
for(const name of ["mark_inbox_read","inspect_conflicts","resolve_conflict"]){
  assert.equal(snapshot.tools.find(t=>t.name===name)?.effectful,true,name+" must be effectful");
}
const genericRead=snapshot.tools.find(t=>t.name==="read_control_api");
const genericWrite=snapshot.tools.find(t=>t.name==="write_control_api");
if(genericRead||genericWrite) {
  assert.equal(genericRead?.effectful,false,"generic read must be read-only");
  assert.equal(genericWrite?.effectful,true,"generic write must be effectful");
}
if(process.argv.includes("--published")){
  const tmp=await mkdtemp(join(tmpdir(),"vira-mcp-published-"));
  try{
    const tar=spawnSync("npm",["pack","--json","--silent","@tryvira/mcp@"+version,"--pack-destination",tmp],{encoding:"utf8"});
    assert.equal(tar.status,0,tar.stderr||"npm pack failed");
    const filename=JSON.parse(tar.stdout)[0].filename;
    const file=join(tmp,filename);
    const info=spawnSync("tar",["-xOf",file,"package/package.json"],{encoding:"utf8"});
    assert.equal(info.status,0);
    const pkg=JSON.parse(info.stdout);
    assert.equal(pkg.version,version);
    const cli=spawnSync("tar",["-xOf",file,"package/"+pkg.bin["vira-mcp"]],{encoding:"utf8",maxBuffer:5*1024*1024});
    assert.equal(cli.status,0,cli.stderr);
    const actual=parseMcpTools(cli.stdout)
      .map(({name,effectful})=>({name,effectful:Boolean(effectful)}))
      .sort((a,b)=>a.name.localeCompare(b.name));
    assert.deepEqual(snapshot.tools,actual,"Local published MCP snapshot differs from actual npm tarball");
  }finally{await rm(tmp,{recursive:true,force:true})}
}
console.log("MCP_PUBLISHED_TOOL_CATALOG_PASS "+version+" tools="+snapshot.tools.length+(process.argv.includes("--published")?" npm":" offline"));
