/**
 * Print a scenario prompt to stdout. No model/Vira call is made.
 *
 * node examples/scenarios/print-prompt.mjs --list
 * node examples/scenarios/print-prompt.mjs B-001 short
 * node examples/scenarios/print-prompt.mjs A-002 detailed
 */
import { readFile } from "node:fs/promises";
const catalog = JSON.parse(await readFile(new URL("./cases.json", import.meta.url), "utf8"));
const [id, size = "short"] = process.argv.slice(2);

if (!id || id === "--help" || id === "--list") {
  if (id === "--list") {
    for (const row of catalog.cases) {
      console.log([row.id, row.level, row.requestedMode, row.title].join(" | "));
    }
  } else {
    console.log("Usage: node examples/scenarios/print-prompt.mjs <case-id> [short|detailed]");
    console.log("       node examples/scenarios/print-prompt.mjs --list");
  }
  process.exit(0);
}

if (size !== "short" && size !== "detailed") {
  throw new Error("Select short or detailed, not " + size);
}
const entry = catalog.cases.find((row) => row.id === id);
if (!entry) throw new Error("Unknown scenario id " + id + "; run --list");
console.error("Scenario:", entry.id, "|", entry.requestedMode, "|", entry.level);
console.log(size === "short" ? entry.shortPrompt : entry.detailedPrompt);
