import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const expectedRepository = "organiqsocialagency-wq/trullo-natalino";
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const brand = readFileSync(new URL("../src/lib/brand.ts", import.meta.url), "utf8");
assert.equal(pkg.name, "trullo-natalino", "Questo repository pubblica esclusivamente Trullo Natalino.");
assert.match(brand, /name:\s*"Trullo Natalino"/);
assert.doesNotMatch(brand, /Agrosilente/i);
if (process.env.GITHUB_REPOSITORY) {
  assert.equal(process.env.GITHUB_REPOSITORY, expectedRepository, "Repository di destinazione errato.");
}
if (process.argv.includes("--export")) {
  const html = readFileSync(new URL("../.next-export/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Trullo Natalino — Una casa in Puglia<\/title>/);
  assert.doesNotMatch(html, /Agrosilente/i);
  assert.ok(html.includes("/trullo-natalino/images/photographs/"), "Percorsi delle fotografie errati.");
}
console.log("Identità verificata: Trullo Natalino → " + expectedRepository);
