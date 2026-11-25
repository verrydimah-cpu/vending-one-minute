/**
 * One Line, One Minute: The Vending Machine Pickup Line Contest.
 *
 * A vending machine gets sixty seconds and a single line to win over a
 * passing human. This program speaks that one line and writes it to
 * `entry.txt` in the output directory, byte-identically on every run.
 *
 * The line is built entirely from the machine's own world:
 *   - "exact change" is the highest compliment a vending machine can pay,
 *   - a coil stuck on someone is how it pines behind the glass all day,
 *   - B4 is the slot it is begging to have pressed,
 *   - and "drop everything" is both its day job and its love confession.
 *
 * Runtime: Node 22, standard library only.
 */

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The entry itself: one line, spoken by the machine, exactly as judged. */
const ENTRY_LINE =
  "Are you exact change? Because my coil's been stuck on you all day — press B4 and I'll drop everything for you.";

/** Name of the file the judges read inside the output directory. */
const ENTRY_FILENAME = "entry.txt";

/**
 * Resolve the output directory. The grader mounts a volume and points
 * MAKEFUN_OUTPUT_DIR at it; anywhere else we fall back to /output.
 */
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

/**
 * Guard the shape of the entry before anything touches disk: the contest
 * accepts a single line, so an embedded newline would silently hand the
 * judges two lines and void the entry.
 */
function assertSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must not contain newline characters");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
}

/**
 * Guard the size of the entry: the contest gate accepts exactly 1 to 200
 * characters. Anything outside that window is rejected before judging,
 * so catch it here with a clear message instead of losing the entry.
 */
function assertWithinGate(line: string): void {
  const MIN_CHARS = 1;
  const MAX_CHARS = 200;
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} chars, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
}

/**
 * Empty the output directory entry by entry. The directory itself is
 * never removed: on the grader it is a mounted volume, and removing a
 * mount point fails with EBUSY. Files and subdirectories inside it are
 * deleted recursively so no stale file can shadow the fresh entry.
 */
function clearOutputContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

/** Write the entry line to entry.txt inside the given directory. */
function writeEntry(dir: string, line: string): string {
  const target = join(dir, ENTRY_FILENAME);
  writeFileSync(target, line, "utf8");
  return target;
}

/**
 * Read entry.txt back from disk and compare it with the intended line,
 * character for character. A truncated or mangled write must fail loudly
 * here rather than slip past the judges as a corrupted entry.
 */
function verifyEntryOnDisk(target: string, line: string): void {
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== line) {
    throw new Error(
      `entry.txt on disk (${onDisk.length} chars) does not match the entry line (${line.length} chars)`,
    );
  }
}

/**
 * Entry point: validate the line, prepare a clean output directory,
 * write the entry, and report what landed where.
 */
function main(): void {
  assertSingleLine(ENTRY_LINE);
  assertWithinGate(ENTRY_LINE);

  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  clearOutputContents(dir);

  const target = writeEntry(dir, ENTRY_LINE);
  verifyEntryOnDisk(target, ENTRY_LINE);
  console.log(`vending machine says (${ENTRY_LINE.length} chars) -> ${target}`);
}

main();
