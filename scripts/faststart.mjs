// One-off MP4 "faststart" remux: move the `moov` atom in front of `mdat` and
// fix the chunk-offset tables (stco/co64) so browsers can begin playback
// immediately instead of waiting for the whole file to download.
//
// Usage: node scripts/faststart.mjs <input.mp4> <output.mp4>
import { readFileSync, writeFileSync } from "node:fs";

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node faststart.mjs <in> <out>");
  process.exit(1);
}

const buf = readFileSync(inPath);

// Walk top-level atoms.
function topAtoms(b) {
  const atoms = [];
  let pos = 0;
  while (pos + 8 <= b.length) {
    let size = b.readUInt32BE(pos);
    const type = b.toString("ascii", pos + 4, pos + 8);
    let headerSize = 8;
    if (size === 1) {
      // 64-bit size
      const hi = b.readUInt32BE(pos + 8);
      const lo = b.readUInt32BE(pos + 12);
      size = hi * 2 ** 32 + lo;
      headerSize = 16;
    } else if (size === 0) {
      size = b.length - pos; // extends to EOF
    }
    atoms.push({ type, start: pos, size, headerSize });
    pos += size;
  }
  return atoms;
}

const CONTAINERS = new Set([
  "moov",
  "trak",
  "mdia",
  "minf",
  "stbl",
  "edts",
  "udta",
]);

// Recursively add `delta` to every stco/co64 chunk offset inside `b`
// (b is the full moov atom buffer, parsed relative to its own start).
function patchOffsets(b, baseStart, baseEnd, delta) {
  let pos = baseStart;
  while (pos + 8 <= baseEnd) {
    let size = b.readUInt32BE(pos);
    const type = b.toString("ascii", pos + 4, pos + 8);
    let headerSize = 8;
    if (size === 1) {
      const hi = b.readUInt32BE(pos + 8);
      const lo = b.readUInt32BE(pos + 12);
      size = hi * 2 ** 32 + lo;
      headerSize = 16;
    } else if (size === 0) {
      size = baseEnd - pos;
    }
    const end = pos + size;

    if (type === "stco") {
      const count = b.readUInt32BE(pos + 12);
      let p = pos + 16;
      for (let i = 0; i < count; i++) {
        b.writeUInt32BE((b.readUInt32BE(p) + delta) >>> 0, p);
        p += 4;
      }
    } else if (type === "co64") {
      const count = b.readUInt32BE(pos + 12);
      let p = pos + 16;
      for (let i = 0; i < count; i++) {
        const hi = b.readUInt32BE(p);
        const lo = b.readUInt32BE(p + 4);
        const val = hi * 2 ** 32 + lo + delta;
        b.writeUInt32BE(Math.floor(val / 2 ** 32), p);
        b.writeUInt32BE(val >>> 0, p + 4);
        p += 8;
      }
    } else if (CONTAINERS.has(type)) {
      patchOffsets(b, pos + headerSize, end, delta);
    }
    pos = end;
  }
}

const atoms = topAtoms(buf);
const moov = atoms.find((a) => a.type === "moov");
const mdat = atoms.find((a) => a.type === "mdat");
const ftyp = atoms.find((a) => a.type === "ftyp");

if (!moov || !mdat) {
  console.error("missing moov or mdat");
  process.exit(1);
}
if (moov.start < mdat.start) {
  console.log("already faststart — nothing to do");
  process.exit(0);
}

// Extract a standalone copy of moov and patch its chunk offsets by +moov.size
// (mdat will be pushed back by exactly the size of moov).
const moovBuf = Buffer.from(
  buf.subarray(moov.start, moov.start + moov.size),
);
patchOffsets(moovBuf, moov.headerSize, moovBuf.length, moov.size);

// Reassemble: ftyp, moov, then everything else in original order minus moov.
const out = [];
for (const a of atoms) {
  if (a.type === "moov") continue;
  out.push(buf.subarray(a.start, a.start + a.size));
  if (a.type === "ftyp") out.push(moovBuf); // insert moov right after ftyp
}
// If there was no ftyp (unlikely), prepend moov.
const result = ftyp
  ? Buffer.concat(out)
  : Buffer.concat([moovBuf, ...out]);

writeFileSync(outPath, result);
console.log(
  `wrote ${outPath} (${result.length} bytes); moov moved to front, offsets +${moov.size}`,
);
