// Sync current client version references without touching dependency locks.
import {readdir,readFile,writeFile} from "node:fs/promises";
import {join,basename} from "node:path";
const v=JSON.parse(await readFile("package-versions.json","utf8"));
const js=v.npm["@tryvira/sdk"],mcp=v.npm["@tryvira/mcp"],py=v.pypi["tryvira-sdk"];
const check=process.argv.includes("--check");
const changed=[],skipped=new Set([".git","node_modules",".next",".venv","dist","__pycache__"]);
const semver="\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?";
const substitutions=[
  [new RegExp("@tryvira/sdk@"+semver,"g"),"@tryvira/sdk@"+js],
  [new RegExp("@tryvira/mcp@"+semver,"g"),"@tryvira/mcp@"+mcp],
  [new RegExp("tryvira-sdk=="+semver,"g"),"tryvira-sdk=="+py],
  [new RegExp("(\x60@tryvira/sdk\x60\\s*\x60)"+semver+"(\x60)","g"),"$1"+js+"$2"],
  [new RegExp("(\x60@tryvira/mcp\x60\\s*\x60)"+semver+"(\x60)","g"),"$1"+mcp+"$2"],
  [new RegExp("(\\bJS SDK )"+semver,"g"),"$1"+js],
  [new RegExp("(\\bPython SDK )"+semver,"g"),"$1"+py],
  [new RegExp("(\\bMCP )"+semver,"g"),"$1"+mcp]
];
async function walk(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    if(entry.isDirectory()){if(!skipped.has(entry.name))await walk(join(dir,entry.name));continue;}
    if(!entry.isFile()||!entry.name.endsWith(".md"))continue;
    const path=join(dir,entry.name);
    const original=await readFile(path,"utf8");
    let next=original;
    for(const [pattern,replacement] of substitutions)next=next.replace(pattern,replacement);
    if(["mcp.md","mcp-tools.md"].includes(basename(path))){
      next=next.replace(new RegExp("(\\bVersion )"+semver+"(\\b)","g"),"$1"+mcp+"$2")
        .replace(new RegExp("(\\bdocumented version \\*\\*)"+semver+"(\\*\\*)","g"),"$1"+mcp+"$2");
    }
    if(original!==next){changed.push(path);if(!check)await writeFile(path,next,"utf8");}
  }
}
for(const dir of ["docs","examples","tutorials","skills"])await walk(dir);
if(changed.length&&check){
  console.error("PUBLIC_CLIENT_COPY_SYNC_REQUIRED");
  changed.forEach(x=>console.error("- "+x));
  process.exitCode=1;
}else console.log("PUBLIC_CLIENT_COPY_SYNC_PASS mode="+(check?"check":"update")+" changed="+changed.length);
