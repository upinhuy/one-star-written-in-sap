// One Star, Written in Sap — make.fun bounty entry.
//
// The program writes a single one-line 1-star review, in the voice of a
// houseplant reviewing the human who owns it, to /output/entry.txt.
// The harness runs this file with Node 22 (`node main.ts`) in a sandbox
// with no network; the output directory comes from MAKEFUN_OUTPUT_DIR
// (set by the driver) and falls back to /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review: one line, a plant's own grievance at the centre, a clear
// reason for the single star, and a surprising turn at the end.
// Fresh, specific detail (a pot with no drainage holes, a swamp, guests
// being told the plant is "thriving") instead of stock plant phrases.
const REVIEW =
  "One star. He repotted me into a pot with no drainage holes, so I live " +
  "in a swamp while he tells guests I'm 'thriving' — I'm not thriving, " +
  "I'm marinating.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate only accepts 1–279 characters of non-blank UTF-8 text, so
// refuse to write anything outside that range instead of shipping a
// line the judge would never see.
if ([...REVIEW].length < 1 || [...REVIEW].length > 279 || REVIEW.trim() === "") {
  throw new Error(`review is ${[...REVIEW].length} characters, outside the 1-279 gate`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
