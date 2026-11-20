import assert from "node:assert/strict";
import {readFile,readdir} from "node:fs/promises";

const root=await readFile("SKILL.md","utf8");
assert.match(root,/^---\nname: vira\ndescription: ".{45,1024}"\nlicense: ".+"\n---\n/m);
assert.match(root,/^# Vira \| Agent-first behavior workspace$/m);
assert.match(root,/self-contained/i);
assert.match(root,/tools\/list/);
assert.match(root,/VIRA_ORGANIZATION_ID/);
assert.match(root,/VIRA_PROJECT_ID/);
assert.match(root,/VIRA_ENVIRONMENT_ID/);
assert.match(root,/VIRA_API_KEY/);
assert.match(root,/Teach/);
assert.match(root,/post_model/);
assert.match(root,/AUTO/);
assert.match(root,/SINGLE\/STRATEGY\/COMPOUND\/HYBRID/);
assert.match(root,/explicit permission/);
assert.match(root,/readback/);
assert.match(root,/do not assume any other Skill/i);
assert.doesNotMatch(root,/\b(?:vira_live_|sk_live_|ghp_)[a-zA-Z0-9]{12,}/i);

const experts=(await readdir("skills",{withFileTypes:true}))
  .filter(entry=>entry.isDirectory()&&entry.name.startsWith("vira-"))
  .map(entry=>entry.name).sort();
assert.equal(experts.length,28,"28 optional specialist Skills must remain available");
for(const name of experts){
  assert.ok(root.includes("`"+name+"`"),"root Vira Skill missing specialist route: "+name);
  assert.ok(await readFile("skills/"+name+"/SKILL.md","utf8"));
}
const en=await readFile("README.md","utf8");
const tr=await readFile("README.tr.md","utf8");
const install=await readFile("docs/agent-skills/installation.md","utf8");
const directory=await readFile("skills/README.md","utf8");
for(const [label,page] of [["README",en],["README.tr",tr],["installation",install],["Skills index",directory]])
  assert.match(page,/npx skills add hrpering\/tryvira --skill vira(?:\s|$)/m,label+" does not feature root entrypoint");
assert.doesNotMatch(en,/npx skills add hrpering\/tryvira --skill vira-(?:mcp|operator)/,"README should no longer require two separate Skills");

const config=JSON.parse(await readFile("plugins/opencode/opencode.example.json","utf8"));
assert.ok(Array.isArray(config.plugins));
const configuredPlugin = config.plugins.find(entry =>
  entry === "@tryvira/opencode" ||
  (entry && typeof entry === "object" && entry.package === "@tryvira/opencode"));
assert.ok(configuredPlugin, "The sample must configure the Vira OpenCode package");
if (typeof configuredPlugin === "object") {
  assert.equal(configuredPlugin.options?.mode, "observe", "Public OpenCode starter must default to observe");
}
assert.ok(!("plugin" in config),"OpenCode now uses plugins plural");
assert.ok(!JSON.stringify(config).includes("VIRA_API_KEY"),"Never embed credential placeholders as JSON options");
const plugin=await readFile("plugins/opencode/README.md","utf8");
assert.match(plugin,/not the OpenCode plugin implementation|does not contain the plugin implementation/i);
assert.match(plugin,/verif/i);
assert.match(plugin,/plugins/);
console.log("ROOT_VIRA_SKILL_PASS root=1 optionalSpecialists=28 pluginGuide=1 (offline, no tenant)");
