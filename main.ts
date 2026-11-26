// The Comment Above the Code — make.fun entry.
//
// Writes one line, exactly as a developer left it above fragile
// production code, to <output dir>/entry.txt. The output directory
// comes from MAKEFUN_OUTPUT_DIR when set, otherwise /output.
//
// Deterministic: no clock, no randomness, no network, no input.
// The gate accepts UTF-8 text of 1 to 200 characters, so the line
// is checked against that range before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "// AGENTS.md said never touch this function. " +
  "I rewrote it at 4:59 PM on a Friday, restored the rule, " +
  "and git blame still says Dave did it.";

// The bounty gate: 1 to 200 characters of UTF-8 text, not only
// whitespace. Fail loudly instead of writing an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} characters, outside 1-200`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });

// Written exactly, with no trailing newline: the line itself is
// the whole entry, and every character in the file is judged.
writeFileSync(outputPath, LINE, "utf8");
