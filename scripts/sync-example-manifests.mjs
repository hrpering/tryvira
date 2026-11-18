import assert from "node:assert/strict";
import {readFile, writeFile} from "node:fs/promises";
import {join} from "node:path";

const root=process.cwd();
const versions=JSON.parse(await readFile(join(root,"package-versions.json"),"utf8"));
const latestJS=versions.npm["@tryvira/sdk"];
const latestMCP=versions.npm["@tryvira/mcp"];
const latestPY=versions.pypi["tryvira-sdk"];
const check=process.argv.includes("--check");
assert.match(latestJS,/^\d+\.\d+\.\d+$/);
assert.match(latestMCP,/^\d+\.\d+\.\d+$/);
assert.match(latestPY,/^\d+\.\d+\.\d+$/);

const failed=[];
async function updateFile(path, mutate) {
  const absolute=join(root,path);
  const before=await readFile(absolute,"utf8");
  const after=mutate(before);
  if (before!==after) {
    if (check) failed.push(path);
    else await writeFile(absolute,after,"utf8");
  }
}

for (const path of [
  "examples/javascript/package.json",
  "examples/semantic-runtime/package.json",
  "examples/frameworks/node-next/package.json",
  "tutorials/marketing-agent/package.json"
]) {
  await updateFile(path,raw=>{
    const pkg=JSON.parse(raw);
    assert.ok(pkg.dependencies?.["@tryvira/sdk"],path+": missing SDK dependency");
    pkg.dependencies["@tryvira/sdk"]=latestJS;
    return JSON.stringify(pkg,null,2)+"\n";
  });
}

for(const path of [
 "examples/python/requirements.txt",
 "examples/frameworks/python_fastapi/requirements.txt",
 "examples/frameworks/langgraph/requirements.txt"
]) {
  await updateFile(path,raw=>{
    assert.match(raw,/^tryvira-sdk==[^\s]+$/m,path+": missing PyPI pin");
    return raw.replace(/^tryvira-sdk==[^\s]+$/m,"tryvira-sdk=="+latestPY);
  });
}

await updateFile("examples/mcp/client-config.example.json",raw=>{
  const config=JSON.parse(raw);
  const args=config.mcpServers?.vira?.args;
  assert.ok(Array.isArray(args), "missing stdio MCP launcher args");
  const i=args.findIndex(x=>x.startsWith("@tryvira/mcp@"));
  assert.notEqual(i,-1,"missing MCP launcher version");
  args[i]="@tryvira/mcp@"+latestMCP;
  return JSON.stringify(config,null,2)+"\n";
});

await updateFile("docs/example-package-compatibility.md",raw=>{
  const replacements=[
    [/^(\| \`examples\/javascript\` \| JS SDK )[^|]+(\|.*)$/m,"$1"+latestJS+" $2"],
    [/^(\| \`examples\/python\` \| Python SDK )[^|]+(\|.*)$/m,"$1"+latestPY+" $2"],
    [/^(\| \`examples\/mcp\` \| MCP )[^|]+(\|.*)$/m,"$1"+latestMCP+" $2"],
    [/^(\| \`examples\/frameworks\/mcp-client\` \| MCP )[^|]+(\|.*)$/m,"$1"+latestMCP+" $2"],
    [/^(\| \`examples\/semantic-runtime\` \| JS SDK )[^|]+(\|.*)$/m,"$1"+latestJS+" $2"],
    [/^(\| \`examples\/frameworks\/node-next\` \| JS SDK )[^|]+(\|.*)$/m,"$1"+latestJS+" $2"],
    [/^(\| \`tutorials\/marketing-agent\` \| JS SDK )[^|]+(\|.*)$/m,"$1"+latestJS+" $2"],
    [/^(\| \`examples\/frameworks\/python_fastapi\` \| Python SDK )[^|]+(\|.*)$/m,"$1"+latestPY+" $2"],
    [/^(\| \`examples\/frameworks\/langgraph\` \| Python SDK )[^|]+(\|.*)$/m,"$1"+latestPY+" $2"]
  ];
  let output=raw.replace(/^\*\*Current reference versions[^]*?\n/m,
    "**Current reference versions (automatically tracked):** JavaScript \`@tryvira/sdk@"+latestJS+"\`; MCP \`@tryvira/mcp@"+latestMCP+"\`; Python \`tryvira-sdk=="+latestPY+"\`. These independently released clients are pinned by the matching example manifests and lockfiles. Use installed methods and \`tools/list\` before invoking an operation.\n");
  for(const [pattern,replacement] of replacements) {
    assert.match(output,pattern,"compatibility matrix row missing: "+pattern.source);
    output=output.replace(pattern,replacement);
  }
  return output;
});

if(failed.length)throw Error("LATEST_SURFACE_VERSION_DRIFT: "+failed.join(", "));
console.log("LATEST_SURFACE_VERSION_PASS sdk="+latestJS+" mcp="+latestMCP+" python="+latestPY+
 (check?" (check)":" (manifest update)"));
