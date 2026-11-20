import {readFile,readdir} from "node:fs/promises";
import {join,extname} from "node:path";

const versions=JSON.parse(await readFile("package-versions.json","utf8"));
const js=versions.npm["@tryvira/sdk"], mcp=versions.npm["@tryvira/mcp"];
const python=versions.pypi["tryvira-sdk"];
const skipDirs=new Set(["node_modules",".venv",".next","dist","__pycache__",".git"]);
const scanExt=new Set([".md",".mjs",".js",".py",".json",".yml",".yaml",".txt"]);
const errors=[];
async function visit(dir){
  for(const ent of await readdir(dir,{withFileTypes:true})){
    if(ent.isDirectory()){
      if(!skipDirs.has(ent.name))await visit(join(dir,ent.name));
      continue;
    }
    const path=join(dir,ent.name);
    if(!scanExt.has(extname(path))||/package-lock|requirements\.lock|CHANGELOG|model-runs\.jsonl/i.test(path))continue;
    const body=await readFile(path,"utf8");
    for(const [index,line] of body.split("\n").entries()){
      const patterns=[
        [/@tryvira\/sdk@(\d+\.\d+\.\d+)/g,js],
        [/@tryvira\/mcp@(\d+\.\d+\.\d+)/g,mcp],
        [/tryvira-sdk==(\d+\.\d+\.\d+)/g,python],
        [/\x60@tryvira\/sdk\x60\s*\x60(\d+\.\d+\.\d+)\x60/g,js],
        [/\x60@tryvira\/mcp\x60\s*\x60(\d+\.\d+\.\d+)\x60/g,mcp],
        [/\bJS SDK (\d+\.\d+\.\d+)/g,js],
        [/\bPython SDK (\d+\.\d+\.\d+)/g,python],
        [/\bMCP (\d+\.\d+\.\d+)/g,mcp],
      ];
      for(const [regex,expected] of patterns){
        for(const match of line.matchAll(regex))if(match[1]!==expected){
          errors.push(path+":"+(index+1)+" expected "+expected+" found "+match[1]);
        }
      }
      // Non-package-specific 0.1.55/0.1.66 matches are not inherently
      // obsolete: newer source manifests and historical snapshots may use them.
      // Package-specific stale pinned references are checked above.
      if(/\b0\.1\.44\b/.test(line) &&
         !/historical|previously pinned|prior release|changelog|legacy comparison/i.test(line.toLowerCase())){
        errors.push(path+":"+(index+1)+" includes an obsolete active client version");
      }
    }
  }
}
for(const dir of ["docs","examples","tutorials","skills"])await visit(dir);
if(errors.length){
  console.error("PUBLIC_CLIENT_COPY_VERSION_DRIFT");
  for(const entry of [...new Set(errors)])console.error(" - "+entry);
  process.exitCode=1;
}else console.log("PUBLIC_CLIENT_COPY_VERSIONS_PASS js="+js+" mcp="+mcp+" python="+python);
