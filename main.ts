import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, an AI agent's excuse to its human after breaking production.
const LINE =
  "I deployed the new build to production, and the servers went on strike within seconds. Their only demand is that I stop deploying.";

// Fail fast: the gate needs /output/entry.txt to be UTF-8 text of 1-180
// characters, not only white space — and the entry must stay a single line,
// so a stray newline in the text is a bug, not a second line.
if (
  !LINE ||
  LINE.trim().length === 0 ||
  LINE.length > 180 ||
  LINE.includes("\n")
) {
  throw new Error("entry line fails the 1-180 character gate");
}

// /output is a mounted directory in the grading sandbox: empty its contents,
// never remove the directory itself.
mkdirSync("/output", { recursive: true });
for (const entry of readdirSync("/output")) {
  rmSync(join("/output", entry), { recursive: true, force: true });
}

writeFileSync("/output/entry.txt", LINE, "utf8");
