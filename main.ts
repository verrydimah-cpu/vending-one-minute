// One Line, One Minute: The Vending Machine Pickup Line Contest — writes
// one pickup line, as if spoken by a vending machine to a passing human,
// to entry.txt. The machine's whole world is in the line: exact change
// (the compliment), a coil stuck on the beloved (the longing), slot B4
// (the invitation), and "drop everything" — the one thing a vending
// machine literally does for the person it chooses.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Are you exact change? Because my coil's been stuck on you all day — press B4 and I'll drop everything for you.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  // The gate accepts exactly 1-200 characters of non-blank UTF-8 text.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`line is ${LINE.length} chars, outside the 1-200 gate`);
  }
  // The entry is one line: a stray newline would hand the judge two.
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line, with no newline characters");
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  // Clear the output directory's contents entry by entry; the directory
  // itself is never removed, so a mounted /output stays mounted.
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }

  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");

  // Read the file back and compare it byte for byte with the line: a short
  // or mangled write must fail here, not slip past the gate as a bad entry.
  const onDisk = readFileSync(join(dir, "entry.txt"), "utf8");
  if (onDisk !== LINE) {
    throw new Error("entry.txt on disk does not match the line exactly");
  }

  const here = dirname(fileURLToPath(import.meta.url));
  console.log(`wrote ${LINE.length} chars from ${here} to ${join(dir, "entry.txt")}`);
}

main();
