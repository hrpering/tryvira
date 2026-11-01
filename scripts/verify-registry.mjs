const expected = "0.1.14";

async function readJson(url, label) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "tryvira-public-docs-registry-check"
    },
  });
  if (!response.ok) throw new Error(`${label}: registry returned HTTP ${response.status}`);
  return response.json();
}

const sdk = await readJson("https://registry.npmjs.org/%40tryvira%2Fsdk", "@tryvira/sdk");
const mcp = await readJson("https://registry.npmjs.org/%40tryvira%2Fmcp", "@tryvira/mcp");
const python = await readJson("https://pypi.org/pypi/tryvira-sdk/json", "tryvira-sdk");

const failures = [];

for (const [name, metadata] of [["@tryvira/sdk", sdk], ["@tryvira/mcp", mcp]]) {
  if (!metadata.versions?.[expected]) failures.push(`${name}@${expected} is not published`);
  if (metadata["dist-tags"]?.latest !== expected) {
    failures.push(`${name} latest dist-tag is ${metadata["dist-tags"]?.latest ?? "missing"}, expected ${expected}`);
  }
}

if (!python.releases?.[expected]?.length) failures.push(`tryvira-sdk==${expected} is not published`);
if (python.info?.version !== expected) failures.push(`tryvira-sdk latest is ${python.info?.version ?? "missing"}, expected ${expected}`);

if (failures.length) {
  console.error("REGISTRY_VERIFY_FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("REGISTRY_VERIFY_PASS");
console.log(`Verified @tryvira/sdk@${expected}, @tryvira/mcp@${expected}, and tryvira-sdk==${expected} as current registry releases.`);
