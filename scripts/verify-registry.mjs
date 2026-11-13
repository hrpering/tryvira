import { readFile } from "node:fs/promises";

const versions = JSON.parse(await readFile(new URL("../package-versions.json", import.meta.url), "utf8"));

async function readJson(url, label) {
  const response = await fetch(url, {
    headers: { accept: "application/json", "user-agent": "tryvira-public-docs-registry-check" },
  });
  if (!response.ok) throw new Error(`${label}: registry returned HTTP ${response.status}`);
  return response.json();
}

const [sdk, mcp, python] = await Promise.all([
  readJson("https://registry.npmjs.org/%40tryvira%2Fsdk", "@tryvira/sdk"),
  readJson("https://registry.npmjs.org/%40tryvira%2Fmcp", "@tryvira/mcp"),
  readJson("https://pypi.org/pypi/tryvira-sdk/json", "tryvira-sdk"),
]);

const latest = {
  sdk: sdk["dist-tags"]?.latest,
  mcp: mcp["dist-tags"]?.latest,
  python: python.info?.version,
};
const failures = [];

if (versions.npm?.["@tryvira/sdk"] !== latest.sdk) failures.push(`package-versions.json @tryvira/sdk is stale: expected ${latest.sdk}`);
if (versions.npm?.["@tryvira/mcp"] !== latest.mcp) failures.push(`package-versions.json @tryvira/mcp is stale: expected ${latest.mcp}`);
if (versions.pypi?.["tryvira-sdk"] !== latest.python) failures.push(`package-versions.json tryvira-sdk is stale: expected ${latest.python}`);
if (!sdk.versions?.[latest.sdk]) failures.push(`@tryvira/sdk@${latest.sdk} is not published`);
if (!mcp.versions?.[latest.mcp]?.bin?.["vira-mcp"]) failures.push(`@tryvira/mcp@${latest.mcp} has no published vira-mcp executable`);
if (!python.releases?.[latest.python]?.length) failures.push(`tryvira-sdk==${latest.python} is not published`);

const docs = await Promise.all([
  readFile(new URL("../docs/published-packages.md", import.meta.url), "utf8"),
  readFile(new URL("../docs/reference/javascript-sdk.md", import.meta.url), "utf8"),
  readFile(new URL("../docs/reference/python-sdk.md", import.meta.url), "utf8"),
]);
for (const [label, value, text] of [
  ["@tryvira/sdk", latest.sdk, docs[1]],
  ["@tryvira/mcp", latest.mcp, docs[0]],
  ["tryvira-sdk", latest.python, docs[2]],
]) {
  if (!text.includes(value)) failures.push(`${label} documentation does not show the registry's latest version ${value}`);
}

if (failures.length) {
  console.error("REGISTRY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REGISTRY_VERIFY_PASS");
console.log(`Verified current registry versions: @tryvira/sdk@${latest.sdk}, @tryvira/mcp@${latest.mcp}, tryvira-sdk==${latest.python}.`);
console.log("This check validates package metadata and documentation pins; it does not compare private or method-level contracts.");
